"use strict";

var isStringBlank = require('is-string-blank');

function isSANB(val) {
  return typeof val === 'string' && !isStringBlank(val);
}

module.exports = isSANB;