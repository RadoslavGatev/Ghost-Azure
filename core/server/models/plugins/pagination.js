// # Pagination
//
// Extends Bookshelf.Model with a `fetchPage` method. Handles everything to do with paginated requests.
var _ = require('lodash'),
    errors = require('../../errors'),
    i18n = require('../../i18n'),
    defaults,
    paginationUtils,
    pagination;

/**
 * ### Default pagination values
 * These are overridden via `options` passed to each function
 * @typedef {Object} defaults
 * @default
 * @property {Number} `page` \- page in set to display (default: 1)
 * @property {Number|String} `limit` \- no. results per page (default: 15)
 */
defaults = {
    page: 1,
    limit: 15
};

/**
 * ## Pagination Utils
 * @api private
 * @type {{parseOptions: Function, query: Function, formatResponse: Function}}
 */
paginationUtils = {
    /**
     * ### Parse Options
     * Take the given options and ensure they are valid pagination options, else use the defaults
     * @param {options} options
     * @returns {options} options sanitised for pagination
     */
    parseOptions: function parseOptions(options) {
        options = _.defaults(options || {}, defaults);

        if (options.limit !== 'all') {
            options.limit = parseInt(options.limit, 10) || defaults.limit;
        }

        options.page = parseInt(options.page, 10) || defaults.page;

        return options;
    },
    /**
     * ### Query
     * Apply the necessary parameters to paginate the query
     * @param {bookshelf.Model} model
     * @param {options} options
     */
    addLimitAndOffset: function addLimitAndOffset(model, options) {
        if (_.isNumber(options.limit)) {
            model
                .query('limit', options.limit)
                .query('offset', options.limit * (options.page - 1));
        }
    },

    /**
     * ### Format Response
     * Takes the no. items returned and original options and calculates all of the pagination meta data
     * @param {Number} totalItems
     * @param {options} options
     * @returns {pagination} pagination metadata
     */
    formatResponse: function formatResponse(totalItems, options) {
        var calcPages = Math.ceil(totalItems / options.limit) || 0,
            pagination = {
                page: options.page || defaults.page,
                limit: options.limit,
                pages: calcPages === 0 ? 1 : calcPages,
                total: totalItems,
                next: null,
                prev: null
            };

        if (pagination.pages > 1) {
            if (pagination.page === 1) {
                pagination.next = pagination.page + 1;
            } else if (pagination.page === pagination.pages) {
                pagination.prev = pagination.page - 1;
            } else {
                pagination.next = pagination.page + 1;
                pagination.prev = pagination.page - 1;
            }
        }

        return pagination;
    }
};

// ## Object Definitions

/**
 * ### Pagination Object
 * @typedef {Object} pagination
 * @property {Number} page \- page in set to display
 * @property {Number|String} limit \- no. results per page, or 'all'
 * @property {Number} pages \- total no. pages in the full set
 * @property {Number} total \- total no. items in the full set
 * @property {Number|null} next \- next page
 * @property {Number|null} prev \- previous page
 */

/**
 * ### Fetch Page Options
 * @typedef {Object} options
 * @property {Number} page \- page in set to display
 * @property {Number|String} limit \- no. results per page, or 'all'
 * @property {Object} order \- set of order by params and directions
 */

/**
 * ### Fetch Page Response
 * @typedef {Object} paginatedResult
 * @property {Array} collection \- set of results
 * @property {pagination} pagination \- pagination metadata
 */

/**
 * ## Pagination
 * Extends `bookshelf.Model` with `fetchPage`
 * @param {Bookshelf} bookshelf \- the instance to plug into
 */
pagination = function pagination(bookshelf) {
    // Extend updates the first object passed to it, no need for an assignment
    _.extend(bookshelf.Model.prototype, {
        /**
         * ### Fetch page
         * A `fetch` extension to get a paginated set of items from a collection
         *
         * We trigger two queries:
         * 1. count query to know how many pages left (important: we don't attach any group/order statements!)
         * 2. the actualy fetch query with limit and page property
         *
         * @param {options} options
         * @returns {paginatedResult} set of results + pagination metadata
         */
        fetchPage: function fetchPage(options) {
            // Setup pagination options
            options = paginationUtils.parseOptions(options);

            // Get the table name and idAttribute for this model
            var tableName = _.result(this.constructor.prototype, 'tableName'),
                idAttribute = _.result(this.constructor.prototype, 'idAttribute'),
                self = this,
                countPromise = this.query().clone().select(
                    bookshelf.knex.raw('count(distinct ' + tableName + '.' + idAttribute + ') as aggregate')
                );

            // #### Pre count clauses
            // Add any where or join clauses which need to be included with the aggregate query

            // Clone the base query & set up a promise to get the count of total items in the full set
            // Due to lack of support for count distinct, this is pretty complex.
            return countPromise.then(function (countResult) {
                // #### Post count clauses
                // Add any where or join clauses which need to NOT be included with the aggregate query

                // Setup the pagination parameters so that we return the correct items from the set
                paginationUtils.addLimitAndOffset(self, options);

                // Apply ordering options if they are present
                if (options.order && !_.isEmpty(options.order)) {
                    _.forOwn(options.order, function (direction, property) {
                        if (property === 'count.posts') {
                            self.query('orderBy', 'count__posts', direction);
                        } else {
                            self.query('orderBy', tableName + '.' + property, direction);
                        }
                    });
                } else if (options.orderRaw) {
                    self.query(function (qb) {
                        qb.orderByRaw(options.orderRaw);
                    });
                }

                if (options.groups && !_.isEmpty(options.groups)) {
                    _.each(options.groups, function (group) {
                        self.query('groupBy', group);
                    });
                }

                // Setup the promise to do a fetch on our collection, running the specified query
                // @TODO: ensure option handling is done using an explicit pick elsewhere
                return self.fetchAll(_.omit(options, ['page', 'limit']))
                    .then(function (fetchResult) {
                        return {
                            collection: fetchResult,
                            pagination: paginationUtils.formatResponse(countResult[0] ? countResult[0].aggregate : 0, options)
                        };
                    })
                    .catch(function (err) {
                        // e.g. offset/limit reached max allowed integer value
                        if (err.errno === 20 || err.errno === 1064) {
                            throw new errors.NotFoundError({message: i18n.t('errors.errors.pageNotFound')});
                        }

                        throw err;
                    });
            });
        }
    });
};

/**
 * ## Export pagination plugin
 * @api public
 */
module.exports = pagination;
