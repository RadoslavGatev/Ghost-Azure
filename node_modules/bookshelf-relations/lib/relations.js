const Promise = require('bluebird');
const _ = require('lodash');
const Detector = require('./detector');
const debug = require('@tryghost/debug')('relations');
const errors = require('../errors');

/**
 * @TODO:
 * - add `forUpdate` lock
 * - add nullable belongsTo FK example
 **/
/**
 * @description Relations class. It handles the update of relations for all types (belongsTo, hasOne, belongsToMany, hasMany)
 */
class Relations {
    constructor(bookshelf, pluginOpts = {}) {
        this.bookshelf = bookshelf;
        this.detector = new Detector(this.bookshelf);
        this.extendChanged = pluginOpts.extendChanged || null;
        this.attachPreviousRelations = pluginOpts.attachPreviousRelations;
    }

    /**
     * @description Entry point to start updating relations.
     * @param {Object} data
     * @param {Object} data.model
     * @param {Object} data.relations
     * @param {Object} [data.pluginOptions]
     * @param {Object} [options]
     * @returns {Promise}
     */
    updateRelations({model, relations, pluginOptions = {}}, options = {}) {
        let opts = _.cloneDeep(options);
        let promises = [];

        // CASE: Figure out which type of relation it is and call the helper, which is responsible for this update.
        Object.keys(relations).forEach((key) => {
            let value = relations[key];
            let relation = (model[key] instanceof Function && (typeof value === 'object' || Array.isArray(value))) ? model[key](model) : null;

            // NOTE: Bookshelf provides us the "type" based on what you configure on your project e.g. `return this.hasMany`.
            let type = relation ? relation.relatedData.type : null;

            if (!type) {
                throw new errors.BookshelfRelationsError({
                    message: 'No relation type.',
                    code: 'UNKNOWN_RELATION',
                    context: {
                        key: key
                    }
                });
            }

            let method = 'set' + type.charAt(0).toUpperCase() + type.slice(1);
            let setter = this[method];

            promises.push(() => {
                debug(key, method);

                return setter.bind(this)({
                    model: model,
                    key: key,
                    value: value,
                    relation: relation,
                    pluginOptions: pluginOptions
                }, opts).catch((err) => {
                    if (errors.utils.isGhostError(err) || (_.isArray(err) && errors.utils.isGhostError(err[0]))) {
                        throw err;
                    }

                    throw new errors.BookshelfRelationsError({
                        message: 'Unable to update nested relation.',
                        code: 'UPDATE_RELATION',
                        err: err,
                        context: {
                            key: key,
                            tableName: model.tableName,
                            method: method
                        }
                    });
                });
            });
        });

        return Promise.each(promises, (promise) => {
            return promise();
        });
    }

    /**
     * @description Update belongs to many relation.
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    setBelongsTo(data, options) {
        debug('setBelongsTo:start');

        let model = data.model;
        let key = data.key;
        let properties = data.value;
        let relation = data.relation;
        let opts = _.cloneDeep(options);
        let Target = relation.relatedData.target;
        let fk = relation.relatedData.foreignKey;
        const pluginOptions = data.pluginOptions;

        // CASE: If there is no foreign key, you have mis-configured your relation via Bookshelf.
        //       The foreign key in this case is the column name in the parent resource.
        if (!fk) {
            throw new errors.BookshelfRelationsError({
                message: 'Foreign Key not found.',
                code: 'UNKNOWN_RELATION',
                help: 'this.hasOne(Target, foreignKey)',
                context: {
                    key: key,
                    tableName: model.tableName
                }
            });
        }

        let targetData = {
            model: model,
            Target: Target,
            fk: {key: 'id', value: model.get(fk)},
            properties: properties,
            key: key,
            saveValue: null,
            pluginOptions: pluginOptions
        };

        // CASE 1: Parent resource gets added, just add the relation and connect.
        // CASE 2: Parent resource gets updated.
        if (opts.method === 'insert') {
            return this.detector.saveTarget(targetData, opts)
                .then(function (result) {
                    // CASE: Set relation id on parent resource.
                    model.set(fk, result.id);

                    // CASE: Remember relations.
                    model.relations[key] = result;

                    debug('setBelongsTo:end');
                    return model;
                });
        } else {
            return this.detector.saveTarget(targetData, opts)
                .then((result) => {
                    if (model.get(fk) === result.id) {
                        return result;
                    }

                    // @TODO: I think it's unnecessary to manually update the relation id, because the parent will get updated anyway.
                    let toSave = model.constructor.forge({id: model.id});
                    opts.method = 'update';
                    toSave.set(fk, result.id);
                    return toSave.save(null, opts)
                        .then(() => {
                            return result;
                        });
                })
                .then((result) => {
                    model.relations[key] = result;

                    debug('setBelongsTo:end');
                    return model;
                });
        }
    }

    /**
     * @description Update "has one" relation.
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    setHasOne(data, options) {
        debug('setHasOne:start');

        let model = data.model;
        let key = data.key;
        let properties = data.value;
        let relation = data.relation;
        let Target = relation.relatedData.target;
        let fk = relation.relatedData.foreignKey;
        let opts = _.cloneDeep(options);
        const pluginOptions = data.pluginOptions;

        // CASE: If there is no foreign key, you have mis-configured your relation via Bookshelf.
        //       The foreign key in this case is the column name in the relation table.
        if (!fk) {
            throw new errors.BookshelfRelationsError({
                message: 'Foreign Key not found.',
                code: 'UNKNOWN_RELATION',
                help: 'this.hasOne(Target, foreignKey)',
                context: {
                    key: key,
                    tableName: model.tableName
                }
            });
        }

        let targetData = {
            Target: Target,
            fk: {key: fk, value: model.id},
            properties: properties,
            saveValue: {[fk]: model.id},
            key: key,
            model: model,
            pluginOptions: pluginOptions
        };

        // CASE: we have a nested relation with properties set, but no ID, check if there is an existing relation before saving
        if (targetData.properties && !_.isEmpty(targetData.properties) && !targetData.properties.id) {
            return this.detector.getExistingTargets({model: model, key: key}, opts)
                .then((existingTargets) => {
                    debug('setHasOne:lookup');
                    if (existingTargets && existingTargets.id) {
                        targetData.properties.id = existingTargets.id;
                    }

                    return this.detector.saveTarget(targetData, opts)
                        .then((result) => {
                            model.relations[key] = result;

                            debug('setHasOne:end');
                            return model;
                        });
                });
        }

        // CASE: we already have the id of the nested relation, go ahead and update it
        // CASE: there are no targetData properties at all, which is used for unsetting fields
        return this.detector.saveTarget(targetData, opts)
            .then((result) => {
                model.relations[key] = result;

                debug('setHasOne:end');
                return model;
            });
    }

    /**
     * @description Handle updating belongs to many relations.
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    setBelongsToMany(data, options) {
        debug('setBelongsToMany:start');

        let model = data.model;
        let key = data.key;
        let newTargets = data.value;
        let pluginOptions = data.pluginOptions;
        let opts = _.cloneDeep(options);
        let existingTargets;
        let targetsToReturn;
        const changed = {};

        // CASE: Get all existing relations of model.
        return this.detector.getExistingTargets({model: model, key: key, pluginOptions: pluginOptions}, opts)
            .then((_existingTargets) => {
                existingTargets = _existingTargets;

                // CASE: Plugin option. You can ask to return previous relations to figure out if relations have changed.
                if (this.attachPreviousRelations) {
                    if (!model._previousRelations) {
                        model._previousRelations = {};
                    }

                    model._previousRelations[key] = _.cloneDeep(existingTargets);
                }

                // CASE: delete all targets (send []), no need to check if targets need to be inserted/updated
                if (!newTargets.length) {
                    return this.bookshelf.Collection.forge([]);
                }

                // CASE: Add relations based on existing & new targets. See detector for more context.
                // NOTE: This will only add the target relation (e.g. insert tags). This won't connect the parent with the relation.
                return this.detector.saveTargets({
                    key: key,
                    existingTargets: existingTargets,
                    newTargets: newTargets,
                    pluginOptions: pluginOptions
                }, opts);
            })
            .then((targets) => {
                // NOTE: final relations
                targetsToReturn = targets;

                // CASE: enforce parent id to complete bookshelf relation data
                existingTargets.relatedData.parentId = model.id;
                existingTargets.relatedData.parentFk = model.id;

                let targetsToAttach = [];
                let targetsToDetach = [];

                // CASE: Figure out which relations we have to attach (we have to connect both tables)
                _.each(targets.models, (target) => {
                    if (!existingTargets.find(model => model.get('id') === target.id)) {
                        targetsToAttach.push(target);
                    }
                });

                return Promise.resolve()
                    .then(function () {
                        if (!targetsToAttach.length) {
                            return;
                        }

                        // NOTE: listen on created target models and allow to hook into the process
                        existingTargets.on('creating', (collection, data) => {
                            if (_.has(pluginOptions, 'hooks.belongsToMany.beforeRelationCreation')) {
                                return pluginOptions.hooks.belongsToMany.beforeRelationCreation(collection, data, opts);
                            }
                        });

                        // CASE: Physically connect the two tables (look up table e.g. posts_tags)
                        return existingTargets.attach(targetsToAttach, _.pick(opts, ['transacting']))
                            .then(function () {
                                if (!changed[key]) {
                                    changed[key] = {
                                        attached: [],
                                        detached: []
                                    };
                                }

                                changed[key].attached = targetsToAttach;

                                existingTargets.off('creating');
                            });
                    })
                    .then(() => {
                        // CASE: Figure out which relations we have to detach
                        _.each(existingTargets.models, (target) => {
                            if (!targets.find(model => model.get('id') === target.id)) {
                                targetsToDetach.push(target);
                            }
                        });

                        if (!targetsToDetach.length) {
                            return;
                        }

                        // NOTE: avoid InnoDB deadlock by detaching model by model (e.g. https://www.percona.com/blog/2012/03/27/innodbs-gap-locks/)
                        return Promise.each(targetsToDetach, (targetToDetach) => {
                            if (!changed[key]) {
                                changed[key] = {
                                    attached: [],
                                    detached: []
                                };
                            }

                            changed[key].detached.push(targetToDetach);

                            return existingTargets.detach(targetToDetach, _.pick(opts, ['transacting']));
                        });
                    }).then(() => {
                        if (_.has(pluginOptions, 'hooks.belongsToMany.after')) {
                            return pluginOptions.hooks.belongsToMany.after(existingTargets, targets, opts);
                        }
                    });
            })
            .then(() => {
                // CASE: Plugin option. You can ask to attach the information what has changed.
                if (this.extendChanged && Object.keys(changed)) {
                    if (!model[this.extendChanged]) {
                        model[this.extendChanged] = {};
                    }

                    Object.keys(changed).forEach((key) => {
                        model[this.extendChanged][key] = changed[key];
                    });
                }

                model.relations[key] = targetsToReturn;

                debug('setBelongsToMany:end');
                return model;
            });
    }

    /**
     * @description Handle "has many" relations.
     * @param {Object} data
     * @param {Object} options
     * @returns {Promise}
     */
    setHasMany(data, options) {
        debug('setHasMany:start');

        let model = data.model;
        let key = data.key;
        let newTargets = data.value;
        let relation = data.relation;
        let opts = _.cloneDeep(options);
        const pluginOptions = data.pluginOptions;
        let fk = relation.relatedData.foreignKey;
        let existingTargets;
        let targets;

        // CASE: If there is no foreign key, you have mis-configured your relation via Bookshelf.
        //       The foreign key in this case is the column name in the relation table.
        if (!fk) {
            throw new errors.BookshelfRelationsError({
                message: 'Foreign Key not found.',
                code: 'UNKNOWN_RELATION',
                help: 'this.hasMany(Target, foreignKey)',
                context: {
                    key: key,
                    tableName: model.tableName
                }
            });
        }

        // NOTE: "newTargets" are the relations to insert/update.
        // CASE: Prepare data and attach foreign key.
        newTargets = newTargets.map((newTarget) => {
            if (!newTarget[fk]) {
                newTarget[fk] = model.id;
            }

            return newTarget;
        });

        // CASE: Get all existing relations of this model.
        return this.detector.getExistingTargets({model: model, key: key}, opts)
            .then((_existingTargets) => {
                existingTargets = _existingTargets;

                // CASE: Save targets based on new & existing targets. See detector for more context.
                return this.detector.saveTargets({
                    key: key,
                    existingTargets: _existingTargets,
                    newTargets: newTargets,
                    pluginOptions: pluginOptions
                }, options);
            })
            .then((_targets) => {
                // NOTE: final relations
                targets = _targets;

                targets.forEach((target) => {
                    existingTargets.add(target);
                });

                // CASE: destroy old relations
                return existingTargets.mapThen((target) => {
                    if (!targets.find(model => model.get('id') === target.id)) {
                        return target.destroy(options);
                    }
                });
            })
            .then(() => {
                model.relations[key] = targets;

                debug('setHasMany:end');
                return model;
            });
    }
}

module.exports = Relations;
