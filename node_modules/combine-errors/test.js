'use strict'

/**
 * Module Dependencies
 */

let assert = require('assert')
var errors = require('./')

/**
 * Tests
 */

describe('combine-errors', function() {
  it('should pass through single errors', function() {
    var a = new TypeError('a')
    assert.ok(errors(a).message === a.message)
    assert.ok(errors(a).stack === a.stack)
    assert.ok(errors(a) instanceof Error)
  })

  it('should create a multierror for multiple errors', function() {
    var a = new TypeError('a')
    var b = new Error('b')
    var err = errors([a, b])
    assert.ok(err instanceof Error)
    assert.equal(err.message, 'a; b')
    assert.ok(~err.stack.indexOf('TypeError: a'))
    assert.ok(~err.stack.indexOf('Error: b'))
  })

  it('should group multiple errors that are the same into one', function() {
    var a = new TypeError('a')
    var err = errors([a, a])
    assert.ok(err instanceof Error)
    assert.equal(err.message, 'a')
    assert.ok(~err.stack.indexOf('TypeError: a'))
  })

  it('should allow you to overwrite the message', function() {
    var a = new TypeError('a')
    var b = new Error('b')
    var err = errors([a, b])
    assert.ok(err instanceof Error)
    err.message = err.message + ' (at: file)'
    assert.equal(err.message, 'a; b (at: file)')
    assert.ok(~err.stack.indexOf('TypeError: a'))
    assert.ok(~err.stack.indexOf('Error: b'))
  })

  it('should compose nicely', function() {
    var a = new SyntaxError('a')
    var b = new TypeError('b')
    var c = new Error('c')
    var ab = errors([a, b])
    var abc = errors([ab, c])
    abc.message = abc.message + ' (at: file)'
    assert.equal(abc.message, 'a; b; c (at: file)')
    assert.ok(~abc.stack.indexOf('SyntaxError: a'))
    assert.ok(~abc.stack.indexOf('TypeError: b'))
    assert.ok(~abc.stack.indexOf('Error: c'))
    assert.equal(abc.errors.length, 3)
  })
})
