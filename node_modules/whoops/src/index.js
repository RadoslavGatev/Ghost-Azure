'use strict'

const createExtendError = require('./create-extend-error')
const createError = require('./create-error')

const createErrorClass = ErrorClass => (className, props) => {
  const errorClass = createError(className || ErrorClass.name)
  return createExtendError(errorClass, props)
}

module.exports = createErrorClass(Error)
module.exports.type = createErrorClass(TypeError)
module.exports.range = createErrorClass(RangeError)
module.exports.eval = createErrorClass(EvalError)
module.exports.syntax = createErrorClass(SyntaxError)
module.exports.reference = createErrorClass(ReferenceError)
module.exports.uri = createErrorClass(URIError)
