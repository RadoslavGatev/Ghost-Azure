## Mobiledoc DOM Renderer [![Build Status](https://travis-ci.org/bustlelabs/mobiledoc-dom-renderer.svg?branch=master)](https://travis-ci.org/bustlelabs/mobiledoc-dom-renderer)

This is a DOM renderer for the [Mobiledoc format](https://github.com/bustlelabs/mobiledoc-kit/blob/master/MOBILEDOC.md) used
by [Mobiledoc-Kit](https://github.com/bustlelabs/mobiledoc-kit).

To learn more about Mobiledoc cards and renderers, see the **[Mobiledoc Cards docs](https://github.com/bustlelabs/mobiledoc-kit/blob/master/CARDS.md)**.

The renderer is a small library intended for use in browser clients.

### Usage

```js
var mobiledoc = {
  version: "0.3.0",
  markups: ["B"],
  atoms: [],
  cards: [],
  sections: [
    [1, 'P', [ // array of markers
      // marker
      [ 0,            // marker type 0 (standard text)
        [0],          // open markups (by index)
        0,            // close count
        'hello world'
      ]
    ]
  ]
};
var renderer = new MobiledocDOMRenderer({cards: []});
var rendered = renderer.render(mobiledoc);
var result = rendered.result;
document.getElementById('output').appendChild(result);
// renders <div><p><b>hello world</b></b></div>
// into 'output' element
```

The Renderer constructor accepts a single object with the following optional properties:

  * `cards` [array] - The list of card objects that the renderer may encounter in the mobiledoc
  * `atoms` [array] - The list of atom objects that the renderer may encounter in the mobiledoc
  * `cardOptions` [object] - Options to pass to cards and atoms when they are rendered
  * `unknownCardHandler` [function] - Will be called when any unknown card is enountered
  * `unknownAtomHandler` [function] - Will be called when any unknown atom is enountered
  * `sectionElementRenderer` [object] - A map of hooks for section element rendering.
    * Valid keys are P, H1, H2, H3, H4, H5, H6, BLOCKQUOTE, ASIDE
    * Arguments are `tagName, dom`
    * A valid value is a function that returns an element
  * `markupElementRenderer` [object] - A map of hooks for inline element rendering.
    * Valid keys are B, I, STRONG, EM, A, U, SUB, SUP, S, CODE
    * Arguments are `tagName, dom, attributes={}`
    * A valid value is a function that returns an element
  * `dom` [object] - A native or [SimpleDOM](https://github.com/krisselden/simple-dom)
    implementation of the DOM.

The return value from `renderer.render(mobiledoc)` is an object with two properties:
  * `result` [DOM Node] - The rendered result
  * `teardown` [function] - When called, this function will tear down the rendered mobiledoc and call any teardown handlers that were registered by cards when they were rendered

#### Rendering HTML

In a browser, rendering to HTML is simple:

```js
var renderer = new MobiledocDOMRenderer();
var rendered = renderer.render(mobiledoc);
var html = rendered.result.outerHTML;
```

However on the server in Node.js, native DOM APIs are not available. To make
server-rendering easy, this DOM
renderer is [SimpleDOM](https://github.com/krisselden/simple-dom)
compatible. You may pass an instance of a SimpleDOM document and serialize
its output. For example:

```js
var renderer = new MobiledocDOMRenderer({
  dom: new SimpleDOM.Document()
});
var rendered = renderer.render(mobiledoc);
var serializer = new SimpleDOM.HTMLSerializer([]);
var html = serializer.serializeChildren(rendered.result);
```

This usage of the DOM renderer for rendering HTML has the advantage of allowing
developers to easily implement cards that work in a server and client context.

#### sectionElementRenderer

Use this renderer option to customize what element is used when rendering
a section.

```
var renderer = new MobiledocDOMRenderer({
  sectionElementRenderer: {
    P: function(_, dom) { return dom.createElement('span'); },
    H1: function(_, dom) { return dom.createElement('h2'); },
    H2: function(tagName, dom) {
      var element = dom.createElement(tagName);
      element.setAttribute('class', 'subheadline');
      return element;
    }
    /* Valid keys are P, H1, H2, H3, H4, H5, H6, BLOCKQUOTE, ASIDE */
  }
});
var rendered = renderer.render(mobiledoc);
```

#### markupElementRenderer

Use this renderer option to customize what inline tags are used when rendering
a section's content.

```
var renderer = new MobiledocDOMRenderer({
  markupElementRenderer: {
    B: function(_, dom) { return dom.createElement('strong'); },
    A: function(tagName, dom, attrs={}) {
      let element = dom.createElement(tagName);

      for (let attr in attrs) {
        element.setAttribute(attr, attrs[attr]);
      }

      element.setAttribute('rel', 'nofollow');
      return element;
    }
  }
});
var rendered = renderer.render(mobiledoc);
```

#### Attribute Sanitization (XSS Protection)

Mobiledoc DOM Renderer sanitizes the `href` attribute of 'A' markups, prefixing
the string `unsafe:` on potentially unsafe urls. It determines an environment-
appropriate URL protocol parser. In rare cases it may be unable to determine one
(this can happen when running the renderer in a Node VM Sandbox, like ember-cli-
fastboot does), and will throw in that case. To fix this, you can provide a
custom markupElementRenderer for the 'A' tag that will be used instead of the
default.

### Tests

 * To run tests via testem: `npm test`
 * To run tests in the browser: `npm start` and open http://localhost:4200/tests

### Releasing

* Use `np` (install with `npm install -g np`)
* `np <version>` (e.g. `np 0.5.2`)
* `git push --tags`
