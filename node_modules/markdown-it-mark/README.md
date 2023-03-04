# markdown-it-mark

[![CI](https://github.com/markdown-it/markdown-it-mark/workflows/CI/badge.svg?branch=master)](https://github.com/markdown-it/markdown-it-mark/actions)
[![NPM version](https://img.shields.io/npm/v/markdown-it-mark.svg?style=flat)](https://www.npmjs.org/package/markdown-it-mark)
[![Coverage Status](https://img.shields.io/coveralls/markdown-it/markdown-it-mark/master.svg?style=flat)](https://coveralls.io/r/markdown-it/markdown-it-mark?branch=master)

> `<mark>` tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

__v3.+ requires `markdown-it` v10.+, see changelog.__

`==marked==` => `<mark>inserted</mark>`

Markup uses the same conditions as CommonMark [emphasis](http://spec.commonmark.org/0.15/#emphasis-and-strong-emphasis).


## Install

node.js, browser:

```bash
npm install markdown-it-mark --save
bower install markdown-it-mark --save
```

## Use

```js
var md = require('markdown-it')()
            .use(require('markdown-it-mark'));

md.render('==marked==') // => '<p><mark>marked</mark></p>'
```

_Differences in browser._ If you load script directly into the page, without
package system, module will add itself globally as `window.markdownitMark`.


## License

[MIT](https://github.com/markdown-it/markdown-it-mark/blob/master/LICENSE)
