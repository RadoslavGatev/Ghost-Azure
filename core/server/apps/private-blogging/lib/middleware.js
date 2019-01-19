const fs = require('fs-extra'),
    session = require('cookie-session'),
    crypto = require('crypto'),
    path = require('path'),
    config = require('../../../config'),
    urlService = require('../../../services/url'),
    constants = require('../../../lib/constants'),
    common = require('../../../lib/common'),
    settingsCache = require('../../../services/settings/cache'),
    // routeKeywords.private: 'private'
    privateRoute = '/private/';

let privateBlogging = null;

function verifySessionHash(salt, hash) {
    if (!salt || !hash) {
        return false;
    }

    let hasher = crypto.createHash('sha256');
    hasher.update(settingsCache.get('password') + salt, 'utf8');
    return hasher.digest('hex') === hash;
}

privateBlogging = {
    checkIsPrivate: function checkIsPrivate(req, res, next) {
        let isPrivateBlog = settingsCache.get('is_private');

        if (!isPrivateBlog) {
            res.isPrivateBlog = false;
            return next();
        }

        res.isPrivateBlog = true;

        return session({
            maxAge: constants.ONE_MONTH_MS,
            signed: false
        })(req, res, next);
    },

    filterPrivateRoutes: function filterPrivateRoutes(req, res, next) {
        if (res.isAdmin || !res.isPrivateBlog || req.url.lastIndexOf(privateRoute, 0) === 0) {
            return next();
        }

        if (req.url.lastIndexOf('/robots.txt', 0) === 0) {
            return fs.readFile(path.resolve(__dirname, '../', 'robots.txt'), function readFile(err, buf) {
                if (err) {
                    return next(err);
                }

                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Content-Length': buf.length,
                    'Cache-Control': 'public, max-age=' + config.get('caching:robotstxt:maxAge')
                });

                res.end(buf);
            });
        }

        // CASE: Allow private RSS feed urls.
        // Any url which contains the hash and the postfix /rss is allowed to access a private rss feed without
        // a session. As soon as a path matches, we rewrite the url. Even Express uses rewriting when using `app.use()`.
        if (req.url.indexOf(settingsCache.get('public_hash') + '/rss') !== -1) {
            req.url = req.url.replace(settingsCache.get('public_hash') + '/', '');
            return next();
        }

        // NOTE: Redirect to /private if the session does not exist.
        privateBlogging.authenticatePrivateSession(req, res, function onSessionVerified() {
            // CASE: RSS is disabled for private blogging e.g. they create overhead
            if (req.path.match(/\/rss(\/?|\/\d+\/?)$/)) {
                return next(new common.errors.NotFoundError({
                    message: common.i18n.t('errors.errors.pageNotFound')
                }));
            }

            next();
        });
    },

    authenticatePrivateSession: function authenticatePrivateSession(req, res, next) {
        let hash = req.session.token || '',
            salt = req.session.salt || '',
            isVerified = verifySessionHash(salt, hash),
            url;

        if (isVerified) {
            return next();
        } else {
            url = urlService.utils.urlFor({relativeUrl: privateRoute});
            url += req.url === '/' ? '' : '?r=' + encodeURIComponent(req.url);
            return res.redirect(url);
        }
    },

    // This is here so a call to /private/ after a session is verified will redirect to home;
    isPrivateSessionAuth: function isPrivateSessionAuth(req, res, next) {
        if (!res.isPrivateBlog) {
            return res.redirect(urlService.utils.urlFor('home', true));
        }

        let hash = req.session.token || '',
            salt = req.session.salt || '',
            isVerified = verifySessionHash(salt, hash);

        if (isVerified) {
            // redirect to home if user is already authenticated
            return res.redirect(urlService.utils.urlFor('home', true));
        } else {
            return next();
        }
    },

    authenticateProtection: function authenticateProtection(req, res, next) {
        // if errors have been generated from the previous call
        if (res.error) {
            return next();
        }

        let bodyPass = req.body.password,
            pass = settingsCache.get('password'),
            hasher = crypto.createHash('sha256'),
            salt = Date.now().toString(),
            forward = req.query && req.query.r ? req.query.r : '/';

        if (pass === bodyPass) {
            hasher.update(bodyPass + salt, 'utf8');
            req.session.token = hasher.digest('hex');
            req.session.salt = salt;

            return res.redirect(urlService.utils.urlFor({relativeUrl: decodeURIComponent(forward)}));
        } else {
            res.error = {
                message: common.i18n.t('errors.middleware.privateblogging.wrongPassword')
            };
            return next();
        }
    }
};

module.exports = privateBlogging;
