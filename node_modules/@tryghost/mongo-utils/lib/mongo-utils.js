const _ = require('lodash');

const GROUPS = ['$and', '$or'];

/**
 * Maps over a mongo query, calling `fn` on each non-operator object
 * using the return value as the new query object at that level/layer
 */
const mapQuery = (query, fn) => {
    if (Array.isArray(query)) {
        return query.map(obj => mapQuery(obj, fn))
            // Allow removal of empty children from lists
            .filter(obj => !_.isEmpty(obj));
    }
    return _.reduce(query, (modifiedNQLMongoJSON, value, key) => {
        let mappedObject;
        if (GROUPS.includes(key)) {
            const mappedValue = mapQuery(value, fn);
            // Allow removal of parent with empty children
            mappedObject = _.isEmpty(mappedValue) ? null : {
                [key]: mappedValue
            };
        } else {
            mappedObject = fn(value, key);
        }

        return _.assign({}, modifiedNQLMongoJSON, mappedObject);
    }, {});
};

/**
 * Combines two filters with $and conjunction
 */
const combineFilters = (primary, secondary) => {
    if (_.isEmpty(primary)) {
        return secondary;
    }

    if (_.isEmpty(secondary)) {
        return primary;
    }

    return {
        $and: [primary, secondary]
    };
};

const findStatement = (statements, match) => {
    return _.some(statements, (value, key, obj) => {
        if (key === '$and') {
            return findStatement(obj.$and, match);
        } else if (key === '$or') {
            return findStatement(obj.$or, match);
        } else {
            if ((key !== match) && _.isObject(value)) {
                return findStatement(value, match);
            } else {
                return (key === match);
            }
        }
    });
};

/**
 * ## Reject statements
 *
 * Removes statements keys when matching `func` returns true
 * in the primary filter, e.g.:
 *
 * In NQL results equivalent to:
 * ('featured:true', 'featured:false') => ''
 * ('featured:true', 'featured:false,status:published') => 'status:published'
 */
const rejectStatements = (statements, func) => {
    if (!statements) {
        return statements;
    }

    return mapQuery(statements, function (value, key) {
        if (func(key)) {
            return;
        }
        return {
            [key]: value
        };
    });
};

/**
 * ## Merge Filters
 * Util to combine multiple filters based on the priority how
 * they are passed into the method. For example:
 *      mergeFilter(overrides, custom, defaults);
 * would merge these three filters having overrides on highers priority
 * and defaults on the lowest priority
 */
const mergeFilters = (...filters) => {
    let merged = {};

    filters
        .filter(filter => (!!filter)) // CASE: remove empty arguments if any
        .forEach((filter) => {
            if (filter && Object.keys(filter).length > 0) {
                filter = rejectStatements(filter, (statement) => {
                    return findStatement(merged, statement);
                });

                if (filter) {
                    merged = merged ? combineFilters(merged, filter) : filter;
                }
            }
        });

    return merged;
};

/**
 * ## Expand Filters
 * Util that expands Mongo JSON statements with custom statements
 */
const expandFilters = (statements, expansions) => {
    const expand = (primary, secondary) => {
        // CASE: we don't want to have separate $and groups when expanding
        //       all statements should be withing the same group
        if (secondary.$and) {
            return {$and: [
                primary,
                ...secondary.$and
            ]};
        }

        return {$and: [
            primary,
            secondary
        ]};
    };

    return mapQuery(statements, function (value, key) {
        const expansion = _.find(expansions, {key});

        if (!expansion) {
            return {
                [key]: value
            };
        }

        let replaced = {
            [expansion.replacement]: value
        };

        if (expansion.expansion) {
            return expand(replaced, expansion.expansion);
        }

        return replaced;
    });
};

/**
 * @typedef {object} Mapping
 *
 * @prop {any} from
 * @prop {any} to
 */

/**
 * @typedef {object} KeyValueMapping
 *
 * @prop {Mapping} key
 * @prop {Mapping[]} values
 */

/**
 * Returns the replace value for `input`, or just `input` if there is no replacement
 *
 * @param {any} input
 * @param {Mapping[]} valueMappings
 *
 * @returns {any}
 */
function replaceValue(input, valueMappings) {
    const replacer = valueMappings.find(({from}) => from === input);
    return replacer ? replacer.to : input;
}

/**
 * Returns the result of calling fn on an item or each item in an array
 */
function fmap(item, fn) {
    return Array.isArray(item) ? item.map(fn) : fn(item);
}

/**
 * @typedef {Object} Query
 */

/**
 * Returns a transformer which can be passed into nql
 *
 * @param {KeyValueMapping} mapping
 *
 * @returns {(input: Query) => Query}
 */
function mapKeyValues(mapping) {
    /**
     * @param {Query} input
     */
    return function transformer(input) {
        return mapQuery(input, function (value, key) {
            // Passthrough on anything that doesn't match our mapping
            if (key !== mapping.key.from) {
                return {
                    [key]: value
                };
            }

            // Primitive query of the form "key: value"
            if (typeof value !== 'object') {
                return {
                    [mapping.key.to]: replaceValue(value, mapping.values)
                };
            }

            // Complex query of the form "key: { $in: [value, value] }" or "key: { $ne: value }"
            return {
                [mapping.key.to]: _.reduce(value, (updatedQuery, objValue, objKey) => {
                    // objKey = $in | $ne | etc...
                    // objValue = vallue | [value, value] | etc...
                    return Object.assign(updatedQuery, {
                        [objKey]: fmap(objValue, item => replaceValue(item, mapping.values))
                    });
                }, {})
            };
        });
    };
}

module.exports = {
    mapKeyValues,
    combineFilters,
    findStatement,
    rejectStatements,
    mergeFilters,
    expandFilters,
    mapQuery
};
