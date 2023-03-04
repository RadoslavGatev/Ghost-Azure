'use strict'

module.exports = {
  isFunction: obj => typeof obj === 'function',
  isString: obj => typeof obj === 'string',
  composeErrorMessage: (code, description) => `${code}, ${description}`,
  inherits: (ctor, superCtor) => {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })
  }
}
