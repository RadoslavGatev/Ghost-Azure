const debug = require('ghost-ignition').debug('web:site:app');
const path = require('path');
const express = require('express');
const cors = require('cors');
const {URL} = require('url');
const common = require('../../lib/common');

// App requires
const config = require('../../config');
const apps = require('../../services/apps');
const constants = require('../../lib/constants');
const storage = require('../../adapters/storage');
const urlService = require('../../../frontend/services/url');
const urlUtils = require('../../lib/url-utils');
const sitemapHandler = require('../../../frontend/services/sitemap/handler');
const themeService = require('../../../frontend/services/themes');
const themeMiddleware = themeService.middleware;
const membersService = require('../../services/members');
const membersMiddleware = membersService.middleware;
const siteRoutes = require('./routes');
const shared = require('../shared');

const STATIC_IMAGE_URL_PREFIX = `/${urlUtils.STATIC_IMAGE_URL_PREFIX}`;

let router;

const corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
    const origin = req.header('Origin');
    const corsOptions = {
        origin: false, // disallow cross-origin requests by default
        credentials: true // required to allow admin-client to login to private sites
    };

    if (!origin) {
        return callback(null, corsOptions);
    }

    let originUrl;
    try {
        originUrl = new URL(origin);
    } catch (err) {
        return callback(new common.errors.BadRequestError({err}));
    }

    // originUrl will definitely exist here because according to WHATWG URL spec
    // The class constructor will either throw a TypeError or return a URL object
    // https://url.spec.whatwg.org/#url-class

    // allow all localhost and 127.0.0.1 requests no matter the port
    if (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1') {
        corsOptions.origin = true;
    }

    // allow the configured host through on any protocol
    const siteUrl = new URL(config.get('url'));
    if (originUrl.host === siteUrl.host) {
        corsOptions.origin = true;
    }

    // allow the configured admin:url host through on any protocol
    if (config.get('admin:url')) {
        const adminUrl = new URL(config.get('admin:url'));
        if (originUrl.host === adminUrl.host) {
            corsOptions.origin = true;
        }
    }

    callback(null, corsOptions);
};

function SiteRouter(req, res, next) {
    router(req, res, next);
}

module.exports = function setupSiteApp(options = {}) {
    debug('Site setup start');

    const siteApp = express();

    // Make sure 'req.secure' is valid for proxied requests
    // (X-Forwarded-Proto header will be checked, if present)
    // NB: required here because it's not passed down via vhost
    siteApp.enable('trust proxy');

    // ## App - specific code
    // set the view engine
    siteApp.set('view engine', 'hbs');

    // enable CORS headers (allows admin client to hit front-end when configured on separate URLs)
    siteApp.use(cors(corsOptionsDelegate));

    // you can extend Ghost with a custom redirects file
    // see https://github.com/TryGhost/Ghost/issues/7707
    shared.middlewares.customRedirects.use(siteApp);

    // More redirects
    siteApp.use(shared.middlewares.adminRedirects());

    // force SSL if blog url is set to https. The redirects handling must happen before asset and page routing,
    // otherwise we serve assets/pages with http. This can cause mixed content warnings in the admin client.
    siteApp.use(shared.middlewares.urlRedirects);

    // Static content/assets
    // @TODO make sure all of these have a local 404 error handler
    // Favicon
    siteApp.use(shared.middlewares.serveFavicon());

    // /public/members.js
    siteApp.get('/public/members.js', membersMiddleware.public);

    // Serve sitemap.xsl file
    siteApp.use(shared.middlewares.servePublicFile('sitemap.xsl', 'text/xsl', constants.ONE_DAY_S));

    // Serve stylesheets for default templates
    siteApp.use(shared.middlewares.servePublicFile('public/ghost.css', 'text/css', constants.ONE_HOUR_S));
    siteApp.use(shared.middlewares.servePublicFile('public/ghost.min.css', 'text/css', constants.ONE_YEAR_S));

    // Serve images for default templates
    siteApp.use(shared.middlewares.servePublicFile('public/404-ghost@2x.png', 'png', constants.ONE_HOUR_S));
    siteApp.use(shared.middlewares.servePublicFile('public/404-ghost.png', 'png', constants.ONE_HOUR_S));

    // Serve blog images using the storage adapter
    siteApp.use(STATIC_IMAGE_URL_PREFIX, shared.middlewares.image.handleImageSizes, storage.getStorage().serve());

    // @TODO find this a better home
    // We do this here, at the top level, because helpers require so much stuff.
    // Moving this to being inside themes, where it probably should be requires the proxy to be refactored
    // Else we end up with circular dependencies
    require('../../../frontend/helpers').loadCoreHelpers();
    debug('Helpers done');

    // Members middleware
    // Initializes members specific routes as well as assigns members specific data to the req/res objects
    siteApp.get('/members/ssr', membersMiddleware.getIdentityToken);
    siteApp.delete('/members/ssr', membersMiddleware.deleteSession);
    siteApp.post('/members/webhooks/stripe', membersMiddleware.stripeWebhooks);

    siteApp.use(membersMiddleware.createSessionFromToken);

    // Theme middleware
    // This should happen AFTER any shared assets are served, as it only changes things to do with templates
    // At this point the active theme object is already updated, so we have the right path, so it can probably
    // go after staticTheme() as well, however I would really like to simplify this and be certain
    siteApp.use(themeMiddleware);
    debug('Themes done');

    // Theme static assets/files
    siteApp.use(shared.middlewares.staticTheme());
    debug('Static content done');

    // Serve robots.txt if not found in theme
    siteApp.use(shared.middlewares.servePublicFile('robots.txt', 'text/plain', constants.ONE_HOUR_S));

    // setup middleware for internal apps
    // @TODO: refactor this to be a proper app middleware hook for internal & external apps
    config.get('apps:internal').forEach((appName) => {
        const app = require(path.join(config.get('paths').internalAppPath, appName));

        if (Object.prototype.hasOwnProperty.call(app, 'setupMiddleware')) {
            app.setupMiddleware(siteApp);
        }
    });

    // site map - this should probably be refactored to be an internal app
    sitemapHandler(siteApp);
    debug('Internal apps done');

    // send 503 error page in case of maintenance
    siteApp.use(shared.middlewares.maintenance);

    // Add in all trailing slashes & remove uppercase
    // must happen AFTER asset loading and BEFORE routing
    siteApp.use(shared.middlewares.prettyUrls);

    // ### Caching
    // Site frontend is cacheable UNLESS request made by a member
    const publicCacheControl = shared.middlewares.cacheControl('public');
    const privateCacheControl = shared.middlewares.cacheControl('private');
    siteApp.use(function (req, res, next) {
        if (req.member) {
            return privateCacheControl(req, res, next);
        } else {
            return publicCacheControl(req, res, next);
        }
    });

    debug('General middleware done');

    router = siteRoutes(options);
    Object.setPrototypeOf(SiteRouter, router);

    // Set up Frontend routes (including private blogging routes)
    siteApp.use(SiteRouter);

    // ### Error handlers
    siteApp.use(shared.middlewares.errorHandler.pageNotFound);
    siteApp.use(shared.middlewares.errorHandler.handleThemeResponse);

    debug('Site setup end');

    return siteApp;
};

module.exports.reload = () => {
    // https://github.com/expressjs/express/issues/2596
    router = siteRoutes({start: themeService.getApiVersion()});
    Object.setPrototypeOf(SiteRouter, router);

    // re-initialse apps (register app routers, because we have re-initialised the site routers)
    apps.init();

    // connect routers and resources again
    urlService.queue.start({
        event: 'init',
        tolerance: 100,
        requiredSubscriberCount: 1
    });
};
