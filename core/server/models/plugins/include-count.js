var _debug = require('ghost-ignition').debug._base,
    debug = _debug('ghost-query'),
    _ = require('lodash');

module.exports = function (Bookshelf) {
    var modelProto = Bookshelf.Model.prototype,
        Model,
        countQueryBuilder;

    countQueryBuilder = {
        tags: {
            posts: function addPostCountToTags(model, options) {
                model.query('columns', 'tags.*', function (qb) {
                    qb.count('posts.id')
                        .from('posts')
                        .leftOuterJoin('posts_tags', 'posts.id', 'posts_tags.post_id')
                        .whereRaw('posts_tags.tag_id = tags.id')
                        .as('count__posts');

                    if (options.context && options.context.public) {
                        // @TODO use the filter behavior for posts
                        qb.andWhere('posts.type', '=', 'post');
                        qb.andWhere('posts.status', '=', 'published');
                    }
                });
            }
        },
        users: {
            posts: function addPostCountToUsers(model, options) {
                model.query('columns', 'users.*', function (qb) {
                    qb.count('posts.id')
                        .from('posts')
                        .join('posts_authors', 'posts.id', 'posts_authors.post_id')
                        .whereRaw('posts_authors.author_id = users.id')
                        .as('count__posts');

                    if (options.context && options.context.public) {
                        // @TODO use the filter behavior for posts
                        qb.andWhere('posts.type', '=', 'post');
                        qb.andWhere('posts.status', '=', 'published');
                    }
                });
            }
        }
    };

    Model = Bookshelf.Model.extend({
        addCounts: function (options) {
            if (!options) {
                return;
            }

            var tableName = _.result(this, 'tableName');

            if (options.withRelated && options.withRelated.indexOf('count.posts') > -1) {
                // remove post_count from withRelated
                options.withRelated = _.pull([].concat(options.withRelated), 'count.posts');

                // Call the query builder
                countQueryBuilder[tableName].posts(this, options);
            }
        },
        fetch: function () {
            this.addCounts.apply(this, arguments);

            // Useful when debugging no. database queries, GQL, etc
            // To output this, use DEBUG=ghost:*,ghost-query
            if (_debug.enabled('ghost-query')) {
                debug('QUERY', this.query().toQuery());
            }

            // Call parent fetch
            return modelProto.fetch.apply(this, arguments);
        },
        fetchAll: function () {
            this.addCounts.apply(this, arguments);

            // Useful when debugging no. database queries, GQL, etc
            // To output this, use DEBUG=ghost:*,ghost-query
            if (_debug.enabled('ghost-query')) {
                debug('QUERY', this.query().toQuery());
            }

            // Call parent fetchAll
            return modelProto.fetchAll.apply(this, arguments);
        },

        serialize: function serialize(options) {
            var attrs = modelProto.serialize.call(this, options),
                countRegex = /^(count)(__)(.*)$/;

            _.forOwn(attrs, function (value, key) {
                var match = key.match(countRegex);
                if (match) {
                    attrs[match[1]] = attrs[match[1]] || {};
                    attrs[match[1]][match[3]] = value;
                    delete attrs[key];
                }
            });

            return attrs;
        }
    });

    Bookshelf.Model = Model;
};
