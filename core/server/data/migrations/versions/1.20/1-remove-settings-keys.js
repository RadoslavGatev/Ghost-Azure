const _ = require('lodash'),
    models = require('../../../../models'),
    common = require('../../../../lib/common');

module.exports.config = {
    transaction: true
};

module.exports.up = function removeSettingKeys(options) {
    let localOptions = _.merge({
        context: {internal: true}
    }, options);

    return models.Settings.findOne({key: 'display_update_notification'}, localOptions)
        .then(function (settingsModel) {
            if (!settingsModel) {
                common.logging.warn('Deleted Settings Key `display_update_notification`.');
                return;
            }

            common.logging.info('Deleted Settings Key `display_update_notification`.');
            return models.Settings.destroy(_.merge({id: settingsModel.id}, localOptions));
        })
        .then(function () {
            return models.Settings.findOne({key: 'seen_notifications'}, localOptions);
        })
        .then(function (settingsModel) {
            if (!settingsModel) {
                common.logging.warn('Deleted Settings Key `seen_notifications`.');
                return;
            }

            common.logging.info('Deleted Settings Key `seen_notifications`.');
            return models.Settings.destroy(_.merge({id: settingsModel.id}, localOptions));
        });
};

module.exports.down = function addSettingsKeys(options) {
    let localOptions = _.merge({
        context: {internal: true}
    }, options);

    return models.Settings.findOne({key: 'display_update_notification'}, localOptions)
        .then(function (settingsModel) {
            if (settingsModel) {
                common.logging.warn('Added Settings Key `display_update_notification`.');
                return;
            }

            common.logging.info('Added Settings Key `display_update_notification`.');
            return models.Settings.forge({key: 'display_update_notification'}).save(null, localOptions);
        })
        .then(function () {
            return models.Settings.findOne({key: 'seen_notifications'}, localOptions);
        })
        .then(function (settingsModel) {
            if (settingsModel) {
                common.logging.warn('Added Settings Key `seen_notifications`.');
                return;
            }

            common.logging.info('Added Settings Key `seen_notifications`.');
            return models.Settings.forge({key: 'seen_notifications', value: '[]'}).save([], localOptions);
        });
};
