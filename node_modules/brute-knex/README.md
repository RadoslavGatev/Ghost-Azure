# brute-knex

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependencies-image]][dependencies-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[![NPM][npm-image]][npm-url]

## A [knex.js](http://knexjs.org/) store for [express-brute](https://github.com/AdamPflug/express-brute).

### Installation

  via npm:

      $ npm install brute-knex

### Usage

Refer to the [example application](https://github.com/llambda/brute-knex/blob/master/example.js).

### Options

- `tablename`         Table name (default 'brute') to store records in.
- `createTable`       Set to `false` (default `true`) to disable automatically creating `tablename` if it does not exist.
- `knex`              knex instance to use. If not provided, defaults to a sqlite3 database named ./brute-knex.sqlite

### Testing

`yarn test`

You can create a custom config file in the root folder.
Take a look at the example config, which is the fallback.

e.g. `config.testing-mysql.json`

[npm-version-image]: https://img.shields.io/npm/v/brute-knex.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/brute-knex.svg
[npm-image]: https://nodei.co/npm/brute-knex.png?downloads=true&downloadRank=true&stars=true
[npm-url]: https://npmjs.org/package/brute-knex
[travis-image]: https://img.shields.io/travis/llambda/brute-knex/master.svg
[travis-url]: https://travis-ci.org/llambda/brute-knex
[dependencies-image]: https://david-dm.org/llambda/brute-knex.svg?style=flat
[dependencies-url]: https://david-dm.org/llambda/brute-knex
[coveralls-image]: https://img.shields.io/coveralls/llambda/brute-knex/master.svg
[coveralls-url]: https://coveralls.io/r/llambda/brute-knex?branch=master
[node-image]: https://img.shields.io/node/v/brute-knex.svg
[node-url]: http://nodejs.org/download/
[gitter-join-chat-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-channel-url]: https://gitter.im/llambda/brute-knex
[express-session-url]: https://github.com/expressjs/session
[io-url]: https://iojs.org

