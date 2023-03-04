const _debug = require('@tryghost/debug')._base;
const debug = _debug('ghost-query');
const _ = require('lodash');

/**
 * @param {import('bookshelf')} Bookshelf
 */
module.exports = function (Bookshelf) {
    const modelProto = Bookshelf.Model.prototype;

    const addCounts = function (options) {
        if (!options) {
            return;
        }
        if (!options.withRelated) {
            return;
        }

        // Helper methods
        // withRelated can be an object or an array of strings. We need to support handling both representations.
        // ['user', 'replies']
        // OR
        // [
        //    {'user': function() {} }
        // ]

        function hasWithRelated(key) {
            for (const item of options.withRelated) {
                if (typeof item !== 'string') {
                    if (item[key] !== undefined) {
                        return true;
                    }
                }
                if (item === key) {
                    return true;
                }
            }
            return false;
        }

        function removeWithRelated(key) {
            // VERY IMPORTANT HERE:
            // We need to keep the reference to the withRelated array and not create a new array
            // This is required to make eager relations work correctly (otherwise the updated withRelated won't get passed further)
            const newItems = options.withRelated.filter((item) => {
                if (typeof item === 'string') {
                    return item !== key;
                }
                return item[key] === undefined;
            });
            options.withRelated.splice(0, options.withRelated.length, ...newItems);
        }

        // This can run in both a model or in a collection
        // We need access to the model's (optional) countRelations method.
        let model = this.constructor;
        if (this.model) {
            model = this.model;
        }

        if (model.countRelations) {
            const countRelations = model.countRelations();
            for (const countRelation of Object.keys(countRelations)) {
                if (hasWithRelated('count.' + countRelation)) {
                    // remove post_count from withRelated
                    removeWithRelated('count.' + countRelation);
        
                    // Call the query builder
                    countRelations[countRelation](this, options);
                }
            }
        }
    };

    const Model = Bookshelf.Model.extend({
        addCounts,
        serialize: function serialize(options) {
            const attrs = modelProto.serialize.call(this, options);
            const countRegex = /^(count)(__)(.*)$/;

            _.forOwn(attrs, function (value, key) {
                const match = key.match(countRegex);
                if (match) {
                    attrs[match[1]] = attrs[match[1]] || {};
                    attrs[match[1]][match[3]] = value;
                    delete attrs[key];
                }
            });

            return attrs;
        },

        /**
         * Instead of adding the counts in .fetch and .fetchAll,
         * we need to do it in sync because Bookshelf doesn't call fetch for eagerRelations
         * E.g. when trying to load counts on replies.count.likes, we wouldn't get an opportunity to load the counts on the replies relation.
         */
        sync: function (options) {
            if (!options.method || (options.method !== 'insert' && options.method !== 'update')) {
                this.addCounts.apply(this, arguments);
            }

            if (_debug.enabled('ghost-query')) {
                debug('QUERY', this.query().toQuery());
            }

            // Call parent fetchAll
            return modelProto.sync.apply(this, arguments);
        },

        // Warning: Make sure this method always returns a Bluebird Promise (modelProto.save.apply does, so returning that is fine)
        save: function save() {
            // the count__ variables are not 'permitted' and will get removed after a save
            // so this will make sure they are kept alive after a save (unless they are also still available after the save)

            const savedAttributes = {};
            const countRegex = /^(count)(__)(.*)$/;

            for (const key of Object.keys(this.attributes)) {
                const match = key.match(countRegex);
                if (match) {
                    savedAttributes[key] = this.attributes[key];
                }
            }
            
            return modelProto.save.apply(this, arguments).then((t) => {
                // Set savedAttributes, but keep count__ variables if they stayed inside this.attributes
                if (savedAttributes) {
                    Object.assign(this.attributes, savedAttributes, this.attributes);
                }
                return t;
            });
        }
    });

    Bookshelf.Model = Model;

    const collectionProto = Bookshelf.Collection.prototype;

    const Collection = Bookshelf.Collection.extend({
        addCounts,
        sync: function () {
            // For now, only apply this for eager loaded collections
            this.addCounts.apply(this, arguments);

            if (_debug.enabled('ghost-query')) {
                debug('QUERY', this.query().toQuery());
            }

            // Call parent fetchAll
            return collectionProto.sync.apply(this, arguments);
        }
    });

    Bookshelf.Collection = Collection;
};
