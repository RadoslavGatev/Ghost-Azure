/*!
 * bthreads.js - worker threads for javascript
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

try {
  module.exports = require('./threads');
} catch (e) {
  module.exports = require('./process');
}
