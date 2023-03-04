/*!
 * backend.js - browser backend selection for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

/* global __bthreads_polyfill_scope */
/* eslint camelcase: "off" */

'use strict';

const native = !process.env.BTHREADS_BACKEND
  || process.env.BTHREADS_BACKEND === 'web_workers'
  || process.env.BTHREADS_BACKEND === 'worker_threads';

if (native && global.Worker && typeof __bthreads_polyfill_scope !== 'object') {
  module.exports = {
    self: global.self,
    Worker: global.Worker,
    MessagePort: global.MessagePort,
    MessageChannel: global.MessageChannel,
    location: String(global.location),
    name: global.name,
    close: typeof global.close === 'function'
      ? global.close.bind(global)
      : global.close,
    postMessage: typeof global.postMessage === 'function'
      ? global.postMessage.bind(global)
      : global.postMessage,
    importScripts: typeof global.importScripts === 'function'
      ? global.importScripts.bind(global)
      : global.importScripts,
    get onmessage() {
      return global.onmessage;
    },
    set onmessage(func) {
      global.onmessage = func;
    },
    get onmessageerror() {
      return global.onmessageerror;
    },
    set onmessageerror(func) {
      global.onmessageerror = func;
    },
    get onerror() {
      return global.onerror;
    },
    set onerror(func) {
      global.onerror = func;
    },
    polyfill: false
  };
} else {
  module.exports = require('./polyfill');
}
