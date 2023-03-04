const debug = require('debug')('knex-migrator:lock-table');
const DatabaseInfo = require('@tryghost/database-info');

/**
 * Checks if primary key index exists in a table over the given columns.
 */
function hasPrimaryKeySQLite(tableName, knex) {
    if (!DatabaseInfo.isSQLite(knex)) {
        throw new Error('Must use hasPrimaryKeySQLite on an SQLite3 database');
    }

    return knex.raw(`PRAGMA index_list('${tableName}');`)
        .then((rawConstraints) => {
            const tablePrimaryKey = rawConstraints.find(c => c.origin === 'pk');
            return tablePrimaryKey;
        });
}

/**
 * Adds an primary key index to a table over the given columns.
 */
function addPrimaryKey(tableName, columns, knex) {
    if (DatabaseInfo.isSQLite(knex)) {
        return hasPrimaryKeySQLite(tableName, knex)
            .then((primaryKeyExists) => {
                if (primaryKeyExists) {
                    debug(`Primary key constraint for: ${columns} already exists for table: ${tableName}`);
                    return;
                }

                return knex.schema.table(tableName, function (table) {
                    table.primary(columns);
                });
            });
    }

    return knex.schema.table(tableName, function (table) {
        table.primary(columns);
    }).catch((err) => {
        if (err.code === 'ER_MULTIPLE_PRI_KEY') {
            debug(`Primary key constraint for: ${columns} already exists for table: ${tableName}`);
            return;
        }
        throw err;
    });
}

/**
 * @description Private helper to create add a primary key to the migration lock table. The helper is called as part of `runDatabaseUpgrades`.
 * @returns {*}
 */
module.exports.up = function (connection) {
    debug('Add primary key to the lock table.');

    return addPrimaryKey('migrations_lock', 'lock_key', connection);
};
