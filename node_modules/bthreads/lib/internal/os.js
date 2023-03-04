/*!
 * os.js - os module for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const os = require('os');

/*
 * OS
 */

function cpus() {
  return os.cpus().length;
}

/*
 * Expose
 */

exports.cpus = cpus;
