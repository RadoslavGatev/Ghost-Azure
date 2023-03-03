const uuid = require('uuid');
const utils = require('./utils');
const merge = require('lodash/merge');
const isString = require('lodash/isString');

/**
 * @description Ignition Error Prototype.
 *
 * Ignition offers a set of general & pre-configured error definitions you can use in your project.
 * If you instantiate an error, Ignition will try to set up all error properties based on your input.
 * Ignition errors stick to the format of native errors + add's more custom attributes.
 *
 * @TODO: Move this code into errors.js.
 *
 * @param {Object} options
 * @constructor
 */
class IgnitionError extends Error {
    constructor(options) {
        options = options || {};

        if (isString(options)) {
            /* eslint-disable no-restricted-syntax */
            throw new Error('Please instantiate Errors with the option pattern. e.g. new errors.IgnitionError({message: ...})');
            /* eslint-enable no-restricted-syntax */
        }

        super();

        /**
         * defaults
         */
        this.statusCode = 500;
        this.errorType = 'InternalServerError';
        this.level = 'normal';
        this.message = 'The server has encountered an error.';
        this.id = uuid.v1();

        /**
         * custom overrides
         */
        this.id = options.id || this.id;
        this.statusCode = options.statusCode || this.statusCode;
        this.level = options.level || this.level;
        this.context = options.context || this.context;
        this.help = options.help || this.help;
        this.errorType = this.name = options.errorType || this.errorType;
        this.errorDetails = options.errorDetails;
        this.code = options.code || null;
        this.property = options.property || null;
        this.redirect = options.redirect || null;

        this.message = options.message || this.message;
        this.hideStack = options.hideStack;

        // NOTE: Error to inherit from, override!
        //       Nested objects are getting copied over in one piece (can be changed, but not needed right now)
        if (options.err) {
            // CASE: Support err as string (it happens that third party libs return a string instead of an error instance)
            if (isString(options.err)) {
                /* eslint-disable no-restricted-syntax */
                options.err = new Error(options.err);
                /* eslint-enable no-restricted-syntax */
            }

            Object.getOwnPropertyNames(options.err).forEach((property) => {
                if (['errorType', 'name', 'statusCode', 'message', 'level'].indexOf(property) !== -1) {
                    return;
                }

                // CASE: `code` should put options as priority over err
                if (property === 'code') {
                    this[property] = this[property] || options.err[property];
                    return;
                }

                if (property === 'stack') {
                    this[property] += '\n\n' + options.err[property];
                    return;
                }

                this[property] = options.err[property] || this[property];
            });
        }
    }
}

const errors = {
    InternalServerError: class InternalServerError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 500,
                level: 'critical',
                errorType: 'InternalServerError',
                message: 'The server has encountered an error.'
            }, options));
        }
    },
    IncorrectUsageError: class IncorrectUsageError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 400,
                level: 'critical',
                errorType: 'IncorrectUsageError',
                message: 'We detected a misuse. Please read the stack trace.'
            }, options));
        }
    },
    NotFoundError: class NotFoundError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 404,
                errorType: 'NotFoundError',
                message: 'Resource could not be found.'
            }, options));
        }
    },
    BadRequestError: class BadRequestError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 400,
                errorType: 'BadRequestError',
                message: 'The request could not be understood.'
            }, options));
        }
    },
    UnauthorizedError: class UnauthorizedError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 401,
                errorType: 'UnauthorizedError',
                message: 'You are not authorised to make this request.'
            }, options));
        }
    },
    PasswordResetRequiredError: class PasswordResetRequiredError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 401,
                errorType: 'PasswordResetRequiredError',
                message: 'As a security precaution, your password must be reset. Click "Forgot?" to receive an email with instructions.'
            }, options));
        }
    },
    NoPermissionError: class NoPermissionError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 403,
                errorType: 'NoPermissionError',
                message: 'You do not have permission to perform this request.'
            }, options));
        }
    },
    ValidationError: class ValidationError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 422,
                errorType: 'ValidationError',
                message: 'The request failed validation.'
            }, options));
        }
    },
    UnsupportedMediaTypeError: class UnsupportedMediaTypeError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 415,
                errorType: 'UnsupportedMediaTypeError',
                message: 'The media in the request is not supported by the server.'
            }, options));
        }
    },
    TooManyRequestsError: class TooManyRequestsError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 429,
                errorType: 'TooManyRequestsError',
                message: 'Server has received too many similar requests in a short space of time.'
            }, options));
        }
    },
    MaintenanceError: class MaintenanceError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 503,
                errorType: 'MaintenanceError',
                message: 'The server is temporarily down for maintenance.'
            }, options));
        }
    },
    MethodNotAllowedError: class MethodNotAllowedError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 405,
                errorType: 'MethodNotAllowedError',
                message: 'Method not allowed for resource.'
            }, options));
        }
    },
    RequestEntityTooLargeError: class RequestEntityTooLargeError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 413,
                errorType: 'RequestEntityTooLargeError',
                message: 'Request was too big for the server to handle.'
            }, options));
        }
    },
    TokenRevocationError: class TokenRevocationError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 503,
                errorType: 'TokenRevocationError',
                message: 'Token is no longer available.'
            }, options));
        }
    },
    VersionMismatchError: class VersionMismatchError extends IgnitionError {
        constructor(options) {
            super(merge({
                statusCode: 400,
                errorType: 'VersionMismatchError',
                message: 'Requested version does not match server version.'
            }, options));
        }
    }
};

module.exports = errors;
module.exports.IgnitionError = IgnitionError;
module.exports.utils = {
    serialize: utils.serialize.bind(errors),
    deserialize: utils.deserialize.bind(errors),
    isIgnitionError: utils.isIgnitionError.bind(errors)
};
