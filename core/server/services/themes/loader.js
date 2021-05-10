const debug = require('ghost-ignition').debug('themes:loader');
const config = require('../../../shared/config');
const packageJSON = require('../../lib/package-json');
const themeList = require('./list');

const loadAllThemes = function loadAllThemes() {
    return packageJSON
        .readPackages(config.getContentPath('themes'))
        .then(function updateThemeList(themes) {
            debug('loading themes', Object.keys(themes));

            themeList.init(themes);
        });
};

const loadOneTheme = function loadOneTheme(themeName) {
    return packageJSON
        .readPackage(config.getContentPath('themes'), themeName)
        .then(function (readThemes) {
            debug('loaded one theme', themeName);
            return themeList.set(themeName, readThemes[themeName]);
        });
};

module.exports = {
    loadAllThemes: loadAllThemes,
    loadOneTheme: loadOneTheme
};
