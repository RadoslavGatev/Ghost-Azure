'use strict';

const Renderer = require('./Renderer');
const rootPath = require('app-root-path').toString();






module.exports = class CallsiteRenderer extends Renderer {

    getName() {
        return 'callsite';
    }


    

    render({
        context,
        value,
    }) {
        context.print(this.decorate(context, this.getTimeSignature(value.date)+' > ', 'time'));
        context.print(this.decorate(context, this.pad(this.truncateLeft(this.truncatePath(value.fileName || 'n/a')), 31, ' '), 'path'));
        context.print(this.decorate(context, `:${this.padRight(value.lineNumber || 'n/a')} `, 'line'));
        context.print(this.decorate(context, this.pad(this.truncateLeft(this.getSignature(value), 25), 25, ' '), 'signature'));
    }






    getTimeSignature(date) {
        const p = this.pad;
        const d = date || new Date();

        return `${p(d.getDate())}  ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
    }



    padRight(input = '', len = 5, char = ' ') {
        input = input+'';
        if (input.length < len) return input+char.repeat(len-input.length);
        else return input;
    }




    pad(input, len = 2, char = '0') {
        input = input+'';
        if (input.length < len) return char.repeat(len-input.length)+input;
        else return input;
    }





    getSignature(callsite) {
        let signature = '';

        if (callsite.type && callsite.function) signature = `${callsite.type}.${callsite.function}`;
        else if (callsite.type) signature = callsite.type;
        else if (callsite.function) signature = callsite.function;
        
        if (callsite.method) signature += ` (as ${callsite.method})`;

        return signature+': ';
    }





    /**
    * truncate string to a certain length
    */
    truncateLeft(input = '', len = 31) {
        if (input.length > len) return '\u2026'+input.substr(input.length-len+1);
        return input;
    }




    /**
    * truncate paths so that the part of the projects
    * directory is removed
    */
    truncatePath(path = '') {

        // remove th eproject root
        if (path.startsWith(rootPath)) path = path.substr(rootPath.length+1);

        // check for node modules, remove that
        const index = path.lastIndexOf('node_modules');
        if (index >= 0) path = 'nm:'+path.substr(index+'node_modules'.length);

        return path;
    }
}
