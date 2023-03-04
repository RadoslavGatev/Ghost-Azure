const sentryDSN = process.env.SENTRY_DSN;

const expressNoop = function (req, res, next) {
    next();
};

if (sentryDSN) {
    const Sentry = require('@sentry/node');
    const version = require('../../package.json').version;
    Sentry.init({
        dsn: sentryDSN,
        release: 'gscan@' + version,
        environment: process.env.NODE_ENV
    });

    module.exports = {
        requestHandler: Sentry.Handlers.requestHandler(),
        errorHandler: Sentry.Handlers.errorHandler()
    };
} else {
    module.exports = {
        requestHandler: expressNoop,
        errorHandler: expressNoop
    };
}
