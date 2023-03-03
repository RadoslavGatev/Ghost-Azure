/*!
 * common.js - common functions for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://nodejs.org/api/worker_threads.html#worker_threads_class_messageport
 *   https://nodejs.org/api/worker_threads.html#worker_threads_class_messagechannel
 *   https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
 *   https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel
 *   https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
 *   https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
 */

'use strict';

const BufferedEmitter = require('../internal/buffered');
const clone = require('../internal/clone');
const EventProxy = require('../internal/proxy');
const utils = require('../internal/utils');
const backend = require('./backend');

const {
  custom,
  inspectify,
  errors,
  DataCloneError,
  WorkerError,
  ArgError
} = utils;

/*
 * Constants
 */

const types = {
  MESSAGE: 0,
  ERROR: 1,
  OPEN: 2,
  CLOSE: 3,
  EXIT: 4,
  MAX_TYPE: 4
};

/**
 * Cloner
 */

class Cloner extends clone.Cloner {
  isPort(value, options) {
    return value instanceof MessagePortBase;
  }

  toPort(value, options) {
    if (value._closed || !value._port)
      throw new DataCloneError(errors.DETACHED_PORT);
    return value._port;
  }
}

/**
 * Uncloner
 */

class Uncloner extends clone.Uncloner {
  isPort(value, options) {
    return value instanceof backend.MessagePort;
  }

  toPort(value, options) {
    return new MessagePort(value);
  }
}

/**
 * MessagePortBase
 */

class MessagePortBase extends BufferedEmitter {
  constructor() {
    super();

    this._port = null;
    this._proxy = null;
    this._closed = true;
    this._onmessage = null;

    // For encoding.stringify:
    this._dead = false;
    this._bthreadsPort = true;
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
      refed: !this._closed && this._proxy && this._proxy.count > 0
    });
  }
}

/**
 * MessagePort
 */

class MessagePort extends MessagePortBase {
  constructor(port) {
    super();

    if (!(port instanceof backend.MessagePort))
      throw new ArgError('port', port, 'MessagePort');

    this._port = port;
    this._proxy = new EventProxy(port, true);
    this._proxy.eternal = true;
    this._closed = false;

    this._init();
  }

  _init() {
    this._proxy.watch(this, ['message', 'close']);

    this._proxy.listen('message', (event) => {
      try {
        this._handleMessage(event);
      } catch (e) {
        this.emit('error', e);
      }
    });

    this._port.onmessageerror = (event) => {
      this._handleError(event);
    };
  }

  _handleMessage(event) {
    if (this._closed)
      return;

    const pkt = Packet.decode(event.data);

    switch (pkt.type) {
      case types.MESSAGE: {
        this.emit('message', pkt.value);
        break;
      }

      case types.CLOSE: {
        this._port.close();
        this._proxy.destroy();
        this._closed = true;
        this.emit('close');
        this.removeAllListeners();
        break;
      }

      default: {
        throw new WorkerError(errors.INVALID_PACKET, pkt.type);
      }
    }
  }

  _handleError(event) {
    const err = errorify(event);

    if (this._parent)
      this._parent.emit('error', err);
    else
      this.emit('error', err);
  }

  close(callback) {
    if (this._closed)
      return;

    if (typeof callback === 'function')
      this.once('close', callback);

    this._send(new Packet(types.CLOSE));
    this._port.close();
    this._proxy.destroy();
    this._closed = true;

    setImmediate(() => {
      this.emit('close');
      this.removeAllListeners();
    });
  }

  _send(pkt, transferList) {
    const [msg, list] = pkt.morph(transferList);

    this._port.postMessage(msg, list);
  }

  postMessage(value, transferList) {
    if (this._closed)
      return;

    this._send(new Packet(types.MESSAGE, value), transferList);
  }

  ref() {
    return;
  }

  start() {
    this._proxy.start();
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
    const {port1, port2} = new backend.MessageChannel();

    this.port1 = new MessagePort(port1);
    this.port2 = new MessagePort(port2);
  }
}

/**
 * Packet
 */

class Packet {
  constructor(type, value) {
    this.type = type || 0;
    this.value = value;
  }

  morph(transferList) {
    const [value, list, port] = Cloner.morph(this.value, transferList);
    return [[this.type, value, port], list];
  }

  encode(port) {
    const value = port
      ? Cloner.clone(this.value)
      : this.value;

    return [this.type, value, port];
  }

  decode(msg) {
    if (!Array.isArray(msg) || msg.length !== 3)
      throw new ArgError('msg', msg, 'Array');

    const [type, value, port] = msg;

    if ((type >>> 0) !== type || type > types.MAX_TYPE)
      throw new WorkerError(errors.INVALID_PACKET, type);

    this.type = type;
    this.value = port ? Uncloner.unclone(value) : value;

    return this;
  }

  static decode(msg) {
    return new this().decode(msg);
  }
}

/*
 * Static
 */

Packet.types = types;

/*
 * Helpers
 */

function errorify(event) {
  if (event instanceof Error)
    return event;

  if (event.error instanceof Error)
    return event.error;

  if (event.message == null && event.filename == null)
    return new Error(String(event.type || 'unknown'));

  return new Error(`${event.message} `
                 + `(${event.filename}`
                 + `:${event.lineno}`
                 + `:${event.colno})`);
}

/*
 * Expose
 */

exports.MessagePortBase = MessagePortBase;
exports.MessagePort = MessagePort;
exports.MessageChannel = MessageChannel;
exports.types = types;
exports.Packet = Packet;
exports.errorify = errorify;
