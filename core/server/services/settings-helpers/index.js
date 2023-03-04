const settingsCache = require('../../../shared/settings-cache');
const urlUtils = require('../../../shared/url-utils');
const config = require('../../../shared/config');
const SettingsHelpers = require('./settings-helpers');

module.exports = new SettingsHelpers({settingsCache, urlUtils, config});
