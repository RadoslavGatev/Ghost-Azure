/*!
 * is-proxy.js - is-proxy check for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const util = require('util');

if (util.types && util.types.isProxy) {
  module.exports = util.types.isProxy;
} else {
  module.exports = function isProxy(obj) {
    return false;
  };
}
