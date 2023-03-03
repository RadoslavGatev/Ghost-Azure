'use strict';

const Renderer = require('./Renderer');
const type = require('ee-types');
const rootPath = require('app-root-path').toString();






module.exports = class ErrorRenderer extends Renderer {




    constructor() {
        super();

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
        return 'error';
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
        const frames = this.convertStack(value);
        let structuredFrames = this.analyzeFrames(frames);


        // remove the first frame if it contains the error message
        if (structuredFrames.length && structuredFrames[0].text && structuredFrames[0].text.includes(value.message)) {
            structuredFrames = structuredFrames.slice(1);
        }

        
        // print the frames
        structuredFrames.forEach((frame) => {
            context.newLine();
            context.print(this.decorate(context, this.pad(this.truncateLeft(frame.path || 'n/a')), 'path'));
            
            if (frame.line) context.print(this.decorate(context, this.pad(`${frame.line}`, 5), 'line'));
            else context.print(' '.repeat(5));

            if (frame.character) context.print(this.decorate(context, this.pad(`:${frame.character} `, 5, true), 'decoration'));
            else context.print(' '.repeat(5));

            context.print(this.decorate(context, (frame.fn || frame.text || '').trim(), 'function'));
            if (frame.alias) context.print(this.decorate(context, ` (${frame.alias})`, 'decoration'));
        });
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






    /**
    * analyze the frames of the stack
    */
    analyzeFrames(frames) {
        return frames.map((frame) => {
            const result = /(?:\n|^)\s*(?:at)?\s*([^\(\[]+)(?:\[([^\]]+)\])?\s*\(([^\):]+):?([^\):]+)?:?([0-9]+)?\)/gi.exec(frame);

            if (result) {
                return {
                    fn: result[1] ? result[1].trim() : null,
                    alias: result[2] || null,
                    path: this.truncatePath(result[3]),
                    line: result[4] && result[4] !== 'null' ? result[4] : null,
                    character: result[5] || null,
                };
            } else return {text: frame};
        });
    }






    /**
    * truncate paths so that the part of the projects
    * directory is removed
    */
    truncatePath(path) {

        // remove the project root
        if (path.startsWith(rootPath)) path = path.substr(rootPath.length+1);
        else if (path.startsWith(`file://${rootPath}`)) path = path.substr(rootPath.length+1+7);

        // check for node modules, remove that
        const index = path.lastIndexOf('node_modules');
        if (index >= 0) path = 'nm:'+path.substr(index+'node_modules'.length);

        return path;
    }






    /**
    * convert the stack to an array containing strings
    */
    convertStack(err) {
        let frames;

        if (type.array(err.stack)) {
            frames = err.stack.map((frame) => {
                if (type.string(frame)) return frame;
                else return frame.toString();
            });
        } else if (type.string(err.stack)) {
            frames = err.stack.split(/\n/g);
        }

        return frames;
    }
}