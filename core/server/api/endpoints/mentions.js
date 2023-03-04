const mentions = require('../../services/mentions');

module.exports = {
    docName: 'mentions',
    browse: {
        options: [
            'filter',
            'fields',
            'limit',
            'order',
            'page',
            'debug',
            'unique'
        ],
        permissions: true,
        query(frame) {
            return mentions.controller.browse(frame);
        }
    },

    receive: {
        statusCode: 202, // Required for the spec because we don't have a status page
        headers: {},
        options: [],
        permissions: false,
        response: {
            format: 'plain'
        },
        async query(frame) {
            await mentions.controller.receive(frame);
            return null;
        }
    }
};
