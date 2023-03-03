const _debug = require('@tryghost/debug')._base;
const debug = _debug('ghost-query');
const _ = require('lodash');

/**
 * @param {import('bookshelf')} Bookshelf
 */
module.exports = function (Bookshelf) {
    const modelProto = Bookshelf.Model.prototype;
    const countQueryBuilder = {
        /**
         * Ideally, these configs should exist on the model and be much more dynamic
         * In reality, there's no point fixing this
         */
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
        labels: {
            members: function addMemberCountToLabels(model) {
                model.query('columns', 'labels.*', function (qb) {
                    qb.count('members.id')
                        .from('members')
                        .leftOuterJoin('members_labels', 'members.id', 'members_labels.member_id')
                        .whereRaw('members_labels.label_id = labels.id')
                        .as('count__members');
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
        },
        /* Speculative */
        channels: {
            posts: function addPostCountToChannels(model, options) {
                model.query('columns', 'channels.*', function (qb) {
                    qb.count('posts.id')
                        .from('posts')
                        .leftOuterJoin('posts_channels', 'posts.id', 'posts_channels.post_id')
                        .whereRaw('posts_channels.channel_id = channels.id')
                        .as('count__posts');

                    if (options.context && options.context.public) {
                        // @TODO use the filter behavior for posts
                        qb.andWhere('posts.type', '=', 'post');
                        qb.andWhere('posts.status', '=', 'published');
                    }
                });
            }
        },
        /* Speculative */
        newsletters: {
            posts: function addPostCountToNewsletters(model, options) {
                model.query('columns', 'newsletters.*', function (qb) {
                    qb.count('posts.id')
                        .from('posts')
                        .leftOuterJoin('posts_newsletters', 'posts.id', 'posts_newsletters.post_id')
                        .whereRaw('posts_newsletters.newsletter_id = newsletters.id')
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

    const Model = Bookshelf.Model.extend({
        addCounts: function (options) {
            if (!options) {
                return;
            }

            const tableName = _.result(this, 'tableName');

            if (options.withRelated && options.withRelated.indexOf('count.posts') > -1) {
                // remove post_count from withRelated
                options.withRelated = _.pull([].concat(options.withRelated), 'count.posts');

                // Call the query builder
                countQueryBuilder[tableName].posts(this, options);
            }
            if (options.withRelated && options.withRelated.indexOf('count.members') > -1) {
                // remove post_count from withRelated
                options.withRelated = _.pull([].concat(options.withRelated), 'count.members');

                // Call the query builder
                countQueryBuilder[tableName].members(this, options);
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
        }
    });

    Bookshelf.Model = Model;
};
