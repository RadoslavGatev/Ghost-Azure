/*!
 * env.js - worker environment for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const backend = require('./backend');

/*
 * Env
 */

function parseEnv(name) {
  let items = null;

  try {
    if (name)
      items = JSON.parse(name);
  } catch (e) {
    ;
  }

  if (!items) {
    return {
      WORKER_ID: 0,
      WORKER_DATA: undefined,
      WORKER_EVAL: false,
      WORKER_DIRNAME: null,
      WORKER_LOCATION: null,
      WORKER_ENV: {},
      WORKER_INLINE: null,
      WORKER_BOOTSTRAP: null
    };
  }

  return {
    WORKER_ID: items[0],
    WORKER_DATA: items[1],
    WORKER_EVAL: items[2],
    WORKER_DIRNAME: items[3],
    WORKER_LOCATION: items[4],
    WORKER_ENV: items[5],
    WORKER_INLINE: items[6],
    WORKER_BOOTSTRAP: items[7]
  };
}

/*
 * Expose
 */

let name = null;

if (typeof backend.postMessage === 'function'
    && typeof backend.importScripts === 'function'
    && backend.self === global) {
  name = backend.name;
}

module.exports = parseEnv(name);
