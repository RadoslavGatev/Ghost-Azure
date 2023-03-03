# knex-migrator Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.2.6"></a>
# [3.2.6](https://github.com/TryGhost/Ghost-CLI/compare/3.2.5...v3.2.6) (2019-03-20)

### Bug fixes

- 🐛 Fixed `knex-migrator migrate --init` 

<a name="3.2.1"></a>
# [3.2.1](https://github.com/TryGhost/Ghost-CLI/compare/3.2.0...v3.2.1) (2019-03-20)

### Bug fixes

- 🐛 Fixed option collision with commander (`--version` vs `--v`) 

<a name="3.2.0"></a>
# [3.2.0](https://github.com/TryGhost/Ghost-CLI/compare/3.1.8...v3.2.0) (2019-03-20)

### Features

✨ Added ability to rollback to a specific version 


<a name="3.1.6"></a>
# [3.1.6](https://github.com/TryGhost/Ghost-CLI/compare/3.1.5...v3.1.6) (2018-04-30)

### Node
* 🔥Drop Node v4 support

### Bug fixes

* 🐛Fixed incorrect version number comparison
* 🐛Fixed wrong folders order on db initialisation 
* 🐛Fixed comparing expected and actual migration tasks 

<a name="3.1.3"></a>
# [3.1.3](https://github.com/TryGhost/Ghost-CLI/compare/3.1.2...v3.1.3) (2018-01-02)

### Improvements

* Optimised error message for lock
* Added support for specifying the config via options

<a name="3.1.2"></a>
# [3.1.2](https://github.com/TryGhost/Ghost-CLI/compare/3.1.1...v3.1.2) (2017-12-05)

### Improvements

* Make database upgrades more relaxed

<a name="3.1.1"></a>
# [3.1.1](https://github.com/TryGhost/Ghost-CLI/compare/3.1.0...v3.1.1) (2017-12-05)

### Improvements

* Added protection against database migrations

<a name="3.1.0"></a>
# [3.1.0](https://github.com/TryGhost/Ghost-CLI/compare/3.0.10...v3.1.0) (2017-12-05)

### Improvements

* Added more database upgrades
* Added unique constaint to the migrations table
* Define field lengths for migrations table

<a name="3.0.10"></a>
# [3.0.10](https://github.com/TryGhost/Ghost-CLI/compare/3.0.9...v3.0.10) (2017-12-04)

### Fixes

* Fixed `acquired_at` and `released_at` with correct date format

<a name="3.0.9"></a>
# [3.0.9](https://github.com/TryGhost/Ghost-CLI/compare/3.0.8...v3.0.9) (2017-12-04)

### Fixes

* Do not unlock if lock was never acquired

<a name="3.0.8"></a>
# [3.0.8](https://github.com/TryGhost/Ghost-CLI/compare/3.0.7...v3.0.8) (2017-12-04)

### Fixes

* Added more npm keywords
* Rollback should not happen if lock was never acquired

<a name="3.0.7"></a>
# [3.0.7](https://github.com/TryGhost/Ghost-CLI/compare/3.0.6...v3.0.7) (2017-11-15)

### Fixes

* Added missing `--force` flag for `knex-migrator reset`

<a name="3.0.6"></a>
# [3.0.6](https://github.com/TryGhost/Ghost-CLI/compare/3.0.5...v3.0.6) (2017-11-04)

### Fixes

* Do not throw error on reset, otherwise it's harder to handle this via the JS API
* There is no good reason to throw an error, so revert to success response

<a name="3.0.5"></a>
# [3.0.5](https://github.com/TryGhost/Ghost-CLI/compare/3.0.4...v3.0.5) (2017-11-04)

### Fixes

* Fixed order of rollback

<a name="3.0.4"></a>
# [3.0.4](https://github.com/TryGhost/Ghost-CLI/compare/3.0.3...v3.0.4) (2017-11-04)

### Fixes

* Fixed rollback for init scripts

<a name="3.0.3"></a>
# [3.0.3](https://github.com/TryGhost/Ghost-CLI/compare/3.0.2...v3.0.3) (2017-11-04)

### Fixes

* Fixed `--force` flag for `knex-migrator rollback`

<a name="3.0.2"></a>
# [3.0.2](https://github.com/TryGhost/Ghost-CLI/compare/3.0.1...v3.0.2) (2017-11-03)

### Fixes

* Fixed missing throw/catch behaviour,

<a name="3.0.1"></a>
# [3.0.1](https://github.com/TryGhost/Ghost-CLI/compare/3.0.0...v3.0.1) (2017-11-03)

### Fixes

* Fixed binary for `knex-migrator rollback`

<a name="3.0.0"></a>
# [3.0.0](https://github.com/TryGhost/Ghost-CLI/compare/2.1.9...v3.0.0) (2017-11-03)


### Breaking Changes
* You have to export `up` and `down` in your migration scripts. `down` is optional, but highly recommended, otherwise on failure your changes won't rollback completely.
* The `options` object which is passed into the migration script contains now by default a connection object. (`options.connection`). You have to explicit enable transactions, see README.
* A new migrations lock table get's added as soon as you run **any** command. You don't have to worry about that.
* Expect bug fixes in the upcoming days.

### Features

* Support full rollback (auto rollback on error)
* Shutdown hook
* Concurrency and locking
* A new shiny `rollback` command for manual rollback if needed.

<a name="2.1.9"></a>
# [2.1.9](https://github.com/TryGhost/Ghost-CLI/compare/2.1.8...v2.1.9) (2017-10-26)

### Features

* Enabled Node 8 Support

<a name="2.1.8"></a>
# [2.1.9](https://github.com/TryGhost/Ghost-CLI/compare/2.1.7...v2.1.8) (2017-10-24)

### Fixes

* Fixed migration order on db initialisation
