{
    'use strict';



    const Message = require('./Message');




    module.exports = class TestStartMessage extends Message {


        constructor(options) {
            super(options);

            this.test = options.test;
            this.type = 'testStartMessage';
        }
    };
}