# Changelog

## v2.1.0 - 4 Jul, 2020

Added support for using an external Redis instance using the new `redisInstance` parameter. Special thanks to [@marcoreni](https://github.com/marcoreni)!

## v2.0.0 - 13 Feb, 2020

Removes all Babel related configuration and updates all outdated dependencies. Updating Jest from v20 to v25 revealed that not all tests that asserted a promise rejecting were succeeding as expected. This resulted in the breaking change mentioned below.

### Breaking Changes

- The `set` method now actually checks `isCacheableValue` before setting a value
- Dropped support for Node.js < 6 like the `ioredis` dependency
