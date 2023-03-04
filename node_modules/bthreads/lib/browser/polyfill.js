/*!
 * polyfill.js - web worker polyfill for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
 */

/* global __bthreads_polyfill_scope, XMLHttpRequest */
/* eslint camelcase: "off" */

'use strict';

const clone = require('../internal/clone');
const utils = require('../internal/utils');

const {
  custom,
  inspectify,
  errors,
  DataCloneError,
  WorkerError,
  hasSelf
} = utils;

/*
 * Constants
 */

const INTERNAL = {};

const scope = typeof __bthreads_polyfill_scope === 'object'
  ? __bthreads_polyfill_scope
  : null;

const source = (() => {
  if (scope)
    return scope._location;

  const location = String(global.location);

  if (!global.document)
    return location;

  if (!global.document.currentScript)
    return location;

  if (typeof global.document.currentScript.src !== 'string')
    return location;

  return global.document.currentScript.src || location;
})();

/**
 * Cloner
 */

class Cloner extends clone.FullCloner {
  isPort(value, list) {
    const Port = scope ? scope.MessagePort : MessagePort;
    return value instanceof Port;
  }

  toPort(value, list) {
    if (value._closed || !value._port)
      throw new DataCloneError(errors.DETACHED_PORT);

    const port = value._clone();
    const remote = port._port;

    if (remote._port)
      remote._port = port;

    // Neuter the old port.
    value._port = null;
    value._closed = true;
    value._buffer.length = 0;

    return port;
  }
}

/**
 * EventTarget
 */

class EventTarget {
  constructor() {
    this._onmessage = null;
    this._onmessageerror = null;
    this._onerror = null;
    this._closed = false;
  }

  get onmessage() {
    return this._onmessage;
  }

  set onmessage(func) {
    if (typeof func === 'function') {
      this._onmessage = func;
      this._start();
    } else {
      this._onmessage = null;
    }
  }

  get onmessageerror() {
    return this._onmessageerror;
  }

  set onmessageerror(func) {
    if (typeof func === 'function')
      this._onmessageerror = func;
    else
      this._onmessageerror = null;
  }

  get onerror() {
    return this._onerror;
  }

  set onerror(func) {
    if (typeof func === 'function')
      this._onerror = func;
    else
      this._onerror = null;
  }

  _start() {
    return;
  }

  _emitError(err) {
    if (this._closed)
      return;

    setImmediate(() => {
      if (!this.onerror)
        throw err;

      this.onerror({
        message: err ? String(err.message) : String(err),
        filename: source,
        lineno: 0,
        colno: 0,
        error: err
      });
    });
  }

  _emitMessage(msg) {
    setImmediate(() => {
      if (this._closed || !this.onmessage)
        return;

      this.onmessage({ data: msg });
    });
  }
}

/**
 * Worker
 */

class Worker extends EventTarget {
  constructor(url, options) {
    if (options == null)
      options = {};

    if (typeof url !== 'string')
      throw new TypeError('Worker URL must be a string.');

    if (typeof options !== 'object')
      throw new TypeError('Worker options must be an object.');

    if (options.type === 'module')
      throw new WorkerError(errors.ES_MODULE, 'polyfill');

    if (options.name != null && typeof options.name !== 'string')
      throw new TypeError('Worker name must be a string.');

    super();

    this._child = null;
    this._buffer = [];
    this._closed = false;

    this._init(options.name, url);
  }

  _init(name, url) {
    const location = resolveURL(url);
    const xhr = new XMLHttpRequest();

    xhr.open('GET', location, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4)
        return;

      if (this._closed)
        return;

      const status = xhr.status >>> 0;

      if (status < 200 || status >= 400) {
        this._emitError(new Error(`Script not found: "${location}".`));
        this._closed = true;
        return;
      }

      const code = String(xhr.responseText || '');

      this._spawn(location, name, code);
    };

    xhr.send(null);
  }

  _spawn(location, name, code) {
    if (this._closed)
      return;

    try {
      this._child = new WorkerScope(this, location, name, code);
    } catch (e) {
      this._emitError(e);
      this._closed = true;
      return;
    }

    for (const msg of this._buffer)
      this._child._emitMessage(msg);

    this._buffer.length = 0;
  }

  postMessage(msg, transferList) {
    if (this._closed)
      return;

    if (hasSelf(transferList, this))
      throw new DataCloneError(errors.SOURCE_PORT);

    msg = Cloner.clone(msg, transferList);

    if (!this._child) {
      this._buffer.push(msg);
      return;
    }

    this._child._emitMessage(msg);
  }

  terminate() {
    if (this._closed)
      return;

    this._closed = true;
  }

  [custom]() {
    return inspectify(Worker);
  }
}

/**
 * WorkerScope
 */

class WorkerScope extends EventTarget {
  constructor(worker, location, name, code) {
    super();

    this.MessagePort = scope ? scope.MessagePort : MessagePort;
    this.MessageChannel = scope ? scope.MessageChannel : MessageChannel;

    this._worker = worker;
    this._location = location;
    this._name = name;
    this._closed = false;

    this.execute(code);
  }

  execute(code) {
    evalScript(code, [
      // Pass the current scope.
      ['__bthreads_polyfill_scope', this],
      // This might come in handy.
      ['importScripts', this.importScripts.bind(this)],
      // Make sure the console is lexically scoped.
      ['console', console]
    ]);
  }

  close() {
    if (this._closed)
      return;

    this._worker.terminate();
    this._closed = true;
  }

  postMessage(msg, transferList) {
    if (this._closed)
      return;

    if (hasSelf(transferList, this))
      throw new DataCloneError(errors.SOURCE_PORT);

    msg = Cloner.clone(msg, transferList);

    this._worker._emitMessage(msg);
  }

  importScripts(...args) {
    if (this._closed)
      return;

    for (const url of args) {
      const location = resolveURL(String(url), this._location);
      const xhr = new XMLHttpRequest();

      xhr.open('GET', location, false);

      try {
        xhr.send(null);
      } catch (e) {
        throw new Error(`Could not load script: "${location}".`);
      }

      const status = xhr.status >>> 0;

      if (status < 200 || status >= 400)
        throw new Error(`Script not found: "${location}".`);

      const body = xhr.responseText || '';

      this.execute(String(body));
    }
  }
}

/**
 * MessagePort
 */

class MessagePort extends EventTarget {
  constructor(safety) {
    super();

    if (safety !== INTERNAL)
      throw new TypeError('Illegal constructor');

    this._port = null;
    this._closed = false;
    this._buffer = [];
  }

  _clone() {
    const port = new this.constructor(INTERNAL);

    port._port = this._port;
    port._closed = this._closed;
    port._buffer = this._buffer.slice(0);

    return port;
  }

  _start() {
    if (this._port)
      this._port._flush();
  }

  _flush() {
    if (!this._port)
      return;

    if (!this._port.onmessage)
      return;

    for (const msg of this._buffer)
      this._port._emitMessage(msg);

    this._buffer.length = 0;
  }

  start() {}

  close() {
    if (this._closed)
      return;

    if (!this._port)
      return;

    this._closed = true;
  }

  postMessage(msg, transferList) {
    if (this._closed)
      return;

    if (!this._port)
      return;

    if (hasSelf(transferList, this))
      throw new DataCloneError(errors.SOURCE_PORT);

    msg = Cloner.clone(msg, transferList);

    if (!this._port.onmessage) {
      this._buffer.push(msg);
      return;
    }

    this._port._emitMessage(msg);
  }

  [custom]() {
    return inspectify(MessagePort);
  }
}

/**
 * MessageChannel
 */

class MessageChannel {
  constructor() {
    this.port1 = new MessagePort(INTERNAL);
    this.port2 = new MessagePort(INTERNAL);
    this.port1._port = this.port2;
    this.port2._port = this.port1;
  }
}

/*
 * Helpers
 */

function evalScript(code, args) {
  const names = [];
  const values = [global];

  for (const [name, value] of args) {
    names.push(name);
    values.push(value);
  }

  const func = new Function(names.join(','), code);

  return func.call(...values);
}

function resolveURL(to, from) {
  if (typeof URL !== 'function')
    return to;

  if (from && /^(?:data|blob):/i.test(from))
    from = null;

  // Note: does a script element resolve relative URLs
  // from global.location or the currentScript location?
  // This may be `source` instead of `global.location`.
  if (!from)
    from = scope ? scope._location : global.location;

  return (new URL(to, String(from))).href;
}

/*
 * Expose
 */

module.exports = (() => {
  if (scope) {
    return {
      self: global,
      Worker,
      MessagePort: scope.MessagePort,
      MessageChannel: scope.MessageChannel,
      location: scope._location,
      name: scope._name,
      close() {
        scope.close();
      },
      postMessage(msg, transferList) {
        scope.postMessage(msg, transferList);
      },
      importScripts(...args) {
        scope.importScripts(...args);
      },
      get onmessage() {
        return scope.onmessage;
      },
      set onmessage(func) {
        scope.onmessage = func;
      },
      get onmessageerror() {
        return scope.onmessageerror;
      },
      set onmessageerror(func) {
        scope.onmessageerror = func;
      },
      get onerror() {
        return scope.onerror;
      },
      set onerror(func) {
        scope.onerror = func;
      },
      polyfill: true
    };
  }

  return {
    self: global,
    Worker,
    MessagePort,
    MessageChannel,
    location: String(global.location),
    name: '',
    close() {
      return;
    },
    postMessage(msg, transferList) {
      return;
    },
    importScripts: undefined,
    get onmessage() {
      return null;
    },
    set onmessage(func) {
      return;
    },
    get onmessageerror() {
      return null;
    },
    set onmessageerror(func) {
      return;
    },
    get onerror() {
      return null;
    },
    set onerror(func) {
      return;
    },
    polyfill: true
  };
})();
