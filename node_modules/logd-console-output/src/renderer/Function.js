'use strict';

const Renderer = require('./Renderer');






module.exports = class FunctionRenderer extends Renderer {

    getName() {
        return 'function';
    }


    

    render({
        context,
        value,
        label,
        decoration,
        options,
    }) {
        const source = value.toString().split(/\n/g);
        context.renderDecoration({label, decoration: (decoration ? decoration+' ' : '')+`[Function] (${source.length} lines)`, close: true});
        context.print(this.decorate(context, value.name+' ', 'name'));
        context.print(this.decorate(context, this.truncate(source[0], options.truncate || 80), 'source'));

        let remainginChars = (options.truncate || 20) - source[0].length;

        if (remainginChars > 0) {
            this.truncateWhiteSpace(source.slice(1)).map((line) => {
                remainginChars -= line.length;

                return {
                    line: line,
                    remainginChars: remainginChars+line.length,
                };
            }).filter(line => line.remainginChars > 0).forEach((line) => {
                context.newLine();
                context.print(this.decorate(context, this.truncate(line.line, line.remainginChars), 'source'));
            });
        } else context.print(this.decorate(context, ` \u2026`, 'source'));
    }





    /**
    * remove common whitespace in front of 
    * of all lines
    */
    truncateWhiteSpace(lines) {
        let minWhitespace = 1000000;

        // find common whitespace
        lines.filter((line) => {
            return !!line.trim();
        }).forEach((line) => {
            const match = /^(\s*)/.exec(line);

            if (match) {
                if (match[1].length < minWhitespace) minWhitespace = match[1].length;
            } else minWhitespace = 0;
        });


        // truncate
        if (minWhitespace) {
            return lines.map((line) => {
                if (!!line.trim()) {
                    return line.substr(minWhitespace);
                } else return line; 
            });
        } else return lines;
    }
}