const settingsCache = require('../settings/cache');
const i18n = require('../../../shared/i18n');
const mailService = require('../../services/mail');
const logging = require('../../../shared/logging');
const urlUtils = require('../../../shared/url-utils');
const Invites = require('./invites');

module.exports = new Invites({
    settingsCache,
    i18n,
    logging,
    mailService,
    urlUtils
});
