const errors = require('@tryghost/errors');
const merge = require('lodash/merge');

class BookshelfRelationsError extends errors.InternalServerError {
    constructor(options) {
        super(merge({
            errorType: 'BookshelfRelationsError',
            level: 'critical'
        }, options));
    }
}

module.exports = errors;
module.exports.BookshelfRelationsError = BookshelfRelationsError;
