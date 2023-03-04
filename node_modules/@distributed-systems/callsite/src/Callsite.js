'use strict';

const assert = require('assert');




module.exports = class CallSite {



    /**
    * returns a serializable frame
    *
    * @param {object} frame v8 callsit object
    *
    * @returns {object} frame
    */
    convertStackFrame(frame) {
        assert(typeof frame === 'object', 'the callsite must be an object');

        const callsite = {};

        callsite.type          = frame.getTypeName();
        callsite.function      = frame.getFunctionName() || '<anonymous>';
        callsite.method        = frame.getMethodName();
        callsite.fileName      = frame.getFileName();
        callsite.lineNumber    = frame.getLineNumber();
        callsite.message       = frame.toString();

        return callsite;
    }







    /**
    * return json stack frames
    *
    * @returns {array} stack
    */
    getStack({
        slice,
        limit,
        err,
        dontCapture,
        fn = this.getStack,
    } = {}) {
        const frames = this.getRawStack({slice, limit, err, fn, dontCapture});
        return frames.map(frame => this.convertStackFrame(frame))
    }







    /**
    * return raw stack frames
    *
    * @returns {array} stack
    */
    getRawStack({
        slice = 0,
        limit = 20,
        fn = this.getRawStack,
        err,
        dontCapture = false,
    } = {}) {
        const originalFunction = Error.prepareStackTrace;
        const originalLimit = Error.stackTraceLimit;

        Error.stackTraceLimit = limit;
        Error.prepareStackTrace = (originalFunction, stack) => stack;

        err = err || new Error();

        // caputre from a cerrtain offset
        if (!dontCapture) Error.captureStackTrace(err, fn);
        const frames = err.stack;

        // revert
        Error.prepareStackTrace = originalFunction;
        Error.stackTraceLimit = originalLimit;
        
        // return the raw stack
        return frames.slice(slice);
    }
};
