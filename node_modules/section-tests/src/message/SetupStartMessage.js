{
    'use strict';



    const Message = require('./Message');




    module.exports = class SetupStartMessage extends Message {


        constructor(options) {
            super(options);

            this.name = options.name;
            this.type = 'setupStartMessage';
        }
    };
}