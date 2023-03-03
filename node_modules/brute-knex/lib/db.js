const Knex = require('knex');

module.exports.createConnection = function createConnection(config) {
    const dbValues = Object.assign({}, config);

    if (config.client === 'sqlite3') {
        delete dbValues.connection.host;
        delete dbValues.connection.user;
        delete dbValues.connection.password;
        delete dbValues.connection.database;
        delete dbValues.connection.charset;

        dbValues.useNullAsDefault = true;
    }

    return new Knex(dbValues);
};
