/*!
 * common.js - common functions for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport
 *   https://nodejs.org/api/worker_threads.html#worker_threads_class_messagechannel
 */

'use strict';

const BufferedEmitter = require('../internal/buffered');
const clone = require('../internal/clone');
const utils = require('../internal/utils');
const Packet = require('./packet');
const {types} = Packet;

const {
  custom,
  inspectify,
  errors,
  DataCloneError,
  WorkerError,
  hasDuplicates,
  hasSelf
} = utils;

/*
 * Constants
 */

// 32-bit pid + 20-bit id = 52 bit max
const PID = process.pid * (2 ** 20);
const MIN_ID = 1;
const MAX_ID = 2 ** 20;

let uid = MIN_ID;

/**
 * Collector
 */

class Collector extends clone.Collector {
  isPort(value) {
    return value instanceof MessagePort;
  }
}

/**
 * Cloner
 */

class Cloner extends clone.FullCloner {
  isPort(value, list) {
    return value instanceof MessagePortBase;
  }

  toPort(value, list) {
    if (value._closed || !value._port || value._dead)
      throw new DataCloneError(errors.DETACHED_PORT);

    const port = value._clone();
    const remote = port._port;

    if (remote._port)
      remote._port = port;

    if (port._parent)
      port._parent.ports.set(port._id, port);

    // Neuter the old port.
    value._id = 0;
    value._parent = null;
    value._port = null;
    value._dead = true;
    value._active = false;
    value._proxy = false;
    value._list = false;
    value._closed = true;

    return port;
  }
}

/**
 * MessagePortBase
 */

class MessagePortBase extends BufferedEmitter {
  constructor() {
    super();

    this._id = 0;
    this._parent = null;
    this._port = null;
    this._dead = false;
    this._active = false;
    this._proxy = false;
    this._closed = true;
    this._list = false;
    this._onmessage = null;
    this._bthreadsPort = true;
  }

  _clone() {
    const port = new this.constructor();

    port._id = this._id;
    port._parent = this._parent;
    port._port = this._port;
    port._dead = this._dead;
    port._active = this._active;
    port._proxy = this._proxy;
    port._closed = this._closed;
    port._list = this._list;
    port._bthreadsPort = this._bthreadsPort;

    return port;
  }

  get onmessage() {
    return this._onmessage;
  }

  set onmessage(func) {
    if (this._onmessage) {
      this.removeListener('message', this._onmessage);
      this._onmessage = null;
    }

    if (typeof func === 'function') {
      const target = this;
      const listener = data => func({ target, data });

      this.addListener('message', listener);
      this._onmessage = listener;
    }
  }

  close() {
    return;
  }

  postMessage(value, transferList) {
    return;
  }

  ref() {
    return;
  }

  start() {
    return;
  }

  unref() {
    return;
  }

  [custom]() {
    return inspectify(MessagePort, {
      active: !this._closed,
      refed: !this._closed
    });
  }
}

/**
 * MessagePort
 */

class MessagePort extends MessagePortBase {
  constructor() {
    super();
    this._closed = false;
  }

  _handleMessage(pkt) {
    switch (pkt.type) {
      case types.MESSAGE: {
        const msg = pkt.value;

        // We need to crawl the message,
        // collect all the ports, and add
        // them to the transfer list.
        if (this._proxy) {
          this._port._send(msg, Collector.collect(msg));
          break;
        }

        if (!this._closed && !this._dead)
          this.emit('message', msg);

        break;
      }

      case types.CLOSE: {
        if (this._parent)
          this._parent._ports.delete(this._id);

        if (this._proxy) {
          this._port._close();
          break;
        }

        if (!this._closed && !this._dead) {
          this._closed = true;
          this.emit('close');
          this.removeAllListeners();
        }

        break;
      }

      default: {
        throw new WorkerError(errors.INVALID_PACKET, pkt.type);
      }
    }
  }

  _close() {
    if (!this._parent)
      return;

    this._parent._send(new Packet(types.CLOSE, this._id));
    this._parent._ports.delete(this._id);
  }

  _send(value, transferList) {
    if (!this._parent)
      return;

    if (hasSelf(transferList, this))
      throw new DataCloneError(errors.SOURCE_PORT);

    const pkt = new Packet();

    pkt.type = types.MESSAGE;
    pkt.port = this._id;
    pkt.value = value;

    activate(transferList, this._parent);

    this._parent._send(pkt);
  }

  _remote() {
    if (this._closed
        || this._dead
        || this._active
        || !this._port
        || this._port._closed
        || this._port._dead
        || this._port.active) {
      return null;
    }

    return this._port;
  }

  close(callback) {
    if (this._closed || this._dead)
      return;

    if (typeof callback === 'function')
      this.once('close', callback);

    const remote = this._remote();

    if (remote) {
      if (!remote._closed) {
        remote._closed = true;

        setImmediate(() => {
          remote.emit('close');
          remote.removeAllListeners();
        });
      }

      this._closed = true;

      setImmediate(() => {
        this.emit('close');
        this.removeAllListeners();
      });

      return;
    }

    this._close();
    this._closed = true;

    setImmediate(() => {
      this.emit('close');
      this.removeAllListeners();
    });
  }

  postMessage(value, transferList) {
    if (this._closed || this._dead)
      return;

    const remote = this._remote();

    if (remote) {
      const msg = Cloner.clone(value, transferList);

      setImmediate(() => {
        if (!remote._closed && !remote._dead)
          remote.emit('message', msg);
      });

      return;
    }

    this._send(value, transferList);
  }

  ref() {
    return;
  }

  start() {
    return;
  }

  unref() {
    return;
  }
}

/**
 * MessageChannel
 */

class MessageChannel {
  constructor() {
    const id = nextID();

    this.port1 = new MessagePort();
    this.port1._id = id;

    this.port2 = new MessagePort();
    this.port2._id = id;

    this.port1._port = this.port2;
    this.port2._port = this.port1;
  }
}

/*
 * Helpers
 */

function nextID() {
  if ((process.pid >>> 0) !== process.pid)
    throw new Error('Invalid PID for worker.');

  const id = PID + uid;

  uid += 1;

  if (uid === MAX_ID)
    uid = MIN_ID;

  return id;
}

function activate(transferList, parent) {
  if (transferList == null)
    return;

  if (!Array.isArray(transferList))
    throw new TypeError(errors.INVALID_LIST);

  if (hasDuplicates(transferList))
    throw new DataCloneError(errors.DUPLICATE_ITEM);

  for (const item of transferList) {
    if (item instanceof MessagePort) {
      if (item._closed)
        throw new DataCloneError(errors.DETACHED_PORT);

      if (!item._port) {
        if (!item._active)
          throw new Error('Invalid state (active).');

        // We received a port but sent it somewhere else.
        const local = new MessagePort();
        const remote = item;

        // Link ports together.
        remote._port = local;
        local._id = remote._id;
        local._port = remote;

        // Make it look like the `local._dead`
        // case below for the sake of brevity.
        local._dead = true;
      }

      const local = item._port;
      const remote = item;

      if (remote._dead) {
        // Message port already transferred.
        throw new DataCloneError(errors.DETACHED_PORT);
      }

      if (local._active) {
        // Message port already activated.
        throw new DataCloneError(errors.DETACHED_PORT);
      }

      // Sanity checks.
      if (local._id !== remote._id)
        throw new Error('Invalid state (id mismatch).');

      if (local._port !== remote || remote._port !== local)
        throw new Error('Invalid state (port mismatch).');

      if (local._id === 0)
        throw new Error('Invalid state (id collision).');

      if (remote._proxy || local._proxy)
        throw new Error('Invalid state (proxied).');

      if (local._dead) {
        // We sent port1 to thread A and port2 to thread B.
        if (!remote._active || !remote._parent)
          throw new Error('Invalid state (activity).');

        if (parent === remote._parent) {
          // Are we sending both sides of the port?
          // We sent port1 _and_ port2 to thread A (why?).
          remote._dead = true;
          remote._active = false;
          remote._parent = null;
          remote._list = true;
          parent._ports.delete(remote._id);
          continue;
        }

        // Now we're the middleman for two threads.
        local._proxy = true;
        remote._proxy = true;
      } else {
        // We sent port1 to thread A and kept port2.
        if (remote._active || remote._parent)
          throw new Error('Invalid state (parent).');
      }

      if (parent._ports.has(local._id))
        throw new Error('Invalid state (id collision).');

      remote._dead = true;
      remote._list = true;

      local._parent = parent;
      local._active = true;

      parent._ports.set(local._id, local);

      continue;
    }

    if (item instanceof MessagePortBase)
      throw new DataCloneError(errors.DETACHED_PORT);

    if (!(item instanceof ArrayBuffer))
      throw new WorkerError(errors.INVALID_OBJECT);
  }
}

/*
 * Expose
 */

exports.MessagePortBase = MessagePortBase;
exports.MessagePort = MessagePort;
exports.MessageChannel = MessageChannel;
exports.activate = activate;
