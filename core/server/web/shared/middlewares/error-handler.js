const hbs = require('express-hbs');
const _ = require('lodash');
const debug = require('ghost-ignition').debug('error-handler');
const config = require('../../../config');
const common = require('../../../lib/common');
const helpers = require('../../../../frontend/services/routing/helpers');

const escapeExpression = hbs.Utils.escapeExpression;
const _private = {};
const errorHandler = {};

/**
 * This is a bare minimum setup, which allows us to render the error page
 * It uses the {{asset}} helper, and nothing more
 */
_private.createHbsEngine = () => {
    const engine = hbs.create();
    engine.registerHelper('asset', require('../../../../frontend/helpers/asset'));

    return engine.express4();
};

/**
 * Get an error ready to be shown the the user
 *
 * @TODO: support multiple errors within one single error, see https://github.com/TryGhost/Ghost/issues/7116#issuecomment-252231809
 */
_private.prepareError = (err, req, res, next) => {
    debug(err);

    if (Array.isArray(err)) {
        err = err[0];
    }

    if (!common.errors.utils.isIgnitionError(err)) {
        // We need a special case for 404 errors
        // @TODO look at adding this to the GhostError class
        if (err.statusCode && err.statusCode === 404) {
            err = new common.errors.NotFoundError({
                err: err
            });
        } else if (err instanceof TypeError && err.stack.match(/node_modules\/handlebars\//)) {
            // Temporary handling of theme errors from handlebars
            // @TODO remove this when #10496 is solved properly
            err = new common.errors.IncorrectUsageError({
                err: err,
                message: '{{#if}} or {{#unless}} helper is malformed',
                statusCode: err.statusCode
            });
        } else {
            err = new common.errors.GhostError({
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

_private.JSONErrorRenderer = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.json({
        errors: [{
            message: err.message,
            context: err.context,
            errorType: err.errorType,
            errorDetails: err.errorDetails
        }]
    });
};

_private.prepareUserMessage = (err, res) => {
    const userError = {
        message: err.message,
        context: err.context
    };

    const docName = _.get(res, 'frameOptions.docName');
    const method = _.get(res, 'frameOptions.method');

    if (docName && method) {
        let action;

        const actionMap = {
            browse: 'list',
            read: 'read',
            add: 'save',
            edit: 'edit',
            destroy: 'delete'
        };

        if (common.i18n.doesTranslationKeyExist(`common.api.actions.${docName}.${method}`)) {
            action = common.i18n.t(`common.api.actions.${docName}.${method}`);
        } else if (Object.keys(actionMap).includes(method)) {
            let resource = docName;

            if (method !== 'browse') {
                resource = resource.replace(/s$/, '');
            }

            action = `${actionMap[method]} ${resource}`;
        }

        if (action) {
            if (err.context) {
                userError.context = `${err.message} ${err.context}`;
            } else {
                userError.context = err.message;
            }

            userError.message = common.i18n.t(`errors.api.userMessages.${err.name}`, {action: action});
        }
    }

    return userError;
};

_private.JSONErrorRendererV2 = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    const userError = _private.prepareUserMessage(err, req);

    res.json({
        errors: [{
            message: userError.message || null,
            context: userError.context || null,
            type: err.errorType || null,
            details: err.errorDetails || null,
            property: err.property || null,
            help: err.help || null,
            code: err.code || null,
            id: err.id || null
        }]
    });
};

_private.ErrorFallbackMessage = err => `<h1>${common.i18n.t('errors.errors.oopsErrorTemplateHasError')}</h1>
     <p>${common.i18n.t('errors.errors.encounteredError')}</p>
     <pre>${escapeExpression(err.message || err)}</pre>
     <br ><p>${common.i18n.t('errors.errors.whilstTryingToRender')}</p>
     ${err.statusCode} <pre>${escapeExpression(err.message || err)}</pre>`;

_private.ThemeErrorRenderer = (err, req, res, next) => {
    // If the error code is explicitly set to STATIC_FILE_NOT_FOUND,
    // Skip trying to render an HTML error, and move on to the basic error renderer
    // We do this because customised 404 templates could reference the image that's missing
    // A better long term solution might be to do this based on extension
    if (err.code === 'STATIC_FILE_NOT_FOUND') {
        return next(err);
    }

    // Renderer begin
    // Format Data
    const data = {
        message: err.message,
        // @deprecated Remove in Ghost 4.0
        code: err.statusCode,
        statusCode: err.statusCode,
        errorDetails: err.errorDetails || []
    };

    // Template
    // @TODO: very dirty !!!!!!
    helpers.templates.setTemplate(req, res);

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
    res.render(res._template, data, (err, html) => {
        if (!err) {
            return res.send(html);
        }

        // re-attach new error e.g. error template has syntax error or misusage
        req.err = err;

        // And then try to explain things to the user...
        // Cheat and output the error using handlebars escapeExpression
        return res.status(500).send(_private.ErrorFallbackMessage(err));
    });
};

_private.HTMLErrorRenderer = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    const data = {
        message: err.message,
        statusCode: err.statusCode,
        errorDetails: err.errorDetails || []
    };

    // e.g. if you serve the admin /ghost and Ghost returns a 503 because it generates the urls at the moment.
    // This ensures that no matter what res.render will work here
    // @TODO: put to prepare error function?
    if (_.isEmpty(req.app.engines)) {
        res._template = 'error';
        req.app.engine('hbs', _private.createHbsEngine());
        req.app.set('view engine', 'hbs');
        req.app.set('views', config.get('paths').defaultViews);
    }

    res.render('error', data, (err, html) => {
        if (!err) {
            return res.send(html);
        }

        // re-attach new error e.g. error template has syntax error or misusage
        req.err = err;

        // And then try to explain things to the user...
        // Cheat and output the error using handlebars escapeExpression
        return res.status(500).send(_private.ErrorFallbackMessage(err));
    });
};

_private.BasicErrorRenderer = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    return res.send(res.statusCode + ' ' + err.message);
};

errorHandler.resourceNotFound = (req, res, next) => {
    // TODO, handle unknown resources & methods differently, so that we can also produce
    // 405 Method Not Allowed
    next(new common.errors.NotFoundError({message: common.i18n.t('errors.errors.resourceNotFound')}));
};

errorHandler.pageNotFound = (req, res, next) => {
    next(new common.errors.NotFoundError({message: common.i18n.t('errors.errors.pageNotFound')}));
};

errorHandler.handleJSONResponse = [
    // Make sure the error can be served
    _private.prepareError,
    // Render the error using JSON format
    _private.JSONErrorRenderer
];

errorHandler.handleJSONResponseV2 = [
    // Make sure the error can be served
    _private.prepareError,
    // Render the error using JSON format
    _private.JSONErrorRendererV2
];

errorHandler.handleHTMLResponse = [
    // Make sure the error can be served
    _private.prepareError,
    // Render the error using HTML format
    _private.HTMLErrorRenderer,
    // Fall back to basic if HTML is not explicitly accepted
    _private.BasicErrorRenderer
];

errorHandler.handleThemeResponse = [
    // Make sure the error can be served
    _private.prepareError,
    // Render the error using theme template
    _private.ThemeErrorRenderer,
    // Fall back to basic if HTML is not explicitly accepted
    _private.BasicErrorRenderer
];

module.exports = errorHandler;
