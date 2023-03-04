{
    'use strict';



    const Message = require('./Message');




    module.exports = class SectionMessage extends Message {



        constructor(options) {
            super(options);
            this.type = 'sectionMessage';
        }
    };
}