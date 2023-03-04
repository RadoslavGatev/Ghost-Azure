express-query-boolean
==================

> Convert query strings to dates for express/connect applications.

[![npm](https://img.shields.io/npm/v/express-query-boolean.svg)](https://www.npmjs.com/package/express-query-boolean)
[![build status](https://travis-ci.org/mariusc23/express-query-boolean.svg)](https://travis-ci.org/mariusc23/express-query-boolean)


## Installation

    npm install --save express-query-boolean


## Getting Started
The module will recursively attempt to parse every property in `req.query`.

Load it right after `bodyParser`:

```js
var boolParser = require('express-query-boolean');

// [...]

app.use(bodyParser.json());
app.use(boolParser());
```

#### Without
```js
// ?a=true&b[c]=false
console.log(req.query);
// => { a: 'true', b: { c: 'false' } }
```

#### With
```js
// ?a=true&b[c]=false
console.log(req.query);
// => { a: true, b: { c: false } }
```


## License
Copyright (c) 2015 Marius Craciunoiu. Licensed under the MIT license.
