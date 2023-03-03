{
    'use strict';



    const ErrorMessage = require('./ErrorMessage');




    module.exports = class DestroyerErrorMessage extends ErrorMessage {


        constructor(options) {
            super(options);

            this.name = options.name;
            this.type = 'destroyerErrorMessage';
        }
    };
}