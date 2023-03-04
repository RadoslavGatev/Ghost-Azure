# ee-types

Easy and reliable type detection with ES6+ support.


[![npm](https://img.shields.io/npm/dm/ee-types.svg?style=flat-square)](https://www.npmjs.com/package/ee-types)
[![Travis](https://img.shields.io/travis/eventEmitter/ee-types.svg?style=flat-square)](https://travis-ci.org/eventEmitter/ee-types)
[![node](https://img.shields.io/node/v/ee-types.svg?style=flat-square)](https://nodejs.org/)




## Browser compatibility

Desktop Browsers:

- Chrome 7+
- Firefox 4+
- Safari 5.1+
- IE 9+
- Edge 25+

Mobile Browsers:

- Safari iOS 6+
- Chrome for Android 38+
- Android Browser 4.4.4+






## Installation 

using npm

    npm i ee-types

using bower

    bower i ee-types

## Importing

node

    let types = require('ee-types');



require.js

you have to configure require.js to point the bower prefix
to the bower_components folder.
    
    requirejs.config({
        paths: {
            'bower': '/js/bower_components/'
        }
    });



and finally load the component

    require(['bower/ee-types/dist/ee-types.min'], function(types) {
        
    });



Browser & Vanilla
    
    <script src="bower/ee-types/dist/ee-types.min" />

    var types = window.ee.types;



## API

Explicity test for a type

    types.array([]) // true


Get the type of some input

    types(/[a-z]+/gi) // regexp



## Supported Types

- string
- number
- boolean
- array
- intArray
- floatArray
- object
- function
- symbol
- date
- regexp
- error
- undefined
- buffer
- null
- arrayBuffer
- map
- weakMap
- set
- weakSet
- dataView
- float32Array
- float64Array
- int8Array
- int16Array
- int32Array
- uInt8Array
- uInt16Array
- uInt32Array
- uInt8ClampedArray
- generator
- promise
- someObject


#### Object Types

Since many of the types defined by javascript are just special 
objects that also can be treated as normal objects ee-types has 
are a bunch of methods that allow you to handle that correctly.

For example `Map` is an object too. Or custom class where you 
define a getter that returns a specific name for your object:

```javascript
const X = class {
    get [Symbol.toStringTag]() {
        return 'AQL query';;
    }
};

console.log(Object.prototype.toString.call(new X()));
// prints: [object AQL Query]
```

##### Check for a classic object

```javascript
types.object({}); // true
types.object(new Map()); // false

// be aware that if you are not explicitly testing
// for an object any obecjt will be treated as one
types({}) // 'object'
types(new Map()) // 'object'

```


##### Check any type of object

```javascript
types.someObject({}); // true
types.someObject(new Map()); // false
types(new Map()) // 'object'

```



## Examples


```javascript
var types = require('ee-types');


types.string('nope');                // true
types.strign(new String('yeah'));    // true


types(2) // number

types([]]) // array
types(new Array()]) // array
types(new Int8Array()]) // int8Array


types.promise(Promise.all()) // true
```
