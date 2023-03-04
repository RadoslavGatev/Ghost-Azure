const debug = require('@tryghost/debug')('models:plugins:filter');
const errors = require('@tryghost/errors');
const tpl = require('@tryghost/tpl');

const messages = {
    errorParsing: 'Error parsing filter'
};

/**
 * @param {import('bookshelf')} Bookshelf
 */
const filter = function filter(Bookshelf) {
    const Model = Bookshelf.Model.extend({
        // Cached copy of the filters setup for this model instance
        _filters: null,
        // Override these on the various models
        enforcedFilters() {},
        defaultFilters() {},
        extraFilters() {},
        filterExpansions() {},
        filterRelations() {},
        /**
         * Method which makes the necessary query builder calls (through knex) for the filters set on this model
         * instance.
         */
        applyDefaultAndCustomFilters: function applyDefaultAndCustomFilters(options) {
            const nql = require('@tryghost/nql');

            const expansions = [];

            if (this.filterExpansions()) {
                expansions.push(...this.filterExpansions());
            }

            let custom = options.filter;
            let extra = this.extraFilters(options);
            let overrides = this.enforcedFilters(options);
            let defaults = this.defaultFilters(options);
            let relations = this.filterRelations(options) || {};
            let transformer = options.mongoTransformer;

            debug('custom', custom);
            debug('extra', extra);
            debug('enforced', overrides);
            debug('default', defaults);

            if (extra) {
                if (custom) {
                    custom = `${custom}+${extra}`;
                } else {
                    custom = extra;
                }
            }

            try {
                this.query((qb) => {
                    nql(custom, {
                        relations: relations,
                        expansions: expansions,
                        overrides: overrides,
                        defaults: defaults,
                        transformer: transformer
                    }).querySQL(qb);
                });
            } catch (err) {
                throw new errors.BadRequestError({
                    message: tpl(messages.errorParsing),
                    err
                });
            }
        }
    });

    Bookshelf.Model = Model;
};

/**
 * ## Export Filter plugin
 * @api public
 */
module.exports = filter;
