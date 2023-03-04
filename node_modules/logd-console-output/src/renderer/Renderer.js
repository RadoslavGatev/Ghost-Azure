'use strict';

const chalk = require('chalk');




module.exports = class Renderer {



    constructor() {
        this.flags = new Set(['reset', 'bold', 'italic', 'inverse', 'underline', 'strikethrough', 'dim', 'hidden', 'visible']);
    }



    getName() {
        return 'renderer';
    }




    getThemeName() {
        return this.themeName || this.getName();
    }




    /**
    * truncate string to a certain length
    */
    truncate(input, len = 50) {
        if (input.length > len) {
            const truncateString = `\u2026`;

            return input.substr(0, len+truncateString.length)+truncateString;
        } else return input;
    }







    decorate(context, input, topic, color) {
        let theme = context.getThemeFor(this.getThemeName(), topic);

        if (color) {
            theme = {};

            const flags = color.split('.').filter((flag) => {
                if (this.flags.has(flag)) {
                    theme[flag] = true;
                    return false;
                } else return true;
            }).forEach((flag) => {
               if (flag.startsWith('bg')) theme.bg = flag[2].toLowerCase()+flag.substr(3);
               else theme.color = flag;
            });
        }

        if (theme.reset) input = chalk.reset(input);
        if (theme.color) input = chalk[theme.color](input);
        if (theme.bg) input = chalk[`bg${theme.bg[0].toUpperCase()}${theme.bg.substr(1)}`](input);
        if (theme.bold) input = chalk.bold(input);
        if (theme.italic) input = chalk.italic(input);
        if (theme.underline) input = chalk.underline(input);
        if (theme.inverse) input = chalk.inverse(input);
        if (theme.strikethrough) input = chalk.strikethrough(input);
        if (theme.dim) input = chalk.dim(input);
        if (theme.hidden) input = chalk.hidden(input);
        if (theme.visible) input = chalk.visible(input);

        return input;
    }
}