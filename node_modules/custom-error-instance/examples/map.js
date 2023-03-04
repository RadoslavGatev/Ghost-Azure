"use strict";
var CustomError = require('../index');
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