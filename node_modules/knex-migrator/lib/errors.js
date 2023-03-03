const util = require('util');
const each = require('lodash/each');
const errors = require('ghost-ignition').errors;

function KnexMigrateError(options) {
    options = options || {};
    errors.IgnitionError.call(this, options);
}

const knexMigratorErrors = {
    MigrationExistsError: function MigrationExistsError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 100,
            errorType: 'MigrationExistsError'
        }, options));
    },
    DatabaseIsNotOkError: function DatabaseIsNotOkError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 200,
            errorType: 'DatabaseIsNotOkError',
            help: 'If knex-migrator is not installed, please run "npm install -g knex-migrator" \nRead more here: https://github.com/TryGhost/knex-migrator'
        }, options));
    },
    MigrationScriptError: function MigrationScriptError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 300,
            errorType: 'MigrationScriptError'
        }, options));
    },
    RollbackError: function RollbackError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 400,
            errorType: 'RollbackError'
        }, options));
    },
    MigrationsAreLockedError: function MigrationsAreLockedError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 500,
            errorType: 'MigrationsAreLockedError'
        }, options));
    },
    LockError: function LockError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 500,
            errorType: 'LockError'
        }, options));
    },
    UnlockError: function UnlockError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 500,
            errorType: 'UnlockError'
        }, options));
    },
    DatabaseError: function DatabaseError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 500,
            errorType: 'DatabaseError'
        }, options));
    },
    IrreversibleMigrationError: function IrreversibleMigrationError(options) {
        KnexMigrateError.call(this, Object.assign({
            id: 500,
            errorType: 'IrreversibleMigrationError'
        }, options));
    }
};

util.inherits(KnexMigrateError, errors.IgnitionError);

each(knexMigratorErrors, function (error) {
    util.inherits(error, KnexMigrateError);
});

// we need to inherit all general errors from KnexMigrateError, otherwise we have to check instanceof IgnitionError
each(errors, function (error) {
    if (error.name === 'IgnitionError' || typeof error === 'object') {
        return;
    }

    util.inherits(error, KnexMigrateError);
});

module.exports = Object.assign(knexMigratorErrors, errors);
module.exports.KnexMigrateError = KnexMigrateError;
