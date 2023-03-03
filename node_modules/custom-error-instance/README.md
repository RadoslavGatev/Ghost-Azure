# custom-error-instance

## Why?

Errors are thrown when your code enters a state of instability, but depending on the error you may want to handle it differently. This module provides a way for you to define distinctive errors so that you can respond to them accordingly. See the *practical example* section for an example.

## About

Produce custom JavaScript errors that:

 - Integrate seamlessly with NodeJS' existing Error implementation.
 - Extend the Error object without altering it.
 - Create an inheritance hierarchy of custom errors and sub custom errors.
 - Have instanceof types and instance constructor names.
 - Accept additional properties.
 - Produce custom error output.
 - Will produce a stack trace of the length you specify.
 - Plugable, create your own error instance generators.

## Install

```sh
npm install custom-error-instance
```

## Basic Example

```js
var CustomError = require('custom-error-instance');
var e;

// define a custom error with a default message
var Parent = CustomError('ParentError', { message: 'Parent error' });

// define a custom error that inherits from the Parent custom error
var Child = CustomError('ChildError', Parent, { message: 'Child error' });

// create an error instance that uses defaults
e = Parent();
console.log(e.toString());          // "ParentError: Parent error"
console.log(e.message);             // "Parent error"
console.log(e.name);                // "ParentError"
console.log(e.constructor.name);    // "ParentError"
console.log(e instanceof Parent);   // true
console.log(e instanceof Error);    // true

// create an error instance that overwrites the default message
e = Parent('Hello');
console.log(e.toString());          // "ParentError: Hello"
console.log(e.message);             // "Hello"
console.log(e.name);                // "ParentError"
console.log(e.constructor.name);    // "ParentError"
console.log(e instanceof Parent);   // true
console.log(e instanceof Error);    // true

// create an error instance that overwrites the default message and defines a code
e = Parent({ message: 'Hello', code: 'XYZ' });
console.log(e.toString());          // "ParentError XYZ: Hello"
console.log(e.message);             // "Hello"
console.log(e.name);                // "ParentError"
console.log(e.constructor.name);    // "ParentError"
console.log(e instanceof Parent);   // true
console.log(e instanceof Error);    // true

// create an error instance of the Child custom error
e = Child();
console.log(e.toString());          // "ParentError: Child error"
console.log(e.message);             // "Child error"
console.log(e.name);                // "ChildError"
console.log(e.constructor.name);    // "ChildError"
console.log(e instanceof Child);    // true
console.log(e instanceof Parent);   // true
console.log(e instanceof Error);    // true
```

## Practical Example

```js
var CustomError = require('custom-error-instance');
var store = {};

var Err = CustomError('MapError');
Err.inuse = CustomError(Err, { message: 'The specified key is already in use.', code: 'INUSE' });

function add(key, value) {
    if (Math.random() < .3) throw new Err('Random Error');
    if (store.hasOwnProperty(key)) throw new Err.inuse();
    store[key] = value;
}

try {
    add('x', 1);
    add('x', 2);
} catch (e) {
    if (e instanceof Err.inuse) {
        console.error(e.toString());        // "MapError INUSE: The specified key is already in use."
    } else if (e instanceof Err) {
        console.error('Unexpected ' + e);   // "Unexpected MapError: Random Error"
    } else {
        throw e;
    }
}
```

## API

This module has just one function that is used to produce custom error constructors.

#### CustomError ( [ name ] [, parent ] [, properties ] [, factory ] )

Call this function to create a custom error constructor function.

**Parameters**

- **name** - an optional string that defines the name for the error. This name is also applied to the constructor name property. Defaults to `'Error'` or the name of the parent custom error.
- **parent** - an optional constructor function to inherit from. This function must be the `Error` function or a custom error constructor. Defaults to `Error`.
- **properties** - an optional object with properties and values that will be merged with any properties provided when an instance is created from this custom error constructor. Defaults to `{}`
- **factory** - an optional function to call to modify the properties of the custom error instance. If not provided and this constructor's parent is `Error` then the root factory will be used.

**Returns** a constructor function.

## Constructor Function

Defining a custom error returns a constructor function. You call the constructor to generate an `Error` instance.

```js
var myErrConstructor = CustomError('MyErr', { message: 'Error occurred' });
throw new myErrConstructor();
```

The constructor function takes two optional parameters:

1. **message** - This can be a string to fill the message property with or it can be an object that defines properties. Any properties defined here will overwrite properties specified when the constructor was being created by the `CustomError` function.
2. **config** - A configuration that can modify the behavior of the factory.

## Factories

A factory is used for modify the Error instance as it is being generated. By default the *root factory* will be applied to CustomError's that inherit directly from `Error`, but it is possible to specify the factory to call when you define a CustomError. When a factory is called, it is called with `this` being the `Error` or CustomError instance. The factory should modify `this` to make it into its desired state.

When a factory function is called it receives these parameters:

1. **properties** - The merged properties object (merging properties defined through CustomError inheritance with those provided when calling the constructor to create the instance).
2. **configuration** - An object that contains instructions for the factories to know how to run.
3. **factory** - An object with properties to call the factory functions defined at CustomError.factory. These functions, when called, will automatically scope the factory call to `this` and will automatically include the **factory** parameter as the third parameter.
 
### CustomError.factory

This object contains predefined factories that you can use to modify errors to some common formats. You can add, remove, or modify the functions on this object to define your own factory store.

Here are some of the defined factories that are already on the CustomError.factory object:

#### CustomError.factory.expectReceive

This factory calls the root factory and then appends to the current message string details about what was expected and what was recieved. In the following example the message and code are defined as defaults when we define the constructor. When the `Error` instance is created we define what was expected and what was received. The result is a nice and descriptive error message.

```js
var InvalidError = CustomError('InvalidError', { message: 'Invalid value.', code: 'EINVLD' }, CustomError.factory.expectReceive);
var e = new Err({ expected: 'a string', received: 5 });
console.log(e.toString());         // "InvalidError EINVLD: Invalid value. Expected a string. Received: 5"
```

#### CustomError.factory.root

Note: If a CustomError is being defined without specifying a factory and its parent is `Error` then the default root will be used. The root factory does the following:

1) Copies properties and their values onto the instance.
2) Generates a stack trace and stores it on the instance.
3) Creates message getter and setter on the instance.
4) Creates code getter and setter on the instance.

The configuration parameter for the factory takes the following properties:

- **rootOnly** - Set this to false to allow the root factory to run on CustomErrors that are not at the root (inheriting directly from `Error`). Defaults to `true`.
- **stackLength** - Specify the length of the stack trace for this error instance. Defaults to `10`.

## Inheritance

If a constructor is generated with a parent specified then the child constructor will inherit the default properties of the parent and will merge those with any properties that it defines. If the child constructor defines a factory too, then the parent's factory will be run before running the child's factory.

## Examples

**Example 1: Common Usage**

```js
var CustomError = require('custom-error-instance');
var MyErr = CustomError('MyError', { message: 'Default message' });

console.log(new MyError().toString());                                      // "MyError: Default Message";
console.log(new MyError('Oops').toString());                                // "MyError: Oops";
console.log(new MyError({ message: 'Oops', code: 'EOOP' }).toString());     // "MyError EOOP: Oops"
```

**Example 2: Child Custom Error**

Child custom errors inherit properties and the factories from their parent custom error.

```js
var CustomError = require('custom-error-instance');
var MyErr = CustomError('MyError', { message: 'Parent message' });
var ChildError = CustomError('ChildError', MyErr, { message: 'Child message');
var e = new ChildError();

console.log(e.message);                         // "Child message";
console.log(e instanceof ChildError);           // true
console.log(e instanceof MyErr);                // true, through inheritance
console.log(e instanceof Error);                // true, through inheritance
console.log(e.constructor.name);                // "ChildError"
```

**Example 3: Default Properties**

```js
var CustomError = require('custom-error-instance');
var MyError = CustomError('MyError', { code: 'EMY', foo: 'bar' });

var e = new MyError('Oops');
console.log(e.message);         // "Oops"
console.log(e.code);            // 'EMY'
console.log(e.foo);             // "bar"
```

**Example 4: Overwrite Default Properties**

```js
var CustomError = require('custom-error-instance');
var MyError = CustomError('MyError', { code: 'EMY', foo: 'bar' });

var e = new MyError({ message: 'Oops', code: 'FOO' });
console.log(e.message);                             // "Oops"
console.log(e.code);                                // 'FOO'
console.log(e.foo);                                 // "bar"
```

**Example 5: Custom Factory**

Every factory receives three parameters: 1) the properties object, 2) a configuration that should be used to modify the behavior of the factory, and 3) an object with properties to call the factories defined at CustomError.factory. If a custom error inherits from another custom error then all factories in the inheritance chain are called, starting at the topmost parent. The factory function is called with the scope of the error instance.

```js
var CustomError = require('custom-error-instance');
var MyError = CustomError('MyError', function(properties, config, factory) {
    factory.root(properties, config);
    this.properties = properties;
});
var e = new MyError('Oops');
console.log(e.properties.message);         // "Oops"
```