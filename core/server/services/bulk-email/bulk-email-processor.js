const _ = require('lodash');
const Promise = require('bluebird');
const moment = require('moment-timezone');
const errors = require('@tryghost/errors');
const tpl = require('@tryghost/tpl');
const logging = require('@tryghost/logging');
const models = require('../../models');
const MailgunClient = require('@tryghost/mailgun-client');
const sentry = require('../../../shared/sentry');
const debug = require('@tryghost/debug')('mega');
const postEmailSerializer = require('../mega/post-email-serializer');
const configService = require('../../../shared/config');
const settingsCache = require('../../../shared/settings-cache');

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const messages = {
    error: 'The email service received an error from mailgun and was unable to send.'
};

const mailgunClient = new MailgunClient({config: configService, settings: settingsCache});

/**
 * An object representing batch request result
 * @typedef { Object } BatchResultBase
 * @property { string } data - data that is returned from Mailgun or one which Mailgun was called with
 */
class BatchResultBase {
    constructor(id) {
        this.id = id;
    }
}

class SuccessfulBatch extends BatchResultBase { }

class FailedBatch extends BatchResultBase {
    constructor(id, error) {
        super(...arguments);
        error.originalMessage = error.message;

        if (error.statusCode >= 500) {
            error.message = 'Email service is currently unavailable - please try again';
        } else if (error.statusCode === 401) {
            error.message = 'Email failed to send - please verify your credentials';
        } else if (error.message && error.message.toLowerCase().includes('dmarc')) {
            error.message = 'Unable to send email from domains implementing strict DMARC policies';
        } else if (error.message.includes(`'to' parameter is not a valid address`)) {
            error.message = 'Recipient is not a valid address';
        } else {
            error.message = `Email failed to send "${error.originalMessage}" - please verify your email settings`;
        }

        this.error = error;
    }
}

/**
 * An email address
 * @typedef { string } EmailAddress
 */

/**
 * An object representing an email to send
 * @typedef { Object } Email
 * @property { string } html - The html content of the email
 * @property { string } subject - The subject of the email
 */

module.exports = {
    BATCH_SIZE: MailgunClient.BATCH_SIZE,
    SuccessfulBatch,
    FailedBatch,

    // accepts an ID rather than an Email model to better support running via a job queue
    async processEmail({emailModel, options}) {
        const knexOptions = _.pick(options, ['transacting', 'forUpdate']);
        const emailId = emailModel.get('id');

        // get batch IDs via knex to avoid model instantiation
        // only fetch pending or failed batches to avoid re-sending previously sent emails
        const batchIds = await models.EmailBatch
            .getFilteredCollectionQuery({filter: `email_id:${emailId}+status:[pending,failed]`}, knexOptions)
            .select('id', 'member_segment');

        const batchResults = await Promise.map(batchIds, async ({id: emailBatchId, member_segment: memberSegment}) => {
            try {
                await this.processEmailBatch({emailBatchId, options, memberSegment});
                return new SuccessfulBatch(emailBatchId);
            } catch (error) {
                return new FailedBatch(emailBatchId, error);
            }
        }, {concurrency: 2});

        const successes = batchResults.filter(response => (response instanceof SuccessfulBatch));
        const failures = batchResults.filter(response => (response instanceof FailedBatch));
        const emailStatus = failures.length ? 'failed' : 'submitted';

        let error;

        if (failures.length) {
            error = failures[0].error.message;
        }

        if (error && error.length > 2000) {
            error = error.substring(0, 2000);
        }

        try {
            await models.Email.edit({
                status: emailStatus,
                results: JSON.stringify(successes),
                error: error,
                error_data: JSON.stringify(failures) // NOTE: need to discuss how we store this
            }, {
                id: emailModel.id
            });
        } catch (err) {
            sentry.captureException(err);
            logging.error(err);
        }

        return batchResults;
    },

    // accepts an ID rather than an EmailBatch model to better support running via a job queue
    async processEmailBatch({emailBatchId, options, memberSegment}) {
        logging.info('[sendEmailJob] Processing email batch ' + emailBatchId);

        const knexOptions = _.pick(options, ['transacting', 'forUpdate']);

        const emailBatchModel = await models.EmailBatch
            .findOne({id: emailBatchId}, Object.assign({}, knexOptions, {withRelated: 'email'}));

        if (!emailBatchModel) {
            throw new errors.IncorrectUsageError({
                message: 'Provided email_batch id does not match a known email_batch record',
                context: {
                    id: emailBatchId
                }
            });
        }

        if (!['pending','failed'].includes(emailBatchModel.get('status'))) {
            throw new errors.IncorrectUsageError({
                message: 'Email batches can only be processed when in the "pending" or "failed" state',
                context: `Email batch "${emailBatchId}" has state "${emailBatchModel.get('status')}"`
            });
        }

        // Patch to prevent saving the related email model
        await emailBatchModel.save({status: 'submitting'}, {...knexOptions, patch: true});

        try {
            // get recipient rows via knex to avoid costly bookshelf model instantiation
            let recipientRows = await models.EmailRecipient.getFilteredCollectionQuery({filter: `batch_id:${emailBatchId}`}, knexOptions);

            // For an unknown reason, the returned recipient rows is sometimes an empty array
            // refs https://github.com/TryGhost/Team/issues/2246
            let counter = 0;
            while (recipientRows.length === 0 && counter < 5) {
                logging.info('[sendEmailJob] Found zero recipients [retries:' + counter + '] for email batch ' + emailBatchId);

                counter += 1;
                await sleep(200);
                recipientRows = await models.EmailRecipient.getFilteredCollectionQuery({filter: `batch_id:${emailBatchId}`}, knexOptions);
            }
            if (counter > 0) {
                logging.info('[sendEmailJob] Recovered recipients [retries:' + counter + '] for email batch ' + emailBatchId + ' - ' + recipientRows.length + ' recipients found');
            }

            // Load newsletter data on email
            await emailBatchModel.relations.email.getLazyRelation('newsletter', {require: false, ...knexOptions});

            // Load post data on email - for content gating on paywall
            await emailBatchModel.relations.email.getLazyRelation('post', {require: false, ...knexOptions});

            // send the email
            const sendResponse = await this.send(emailBatchModel.relations.email.toJSON(), recipientRows, memberSegment);

            logging.info('[sendEmailJob] Submitted email batch ' + emailBatchId);

            // update batch success status
            return await emailBatchModel.save({
                status: 'submitted',
                provider_id: sendResponse.id.trim().replace(/^<|>$/g, '')
            }, Object.assign({}, knexOptions, {patch: true}));
        } catch (error) {
            logging.info('[sendEmailJob] Failed email batch ' + emailBatchId);

            // update batch failed status
            await emailBatchModel.save({status: 'failed'}, {...knexOptions, patch: true});

            // log any error that didn't come from the provider which would have already logged it
            if (!error.code || error.code !== 'BULK_EMAIL_SEND_FAILED') {
                let ghostError = new errors.EmailError({
                    err: error,
                    code: 'BULK_EMAIL_SEND_FAILED',
                    message: `Error sending email batch ${emailBatchId}`,
                    context: error.message
                });
                sentry.captureException(ghostError);
                logging.error(ghostError);
                throw ghostError;
            }

            throw error;
        } finally {
            // update all email recipients with a processed_at
            await models.EmailRecipient
                .where({batch_id: emailBatchId})
                .save({processed_at: moment()}, Object.assign({}, knexOptions, {autoRefresh: false, patch: true}));
        }
    },

    /**
     * @param {Email-like} emailData - The email to send, must be a POJO so emailModel.toJSON() before calling if needed
     * @param {EmailRecipient[]} recipients - The recipients to send the email to with their associated data
     * @param {string?} memberSegment - The member segment of the recipients
     * @returns {Promise<Object>} - {providerId: 'xxx'}
     */
    async send(emailData, recipients, memberSegment) {
        logging.info(`[sendEmailJob] Sending email batch to ${recipients.length} recipients`);

        const mailgunConfigured = mailgunClient.isConfigured();
        if (!mailgunConfigured) {
            logging.warn('Bulk email has not been configured');
            return;
        }

        const startTime = Date.now();
        debug(`sending message to ${recipients.length} recipients`);

        // Update email content for this segment before searching replacements
        emailData = postEmailSerializer.renderEmailForSegment(emailData, memberSegment);

        // Check all the used replacements in this email
        const replacements = postEmailSerializer.parseReplacements(emailData);

        // collate static and dynamic data for each recipient ready for provider
        const recipientData = {};
        const newsletterUuid = emailData.newsletter ? emailData.newsletter.uuid : null;
        recipients.forEach((recipient) => {
            // static data for every recipient
            const data = {
                unique_id: recipient.member_uuid,
                unsubscribe_url: postEmailSerializer.createUnsubscribeUrl(recipient.member_uuid, {newsletterUuid})
            };

            // computed properties on recipients - TODO: better way of handling these
            recipient.member_first_name = (recipient.member_name || '').split(' ')[0];

            // dynamic data from replacements
            replacements.forEach(({id, recipientProperty, fallback}) => {
                data[id] = recipient[recipientProperty] || fallback || '';
            });

            recipientData[recipient.member_email] = data;
        });

        try {
            const response = await mailgunClient.send(emailData, recipientData, replacements);
            debug(`sent message (${Date.now() - startTime}ms)`);
            logging.info(`[sendEmailJob] Sent message (${Date.now() - startTime}ms)`);
            return response;
        } catch (err) {
            let ghostError = new errors.EmailError({
                err,
                message: tpl(messages.error),
                context: `Mailgun Error ${err.error.status}: ${err.error.details}`,
                // REF: possible mailgun errors https://documentation.mailgun.com/en/latest/api-intro.html#errors
                help: `https://ghost.org/docs/newsletters/#bulk-email-configuration`,
                code: 'BULK_EMAIL_SEND_FAILED'
            });

            sentry.captureException(ghostError);
            logging.error(ghostError);

            debug(`failed to send message (${Date.now() - startTime}ms)`);
            throw ghostError;
        }
    },

    // NOTE: for testing only!
    _mailgunClient: mailgunClient
};
