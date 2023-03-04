{
    'use strict';



    const SuccessMessage = require('./SuccessMessage');




    module.exports = class DestroyerSuccessMessage extends SuccessMessage {


        constructor(options) {
            super(options);

            this.name = options.name;
            this.type = 'destroyerSuccessMessage';
        }
    };
}