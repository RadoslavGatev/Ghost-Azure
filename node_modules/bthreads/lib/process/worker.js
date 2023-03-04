/*!
 * worker.js - worker object for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://nodejs.org/api/worker_threads.html#worker_threads_class_worker
 */

'use strict';

const cp = require('child_process');
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const utils = require('../internal/utils');
const encoding = require('../internal/encoding');
const {MessagePort, activate} = require('./common');
const flags = require('./flags');
const Packet = require('./packet');
const Parser = require('./parser');
const stdio = require('./stdio');
const {types} = Packet;

const {
  extname,
  isAbsolute,
  join,
  resolve,
  sep
} = path;

const {
  INLINE_PREFIX,
  custom,
  getStack,
  inspectify,
  setupRefs,
  bindDefault,
  toBuffer,
  decodeError,
  ArgError,
  WorkerError,
  errors
} = utils;

const {
  isIsolateOption,
  isValueOption,
  isInvalidOption
} = flags;

/*
 * Constants
 */

const children = new Set();

const SHARE_ENV = Symbol.for('nodejs.worker_threads.SHARE_ENV');

let uid = 1;
let exitBound = false;
let bundled = null;

/**
 * Worker
 */

class Worker extends EventEmitter {
  constructor(file, options) {
    super();

    if (options == null)
      options = {};

    if (typeof file !== 'string')
      throw new ArgError('file', file, 'string');

    if (typeof options !== 'object')
      throw new ArgError('options', options, 'object');

    if (options.env != null
        && typeof options.env !== 'object'
        && options.env !== SHARE_ENV) {
      throw new ArgError('env', options.env,
                        ['object', 'worker_threads.SHARE_ENV']);
    }

    if (options.execArgv && !Array.isArray(options.execArgv))
      throw new ArgError('execArgv', options.execArgv, 'Array');

    if (options.resourceLimits && typeof options.resourceLimits !== 'object')
      throw new ArgError('resourceLimits', options.resourceLimits, 'object');

    if (options.dirname != null && typeof options.dirname !== 'string')
      throw new ArgError('dirname', options.dirname, 'string');

    this._child = null;
    this._parser = new Parser(this);
    this._ports = new Map();
    this._writable = true;
    this._exited = false;
    this._limits = false;
    this._exitCode = -1;
    this._stdioRef = null;
    this._stdioRefs = 0;
    this._extraRef = null;
    this._stdio = [null, null, null];

    this.threadId = uid;
    this.stdin = null;
    this.stdout = null;
    this.stderr = null;

    uid += 1;
    uid >>>= 0;

    this._init(file, options);
  }

  _init(file, options) {
    const bin = process.execPath || process.argv[0];
    const args = [];

    if (options.env === SHARE_ENV)
      throw new WorkerError(errors.NO_SHARE_ENV);

    // Validate filename.
    if (!options.eval && !file.startsWith(INLINE_PREFIX)) {
      if (!isAbsolute(file)
          && !file.startsWith('./')
          && !file.startsWith('../')
          && !file.startsWith('.' + sep)
          && !file.startsWith('..' + sep)) {
        throw new WorkerError(errors.INVALID_PATH, file);
      }

      file = resolve(file);

      const ext = extname(file);

      if (ext !== '.js' && ext !== '.cjs' && ext !== '.mjs')
        throw new WorkerError(errors.UNSUPPORTED_EXTENSION, ext);
    }

    // Setup argument vector.
    // https://github.com/nodejs/node/pull/25467
    if (options.execArgv) {
      const invalid = [];

      // Parse execArgv and look for any irregularities.
      for (let i = 0; i < options.execArgv.length; i++) {
        const arg = options.execArgv[i];

        if (typeof arg !== 'string')
          throw new ArgError('arg', arg, 'string');

        if (isIsolateOption(arg) && !isInvalidOption(arg)) {
          if (isValueOption(arg))
            i += 1;
          continue;
        }

        invalid.push(arg);
      }

      // Throw errors at the end.
      if (invalid.length > 0)
        throw new WorkerError(errors.INVALID_ARGV, invalid.join(', '));

      // Filter out isolate options (we _replace_ them).
      for (let i = 0; i < process.execArgv.length; i++) {
        const arg = process.execArgv[i];

        // Filter out uninheritable options as well.
        if (isIsolateOption(arg) || isInvalidOption(arg)) {
          if (isValueOption(arg))
            i += 1;
          continue;
        }

        args.push(arg);
      }

      // Push on all execArgv options.
      for (const arg of options.execArgv)
        args.push(arg);
    } else {
      // Filter out uninheritable options.
      for (let i = 0; i < process.execArgv.length; i++) {
        const arg = process.execArgv[i];

        if (isInvalidOption(arg)) {
          if (isValueOption(arg))
            i += 1;
          continue;
        }

        args.push(arg);
      }
    }

    // Enforce resource limits.
    const limits = new Uint32Array(3);

    if (options.resourceLimits) {
      const argsLen = args.length;
      const { maxOldSpaceSizeMb,
              maxSemiSpaceSizeMb,
              codeRangeSizeMb } = options.resourceLimits;

      if (typeof maxOldSpaceSizeMb === 'number')
        limits[0] = Math.max(maxOldSpaceSizeMb, 2);

      if (typeof maxSemiSpaceSizeMb === 'number')
        limits[1] = maxSemiSpaceSizeMb;

      if (typeof codeRangeSizeMb === 'number')
        limits[2] = codeRangeSizeMb;

      if (limits[0] > 0)
        args.push(`--max-old-space-size=${limits[0]}`);

      if (limits[1] > 0)
        args.push(`--max-semi-space-size=${limits[1]}`);

      this._limits = args.length > argsLen;
    }

    // Require bthreads on boot, but make
    // sure we're not bundled or something.
    if (!isBundled())
      ensureRequire(args, __dirname);

    // Ensure no warnings written to stdout/stderr.
    if (options.stderr) {
      ensureArgument(args, '--no-warnings');
      ensureArgument(args, '--no-deprecation');
    }

    // Eval or file?
    let inline = '';

    if (options.eval) {
      if (isBundled())
        throw new WorkerError(errors.BUNDLED_EVAL);

      args.push(join(__dirname, 'eval.js'));
    } else {
      if (file.startsWith(INLINE_PREFIX)) {
        inline = file.substring(INLINE_PREFIX.length);
        file = process.argv[1];
      }

      args.push(file);
    }

    // Setup options.
    const env = options.env || process.env;
    const opt = {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: Object.assign(Object.create(null), env, {
        BTHREADS_WORKER_ID: this.threadId.toString(10),
        BTHREADS_WORKER_DATA: encoding.stringify(options.workerData),
        BTHREADS_WORKER_STDIN: options.stdin ? '1' : '0',
        BTHREADS_WORKER_EVAL: options.eval ? '1' : '0',
        BTHREADS_WORKER_LIMITS: encoding.stringify(limits),
        BTHREADS_WORKER_DIRNAME: options.dirname
          ? path.resolve(options.dirname)
          : '',
        BTHREADS_WORKER_INLINE: inline
      })
    };

    // Spawn child process and setup refs. Note
    // node.js has a few references to play with.
    //
    // Our translation from node is something like:
    //   kHandle = child (main ref)
    //   kPort = child.stdout (stdio refs)
    //   kPublicPort = child.stderr (message refs)
    //
    // Note that kHandle is referenced by default,
    // and the others are dereferenced by default.
    //
    // We actually don't use stderr for anything
    // in reality, but we need the extra reference
    // to mimic node behavior.
    this._child = cp.spawn(bin, args, opt);
    this._stdioRef = this._child.stdout;
    this._extraRef = this._child.stderr;

    // Track of workers globally so we can kill
    // them later on (when the process exits).
    children.add(this);
    bindExit();

    this._child.unref();
    this._child.stdin.unref();
    this._child.stdout.unref();

    this._child.on('error', (err) => {
      this.emit('error', err);
    });

    this._child.once('exit', (code, signal) => {
      this._handleExit(code, signal);
    });

    // Event order for a child suddenly exiting.
    //
    // Node v8.0.0:
    // 1. stdout end
    // 2. stdin error (ECONNRESET)
    // 3. stdin close
    // 4. child exit
    //
    // Node v11.x.x (fixed with setImmediate wrapper):
    // 1. stdin error (EPIPE)
    // 2. stdout end
    // 3. child exit
    // 4. stdin close
    let ended = false;

    this._child.stdin.on('error', (err) => {
      // Node v8.0.0 emits this sometimes.
      if (err.message === 'This socket is closed')
        return;

      if (err.code === 'EPIPE'
          || err.code === 'ECONNRESET') {
        setImmediate(() => {
          if (!ended)
            this.emit('error', err);
        });
      } else {
        this.emit('error', err);
      }
    });

    this._child.stdin.on('close', () => {
      this._writable = false;
    });

    this._child.stdout.on('error', (err) => {
      this.emit('error', err);
    });

    this._child.stdout.on('end', () => {
      ended = true;
    });

    this._child.stdout.on('data', (data) => {
      try {
        this._parser.feed(data);
      } catch (e) {
        this.emit('error', e);
      }
    });

    this._child.stderr.on('error', (err) => {
      this.emit('error', err);
    });

    this._parser.on('error', (err) => {
      this._parser.destroy();

      // Kill no matter what. Note that
      // this will prevent SIGABRT from
      // presenting itself in the exit
      // handler after dying from an OOM.
      this._kill(1);

      if (this._limits) {
        // Probably an OOM:
        // v8 writes the last few GC attempts to stdout,
        // and then writes some debugging info to stderr.
        this._limits = false;
        this.emit('error', new WorkerError(errors.OUT_OF_MEMORY));
      } else {
        this.emit('error', err);
      }
    });

    this._parser.on('packet', (pkt) => {
      try {
        this._handleMessage(pkt);
      } catch (e) {
        this.emit('error', e);
      }
    });

    // kPublicPort does onmessage referencing.
    setupRefs(this._extraRef, this, 'message');

    // kPort is maintained by these streams.
    let stdin = null;

    if (options.stdin)
      stdin = new stdio.Writable(this, 0);

    const stdout = new stdio.Readable(this, 1);
    const stderr = new stdio.Readable(this, 2);

    if (!options.stdout) {
      stdout._increments = false;
      pipeWithoutWarning(stdout, process.stdout);
    }

    if (!options.stderr) {
      stderr._increments = false;
      pipeWithoutWarning(stderr, process.stderr);
    }

    // kHandle is ref'd by default.
    this._child.ref();

    this._stdio[0] = stdin;
    this._stdio[1] = stdout;
    this._stdio[2] = stderr;

    this.stdin = stdin;
    this.stdout = stdout;
    this.stderr = stderr;

    if (options.eval)
      this.postMessage(file);
  }

  _handleMessage(pkt) {
    if (this._exited)
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

      case types.ERROR: {
        this._kill(1);
        this.emit('error', decodeError(pkt.value));
        break;
      }

      case types.OPEN: {
        this.emit('online');
        break;
      }

      default: {
        throw new WorkerError(errors.INVALID_PACKET, pkt.type);
      }
    }
  }

  _handleExit(code, signal) {
    let emitOOM = false;

    // Process may have been killed with one of
    // our signal handlers. Convert back to the
    // proper signal.
    if (signal == null) {
      switch (code) {
        case 129:
          signal = 'SIGHUP';
          code = null;
          break;
        case 130:
          signal = 'SIGINT';
          code = null;
          break;
        case 143:
          signal = 'SIGTERM';
          code = null;
          break;
      }
    }

    // Convert some signals to failures.
    if (code == null) {
      switch (signal) {
        case 'SIGABRT':
        case 'SIGSEGV':
          code = 1;
          break;
      }
    }

    // A SIGTERM means we probably killed it.
    if (signal === 'SIGTERM') {
      if (this._exitCode !== -1)
        code = this._exitCode;
    }

    // Handle resource limit failures.
    if (signal === 'SIGABRT' || signal === 'SIGSEGV') {
      // Newer nodes may emit SIGABRT without writing
      // anything to stdout first, so we handle that.
      // Older nodes simply segfault if they go above
      // the limits sometimes.
      emitOOM = this._limits;
    }

    // Disable any future IO that might happen.
    this._exited = true;

    // Remove from the global list.
    children.delete(this);

    // Only wrapped in a setImmediate if
    // we need to emit an error first.
    maybeImmediate(emitOOM, () => {
      for (const port of this._ports.values())
        port.close();

      if (!this.stdout._readableState.ended)
        this.stdout.push(null);

      if (!this.stderr._readableState.ended)
        this.stderr.push(null);

      this.threadId = -1;

      this.emit('exit', code >>> 0);
      this.removeAllListeners();
    });

    // Do this last in case it throws.
    if (emitOOM)
      this.emit('error', new WorkerError(errors.OUT_OF_MEMORY));
  }

  _send(pkt) {
    if (this._exited)
      return;

    if (this._writable)
      this._child.stdin.write(pkt.encode());
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

  postMessage(value, transferList) {
    // Note: throws in node.js.
    if (this._exited)
      return;

    activate(transferList, this);

    this._send(new Packet(types.MESSAGE, 0, value));
  }

  ref() {
    // kHandle and kPublicPort ref'd.
    if (!this._exited) {
      this._child.ref();
      this._extraRef.ref();
    }
  }

  _kill(code) {
    if (this._exited)
      return;

    this._child.kill('SIGTERM');
    this._exitCode = code >>> 0;
    this._exited = true;
  }

  _terminate(code) {
    if (this._exited)
      return;

    if (!this._writable) {
      this._kill(code);
      return;
    }

    this._send(new Packet(types.EXIT, 0, code >>> 0));
    this._exited = true;
  }

  async terminate(callback) {
    if (this._exited)
      return;

    if (typeof callback === 'function')
      this.once('exit', code => callback(null, code));

    this._terminate(1);

    // See: https://github.com/nodejs/node/pull/28021
    return new Promise((resolve) => {
      this.once('exit', resolve);
    });
  }

  unref() {
    // kHandle and kPublicPort deref'd.
    if (!this._exited) {
      this._child.unref();
      this._extraRef.unref();
    }
  }

  [custom]() {
    return inspectify(Worker, {
      active: !this._exited,
      threadId: this.threadId,
      stdin: this.stdin,
      stdout: this.stdout,
      stderr: this.stderr
    });
  }
}

/*
 * Helpers
 */

function isBundled() {
  if (bundled == null) {
    // This is probably overkill.
    const path = resolve(__dirname, '..', '..', 'lib',
                         'process', 'worker.js');

    bundled = !fileEqual(__filename, path);
  }

  return bundled;
}

function fileEqual(x, y) {
  try {
    x = fs.lstatSync(x);
    y = fs.lstatSync(y);

    return x.isFile()
        && y.isFile()
        && x.ino === y.ino
        && x.dev === y.dev;
  } catch (e) {
    if (e.code === 'EPERM'
        || e.code === 'ENFILE'
        || e.code === 'EMFILE') {
      throw e;
    }
    return false;
  }
}

function ensureRequire(argv, arg) {
  const i = argv.indexOf(arg);

  if (i <= 0 || argv[i - 1] !== '-r')
    argv.push('-r', arg);
}

function ensureArgument(argv, arg) {
  const i = argv.indexOf(arg);

  if (i === -1)
    argv.push(arg);
}

function pipeWithoutWarning(source, dest) {
  const sourceMaxListeners = source._maxListeners;
  const destMaxListeners = dest._maxListeners;

  source.setMaxListeners(Infinity);
  dest.setMaxListeners(Infinity);

  try {
    source.pipe(dest);
  } finally {
    source._maxListeners = sourceMaxListeners;
    dest._maxListeners = destMaxListeners;
  }
}

function killChildren() {
  for (const child of children)
    child._kill();
}

function handleError(err) {
  console.error(getStack(err));
  process.exit(1);
}

function bindExit() {
  if (exitBound)
    return;

  exitBound = true;

  // Cleanup children on exit.
  process.once('exit', killChildren);

  // Setup new behavior to trigger the exit event.
  bindDefault(process, 'SIGHUP', () => process.exit(1 | 0x80));
  bindDefault(process, 'SIGINT', () => process.exit(2 | 0x80));
  bindDefault(process, 'SIGTERM', () => process.exit(15 | 0x80));
  bindDefault(process, 'uncaughtException', handleError);
  bindDefault(process, 'unhandledRejection', handleError);
}

function maybeImmediate(condition, func) {
  if (condition)
    setImmediate(func);
  else
    func();
}

/*
 * Expose
 */

module.exports = Worker;
