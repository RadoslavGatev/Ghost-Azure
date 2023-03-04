'use strict'

/**
 * Module Dependencies
 */

var Custom = require('custom-error-instance')
var uniq = require('lodash.uniqby')

/**
 * Use a custom error type
 */

var MultiError = Custom('MultiError')

/**
 * Export `Error`
 */

module.exports = error

/**
 * Initialize an error
 */

function error (errors) {
  if (!(this instanceof error)) return new error(errors)
  errors = Array.isArray(errors) ? errors : [ errors ]
  errors = uniq(errors, function (err) { return err.stack })
  if (errors.length === 1) return errors[0]
  var multierror = new MultiError({
    message: errors.map(function (err) { return err.message }).join('; '),
    errors: errors.reduce(function (errs, err) { return errs.concat(err.errors || err) }, []),
  })

  // lazily get/set the stack
  multierror.__defineGetter__('stack', function() {
    return errors.map(function (err) { return err.stack }).join('\n\n')
  })

  multierror.__defineSetter__('stack', function(value) {
    return [value].concat(multierror.stack).join('\n\n')
  })

  return multierror
}
