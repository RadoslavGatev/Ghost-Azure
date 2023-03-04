# whoops

![Last version](https://img.shields.io/github/tag/Kikobeats/whoops.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/whoops.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/whoops)
[![NPM Status](http://img.shields.io/npm/dm/whoops.svg?style=flat-square)](https://www.npmjs.org/package/whoops)

> It makes simple throw qualified errors. Inspired in [errno](https://github.com/rvagg/node-errno), [create-error-class](https://github.com/floatdrop/create-error-class) and [fault](https://github.com/wooorm/fault).

## Why

- An easy way to create qualified errors.
- Using the standard `Error` interface in browser and NodeJS.
- Attach extra information, being flexible with whatever user case.

This library is a compromise to provide a clean API for use `Error` native class.

## Install

```bash
npm install whoops --save
```

Basically it turns:

```js
const error = Error('Something is wrong')
error.name = 'DAMNError'
throw error // => 'DAMNError: ENOFILE, Something is wrong'
```

Into a one line more productive declaration:

```js
const whoops = require('whoops')
const userError = whoops('UserError')

throw userError('User not found') // => 'UserError: User not found'
```

## Creating Qualified Errors

Call `whoops` to get a constructor function. Every time you call the constructor, you get an `Error` instance:

```js
const whoops = require('whoops')
const myError = whoops()
throw myError()
```

Create domain specific errors providing a `className` as first argument:

```js
const whoops = require('whoops')
const userError = whoops('userError')
throw userError()
```

The qualified error will be extends from `Error`:

```js
const whoops = require('whoops')
const userError = whoops('userError')
const error = userError()
console.log(error instanceof Error); // => true
```

Attach extra information passing a `props` as second argument:

```js
const whoops = require('whoops')
const userError = whoops('userError', {code: 'ENOVALID'})
const err = userError()
console.log(`My error code is ${err.code}`) // => My error code is ENOVALID
```

You can associate dynamic `props` as well:

```js
const whoops = require('whoops')
const userError = whoops('userError', {
  code: 'ENOVALID',
  message: props => `User '${props.username}' not found`
})

const err = userError({username: 'kiko'})
console.log(err.message) // => User 'kiko' not found
```

## Error Types

By default you will get `Error` instances calling whoops, but you can get different errors calling the properly method:

| Name           | Method           |
|----------------|------------------|
| [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)          | whoops           |
| [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError)      | whoops.type      |
| [RangeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError)     | whoops.range     |
| [EvalError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError)      | whoops.eval      |
| [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError)    | whoops.syntax    |
| [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) | whoops.reference |
| [URIError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError)       | whoops.uri       |

## Extra: Always throw/return an Error!

If you code implementation is

- **synchronous**, throws `Error`. If you just return the `Error` nothings happens!.
- **asynchronous**, returns `Error` in the first argument of the callback (or using promises).

About asynchronous code, is correct return a `Object` that is not a `Error` in the first argument of the callback to express unexpected behavior, but the `Object` doesn't have a type and definitely can't  follow a error interface for determinate a special behavior:

```js
callback('LOL something was wrong') // poor
callback({message: 'LOL something was wrong' } // poor, but better
callback(whoops('LOL, something was wrong') // BEST!
```

Passing always an `Error` you can can associated different type of error with different behavior:

```js
switch (err.name) {
  case 'JSONError':
    console.log('your error logic here')
    break
  default:
    console.log('undefined code')
    break
};
```

## Related

- [create-error-class](https://github.com/floatdrop/create-error-class) – Create error class.
- [fault](https://github.com/wooorm/fault) – Functional errors with formatted output.


## License

MIT © [Kiko Beats](http://www.kikobeats.com)
