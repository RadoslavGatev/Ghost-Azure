const _ = require('lodash');
const debug = require('@tryghost/debug')('api:endpoints:utils:serializers:output:config');

module.exports = {
    all(data, apiConfig, frame) {
        debug('all');

        const keys = [
            'version',
            'environment',
            'database',
            'mail',
            'useGravatar',
            'labs',
            'clientExtensions',
            'enableDeveloperExperiments',
            'stripeDirect',
            'mailgunIsConfigured',
            'emailAnalytics',
            'hostSettings',
            'tenor',
            'editor'
        ];

        frame.response = {
            config: _.pick(data, keys)
        };
    }
};
