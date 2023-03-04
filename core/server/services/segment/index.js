const _ = require('lodash');
const Analytics = require('analytics-node');
const logging = require('@tryghost/logging');

const config = require('../../../shared/config');
const sentry = require('../../../shared/sentry');

// Listens to model events to layer on analytics - also uses the "fake" theme.uploaded event from the theme API
const events = require('../../lib/common/events');

module.exports.init = function () {
    const analytics = new Analytics(config.get('segment:key'));
    const trackDefaults = config.get('segment:trackDefaults') || {};
    const prefix = config.get('segment:prefix') || '';

    const toTrack = [
        {
            event: 'post.published',
            name: 'Post Published'
        },
        {
            event: 'page.published',
            name: 'Page Published'
        },
        {
            event: 'theme.uploaded',
            name: 'Theme Uploaded',
            // {keyOnSuppliedEventData: keyOnTrackedEventData}
            // - used to extract specific properties from event data and give them meaningful names
            data: {name: 'name'}
        },
        {
            event: 'integration.added',
            name: 'Custom Integration Added'
        }
    ];

    _.each(toTrack, function (track) {
        events.on(track.event, function (eventData = {}) {
            // extract desired properties from eventData and rename keys if necessary
            const data = _.mapValues(track.data || {}, v => eventData[v]);

            try {
                analytics.track(_.extend(trackDefaults, data, {event: prefix + track.name}));
            } catch (err) {
                logging.error(err);
                sentry.captureException(err);
            }
        });
    });
};
