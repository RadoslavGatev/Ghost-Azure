/**
 * make sure overrides get's called first!
 * - keeping the overrides import here works for installing Ghost as npm!
 *
 * the call order is the following:
 * - root index requires core module
 * - core index requires server
 * - overrides is the first package to load
 */
require('./overrides');

const debug = require('ghost-ignition').debug('boot:init');
const Promise = require('bluebird');
const config = require('./config');
const common = require('./lib/common');
const migrator = require('./data/db/migrator');
const urlUtils = require('./lib/url-utils');
let parentApp;

// Frontend Components
const themeService = require('../frontend/services/themes');

function initialiseServices() {
    // CASE: When Ghost is ready with bootstrapping (db migrations etc.), we can trigger the router creation.
    //       Reason is that the routers access the routes.yaml, which shouldn't and doesn't have to be validated to
    //       start Ghost in maintenance mode.
    // Routing is a bridge between the frontend and API
    const routing = require('../frontend/services/routing');
    // We pass the themeService API version here, so that the frontend services are less tightly-coupled
    routing.bootstrap.start(themeService.getApiVersion());

    const permissions = require('./services/permissions'),
        apps = require('./services/apps'),
        xmlrpc = require('./services/xmlrpc'),
        slack = require('./services/slack'),
        {mega} = require('./services/mega'),
        webhooks = require('./services/webhooks'),
        scheduling = require('./adapters/scheduling');

    debug('`initialiseServices` Start...');

    return Promise.join(
        // Initialize the permissions actions and objects
        permissions.init(),
        xmlrpc.listen(),
        slack.listen(),
        mega.listen(),
        webhooks.listen(),
        apps.init(),
        scheduling.init({
            schedulerUrl: config.get('scheduling').schedulerUrl,
            active: config.get('scheduling').active,
            // NOTE: When changing API version need to consider how to migrate custom scheduling adapters
            //       that rely on URL to lookup persisted scheduled records (jobs, etc.). Ref: https://github.com/TryGhost/Ghost/pull/10726#issuecomment-489557162
            apiUrl: urlUtils.urlFor('api', {version: 'v3', versionType: 'admin'}, true),
            internalPath: config.get('paths').internalSchedulingPath,
            contentPath: config.getContentPath('scheduling')
        })
    ).then(function () {
        debug('XMLRPC, Slack, MEGA, Webhooks, Apps, Scheduling, Permissions done');

        // Initialise analytics events
        if (config.get('segment:key')) {
            require('./analytics-events').init();
        }
    }).then(function () {
        debug('...`initialiseServices` End');
    });
}

/**
 * - initialise models
 * - initialise i18n
 * - load all settings into settings cache (almost every component makes use of this cache)
 * - load active theme
 * - create our express apps (site, admin, api)
 * - start the ghost server
 * - enable maintenance mode if migrations are missing
 */
const minimalRequiredSetupToStartGhost = (dbState) => {
    const settings = require('./services/settings');
    const models = require('./models');
    const GhostServer = require('./ghost-server');

    // Frontend
    const frontendSettings = require('../frontend/services/settings');

    let ghostServer;

    // Initialize Ghost core internationalization
    common.i18n.init();
    debug('Default i18n done for core');

    models.init();
    debug('Models done');

    return settings.init()
        .then(() => {
            debug('Settings done');

            return frontendSettings.init();
        })
        .then(() => {
            debug('Frontend settings done');
            return themeService.init();
        })
        .then(() => {
            debug('Themes done');

            parentApp = require('./web/parent-app')();
            debug('Express Apps done');

            return new GhostServer(parentApp);
        })
        .then((_ghostServer) => {
            ghostServer = _ghostServer;

            // CASE: all good or db was just initialised
            if (dbState === 1 || dbState === 2) {
                common.events.emit('db.ready');

                return initialiseServices()
                    .then(() => {
                        return ghostServer;
                    });
            }

            // CASE: migrations required, put blog into maintenance mode
            if (dbState === 4) {
                common.logging.info('Blog is in maintenance mode.');

                config.set('maintenance:enabled', true);

                migrator.migrate()
                    .then(() => {
                        common.events.emit('db.ready');
                        return initialiseServices();
                    })
                    .then(() => {
                        config.set('maintenance:enabled', false);
                        common.logging.info('Blog is out of maintenance mode.');
                        return GhostServer.announceServerStart();
                    })
                    .catch((err) => {
                        return GhostServer.announceServerStopped(err)
                            .finally(() => {
                                common.logging.error(err);
                                setTimeout(() => {
                                    process.exit(-1);
                                }, 100);
                            });
                    });

                return ghostServer;
            }
        });
};

/**
 * Connect to database.
 * Check db state.
 */
const isDatabaseInitialisationRequired = () => {
    const db = require('./data/db/connection');
    let dbState;

    return migrator.getState()
        .then((state) => {
            dbState = state;

            // CASE: db initialisation required, wait till finished
            if (dbState === 2) {
                return migrator.dbInit();
            }

            // CASE: is db incompatible? e.g. you can't connect a 0.11 database with Ghost 1.0 or 2.0
            if (dbState === 3) {
                return migrator.isDbCompatible(db)
                    .then(() => {
                        dbState = 2;
                        return migrator.dbInit();
                    });
            }
        })
        .then(() => {
            return minimalRequiredSetupToStartGhost(dbState);
        });
};

module.exports = isDatabaseInitialisationRequired;
