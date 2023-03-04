const _ = require('lodash');
const errors = require('@tryghost/errors');
const tpl = require('@tryghost/tpl');
const MembersSSR = require('@tryghost/members-ssr');
const db = require('../../data/db');
const MembersConfigProvider = require('./config');
const MembersCSVImporter = require('@tryghost/members-importer');
const MembersStats = require('./stats/members-stats');
const memberJobs = require('./jobs');
const logging = require('@tryghost/logging');
const urlUtils = require('../../../shared/url-utils');
const labsService = require('../../../shared/labs');
const settingsCache = require('../../../shared/settings-cache');
const config = require('../../../shared/config');
const models = require('../../models');
const {GhostMailer} = require('../mail');
const jobsService = require('../jobs');
const tiersService = require('../tiers');
const VerificationTrigger = require('@tryghost/verification-trigger');
const DatabaseInfo = require('@tryghost/database-info');
const settingsHelpers = require('../settings-helpers');

const messages = {
    noLiveKeysInDevelopment: 'Cannot use live stripe keys in development. Please restart in production mode.',
    sslRequiredForStripe: 'Cannot run Ghost without SSL when Stripe is connected. Please update your url config to use "https://".',
    remoteWebhooksInDevelopment: 'Cannot use remote webhooks in development. See https://ghost.org/docs/webhooks/#stripe-webhooks for developing with Stripe.'
};

const ghostMailer = new GhostMailer();

const membersConfig = new MembersConfigProvider({
    settingsHelpers,
    settingsCache,
    urlUtils
});

const membersStats = new MembersStats({
    db: db,
    settingsCache: settingsCache,
    isSQLite: DatabaseInfo.isSQLite(db.knex)
});

let membersApi;
let verificationTrigger;

const membersImporter = new MembersCSVImporter({
    storagePath: config.getContentPath('data'),
    getTimezone: () => settingsCache.get('timezone'),
    getMembersRepository: async () => {
        const api = await module.exports.api;
        return api.members;
    },
    getDefaultTier: () => {
        return tiersService.api.readDefaultTier();
    },
    sendEmail: ghostMailer.send.bind(ghostMailer),
    isSet: flag => labsService.isSet(flag),
    addJob: jobsService.addJob.bind(jobsService),
    knex: db.knex,
    urlFor: urlUtils.urlFor.bind(urlUtils),
    context: {
        importer: true
    }
});

const processImport = async (options) => {
    return await membersImporter.process({...options, verificationTrigger});
};

const initVerificationTrigger = () => {
    return new VerificationTrigger({
        getApiTriggerThreshold: () => _.get(config.get('hostSettings'), 'emailVerification.apiThreshold'),
        getAdminTriggerThreshold: () => _.get(config.get('hostSettings'), 'emailVerification.adminThreshold'),
        getImportTriggerThreshold: () => _.get(config.get('hostSettings'), 'emailVerification.importThreshold'),
        isVerified: () => config.get('hostSettings:emailVerification:verified') === true,
        isVerificationRequired: () => settingsCache.get('email_verification_required') === true,
        sendVerificationEmail: async ({subject, message, amountTriggered}) => {
            const escalationAddress = config.get('hostSettings:emailVerification:escalationAddress');
            const fromAddress = config.get('user_email');

            if (escalationAddress) {
                await ghostMailer.send({
                    subject,
                    html: tpl(message, {
                        amountTriggered: amountTriggered,
                        siteUrl: urlUtils.getSiteUrl()
                    }),
                    forceTextContent: true,
                    from: fromAddress,
                    to: escalationAddress
                });
            }
        },
        membersStats,
        Settings: models.Settings,
        eventRepository: membersApi.events
    });
};

module.exports = {
    async init() {
        const stripeService = require('../stripe');
        const createMembersApiInstance = require('./api');
        const env = config.get('env');

        // @TODO Move to stripe service
        if (env !== 'production') {
            if (stripeService.api.configured && stripeService.api.mode === 'live') {
                throw new errors.IncorrectUsageError({
                    message: tpl(messages.noLiveKeysInDevelopment)
                });
            }
        } else {
            const siteUrl = urlUtils.getSiteUrl();
            if (!/^https/.test(siteUrl) && stripeService.api.configured) {
                throw new errors.IncorrectUsageError({
                    message: tpl(messages.sslRequiredForStripe)
                });
            }
        }
        if (!membersApi) {
            membersApi = createMembersApiInstance(membersConfig);

            membersApi.bus.on('error', function (err) {
                logging.error(err);
            });
        }

        module.exports.ssr = MembersSSR({
            cookieSecure: urlUtils.isSSL(urlUtils.getSiteUrl()),
            cookieKeys: [settingsCache.get('theme_session_secret')],
            cookieName: 'ghost-members-ssr',
            getMembersApi: () => module.exports.api
        });

        verificationTrigger = initVerificationTrigger();
        module.exports.verificationTrigger = verificationTrigger;

        if (!env?.startsWith('testing')) {
            const membersMigrationJobName = 'members-migrations';
            if (!(await jobsService.hasExecutedSuccessfully(membersMigrationJobName))) {
                jobsService.addOneOffJob({
                    name: membersMigrationJobName,
                    offloaded: false,
                    job: stripeService.migrations.execute.bind(stripeService.migrations)
                });

                await jobsService.awaitOneOffCompletion(membersMigrationJobName);
            }
        }

        // Schedule daily cron job to clean expired comp subs
        memberJobs.scheduleExpiredCompCleanupJob();

        // Schedule daily cron job to clean expired tokens
        memberJobs.scheduleTokenCleanupJob();
    },
    contentGating: require('./content-gating'),

    config: membersConfig,

    get api() {
        return membersApi;
    },

    ssr: null,
    verificationTrigger: null,

    stripeConnect: require('./stripe-connect'),

    processImport: processImport,

    stats: membersStats,
    export: require('./exporter/query')
};

module.exports.middleware = require('./middleware');
