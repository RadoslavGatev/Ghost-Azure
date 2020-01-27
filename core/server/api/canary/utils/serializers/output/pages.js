const debug = require('ghost-ignition').debug('api:canary:utils:serializers:output:pages');
const mapper = require('./utils/mapper');

module.exports = {
    all(models, apiConfig, frame) {
        debug('all');

        // CASE: e.g. destroy returns null
        if (!models) {
            return;
        }

        if (models.meta) {
            frame.response = {
                pages: models.data.map(model => mapper.mapPage(model, frame)),
                meta: models.meta
            };

            return;
        }

        frame.response = {
            pages: [mapper.mapPage(models, frame)]
        };
    }
};
