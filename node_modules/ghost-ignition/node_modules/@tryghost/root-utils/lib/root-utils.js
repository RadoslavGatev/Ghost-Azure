const findRoot = require('find-root');
const caller = require('caller');

/**
 * @description Get root directory of caller.
 *
 * Used to find the root directory (where a package.json exists) nearest to the calling module.
 *
 * Specifically, looks at the second caller - so that the place where `getCallerRoot()` is used
 * finds the directory of the package that called it.
 *
 * The `caller` package can find the calling module by creating an exception and walking the
 * stack trace. Easy to understand examples are given here:
 * https://www.npmjs.com/package/caller#depth
 */
exports.getCallerRoot = function getCallerRoot() {
    try {
        return findRoot(caller(2));
    } catch (err) {
        return;
    }
};

/**
 * @description Get root directory closest to the current working directory of the process.
 *
 * Used to find the root directory (where a package.json exists) nearest to the current
 * working directory of the process. This means that configuration that exists at the root
 * of the project can be accessed by any of the modules required by the project.
 */
exports.getProcessRoot = function getProcessRoot() {
    try {
        return findRoot(process.cwd());
    } catch (err) {
        return;
    }
};
