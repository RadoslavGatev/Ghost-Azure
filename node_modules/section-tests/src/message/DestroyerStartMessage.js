{
    'use strict';



    const Message = require('./Message');




    module.exports = class DestroyerStartMessage extends Message {


        constructor(options) {
            super(options);

            this.name = options.name;
            this.type = 'destroyerStartMessage';
        }
    };
}