var omit = require('lodash/omit'),
    merge = require('lodash/merge'),
    extend = require('lodash/extend'),
    _private = {};

_private.serialize = function serialize(err) {
    try {
        return {
            id: err.id,
            status: err.statusCode,
            code: err.code || err.errorType,
            title: err.name,
            detail: err.message,
            meta: {
                context: err.context,
                help: err.help,
                errorDetails: err.errorDetails,
                level: err.level,
                errorType: err.errorType
            }
        }
    } catch (err) {
        return {
            detail: 'Something went wrong.'
        }
    }
};

_private.deserialize = function deserialize(obj) {
    try {
        return {
            id: obj.id,
            message: obj.detail || obj['error_description'] || obj.message,
            statusCode: obj.status,
            code: obj.code || obj.error,
            level: obj.meta && obj.meta.level,
            help: obj.meta && obj.meta.help,
            context: obj.meta && obj.meta.context
        };
    } catch (err) {
        return {
            message: 'Something went wrong.'
        };
    }
};

/**
 * @description Serialize error instance into oauth format.
 *
 * @see https://tools.ietf.org/html/rfc6749#page-45
 *
 * To not loose any error data when sending errors between internal services, we use the suggested OAuth properties and add ours as well.
 */
_private.OAuthSerialize = function OAuthSerialize(err) {
    var matchTable = {};

    matchTable[this.NoPermissionError.name] = 'access_denied';
    matchTable[this.MaintenanceError.name] = 'temporarily_unavailable';
    matchTable[this.BadRequestError.name] = matchTable[this.ValidationError.name] = 'invalid_request';
    matchTable['default'] = 'server_error';

    return merge({
        'error': err.code || matchTable[err.name] || 'server_error',
        'error_description': err.message
    }, omit(_private.serialize(err), ['detail', 'code']));
};

/**
 * @description Deserialize oauth error format into Ignition error instance.
 * @param {Object} errorFormat
 * @return {Error}
 * @constructor
 */
_private.OAuthDeserialize = function OAuthDeserialize(errorFormat) {
    try {
        return new this[errorFormat.title || errorFormat.name || this.InternalServerError.name](_private.deserialize(errorFormat));
    } catch(err) {
        // CASE: you receive an OAuth formatted error, but the error prototype is unknown
        return new this.InternalServerError(extend({
            errorType: errorFormat.title || errorFormat.name
        }, _private.deserialize(errorFormat)));
    }
};

/**
 * @description Serialize Ignition error instance into jsonapi.org format.
 * @param {Error} err
 * @return {Object}
 */
_private.JSONAPISerialize = function JSONAPISerialize(err) {
    var errorFormat = {
        errors: [_private.serialize(err)]
    };

    errorFormat.errors[0].source = {};

    if (err.property) {
        errorFormat.errors[0].source.pointer = '/data/attributes/' + err.property;
    }

    return errorFormat;
};

/**
 * @description Deserialize JSON api format into Ignition error instance.
 * @param {Object} errorFormat
 * @return {Error}
 */
_private.JSONAPIDeserialize = function JSONAPIDeserialize(errorFormat) {
    errorFormat = errorFormat.errors && errorFormat.errors[0] || {};

    var internalError;

    try {
        internalError = new this[errorFormat.title || errorFormat.name || this.InternalServerError.name](_private.deserialize(errorFormat));
    } catch (err) {
        // CASE: you receive a JSON format error, but the error prototype is unknown
        internalError = new this.InternalServerError(extend({
            errorType: errorFormat.title || errorFormat.name
        }, _private.deserialize(errorFormat)));
    }

    if (errorFormat.source && errorFormat.source.pointer) {
        internalError.property = errorFormat.source.pointer.split('/')[3];
    }

    return internalError;
};


/**
 * @description Serialize Ignition error instance to error JSON format
 *
 * jsonapi.org error format:
 *
 *  source: {
 *      parameter: URL query parameter (no support yet)
 *      pointer: HTTP body attribute
 *  }
 *
 * @see http://jsonapi.org/format/#errors
 *
 * @param {Error} err
 * @param {Object} options { format: [String] (jsonapi || oauth) }
 */
exports.serialize = function serialize(err, options) {
    options = options || {format: 'jsonapi'};

    var errorFormat = {};

    try {
        if (options.format === 'jsonapi') {
            errorFormat = _private.JSONAPISerialize.bind(this)(err);
        } else {
            errorFormat = _private.OAuthSerialize.bind(this)(err);
        }
    } catch (err) {
        errorFormat.message = 'Something went wrong.';
    }

    // no need to sanitize the undefined values, on response send JSON.stringify get's called
    return errorFormat;
};

/**
 * @description Deserialize from error JSON format to Ignition error instance
 * @param {Object} errorFormat
 */
exports.deserialize = function deserialize(errorFormat) {
    var internalError = {};

    if (errorFormat.errors) {
        internalError = _private.JSONAPIDeserialize.bind(this)(errorFormat);
    } else {
        internalError = _private.OAuthDeserialize.bind(this)(errorFormat);
    }

    return internalError;
};

/**
 * @description Check whether an error instance is an Ignition error.
 *
 * NOTE: `instanceof` will fail, if multiple sub dependencies use it's own ignition installation.
 */
exports.isIgnitionError = function isIgnitionError(err) {
    var IgnitionName = this.IgnitionError.name;

    var recursiveIsIgnitionError = function recursiveIsIgnitionError(obj) {
        // no super constructor available anymore
        if (!obj) {
            return false;
        }

        if (obj.name === IgnitionName) {
            return true;
        }

        return recursiveIsIgnitionError(obj.super_);
    };

    return recursiveIsIgnitionError(err.constructor);
};