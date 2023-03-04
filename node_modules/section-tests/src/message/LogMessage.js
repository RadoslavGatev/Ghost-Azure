{
    'use strict';



    const Message = require('./Message');




    module.exports = class LogMessage extends Message {


        constructor(options) {
            super(options);
                
            this.message = options.message;
            this.level = options.level;
            this.type = 'logMessage';
        }
    };
}