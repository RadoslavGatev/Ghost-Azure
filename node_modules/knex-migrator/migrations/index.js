const lockTable = require('./lock-table');
const fieldLength = require('./field-length');
const useIndex = require('./use-index');
const addPKToLockTable = require('./add-primary-key-to-lock-table');

/**
 * @description Helper to run database migrations for the database tables, which knex-migrator is using.
 *
 * You can use this helper to execute more database migrations. It get's called as soon as you hit any knex-migrator command.
 */
module.exports.run = function (connection) {
    return Promise.resolve()
        .then(() => lockTable.up(connection))
        .then(() => fieldLength.up(connection))
        .then(() => useIndex.up(connection))
        .then(() => addPKToLockTable.up(connection));
};
