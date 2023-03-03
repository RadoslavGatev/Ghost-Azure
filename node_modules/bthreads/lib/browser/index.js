/*!
 * index.js - browser backend for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const backend = require('./backend');

if (typeof backend.postMessage === 'function'
    && typeof backend.importScripts === 'function'
    && backend.self === global) {
  module.exports = require('./thread');
} else if (typeof backend.Worker === 'function') {
  module.exports = require('./main');
} else {
  throw new Error('Web workers are unsupported.');
}
