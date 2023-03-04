/*!
 * parent.js - parent thread port for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://nodejs.org/api/worker_threads.html#worker_threads_worker_parentport
 */

'use strict';

const utils = require('../internal/utils');
const encoding = require('../internal/encoding');
const common = require('./common');
const Packet = require('./packet');
const Parser = require('./parser');
const stdio = require('./stdio');
const {Console} = console;
const {types} = Packet;

const {
  exit,
  stdin,
  stdout,
  stderr,
  umask
} = process;

const {
  errors,
  DataCloneError,
  WorkerError,
  hasSelf,
  setupRefs,
  bindDefault,
  toBuffer,
  encodeError
} = utils;

const {
  MessagePortBase,
  MessagePort,
  activate
} = common;

/*
 * Constants
 */

const {
  BTHREADS_WORKER_ID: WORKER_ID,
  BTHREADS_WORKER_DATA: WORKER_DATA,
  BTHREADS_WORKER_STDIN: WORKER_STDIN,
  BTHREADS_WORKER_LIMITS: WORKER_LIMITS
} = process.env;

/**
 * Parent
 */

class Parent extends MessagePortBase {
  constructor() {
    super();

    this._workerId = WORKER_ID >>> 0;
    this._workerData = encoding.parse(WORKER_DATA);
    this._workerLimits = encoding.parse(WORKER_LIMITS);
    this._parser = new Parser(this);
    this._ports = new Map();
    this._closed = false;
    this._writable = true;
    this._stdioRef = setInterval(() => {}, 1 << 29).unref();
    this._stdioRefs = 0;
    this._stdio = [null, null, null];
    this._exit = exit.bind(process);
    this._stdin = this._stdio[0];
    this._stdout = this._stdio[1];
    this._stderr = this._stdio[2];
    this._console = console;

    this._init();
  }

  _init() {
    stdin.on('error', (err) => {
      this.emit('error', err);
    });

    stdout.on('error', (err) => {
      this.emit('error', err);
    });

    stdout.on('close', () => {
      this._writable = false;
    });

    stdout.on('finish', () => {
      this._writable = false;
    });

    stderr.on('error', (err) => {
      this.emit('error', err);
    });

    stdin.on('data', (data) => {
      if (this._closed)
        return;

      try {
        this._parser.feed(data);
      } catch (e) {
        this.emit('error', e);
      }
    });

    this._parser.on('error', (err) => {
      this.emit('error', err);
    });

    this._parser.on('packet', (pkt) => {
      try {
        this._handleMessage(pkt);
      } catch (e) {
        this.emit('error', e);
      }
    });

    // Everything is deref'd by default.
    stdin.unref();
    stdout.unref();
    stderr.unref();

    // We use stdin as for onmessage refs.
    setupRefs(stdin, this, 'message');

    // We use a fake timer to track stdio refs.
    // This is to avoid interfering with the
    // onmessage referencing above. Although,
    // I'm not actually sure if the parentPort
    // in node.js has two references.
    const _stdin = new stdio.Readable(this, 0);
    const _stdout = new stdio.Writable(this, 1);
    const _stderr = new stdio.Writable(this, 2);

    if (WORKER_STDIN === '0')
      _stdin.push(null);

    this._stdio[0] = _stdin;
    this._stdio[1] = _stdout;
    this._stdio[2] = _stderr;

    this._stdin = _stdin;
    this._stdout = _stdout;
    this._stderr = _stderr;
    this._console = new Console(_stdout, _stderr);
    this._console.Console = Console;

    this._inject();
    this._send(new Packet(types.OPEN));
  }

  _inject() {
    bindDefault(process, 'uncaughtException', (err) => {
      this._exception(err);
    });

    bindDefault(process, 'unhandledRejection', (err) => {
      if (!(err instanceof Error))
        err = new Error('Unhandled rejection: ' + err);

      this._exception(err);
    });

    process.abort = null;
    process.chdir = null;
    process.initgroups = null;
    process.setgroups = null;
    process.setegid = null;
    process.seteuid = null;
    process.setgid = null;
    process.setuid = null;

    // https://github.com/nodejs/node/commit/f6cd4e3
    // eslint-disable-next-line
    process.umask = function _umask(mask) {
      if (mask !== undefined) {
        throw new WorkerError(
          errors.UNSUPPORTED_OPERATION,
          'Setting process.umask()');
      }

      return umask.call(process);
    };

    Object.defineProperty(process, 'stdin', {
      configurable: true,
      enumerable: true,
      get: () => this._stdin
    });

    Object.defineProperty(process, 'stdout', {
      configurable: true,
      enumerable: true,
      get: () => this._stdout
    });

    Object.defineProperty(process, 'stderr', {
      configurable: true,
      enumerable: true,
      get: () => this._stderr
    });

    Object.defineProperty(global, 'console', {
      configurable: true,
      enumerable: false,
      get: () => this._console
    });
  }

  _handleMessage(pkt) {
    if (this._closed)
      return;

    const port = this._ports.get(pkt.port);

    if (port) {
      port._handleMessage(pkt);
      return;
    }

    if (pkt.port !== 0)
      return;

    switch (pkt.type) {
      case types.MESSAGE: {
        this.emit('message', pkt.value);
        break;
      }

      case types.STDIO_READ: {
        const stream = this._stdio[pkt.value];

        if (stream)
          stream._moreData();

        break;
      }

      case types.STDIO_WRITE: {
        const [fd, data, enc] = pkt.value;
        const stream = this._stdio[fd];

        if (stream)
          stream.push(toBuffer(data, Buffer), enc);

        break;
      }

      case types.EXIT: {
        exit.call(process, pkt.value >>> 0);
        break;
      }

      default: {
        throw new WorkerError(errors.INVALID_PACKET, pkt.type);
      }
    }
  }

  _exception(err) {
    this._send(new Packet(types.ERROR, 0, encodeError(err)));
  }

  _send(pkt) {
    if (this._writable)
      stdout.write(pkt.encode());
  }

  _attach(id) {
    if (id === 0)
      throw new WorkerError(errors.INVALID_PORT, id);

    const port = new MessagePort();

    port._id = id;

    if (this._ports.has(id)) {
      const remote = this._ports.get(id);

      remote._active = false;
      remote._parent = null;
      remote._port = port;

      port._port = remote;

      this._ports.delete(id);

      return port;
    }

    port._parent = this;
    port._active = true;

    this._ports.set(port._id, port);

    return port;
  }

  close(callback) {
    if (this._closed)
      return;

    if (typeof callback === 'function')
      this.once('close', callback);

    for (const port of this._ports.values())
      port.close();

    if (!this._stdin._readableState.ended)
      this._stdin.push(null);

    clearInterval(this._stdioRef);

    stdin.destroy();

    this._closed = true;

    const done = () => this.emit('close');

    if (this._writable) {
      this._writable = false;
      stdout.end(done);
    } else {
      setImmediate(done);
    }
  }

  postMessage(value, transferList) {
    if (this._closed)
      return;

    if (hasSelf(transferList, this))
      throw new DataCloneError(errors.SOURCE_PORT);

    activate(transferList, this);

    this._send(new Packet(types.MESSAGE, 0, value));
  }

  ref() {
    if (!this._closed)
      stdin.ref();
  }

  start() {
    return;
  }

  unref() {
    if (!this._closed)
      stdin.unref();
  }
}

/*
 * Expose
 */

module.exports = Parent;
