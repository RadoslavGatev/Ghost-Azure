const debug = require('ghost-ignition').debug('web:canary:admin:app');
const boolParser = require('express-query-boolean');
const express = require('express');
const bodyParser = require('body-parser');
const shared = require('../../../shared');
const routes = require('./routes');

module.exports = function setupApiApp() {
    debug('Admin API canary setup start');
    const apiApp = express();

    // API middleware

    // Body parsing
    apiApp.use(bodyParser.json({limit: '1mb'}));
    apiApp.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));

    // Query parsing
    apiApp.use(boolParser());

    // send 503 json response in case of maintenance
    apiApp.use(shared.middlewares.maintenance);

    // Check version matches for API requests, depends on res.locals.safeVersion being set
    // Therefore must come after themeHandler.ghostLocals, for now
    apiApp.use(shared.middlewares.api.versionMatch);

    // Admin API shouldn't be cached
    apiApp.use(shared.middlewares.cacheControl('private'));

    // Routing
    apiApp.use(routes());

    // API error handling
    apiApp.use(shared.middlewares.errorHandler.resourceNotFound);
    apiApp.use(shared.middlewares.errorHandler.handleJSONResponseV2);

    debug('Admin API canary setup end');

    return apiApp;
};
