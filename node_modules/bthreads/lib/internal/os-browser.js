/*!
 * os.js - os module for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

/*
 * OS
 */

function cpus() {
  if (!global.navigator)
    return 0;

  const len = global.navigator.hardwareConcurrency;

  if ((len >>> 0) !== len)
    return 0;

  return len;
}

/*
 * Expose
 */

exports.cpus = cpus;
