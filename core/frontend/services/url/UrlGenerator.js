const _ = require('lodash'),
    nql = require('@nexes/nql'),
    debug = require('ghost-ignition').debug('services:url:generator'),
    localUtils = require('../../../server/lib/url-utils'),
    // @TODO: merge with filter plugin
    EXPANSIONS = [{
        key: 'author',
        replacement: 'authors.slug'
    }, {
        key: 'tags',
        replacement: 'tags.slug'
    }, {
        key: 'tag',
        replacement: 'tags.slug'
    }, {
        key: 'authors',
        replacement: 'authors.slug'
    }, {
        key: 'primary_tag',
        replacement: 'primary_tag.slug'
    }, {
        key: 'primary_author',
        replacement: 'primary_author.slug'
    }];

const mapNQLKeyValues = require('../../../shared/nql-map-key-values');

/**
 * The UrlGenerator class is responsible to generate urls based on a router's conditions.
 * It is the component which sits between routers and resources and connects them together.
 * Each url generator can own resources. Each resource can only be owned by one generator,
 * because each resource can only live on one url at a time.
 *
 * Each router is represented by a url generator.
 */
class UrlGenerator {
    constructor(router, queue, resources, urls, position) {
        this.router = router;
        this.queue = queue;
        this.urls = urls;
        this.resources = resources;
        this.uid = position;

        debug('constructor', this.toString());

        // CASE: routers can define custom filters, but not required.
        if (this.router.getFilter()) {
            this.filter = this.router.getFilter();
            this.nql = nql(this.filter, {
                expansions: EXPANSIONS,
                transformer: mapNQLKeyValues({
                    key: {
                        from: 'page',
                        to: 'type'
                    },
                    values: [{
                        from: false,
                        to: 'post'
                    }, {
                        from: true,
                        to: 'page'
                    }]
                })
            });
            debug('filter', this.filter);
        }

        this._listeners();
    }

    /**
     * @description Helper function to register listeners for each url generator instance.
     * @private
     */
    _listeners() {
        /**
         * @NOTE: currently only used if the permalink setting changes and it's used for this url generator.
         * @TODO: https://github.com/TryGhost/Ghost/issues/10699
         */
        this.router.addListener('updated', () => {
            const myResources = this.urls.getByGeneratorId(this.uid);

            myResources.forEach((object) => {
                this.urls.removeResourceId(object.resource.data.id);
                object.resource.release();
                this._try(object.resource);
            });
        });

        /**
         * Listen on two events:
         *
         * - init: bootstrap or url reset
         * - added: resource was added to the database
         */
        this.queue.register({
            event: 'init',
            tolerance: 100
        }, this._onInit.bind(this));

        this.queue.register({
            event: 'added'
        }, this._onAdded.bind(this));
    }

    /**
     * @description Listener which get's called when the resources were fully fetched from the database.
     *
     * Each url generator will be called and can try to own resources now.
     *
     * @private
     */
    _onInit() {
        debug('_onInit', this.router.getResourceType());

        // @NOTE: get the resources of my type e.g. posts.
        const resources = this.resources.getAllByType(this.router.getResourceType());

        debug(resources.length);

        _.each(resources, (resource) => {
            this._try(resource);
        });
    }

    /**
     * @description Listener which get's called when a resource was added on runtime.
     * @param {String} event
     * @private
     */
    _onAdded(event) {
        debug('onAdded', this.toString());

        // CASE: you are type "pages", but the incoming type is "users"
        if (event.type !== this.router.getResourceType()) {
            return;
        }

        const resource = this.resources.getByIdAndType(event.type, event.id);

        this._try(resource);
    }

    /**
     * @description Try to own a resource and generate it's url if so.
     * @param {Resource} resource
     * @returns {boolean}
     * @private
     */
    _try(resource) {
        /**
         * CASE: another url generator has taken this resource already.
         *
         * We have to remember that, because each url generator can generate a different url
         * for a resource. So we can't directly check `this.urls.getUrl(url)`.
         */
        if (resource.isReserved()) {
            return false;
        }

        const url = this._generateUrl(resource);

        // CASE 1: route has no custom filter, it will own the resource for sure
        // CASE 2: find out if my filter matches the resource
        if (!this.filter) {
            this.urls.add({
                url: url,
                generatorId: this.uid,
                resource: resource
            });

            resource.reserve();
            this._resourceListeners(resource);
            return true;
        } else if (this.nql.queryJSON(resource.data)) {
            this.urls.add({
                url: url,
                generatorId: this.uid,
                resource: resource
            });

            resource.reserve();
            this._resourceListeners(resource);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description Generate url based on the permlink configuration of the target router.
     *
     * @NOTE We currently generate relative urls (https://github.com/TryGhost/Ghost/commit/7b0d5d465ba41073db0c3c72006da625fa11df32).
     */
    _generateUrl(resource) {
        const permalink = this.router.getPermalinks().getValue();
        return localUtils.replacePermalink(permalink, resource.data);
    }

    /**
     * @description Helper function to register resource listeners.
     *
     * I want to know if my resources changes.
     *
     * If the owned resource get's updated, we simply release/free the resource and push it back to the queue.
     * This is the easiest, less error prone implementation.
     *
     * Imagine you have two collections: `featured:true` and `page:false`.
     * If a published post status get's featured and you have not explicitly defined `featured:false`, we wouldn't
     * be able to figure out if this resource still belongs to me, because the filter still matches.
     */
    _resourceListeners(resource) {
        const onUpdate = (updatedResource) => {
            // 1. remove old resource
            this.urls.removeResourceId(updatedResource.data.id);

            // 2. free resource, the url <-> resource connection no longer exists
            updatedResource.release();

            // 3. post has the change to get owned from a different collection again
            debug('put back in queue', updatedResource.data.id);

            this.queue.start({
                event: 'added',
                action: 'added:' + resource.data.id,
                eventData: {
                    id: resource.data.id,
                    type: this.router.getResourceType()
                }
            });
        };

        const onRemoved = (removedResource) => {
            this.urls.removeResourceId(removedResource.data.id);
            removedResource.release();
        };

        resource.removeAllListeners();
        resource.addListener('updated', onUpdate.bind(this));
        resource.addListener('removed', onRemoved.bind(this));
    }

    /**
     * @description Figure out if this url generator own's a resource id.
     * @param {String} id
     * @returns {boolean}
     */
    hasId(id) {
        const existingUrl = this.urls.getByResourceId(id);

        if (existingUrl && existingUrl.generatorId === this.uid) {
            return true;
        }

        return false;
    }

    /**
     * @description Get all urls of this url generator.
     * @returns {Array}
     */
    getUrls() {
        return this.urls.getByGeneratorId(this.uid);
    }

    /**
     * @description Override of `toString`
     * @returns {string}
     */
    toString() {
        return this.router.toString();
    }
}

module.exports = UrlGenerator;
