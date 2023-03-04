/*!
 * socket.js - bsock-like api for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const {EventEmitter} = require('events');
const clone = require('./clone');
const EventProxy = require('./proxy');
const os = require('./os');
const utils = require('./utils');

const {
  INLINE_PREFIX,
  getter,
  custom,
  inspectify,
  errors,
  WorkerError,
  ArgError,
  encodeError,
  decodeError,
  noop
} = utils;

/*
 * Constants
 */

const INTERNAL = {};

const types = {
  MESSAGE: 0,
  EVENT: 1,
  CALL: 2,
  ACK: 3,
  ERROR: 4,
  MAX_TYPE: 4
};

const blacklist = new Set([
  'error',
  'newListener',
  'removeListener'
]);

/**
 * Cloner
 */

class Cloner extends clone.Cloner {
  isPort(value, threads) {
    return value instanceof Port;
  }

  toPort(value, threads) {
    return value._port;
  }
}

/**
 * Uncloner
 */

class Uncloner extends clone.Uncloner {
  transform(value, threads) {
    if (threads.bufferify && threads.Buffer) {
      if (value instanceof Uint8Array) {
        return threads.Buffer.from(value.buffer,
                                   value.byteOffset,
                                   value.byteLength);
      }
    }

    return value;
  }

  isPort(value, threads) {
    return value instanceof threads.MessagePort;
  }

  toPort(value, threads) {
    return new Port(INTERNAL, threads, value);
  }
}

/**
 * Socket
 */

class Socket extends EventEmitter {
  constructor(threads, port) {
    super();

    this._threads = threads;
    this._port = port;
    this._proxy = new EventProxy(port);
    this._uid = 0;
    this._hooks = new Map();
    this._jobs = new Map();
    this._reads = [];
    this._closed = false;
    this._ref = false;
    this._pooled = false;
    this._bind = noop;

    this.events = new EventEmitter();

    this._init();
  }

  _init() {
    // Side-effects of directly binding 'message':
    //   browser-port: binds onmessage
    //   browser-parent: binds onmessage
    //   browser-worker: binds onmessage
    //   process-port: deactivates buffering
    //   process-parent: deactivates buffering, refs
    //   process-worker: refs
    //   threads-port: refs
    //   threads-parent: refs
    //   threads-worker: refs
    this._proxy.listen('message', async (pkt) => {
      try {
        await this._handle(pkt);
      } catch (e) {
        this.emit('error', e);
      }
    });

    // Side-effects of directly binding 'error':
    //   browser-port: nothing
    //   browser-parent: nothing
    //   browser-worker: binds onmessage
    //   process-port: nothing
    //   process-parent: nothing
    //   process-worker: nothing
    //   threads-port: nothing
    //   threads-parent: nothing
    //   threads-worker: nothing
    const onError = (err) => {
      this._handleRead(err);
      this.emit('error', err);
    };

    // Do not directly bind if we're the parent.
    // Doing so could lead to uncaught errors if
    // somebody wants to use the regular API.
    if (this._port === this._threads.parentPort) {
      this._bind = () => {
        this._bind = noop;
        this._port.on('error', onError);
      };

      this.once('newListener', this._bind);
      this.events.once('newListener', this._bind);
    } else {
      this._port.on('error', onError);
    }

    this._proxy.watch(this, ['message', 'event']);
    this._proxy.watch(this.events);
  }

  _close() {
    this._closed = true;
    this._ref = false;

    if (this._reads.length > 0)
      this._handleRead(new WorkerError(errors.PORT_DESTROYED));

    for (const job of this._jobs.values())
      job.destroy();
  }

  _dispose() {
    this._proxy.destroy();
    this.removeAllListeners();

    if (!this._pooled) {
      this.events.removeAllListeners();
      this._hooks.clear();
    }
  }

  _next() {
    const id = this._uid;

    this._uid += 1;
    this._uid >>>= 0;

    return id;
  }

  _morph(value, transferList) {
    return Cloner.morph(value, transferList, this._threads);
  }

  _unclone(value) {
    return Uncloner.unclone(value, this._threads);
  }

  _send(pkt, transferList) {
    if (this._closed)
      return;

    if (transferList != null)
      [pkt, transferList] = this._morph(pkt, transferList);

    this._port.postMessage(pkt, transferList);
  }

  _sendMessage(msg, transferList) {
    this._send([types.MESSAGE, msg, null, null], transferList);
  }

  _sendEvent(name, args, transferList) {
    this._send([types.EVENT, name, args, null], transferList);
  }

  _sendCall(id, name, args, transferList) {
    this._send([types.CALL, id, name, args], transferList);
  }

  _sendAck(id, result, transferList) {
    this._send([types.ACK, id, result, null], transferList);
  }

  _sendError(id, err, transferList) {
    this._send([types.ERROR, id, encodeError(err), null], transferList);
  }

  async _handle(pkt) {
    if (!Array.isArray(pkt) || pkt.length !== 4)
      throw new ArgError('pkt', pkt, 'Array');

    const [type] = pkt;

    if ((type >>> 0) !== type || type > types.MAX_TYPE)
      throw new WorkerError(errors.INVALID_PACKET, type);

    switch (type) {
      case types.MESSAGE: {
        const [, msg] = pkt;
        const value = this._unclone(msg);

        this._handleRead(null, value);
        this.emit('message', value);

        break;
      }

      case types.EVENT: {
        const [, name, args] = pkt;

        if (typeof name !== 'string')
          throw new ArgError('name', name, 'string');

        if (!Array.isArray(args))
          throw new ArgError('args', args, 'Array');

        this._unclone(args);
        this.events.emit(name, ...args);
        this.emit('event', name, args);

        break;
      }

      case types.CALL: {
        let [, id, name, args] = pkt;

        id >>>= 0;

        try {
          await this._handleCall(id, name, args);
        } catch (e) {
          this._sendError(id, e);
        }

        break;
      }

      case types.ACK:
      case types.ERROR: {
        const [, id, result] = pkt;

        if ((id >>> 0) !== id)
          throw new ArgError('id', id, 'integer');

        const job = this._jobs.get(id);

        if (!job)
          throw new WorkerError(errors.JOB_NONE, id);

        if (type === types.ERROR)
          job.reject(decodeError(result));
        else
          job.resolve(this._unclone(result));

        break;
      }

      default: {
        throw new WorkerError(errors.FATAL_ERROR);
      }
    }
  }

  async _handleCall(id, name, args) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (!Array.isArray(args))
      throw new ArgError('args', args, 'Array');

    const func = this._hooks.get(name);

    if (!func)
      throw new WorkerError(errors.HOOK_NONE, name);

    this._unclone(args);

    const items = await func(...args);

    if (!Array.isArray(items)) {
      this._sendAck(id, items, undefined);
      return;
    }

    let result, list;

    switch (items.length) {
      case 2:
        list = items[1];
      case 1:
        result = items[0];
      case 0:
        break;
      default:
        throw new TypeError(errors.INVALID_RESULT);
    }

    if (list != null && !Array.isArray(list))
      throw new TypeError(errors.INVALID_RESULT);

    this._sendAck(id, result, list);
  }

  _handleRead(err, res) {
    if (this._reads.length === 0)
      return;

    for (const [resolve, reject] of this._reads) {
      if (err)
        reject(err);
      else
        resolve(res);
    }

    this._reads.length = 0;
    this._proxy.unref();
  }

  async _wait(event, close, func) {
    return new Promise((resolve, reject) => {
      let onEvent, onError, onClose;

      const cleanup = () => {
        this.removeListener(event, onEvent);
        this.removeListener('error', onError);

        if (close)
          this.removeListener(close, onClose);
      };

      onEvent = (res) => {
        cleanup();
        resolve(res);
      };

      onError = (err) => {
        cleanup();
        reject(err);
      };

      onClose = () => {
        onEvent();
      };

      this.addListener(event, onEvent);
      this.addListener('error', onError);

      if (close)
        this.addListener(close, onClose);

      if (func) {
        try {
          func.call(this._port);
        } catch (e) {
          onError(e);
        }
      }
    });
  }

  get closed() {
    return this._closed;
  }

  bind(name, handler) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (blacklist.has(name))
      throw new WorkerError(errors.BLACKLIST, name);

    this._bind();
    this.events.addListener(name, handler);

    return this;
  }

  unbind(name, handler) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (blacklist.has(name))
      throw new WorkerError(errors.BLACKLIST, name);

    this._bind();
    this.events.removeListener(name, handler);

    return this;
  }

  hook(name, handler) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (typeof handler !== 'function')
      throw new ArgError('handler', handler, 'function');

    if (this._hooks.has(name))
      throw new WorkerError(errors.HOOK_EXISTS, name);

    this._bind();
    this._hooks.set(name, handler);
    this._proxy.ref();

    return this;
  }

  unhook(name) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    this._bind();

    if (this._hooks.has(name)) {
      this._proxy.unref();
      this._hooks.delete(name);
    }

    return this;
  }

  send(msg, transferList) {
    this._bind();
    this._sendMessage(msg, transferList);
    return this;
  }

  async read() {
    if (this._closed)
      throw new WorkerError(errors.PORT_CLOSED);

    this._bind();

    if (this._reads.length === 0)
      this._proxy.ref();

    return new Promise((resolve, reject) => {
      this._reads.push([resolve, reject]);
    });
  }

  fire(name, args, transferList) {
    if (args == null)
      args = [];

    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (!Array.isArray(args))
      throw new ArgError('args', args, 'Array');

    this._bind();
    this._sendEvent(name, args, transferList);

    return this;
  }

  async call(name, args, transferList, timeout) {
    if (args == null)
      args = [];

    if (timeout == null)
      timeout = 0;

    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (!Array.isArray(args))
      throw new ArgError('args', args, 'Array');

    if (this._closed)
      throw new WorkerError(errors.PORT_CLOSED);

    const id = this._next();

    if (this._jobs.has(id))
      throw new WorkerError(errors.JOB_COLLISION, id);

    this._bind();
    this._sendCall(id, name, args, transferList);
    this._proxy.ref();

    return new Promise((resolve, reject) => {
      const job = new Job(this, id, resolve, reject);

      this._jobs.set(id, job);

      job.start(timeout);
    });
  }

  hasRef() {
    return this._ref;
  }

  ref() {
    if (!this._closed) {
      this._ref = true;
      this._port.ref();
    }
    return this;
  }

  unref() {
    if (!this._closed) {
      this._ref = false;
      this._port.unref();
    }
    return this;
  }
}

/**
 * Job
 */

class Job {
  constructor(port, id, resolve, reject) {
    this.port = port;
    this.id = id;
    this.job = { resolve, reject };
    this.timer = null;
  }

  start(timeout) {
    timeout |= 0;

    if (timeout <= 0)
      return;

    this.timer = setTimeout(() => {
      this.reject(new WorkerError(errors.JOB_TIMEOUT, this.id));
    }, timeout);
  }

  destroy() {
    this.reject(new WorkerError(errors.JOB_DESTROYED, this.id));
  }

  cleanup() {
    const job = this.job;

    if (!job)
      throw new WorkerError(errors.JOB_NONE, this.id);

    this.job = null;

    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (!this.port._jobs.has(this.id))
      throw new WorkerError(errors.JOB_NONE, this.id);

    this.port._jobs.delete(this.id);
    this.port._proxy.unref();

    return job;
  }

  resolve(result) {
    const job = this.cleanup();
    job.resolve(result);
  }

  reject(err) {
    const job = this.cleanup();
    job.reject(err);
  }
}

/**
 * ThreadBase
 */

class ThreadBase extends Socket {
  constructor(threads, worker) {
    if (!(worker instanceof threads.Worker))
      throw new ArgError('worker', worker, 'Worker');

    super(threads, worker);

    this._online = false;
    this._stdin = worker.stdin;
    this._stdout = worker.stdout;
    this._stderr = worker.stderr;
    this._threadId = worker.threadId;
  }

  _init() {
    super._init();

    // Side-effects of directly binding 'online':
    //   browser: binds onmessage
    //   process: nothing
    //   threads: nothing
    this._port.on('online', () => {
      this._online = true;
      this.emit('online');
    });

    // Side-effects of directly binding 'exit':
    //   browser: binds onmessage
    //   process: nothing
    //   threads: nothing
    this._port.on('exit', (code) => {
      this._online = false;
      this._close();
      this.emit('exit', code);
      this._dispose();
    });
  }

  get online() {
    return this._online;
  }

  get stdin() {
    return this._stdin;
  }

  get stdout() {
    return this._stdout;
  }

  get stderr() {
    return this._stderr;
  }

  get threadId() {
    return this._threadId;
  }

  async open() {
    if (this._closed)
      return undefined;

    if (this._online)
      return undefined;

    return this._wait('online', 'exit');
  }

  async close() {
    if (this._closed)
      return 0;

    return this._wait('exit', null, this._port.terminate);
  }

  async wait() {
    if (this._closed)
      return 0;

    return this._wait('exit');
  }

  [custom]() {
    return inspectify(this._threads.Thread, {
      active: !this._closed && this._proxy.count > 0,
      refed: this._ref,
      threadId: this._threadId,
      stdin: this.stdin,
      stdout: this.stdout,
      stderr: this.stderr,
      hooks: this._hooks,
      events: this.events._events
    });
  }
}

/**
 * Port
 */

class Port extends Socket {
  constructor(safety, threads, port) {
    if (safety !== INTERNAL)
      throw new TypeError('Illegal constructor');

    if (!(port instanceof threads.MessagePort))
      throw new ArgError('port', port, 'MessagePort');

    super(threads, port);
  }

  _init() {
    super._init();

    // Side-effects of directly binding 'close':
    //   browser-port: binds onmessage
    //   browser-parent: nothing
    //   process-port: nothing
    //   process-parent: nothing
    //   threads-port: nothing
    //   threads-parent: nothing
    this._port.on('close', () => {
      this._close();
      this.emit('close');
      this._dispose();
    });
  }

  start() {
    this._proxy.start();
    this._port.start();
    return this;
  }

  async close() {
    if (this._closed)
      return undefined;

    return this._wait('close', null, this._port.close);
  }

  async wait() {
    if (this._closed)
      return undefined;

    return this._wait('close');
  }

  [custom]() {
    return inspectify(Port, {
      active: !this._closed && this._proxy.count > 0,
      refed: this._ref,
      hooks: this._hooks,
      events: this.events._events
    });
  }
}

/**
 * ChannelBase
 */

class ChannelBase {
  constructor(threads) {
    const {port1, port2} = new threads.MessageChannel();

    this.port1 = new Port(INTERNAL, threads, port1);
    this.port2 = new Port(INTERNAL, threads, port2);
  }
}

/**
 * PoolBase
 */

class PoolBase extends EventEmitter {
  constructor(threads, file, options) {
    if (options == null)
      options = {};

    if (typeof file !== 'string' && typeof file !== 'function')
      throw new ArgError('file', file, ['string', 'function']);

    if (typeof options !== 'object')
      throw new ArgError('options', options, 'object');

    if (options.size != null && (options.size >>> 0) !== options.size)
      throw new ArgError('size', options.size, 'integer');

    super();

    this._threads = threads;
    this._map = new Map();
    this._uid = 0;
    this._hooks = new Map();
    this._ref = true;

    this.file = file;
    this.options = options;
    this.size = options.size || getSize();
    this.events = new EventEmitter();
    this.threads = new Set();
  }

  _spawn(id) {
    const thread = new this._threads.Thread(this.file, this.options);

    thread.events = this.events;
    thread._hooks = this._hooks;
    thread._pooled = true;

    thread.on('message', (msg) => {
      this.emit('message', msg, thread);
    });

    thread.on('error', (err) => {
      this.emit('error', err, thread);
    });

    thread.on('event', (name, args) => {
      this.emit('event', name, args, thread);
    });

    thread.on('online', () => {
      this.emit('online', thread);
    });

    thread.on('exit', (code) => {
      if (this._map.get(id) === thread)
        this._map.delete(id);

      this.threads.delete(thread);

      this.emit('exit', code, thread);
    });

    if (this.options.stdin && thread.stdin) {
      thread.stdin.on('error', (err) => {
        this.emit('error', err, thread);
      });
    }

    if (thread.stdout) {
      thread.stdout.on('error', (err) => {
        this.emit('error', err, thread);
      });
    }

    if (thread.stderr) {
      thread.stderr.on('error', (err) => {
        this.emit('error', err, thread);
      });
    }

    if (!this._ref)
      thread.unref();

    this.emit('spawn', thread);

    return thread;
  }

  async open() {
    this.populate();

    const threads = [...this._map.values()];
    const jobs = threads.map(t => t.open());

    return Promise.all(jobs);
  }

  async close() {
    const threads = [...this._map.values()];
    const jobs = threads.map(t => t.close());

    return Promise.all(jobs);
  }

  populate() {
    const len = this.size - this._map.size;

    for (let i = 0; i < len; i++)
      this.next();
  }

  next() {
    const id = this._uid % this.size;

    this._uid += 1;
    this._uid >>>= 0;

    if (!this._map.has(id)) {
      const thread = this._spawn(id);
      this._map.set(id, thread);
      this.threads.add(thread);
    }

    return this._map.get(id);
  }

  bind(name, handler) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (blacklist.has(name))
      throw new WorkerError(errors.BLACKLIST, name);

    this.events.addListener(name, handler);

    return this;
  }

  unbind(name, handler) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (blacklist.has(name))
      throw new WorkerError(errors.BLACKLIST, name);

    this.events.removeListener(name, handler);

    return this;
  }

  hook(name, handler) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    if (typeof handler !== 'function')
      throw new ArgError('handler', handler, 'function');

    if (this._hooks.has(name))
      throw new WorkerError(errors.HOOK_EXISTS, name);

    this._hooks.set(name, handler);

    return this;
  }

  unhook(name) {
    if (typeof name !== 'string')
      throw new ArgError('name', name, 'string');

    this._hooks.delete(name);

    return this;
  }

  send(msg) {
    this.populate();

    for (const thread of this._map.values())
      thread.send(msg);

    return this;
  }

  fire(name, args) {
    this.populate();

    for (const thread of this._map.values())
      thread.fire(name, args);

    return this;
  }

  async call(name, args, transferList, timeout) {
    const thread = this.next();
    return thread.call(name, args, transferList, timeout);
  }

  hasRef() {
    return this._ref;
  }

  ref() {
    this._ref = true;

    for (const thread of this._map.values())
      thread.ref();

    return this;
  }

  unref() {
    this._ref = false;

    for (const thread of this._map.values())
      thread.unref();

    return this;
  }

  [custom]() {
    return inspectify(this._threads.Pool, {
      active: this._threads.size > 0,
      refed: this._ref,
      file: this.file,
      options: this.options,
      size: this.size,
      threads: this.threads,
      hooks: this._hooks,
      events: this.events._events
    });
  }
}

/*
 * Helpers
 */

function getSize() {
  const len = os.cpus();

  // Fall back to 2.
  if (len === 0)
    return 2;

  // Calculate default pool size.
  // Subtract one to account for
  // the main thread.
  return Math.max(1, len - 1);
}

function getCores() {
  const len = os.cpus();

  // Fall back to 2.
  if (len === 0)
    return 2;

  return len;
}

/*
 * API
 */

function inject(threads, source, ctor, parse) {
  if (threads == null || typeof threads !== 'object')
    throw new ArgError('threads', threads, 'object');

  if (typeof threads.Worker !== 'function'
      || typeof threads.MessagePort !== 'function'
      || typeof threads.MessageChannel !== 'function') {
    throw new ArgError('threads', threads, 'Backend');
  }

  threads.bufferify = true;
  threads.Buffer = ctor;
  threads.cores = getCores();

  threads.Thread = class Thread extends ThreadBase {
    constructor(file, options) {
      if (options == null)
        options = {};

      if (typeof options !== 'object')
        throw new ArgError('options', options, 'object');

      if (typeof file === 'function') {
        if (!options.eval) {
          options = Object.assign({}, options);
          options.eval = true;
        }

        file = `(${file}).call(this);`;
      }

      if (!options.eval) {
        if (!file.startsWith(INLINE_PREFIX))
          file = source.resolve(file, __filename);
      } else if (!options.dirname) {
        options = Object.assign({}, options);
        options.dirname = source.dirname(__filename);
      }

      if (parse)
        [file, options] = parse(file, options);

      super(threads, new threads.Worker(file, options));
    }
  };

  threads.Port = Port;

  threads.Channel = class Channel extends ChannelBase {
    constructor() {
      super(threads);
    }
  };

  threads.Pool = class Pool extends PoolBase {
    constructor(file, options) {
      super(threads, file, options);
    }
  };

  if (!threads.isMainThread) {
    let parent = null;

    // parentPort may not exist in early stages of
    // execution with the worker_threads backend.
    getter(threads, 'parent', () => {
      if (!parent)
        parent = new Port(INTERNAL, threads, threads.parentPort);

      return parent;
    });
  } else {
    threads.parent = null;
  }
}

/*
 * Expose
 */

exports.inject = inject;
