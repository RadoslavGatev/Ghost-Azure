const moment = require('moment');
const extend = require('lodash/extend');
const pick = require('lodash/pick');
const config = require('../../../../config');
const common = require('../../../../lib/common');
const spam = config.get('spam') || {};

const spamPrivateBlog = spam.private_blog || {};
const spamGlobalBlock = spam.global_block || {};
const spamGlobalReset = spam.global_reset || {};
const spamUserReset = spam.user_reset || {};
const spamUserLogin = spam.user_login || {};
const spamContentApiKey = spam.content_api_key || {};

let store;
let memoryStore;
let privateBlogInstance;
let globalResetInstance;
let globalBlockInstance;
let userLoginInstance;
let userResetInstance;
let contentApiKeyInstance;

const spamConfigKeys = ['freeRetries', 'minWait', 'maxWait', 'lifetime'];

const handleStoreError = (err) => {
    const customError = new common.errors.InternalServerError({
        message: 'Unknown error',
        err: err.parent ? err.parent : err
    });

    // see https://github.com/AdamPflug/express-brute/issues/45
    // express-brute does not always forward a callback
    // we are using reset as synchronous call, so we have to log the error if it occurs
    // there is no way to try/catch, because the reset operation happens asynchronous
    if (!err.next) {
        common.logging.error(err);
        return;
    }

    err.next(customError);
};

// This locks a single endpoint based on excessive requests from an IP.
// Currently only used for auth type methods.
// We allow for a generous number of requests here to prevent communites on the same IP bing barred on account of a single user
// Defaults to 50 attempts per hour and locks the endpoint for an hour
const globalBlock = () => {
    const ExpressBrute = require('express-brute');
    const BruteKnex = require('brute-knex');
    const db = require('../../../../data/db');

    store = store || new BruteKnex({
        tablename: 'brute',
        createTable: false,
        knex: db.knex
    });

    globalBlockInstance = globalBlockInstance || new ExpressBrute(store,
        extend({
            attachResetToRequest: false,
            failCallback(req, res, next, nextValidRequestDate) {
                return next(new common.errors.TooManyRequestsError({
                    message: `Too many attempts try again in ${moment(nextValidRequestDate).fromNow(true)}`,
                    context: common.i18n.t('errors.middleware.spamprevention.forgottenPasswordIp.error',
                        {rfa: spamGlobalBlock.freeRetries + 1 || 5, rfp: spamGlobalBlock.lifetime || 60 * 60}),
                    help: common.i18n.t('errors.middleware.spamprevention.tooManyAttempts')
                }));
            },
            handleStoreError: handleStoreError
        }, pick(spamGlobalBlock, spamConfigKeys))
    );

    return globalBlockInstance;
};

const globalReset = () => {
    const ExpressBrute = require('express-brute');
    const BruteKnex = require('brute-knex');
    const db = require('../../../../data/db');

    store = store || new BruteKnex({
        tablename: 'brute',
        createTable: false,
        knex: db.knex
    });

    globalResetInstance = globalResetInstance || new ExpressBrute(store,
        extend({
            attachResetToRequest: false,
            failCallback(req, res, next, nextValidRequestDate) {
                // TODO use i18n again
                return next(new common.errors.TooManyRequestsError({
                    message: `Too many attempts try again in ${moment(nextValidRequestDate).fromNow(true)}`,
                    context: common.i18n.t('errors.middleware.spamprevention.forgottenPasswordIp.error',
                        {rfa: spamGlobalReset.freeRetries + 1 || 5, rfp: spamGlobalReset.lifetime || 60 * 60}),
                    help: common.i18n.t('errors.middleware.spamprevention.forgottenPasswordIp.context')
                }));
            },
            handleStoreError: handleStoreError
        }, pick(spamGlobalReset, spamConfigKeys))
    );

    return globalResetInstance;
};

// Stops login attempts for a user+IP pair with an increasing time period starting from 10 minutes
// and rising to a week in a fibonnaci sequence
// The user+IP count is reset when on successful login
// Default value of 5 attempts per user+IP pair
const userLogin = () => {
    const ExpressBrute = require('express-brute');
    const BruteKnex = require('brute-knex');
    const db = require('../../../../data/db');

    store = store || new BruteKnex({
        tablename: 'brute',
        createTable: false,
        knex: db.knex
    });

    userLoginInstance = userLoginInstance || new ExpressBrute(store,
        extend({
            attachResetToRequest: true,
            failCallback(req, res, next, nextValidRequestDate) {
                return next(new common.errors.TooManyRequestsError({
                    message: `Too many sign-in attempts try again in ${moment(nextValidRequestDate).fromNow(true)}`,
                    // TODO add more options to i18n
                    context: common.i18n.t('errors.middleware.spamprevention.tooManySigninAttempts.context'),
                    help: common.i18n.t('errors.middleware.spamprevention.tooManySigninAttempts.context')
                }));
            },
            handleStoreError: handleStoreError
        }, pick(spamUserLogin, spamConfigKeys))
    );

    return userLoginInstance;
};

// Stop password reset requests when there are (freeRetries + 1) requests per lifetime per email
// Defaults here are 5 attempts per hour for a user+IP pair
// The endpoint is then locked for an hour
const userReset = function userReset() {
    const ExpressBrute = require('express-brute');
    const BruteKnex = require('brute-knex');
    const db = require('../../../../data/db');

    store = store || new BruteKnex({
        tablename: 'brute',
        createTable: false,
        knex: db.knex
    });

    userResetInstance = userResetInstance || new ExpressBrute(store,
        extend({
            attachResetToRequest: true,
            failCallback(req, res, next, nextValidRequestDate) {
                return next(new common.errors.TooManyRequestsError({
                    message: `Too many password reset attempts try again in ${moment(nextValidRequestDate).fromNow(true)}`,
                    context: common.i18n.t('errors.middleware.spamprevention.forgottenPasswordEmail.error',
                        {rfa: spamUserReset.freeRetries + 1 || 5, rfp: spamUserReset.lifetime || 60 * 60}),
                    help: common.i18n.t('errors.middleware.spamprevention.forgottenPasswordEmail.context')
                }));
            },
            handleStoreError: handleStoreError
        }, pick(spamUserReset, spamConfigKeys))
    );

    return userResetInstance;
};

// This protects a private blog from spam attacks. The defaults here allow 10 attempts per IP per hour
// The endpoint is then locked for an hour
const privateBlog = () => {
    const ExpressBrute = require('express-brute');
    const BruteKnex = require('brute-knex');
    const db = require('../../../../data/db');

    store = store || new BruteKnex({
        tablename: 'brute',
        createTable: false,
        knex: db.knex
    });

    privateBlogInstance = privateBlogInstance || new ExpressBrute(store,
        extend({
            attachResetToRequest: false,
            failCallback(req, res, next, nextValidRequestDate) {
                common.logging.error(new common.errors.TooManyRequestsError({
                    message: common.i18n.t('errors.middleware.spamprevention.tooManySigninAttempts.error',
                        {
                            rateSigninAttempts: spamPrivateBlog.freeRetries + 1 || 5,
                            rateSigninPeriod: spamPrivateBlog.lifetime || 60 * 60
                        }),
                    context: common.i18n.t('errors.middleware.spamprevention.tooManySigninAttempts.context')
                }));

                return next(new common.errors.TooManyRequestsError({
                    message: `Too many private sign-in attempts try again in ${moment(nextValidRequestDate).fromNow(true)}`
                }));
            },
            handleStoreError: handleStoreError
        }, pick(spamPrivateBlog, spamConfigKeys))
    );

    return privateBlogInstance;
};

const contentApiKey = () => {
    const ExpressBrute = require('express-brute');

    memoryStore = memoryStore || new ExpressBrute.MemoryStore();

    contentApiKeyInstance = contentApiKeyInstance || new ExpressBrute(memoryStore,
        extend({
            attachResetToRequest: true,
            failCallback(req, res, next) {
                const err = new common.errors.TooManyRequestsError({
                    message: common.i18n.t('errors.middleware.spamprevention.tooManyAttempts')
                });

                common.logging.error(err);
                return next(err);
            },
            handleStoreError: handleStoreError
        }, pick(spamContentApiKey, spamConfigKeys))
    );

    return contentApiKeyInstance;
};

module.exports = {
    globalBlock: globalBlock,
    globalReset: globalReset,
    userLogin: userLogin,
    userReset: userReset,
    privateBlog: privateBlog,
    contentApiKey: contentApiKey
};
