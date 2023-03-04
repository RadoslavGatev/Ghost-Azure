var CustomError = require('../index');

// define a custom error with a default message
var Parent = CustomError('ParentError', { message: 'Parent error' });

// define a custom error that inherits from the Parent custom error
var Child = CustomError('ChildError', Parent, { message: 'Child error' });

var e;

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