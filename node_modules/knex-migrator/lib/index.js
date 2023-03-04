const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const debug = require('debug')('knex-migrator:index');
const database = require('./database');
const utils = require('./utils');
const errors = require('./errors');
const logging = require('@tryghost/logging');
const migrations = require('../migrations');
const locking = require('./locking');

/**
 * @description Prototype of Knex-migrator.
 * @param {Object} options
 * @constructor
 */
function KnexMigrator(options = {}) {
    let config = utils.loadConfig(options);

    if (!config.database) {
        throw new Error('MigratorConfig.js needs to export a database config.');
    }

    if (!config.migrationPath) {
        throw new Error('MigratorConfig.js needs to export the location of your migration files.');
    }

    if (!config.currentVersion) {
        throw new Error('MigratorConfig.js needs to export the a current version.');
    }

    this.executedFromShell = options.executedFromShell;
    this.currentVersion = config.currentVersion;
    this.migrationPath = config.migrationPath;
    this.subfolder = config.subfolder || 'versions';

    this.dbConfig = config.database;
}

/**
 * `knex-migrator init`
 *
 * @description This task will run init scripts.
 *
 * The `init` command goes through the following steps:
 *
 * 1. Create a database knex connection.
 * 2. Create database if it does not exist.
 * 3. Create tables for knex-migrator (migrations, migrations-lock)
 * 4. Run table upgrades/migrations if available.
 * 5. Lock the tables to avoid running migrations in parallel.
 * 6. Execute hooks and init scripts.
 * 7. Init completion: add all existing migration scripts to the database to make it possible to detect a state of the database correctly.
 * 8. Unlock tables.
 * 9. Disconnect from database otherwise the CLI won't close properly.
 *
 * The `init` command can be triggered via `knex-migrator migrate --init`.
 * This is a feature which makes it easier to not having to differentiate if a database needs a migration or an
 * initilisation. The special characteristic of this combo is that the init completation shouldn't run, because
 * otherwise we would overjump migration files to execute.
 *
 * @param {Object} options - Custom options you can pass in (disableHooks, noScripts, skipInitCompletion, only, skip)
 * @returns {Bluebird<R>}
 */
KnexMigrator.prototype.init = function init(options) {
    options = options || {};

    let self = this,
        disableHooks = options.disableHooks,
        noScripts = options.noScripts,
        skipInitCompletion = options.skipInitCompletion,
        skippedTasks = [],
        hooks = {};

    try {
        if (!disableHooks) {
            hooks = require(path.join(self.migrationPath, '/hooks/init'));
        }
    } catch (err) {
        debug('Hook Error: ' + err.message);
        debug('No hooks found, no problem.');
    }

    this.connection = database.connect(this.dbConfig);

    return database.createDatabaseIfNotExist(self.dbConfig)
        .then(function () {
            if (noScripts) {
                return;
            }

            // @NOTE: create table outside of the transaction! (implicit)
            return database.createMigrationsTable(self.connection).then(function () {
                return migrations.run(self.connection).then(function () {
                    return locking.lock(self.connection)
                        .then(function () {
                            if (hooks.before) {
                                debug('Before hook');
                                return hooks.before({
                                    connection: self.connection
                                });
                            }
                        })
                        .then(function executeMigrate() {
                            return self._migrateTo({
                                version: 'init',
                                only: options.only,
                                skip: options.skip
                            });
                        })
                        .then(function (response) {
                            skippedTasks = response.skippedTasks;

                            if (hooks.after) {
                                debug('After hook');
                                return hooks.after({
                                    connection: self.connection
                                });
                            }
                        })
                        .then(function () {
                            const initTasks = utils.listFiles(path.join(self.migrationPath, 'init'));

                            /**
                             * CASE 1: You can disable init completion manually
                             * CASE 2: Only skip init completion if you have all init scripts in place already!!
                             *
                             * Example:
                             * - knex-migrator migrate --init should not execute init completion
                             * -> does not run init completion
                             *
                             * Example:
                             * - knex-migrator init (process was destroyed, you only have 1 init script in your db)
                             * - knex-migrator init (the other init script get's executed)
                             * -> run init completion
                             *
                             */
                            if (skippedTasks.length === initTasks.length || skipInitCompletion) {
                                return Promise.resolve();
                            }

                            let versionsToMigrateTo;

                            // CASE: insert all migration files, otherwise you will run into problems
                            // e.g. you are on 1.2, you initialise the database, but there is 1.3 migration script
                            try {
                                versionsToMigrateTo = utils.readVersionFolders(
                                    path.join(self.migrationPath, self.subfolder)) || [];
                            } catch (err) {
                                // CASE: versions folder does not exists
                                if (err.code === 'READ_FOLDERS') {
                                    return Promise.resolve();
                                }

                                throw err;
                            }

                            return database.createTransaction(self.connection, async function (transacting) {
                                const existingMigrations = await transacting('migrations').select('name');
                                const existingMigrationsNames = existingMigrations.map(m => m.name);
                                const migrationsToAdd = [];

                                // CASE: Run over all migration scripts and add the file name to the database.
                                for (const versionToMigrateTo of versionsToMigrateTo) {
                                    let versionPath = path.join(self.migrationPath, self.subfolder, versionToMigrateTo);
                                    let filesToMigrateTo = utils.listFiles(versionPath) || [];

                                    // CASE: check if migration exists, do not insert twice
                                    for (const name of filesToMigrateTo) {
                                        if (existingMigrationsNames.includes(name)) {
                                            continue;
                                        }

                                        migrationsToAdd.push({
                                            name,
                                            version: versionToMigrateTo,
                                            currentVersion: self.currentVersion
                                        });
                                    }
                                }

                                await self.connection
                                    .batchInsert('migrations', migrationsToAdd)
                                    .transacting(transacting);
                            });
                        })
                        .then(function () {
                            return locking.unlock(self.connection);
                        })
                        .catch(function (err) {
                            if (err instanceof errors.MigrationsAreLockedError) {
                                throw err;
                            }

                            if (err instanceof errors.LockError) {
                                throw err;
                            }

                            return locking.unlock(self.connection)
                                .then(function () {
                                    throw err;
                                });
                        });
                });
            });
        })
        .then(function onInitSuccess() {
            debug('Init Success');
        })
        .catch(function onInitError(err) {
            // CASE: Do not rollback if migrations are locked
            if (err instanceof errors.MigrationsAreLockedError) {
                throw err;
            }

            // CASE: Do not rollback migration scripts, if lock error
            if (err instanceof errors.LockError) {
                throw err;
            }

            // CASE: ETIMEDOUT, ENOTFOUND
            if (err instanceof errors.DatabaseError) {
                throw err;
            }

            debug('Rolling back: ' + err.message);

            return self._rollback({
                version: 'init',
                skippedTasks: {
                    init: skippedTasks
                }
            }).then(function () {
                throw err;
            }).catch(function (innerErr) {
                if (errors.utils.isGhostError(innerErr)) {
                    throw err;
                }

                throw new errors.RollbackError({
                    message: innerErr.message,
                    err: innerErr,
                    context: `OuterError: ${err.message}`
                });
            });
        })
        .finally(function () {
            let ops = [];

            if (hooks.shutdown) {
                ops.push(function shutdownHook() {
                    debug('Shutdown hook');
                    return hooks.shutdown({
                        executedFromShell: self.executedFromShell
                    });
                });
            }

            ops.push(function destroyConnection() {
                debug('Destroy connection');
                return self.connection.destroy()
                    .then(function () {
                        debug('Destroyed connection');
                    });
            });

            return Promise.each(ops, function (op) {
                return op.bind(self)();
            });
        });
};

/**
 * `knex-migrator migrate`
 *
 * @description This task will run migration scripts.
 *
 * The `migrate` task runs through the following steps:
 *
 * 1. Create a database knex connection.
 * 2. Ensure connection works as expected.
 * 3. Run table upgrades/migrations if available.
 * 4. Lock the target tables to avoid running migrations in parallel.
 * 5. Perform an integrity check to figure out which migrations need to run (compare files against database)
 * 6. Execute migrations.
 * 7. Unlock table.
 * 8. Disconnect from database otherwise the CLI won't close properly.
 *
 * @param {Object} options - Custom options you can pass in (version, force, init, only, skip)
 * @returns {Bluebird<any>}
 */
KnexMigrator.prototype.migrate = async function migrate(options) {
    options = options || {};

    let onlyVersion = options.version,
        force = options.force,
        init = options.init,
        onlyFile = options.only,
        versionsToMigrate = [],
        hooks = {};

    // CASE: you can only use only in combination with the version flag
    if (onlyFile && !onlyVersion) {
        onlyFile = null;
    }

    if (onlyVersion) {
        debug('onlyVersion: ' + onlyVersion);
    }

    // CASE: `--init` flag is passed. Combo feature.
    if (init) {
        await this.init();
    }

    try {
        hooks = require(path.join(this.migrationPath, '/hooks/migrate'));
    } catch (err) {
        debug('Hook Error: ' + err.message);
        debug('No hooks found, no problem.');
    }

    this.connection = database.connect(this.dbConfig);

    try {
        await database.ensureConnectionWorks(this.connection);

        await migrations.run(this.connection);

        await locking.lock(this.connection);

        const result = await this._integrityCheck({force});

        _.each(result, function (_value, version) {
            // CASE: Log which versions won't be executed based on the "only" flag
            if (onlyVersion && version !== onlyVersion) {
                debug('Do not execute: ' + version);
                return;
            }
        });

        if (onlyVersion) {
            // CASE: filter out versions which should not run
            let containsVersion = _.find(result, function (_obj, key) {
                return key === onlyVersion;
            });

            if (!containsVersion) {
                logging.warn('Cannot find requested version: ' + onlyVersion);
            }
        }

        _.each(result, function (value, version) {
            // CASE: compare files on disk with files in database
            if (value.expected !== value.actual) {
                debug('Need to execute migrations for: ' + version);
                versionsToMigrate.push(version);
            }
        });

        if (versionsToMigrate.length) {
            if (hooks.before) {
                debug('Before hook');
                await hooks.before({
                    connection: this.connection
                });
            }

            logging.info('Running migrations.');

            for (const versionToMigrate of versionsToMigrate) {
                try {
                    await this._migrateTo({
                        version: versionToMigrate,
                        only: onlyFile,
                        hooks: hooks
                    });
                } catch (err) {
                    // CASE: Do not rollback if migrations are locked
                    if (err instanceof errors.MigrationsAreLockedError) {
                        throw err;
                    }

                    // CASE: Do not rollback migration scripts, if lock error
                    if (err instanceof errors.LockError) {
                        throw err;
                    }

                    // CASE: ETIMEDOUT, ENOTFOUND
                    if (err instanceof errors.DatabaseError) {
                        throw err;
                    }

                    if (err.context && err.context.name) {
                        debug(`Task failed: ${err.context.name}`);
                    }

                    logging.info(`Rolling back: ${err.message}.`);

                    const versionsMigrated = versionsToMigrate.slice(
                        0,
                        versionsToMigrate.indexOf(versionToMigrate) + 1
                    );

                    versionsMigrated.reverse();

                    try {
                        for (const versionMigrated of versionsMigrated) {
                            await this._rollback({version: versionMigrated, task: err.context});
                        }
                        logging.info(`Rollback was successful.`);
                        throw err;
                    } catch (innerErr) {
                        if (errors.utils.isGhostError(innerErr)) {
                            throw err;
                        }

                        throw new errors.RollbackError({
                            message: innerErr.message,
                            err: innerErr,
                            context: `OuterError: ${err.message}`
                        });
                    } finally {
                        await locking.unlock(this.connection);
                    }
                }
            }

            if (hooks.after) {
                debug('After hook');
                await hooks.after({
                    connection: this.connection
                });
            }
        }
        await locking.unlock(this.connection);
    } finally {
        if (hooks.shutdown) {
            debug('Shutdown hook');
            await hooks.shutdown({
                executedFromShell: this.executedFromShell
            });
        }

        debug('Destroy connection');
        await this.connection.destroy();
        debug('Destroyed connection');
    }
};

/**
 * `knex-migrator reset`
 *
 * @description The rest command will do a full hard reset.
 *
 * It will:
 *
 * 1. Create a connection to the database.
 * 2. Ensure connection works as expected.
 * 3. Lock the table to avoid running reset in parallel.
 * 4. Run table upgrades/migrations if available.
 * 5. Drop the database.
 *
 * If you pass the "force" flag, you will skip step 2-4.
 *
 * @param {Object} options - Custom options the user can pass in (force)
 * @returns {*}
 */
KnexMigrator.prototype.reset = function reset(options) {
    options = options || {};

    let self = this;
    let force = options.force;

    this.connection = database.connect(this.dbConfig);

    // CASE: ignore lock completely and drop the db
    if (force) {
        return database.drop({
            connection: self.connection,
            dbConfig: self.dbConfig
        }).catch(function onRestError(err) {
            // Database does not exist. MySql.
            if (err.errno === 1049) {
                return Promise.resolve();
            }

            throw err;
        }).finally(function () {
            debug('Destroy connection');
            return self.connection.destroy()
                .then(function () {
                    debug('Destroyed connection');
                });
        });
    }

    return database.ensureConnectionWorks(this.connection)
        .then(function () {
            return migrations.run(self.connection);
        })
        .then(function () {
            return locking.lock(self.connection);
        })
        .then(function () {
            return database.drop({
                connection: self.connection,
                dbConfig: self.dbConfig
            });
        })
        .catch(function onRestError(err) {
            if (err instanceof errors.MigrationsAreLockedError) {
                throw err;
            }

            // CASE: ETIMEDOUT, ENOTFOUND
            if (err instanceof errors.DatabaseError) {
                throw err;
            }

            debug('Reset error: ' + err.message);

            // CASE: Database does not exist. For MySql.
            if (err.errno === 1049) {
                return Promise.resolve();
            }

            return locking.unlock(self.connection)
                .then(function () {
                    throw err;
                });
        })
        .finally(function () {
            debug('Destroy connection');
            return self.connection.destroy()
                .then(function () {
                    debug('Destroyed connection');
                });
        });
};

/**
 * `knex-migrator health`
 *
 * @description This task detects the (migration) state of your database.
 *
 * It asks the database if....
 *
 * - the database was initialised?
 * - migration files need to be executed?
 *
 * The task runs through the following steps:
 *
 * 1. Create a database connection.
 * 2. Ensure the connection works (credentials are correct)
 * 3. Run table upgrades/migrations if available.
 * 4. Asks if the database is locked and aborts if so.
 * 5. Perform an integrity check to figure out which migrations need to run (compare files against database)
 * 6. Returns result.
 * 7. Destroy connection.
 *
 * @returns {Bluebird<any>}
 */
KnexMigrator.prototype.isDatabaseOK = function isDatabaseOK() {
    let self = this;
    this.connection = database.connect(this.dbConfig);

    return database.ensureConnectionWorks(this.connection)
        .then(function () {
            return migrations.run(self.connection);
        })
        .then(function () {
            return locking.isLocked(self.connection);
        })
        .then(function () {
            return self._integrityCheck();
        })
        .then(function (result) {
            // CASE: if an init script was removed, the health check will be positive (see #48)
            if (result.init && result.init.expected > result.init.actual) {
                throw new errors.DatabaseIsNotOkError({
                    message: 'Please run `yarn knex-migrator init`',
                    code: 'DB_NOT_INITIALISED'
                });
            }

            _.each(_.omit(result, 'init'), function (value) {
                // CASE: there are more migrations expected than have been run, database needs to be migrated
                if (value.expected > value.actual) {
                    throw new errors.DatabaseIsNotOkError({
                        message: 'Migrations are missing. Please run `yarn knex-migrator migrate`.',
                        code: 'DB_NEEDS_MIGRATION',
                        help: `Expected: ${value.expected} items in migrations table, found: ${value.actual}`
                    });
                    // CASE: there are more actual migrations than expected, something has gone wrong :(
                } else if (value.expected < value.actual) {
                    throw new errors.DatabaseIsNotOkError({
                        message: 'Detected more items in the migrations table than expected. Please manually inspect the migrations table.',
                        code: 'MIGRATION_STATE_ERROR',
                        help: `Expected: ${value.expected} items in migrations table, found: ${value.actual}`
                    });
                }
            });
        })
        .catch(function (err) {
            // CASE: database does not exist
            if (err.errno === 1049) {
                throw new errors.DatabaseIsNotOkError({
                    message: 'Please run `yarn knex-migrator init`',
                    code: 'DB_NOT_INITIALISED'
                });
            }

            throw err;
        })
        .finally(function () {
            if (!self.connection) {
                return;
            }

            debug('Destroy connection');
            return self.connection.destroy()
                .then(function () {
                    debug('Destroyed connection');
                });
        });
};

/**
 * `knex-migrator rollback`
 *
 * @description This task will rollback the database to a version.
 *
 * It will:
 *
 * 1. Create a connection to the database.
 * 2. Ensure the connection works (credentials are correct)
 * 3. Asks the database if the lock is active.
 * 4. If the lock is not active, you cannot rollback. This is the current default behaviour.
 * 5. If you pass the "force" flag, you can rollback if the lock is inactive.
 * 6. Executes rollback helper to rollback to a version.
 * 7. Destroy connection.
 *
 * @param {Object} options - Custom options the user can pass in (force, version, v, disableHooks)
 * @returns {Bluebird<any>}
 */
KnexMigrator.prototype.rollback = function rollback(options) {
    options = options || {};

    let self = this;
    let force = options.force;
    let version = options.version || options.v;
    let disableHooks = options.disableHooks;
    let hooks = {};

    this.connection = database.connect(this.dbConfig);

    const helper = function helper() {
        return new Promise(function (resolve, reject) {
            try {
                if (!disableHooks) {
                    // @TODO: load init or migrate hooks
                    hooks = require(path.join(self.migrationPath, '/hooks/init'));
                }
            } catch (err) {
                debug('Hook Error: ' + err.message);
                debug('No hooks found, no problem.');
            }

            if (hooks.before) {
                return hooks.before({
                    connection: self.connection
                }).then(resolve).catch(reject);
            }

            resolve();
        }).then(function () {
            let whereQuery = {};

            // CASE 1: rollback to specific version (query all and filter out)
            // CASE 2: rollback current version you are on
            if (version) {
                debug(`Rollback to specific version: ${version}`);
                whereQuery = {};
            } else {
                whereQuery = {
                    currentVersion: self.currentVersion
                };
            }

            return self.connection('migrations')
                .where(whereQuery)
                .then(function (values) {
                    if (!values.length) {
                        throw new errors.IncorrectUsageError({
                            message: 'No migrations available to rollback.'
                        });
                    }

                    // CASE: filter out all versions which are smaller than the version we want to rollback to
                    if (version) {
                        values = _.filter(values, function (value) {
                            return utils.isGreaterThanVersion({
                                greaterVersion: value.version,
                                smallerVersion: version
                            });
                        });
                    }

                    // @NOTE: we never ever rollback init scripts for now.
                    //       this can be very dangerous, because it removes tables
                    // @EXCEPTION: you run init scripts and they fail
                    values = _.filter(values, function (value) {
                        return value.version !== 'init';
                    });

                    values.reverse();
                    return Promise.each(values, function (value) {
                        return self._rollback({
                            version: value.version,
                            onlyTasks: [value.name]
                        });
                    });
                });
        }).then(function () {
            if (hooks.shutdown) {
                return hooks.shutdown({
                    executedFromShell: self.executedFromShell
                });
            }
        });
    };

    return database.ensureConnectionWorks(this.connection)
        .then(function () {
            return migrations.run(self.connection);
        })
        .then(function () {
            return locking.isLocked(self.connection);
        })
        .then(function () {
            // CASE: db is not locked, force
            if (force) {
                return helper();
            }

            throw new errors.IncorrectUsageError({
                message: 'Rollback did not happen.',
                help: 'Use --force if you want to force a rollback. By default, rollbacks are only allowed if your database is locked.'
            });
        })
        .catch(function (err) {
            if (err instanceof errors.MigrationsAreLockedError) {
                return helper()
                    .then(function () {
                        return locking.unlock(self.connection);
                    });
            }

            throw err;
        })
        .finally(function () {
            if (!self.connection) {
                return;
            }

            debug('Destroy connection');
            return self.connection.destroy()
                .then(function () {
                    debug('Destroyed connection');
                });
        });
};

// @TODO: All of these functions below are helper functions. Source them out as part of https://github.com/TryGhost/knex-migrator/issues/95.
/**
 * @description Private helper function for rolling back. It is called in various places to rollback to a state.
 *
 * Cases:
 *
 * 1. Init or migrate task failed, rollback the previous tasks too.
 * 2. Rollback task is executed.
 *
 * It will:
 *
 * 1. Read the migration tasks from disk.
 * 2. Call "down" fn of target migration script.
 * 3. Delete migration entry from database.
 *
 * @param {Object} options - Custom options the user can pass in (version, skippedTasks, onlyTasks, task)
 * @returns {Bluebird<IterableOrNever<R>>}
 * @private
 */
KnexMigrator.prototype._rollback = function _rollback(options) {
    let version = options.version;
    let skippedTasks = options.skippedTasks || [];
    let onlyTasks = options.onlyTasks || [];
    const failedTask = options.task;
    let tasks = [];
    let self = this;

    if (version !== 'init') {
        tasks = utils.readTasks(path.join(this.migrationPath, this.subfolder, version));
    } else {
        try {
            tasks = utils.readTasks(path.join(this.migrationPath, version));
        } catch (err) {
            if (err.code === 'MIGRATION_PATH') {
                tasks = [];
            } else {
                throw err;
            }
        }
    }

    // CASE: rollback failed in one of the tasks in init or migrate
    // CASE: if no task available, you are about to rollback manually `knex-migrator rollback`
    if (failedTask) {
        const newTasks = [];

        for (let i = 0; i < tasks.length; i = i + 1) {
            const task = tasks[i];

            if (task.name !== failedTask.name) {
                newTasks.push(task);
            } else if (task.name === failedTask.name) {
                /**
                 * @NOTE
                 *
                 * The task, which has failed, is never written to the database.
                 * But we have to double check if the target task was running in a transaction.
                 *
                 * Transaction: no need to rollback this task
                 * No Transaction: we have to rollback this task, because of implicit commits
                 */
                if (!failedTask.config || !failedTask.config.transaction) {
                    newTasks.push(task);
                }

                break;
            }
        }

        tasks = newTasks;
    }

    // CASE: one of the migrations that are about to be rolled back is marked as irreversible. Exit early without performing any actions
    const irreversibleMigrations = _.filter(tasks, function (task) {
        return !!_.get(task, 'config.irreversible');
    });
    if (irreversibleMigrations.length) {
        return Promise.reject(new errors.IrreversibleMigrationError({
            message: 'Unable to rollback',
            help: 'There are irreversible migrations when rolling back to the selected version, this typically means data required for earlier versions has been deleted. Please restore from a backup instead.',
            code: 'IRREVERSIBLE_MIGRATION'
        }));
    }

    tasks.reverse();

    return Promise.each(tasks, function (task) {
        if (skippedTasks[version] && skippedTasks[version].indexOf(task.name) !== -1) {
            return Promise.resolve();
        }

        if (onlyTasks.length && onlyTasks.indexOf(task.name) === -1) {
            return Promise.resolve();
        }

        if (!task.down) {
            debug('No down function provided', task.name);
            return self.connection('migrations')
                .where({
                    name: task.name,
                    version: version,
                    currentVersion: self.currentVersion
                })
                .delete();
        }

        debug('Rollback', task.name);

        if (task.config && task.config.transaction) {
            return database.createTransaction(self.connection, function (txn) {
                return task.down({
                    transacting: txn
                });
            }).then(function () {
                return self.connection('migrations')
                    .where({
                        name: task.name,
                        version: version
                    })
                    .delete();
            });
        }

        return task.down({
            connection: self.connection
        }).then(function () {
            return self.connection('migrations')
                .where({
                    name: task.name,
                    version: version
                })
                .delete();
        });
    });
};

/**
 * @description Private migrate helper.
 *
 * Cases:
 * 1. Init task will use this helper to migrate to "init".
 * 2. Migrate task will use this helper to migrate to a version e.g. "1.1"
 *
 * It will:
 * 1. Read the migration tasks from disk.
 * 2. Execute hooks.
 * 3. Create a transaction for the target migration file if configured. Each migration scripts can run in one transaction.
 *    If multiple versions/scripts are executed, we cannot run all of them in a single txn, because implicit commands can happen in between.
 * 4. Execute "up" function of migration file.
 * 5. Returns any skipped task. Skipped tasks are tasks which failed. Only one task is returned, the last one which failed.
 *
 * @param {Object} options - Custom options the user can pass in (version, hooks, only, skip)
 * @returns {Bluebird<{skippedTasks: Array}>}
 * @private
 */
KnexMigrator.prototype._migrateTo = function _migrateTo(options) {
    options = options || {};

    let self = this,
        version = options.version,
        hooks = options.hooks || {},
        only = options.only || null,
        skip = options.skip || null,
        subfolder = this.subfolder,
        skippedTasks = [],
        tasks = [];

    if (version !== 'init') {
        tasks = utils.readTasks(path.join(self.migrationPath, subfolder, version));
    } else {
        try {
            tasks = utils.readTasks(path.join(self.migrationPath, version));
        } catch (err) {
            if (err.code === 'MIGRATION_PATH') {
                tasks = [];
            } else {
                throw err;
            }
        }
    }

    if (only !== null) {
        debug('only: ' + only);
        tasks = [tasks[only - 1]];
    } else if (skip !== null) {
        debug('skip: ' + skip);
        tasks.splice(skip - 1, 1);
    }

    debug('Migrate: ' + version + ' with ' + tasks.length + ' tasks.');
    debug('Tasks: ' + JSON.stringify(tasks));

    return Promise.each(tasks, function executeTask(task) {
        return self._beforeEach({
            task: task.name,
            version: version
        }).then(function () {
            if (hooks.beforeEach) {
                return hooks.beforeEach({
                    connection: self.connection
                });
            }
        }).then(function () {
            debug('Running up: ' + task.name);

            if (task.config && task.config.transaction) {
                return database.createTransaction(self.connection, function (txn) {
                    return task.up({
                        transacting: txn
                    });
                });
            }

            return task.up({
                connection: self.connection
            });
        }).then(function () {
            if (hooks.afterEach) {
                return hooks.afterEach({
                    connection: self.connection
                });
            }
        }).then(function () {
            return self._afterEach({
                task: task,
                version: version
            });
        }).catch(function (err) {
            if (err instanceof errors.MigrationExistsError) {
                debug('Skipping:' + task.name);
                skippedTasks.push(task.name);
                return Promise.resolve();
            }

            /**
             * @NOTE: When your database encoding is set to utf8mb4 and you set a field length > 191 characters,
             * MySQL will throw an error, BUT it won't roll back the changes, because ALTER/CREATE table commands are
             * implicit commands.
             *
             * https://bugs.mysql.com/bug.php?id=28727
             * https://github.com/TryGhost/knex-migrator/issues/51
             */
            if (err.code === 'ER_TOO_LONG_KEY') {
                let match = err.message.match(/`\w+`/g);
                let table = match[0];
                let field = match[2];

                throw new errors.MigrationScriptError({
                    message: 'Field length of %field% in %table% is too long!'.replace('%field%', field).replace('%table%', table),
                    context: 'This usually happens if your database encoding is utf8mb4.\n' +
                        'All unique fields and indexes must be lower than 191 characters.\n' +
                        'Please correct your field length and reset your database with `yarn knex-migrator reset`.\n',
                    help: 'Read more here: https://github.com/TryGhost/knex-migrator/issues/51\n',
                    err: err
                });
            }

            throw new errors.MigrationScriptError({
                message: err.message,
                help: 'Error occurred while executing the following migration: ' + task.name,
                context: task,
                err: err
            });
        });
    }).then(function () {
        return {
            skippedTasks: skippedTasks
        };
    });
};

/**
 * @description Private helper to execute logic before each migration script is executed.
 *
 * It ensures that migration scripts are not executed twice.
 *
 * @param {Object} options
 * @returns {*}
 * @private
 */
KnexMigrator.prototype._beforeEach = function _beforeEach(options) {
    options = options || {};

    let task = options.task,
        version = options.version;

    return this.connection('migrations')
        .then(function (migrations) {
            if (!migrations.length) {
                return;
            }

            if (_.find(migrations, {name: task, version: version})) {
                throw new errors.MigrationExistsError();
            }
        });
};

/**
 * @description Private helper to execute logic after each migration script is executed.
 *
 * It ensures that migration files are inserted into the database.
 *
 * @param {Object} options
 * @returns {*}
 * @private
 */
KnexMigrator.prototype._afterEach = function _afterEach(options) {
    options = options || {};

    let self = this;
    let task = options.task;
    let version = options.version;

    return this.connection('migrations')
        .insert({
            name: task.name,
            version: version,
            currentVersion: self.currentVersion
        });
};

/**
 * @description Private helper to execute an integrity check. The integrity check compares files against entries in the
 * database. It returns expected and actual database state.
 *
 * @param {Object} options - Custom user options (force)
 * @returns {Bluebird<any>}
 * @private
 */
KnexMigrator.prototype._integrityCheck = async function _integrityCheck(options) {
    options = options || {};

    let self = this,
        subfolder = this.subfolder,
        force = options.force,
        folders = [],
        toReturn = {},
        futureVersions = [];

    // CASE: we always fetch the init scripts and check them
    // 1. to be able to add more init scripts
    // 2. to check if migration scripts need's to be executed or not, see https://github.com/TryGhost/knex-migrator/issues/39
    folders.push('init');

    // CASE: no subfolder yet. You can tell knex-migrator if scripts live on a sub folder.
    try {
        folders = folders.concat(utils.readVersionFolders(path.join(self.migrationPath, subfolder)));
    } catch (err) {
        // ignore
    }

    try {
        const dbMigrations = await this
            .connection('migrations')
            .select('version')
            .count('version', {as: 'c'})
            .groupBy('version');

        _.each(folders, function (folder) {
            // CASE: versions/1.1-members or versions/2.0-payments
            if (folder !== 'init') {
                try {
                    folder = folder.match(/([\d._]+)/)[0];
                } catch (err) {
                    logging.warn('Cannot parse folder name.');
                    logging.warn('Ignore Folder: ' + folder);
                    return;
                }
            }

            // CASE:
            // if your current version is 1.0 and you add migration scripts for the next version 1.1
            // we won't execute them until your current version changes to 1.1 or until you force KM to migrate to it
            if (self.currentVersion && !force) {
                if (utils.isGreaterThanVersion({smallerVersion: self.currentVersion, greaterVersion: folder})) {
                    futureVersions.push(folder);
                }
            }

            let actual = 0;
            let expected;

            const migrationCount = dbMigrations.find(m => m.version === folder);
            if (migrationCount) {
                actual = migrationCount.c;
            }

            if (folder !== 'init') {
                expected = utils.listFiles(path.join(self.migrationPath, subfolder, folder)).length;
            } else {
                expected = utils.listFiles(path.join(self.migrationPath, folder)).length;
            }

            debug('Version ' + folder + ' expected: ' + expected);
            debug('Version ' + folder + ' actual: ' + actual);

            toReturn[folder] = {
                expected: expected,
                actual: actual
            };
        });

        // CASE: ensure that either you have to run `migrate --force` or they ran already
        if (futureVersions.length) {
            _.each(futureVersions, function (futureVersion) {
                if (toReturn[futureVersion].actual !== toReturn[futureVersion].expected) {
                    logging.warn('knex-migrator is skipping ' + futureVersion);
                    logging.warn('Current version in MigratorConfig.js is smaller then requested version, use --force to proceed!');
                    logging.warn('Please run `yarn knex-migrator migrate --v ' + futureVersion + ' --force` to proceed!');
                    delete toReturn[futureVersion];
                }
            });
        }

        return toReturn;
    } catch (err) {
        // CASE: no database selected (database.connection.database="")
        if (err.errno === 1046) {
            throw new errors.DatabaseIsNotOkError({
                message: 'Please define a target database in your configuration.',
                help: 'database: {\n\tconnection:\n\t\tdatabase:"database_name"\n\t}\n}\n',
                code: 'DB_NOT_INITIALISED'
            });
        }

        // CASE: database does not exist
        if (err.errno === 1049) {
            throw new errors.DatabaseIsNotOkError({
                message: 'Please run `yarn knex-migrator init`',
                code: 'DB_NOT_INITIALISED'
            });
        }

        // CASE: migration table does not exist
        if (err.errno === 1 || err.errno === 1146) {
            throw new errors.DatabaseIsNotOkError({
                message: 'Please run `yarn knex-migrator init`',
                code: 'MIGRATION_TABLE_IS_MISSING'
            });
        }

        throw err;
    }
};

module.exports = KnexMigrator;
