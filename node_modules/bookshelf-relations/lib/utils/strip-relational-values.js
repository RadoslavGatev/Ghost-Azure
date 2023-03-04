const debug = require('@tryghost/debug')('relations');

const stripNonRelationalValues = (obj) => {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Object.keys(obj).filter(k => (k !== 'id')).length) {
        debug('Stripping relation from extra keys: ', Object.keys(obj).filter(k => (k !== 'id')));
    }

    return obj?.id ? {id: obj.id} : {};
};

const stripValues = (obj) => {
    return Array.isArray(obj) ? obj.map(stripNonRelationalValues) : stripNonRelationalValues(obj);
};

module.exports = stripValues;
