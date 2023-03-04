const adapterManager = require('../../adapter-manager');
const createSessionService = require('@tryghost/session-service');
const sessionFromToken = require('@tryghost/mw-session-from-token');
const createSessionMiddleware = require('./middleware');

const expressSession = require('./express-session');

const models = require('../../../models');
const urlUtils = require('../../../../shared/url-utils');
const url = require('url');

function getOriginOfRequest(req) {
    const origin = req.get('origin');
    const referrer = req.get('referrer') || urlUtils.getAdminUrl() || urlUtils.getSiteUrl();

    if (!origin && !referrer || origin === 'null') {
        return null;
    }

    if (origin) {
        return origin;
    }

    const {protocol, host} = url.parse(referrer);
    if (protocol && host) {
        return `${protocol}//${host}`;
    }
    return null;
}

const sessionService = createSessionService({
    getOriginOfRequest,
    getSession: expressSession.getSession,
    findUserById({id}) {
        return models.User.findOne({id, status: 'active'});
    }
});

module.exports = createSessionMiddleware({sessionService});

const ssoAdapter = adapterManager.getAdapter('sso');
// Looks funky but this is a "custom" piece of middleware
module.exports.createSessionFromToken = sessionFromToken({
    callNextWithError: false,
    createSession: sessionService.createSessionForUser,
    findUserByLookup: ssoAdapter.getUserForIdentity.bind(ssoAdapter),
    getLookupFromToken: ssoAdapter.getIdentityFromCredentials.bind(ssoAdapter),
    getTokenFromRequest: ssoAdapter.getRequestCredentials.bind(ssoAdapter)
});

module.exports.sessionService = sessionService;
module.exports.deleteAllSessions = expressSession.deleteAllSessions;
