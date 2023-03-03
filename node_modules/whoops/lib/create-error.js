'use strict'

const {inherits} = require('./helpers')
const mimicFn = require('mimic-fn')

const REGEX_CLASS_NAME = /[^0-9a-zA-Z_$]/

function createError (className) {
  if (typeof className !== 'string') {
    throw new TypeError('Expected className to be a string')
  }

  if (REGEX_CLASS_NAME.test(className)) {
    throw new Error('className contains invalid characters')
  }

  function ErrorClass () {
    Object.defineProperty(this, 'name', {
      configurable: true,
      value: className,
      writable: true
    })

    Error.captureStackTrace(this, this.constructor)
  }

  inherits(ErrorClass, Error)
  mimicFn(ErrorClass, Error)
  return ErrorClass
}

module.exports = createError
