{
    'use strict';



    const Message = require('./Message');




    module.exports = class SuccessMessage extends Message {



        constructor(options) {
            super(options);

            this.test = options.test;
            this.duration = options.duration;
            this.type = 'successMessage';
        }
    };
}