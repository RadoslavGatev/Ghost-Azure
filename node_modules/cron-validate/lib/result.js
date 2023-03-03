"use strict";
/*
From:
https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n
https://github.com/gDelgado14/neverthrow

MIT License

Copyright (c) 2019 Giorgio Delgado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Valid = exports.err = exports.valid = void 0;
const valid = (value) => new Valid(value);
exports.valid = valid;
const err = (error) => new Err(error);
exports.err = err;
class Valid {
    constructor(value) {
        this.value = value;
    }
    isValid() {
        return true;
    }
    isError() {
        return !this.isValid();
    }
    getValue() {
        return this.value;
    }
    getError() {
        throw new Error('Tried to get error from a valid.');
    }
    map(func) {
        return exports.valid(func(this.value));
    }
    mapErr(func) {
        return exports.valid(this.value);
    }
}
exports.Valid = Valid;
class Err {
    constructor(error) {
        this.error = error;
    }
    isError() {
        return true;
    }
    isValid() {
        return !this.isError();
    }
    getValue() {
        throw new Error('Tried to get success value from an error.');
    }
    getError() {
        return this.error;
    }
    map(func) {
        return exports.err(this.error);
    }
    mapErr(func) {
        return exports.err(func(this.error));
    }
}
exports.Err = Err;
