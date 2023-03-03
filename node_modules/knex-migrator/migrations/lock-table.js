const debug = require('debug')('knex-migrator:lock-table');
const errors = require('../lib/errors');

/**
 * @description Private helper to create the migration lock table. The helper is called as part of `runDatabaseUpgrades`.
 * @returns {*}
 */
module.exports.up = function (connection) {
    debug('Ensure Lock Table.');

    return connection.schema.hasTable('migrations_lock')
        .then(function (table) {
            if (table) {
                return;
            }

            return connection.schema.createTable('migrations_lock', function (table) {
                table.string('lock_key', 191).nullable(false).primary();
                table.boolean('locked').default(0);
                table.dateTime('acquired_at').nullable();
                table.dateTime('released_at').nullable();
            }).then(function () {
                return connection('migrations_lock')
                    .insert({
                        lock_key: 'km01',
                        locked: 0
                    });
            }).catch(function (err) {
                // CASE: sqlite db is locked (e.g. concurrent migrations are running)
                if (err.errno === 5) {
                    throw new errors.MigrationsAreLockedError({
                        message: 'Migrations are running at the moment. Please wait that the lock get`s released.',
                        context: 'Either the release was never released because of a e.g. died process or a parallel process is migrating at the moment.',
                        help: 'If you know what you are doing, you can manually release the lock by running `UPDATE migrations_lock set locked=0 where lock_key=\'km01\';`.'
                    });
                }

                throw err;
            });
        });
};
