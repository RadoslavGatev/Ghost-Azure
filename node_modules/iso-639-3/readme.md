# iso-639-3

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[ISO 639-3][iso] codes in an accessible format, all of them.

Also includes pre-built indexes to map from 639-3 codes to other codes:

*   [`iso-639-3/to-1`][to-1]
    — Map ISO 639-3 codes to ISO 639-1 codes
*   [`iso-639-3/to-2b`][to-2b]
    — Map ISO 639-3 codes to bibliographic ISO 639-2 codes
*   [`iso-639-3/to-2t`][to-2t]
    — Map ISO 639-3 codes to terminologic ISO 639-2 codes

## Install

[npm][]:

```sh
npm install iso-639-3
```

## Use

```js
var iso6393 = require('iso-639-3')

console.log(iso6393.slice(1820, 1830))
```

Yields:

```js
[
  {name: 'En', type: 'living', scope: 'individual', iso6393: 'enc'},
  {name: 'Ende', type: 'living', scope: 'individual', iso6393: 'end'},
  {name: 'Forest Enets', type: 'living', scope: 'individual', iso6393: 'enf'},
  {
    name: 'English',
    type: 'living',
    scope: 'individual',
    iso6393: 'eng',
    iso6392B: 'eng',
    iso6392T: 'eng',
    iso6391: 'en'
  },
  {name: 'Tundra Enets', type: 'living', scope: 'individual', iso6393: 'enh'},
  {name: 'Enlhet', type: 'living', scope: 'individual', iso6393: 'enl'},
  {
    name: 'Middle English (1100-1500)',
    type: 'historical',
    scope: 'individual',
    iso6393: 'enm',
    iso6392B: 'enm',
    iso6392T: 'enm'
  },
  {name: 'Engenni', type: 'living', scope: 'individual', iso6393: 'enn'},
  {name: 'Enggano', type: 'living', scope: 'individual', iso6393: 'eno'},
  {name: 'Enga', type: 'living', scope: 'individual', iso6393: 'enq'}
]
```

## API

### `iso6393`

`Array.<Language>` — List of [`Language`][language]s.

### `Language`

Object with the following properties:

*   `name` (`string`) — Language name
*   `type` (`string`) — Language type ([`Type`][type])
*   `scope` (`string`) — Language scope ([`Scope`][scope])
*   `iso6393` (`string`) — ISO 639-3 code
*   `iso6392B` (`string?`) — Bibliographic ISO 639-2 code
*   `iso6392T` (`string?`) — Terminologic ISO 639-2 code
*   `iso6391` (`string?`) — ISO 639-1 code

### `Type`

`string`, one of the following:

*   `'living'` — still spoken languages
    (example: `nhi` for `Zacatlán-Ahuacatlán-Tepetzintla Nahuatl`)
*   `'historical'` — distinct from any modern languages that are descended from
    it
    (example: `ofs` for `Old Frisian`)
*   `'extinct'` — language that went extinct in recent time
    (example: `rbp` for `Barababaraba`)
*   `'ancient'` — language that went extinct in ancient times
    (example: `got` for `Gothic`)
*   `'constructed'` — artificial languages, but not programming languages
    (example: `epo` for `Esperanto`)
*   `'special'` — non-language codes
    (example: `und` for `Undetermined`)

### `Scope`

`string`, one of the following:

*   `'individual'` — normal, single language
    (example: `eng` for `English`)
*   `'macrolanguage'` — one-to-many grouping of languages, because older ISO
    639s included them
    (example: `ara` for `Arabic`)
*   `'special'` — non-language codes
    (example: `und` for `Undetermined`).

## Related

*   [`bcp-47`](https://github.com/wooorm/bcp-47)
    — Parse and serialize BCP 47 language tags
*   [`bcp-47-match`](https://github.com/wooorm/bcp-47-match)
    — Match BCP 47 language tags with language ranges per RFC 4647
*   [`bcp-47-normalize`](https://github.com/wooorm/bcp-47-normalize)
    — Normalize, canonicalize, and format BCP 47 tags
*   [`iso-3166`](https://github.com/wooorm/iso-3166)
    — ISO 3166 codes
*   [`iso-639-2`](https://github.com/wooorm/iso-639-2)
    — ISO 639-2 codes
*   [`iso-15924`](https://github.com/wooorm/iso-15924)
    — ISO 15924 codes
*   [`un-m49`](https://github.com/wooorm/un-m49)
    — UN M49 codes

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/iso-639-3.svg

[build]: https://travis-ci.org/wooorm/iso-639-3

[downloads-badge]: https://img.shields.io/npm/dm/iso-639-3.svg

[downloads]: https://www.npmjs.com/package/iso-639-3

[size-badge]: https://img.shields.io/bundlephobia/minzip/iso-639-3.svg

[size]: https://bundlephobia.com/result?p=iso-639-3

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[iso]: https://iso639-3.sil.org

[language]: #language

[type]: #type

[scope]: #scope

[to-1]: to-1.json

[to-2b]: to-2b.json

[to-2t]: to-2t.json
