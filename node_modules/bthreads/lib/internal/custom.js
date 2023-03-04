/*!
 * custom.js - custom inspect for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const {inspect} = require('util');

exports.custom = inspect.custom || 'inspect';
