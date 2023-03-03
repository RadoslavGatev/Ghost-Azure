# is-string-and-not-blank

[![build status](https://img.shields.io/travis/com/niftylettuce/is-string-and-not-blank.svg)](https://travis-ci.com/niftylettuce/is-string-and-not-blank)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/is-string-and-not-blank.svg)](https://codecov.io/gh/niftylettuce/is-string-and-not-blank)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/is-string-and-not-blank.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/is-string-and-not-blank.svg)](https://npm.im/is-string-and-not-blank)

> 3x as fast as `is-whitespace` and `whitespace-regex` thanks to `is-string-blank`.  This package is a simple function that accepts an argument and returns `true` if it is a string AND it is not blank.  Supports Node and Browser environments.


## Table of Contents

* [Install](#install)
  * [Node](#node)
  * [Browser](#browser)
* [Usage](#usage)
  * [Node](#node-1)
  * [Browser](#browser-1)
* [Background](#background)
* [Benchmark](#benchmark)
* [Contributors](#contributors)
* [License](#license)


## Install

### Node

[npm][]:

```sh
npm install is-string-and-not-blank
```

[yarn][]:

```sh
yarn add is-string-and-not-blank
```

### Browser

See [Browser](#browser-1) usage below for more information.


## Usage

### Node

```js
const isSANB = require('is-string-and-not-blank');

// returns false because it's a blank string
console.log(isSANB('    ')); // false

// returns true because it's a string and is not blank
console.log(isSANB('foo')); // true

// returns false because it's not a string
console.log(isSANB([])); // false

// returns false because it's not a string
console.log(isSANB([ 'test', 'test', 'test'])); // false

// returns true because it's a string and it is not blank
console.log(isSANB(' foo ')); // true
```

### Browser

#### VanillaJS

**The browser-ready bundle is only 566 bytes (minified and gzipped)**.

```html
<script src="https://unpkg.com/is-string-and-not-blank"></script>
<script type="text/javascript">
  (function() {
    // returns false because it's a blank string
    console.log(isSANB('    ')); // false

    // returns true because it's a string and is not blank
    console.log(isSANB('foo')); // true

    // returns false because it's not a string
    console.log(isSANB([])); // false

    // returns false because it's not a string
    console.log(isSANB([ 'test', 'test', 'test'])); // false

    // returns true because it's a string and it is not blank
    console.log(isSANB(' foo ')); // true
  });
</script>
```

#### Bundler

If you're using something like [browserify][], [webpack][], or [rollup][], then install the package as you would with [Node](#node) above.


## Background

I made this after running into a bug with Firefox Klar/Focus, specifically related to `underscore.string` exposing `s` as the global, and that WebView overriding the global variable `s`.  See [mozilla-mobile/focus-android#4295](https://github.com/mozilla-mobile/focus-android/issues/4295), [epeli/underscore.string#523](https://github.com/epeli/underscore.string/issues/523), and [epeli/underscore.string#415](https://github.com/epeli/underscore.string/issues/415).

Also, using `underscore.string` just for its `s.isBlank` function is not preferable, and `is-whitespace`, and all other solutions did not save me the stress of having to type out `if (typeof foo === 'string' && !isBlank(foo))`.

This is a simple package that returns `true` if and only if the argument passed is a String and it is not blank, otherwise it returns `false`.  No more false positives for arguments that are Arrays or other types (which for some reason other authors did not consider...?).

Other packages out there solve this problem similarly, however they do not return the same conditional test:

* [is-whitespace](https://github.com/jonschlinkert/is-whitespace) - you would need to further supplement this via `if (typeof str === 'string' && !isWhitespace(str))`
* [is-string-blank](https://github.com/plotly/is-string-blank) - same as `is-whitespace` above
* [is-blank](https://www.npmjs.com/package/is-blank) - same as `is-whitespace` and `is-string-blank` above


## Benchmark

See the test folder for a benchmark check integrated with the tests.

```sh
ℹ whitespace-regex  x 44,939,232 ops/sec ±2.44% (85 runs sampled)
ℹ is-string-and-not-blank x 145,034,505 ops/sec ±2.33% (86 runs sampled)
```


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[browserify]: https://github.com/browserify/browserify

[webpack]: https://github.com/webpack/webpack

[rollup]: https://github.com/rollup/rollup
