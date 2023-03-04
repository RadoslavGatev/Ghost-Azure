const Promise = require('bluebird');
const _ = require('lodash');
const errors = require('../errors');

/**
 * @description The detector class is responsible to physically update relations.
 */
class Detector {
    constructor(bookshelf) {
        this.bookshelf = bookshelf;
    }

    /**
     * @description A helper function to figure out if a relation needs an update or an insert.
     *
     * Bookshelf-relations is able to update relations. If you attach a relation, Bookshelf-relation will
     * figure out if this relation exist already in the database and if so, it will update the relation.
     *
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    saveTarget(data, options) {
        let model = data.model;
        let key = data.key;
        const Target = data.Target;
        let properties = data.properties;
        let target = Target.forge(_.pick(properties, 'id'));
        let fk = data.fk;
        let saveValue = data.saveValue;
        const pluginOptions = data.pluginOptions;
        const allowedOptions = pluginOptions.allowedOptions || [];
        let existingRelation = model.related(key);
        let opts = _.cloneDeep(options);

        return new Promise((resolve, reject) => {
            // CASE: Destroy relation
            if (!Object.keys(properties).length) {
                return resolve(target);
            }

            // CASE: Relation has no id -> must be insert
            if (!target.id) {
                opts.method = 'insert';
                return resolve(target);
            }

            // CASE: If you fetch your model before insert/update using "withRelated", we already have the latest
            //       relations available. No need to fetch again.
            if (Object.prototype.hasOwnProperty.call(opts, 'withRelated') &&
                opts.withRelated.indexOf(key) !== -1 &&
                existingRelation && existingRelation.id &&
                properties.id === existingRelation.id) {
                opts.method = 'update';
                return resolve(existingRelation);
            }

            // CASE: Fetch existing relation
            target.fetch(_.pick(opts, ['transacting']))
                .then((result) => {
                    if (!result) {
                        let targetToInsert = Target.forge();
                        opts.method = 'insert';
                        return resolve(targetToInsert);
                    }

                    opts.method = 'update';
                    return resolve(result);
                })
                .catch(reject);
        }).then((result) => {
            // CASE: Logic is only for  "hasOne" relations. Delete relation.
            if (!Object.keys(properties).length) {
                // CASE: Cannot delete, something is wrong with the data
                if (!fk.value) {
                    return result;
                }

                return result
                    .where(fk.key, fk.value)
                    .destroy(_.pick(opts, ['transacting'].concat(allowedOptions)))
                    .catch((err) => {
                        // CASE: There was no relation(s) to delete
                        if (err instanceof this.bookshelf.NoRowsDeletedError) {
                            // ignore e.g. unbinding errors
                            return Promise.resolve();
                        }

                        throw err;
                    });
            }

            // CASE: Set all properties on the target model.
            _.each(_.omit(properties, 'id'), (value, key) => {
                result.set(key, value);
            });

            // CASE: We found a matching target, but nothing has changed.
            if (result.id && !result.hasChanged()) {
                return result;
            }

            // CASE: Actual insert or update of the target relation table.
            return result.save(saveValue, _.pick(opts, ['transacting', 'method'].concat(allowedOptions)))
                .then((result) => {
                    return result;
                });
        });
    }

    /**
     * @description Helper function to fetch existing targets/relations.
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    getExistingTargets(data, options) {
        let opts = _.cloneDeep(options);
        let model = data.model;
        let key = data.key;
        let existingRelations = model.related(key);
        const pluginOptions = data.pluginOptions || {};
        const allowedOptions = pluginOptions.allowedOptions || [];

        return new Promise((resolve, reject) => {
            // @TODO: I think this is wrong, because you can in theory add a parent resource with existing relations.
            if (opts.method === 'insert') {
                return resolve(existingRelations);
            }

            // CASE: Smart condition to figure out if you have fetched your parent resource with "withRelated".
            if (Object.prototype.hasOwnProperty.call(opts, 'withRelated') && opts.withRelated.indexOf(key) !== -1) {
                return resolve(existingRelations);
            }

            return existingRelations.fetch(_.pick(opts, ['transacting', 'method'].concat(allowedOptions)))
                .then((existingRelations) => {
                    resolve(existingRelations);
                })
                .catch(reject);
        });
    }

    /**
     * @description Helper function to detect existing relations based on passed properties.
     *
     * If you don't pass the id of a relation, we should try to match an existing relation.
     *
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    getMatchingTarget(data, options) {
        let opts = _.cloneDeep(options);
        let originalProperties = _.cloneDeep(data.properties);
        let properties = data.properties;
        let Target = data.Target;
        let existingTargets = data.existingTargets;
        let foreignKeyLookup = false;

        // CASE: You want to add a relation by foreign key
        // e.g. `post.tags = [{tag_id: 1}]`
        // We have to prepare the look up, because `tag_id` is not a column name of the target relation table.
        // Context: https://github.com/TryGhost/bookshelf-relations/commit/b87fcf7735797257b8b0e70efb38e37017a7cac0
        if (existingTargets && existingTargets.relatedData.type === 'belongsToMany') {
            if (Object.prototype.hasOwnProperty.call(properties, existingTargets.relatedData.otherKey)) {
                if (!Object.prototype.hasOwnProperty.call(properties, 'id')) {
                    properties.id = properties[existingTargets.relatedData.otherKey];
                }

                delete properties[existingTargets.relatedData.otherKey];
                foreignKeyLookup = true;
            }

            if (existingTargets && Object.prototype.hasOwnProperty.call(properties, existingTargets.relatedData.foreignKey)) {
                if (!Object.prototype.hasOwnProperty.call(properties, 'id')) {
                    properties.id = properties[existingTargets.relatedData.foreignKey];
                }

                delete properties[existingTargets.relatedData.foreignKey];
                foreignKeyLookup = true;
            }
        }

        // @TODO: Match target only by unique properties.
        return Target
            .forge(properties)
            .fetch(_.pick(opts, ['transacting']))
            .then((matching) => {
                if (foreignKeyLookup && !matching) {
                    throw new errors.BookshelfRelationsError({
                        message: 'Cannot find matching target by foreign key.',
                        context: JSON.stringify(originalProperties)
                    });
                }

                return matching;
            })
            .catch((err) => {
                if (err instanceof errors.BookshelfRelationsError) {
                    throw err;
                }

                // ignore e.g. unbinding errors
                return Promise.resolve();
            });
    }

    /**
     * @description Helper to save relations.
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    saveTargets(data, options) {
        let opts = _.cloneDeep(options);
        let existingTargets = data.existingTargets;
        let Target = existingTargets.model;
        let key = data.key;
        let newTargets = data.newTargets || [];
        const pluginOptions = data.pluginOptions;
        const allowedOptions = pluginOptions.allowedOptions || [];
        let results = [];

        return Promise.each(newTargets, (properties) => {
            if (_.isEmpty(properties)) {
                return Promise.resolve();
            }

            let existingTarget = existingTargets.find(model => model.get('id') === properties.id);
            let model = Target.forge(_.pick(properties, 'id'));

            return new Promise((resolve, reject) => {
                // CASE: Relation has no id, try to match it.
                if (!model.id) {
                    return this.getMatchingTarget({
                        Target: Target,
                        properties: properties,
                        existingTargets: existingTargets
                    }, opts).then((matchingTarget) => {
                        // CASE: No matching relation found, assume it's new
                        if (!matchingTarget) {
                            opts.method = 'insert';
                            return resolve(model);
                        }

                        opts.method = 'update';
                        return resolve(matchingTarget);
                    }).catch(reject);
                }

                // CASE: smart condition to avoid re-fetching the existing relations.
                if (Object.prototype.hasOwnProperty.call(opts, 'withRelated') && opts.withRelated.indexOf(key) !== -1 && existingTarget && existingTarget.id) {
                    opts.method = 'update';
                    return resolve(existingTarget);
                }

                model.fetch(_.pick(opts, ['transacting']))
                    .then((result) => {
                        if (!result) {
                            let targetToCreate = Target.forge();
                            opts.method = 'insert';
                            return resolve(targetToCreate);
                        }

                        opts.method = 'update';
                        resolve(result);
                    })
                    .catch(reject);
            }).then((result) => {
                // CASE: we have to use the result from the db and add the new properties to the relation!
                _.each(_.omit(properties, 'id'), (value, key) => {
                    result.set(key, value);
                });

                // CASE: We found a matching target, but nothing has changed.
                if (result.id && !result.hasChanged()) {
                    results.push(result);
                    return;
                }

                return result.save(null, _.pick(opts, ['transacting', 'method'].concat(allowedOptions)))
                    .then((result) => {
                        results.push(result);
                    });
            });
        }).then(() => {
            return this.bookshelf.Collection.forge(results);
        });
    }
}

module.exports = Detector;
