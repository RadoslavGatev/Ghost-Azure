const rootUtils = require('@tryghost/root-utils');
var debug = require('debug');

/**
 * @description Create a debug instance based on your package.json alias/name.
 *
 * The challenge here is to figure out where your package.json exist.
 *
 * @param {String} name - Name of the debug unit.
 * @return {Function}
 */
module.exports = function initDebug(name) {
    var parentPath = rootUtils.getCallerRoot();
    var alias, pkg;

    try {
        pkg = require(parentPath + '/package.json');

        if (pkg.alias) {
            alias = pkg.alias;
        } else {
            alias = pkg.name;
        }

    } catch (err) {
        alias = 'undefined';
    }

    return debug(alias + ':' + name);
};

module.exports._base = debug;
