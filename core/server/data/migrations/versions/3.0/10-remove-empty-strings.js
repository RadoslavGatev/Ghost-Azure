const Promise = require('bluebird');
const common = require('../../../../lib/common');
const schema = require('../../../schema');

/*
 * [{
 *   tableName: 'posts',
 *   columns: ['custom_excerpt', 'description', 'etc...']
 * }]
 * */
const tablesToUpdate = Object.keys(schema.tables).reduce((tablesToUpdate, tableName) => {
    const table = schema.tables[tableName];
    const columns = Object.keys(table).filter((columnName) => {
        const column = table[columnName];
        return column.nullable && ['string', 'text'].includes(column.type);
    });
    if (!columns.length) {
        return tablesToUpdate;
    }
    return tablesToUpdate.concat({
        tableName,
        columns
    });
}, []);

const createReplace = (connection, from, to) => (tableName, columnName) => {
    return connection.schema.hasTable(tableName)
        .then((tableExists) => {
            if (!tableExists) {
                common.logging.warn(
                    `Table ${tableName} does not exist`
                );
                return;
            }
            return connection.schema.hasColumn(tableName, columnName)
                .then((columnExists) => {
                    if (!columnExists) {
                        common.logging.warn(
                            `Table '${tableName}' does not have column '${columnName}'`
                        );
                        return;
                    }

                    common.logging.info(
                        `Updating ${tableName}, setting '${from}' in ${columnName} to '${to}'`
                    );

                    return connection(tableName)
                        .where(columnName, from)
                        .update(columnName, to);
                });
        });
};

module.exports.up = ({transacting}) => {
    const replaceEmptyStringWithNull = createReplace(transacting, '', null);

    return Promise.all(
        tablesToUpdate.map(({tableName, columns}) => Promise.all(
            columns.map(
                columnName => replaceEmptyStringWithNull(tableName, columnName)
            )
        ))
    );
};

module.exports.down = ({transacting}) => {
    const replaceNullWithEmptyString = createReplace(transacting, null, '');

    return Promise.all(
        tablesToUpdate.map(({tableName, columns}) => Promise.all(
            columns.map(
                columnName => replaceNullWithEmptyString(tableName, columnName)
            )
        ))
    );
};

module.exports.config = {
    transaction: true
};
