# reachable-url

![Last version](https://img.shields.io/github/tag/Kikobeats/reachable-url.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/reachable-url.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/reachable-url)
[![NPM Status](https://img.shields.io/npm/dm/reachable-url.svg?style=flat-square)](https://www.npmjs.org/package/reachable-url)

> Given an URL, it resolves as fast as possible, performing a GET without downloading the body.

## Install

```bash
$ npm install reachable-url --save
```

## Usage

```js
const reachableUrl = require('reachable-url')

reachableUrl.isReachable(await reachableUrl('https://google.com')) // => true
```

## API

### reachableUrl(input, [options])

#### url

*Required*<br>
Type: `string`

The target URL to be resolved.

#### options

Same as [got#options](https://github.com/sindresorhus/got#goturl-options)

## License

**reachable-url** © [Kiko Beats](https://kikobeats.com), released under the [MIT](https://github.com/Kikobeats/reachable-url/blob/master/LICENSE.md) License.<br>
Authored and maintained by Kiko Beats with help from [contributors](https://github.com/Kikobeats/reachable-url/contributors).

> [kikobeats.com](https://kikobeats.com) · GitHub [Kiko Beats](https://github.com/Kikobeats) · Twitter [@Kikobeats](https://twitter.com/Kikobeats)
