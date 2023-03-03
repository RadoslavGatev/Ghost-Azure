{
    'use strict';



    const ErrorMessage = require('./ErrorMessage');




    module.exports = class TestErrorMessage extends ErrorMessage {


        constructor(options) {
            super(options);

            this.type = 'testErrorMessage';
        }
    };
}