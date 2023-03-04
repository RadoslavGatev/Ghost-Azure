'use strict'

const { isFunction, composeErrorMessage } = require('./helpers')

function interfaceObject (error, ...props) {
  Object.assign(error, ...props)

  error.description = isFunction(error.message) ? error.message(error) : error.message

  error.message = error.code
    ? composeErrorMessage(error.code, error.description)
    : error.description
}

module.exports = interfaceObject
