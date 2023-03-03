# parse-uri

![Last version](https://img.shields.io/github/tag/Kikobeats/parse-uri.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/parse-uri.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/parse-uri)
[![NPM Status](http://img.shields.io/npm/dm/parse-uri.svg?style=flat-square)](https://www.npmjs.org/package/parse-uri)

> Lightweight module for parsing an URI Based in [Steven Levithan](http://blog.stevenlevithan.com/archives/parseuri) method.

## Install

```bash
$ npm install parse-uri --save
```

## Usage

```js
const parseUri = require('parse-uri')

parseUri('myURL')
```

## API

### parseURI(str, [options])

#### options

##### strictMode

Type: `boolean`
Default: `false`

Determinate if use `loose` or `strict` mode.

> Loose mode deviates slightly from the official generic URI spec ([RFC 3986](http://tools.ietf.org/html/rfc3986))

### Related

- [is-uri](https://github.com/Kikobeats/is-uri#is-uri) – Determinate if a string is a valid URI.

## License

MIT © [Kiko Beats](http://kikobeats.com)
