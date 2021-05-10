const debug = require('ghost-ignition').debug('api:v3:utils:serializers:output:users');
const i18n = require('../../../../../../shared/i18n');
const mapper = require('./utils/mapper');

module.exports = {
    browse(models, apiConfig, frame) {
        debug('browse');

        frame.response = {
            users: models.data.map(model => mapper.mapUser(model, frame)),
            meta: models.meta
        };
    },

    read(model, apiConfig, frame) {
        debug('read');

        frame.response = {
            users: [mapper.mapUser(model, frame)]
        };
    },

    edit() {
        debug('edit');
        this.read(...arguments);
    },

    destroy(filename, apiConfig, frame) {
        debug('destroy');

        frame.response = {
            meta: {
                filename: filename
            }
        };
    },

    changePassword(models, apiConfig, frame) {
        debug('changePassword');

        frame.response = {
            password: [{message: i18n.t('notices.api.users.pwdChangedSuccessfully')}]
        };
    },

    transferOwnership(models, apiConfig, frame) {
        debug('transferOwnership');

        frame.response = {
            users: models.map(model => model.toJSON(frame.options))
        };
    },

    readToken(model, apiConfig, frame) {
        debug('readToken');

        frame.response = {
            apiKey: model.toJSON(frame.options)
        };
    },

    regenerateToken(model, apiConfig, frame) {
        debug('regenerateToken');

        frame.response = {
            apiKey: model.toJSON(frame.options)
        };
    }

};
