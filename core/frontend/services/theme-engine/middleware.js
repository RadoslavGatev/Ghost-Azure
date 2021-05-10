const _ = require('lodash');
const hbs = require('./engine');
const urlUtils = require('../../../shared/url-utils');
const config = require('../../../shared/config');
const {i18n, api} = require('../proxy');
const errors = require('@tryghost/errors');
const settingsCache = require('../../../server/services/settings/cache');
const labs = require('../../../server/services/labs');
const activeTheme = require('./active');
const preview = require('./preview');

// ### Ensure Active Theme
// Ensure there's a properly set & mounted active theme before attempting to serve a site request
// If there is no active theme, throw an error
// Else, ensure the active theme is mounted
function ensureActiveTheme(req, res, next) {
    // CASE: this means that the theme hasn't been loaded yet i.e. there is no active theme
    if (!activeTheme.get()) {
        // This is the one place we ACTUALLY throw an error for a missing theme as it's a request we cannot serve
        return next(new errors.InternalServerError({
            // We use the settingsCache here, because the setting will be set,
            // even if the theme itself is not usable because it is invalid or missing.
            message: i18n.t('errors.middleware.themehandler.missingTheme', {theme: settingsCache.get('active_theme')})
        }));
    }

    // CASE: bootstrap theme validation failed, we would like to show the errors on the site [only production]
    if (activeTheme.get().error && config.get('env') === 'production') {
        return next(new errors.InternalServerError({
            // We use the settingsCache here, because the setting will be set,
            // even if the theme itself is not usable because it is invalid or missing.
            message: i18n.t('errors.middleware.themehandler.invalidTheme', {theme: settingsCache.get('active_theme')}),
            errorDetails: activeTheme.get().error.errorDetails
        }));
    }

    // If the active theme has not yet been mounted, mount it into express
    if (!activeTheme.get().mounted) {
        activeTheme.get().mount(req.app);
    }

    next();
}

/*
 * @TODO
 * This should be definitely refactored and we need to consider _some_
 * members settings as publicly readable
 */
async function haxGetMembersPriceData() {
    const defaultPrice = {
        amount: 0,
        currency: null,
        interval: null,
        nickname: null
    };

    function makePriceObject(price) {
        const numberAmount = 0 + price.amount;
        const dollarAmount = numberAmount ? Math.round(numberAmount / 100) : 0;
        return {
            valueOf() {
                return dollarAmount;
            },
            amount: numberAmount,
            currency: price.currency,
            nickname: price.name,
            interval: price.interval
        };
    }

    try {
        const {products} = await api.canary.products.browse({
            include: 'stripe_prices'
        });

        const defaultProduct = products[0];

        const nonZeroPrices = defaultProduct.stripe_prices.filter((price) => {
            return price.amount !== 0;
        });

        const monthlyPrice = nonZeroPrices.find((price) => {
            return price.nickname === 'Monthly';
        }) || nonZeroPrices.find((price) => {
            return price.interval === 'month';
        });

        const yearlyPrice = nonZeroPrices.find((price) => {
            return price.nickname === 'Yearly';
        }) || nonZeroPrices.find((price) => {
            return price.interval === 'year';
        });

        const priceData = {
            monthly: makePriceObject(monthlyPrice || defaultPrice),
            yearly: makePriceObject(yearlyPrice || defaultPrice),
            currency: nonZeroPrices[0].currency
        };

        return priceData;
    } catch (err) {
        return {
            monthly: makePriceObject(defaultPrice),
            yearly: makePriceObject(defaultPrice),
            currency: null
        };
    }
}

function getSiteData(req) {
    let siteData = settingsCache.getPublic();

    // @TODO: it would be nicer if this was proper middleware somehow...
    siteData = preview.handle(req, siteData);

    // theme-only computed property added to @site
    if (settingsCache.get('members_signup_access') === 'none') {
        const escapedUrl = encodeURIComponent(urlUtils.urlFor({relativeUrl: '/rss/'}, true));
        siteData.signup_url = `https://feedly.com/i/subscription/feed/${escapedUrl}`;
    } else {
        siteData.signup_url = '#/portal';
    }

    return siteData;
}

async function updateGlobalTemplateOptions(req, res, next) {
    // Static information, same for every request unless the settings change
    // @TODO: bind this once and then update based on events?
    // @TODO: decouple theme layer from settings cache using the Content API
    const siteData = getSiteData(req);
    const labsData = labs.getAll();

    const themeData = {
        posts_per_page: activeTheme.get().config('posts_per_page'),
        image_sizes: activeTheme.get().config('image_sizes')
    };
    const priceData = await haxGetMembersPriceData();

    // @TODO: only do this if something changed?
    // @TODO: remove blog in a major where we are happy to break more themes
    {
        hbs.updateTemplateOptions({
            data: {
                blog: siteData,
                site: siteData,
                labs: labsData,
                config: themeData,
                price: priceData
            }
        });
    }

    next();
}

function updateLocalTemplateData(req, res, next) {
    // Pass 'secure' flag to the view engine
    // so that templates can choose to render https or http 'url', see url utility
    res.locals.secure = req.secure;

    next();
}

function updateLocalTemplateOptions(req, res, next) {
    const localTemplateOptions = hbs.getLocalTemplateOptions(res.locals);
    const siteData = {
        url: urlUtils.urlFor('home', {secure: req.secure, trailingSlash: false}, true)
    };

    const member = req.member ? {
        uuid: req.member.uuid,
        email: req.member.email,
        name: req.member.name,
        firstname: req.member.name && req.member.name.split(' ')[0],
        avatar_image: req.member.avatar_image,
        subscriptions: req.member.subscriptions && req.member.subscriptions.map((sub) => {
            return Object.assign({}, sub, {
                default_payment_card_last4: sub.default_payment_card_last4 || '****'
            });
        }),
        paid: req.member.status !== 'free'
    } : null;

    hbs.updateLocalTemplateOptions(res.locals, _.merge({}, localTemplateOptions, {
        data: {
            member: member,
            site: siteData,
            // @deprecated: a gscan warning for @blog was added before 3.0 which replaced it with @site
            blog: siteData
        }
    }));

    next();
}

module.exports = [
    ensureActiveTheme,
    updateGlobalTemplateOptions,
    updateLocalTemplateData,
    updateLocalTemplateOptions
];
