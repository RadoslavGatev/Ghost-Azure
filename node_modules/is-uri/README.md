# is-uri

![Last version](https://img.shields.io/github/tag/Kikobeats/is-uri.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/is-uri.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/is-uri)
[![NPM Status](http://img.shields.io/npm/dm/is-uri.svg?style=flat-square)](https://www.npmjs.org/package/is-uri)

> Determinate if a string is a valid URI. Based in [uri](https://www.npmjs.com/package/validate.io-uri) but works out of the box and improved.

## Install

```bash
$ npm install is-uri --save
```

## Usage

```js
var isUri = require('is-uri')
isUri('http://google.com') //=> true
```

## API

### isUri(str, [options])

`options` are passed to [parse-uri](https://github.com/Kikobeats/parse-uri#parse-uri) module.

### Related

- [parse-uri](https://github.com/Kikobeats/parse-uri#parse-uri) – Lightweight module for parse an URI.

## License

MIT © [Kiko Beats](http://kikobeats.com)
