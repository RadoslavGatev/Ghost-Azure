# microsoft-capitalize

<p align="center">
  <br>
  <img src="https://docs.microsoft.com/en-us/style-guide/welcome/media/index/writingstyleguidebanner.png" alt="microsoft-capitalize">
  <br>
</p>

![Last version](https://img.shields.io/github/tag/Kikobeats/microsoft-capitalize.svg?style=flat-square)
[![Build Status](https://img.shields.io/travis/com/Kikobeats/microsoft-capitalize/master.svg?style=flat-square)](https://travis-ci.com/Kikobeats/microsoft-capitalize)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/microsoft-capitalize.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/microsoft-capitalize)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/microsoft-capitalize?style=flat-square)](https://bundlephobia.com/result?p=microsoft-capitalize)
[![NPM Status](https://img.shields.io/npm/dm/microsoft-capitalize.svg?style=flat-square)](https://www.npmjs.org/package/microsoft-capitalize)

> Sentence-style capitalization in titles and headings based on [Microsoft Styleguide](https://docs.microsoft.com/en-us/style-guide/capitalization).

- Capitalize the first word of a sentence.
- Be possible to omit specific exceptions.
- Use lowercase for everything else.

## Install

```bash
$ npm install microsoft-capitalize --save
```

## Usage

```js
const capitalize = require('microsoft-capitalize')

capitalize('Microlink CDN: Global Edge Cache')
// => 'Microlink CDN: Global edge cache'

// handling dot corner cases
capitalize('autopilot 2.5')
// => 'Autopilot 2.5'

// passing exceptions
capitalize('JSON+LD & oEmbed', ['oEmbed'])
// => 'JSON+LD & oEmbed'
```

## API

### capitalize(input, [exceptions])

#### input

*Required*<br>
Type: `string`

The input string to be capitalize.

#### exceptions

Type: `string[]`

A list of words to be excluded.

## License

**microsoft-capitalize** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/microsoft-capitalize/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/Kikobeats/microsoft-capitalize/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
