const debug = require('ghost-ignition').debug('api:v2:utils:serializers:output:integrations');
const mapper = require('./utils/mapper');

module.exports = {
    browse({data, meta}, apiConfig, frame) {
        debug('browse');

        frame.response = {
            integrations: data.map(model => mapper.mapIntegration(model, frame)),
            meta
        };
    },
    read(model, apiConfig, frame) {
        debug('read');

        frame.response = {
            integrations: [mapper.mapIntegration(model, frame)]
        };
    },
    add(model, apiConfig, frame) {
        debug('add');

        frame.response = {
            integrations: [mapper.mapIntegration(model, frame)]
        };
    },
    edit(model, apiConfig, frame) {
        debug('edit');

        frame.response = {
            integrations: [mapper.mapIntegration(model, frame)]
        };
    }
};

