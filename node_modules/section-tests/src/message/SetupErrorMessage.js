{
    'use strict';



    const ErrorMessage = require('./ErrorMessage');




    module.exports = class SetupErrorMessage extends ErrorMessage {


        constructor(options) {
            super(options);

            this.name = options.name;
            this.type = 'setupErrorMessage';
        }
    };
}