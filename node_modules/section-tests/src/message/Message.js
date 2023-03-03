{
    'use strict';



    module.exports = class Message {




        constructor({section, duration}) {
            //this.section = section;
            this.sectionName = section.name;
            this.depth = section.getDepth();
            this.type = 'message';
            this.duration = duration;
        }
    };
}