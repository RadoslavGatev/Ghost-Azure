[![build status](https://travis-ci.org/dabroek/node-cache-manager-ioredis.svg?branch=master)](https://travis-ci.org/dabroek/node-cache-manager-ioredis)
[![coverage status](https://coveralls.io/repos/github/dabroek/node-cache-manager-ioredis/badge.svg?branch=master)](https://coveralls.io/github/dabroek/node-cache-manager-ioredis?branch=master)
[![dependencies status](https://david-dm.org/dabroek/node-cache-manager-ioredis/status.svg)](https://david-dm.org/dabroek/node-cache-manager-ioredis)
[![npm version](https://badge.fury.io/js/cache-manager-ioredis.svg)](https://badge.fury.io/js/cache-manager-ioredis)
[![GitHub issues](https://img.shields.io/github/issues/dabroek/node-cache-manager-ioredis.svg)](https://github.com/dabroek/node-cache-manager-ioredis/issues)

IORedis store for node cache manager
==================================

Redis cache store for [node-cache-manager](https://github.com/BryanDonovan/node-cache-manager). 

This package is a almost identical to [node-cache-manager-redis-store](https://github.com/dabroek/node-cache-manager-redis-store), but uses [`ioredis`](https://github.com/luin/ioredis) instead of [`node_redis`](https://github.com/NodeRedis/node_redis). It aims to provide **the most simple wrapper possible** by just passing the configuration to the underlying [`ioredis`](https://github.com/luin/ioredis) package.

Installation
------------

```sh
npm install cache-manager-ioredis --save
```
or
```sh
yarn add cache-manager-ioredis
```

Usage Examples
--------------

See examples below on how to implement the IORedis cache store.

### Single store

```js
var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-ioredis');

var redisCache = cacheManager.caching({
  store: redisStore,
  host: 'localhost', // default value
  port: 6379, // default value
  password: 'XXXXX',
  db: 0,
  ttl: 600
});

// listen for redis connection error event
var redisClient = redisCache.store.getClient();

redisClient.on('error', (error) => {
  // handle error here
  console.log(error);
});

var ttl = 5;

redisCache.set('foo', 'bar', { ttl: ttl }, (err) => {
  if (err) {
    throw err;
  }

  redisCache.get('foo', (err, result) => {
    console.log(result);
    // >> 'bar'
    redisCache.del('foo', (err) => {
    });
  });
});

function getUser(id, cb) {
  setTimeout(() => {
    console.log("Returning user from slow database.");
    cb(null, { id: id, name: 'Bob' });
  }, 100);
}

var userId = 123;
var key = `user_${userId}`;

// Note: ttl is optional in wrap()
redisCache.wrap(key, (cb) => {
  getUser(userId, cb);
}, { ttl: ttl }, (err, user) => {
  console.log(user);

  // Second time fetches user from redisCache
  redisCache
    .wrap(key, () => getUser(userId))
    .then(console.log)
    .catch(err => {
      // handle error
    });
});
```

### Multi-store

```js
var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-ioredis');

var redisCache = cacheManager.caching({ store: redisStore, db: 0, ttl: 600 });
var memoryCache = cacheManager.caching({ store: 'memory', max: 100, ttl: 60 });

var multiCache = cacheManager.multiCaching([memoryCache, redisCache]);

var userId2 = 456;
var key2 = `user_${userId2}`;

// Set value in all caches
multiCache.set('foo2', 'bar2', { ttl: ttl }, (err) => {
  if (err) {
    throw err;
  }

  // Fetches from highest priority cache that has the key
  multiCache.get('foo2', (err, result) => {
    console.log(result);

    // Delete from all caches
    multiCache.del('foo2');
  });
});

// Note: ttl is optional in wrap
multiCache.wrap(key2, (cb) => {
  getUser(userId2, cb);
}, (err, user) => {
  console.log(user);

  // Second time fetches user from memoryCache, since it's highest priority.
  // If the data expires in the memory cache, the next fetch would pull it from
  // the 'someOtherCache', and set the data in memory again.
  multiCache.wrap(key2, (cb) => {
    getUser(userId2, cb);
  }, (err, user) => {
    console.log(user);
  });
});
```

### Use Clustering (eg Amazon elasticache)

```javascript
var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-ioredis');

// https://github.com/luin/ioredis#cluster
var redisCache = cacheManager.caching({
  store: redisStore,
  clusterConfig: {
    nodes: [
      {
        port: 6380,
        host: '127.0.0.1'
      }, 
      {
        port: 6381,
        host: '127.0.0.1'
      }
    ],
    options: {
      maxRedirections: 16
    }
  }
});
```

### Use an external Redis Instance

```javascript
var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-ioredis');
var Redis = require('ioredis');

var redisInstance = new Redis({
  host: 'localhost',
  port: 6379,
  db: 0,
});

var redisCache = cacheManager.caching({
  store: redisStore,
  redisInstance: redisInstance
});
```

Contribution
------------

Want to help improve this package? We take [pull requests](https://github.com/dabroek/node-cache-manager-ioredis/pulls).


License
-------

The `node-cache-manager-ioredis` is licensed under the MIT license.