const request = require('@tryghost/request');
const debug = require('debug')('@tryghost/http-stream');
const GhostError = require('@tryghost/errors');

class HttpStream {
    constructor(config) {
        this.config = config;
    }

    async write(data) {
        try {
            if (typeof data !== 'object') {
                throw new GhostError.IncorrectUsageError({message: 'Type Error: Http transport requires log data to be an object'});
            }

            let body = { 
                ...this.config,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };

            return await request(this.config.url, body);
        } catch (error) {
            debug('Failed to ship log', error.message);
            return false;
        }
    }
}

module.exports = HttpStream;