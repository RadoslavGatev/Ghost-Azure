'use strict';


const assert = require('assert');
const testTheme = require('../../src/themes/default.test');


module.exports = class OutputValidator {



    constructor(logger) {
        this.logger = logger;
        this.logger.setTheme(testTheme);
    }



    validate(values, lines, {callsite, color} = {}) {
        const context = this.logger.createContext();

        // register a custom printer which validates
        // the output of the logger
        const promise = new Promise((resolve, reject) => {
            let offset = 0;

            context.setPrinter((message) => { //console.log(message);
                try {
                    assert.equal(message, lines[offset]);
                    offset++;
                } catch(e) {
                    return reject(e);
                };
                
                if (offset === lines.length) resolve();
            });
        });

        
        // send the values to the logger
        this.logger.log({
            values,
            context,
            callsite,
            color,
        });

        // let the user evaluate the promise
        return promise;
    }
}