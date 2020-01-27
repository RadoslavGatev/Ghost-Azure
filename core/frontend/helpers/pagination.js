// ### Pagination Helper
// `{{pagination}}`
// Outputs previous and next buttons, along with info about the current page

var proxy = require('./proxy'),
    _ = require('lodash'),
    errors = proxy.errors,
    i18n = proxy.i18n,
    createFrame = proxy.hbs.handlebars.createFrame,
    templates = proxy.templates,
    pagination;

pagination = function (options) {
    options = options || {};
    options.hash = options.hash || {};
    options.data = options.data || {};

    if (!_.isObject(this.pagination) || _.isFunction(this.pagination)) {
        throw new errors.IncorrectUsageError({
            level: 'normal',
            message: i18n.t('warnings.helpers.pagination.invalidData'),
            help: 'https://ghost.org/docs/api/handlebars-themes/helpers/pagination/'
        });
    }

    if (_.isUndefined(this.pagination.page) || _.isUndefined(this.pagination.pages) ||
        _.isUndefined(this.pagination.total) || _.isUndefined(this.pagination.limit)) {
        throw new errors.IncorrectUsageError({
            message: i18n.t('warnings.helpers.pagination.valuesMustBeDefined')
        });
    }

    if ((!_.isNull(this.pagination.next) && !_.isNumber(this.pagination.next)) ||
        (!_.isNull(this.pagination.prev) && !_.isNumber(this.pagination.prev))) {
        throw new errors.IncorrectUsageError({
            message: i18n.t('warnings.helpers.pagination.nextPrevValuesMustBeNumeric')
        });
    }

    if (!_.isNumber(this.pagination.page) || !_.isNumber(this.pagination.pages) ||
        !_.isNumber(this.pagination.total) || !_.isNumber(this.pagination.limit)) {
        throw new errors.IncorrectUsageError({message: i18n.t('warnings.helpers.pagination.valuesMustBeNumeric')});
    }

    // CASE: The pagination helper should have access to the pagination properties at the top level.
    _.merge(this, this.pagination);
    // CASE: The pagination helper will forward attributes passed to it.
    _.merge(this, options.hash);
    const data = createFrame(options.data);

    return templates.execute('pagination', this, {data});
};

module.exports = pagination;
