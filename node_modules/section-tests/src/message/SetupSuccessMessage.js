{
    'use strict';



    const SuccessMessage = require('./SuccessMessage');




    module.exports = class SetupSuccessMessage extends SuccessMessage {


        constructor(options) {
            super(options);

            this.name = options.name;
            this.type = 'setupSuccessMessage';
        }
    };
}