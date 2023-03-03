{
    'use strict';



    const SuccessMessage = require('./SuccessMessage');




    module.exports = class TestSuccessMessage extends SuccessMessage {


        constructor(options) {
            super(options);

            this.type = 'testSuccessMessage';
        }
    };
}