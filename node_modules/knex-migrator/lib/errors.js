const errors = require('@tryghost/errors');
const merge = require('lodash/merge');

class KnexMigrateError extends errors.MigrationError {}

const knexMigratorErrors = {
    MigrationExistsError: class MigrationExistsError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 100,
                errorType: 'MigrationExistsError'
            }, options));
        }
    },
    DatabaseIsNotOkError: class DatabaseIsNotOkError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 200,
                errorType: 'DatabaseIsNotOkError',
                help: 'If knex-migrator is not installed, please run "npm install -g knex-migrator" \nRead more here: https://github.com/TryGhost/knex-migrator'
            }, options));
        }
    },
    MigrationScriptError: class MigrationScriptError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 300,
                errorType: 'MigrationScriptError'
            }, options));
        }
    },
    RollbackError: class RollbackError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 400,
                errorType: 'RollbackError'
            }, options));
        }
    },
    MigrationsAreLockedError: class MigrationsAreLockedError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 500,
                errorType: 'MigrationsAreLockedError'
            }, options));
        }
    },
    LockError: class LockError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 500,
                errorType: 'LockError'
            }, options));
        }
    },
    UnlockError: class UnlockError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 500,
                errorType: 'UnlockError'
            }, options));
        }
    },
    DatabaseError: class DatabaseError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 500,
                errorType: 'DatabaseError'
            }, options));
        }
    },
    IrreversibleMigrationError: class IrreversibleMigrationError extends KnexMigrateError {
        constructor(options) {
            super(merge({
                id: 500,
                errorType: 'IrreversibleMigrationError'
            }, options));
        }
    }
};

module.exports = Object.assign(knexMigratorErrors, errors);
module.exports.KnexMigrateError = KnexMigrateError;
