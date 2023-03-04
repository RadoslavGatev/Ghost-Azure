const mingo = require('mingo');
const nql = require('@tryghost/nql-lang');
const mongoKnex = require('@tryghost/mongo-knex');
const utils = require('./utils');

module.exports = (queryString, options = {}) => {
    const api = {};

    // Convert the string to tokens - useful for testing / debugging, maybe for validating?
    api.lex = () => nql.lex(queryString);

    // Parse converts to mongo JSON and caches the result
    api.parse = function () {
        if (!this.filter && queryString) {
            this.filter = nql.parse(queryString);
            if (options.transformer) {
                this.filter = options.transformer(this.filter);
            }
        }

        let overrides;
        let defaults;

        if (options.overrides) {
            overrides = nql.parse(options.overrides);
        }

        if (options.defaults) {
            defaults = nql.parse(options.defaults);
        }

        let mongoJSON = utils.mergeFilters(overrides, this.filter, defaults);

        if (options.expansions) {
            mongoJSON = utils.expandFilters(mongoJSON, options.expansions);
        }

        return mongoJSON;
    };

    // Use Mingo to apply the query to a JSON object
    // @TODO rethink this naming
    api.queryJSON = function (obj) {
        this.query = this.query || new mingo.Query(api.parse());
        return this.query.test(obj);
    };

    // Use MongoKnex to apply the query to a query builder object
    api.querySQL = qb => mongoKnex(qb, api.parse(), options);

    // Get back the original query string
    api.toString = () => queryString;

    // Alias parse as toJSON()
    api.toJSON = api.parse;

    return api;
};

module.exports.utils = {
    mapQuery: require('@tryghost/mongo-utils').mapQuery,
    mapKeyValues: require('@tryghost/mongo-utils').mapKeyValues
};
