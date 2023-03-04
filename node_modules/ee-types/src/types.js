(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        
        define(['bower/ee-class/dist/ee-class.min'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        // Node

        module.exports = factory(require('ee-class'));
    } else {
        // EE Namespace

        // create namespace as needed
        if (typeof root.ee !== 'object') root.ee = {};

        // check for dependencies
        if (!root.ee.Class) throw new Error('Missing the ee-class module! See https://github.com/eventEmitter/ee-class');

        // publish
        root.ee.types = factory(root.ee.Class);
    }
})(this, function(Class) {
    'use strict';

    var   Types
        , types
        , proto
        , type
        ;



    Types = new Class({
          string:               function(arg){ return typeof arg === 'string' || Object.prototype.toString.call(arg) === '[object String]'; }
        , number:               function(arg){ return typeof arg === 'number' || Object.prototype.toString.call(arg) === '[object Number]'; }
        , boolean:              function(arg){ return typeof arg === 'boolean' || Object.prototype.toString.call(arg) === '[object Boolean]'; }
        , array:                function(arg){ return Array.isArray(arg); }
        , intArray:             function(arg){ return types.int8Array(arg) || types.int16Array(arg) || types.int32Array(arg) || types.uInt8Array(arg) || types.uInt16Array(arg) || types.uInt32Array(arg) || types.uInt8ClampedArray(arg); }
        , floatArray:           function(arg){ return Array.isArray(arg) || types.float32Array(arg); }
        , object:               function(arg){ return Object.prototype.toString.call(arg) === '[object Object]' && !types.promise(arg);}
        , someObject:           function(arg){ return /\[object [^\]]+\]/i.test(Object.prototype.toString.call(arg));}
        , function:             function(arg){ return typeof arg === 'function'; }
        , symbol:               function(arg){ return typeof arg === 'symbol'; }
        , date:                 function(arg){ return arg instanceof Date && !isNaN(arg.valueOf()); }
        , regexp:               function(arg){ return arg instanceof RegExp; }
        , error:                function(arg){ return arg instanceof Error; }
        , undefined:            function(arg){ return typeof arg === 'undefined'; }
        , buffer:               function(arg){ return typeof global === 'object' && typeof global.Buffer === 'function' && global.Buffer.isBuffer(arg); }
        , null:                 function(arg){ return null === arg || Object.prototype.toString.call(arg) === '[object Null]'; }
        , arrayBuffer:          function(arg){ return Object.prototype.toString.call(arg) === '[object ArrayBuffer]'; }
        , map:                  function(arg){ return Object.prototype.toString.call(arg) === '[object Map]'; }
        , weakMap:              function(arg){ return Object.prototype.toString.call(arg) === '[object WeakMap]'; }
        , set:                  function(arg){ return Object.prototype.toString.call(arg) === '[object Set]'; }
        , weakSet:              function(arg){ return Object.prototype.toString.call(arg) === '[object WeakSet]'; }
        , dataView:             function(arg){ return Object.prototype.toString.call(arg) === '[object DataView]'; }
        , float32Array:         function(arg){ return Object.prototype.toString.call(arg) === '[object Float32Array]'; }
        , float64Array:         function(arg){ return Object.prototype.toString.call(arg) === '[object Float64Array]'; }
        , int8Array:            function(arg){ return Object.prototype.toString.call(arg) === '[object Int8Array]'; }
        , int16Array:           function(arg){ return Object.prototype.toString.call(arg) === '[object Int16Array]'; }
        , int32Array:           function(arg){ return Object.prototype.toString.call(arg) === '[object Int32Array]'; }
        , uInt8Array:           function(arg){ return Object.prototype.toString.call(arg) === '[object Uint8Array]'; }
        , uInt16Array:          function(arg){ return Object.prototype.toString.call(arg) === '[object Uint16Array]'; }
        , uInt32Array:          function(arg){ return Object.prototype.toString.call(arg) === '[object Uint32Array]'; }
        , uInt8ClampedArray:    function(arg){ return Object.prototype.toString.call(arg) === '[object Uint8ClampedArray]'; }
        , generator:            function(arg){ return Object.prototype.toString.call(arg) === '[object Generator]'; }
        , promise:              function(arg){ return Object.prototype.toString.call(arg) === '[object Promise]' || (Object.prototype.toString.call(arg) === '[object Object]' && types.function(arg.then) && types.function(arg.catch)); }
    });



    // instantiate the singleton
    types = new Types();



    // this is the exported method, it returns
    // the type as string
    type = function(item) {
        return types.string(item) ? 'string' :
               types.number(item) ? 'number' :
               types.boolean(item) ? 'boolean' :
               types.object(item) ? 'object' : 
               types.array(item) ? 'array' :
               types.null(item) ? 'null' :
               types.undefined(item) ? 'undefined' :
               types.function(item) ? 'function' :
               types.date(item) ? 'date' :
               types.regexp(item) ? 'regexp' :
               types.error(item) ? 'error' :
               types.buffer(item) ? 'buffer' :
               types.symbol(item) ? 'symbol' :
               types.map(item) ? 'map' :
               types.weakMap(item) ? 'weakMap' :
               types.set(item) ? 'set' :
               types.weakSet(item) ? 'weakSet' :
               types.promise(item) ? 'promise' :
               types.dataView(item) ? 'dataView' :
               types.float32Array(item) ? 'float32Array' :
               types.float64Array(item) ? 'float64Array' :
               types.int8Array(item) ? 'int8Array' :
               types.int16Array(item) ? 'int16Array' :
               types.int32Array(item) ? 'int32Array' :
               types.generator(item) ? 'generator' :
               types.uInt8Array(item) ? 'uInt8Array' :
               types.uInt16Array(item) ? 'uInt16Array' :
               types.uInt32Array(item) ? 'uInt32Array' :
               types.intArray(item) ? 'intArray' :
               types.floatArray(item) ? 'floatArray' :
               types.uInt8ClampedArray(item) ? 'uInt8ClampedArray' :
               types.arrayBuffer(item) ? 'arrayBuffer' :
               types.someObject(item) ? 'object' : 'unknown';
    };


    // gets its proto
    proto = Object.getPrototypeOf(types);


    // apply the class methods to the type function
    Object.keys(proto).forEach(function(key){
        if (!type[key]) type[key] = types[key].bind(types);
        else throw new Error('Failed to map property «'+key+'» of types to type :(');
    });


    Object.keys(types).forEach(function(key){
        if (!type[key]) type[key] = types[key];
        else throw new Error('Failed to map property «'+key+'» of types to type :(');
    });


    return type;
});
