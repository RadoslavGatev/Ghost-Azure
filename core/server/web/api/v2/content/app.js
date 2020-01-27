const debug = require('ghost-ignition').debug('web:api:v2:content:app');
const boolParser = require('express-query-boolean');
const bodyParser = require('body-parser');
const express = require('express');
const shared = require('../../../shared');
const routes = require('./routes');

module.exports = function setupApiApp() {
    debug('Content API v2 setup start');
    const apiApp = express();

    // API middleware

    // @NOTE: req.body is undefined if we don't use this parser, this can trouble if components rely on req.body being present
    apiApp.use(bodyParser.json({limit: '1mb'}));

    // Query parsing
    apiApp.use(boolParser());

    // send 503 json response in case of maintenance
    apiApp.use(shared.middlewares.maintenance);

    // API shouldn't be cached
    apiApp.use(shared.middlewares.cacheControl('private'));

    // Routing
    apiApp.use(routes());

    // API error handling
    apiApp.use(shared.middlewares.errorHandler.resourceNotFound);
    apiApp.use(shared.middlewares.errorHandler.handleJSONResponse);

    debug('Content API v2 setup end');

    return apiApp;
};
