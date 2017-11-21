var _ = require('lodash'),
    hbs = require('express-hbs'),
    config = require('../config'),
    errors = require('../errors'),
    i18n = require('../i18n'),
    templates = require('../controllers/frontend/templates'),
    escapeExpression = hbs.Utils.escapeExpression,
    _private = {},
    errorHandler = {};

/**
 * This is a bare minimum setup, which allows us to render the error page
 * It uses the {{asset}} helper, and nothing more
 */
_private.createHbsEngine = function createHbsEngine() {
    var engine = hbs.create();
    engine.registerHelper('asset', require('../helpers/asset'));

    return engine.express4();
};

/**
 * Get an error ready to be shown the the user
 *
 * @TODO: support multiple errors within one single error, see https://github.com/TryGhost/Ghost/issues/7116#issuecomment-252231809
 */
_private.prepareError = function prepareError(err, req, res, next) {
    if (_.isArray(err)) {
        err = err[0];
    }

    if (!errors.utils.isIgnitionError(err)) {
        // We need a special case for 404 errors
        // @TODO look at adding this to the GhostError class
        if (err.statusCode && err.statusCode === 404) {
            err = new errors.NotFoundError({
                err: err
            });
        } else {
            err = new errors.GhostError({
                err: err,
                message: err.message,
                statusCode: err.statusCode
            });
        }
    }

    // used for express logging middleware see core/server/app.js
    req.err = err;

    // alternative for res.status();
    res.statusCode = err.statusCode;

    // never cache errors
    res.set({
        'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    });

    next(err);
};

_private.JSONErrorRenderer = function JSONErrorRenderer(err, req, res, next) { // eslint-disable-line no-unused-vars
    // @TODO: jsonapi errors format (http://jsonapi.org/format/#error-objects)
    res.json({
        errors: [{
            message: err.message,
            context: err.context,
            errorType: err.errorType,
            errorDetails: err.errorDetails
        }]
    });
};

// @TODO: differentiate properly between rendering errors for theme templates, and other situations
_private.HTMLErrorRenderer = function HTMLErrorRender(err, req, res, next) {
    // If the error code is explicitly set to STATIC_FILE_NOT_FOUND,
    // Skip trying to render an HTML error, and move on to the basic error renderer
    // I looked at doing this with accepts headers, but the internet is a crazy place...
    // A better long term solution might be to do this based on extension
    if (err.code === 'STATIC_FILE_NOT_FOUND') {
        return next(err);
    }

    // Renderer begin
    // Format Data
    var data = {
        message: err.message,
        // @deprecated
        code: err.statusCode,
        statusCode: err.statusCode,
        errorDetails: err.errorDetails || []
    };

    // Context
    // We don't do context for errors?!

    // Template
    templates.setTemplate(req, res);

    // It can be that something went wrong with the theme or otherwise loading handlebars
    // This ensures that no matter what res.render will work here
    // @TODO: split the error handler for assets, admin & theme to refactor this away
    if (_.isEmpty(req.app.engines)) {
        res._template = 'error';
        req.app.engine('hbs', _private.createHbsEngine());
        req.app.set('view engine', 'hbs');
        req.app.set('views', config.get('paths').defaultViews);
    }

    // @TODO use renderer here?!
    // Render Call - featuring an error handler for what happens if rendering fails
    res.render(res._template, data, function renderResponse(err, html) {
        if (!err) {
            return res.send(html);
        }

        // And then try to explain things to the user...
        // Cheat and output the error using handlebars escapeExpression
        return res.status(500).send(
            '<h1>' + i18n.t('errors.errors.oopsErrorTemplateHasError') + '</h1>' +
            '<p>' + i18n.t('errors.errors.encounteredError') + '</p>' +
            '<pre>' + escapeExpression(err.message || err) + '</pre>' +
            '<br ><p>' + i18n.t('errors.errors.whilstTryingToRender') + '</p>' +
            err.statusCode + ' ' + '<pre>' + escapeExpression(err.message || err) + '</pre>'
        );
    });
};

_private.BasicErorRenderer = function BasicErrorRenderer(err, req, res, next) { // eslint-disable-line no-unused-vars
    return res.send(res.statusCode + ' ' + err.message);
};

errorHandler.resourceNotFound = function resourceNotFound(req, res, next) {
    // TODO, handle unknown resources & methods differently, so that we can also produce
    // 405 Method Not Allowed
    next(new errors.NotFoundError({message: i18n.t('errors.errors.resourceNotFound')}));
};

errorHandler.pageNotFound = function pageNotFound(req, res, next) {
    next(new errors.NotFoundError({message: i18n.t('errors.errors.pageNotFound')}));
};

errorHandler.handleJSONResponse = [
    // Make sure the error can be served
    _private.prepareError,
    // Render the error using JSON format
    _private.JSONErrorRenderer
];

errorHandler.handleHTMLResponse = [
    // Make sure the error can be served
    _private.prepareError,
    // Render the error using HTML format
    _private.HTMLErrorRenderer,
    // Fall back to basic if HTML is not explicitly accepted
    _private.BasicErorRenderer
];

module.exports = errorHandler;
