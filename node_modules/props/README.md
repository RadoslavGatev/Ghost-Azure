# props

a module for node that is able to extract either JSON or YAML from the beginning
of a string

## Installation

`npm install props` or `npm install -g props`

## Usage

```js
var props = require("props");

// Use JSON

var json =
'{\n\
  "title": "How to use node.js",\n\
  "date": "2011-08-09T17:56:00",\n\
  "tags": [ "example", "node.js" ]\n\
}\n\
\n\
\n\
Node.js is a new technology...';

console.log(props(json));

// or YAML

var yaml =
'title: How to use node.js\n\
date: 2011-08-09T17:56:00\n\
tags:\n\
  - example\n\
  - node.js\n\
\n\
\n\
Node.js is a new technology...';

console.log(props(yaml));
```

This will print nearly the same object twice, since `json` and `yaml` define the
same object:

_JSON_:

```js
{ title: 'How to use node.js',
  date: '2011-08-09T17:56:00',
  tags: [ 'example', 'node.js' ],
  __content: 'Node.js is a new technology...' }

```

_YAML_:

```js
{ title: 'How to use node.js',
  date: Tue, 09 Aug 2011 15:56:00 GMT,
  tags: [ 'example', 'node.js' ],
  __content: 'Node.js is a new technology...' }
```

The difference is that, due to it's JS implementation, the Date is parsed in the
YAML version.

The JSON/YAML part has to be **always** seperated from the content by three
newline characters (`\n\n\n` or `\r\n\r\n\r\n`).

## Bugs and Issues

If you encounter any bugs or issues, feel free to open an issue at
[github](//github.com/pvorb/node-props/issues).

## License

The [MIT license](http://vorb.de/license/mit.html).
