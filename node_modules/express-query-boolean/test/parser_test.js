'use strict';

var parser = require('../lib/parse');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.parser = {
  setUp: function(done) {
    this.options = {};

    done();
  },

  true: function(test) {
    test.deepEqual(
      parser({
        a: 'true'
      }),
      {
        a: true
      },
      'Converts \'true\' string.'
    );

    test.done();
  },

  false: function(test) {
    test.deepEqual(
      parser({
        a: 'false'
      }),
      {
        a: false
      },
      'Converts \'false\' string.'
    );

    test.done();
  },

  empty: function(test) {
    test.deepEqual(
      parser({
        a: ''
      }),
      {
        a: ''
      },
      'Doesn\'t convert empty string.'
    );

    test.done();
  },

  recursive: function(test) {
    test.deepEqual(
      parser({
        a: {
          b: 'true',
          c: 'false'
        }
      }),
      {
        a: {
          b: true,
          c: false
        }
      },
      'Recursively parses object.'
    );

    test.done();
  },

  array: function(test) {
    test.deepEqual(
      parser({
        array: [
          { a: 'true' },
          { b: 'false' },
          { c: 'test' },
        ],
      }),
      {
        array: [
          { a: true },
          { b: false },
          { c: 'test' },
        ],
      },
      'Recursively parses array.'
    );

    test.done();
  }

};
