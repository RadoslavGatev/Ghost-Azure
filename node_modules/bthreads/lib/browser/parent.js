/*!
 * parent.js - parent thread port for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://nodejs.org/api/worker_threads.html#worker_threads_worker_parentport
 *   https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope
 *   https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
 *   https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent
 */

/* eslint no-global-assign: "off" */

'use strict';

const EventProxy = require('../internal/proxy');
const utils = require('../internal/utils');
const backend = require('./backend');
const common = require('./common');
const env = require('./env');

const {
  errors,
  encodeError,
  WorkerError
} = utils;

const {
  MessagePortBase,
  Packet,
  types,
  errorify
} = common;

const {
  WORKER_ID,
  WORKER_DATA,
  WORKER_ENV,
  WORKER_EVAL,
  WORKER_INLINE
} = env;

/**
 * Parent
 */

class Parent extends MessagePortBase {
  constructor() {
    super();

    this._proxy = new EventProxy(backend, true);
    this._proxy.eternal = true;
    this._workerId = WORKER_ID;
    this._workerData = WORKER_DATA;
    this._workerEval = WORKER_EVAL;
    this._closed = false;
    this._exit = this._exit.bind(this);

    this._init();
  }

  _init() {
    this._proxy.watch(this, ['message']);

    this._proxy.listen('message', (event) => {
      try {
        this._handleMessage(event);
      } catch (e) {
        this.emit('error', e);
      }
    });

    backend.onerror = (event) => {
      this._handleError(event);
    };

    backend.onmessageerror = (event) => {
      this._handleError(event);
    };

    this._inject();
    this._send(new Packet(types.OPEN));
  }

  _inject() {
    if (!backend.polyfill) {
      addListener('error', (event) => {
        event.preventDefault();
        event.stopPropagation();

        this._exception(errorify(event));
      });

      addListener('unhandledrejection', (event) => {
        let {reason} = event;

        event.preventDefault();
        event.stopPropagation();

        if (!(reason instanceof Error))
          reason = new Error('Unhandled rejection: ' + reason);

        this._exception(reason);
      });
    }

    process.abort = null;
    process.chdir = null;
    process.exit = this._exit;

    for (const key of Object.keys(WORKER_ENV))
      process.env[key] = WORKER_ENV[key];

    delete process.env.BMOCHA;

    if (WORKER_INLINE)
      process.env.BTHREADS_WORKER_INLINE = WORKER_INLINE;
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

      default: {
        throw new WorkerError(errors.INVALID_PACKET, pkt.type);
      }
    }
  }

  _handleError(event) {
    this.emit('error', errorify(event));
  }

  _exit(code) {
    this._send(new Packet(types.EXIT, code >>> 0));
  }

  close(callback) {
    if (this._closed)
      return;

    if (typeof callback === 'function')
      this.once('close', callback);

    backend.close();

    this._proxy.destroy();
    this._closed = true;

    setImmediate(() => this.emit('close'));
  }

  _exception(err) {
    this._send(new Packet(types.ERROR, encodeError(err)));
  }

  _send(pkt, transferList) {
    const [msg, list] = pkt.morph(transferList);

    backend.postMessage(msg, list);
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

/*
 * Helpers
 */

function addListener(event, handler) {
  if (global.addEventListener)
    global.addEventListener(event, handler, false);
  else if (global.attachEvent)
    global.attachEvent(`on${event}`, handler);
  else
    global[`on${event}`] = handler;
}

/*
 * Expose
 */

module.exports = Parent;
