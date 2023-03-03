const path = require('path'),
    _ = require('lodash'),
    fs = require('fs'),
    compareVer = require('compare-ver'),
    Promise = require('bluebird'),
    resolve = Promise.promisify(require('resolve')),
    debug = require('debug')('knex-migrator:utils'),
    errors = require('./errors');

/**
 * @description This helper function offers two ways of loading the knex-migrator configuration.
 *
 * 1. via JS object
 * 2. via file location
 *
 * The expected format is:
 *
 * {
 *   database: Object,
 *   migrationPath: String,
 *   currentVersion: String
 * }
 *
 * @param {Object} options
 * @returns {*}
 */
module.exports.loadConfig = function loadConfig(options) {
    if (options.knexMigratorConfig) {
        return options.knexMigratorConfig;
    }

    const knexMigratorFilePath = options.knexMigratorFilePath || process.cwd();

    try {
        return require(path.join(path.resolve(knexMigratorFilePath), '/MigratorConfig.js'));
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            throw new errors.KnexMigrateError({
                message: 'Please provide a file named MigratorConfig.js in your project root.',
                help: 'Read through the README.md to see which values are expected.'
            });
        }

        throw new errors.KnexMigrateError({err: err});
    }
};

/**
 * @description List all migration files from disk based on a path.
 *
 * @param absolutePath
 * @returns {Array}
 */
exports.listFiles = function listFiles(absolutePath) {
    let files = [];

    try {
        files = fs.readdirSync(absolutePath);
    } catch (err) {
        throw new errors.KnexMigrateError({
            code: 'MIGRATION_PATH',
            message: 'MigrationPath is wrong: ' + absolutePath
        });
    }

    files = files.filter(function (file) {
        // CASE: ignore dot files
        return !file.match(/^\./);
    });

    debug(files);
    return files;
};

/**
 * @description Reads all migration files from disk based on a path.
 * It returns an Array of migration files including it's up/down hooks, config and the name.
 *
 * @param absolutePath
 * @returns {Array}
 */
exports.readTasks = function readTasks(absolutePath) {
    let tasks = [];

    const files = exports.listFiles(absolutePath);

    _.each(files, function (file) {
        let executeFn = require(path.join(absolutePath, file));

        try {
            tasks.push({
                up: executeFn.up,
                down: executeFn.down,
                config: executeFn.config,
                name: file
            });
        } catch (err) {
            debug(err.message);

            throw new errors.MigrationScript({
                message: err.message,
                help: 'Cannot load Migrationscript.',
                context: file
            });
        }
    });

    debug(tasks);
    return tasks;
};

/**
 * @description Reads all version folders from disk in correct order.
 *
 * @param absolutePath
 * @returns {*}
 */
exports.readVersionFolders = function readFolders(absolutePath) {
    let folders = [],
        toReturn = [];

    try {
        folders = fs.readdirSync(absolutePath);
    } catch (err) {
        throw new errors.KnexMigrateError({
            message: 'MigrationPath is wrong: ' + absolutePath,
            code: 'READ_FOLDERS'
        });
    }

    if (!folders.length) {
        return folders;
    }

    folders.forEach((folderToAdd) => {
        let index = null;

        // CASE: ignore dot files
        if (folderToAdd.match(/^\./)) {
            debug('Ignore Dotfile: ' + folderToAdd);
            return;
        }

        toReturn.forEach((existingElement, _index) => {
            if (index !== null) {
                return;
            }

            // CASE: folder to add is smaller, push before this element
            if (compareVer.gt(folderToAdd, existingElement) === -1) {
                index = _index;
            }
        });

        if (index === null) {
            if (!toReturn.length) {
                index = 0;
            } else {
                index = toReturn.length;
            }
        }

        toReturn.splice(index, 0, folderToAdd);
    });

    debug(toReturn);
    return toReturn;
};

/**
 * @description Auto detect local installation to avoid version incompatible behaviour
 */
exports.getKnexMigrator = function getKnexMigrator(options) {
    options = options || {};

    return resolve('knex-migrator', {basedir: options.path})
        .then(function (localCLIPath) {
            return require(localCLIPath);
        })
        .catch(function () {
            return require('./');
        });
};

/**
 * @description A helper function to figure out if a version is greater than another version.
 *
 * Valid versions are:
 * - 1
 * - 1.1
 * - 1.1.0
 *
 * It's up to you which pattern you would like to use.
 *
 * @param options
 * @returns {boolean}
 */
exports.isGreaterThanVersion = function isGreaterThanVersion(options) {
    let greaterVersion = options.greaterVersion;
    let smallerVersion = options.smallerVersion;

    // CASE: are they semver like strings?
    if (new RegExp(/\./g).test(greaterVersion) && new RegExp(/\./g).test(smallerVersion)) {
        // -1 less than, 0 equal, 1 greater than
        return compareVer.gt(greaterVersion, smallerVersion) === 1;
    }

    // CASE: must be numbers / number like strings
    greaterVersion = Number(greaterVersion.toString());
    smallerVersion = Number(smallerVersion.toString());

    return greaterVersion > smallerVersion;
};
