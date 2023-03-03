const util = require('util');

module.exports = {
    ungroup(value) {
        return value.yg ? value.yg : value;
    },

    unescape(value) {
        var re = new RegExp('\\\\([\'"])', 'g');
        return value.replace(re, '$1');
    },

    debug() {
        if (!process.env.DEBUG || !/nql/.test(process.env.DEBUG)) {
            return;
        }

        var string = arguments[0];
        var values = Array.prototype.slice.call(arguments, 1);
        var newArgs = [string];

        values.forEach(function (value) {
            newArgs.push(util.inspect(value, false, null));
        });

        console.log.apply(this, newArgs); // eslint-disable-line no-console
    }
};
