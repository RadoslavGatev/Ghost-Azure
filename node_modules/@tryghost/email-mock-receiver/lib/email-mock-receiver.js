const assert = require('assert');
const {AssertionError} = require('assert');

class EmailMockReceiver {
    #sendResponse;
    #snapshotManager;
    #snapshots = [];

    constructor({snapshotManager, sendResponse = 'Mail is disabled'}) {
        this.#snapshotManager = snapshotManager;
        this.#sendResponse = sendResponse;
    }

    /**
     * Method mocking email sending logic
     *
     * @param {Object} message
     * @param {string} message.subject - email subject
     * @param {string} message.html - email content
     * @param {string} message.to - email recipient address
     * @param {string} [message.replyTo]
     * @param {string} [message.from] - sender email address
     * @param {string} [message.text] - text version of this message
     */
    async send(message) {
        // store snapshot
        this.#snapshots.push(message);

        return this.#sendResponse;
    }

    sentEmailCount(count) {
        assert.equal(this.#snapshots.length, count, 'Email count does not match');
    }

    matchHTMLSnapshot(snapshotIndex = 0) {
        const error = new AssertionError({});

        let assertion = {
            properties: null,
            field: 'html',
            hint: `[html ${snapshotIndex + 1}]`,
            error
        };

        this.#snapshotManager.assertSnapshot({
            html: this.#snapshots[snapshotIndex].html
        }, assertion);

        return this;
    }

    matchMetadataSnapshot(snapshotIndex = 0, properties = {}) {
        const error = new AssertionError({});
        let assertion = {
            properties: properties,
            field: 'metadata',
            hint: `[metadata ${snapshotIndex + 1}]`,
            error
        };

        const metadata = Object.assign({}, this.#snapshots[snapshotIndex]);
        delete metadata.html;

        this.#snapshotManager.assertSnapshot({
            metadata
        }, assertion);

        return this;
    }

    reset() {
        this.#snapshots = [];
    }
}

module.exports = EmailMockReceiver;
