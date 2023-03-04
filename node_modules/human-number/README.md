# human-number

![Last version](https://img.shields.io/github/tag/Kikobeats/human-number.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/human-number.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/human-number)
[![NPM Status](https://img.shields.io/npm/dm/human-number.svg?style=flat-square)](https://www.npmjs.org/package/human-number)

> Convert number to a human readable string (`13500` → `13.5K`) based on [SI prefixes](https://en.wikipedia.org/wiki/Metric_prefix).

## Install

```bash
$ npm install human-number --save
```

## Usage

```js
const humanNumber = require('human-number')
humanNumber(100) // 100
humanNumber(1_000) // 1K
humanNumber(1_500) // 1.5K
humanNumber(10_000) // 10K
humanNumber(10_500) // 10.5K
humanNumber(100_000) // 100K
humanNumber(100_500) // 100.5K
humanNumber(1_000_000) // 1M
humanNumber(1_500_000) // 1.5M
humanNumber(1_000_000_000) // 1B
humanNumber(1_500_000_000) // 1.5B
humanNumber(1_000_000_000_000) // 1T
humanNumber(1_500_000_000_000) // 1.5T
```

You can pass a mapper as second parameter:

```js
const humanNumber = require('human-number')
humanNumber(100, n => Number.parseFloat(n).toFixed(1)) // '100.0'
```

## License

**human-number** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/human-number/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/human-number/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
