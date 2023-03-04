[![Build status][build-image]][build-url]
[![Tests coverage][cov-image]][cov-url]
[![npm version][npm-image]][npm-url]

# punycode2

## Modular version of [punycode](https://github.com/bestiejs/punycode.js) package

Provides individual functionalities as following distinct modules:

- `punycode2/decode`
- `punycode2/encode`
- `punycode2/to-ascii`
- `punycode2/to-unicode`
- `punycode2/ucs2/encode`
- `punycode2/ucs2/decode`

### Installation

#### NPM

In your project path:

    $ npm install punycode2

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

## Tests [![Build Status](https://travis-ci.org/medikoo/punycode2.png)](https://travis-ci.org/medikoo/ppunycode2)

    $ npm test

[build-image]: https://github.com/medikoo/punycode2/workflows/Integrate/badge.svg
[build-url]: https://github.com/medikoo/punycode2/actions?query=workflow%3AIntegrate
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/punycode2.svg
[cov-url]: https://codecov.io/gh/medikoo/punycode2
[npm-image]: https://img.shields.io/npm/v/punycode2.svg
[npm-url]: https://www.npmjs.com/package/punycode2
