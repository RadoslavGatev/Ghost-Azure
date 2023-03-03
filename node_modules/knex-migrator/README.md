# knex-migrator

A database migration tool for [knex.js](https://github.com/tgriesser/knex), which supports MySQL and SQlite3.

## Features

- [x] JS API
- [x] CLI Tool
- [x] Differentiation between database initialization and migration (Support for a database schema, [like we use in Ghost](https://github.com/TryGhost/Ghost/blob/1.16.2/core/server/data/schema/schema.js))
- [x] Support for database creation
- [x] Hooks
- [x] Rollback to latest version
- [x] Auto-Rollback on error
- [x] Database health check
- [x] Supports transactions
- [x] Full atomic, support for separate DML/DDL scripts (no autocommit)
- [x] Migration lock
- [x] Full debug & pretty log support
- [x] Custom migration folder structure
- [x] Stable (Used in [Ghost](https://github.com/TryGhost/Ghost) for many years in thousands of blogs in production mode)

# Install

`npm install knex-migrator --save`

or

`yarn add knex-migrator`

Add me to your globals:
   - `npm install --global knex-migrator`

# Usage

## Pre-word

- Replicas are unsupported, because Knex.js [doesn't support them](https://github.com/tgriesser/knex/issues/2253).
- Sqlite does **not** support read locks by default. Read [here](https://github.com/TryGhost/knex-migrator/issues/87) why.
- [Comparison](https://github.com/TryGhost/knex-migrator/issues/119) with other available migration tools.
- Don't mix DDL/DML statements in a migration script. In MySQL DDL statements use implicit commits.
- It's highly recommended to write both the `up` and the `down` function to ensure a full rollback.
- If your process dies while migrations are running, knex-migrator won't be able to release the migration lock.
  To release to lock you can run `knex-migrator rollback`. **But** it's recommended to check your database first to see in which state it is.
  You can check the tables `migrations` and `migrations_lock`. The rollback will rollback any migrations which were executed based on your current version.

## Configure knex-migrator

The tool requires a config file in your project root.
Please add a file named `MigratorConfig.js`. Knex-migrator will load the config file.


```
module.exports = {
    database: {
        client:         String          (Required) ['mysql', 'mysql2', 'sqlite3']
        connection: {
            host:       String,         (Required) [e.g. '127.0.0.1']
            user:       String,         (Required)
            password:   String,         (Required)
            charset:    String,         (Optional) [Default: 'utf8mb4']
            database:   String          (Required)
        }
    },
    migrationPath:      String,         (Required) [e.g. '/var/www/project/migrations']
    currentVersion:     String,         (Required) [e.g. '2.0']
    subfolder:          String          (Optional) [Default: 'versions']
}
```

Please take a look at [this real example](https://github.com/TryGhost/Ghost/blob/2.19.3/MigratorConfig.js).

## Folder Structure

```
project/
    migrations/
        hooks/
            init/
                index.js
                before.js
                shutdown.js
            migrate/
                index.js
                after.js
                shutdown.js
        init/
            1-add-tables.js
        versions/
            1.0/
                1-add-events-table.js
                2-normalise-settings.js
            2.0/
                1-add-timestamps-columns.js
            2.1/
                1-remove-empty-strings.js
                2-add-webhooks-table.js
                3-add-permissions.js
```

Please take a look at [this real example](https://github.com/TryGhost/Ghost/tree/2.19.3/core/server/data/migrations).

## Hooks

Knex-migrator offers a couple of hooks, which makes it possible to hook into the migration process. You can create a hook per type: 'init' or 'migrate'. The folder name must be `hooks` and is not configurable. Please create an index.js file to export your functions, see [example](https://github.com/TryGhost/Ghost/blob/2.19.3/core/server/data/migrations/hooks/init/index.js).

|hook|description|
|---|---|
|before|is called before anything happens|
|beforeEach| is called before each migration script|
|after|is called after everything happened|
|afterEach|is called after each migration script|
|shutdown|is called before the migrator shuts down|


## Migration Files

### Config
You can configure each migration script.

```
module.exports.config = {
  transaction: Boolean
}
```


### Examples
```
const Promise = require('bluebird');

module.exports.up = function(options) {
  const connection = options.connection;

  ...

  return Promise.resolve();
};

module.exports.down = function(options) {
  const connection = options.connection;

  ...

  return Promise.resolve();
}
```

```
const Promise = require('bluebird');

module.exports.config = {
  transaction: true
};

module.exports.up = function(options) {
  const connection = options.transacting;

  ...

  return Promise.resolve();
};

module.exports.down = function(options) {
  const connection = options.transacting;

  ...

  return Promise.resolve();
}
```

## CLI

### Commands

#### knex-migrator help

```
$ knex-migrator help
Usage: knex-migrator [options] [command]

Options:
  -v, --version       output the version number
  -h, --help          output usage information

Commands:
  init|i [config]     init db
  migrate|m [config]  migrate db
  reset|r             reset db
  health|h            health of db
  rollback|ro         rollbacks your db
  help [cmd]          display help for [cmd]
```

#### knex-migrator health

- Returns the database health/state
- Based on your current version and your migration scripts

#### knex-migrator init

- Initializes your database based on your init scripts
- Creates the database if it was not created yet

##### Options

```bash
# Skips a specific migration script
--skip

# Runs only a specific migration script
--only

# Path to MigratorConfig.js
--mgpath
```

#### knex-migrator migrate

- Migrates your database to latest version
- Automatic rollback if an error occurs

##### Options

```bash
# The version you would like to migrate to
--v

# Combo Feature to check whether the database was already initialized
--init

# Force the execution no matter which current version you are on
--force

# Path to MigratorConfig.js
--mgpath
```

#### knex-migrator rollback

- Rolls back your database
- By default, you can only rollback if the database is locked

##### Options

```bash
# Ignores the migration lock
--force

# Version you would like to rollback to
--v
```

#### knex-migrator reset

- Resets your database
- Removes the database

##### Options

```bash
# Ignores the migration lock
--force
```

### Advanced

`DEBUG=knex-migrator:* knex-migrator migrate`


## JS API

### Instantiation

```js
const KnexMigrator = require('knex-migrator');

# Option 1: Pass path to MigratorConfig.js
const knexMigrator = new KnexMigrator({
    knexMigratorFilePath: process.cwd()
});

# Option 2: Pass object with config
const knexMigrator = new KnexMigrator({
    knexMigratorConfig: { ... }
});

```

### Commands

```js
# Health
knexMigrator.isDatabaseOK

# Initialise database
knexMigrator.init

# Migrate database
knexMigrator.migrate

# Rollback database
knexMigrator.rollback

# Reset database
knexMigrator.reset
```

### Examples

```js
knexMigrator.isDatabaseOK()
  .then(function() {
     // database is OK
     // initialization & migrations are not missing
  })
  .catch(function(err) {
      if (err.code === 'DB_NOT_INITIALISED') {
          return knexMigrator.init();
      }

      if (err.code === 'DB_NEEDS_MIGRATION') {
        return knexMigrator.migrate();
      }
  });

```

# Test

- `yarn lint` run just eslint
- `yarn test` run eslint && then tests
- `NODE_ENV=testing-mysql yarn test` to test with MySQL

# Publish

- `yarn ship`

# Copyright & License

Copyright (c) 2013-2022 Ghost Foundation - Released under the [MIT license](LICENSE).






