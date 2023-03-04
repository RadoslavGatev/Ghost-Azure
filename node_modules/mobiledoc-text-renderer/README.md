## Mobiledoc Text Renderer [![Build Status](https://travis-ci.org/bustlelabs/mobiledoc-text-renderer.svg?branch=master)](https://travis-ci.org/bustlelabs/mobiledoc-text-renderer)

This is a Text renderer for the [Mobiledoc format](https://github.com/bustlelabs/mobiledoc-kit/blob/master/MOBILEDOC.md) used
by [Mobiledoc-kit](https://github.com/bustlelabs/mobiledoc-kit).

To learn more about Mobiledoc cards and renderers, see the **[Mobiledoc Cards docs](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md)**.

The renderer is a small library intended for use in servers that are building
Text documents. It may be of limited use inside browsers as well.

### Usage

```
var mobiledoc = {
  version: "0.2.0",
  sections: [
    [         // markers
      ['B']
    ],
    [         // sections
      [1, 'P', [ // array of markups
        // markup
        [
          [0],          // open markers (by index)
          0,            // close count
          'hello world'
        ]
      ]
    ]
  ]
};
var renderer = new TextRenderer({cards: []});
var rendered = renderer.render(mobiledoc);
console.log(rendered.result); // "hello world"
```

The Renderer constructor accepts a single object with the following optional properties:
  * `cards` [array] - The list of card objects that the renderer may encounter in the mobiledoc
  * `cardOptions` [object] - Options to pass to cards when they are rendered
  * `unknownCardHandler` [function] - Will be called when any unknown card is enountered

The return value from `renderer.render(mobiledoc)` is an object with two properties:
  * `result` [string] - The rendered result
  * `teardown` [function] - When called, this function will tear down the rendered mobiledoc and call any teardown handlers that were registered by cards when they were rendered

### Tests

 * `npm install -g broccoli-cli testem`
 * `npm test`

### Releasing

* `npm version patch` or `minor` or `major`
* `npm run build`
* `git push bustle --tags`
* `npm publish`
