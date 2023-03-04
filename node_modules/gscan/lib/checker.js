const Promise = require('bluebird');
const _ = require('lodash');
const requireDir = require('require-dir');
const errors = require('@tryghost/errors');
const versions = require('./utils').versions;

// An object containing helpers as keys and their labs flag as values
// E.g. match:  'matchHelper'
const labsEnabledHelpers = {
};

/**
 * Check theme
 *
 * Takes a theme path, reads the theme, and checks it for issues.
 * Returns a theme object.
 * @param {string} themePath
 * @param {Object} options
 * @param {string} [options.checkVersion] version to check the theme against
 * @param {string} [options.themeName] name of the checked theme
 * @param {Object=} [options.labs] object containing boolean flags for enabled labs features
 * @returns {Promise<Object>}
 */
const check = function checkAll(themePath, options = {}) {
    // Require checks late to avoid loading all until used
    const checks = requireDir('./checks');
    const passedVersion = _.get(options, 'checkVersion', versions.default);
    let version = passedVersion;

    if (passedVersion === 'canary') {
        version = 'v4';
        options.checkVersion = 'v4';
    }

    _.each(labsEnabledHelpers, (flag, helper) => {
        if (_.has(options.labs, flag)) {
            const spec = require('./specs').get([version]);
            if (!spec.knownHelpers.includes(helper)) {
                spec.knownHelpers.push(helper);
            }
        }
    });

    // Require readTheme late to avoid loading entire AST parser until used
    const readTheme = require('./read-theme');
    return readTheme(themePath)
        .then(function (theme) {
            // set the major version to check
            theme.checkedVersion = versions[version].major;

            return Promise.reduce(_.values(checks), function (themeToCheck, checkFunction) {
                return checkFunction(themeToCheck, options, themePath);
            }, theme);
        })
        .catch((error) => {
            throw new errors.ValidationError({
                message: 'Failed theme files check',
                help: 'Your theme file structure is corrupted or contains errors',
                errorDetails: error.message,
                context: options.themeName,
                err: error
            });
        });
};

const checkZip = async function checkZip(path, options) {
    options = Object.assign({}, {
        keepExtractedDir: false
    }, options);

    let zip;

    if (_.isString(path)) {
        zip = {
            path,
            name: path.match(/(.*\/)?(.*).zip$/)[2]
        };
    } else {
        zip = _.clone(path);
    }

    try {
        const readZip = require('./read-zip');
        const {path: extractedZipPath} = await readZip(zip);
        const theme = await check(extractedZipPath, Object.assign({themeName: zip.name}, options));

        if (options.keepExtractedDir) {
            return theme;
        } else {
            const fs = require('fs-extra');
            await fs.remove(zip.origPath);
            return theme;
        }
    } catch (error) {
        if (!errors.utils.isGhostError(error)) {
            throw new errors.ValidationError({
                message: 'Failed to check zip file',
                help: 'Your zip file might be corrupted, try unzipping and zipping again.',
                errorDetails: error.message,
                context: zip.name,
                err: error
            });
        }

        throw error;
    }
};

module.exports = {
    check,
    checkZip
};
