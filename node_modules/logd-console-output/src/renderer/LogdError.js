'use strict';

const Renderer = require('./Renderer');
const type = require('ee-types');
const rootPath = require('app-root-path').toString();






module.exports = class ErrorRenderer extends Renderer {




    constructor() {
        super();

        this.themeName = 'error';

        this.errorProperties = [
            'address',
            'code',
            'errno',
            'path',
            'port',
            'syscall',
        ];
    }




    getName() {
        return 'logd-error';
    }


    

    render({
        context,
        value,
        label,
        decoration,
    }) {
        context.renderDecoration({label, decoration, close: true});
        context.print(this.decorate(context, `[${value.name}] `, 'type'));
        context.print(this.decorate(context, value.message, 'message'));
        context.newLine();


        // some errors may have more infromation to offer,
        // print it as a block
        if (this.errorProperties.some(p => !!value[p])) {
            context.newLine();

            this.errorProperties.forEach((property) => {
                if (value[property]) {
                    context.print(this.decorate(context, this.pad(property, 8), 'property'));
                    context.print(this.decorate(context, ': ', 'decoration'));
                    context.print(this.decorate(context, value[property], 'propertyValue'));
                    context.newLine();
                }
            });
        }



        // get a proper stack
        let structuredFrames = value.frames;

        if (Array.isArray(structuredFrames)) {
            // remove the first frame if it contains the error message
            if (structuredFrames.length && structuredFrames[0].text && structuredFrames[0].text.includes(value.message)) {
                structuredFrames = structuredFrames.slice(1);
            }

            
            // print the frames
            structuredFrames.forEach((frame) => {
                context.newLine();
                context.print(this.decorate(context, this.pad(this.truncateLeft(frame.fileName || 'n/a')), 'path'));
                
                if (frame.lineNumber) context.print(this.decorate(context, this.pad(`${frame.lineNumber}`, 5), 'line'));
                else context.print(' '.repeat(5));

                if (frame.character) context.print(this.decorate(context, this.pad(`:${frame.character} `, 5, true), 'decoration'));
                else context.print(' '.repeat(5));

                context.print(this.decorate(context, (frame.function || frame.message || '').trim(), 'function'));
                if (frame.method) context.print(this.decorate(context, ` (${frame.method})`, 'decoration'));
            });
        } else {
            context.print(this.decorate(context, (structuredFrames), 'function'));
        }
    }






    /**
    * truncate string to a certain length
    */
    truncateLeft(input, len = 31) {
        if (input.length > len) return '\u2026'+input.substr(input.length-len+1);
        return input;
    }






    /**
    * pad strings do that they have a given length
    */
    pad(input, len = 31, right = false) {
        if (input.length < len) {
            if (right) return input+' '.repeat(len-input.length);
            else return ' '.repeat(len-input.length)+input;
        } else return input;
    }
}