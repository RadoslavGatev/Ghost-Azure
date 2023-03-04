const debug = require('debug')('knex-migrator:field-length');

/**
 * @description Private helper to migrate the migrations table. It will add missing constraints to existing fields.
 * @returns {*}
 */
module.exports.up = function (connection) {
    debug('Ensure Field Length.');

    return connection.schema.hasTable('migrations')
        .then(function (exists) {
            if (exists) {
                return connection.schema.alterTable('migrations', function (table) {
                    table.string('name', 120).nullable(false).alter();
                    table.string('version', 70).nullable(false).alter();
                }).catch(function () {
                    // ignore for now, it's not a urgent, required change
                    return Promise.resolve();
                });
            }
        });
};
