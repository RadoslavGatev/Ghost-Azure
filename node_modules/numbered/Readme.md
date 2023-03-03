# Numbered

[![NPM version](https://img.shields.io/npm/v/numbered.svg?style=flat)](https://npmjs.org/package/numbered)
[![Build status](https://img.shields.io/travis/blakeembrey/node-numbered.svg?style=flat)](https://travis-ci.org/blakeembrey/node-numbered)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/node-numbered.svg?style=flat)](https://coveralls.io/r/blakeembrey/node-numbered?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/node-numbered.svg)](https://greenkeeper.io/)

> Stringify any number into words, and parse number strings back to a number.

## Installation

```
npm install numbered --save
```

## API

```javascript
var numbered = require('numbered');
```

* [`numbered(number | string)`](#function)
* [`numbered.parse(string)`](#parse)
* [`numbered.stringify(number)`](#stringify)

### Function

**Numbered** exposes a single function that accepts either a string or a number. The string will delegate to the `parse` method and a number will delegate to the `stringify` method.

### Parse

Parses a string into a number as best as possible.

```js
numbered.parse('ninety nine');
// 99

numbered.parse('point two five nine');
// 0.259
```

### Stringify

Stringifies a number to the words.

```js
numbered.stringify(99);
// "ninety nine"

numbered.stringify(0.259);
// "zero point two five nine"
```

## License

MIT
