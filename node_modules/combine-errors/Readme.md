
# combine-errors

  Simple, dependency-free way to combine multiple errors into one.

  This is useful for handling multiple asynchronous errors, where you want to catch all the errors and combine them to return just a single error.

## Features

- `error instanceof Error === true`
- composable: `error([error([err1, err2]), err3])`
- stack and message are combined in a nice way
- array-like object, so you can access the original errors by looping over the error
- If you just have one error, it looks exactly like raw error meaning, `error(err).message === err.message && error(err).stack === err.stack`
- zero dependencies
- should work in the browser, though I haven't tested it yet

## Installation

```
npm install combine-errors
```

## Usage

```js
var error = require('combine-errors')
var err = error([
  new Error('boom'),
  new Error('kablam')
])
throw err
/*
=>
Error: boom
    at repl:2:1
    at REPLServer.defaultEval (repl.js:262:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:431:12)
    at emitOne (events.js:95:20)
    at REPLServer.emit (events.js:182:7)
    at REPLServer.Interface._onLine (readline.js:211:10)
    at REPLServer.Interface._line (readline.js:550:8)
    at REPLServer.Interface._ttyWrite (readline.js:827:14)

Error: kablam
    at repl:3:1
    at REPLServer.defaultEval (repl.js:262:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:431:12)
    at emitOne (events.js:95:20)
    at REPLServer.emit (events.js:182:7)
    at REPLServer.Interface._onLine (readline.js:211:10)
    at REPLServer.Interface._line (readline.js:550:8)
    at REPLServer.Interface._ttyWrite (readline.js:827:14)
*/
```

## License

MIT
