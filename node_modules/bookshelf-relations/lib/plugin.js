const _ = require('lodash');
const Promise = require('bluebird');
const Relations = require('./relations');
const errors = require('../errors');

/**
 * @description Helper function for the plugin.
 * @param {Bookshelf-Model} model
 * @param {Objec†} relations
 */
const remember = (model, relations) => {
    model._relations = relations;
};

/**
 * @description Helper function for the plugin.
 * @param {Bookshelf-Model} model
 */
const unset = (model) => {
    model.relationships.forEach((relation) => {
        model.unset(relation);
    });
};

/**
 * @description Helper function for the plugin.
 * @param {Bookshelf-Model} model
 * @param {Object} options
 */
const getRelations = (model, options = {}) => {
    const defaultRelationshipConfig = {
        destroyRelated: true
    };

    let relations = {};

    // NOTE: `.relationships` must be configured in the project where bookshelf-relations is used. It's an
    //       indicator which relations a resource uses.
    model.relationships.forEach((key) => {
        if (model.get(key) || options.event === 'destroying') {
            const relationshipConfig = Object.assign({}, defaultRelationshipConfig, _.get(model.relationshipConfig, key, {}));
            const value = model.related(key);
            const relation = (model[key] instanceof Function && (typeof value === 'object' || Array.isArray(value))) ? model[key](model) : null;
            const type = relation ? relation.relatedData.type : null;

            if (!type) {
                throw new errors.BookshelfRelationsError({
                    message: 'No relation found.',
                    code: 'UNKNOWN_RELATION',
                    context: {
                        key: key,
                        tableName: model.tableName
                    }
                });
            }

            if (!relations[type]) {
                relations[type] = {};
            }

            if (options.event === 'destroying') {
                // keep related records if configured to do so
                if (relationshipConfig.destroyRelated === false) {
                    return;
                }

                if (['belongsToMany', 'hasMany'].indexOf(type) !== -1) {
                    relations[type][key] = [];
                } else {
                    relations[type][key] = {};
                }
            } else {
                relations[type][key] = model.get(key);
            }
        }
    });

    return relations;
};

/**
 * @description This plugin is the entry point to register bookshelf-relations as plugin for Bookshelf projects.
 *
 * `ghostBookshelf.plugin('bookshelf-relations', {})` will call this function.
 * The plugin options are described in the README.md
 *
 * The plugin will auto hook into your model layer and take care of handling relation updates.
 *
 * @param {Bookshelf} bookshelf
 * @param {Object} pluginOptions
 */
module.exports = function relationsPlugin(bookshelf, pluginOptions) {
    let pluginOpts = _.merge({
        unsetRelations: true,
        autoHook: true
    }, pluginOptions);

    /**
     * @NOTE: Assigned to Bookshelf to being able to manually use bookshelf-relations.
     *        It could be that that plugin does not work for your project.
     *
     * @TODO: Reconsider the name, it's very general and "unfair" for other plugins.
     */
    if (!bookshelf.manager) {
        bookshelf.manager = new Relations(bookshelf, pluginOpts);
    }

    const ParentModel = bookshelf.Model;

    // CASE: disable plugin, use manually
    if (!pluginOpts.autoHook) {
        return;
    }

    let Model = bookshelf.Model.extend({
        /**
         * @description We override `triggerThen` of the Bookshelf implementation.
         *
         * This code depends on Bookshelf's code. If they rename this function or remove it, it won't work
         * anymore.
         *
         * `triggerThen` is used in Bookshelf to trigger model events.
         * @see https://github.com/bookshelf/bookshelf/blob/0.14.2/lib/base/events.js#L97
         *
         * The challenge of this plugin is to interfere in the right moment, because creating/updating/deleting
         * relations is complex. It's quite hard to find a solution which satisfies all use cases.
         * See code comments for reasons.
         *
         * @see https://github.com/TryGhost/bookshelf-relations/commit/a03ebb30b826a527a346fe9c58726848e94c8842
         *      Before this approach we've tried using model events to handle relations, but that did not work perfectly.
         *      The link explains it.
         *
         * @param event
         * @param model
         * @param attrs
         * @param options
         * @returns {*}
         */
        triggerThen: function triggerThen(event, model, attrs, options) {
            // CASE: deleted
            if (!options) {
                options = attrs;
            }

            const ops = [];
            let saveResponse;
            const self = this;

            // CASE: model does not use bookshelf-relations
            if (!model.relationships) {
                return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options);
            }

            // @NOTE: We are only interested in these events.
            if (!['saving creating', 'saving updating', 'destroying', 'created saved'].includes(event)) {
                return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options);
            }

            // CASE: Bookshelf triggers "saving creating" event, we catch the event here and prepare updating relations.
            if (event === 'saving creating') {
                // CASE: Trigger actual Bookshelf model events first. This is very important, otherwise we will
                //       break model events.
                ops.push(function triggerThen() {
                    return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options)
                        .then((resp) => {
                            saveResponse = resp;
                            return resp;
                        });
                });

                // CASE: update relations before saving the parent resource.
                ops.push(function updateRelations() {
                    const relations = getRelations(model, {event: event});

                    // CASE: e.g. incorrect configuration
                    if (!Object.keys(relations).length) {
                        return Promise.resolve();
                    }

                    /**
                     * @NOTE:
                     * We have to remember the relations if we unset them on the model.
                     * If we unset the relations on the Bookshelf model, Bookshelf won't interpret them
                     * as columns. But if we remember the relations, we can use them to perform extra queries
                     * after the parent resource was saved. See "created saved" event.
                     *
                     * e.g. postModel.set('tags', [..]) -> is not a column, it's a feature of bookshelf-relations to
                     *      being able to add/update relations easily
                     */
                    remember(model, relations);

                    // @NOTE: we have to reset otherwise the database query will contain relation names
                    //        e.g. ..WHERE tags.slug = 'test' (=> "tags" is a relation and not a column)
                    unset(model);

                    /**
                     * CASE:
                     *
                     * For a `belongsTo` relation, we first need to add the relation before we insert the parent resource,
                     * because the parent resource has a reference to the relation in the database e.g. `post.author_id`.
                     */
                    if (relations.belongsTo) {
                        return bookshelf.manager.updateRelations({
                            model: model,
                            relations: model._relations.belongsTo,
                            pluginOptions: pluginOpts
                        }, options).then((response) => {
                            delete model._relations.belongsTo;
                            return response;
                        });
                    }

                    return Promise.resolve();
                });

                return Promise.reduce(ops, (results, task) => {
                    return task().then((response) => {
                        results.push(response);
                        return results;
                    });
                }, []).then(() => {
                    return saveResponse;
                });
            }

            /**
             * CASE:
             *
             * Bookshelf triggers "created saved" event, we catch the event here and perform updating relations.
             * At this point the parent resource was saved already, but the transaction is still "open" and not committed yet.
             * When a parent get's inserted, we have to update relations after the parent resource was saved, because
             * we need the `id` to connect the relation.
             */
            if (event === 'created saved') {
                /**
                 * CASE:
                 *
                 * Update relations before we trigger the actual bookshelf model event.
                 * We want to give the "created saved" subscribers the chance to get the information
                 * which relations where adding/updated.
                 * That means the "saved" event is called in Ghost, when the parent and it's relations where physically saved.
                 *
                 * e.g. in Ghost
                 * `.on('saved', (model) => {
                 *     model.relations -> contains the information which relations where added/updated/removed
                 * })
                 */
                ops.push(function updateRelations() {
                    // @NOTE: remembered from "saving creating" event!
                    const relations = model._relations;

                    // CASE: resource has no relations
                    if (!relations || Object.keys(relations).length === 0) {
                        return Promise.resolve();
                    }

                    // CASE: e.g. incorrect configuration
                    if (!Object.keys(relations).length) {
                        return Promise.resolve();
                    }

                    return Promise.each(Object.keys(relations), (key) => {
                        return bookshelf.manager.updateRelations({
                            model: model,
                            relations: relations[key],
                            pluginOptions: pluginOpts
                        }, options);
                    });
                });

                // CASE: ..and now trigger the actual model event.
                ops.push(function triggerThen() {
                    return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options)
                        .then((resp) => {
                            saveResponse = resp;
                            return resp;
                        });
                });

                return Promise.reduce(ops, (results, task) => {
                    return task().then((response) => {
                        results.push(response);
                        return results;
                    });
                }, []).then(() => {
                    return saveResponse;
                });
            }

            /**
             * CASE:
             *
             * Bookshelf triggers "saving updating" event, we catch the event here and perform updating relations.
             * At this point the parent resource exists already in the database, we already have access to the `id`.
             * We can update relations part of this event.
             */
            if (event === 'saving updating') {
                // CASE: Trigger the event first.
                ops.push(function triggerThen() {
                    return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options)
                        .then((resp) => {
                            saveResponse = resp;
                            return resp;
                        });
                });

                // CASE: Update relations.
                ops.push(function updateRelations() {
                    const relations = getRelations(model, {event: event});

                    unset(model);

                    // CASE: e.g. incorrect configuration
                    if (!Object.keys(relations).length) {
                        return Promise.resolve();
                    }

                    return Promise.each(Object.keys(relations), (key) => {
                        return bookshelf.manager.updateRelations({
                            model: model,
                            relations: relations[key],
                            pluginOptions: pluginOpts
                        }, options);
                    });
                });

                return Promise.reduce(ops, (results, task) => {
                    return task().then((response) => {
                        results.push(response);
                        return results;
                    });
                }, []).then(() => {
                    return saveResponse;
                });
            }

            /**
             * CASE:
             *
             * Bookshelf triggers "destroying" event, we catch the event here and perform updating relations.
             * We have to update relations before the resource get's destroyed, otherwise we
             * loose all it's data (including the `id`).
             *
             * Bookshelf relations will automatically destroy relations if you destroy the parent unless
             * explicitly configured not to destroy related for the particular relationship
             */
            if (event === 'destroying') {
                // CASE: Trigger bookshelf event.
                ops.push(function triggerThen() {
                    return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options)
                        .then((resp) => {
                            saveResponse = resp;
                            return resp;
                        });
                });

                // CASE: Update relations -> destroy relations.
                ops.push(function destroyRelations() {
                    // NOTE: This function will set e.g. `tags = []` to auto destroy relations.
                    const relations = getRelations(model, {event: event});

                    unset(model);

                    // CASE: e.g. incorrect configuration
                    if (!Object.keys(relations).length) {
                        return Promise.resolve();
                    }

                    return Promise.each(Object.keys(relations), (key) => {
                        return bookshelf.manager.updateRelations({
                            model: model,
                            relations: relations[key],
                            pluginOptions: pluginOpts
                        }, options);
                    });
                });

                return Promise.reduce(ops, (results, task) => {
                    return task().then((response) => {
                        results.push(response);
                        return results;
                    });
                }, []).then(() => {
                    return saveResponse;
                });
            }

            return ParentModel.prototype.triggerThen.call(self, event, model, attrs, options);
        }
    });

    bookshelf.Model = Model;
};
