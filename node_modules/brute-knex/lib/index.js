const Promise = require('bluebird')
const AbstractClientStore = require('express-brute/lib/AbstractClientStore');

const KnexStore = module.exports = function (options) {
    options = options || Object.create(null);

    AbstractClientStore.apply(this, arguments);
    this.options = Object.assign(Object.create(null), KnexStore.defaults, options);

    if (this.options.knex) {
        this.knex = this.options.knex;
    } else {
        this.knex = require('knex')(KnexStore.defaultsKnex);
    }

    if (options.createTable === false) {
        this.ready = Promise.resolve();
    } else {
        this.ready = this.knex.schema.hasTable(this.options.tablename)
            .then((exists) => {
                if (exists) {
                    return;
                }

                return this.knex.schema.createTable(this.options.tablename, (table) => {
                    table.string('key');
                    table.bigInteger('firstRequest').nullable();
                    table.bigInteger('lastRequest').nullable();
                    table.bigInteger('lifetime').nullable();
                    table.integer('count');
                });
            });
    }

    this.ready = Promise.resolve(this.ready);
};
KnexStore.prototype = Object.create(AbstractClientStore.prototype);
KnexStore.prototype.set = function (key, value, lifetime, callback) {
    lifetime = lifetime || 0;

    return this.ready.then(() => {
        return this.knex.transaction((trx) => {
            return trx
                .select('*')
                .forUpdate()
                .from(this.options.tablename)
                .where('key', '=', key)
                .then((foundKeys) => {
                    if (foundKeys.length === 0) {
                        return trx.from(this.options.tablename)
                            .insert({
                                key: key,
                                lifetime: new Date(Date.now() + lifetime  * 1000).getTime(),
                                lastRequest: new Date(value.lastRequest).getTime(),
                                firstRequest: new Date(value.firstRequest).getTime(),
                                count: value.count
                            })
                    } else {
                        return trx(this.options.tablename)
                            .where('key', '=', key)
                            .update({
                                lifetime: new Date(Date.now() + lifetime  * 1000).getTime(),
                                count: value.count,
                                lastRequest: new Date(value.lastRequest).getTime()
                            });
                    }
                });
        });
    }).asCallback(callback);
};

KnexStore.prototype.get = function (key, callback) {
    return this.ready.tap(() => {
        return this.clearExpired();
    }).then(() =>{
        return this.knex.select('*')
            .from(this.options.tablename)
            .where('key', '=', key)
    }).then((response) => {
        let o = null;

        if (response[0]) {
            o = {};
            o.lastRequest = new Date(response[0].lastRequest);
            o.firstRequest = new Date(response[0].firstRequest);
            o.count = response[0].count;
        }

        return o;
    }).asCallback(callback);
};
KnexStore.prototype.reset = function (key, callback) {
    return this.ready.then(() => {
        return this.knex(this.options.tablename)
            .where('key', '=', key)
            .del()
    }).asCallback(callback);
};

KnexStore.prototype.increment = function (key, lifetime, callback) {
    return this.get(key).then((result) => {
        if (result) {
            return this.knex(this.options.tablename)
                .increment('count', 1)
                .where('key', '=', key)
        } else {
            return this.knex(this.options.tablename)
                .insert({
                    key: key,
                    firstRequest: new Date().getTime(),
                    lastRequest: new Date().getTime(),
                    lifetime: new Date(Date.now() + lifetime  * 1000).getTime(),
                    count: 1
                })
        }
    }).asCallback(callback);
};

KnexStore.prototype.clearExpired = function (callback) {
    return this.ready.then(() => {
        return this.knex(this.options.tablename)
            .del()
            .where('lifetime', '<', new Date().getTime());
    }).asCallback(callback);
};

KnexStore.defaults = {
    tablename: 'brute',
    createTable: true
};

KnexStore.defaultsKnex = {
    client: 'sqlite3',
    // debug: true,
    connection: {
        filename: './brute-knex.sqlite'
    }
};
