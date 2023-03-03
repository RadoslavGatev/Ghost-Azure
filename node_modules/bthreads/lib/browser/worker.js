/*!
 * worker.js - worker object for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://nodejs.org/api/worker_threads.html#worker_threads_class_worker
 *   https://developer.mozilla.org/en-US/docs/Web/API/AbstractWorker
 *   https://developer.mozilla.org/en-US/docs/Web/API/Worker
 *   https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
 *   https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
 */

/* global register */

'use strict';

const {EventEmitter} = require('events');
const EventProxy = require('../internal/proxy');
const utils = require('../internal/utils');
const backend = require('./backend');
const common = require('./common');
const env = require('./env');

const {
  errors,
  INLINE_PREFIX,
  custom,
  inspectify,
  decodeError,
  ArgError,
  WorkerError
} = utils;

const {
  Packet,
  types,
  errorify
} = common;

/*
 * Constants
 */

const DEFAULT_BOOTSTRAP_URL =
  'https://unpkg.com/bthreads-bundle@0.5.1/index.js';

const BOOTSTRAP_URL = env.WORKER_BOOTSTRAP || DEFAULT_BOOTSTRAP_URL;

const SHARE_ENV = Symbol.for('nodejs.worker_threads.SHARE_ENV');

let uid = 1;

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

    if (options.type != null && typeof options.type !== 'string')
      throw new ArgError('type', options.type, 'string');

    if (options.credentials != null && typeof options.credentials !== 'string')
      throw new ArgError('credentials', options.credentials, 'string');

    if (options.bootstrap != null
        && options.bootstrap !== false
        && typeof options.bootstrap !== 'string') {
      throw new ArgError('bootstrap', options.bootstrap, ['string', 'false']);
    }

    this._worker = null;
    this._proxy = null;
    this._exited = false;

    this.threadId = uid;
    this.stdin = null;
    this.stdout = null;
    this.stderr = null;

    uid += 1;
    uid >>>= 0;

    this._init(file, options);
  }

  _init(file, options) {
    let url = file;
    let code = null;
    let {type, bootstrap} = options;
    let inline = null;

    if (options.env === SHARE_ENV)
      throw new WorkerError(errors.NO_SHARE_ENV);

    if (options.stdin != null
        || options.stdout != null
        || options.stderr != null) {
      throw new WorkerError(errors.NO_STDIO);
    }

    if (options.eval) {
      if (bootstrap === false) {
        url = createCodeURL(file);
        file = null;
      } else {
        url = bootstrap || BOOTSTRAP_URL;
        code = file;
        file = url;
      }
    }

    if (file != null) {
      if (type == null)
        type = scriptType(file);

      if (file.startsWith(INLINE_PREFIX)) {
        inline = file.substring(INLINE_PREFIX.length);
        file = String(backend.location);
      } else if (isURL(file)) {
        if (!isSameOrigin(file))
          url = createWorkerURL(file, type);
      } else if (process.env.BMOCHA && typeof register === 'function') {
        register(file, [__dirname, file]);
      }
    }

    this._worker = new backend.Worker(url, {
      type: type,
      credentials: options.credentials || undefined,
      name: JSON.stringify([
        this.threadId,
        options.workerData,
        Boolean(options.eval),
        options.dirname || null,
        String(backend.location),
        options.env || process.env,
        inline,
        bootstrap || env.WORKER_BOOTSTRAP
      ])
    });

    if (url !== file)
      revokeCodeURL(url);

    this._proxy = new EventProxy(this._worker, true);
    this._proxy.eternal = true;

    this._proxy.watch(this, ['message', 'error', 'online', 'exit']);

    this._proxy.listen('message', (event) => {
      try {
        this._handleMessage(event);
      } catch (e) {
        this.emit('error', e);
      }
    });

    this._worker.onerror = (event) => {
      this._handleError(event);
    };

    this._worker.onmessageerror = (event) => {
      this._handleError(event);
    };

    if (code != null)
      this.postMessage(code);
  }

  _handleMessage(event) {
    if (this._exited)
      return;

    const pkt = Packet.decode(event.data);

    switch (pkt.type) {
      case types.MESSAGE: {
        this.emit('message', pkt.value);
        break;
      }

      case types.ERROR: {
        this._terminate(1);
        this.emit('error', decodeError(pkt.value));
        break;
      }

      case types.OPEN: {
        this.emit('online');
        break;
      }

      case types.EXIT: {
        this._terminate(pkt.value);
        break;
      }

      default: {
        throw new WorkerError(errors.INVALID_PACKET, pkt.type);
      }
    }
  }

  _handleError(event) {
    this._terminate(1);
    this.emit('error', errorify(event));
  }

  _send(pkt, transferList) {
    if (this._exited)
      return;

    const [msg, list] = pkt.morph(transferList);

    this._worker.postMessage(msg, list);
  }

  postMessage(value, transferList) {
    // Note: throws in node.js.
    if (this._exited)
      return;

    this._send(new Packet(types.MESSAGE, value), transferList);
  }

  ref() {
    return;
  }

  _terminate(code) {
    if (this._exited)
      return;

    this._worker.terminate();
    this._exited = true;

    setImmediate(() => {
      this.threadId = -1;

      this.emit('exit', code >>> 0);
      this._proxy.destroy();
      this.removeAllListeners();
    });
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
    return;
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
 * DOM Wrappers
 */

function createURL(file) {
  const URL = global.URL;

  if (typeof URL !== 'function')
    throw new Error('No URL backend found.');

  return new URL(file);
}

function createObjectURL(blob) {
  const URL = global.URL;

  if (typeof URL !== 'function')
    throw new Error('No URL backend found.');

  if (typeof URL.createObjectURL !== 'function')
    throw new Error('Object URLs not supported.');

  return URL.createObjectURL(blob);
}

function revokeObjectURL(url) {
  const URL = global.URL;

  if (typeof URL !== 'function')
    throw new Error('No URL backend found.');

  if (typeof URL.revokeObjectURL !== 'function')
    throw new Error('URL revocations not supported.');

  return URL.revokeObjectURL(url);
}

function createBlob(data, type) {
  const Blob = global.Blob;
  const BlobBuilder = global.BlobBuilder
                   || global.WebKitBlobBuilder
                   || global.MozBlobBuilder;

  // Native Blob object.
  if (typeof Blob === 'function')
    return new Blob([data], { type });

  // Deprecated BlobBuilder object.
  if (typeof BlobBuilder !== 'function')
    throw new Error('No Blob backend found.');

  const bb = new BlobBuilder();

  bb.append(data);

  return bb.getBlob(type);
}

/*
 * Helpers
 */

function createWorkerURL(url, scriptType) {
  const location = JSON.stringify(url);

  // Our polyfill doesn't create globals,
  // but we can access importScripts from
  // `__bthreads_polyfill_scope`.
  const importScripts = backend.polyfill
    ? '__bthreads_polyfill_scope.importScripts'
    : 'importScripts';

  const code = scriptType !== 'module'
    ? `${importScripts}(${location});`
    : `import ${location};`;

  return createCodeURL(code);
}

function createCodeURL(code) {
  const type = 'application/javascript';

  // Try an object URL first.
  if (!backend.polyfill) {
    try {
      return createObjectURL(createBlob(code, type));
    } catch (e) {
      ;
    }
  }

  // Fallback to data URI.
  return `data:${type},${encodeURIComponent(code)}`;
}

function revokeCodeURL(url) {
  if (!/^blob:/.test(url))
    return;

  try {
    revokeObjectURL(url);
  } catch (e) {
    ;
  }
}

function scriptType(file) {
  try {
    file = createURL(file).pathname;
  } catch (e) {
    ;
  }

  // Support .mjs (node.js style).
  if (/\.mjs/.test(file))
    return 'module';

  return 'classic';
}

function isURL(file) {
  try {
    createURL(file);
    return true;
  } catch (e) {
    return false;
  }
}

function isSameOrigin(file) {
  let {origin, location} = global;

  // We don't care about worker
  // origin rules in our polyfill.
  if (backend.polyfill)
    return true;

  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/origin
  if (typeof origin === 'string' && origin !== 'null') {
    try {
      origin = createURL(origin);
    } catch (e) {
      origin = location;
    }
  } else {
    origin = location;
  }

  // No hostname. What?
  if (typeof origin.hostname !== 'string')
    return true;

  // We only care about http(s).
  switch (origin.protocol) {
    case 'http:':
    case 'https:':
      break;
    default:
      return true;
  }

  let url = null;

  try {
    url = createURL(file);
  } catch (e) {
    // Not a URL.
    return true;
  }

  // We only care about http(s).
  switch (url.protocol) {
    case 'http:':
    case 'https:':
      break;
    default:
      return true;
  }

  // Does same origin use the port?
  // Could use `host` instead of `hostname`.
  return url.protocol === origin.protocol
      && url.hostname === origin.hostname;
}

/*
 * Expose
 */

module.exports = Worker;
