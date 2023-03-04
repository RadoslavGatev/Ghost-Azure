'use strict';



const LogdLogger = require('logd-console-output');
const Callsite = require('@distributed-systems/callsite');
const instance = new LogdLogger();




module.exports = class Logger {

    constructor() {
        this.blacklist = [];
        this.callsite = new Callsite();
        this.options = {
            truncate: 2000
        };
    }


    getCallSite(caller) {
        const frames = this.callsite.getStack({
            fn: caller,
            slice: 1,
            limit: 10,
        });

        return frames[0];
    }


  
    debug(...values) {
        instance.log({
            values: values,
            color: 'grey',
            callsite: this.getCallSite(this.debug),
            options: this.options,
        });
    }

    info(...values) {
        instance.log({
            values: values,
            color: 'white',
            callsite: this.getCallSite(this.info),
            options: this.options,
        });
    }

    warn(...values) {
        instance.log({
            values: values,
            color: 'yellow.bold',
            callsite: this.getCallSite(this.warn),
            options: this.options,
        });
    }

    error(...values) {
        instance.log({
            values: values,
            color: 'red.bold',
            callsite: this.getCallSite(this.error),
            options: this.options,
        });
    }

    wtf(...values) {
        instance.log({
            values: values,
            color: 'magenta.bold.bgWhite',
            callsite: this.getCallSite(this.wtf),
        });
    }

    success(...values) {
        instance.log({
            values: values,
            color: 'green.bold',
            callsite: this.getCallSite(this.success),
            options: this.options,
        });
    }

    highlight(...values) {
        instance.log({
            values: values,
            color: 'cyan.bold',
            callsite: this.getCallSite(this.highlight),
            options: this.options,
        });
    }

    trace(...values) {
        instance.log({
            values: values,
            color: 'red',
            callsite: this.getCallSite(this.trace),
            options: this.options,
        });
    }


    dir(...values) {
         instance.log({
            values: values,
            callsite: this.getCallSite(this.dir),
            options: this.options,
        });
    }

    log(...values) {
         instance.log({
            values: values,
            color: 'white',
            callsite: this.getCallSite(this.log),
            options: this.options,
        });
    }
}