// # Post Model
const _ = require('lodash');
const uuid = require('uuid');
const moment = require('moment');
const Promise = require('bluebird');
const sequence = require('../lib/promise/sequence');
const common = require('../lib/common');
const htmlToText = require('html-to-text');
const ghostBookshelf = require('./base');
const config = require('../config');
const settingsCache = require('../services/settings/cache');
const converters = require('../lib/mobiledoc/converters');
const relations = require('./relations');
const urlUtils = require('../lib/url-utils');
const MOBILEDOC_REVISIONS_COUNT = 10;
const ALL_STATUSES = ['published', 'draft', 'scheduled'];

let Post;
let Posts;

Post = ghostBookshelf.Model.extend({

    tableName: 'posts',

    /**
     * @NOTE
     *
     * We define the defaults on the schema (db) and model level.
     *
     * Why?
     *   - when you insert a resource, Knex does only return the id of the created resource
     *     - see https://knexjs.org/#Builder-insert
     *   - that means `defaultTo` is a pure database configuration (!)
     *   - Bookshelf just returns the model values which you have asked Bookshelf to insert
     *      - it can't return the `defaultTo` value from the schema/db level
     *      - but the db defaults defined in the schema are saved in the database correctly
     *   - `models.Post.add` always does to operations:
     *      1. add
     *      2. fetch (this ensures we fetch the whole resource from the database)
     *   - that means we have to apply the defaults on the model layer to ensure a complete field set
     *      1. any connected logic in our model hooks e.g. beforeSave
     *      2. model events e.g. "post.published" are using the inserted resource, not the fetched resource
     */
    defaults: function defaults() {
        let visibility = 'public';

        if (settingsCache.get('labs') && (settingsCache.get('labs').members === true) && settingsCache.get('default_content_visibility')) {
            visibility = settingsCache.get('default_content_visibility');
        }

        return {
            send_email_when_published: false,
            uuid: uuid.v4(),
            status: 'draft',
            featured: false,
            type: 'post',
            visibility: visibility
        };
    },

    relationships: ['tags', 'authors', 'mobiledoc_revisions', 'posts_meta'],

    // NOTE: look up object, not super nice, but was easy to implement
    relationshipBelongsTo: {
        tags: 'tags',
        authors: 'users',
        posts_meta: 'posts_meta'
    },

    /**
     * The base model keeps only the columns, which are defined in the schema.
     * We have to add the relations on top, otherwise bookshelf-relations
     * has no access to the nested relations, which should be updated.
     */
    permittedAttributes: function permittedAttributes() {
        let filteredKeys = ghostBookshelf.Model.prototype.permittedAttributes.apply(this, arguments);

        this.relationships.forEach((key) => {
            filteredKeys.push(key);
        });

        return filteredKeys;
    },

    emitChange: function emitChange(event, options = {}) {
        let eventToTrigger;
        let resourceType = this.get('type');

        if (options.usePreviousAttribute) {
            resourceType = this.previous('type');
        }

        eventToTrigger = resourceType + '.' + event;

        ghostBookshelf.Model.prototype.emitChange.bind(this)(this, eventToTrigger, options);
    },

    /**
     * We update the tags after the Post was inserted.
     * We update the tags before the Post was updated, see `onSaving` event.
     * `onCreated` is called before `onSaved`.
     *
     * `onSaved` is the last event in the line - triggered for updating or inserting data.
     * bookshelf-relations listens on `created` + `updated`.
     * We ensure that we are catching the event after bookshelf relations.
     */
    onSaved: function onSaved(model, response, options) {
        ghostBookshelf.Model.prototype.onSaved.apply(this, arguments);

        if (options.method !== 'insert') {
            return;
        }

        var status = model.get('status');

        model.emitChange('added', options);

        if (['published', 'scheduled'].indexOf(status) !== -1) {
            model.emitChange(status, options);
        }
    },

    onUpdated: function onUpdated(model, attrs, options) {
        ghostBookshelf.Model.prototype.onUpdated.apply(this, arguments);

        model.statusChanging = model.get('status') !== model.previous('status');
        model.isPublished = model.get('status') === 'published';
        model.isScheduled = model.get('status') === 'scheduled';
        model.wasPublished = model.previous('status') === 'published';
        model.wasScheduled = model.previous('status') === 'scheduled';
        model.resourceTypeChanging = model.get('type') !== model.previous('type');
        model.publishedAtHasChanged = model.hasDateChanged('published_at');
        model.needsReschedule = model.publishedAtHasChanged && model.isScheduled;

        // Handle added and deleted for post -> page or page -> post
        if (model.resourceTypeChanging) {
            if (model.wasPublished) {
                model.emitChange('unpublished', Object.assign({usePreviousAttribute: true}, options));
            }

            if (model.wasScheduled) {
                model.emitChange('unscheduled', Object.assign({usePreviousAttribute: true}, options));
            }

            model.emitChange('deleted', Object.assign({usePreviousAttribute: true}, options));
            model.emitChange('added', options);

            if (model.isPublished) {
                model.emitChange('published', options);
            }

            if (model.isScheduled) {
                model.emitChange('scheduled', options);
            }
        } else {
            if (model.statusChanging) {
                // CASE: was published before and is now e.q. draft or scheduled
                if (model.wasPublished) {
                    model.emitChange('unpublished', options);
                }

                // CASE: was draft or scheduled before and is now e.q. published
                if (model.isPublished) {
                    model.emitChange('published', options);
                }

                // CASE: was draft or published before and is now e.q. scheduled
                if (model.isScheduled) {
                    model.emitChange('scheduled', options);
                }

                // CASE: from scheduled to something
                if (model.wasScheduled && !model.isScheduled && !model.isPublished) {
                    model.emitChange('unscheduled', options);
                }
            } else {
                if (model.isPublished) {
                    model.emitChange('published.edited', options);
                }

                if (model.needsReschedule) {
                    model.emitChange('rescheduled', options);
                }
            }

            // Fire edited if this wasn't a change between resourceType
            model.emitChange('edited', options);
        }

        if (model.statusChanging && (model.isPublished || model.wasPublished)) {
            this.handleStatusForAttachedModels(model, options);
        }
    },

    onDestroyed: function onDestroyed(model, options) {
        ghostBookshelf.Model.prototype.onDestroyed.apply(this, arguments);

        if (model.previous('status') === 'published') {
            model.emitChange('unpublished', Object.assign({usePreviousAttribute: true}, options));
        }

        model.emitChange('deleted', Object.assign({usePreviousAttribute: true}, options));
    },

    onDestroying: function onDestroyed(model) {
        ghostBookshelf.Model.prototype.onDestroying.apply(this, arguments);

        this.handleAttachedModels(model);
    },

    handleAttachedModels: function handleAttachedModels(model) {
        /**
         * @NOTE:
         * Bookshelf only exposes the object that is being detached on `detaching`.
         * For the reason above, `detached` handler is using the scope of `detaching`
         * to access the models that are not present in `detached`.
         */
        model.related('tags').once('detaching', function onDetached(collection, tag) {
            model.related('tags').once('detached', function onDetached(detachedCollection, response, options) {
                tag.emitChange('detached', options);
                model.emitChange('tag.detached', options);
            });
        });

        model.related('tags').once('attaching', function onDetached(collection, tags) {
            model.related('tags').once('attached', function onDetached(detachedCollection, response, options) {
                tags.forEach((tag) => {
                    tag.emitChange('attached', options);
                    model.emitChange('tag.attached', options);
                });
            });
        });

        model.related('authors').once('detaching', function onDetached(collection, author) {
            model.related('authors').once('detached', function onDetached(detachedCollection, response, options) {
                author.emitChange('detached', options);
            });
        });

        model.related('authors').once('attaching', function onDetached(collection, authors) {
            model.related('authors').once('attached', function onDetached(detachedCollection, response, options) {
                authors.forEach(author => author.emitChange('attached', options));
            });
        });
    },

    /**
     * @NOTE:
     * when status is changed from or to 'published' all related authors and tags
     * have to trigger recalculation in URL service because status is applied in filters for
     * these models
     */
    handleStatusForAttachedModels: function handleStatusForAttachedModels(model, options) {
        model.related('tags').forEach((tag) => {
            tag.emitChange('attached', options);
        });

        model.related('authors').forEach((author) => {
            author.emitChange('attached', options);
        });
    },

    onSaving: function onSaving(model, attr, options) {
        options = options || {};

        var self = this,
            title,
            i,
            // Variables to make the slug checking more readable
            newTitle = this.get('title'),
            newStatus = this.get('status'),
            olderStatus = this.previous('status'),
            prevTitle = this.previous('title'),
            prevSlug = this.previous('slug'),
            publishedAt = this.get('published_at'),
            publishedAtHasChanged = this.hasDateChanged('published_at', {beforeWrite: true}),
            generatedFields = ['html', 'plaintext'],
            tagsToSave,
            ops = [];

        // CASE: disallow published -> scheduled
        // @TODO: remove when we have versioning based on updated_at
        if (newStatus !== olderStatus && newStatus === 'scheduled' && olderStatus === 'published') {
            return Promise.reject(new common.errors.ValidationError({
                message: common.i18n.t('errors.models.post.isAlreadyPublished', {key: 'status'})
            }));
        }

        if (options.method === 'insert') {
            if (!this.get('comment_id')) {
                this.set('comment_id', this.id);
            }
        }

        // CASE: both page and post can get scheduled
        if (newStatus === 'scheduled') {
            if (!publishedAt) {
                return Promise.reject(new common.errors.ValidationError({
                    message: common.i18n.t('errors.models.post.valueCannotBeBlank', {key: 'published_at'})
                }));
            } else if (!moment(publishedAt).isValid()) {
                return Promise.reject(new common.errors.ValidationError({
                    message: common.i18n.t('errors.models.post.valueCannotBeBlank', {key: 'published_at'})
                }));
                // CASE: to schedule/reschedule a post, a minimum diff of x minutes is needed (default configured is 2minutes)
            } else if (
                publishedAtHasChanged &&
                moment(publishedAt).isBefore(moment().add(config.get('times').cannotScheduleAPostBeforeInMinutes, 'minutes')) &&
                !options.importing &&
                (!options.context || !options.context.internal)
            ) {
                return Promise.reject(new common.errors.ValidationError({
                    message: common.i18n.t('errors.models.post.expectedPublishedAtInFuture', {
                        cannotScheduleAPostBeforeInMinutes: config.get('times').cannotScheduleAPostBeforeInMinutes
                    })
                }));
            }
        }

        // CASE: detect lowercase/uppercase tag slugs
        if (!_.isUndefined(this.get('tags')) && !_.isNull(this.get('tags'))) {
            tagsToSave = [];

            //  and deduplicate upper/lowercase tags
            _.each(this.get('tags'), function each(item) {
                for (i = 0; i < tagsToSave.length; i = i + 1) {
                    if (tagsToSave[i].name && item.name && tagsToSave[i].name.toLocaleLowerCase() === item.name.toLocaleLowerCase()) {
                        return;
                    }
                }

                tagsToSave.push(item);
            });

            this.set('tags', tagsToSave);
        }

        /**
         * CASE: Attach id to update existing posts_meta entry for a post
         * CASE: Don't create new posts_meta entry if post meta is empty
         */
        if (!_.isUndefined(this.get('posts_meta')) && !_.isNull(this.get('posts_meta'))) {
            let postsMetaData = this.get('posts_meta');
            let relatedModelId = model.related('posts_meta').get('id');
            let hasNoData = !_.values(postsMetaData).some(x => !!x);
            if (relatedModelId && !_.isEmpty(postsMetaData)) {
                postsMetaData.id = relatedModelId;
                this.set('posts_meta', postsMetaData);
            } else if (_.isEmpty(postsMetaData) || hasNoData) {
                this.set('posts_meta', null);
            }
        }

        this.handleAttachedModels(model);

        ghostBookshelf.Model.prototype.onSaving.apply(this, arguments);

        // do not allow generated fields to be overridden via the API
        if (!options.migrating) {
            generatedFields.forEach((field) => {
                if (this.hasChanged(field)) {
                    this.set(field, this.previous(field));
                }
            });
        }

        if (!this.get('mobiledoc')) {
            this.set('mobiledoc', JSON.stringify(converters.mobiledocConverter.blankStructure()));
        }

        // ensure all URLs are stored as relative
        // note: html is not necessary to change because it's a generated later from mobiledoc
        const urlTransformMap = {
            mobiledoc: 'mobiledocAbsoluteToRelative',
            custom_excerpt: 'htmlAbsoluteToRelative',
            codeinjection_head: 'htmlAbsoluteToRelative',
            codeinjection_foot: 'htmlAbsoluteToRelative',
            feature_image: 'absoluteToRelative',
            og_image: 'absoluteToRelative',
            twitter_image: 'absoluteToRelative',
            canonical_url: {
                method: 'absoluteToRelative',
                options: {
                    ignoreProtocol: false
                }
            }
        };

        Object.entries(urlTransformMap).forEach(([attr, transform]) => {
            let method = transform;
            let options = {};

            if (typeof transform === 'object') {
                method = transform.method;
                options = transform.options || {};
            }

            if (this.hasChanged(attr) && this.get(attr)) {
                const transformedValue = urlUtils[method](this.get(attr), options);
                this.set(attr, transformedValue);
            }
        });

        // CASE: mobiledoc has changed, generate html
        // CASE: html is null, but mobiledoc exists (only important for migrations & importing)
        if (this.hasChanged('mobiledoc') || (!this.get('html') && (options.migrating || options.importing))) {
            try {
                this.set('html', converters.mobiledocConverter.render(JSON.parse(this.get('mobiledoc'))));
            } catch (err) {
                throw new common.errors.ValidationError({
                    message: 'Invalid mobiledoc structure.',
                    help: 'https://ghost.org/docs/concepts/posts/'
                });
            }
        }

        if (this.hasChanged('html') || !this.get('plaintext')) {
            const plaintext = htmlToText.fromString(this.get('html'), {
                wordwrap: 80,
                ignoreImage: true,
                hideLinkHrefIfSameAsText: true,
                preserveNewlines: true,
                returnDomByDefault: true,
                uppercaseHeadings: false
            });

            // CASE: html is e.g. <p></p>
            // @NOTE: Otherwise we will always update the resource to `plaintext: ''` and Bookshelf thinks that this
            //        value was modified.
            if (plaintext || plaintext !== this.get('plaintext')) {
                this.set('plaintext', plaintext);
            }
        }

        // disabling sanitization until we can implement a better version
        if (!options.importing) {
            title = this.get('title') || common.i18n.t('errors.models.post.untitled');
            this.set('title', _.toString(title).trim());
        }

        // ### Business logic for published_at and published_by
        // If the current status is 'published' and published_at is not set, set it to now
        if (newStatus === 'published' && !publishedAt) {
            this.set('published_at', new Date());
        }

        // If the current status is 'published' and the status has just changed ensure published_by is set correctly
        if (newStatus === 'published' && this.hasChanged('status')) {
            // unless published_by is set and we're importing, set published_by to contextUser
            if (!(this.get('published_by') && options.importing)) {
                this.set('published_by', String(this.contextUser(options)));
            }
        } else {
            // In any other case (except import), `published_by` should not be changed
            if (this.hasChanged('published_by') && !options.importing) {
                this.set('published_by', this.previous('published_by') ? String(this.previous('published_by')) : null);
            }
        }

        // send_email_when_published is read-only and should only be set using a query param when publishing/scheduling
        if (options.send_email_when_published && this.hasChanged('status') && (newStatus === 'published' || newStatus === 'scheduled')) {
            this.set('send_email_when_published', true);
        }

        // ensure draft posts have the send_email_when_published reset unless an email has already been sent
        if (newStatus === 'draft' && this.hasChanged('status')) {
            ops.push(function ensureSendEmailWhenPublishedIsUnchanged() {
                return self.related('email').fetch({transacting: options.transacting}).then((email) => {
                    if (email) {
                        self.set('send_email_when_published', true);
                    } else {
                        self.set('send_email_when_published', false);
                    }
                });
            });
        }

        // If a title is set, not the same as the old title, a draft post, and has never been published
        if (prevTitle !== undefined && newTitle !== prevTitle && newStatus === 'draft' && !publishedAt) {
            ops.push(function updateSlug() {
                // Pass the new slug through the generator to strip illegal characters, detect duplicates
                return ghostBookshelf.Model.generateSlug(Post, self.get('title'),
                    {status: 'all', transacting: options.transacting, importing: options.importing})
                    .then(function then(slug) {
                        // After the new slug is found, do another generate for the old title to compare it to the old slug
                        return ghostBookshelf.Model.generateSlug(Post, prevTitle,
                            {status: 'all', transacting: options.transacting, importing: options.importing}
                        ).then(function then(prevTitleSlug) {
                            // If the old slug is the same as the slug that was generated from the old title
                            // then set a new slug. If it is not the same, means was set by the user
                            if (prevTitleSlug === prevSlug) {
                                self.set({slug: slug});
                            }
                        });
                    });
            });
        } else {
            ops.push(function updateSlug() {
                // If any of the attributes above were false, set initial slug and check to see if slug was changed by the user
                if (self.hasChanged('slug') || !self.get('slug')) {
                    // Pass the new slug through the generator to strip illegal characters, detect duplicates
                    return ghostBookshelf.Model.generateSlug(Post, self.get('slug') || self.get('title'),
                        {status: 'all', transacting: options.transacting, importing: options.importing})
                        .then(function then(slug) {
                            self.set({slug: slug});
                        });
                }

                return Promise.resolve();
            });
        }

        // CASE: Handle mobiledoc backups/revisions. This is a pure database feature.
        if (model.hasChanged('mobiledoc') && !options.importing && !options.migrating) {
            ops.push(function updateRevisions() {
                return ghostBookshelf.model('MobiledocRevision')
                    .findAll(Object.assign({
                        filter: `post_id:${model.id}`,
                        columns: ['id']
                    }, _.pick(options, 'transacting')))
                    .then((revisions) => {
                        /**
                         * Store prev + latest mobiledoc content, because we have decided against a migration, which
                         * iterates over all posts and creates a copy of the current mobiledoc content.
                         *
                         * Reasons:
                         *   - usually migrations for the post table are slow and error-prone
                         *   - there is no need to create a copy for all posts now, because we only want to ensure
                         *     that posts, which you are currently working on, are getting a content backup
                         *   - no need to create revisions for existing published posts
                         *
                         * The feature is very minimal in the beginning. As soon as you update to this Ghost version,
                         * you
                         */
                        if (!revisions.length && options.method !== 'insert') {
                            model.set('mobiledoc_revisions', [{
                                post_id: model.id,
                                mobiledoc: model.previous('mobiledoc'),
                                created_at_ts: Date.now() - 1
                            }, {
                                post_id: model.id,
                                mobiledoc: model.get('mobiledoc'),
                                created_at_ts: Date.now()
                            }]);
                        } else {
                            const revisionsJSON = revisions.toJSON().slice(0, MOBILEDOC_REVISIONS_COUNT - 1);

                            model.set('mobiledoc_revisions', revisionsJSON.concat([{
                                post_id: model.id,
                                mobiledoc: model.get('mobiledoc'),
                                created_at_ts: Date.now()
                            }]));
                        }
                    });
            });
        }

        return sequence(ops);
    },

    created_by: function createdBy() {
        return this.belongsTo('User', 'created_by');
    },

    updated_by: function updatedBy() {
        return this.belongsTo('User', 'updated_by');
    },

    published_by: function publishedBy() {
        return this.belongsTo('User', 'published_by');
    },

    authors: function authors() {
        return this.belongsToMany('User', 'posts_authors', 'post_id', 'author_id')
            .withPivot('sort_order')
            .query('orderBy', 'sort_order', 'ASC');
    },

    tags: function tags() {
        return this.belongsToMany('Tag', 'posts_tags', 'post_id', 'tag_id')
            .withPivot('sort_order')
            .query('orderBy', 'sort_order', 'ASC');
    },

    fields: function fields() {
        return this.morphMany('AppField', 'relatable');
    },

    mobiledoc_revisions() {
        return this.hasMany('MobiledocRevision', 'post_id');
    },

    posts_meta: function postsMeta() {
        return this.hasOne('PostsMeta', 'post_id');
    },

    email: function email() {
        return this.hasOne('Email', 'post_id');
    },

    /**
     * @NOTE:
     * If you are requesting models with `columns`, you try to only receive some fields of the model/s.
     * But the model layer is complex and needs specific fields in specific situations.
     *
     * ### url generation was removed but default columns need to be checked before removal
     *   - @TODO: with dynamic routing, we no longer need default columns to fetch
     *   - because with static routing Ghost generated the url on runtime and needed the following attributes:
     *     - `slug`: /:slug/
     *     - `published_at`: /:year/:slug
     *     - `author_id`: /:author/:slug, /:primary_author/:slug
     *     - now, the UrlService pre-generates urls based on the resources
     *     - you can ask `urlService.getUrlByResourceId(post.id)`
     *
     * ### events
     *   - you call `findAll` with `columns: id`
     *   - then you trigger `post.save()` on the response
     *   - bookshelf events (`onSaving`) and model events (`emitChange`) are triggered
     *   - but you only fetched the id column, this will trouble (!), because the event hooks require more
     *     data than just the id
     *   - @TODO: we need to disallow this (!)
     *   - you should use `models.Post.edit(..)`
     *      - this disallows using the `columns` option
     *   - same for destroy - you should use `models.Post.destroy(...)`
     *
     * @IMPORTANT: This fn should **never** be used when updating models (models.Post.edit)!
     *            Because the events for updating a resource require most of the fields.
     *            This is protected by the fn `permittedOptions`.
     */
    defaultColumnsToFetch: function defaultColumnsToFetch() {
        return ['id', 'published_at', 'slug', 'author_id'];
    },
    /**
     * If the `formats` option is not used, we return `html` be default.
     * Otherwise we return what is requested e.g. `?formats=mobiledoc,plaintext`
     */
    formatsToJSON: function formatsToJSON(attrs, options) {
        var defaultFormats = ['html'],
            formatsToKeep = options.formats || defaultFormats;

        // Iterate over all known formats, and if they are not in the keep list, remove them
        _.each(Post.allowedFormats, function (format) {
            if (formatsToKeep.indexOf(format) === -1) {
                delete attrs[format];
            }
        });

        return attrs;
    },

    toJSON: function toJSON(unfilteredOptions) {
        var options = Post.filterOptions(unfilteredOptions, 'toJSON'),
            attrs = ghostBookshelf.Model.prototype.toJSON.call(this, options);

        attrs = this.formatsToJSON(attrs, options);

        // CASE: never expose the revisions
        delete attrs.mobiledoc_revisions;

        // If the current column settings allow it...
        if (!options.columns || (options.columns && options.columns.indexOf('primary_tag') > -1)) {
            // ... attach a computed property of primary_tag which is the first tag if it is public, else null
            if (attrs.tags && attrs.tags.length > 0 && attrs.tags[0].visibility === 'public') {
                attrs.primary_tag = attrs.tags[0];
            } else {
                attrs.primary_tag = null;
            }
        }

        return attrs;
    },
    enforcedFilters: function enforcedFilters(options) {
        return options.context && options.context.public ? 'status:published' : null;
    },
    defaultFilters: function defaultFilters(options) {
        if (options.context && options.context.internal) {
            return null;
        }

        return options.context && options.context.public ? 'type:post' : 'type:post+status:published';
    },

    /**
     * You can pass an extra `status=VALUES` field.
     * Long-Term: We should deprecate these short cuts and force users to use the filter param.
     */
    extraFilters: function extraFilters(options) {
        if (!options.status) {
            return null;
        }

        let filter = null;

        // CASE: "status" is passed, combine filters
        if (options.status && options.status !== 'all') {
            options.status = _.includes(ALL_STATUSES, options.status) ? options.status : 'published';

            if (!filter) {
                filter = `status:${options.status}`;
            } else {
                filter = `${filter}+status:${options.status}`;
            }
        } else if (options.status === 'all') {
            if (!filter) {
                filter = `status:[${ALL_STATUSES}]`;
            } else {
                filter = `${filter}+status:[${ALL_STATUSES}]`;
            }
        }

        delete options.status;
        return filter;
    },

    getAction(event, options) {
        const actor = this.getActor(options);

        // @NOTE: we ignore internal updates (`options.context.internal`) for now
        if (!actor) {
            return;
        }

        // @TODO: implement context
        return {
            event: event,
            resource_id: this.id || this.previous('id'),
            resource_type: 'post',
            actor_id: actor.id,
            actor_type: actor.type
        };
    }
}, {
    allowedFormats: ['mobiledoc', 'html', 'plaintext'],

    orderDefaultOptions: function orderDefaultOptions() {
        return {
            status: 'ASC',
            published_at: 'DESC',
            updated_at: 'DESC',
            id: 'DESC'
        };
    },

    orderDefaultRaw: function (options) {
        let order = '' +
            'CASE WHEN posts.status = \'scheduled\' THEN 1 ' +
            'WHEN posts.status = \'draft\' THEN 2 ' +
            'ELSE 3 END ASC,' +
            'CASE WHEN posts.status != \'draft\' THEN posts.published_at END DESC,' +
            'posts.updated_at DESC,' +
            'posts.id DESC';

        // CASE: if the filter contains an `IN` operator, we should return the posts first, which match both tags
        if (options.filter && options.filter.match(/(tags|tag):\s?\[.*\]/)) {
            order = `(SELECT count(*) FROM posts_tags WHERE post_id = posts.id) DESC, ${order}`;
        }

        // CASE: if the filter contains an `IN` operator, we should return the posts first, which match both authors
        if (options.filter && options.filter.match(/(authors|author):\s?\[.*\]/)) {
            order = `(SELECT count(*) FROM posts_authors WHERE post_id = posts.id) DESC, ${order}`;
        }

        return order;
    },

    /**
     * Returns an array of keys permitted in a method's `options` hash, depending on the current method.
     * @param {String} methodName The name of the method to check valid options for.
     * @return {Array} Keys allowed in the `options` hash of the model's method.
     */
    permittedOptions: function permittedOptions(methodName) {
        var options = ghostBookshelf.Model.permittedOptions.call(this, methodName),

            // whitelists for the `options` hash argument on methods, by method name.
            // these are the only options that can be passed to Bookshelf / Knex.
            validOptions = {
                findOne: ['columns', 'importing', 'withRelated', 'require', 'filter'],
                findPage: ['status'],
                findAll: ['columns', 'filter'],
                destroy: ['destroyAll', 'destroyBy'],
                edit: ['filter', 'send_email_when_published']
            };

        // The post model additionally supports having a formats option
        options.push('formats');

        if (validOptions[methodName]) {
            options = options.concat(validOptions[methodName]);
        }

        return options;
    },

    /**
     * We have to ensure consistency. If you listen on model events (e.g. `post.published`), you can expect that you always
     * receive all fields including relations. Otherwise you can't rely on a consistent flow. And we want to avoid
     * that event listeners have to re-fetch a resource. This function is used in the context of inserting
     * and updating resources. We won't return the relations by default for now.
     *
     * We also always fetch posts metadata to keep current behavior consistent
     */
    defaultRelations: function defaultRelations(methodName, options) {
        if (['edit', 'add', 'destroy'].indexOf(methodName) !== -1) {
            options.withRelated = _.union(['authors', 'tags'], options.withRelated || []);
        }

        const META_ATTRIBUTES = _.without(ghostBookshelf.model('PostsMeta').prototype.permittedAttributes(), 'id', 'post_id');

        // NOTE: only include post_meta relation when requested in 'columns' or by default
        //       optimization is needed to be able to perform .findAll on large SQLite datasets
        if (!options.columns || (options.columns && _.intersection(META_ATTRIBUTES, options.columns).length)) {
            options.withRelated = _.union(['posts_meta'], options.withRelated || []);
        }

        return options;
    },

    /**
     * Manually add 'tags' attribute since it's not in the schema and call parent.
     *
     * @param {Object} data Has keys representing the model's attributes/fields in the database.
     * @return {Object} The filtered results of the passed in data, containing only what's allowed in the schema.
     */
    filterData: function filterData(data) {
        var filteredData = ghostBookshelf.Model.filterData.apply(this, arguments),
            extraData = _.pick(data, this.prototype.relationships);

        _.merge(filteredData, extraData);
        return filteredData;
    },

    // ## Model Data Functions

    /**
     * ### Find One
     * @extends ghostBookshelf.Model.findOne to handle post status
     * **See:** [ghostBookshelf.Model.findOne](base.js.html#Find%20One)
     */
    findOne: function findOne(data = {}, options = {}) {
        // @TODO: remove when we drop v0.1
        if (!options.filter && !data.status) {
            data.status = 'published';
        }

        if (data.status === 'all') {
            delete data.status;
        }

        return ghostBookshelf.Model.findOne.call(this, data, options);
    },

    /**
     * ### Edit
     * Fetches and saves to Post. See model.Base.edit
     * **See:** [ghostBookshelf.Model.edit](base.js.html#edit)
     */
    edit: function edit(data, unfilteredOptions) {
        let options = this.filterOptions(unfilteredOptions, 'edit', {extraAllowedProperties: ['id']});

        const editPost = () => {
            options.forUpdate = true;

            return ghostBookshelf.Model.edit.call(this, data, options)
                .then((post) => {
                    return this.findOne({
                        status: 'all',
                        id: options.id
                    }, _.merge({transacting: options.transacting}, unfilteredOptions))
                        .then((found) => {
                            if (found) {
                                // Pass along the updated attributes for checking status changes
                                found._previousAttributes = post._previousAttributes;
                                found._changed = post._changed;
                                return found;
                            }
                        });
                });
        };

        if (!options.transacting) {
            return ghostBookshelf.transaction((transacting) => {
                options.transacting = transacting;
                return editPost();
            });
        }

        return editPost();
    },

    /**
     * ### Add
     * @extends ghostBookshelf.Model.add to handle returning the full object
     * **See:** [ghostBookshelf.Model.add](base.js.html#add)
     */
    add: function add(data, unfilteredOptions) {
        let options = this.filterOptions(unfilteredOptions, 'add', {extraAllowedProperties: ['id']});

        const addPost = (() => {
            return ghostBookshelf.Model.add.call(this, data, options)
                .then((post) => {
                    return this.findOne({
                        status: 'all',
                        id: post.id
                    }, _.merge({transacting: options.transacting}, unfilteredOptions));
                });
        });

        if (!options.transacting) {
            return ghostBookshelf.transaction((transacting) => {
                options.transacting = transacting;

                return addPost();
            });
        }

        return addPost();
    },

    destroy: function destroy(unfilteredOptions) {
        let options = this.filterOptions(unfilteredOptions, 'destroy', {extraAllowedProperties: ['id']});

        const destroyPost = () => {
            return ghostBookshelf.Model.destroy.call(this, options);
        };

        if (!options.transacting) {
            return ghostBookshelf.transaction((transacting) => {
                options.transacting = transacting;
                return destroyPost();
            });
        }

        return destroyPost();
    },

    // NOTE: the `authors` extension is the parent of the post model. It also has a permissible function.
    permissible: function permissible(postModel, action, context, unsafeAttrs, loadedPermissions, hasUserPermission, hasAppPermission, hasApiKeyPermission) {
        let isContributor;
        let isOwner;
        let isAdmin;
        let isEditor;
        let isIntegration;
        let isEdit;
        let isAdd;
        let isDestroy;

        function isChanging(attr) {
            return unsafeAttrs[attr] && unsafeAttrs[attr] !== postModel.get(attr);
        }

        function isPublished() {
            return unsafeAttrs.status && unsafeAttrs.status !== 'draft';
        }

        function isDraft() {
            return postModel.get('status') === 'draft';
        }

        isContributor = loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Contributor'});
        isOwner = loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Owner'});
        isAdmin = loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Admin'});
        isEditor = loadedPermissions.user && _.some(loadedPermissions.user.roles, {name: 'Editor'});
        isIntegration = loadedPermissions.apiKey && _.some(loadedPermissions.apiKey.roles, {name: 'Admin Integration'});

        isEdit = (action === 'edit');
        isAdd = (action === 'add');
        isDestroy = (action === 'destroy');

        if (isContributor && isEdit) {
            // Only allow contributor edit if status is changing, and the post is a draft post
            hasUserPermission = !isChanging('status') && isDraft();
        } else if (isContributor && isAdd) {
            // If adding, make sure it's a draft post and has the correct ownership
            hasUserPermission = !isPublished();
        } else if (isContributor && isDestroy) {
            // If destroying, only allow contributor to destroy their own draft posts
            hasUserPermission = isDraft();
        } else if (!(isOwner || isAdmin || isEditor || isIntegration)) {
            hasUserPermission = !isChanging('visibility');
        }

        const excludedAttrs = [];
        if (isContributor) {
            // Note: at the moment primary_tag is a computed field,
            // meaning we don't add it to this list. However, if the primary_tag/primary_author
            // ever becomes a db field rather than a computed field, add it to this list
            // TODO: once contributors are able to edit existing tags, this can be removed
            // @TODO: we need a concept for making a diff between incoming tags and existing tags
            excludedAttrs.push('tags');
        }

        if (hasUserPermission && hasApiKeyPermission && hasAppPermission) {
            return Promise.resolve({excludedAttrs});
        }

        return Promise.reject(new common.errors.NoPermissionError({
            message: common.i18n.t('errors.models.post.notEnoughPermission')
        }));
    }
});

Posts = ghostBookshelf.Collection.extend({
    model: Post
});

// Extension for handling the logic for author + multiple authors
Post = relations.authors.extendModel(Post, Posts, ghostBookshelf);

module.exports = {
    Post: ghostBookshelf.model('Post', Post),
    Posts: ghostBookshelf.collection('Posts', Posts)
};
