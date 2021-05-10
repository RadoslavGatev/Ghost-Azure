const should = require('should');
const sinon = require('sinon');
const Promise = require('bluebird');
const mail = require('../../../../core/server/services/mail');
const settingsCache = require('../../../../core/server/services/settings/cache');
const configUtils = require('../../../utils/configUtils');
const urlUtils = require('../../../../core/shared/url-utils');
const i18n = require('../../../../core/shared/i18n');
let mailer;

// Mock SMTP config
const SMTP = {
    transport: 'SMTP',
    options: {
        service: 'Gmail',
        auth: {
            user: 'nil',
            pass: '123'
        }
    }
};

// test data
const mailDataNoDomain = {
    to: 'joe@doesntexistexample091283zalgo.com',
    subject: 'testemail',
    html: '<p>This</p>'
};

const mailDataNoServer = {
    to: 'joe@example.com',
    subject: 'testemail',
    html: '<p>This</p>'
};

const mailDataIncomplete = {
    subject: 'testemail',
    html: '<p>This</p>'
};

const sandbox = sinon.createSandbox();

i18n.init();

describe('Mail: Ghostmailer', function () {
    afterEach(function () {
        mailer = null;
        configUtils.restore();
        sandbox.restore();
    });

    it('should attach mail provider to ghost instance', function () {
        mailer = new mail.GhostMailer();

        should.exist(mailer);
        mailer.should.have.property('send').and.be.a.Function();
    });

    it('should setup SMTP transport on initialization', function () {
        configUtils.set({mail: SMTP});
        mailer = new mail.GhostMailer();

        mailer.should.have.property('transport');
        mailer.transport.transportType.should.eql('SMTP');
        mailer.transport.sendMail.should.be.a.Function();
    });

    it('should fallback to direct if config is empty', function () {
        configUtils.set({mail: {}});

        mailer = new mail.GhostMailer();

        mailer.should.have.property('transport');
        mailer.transport.transportType.should.eql('DIRECT');
    });

    it('sends valid message successfully ', function (done) {
        configUtils.set({mail: {transport: 'stub'}});

        mailer = new mail.GhostMailer();

        mailer.transport.transportType.should.eql('STUB');

        mailer.send(mailDataNoServer).then(function (response) {
            should.exist(response.message);
            should.exist(response.envelope);
            response.envelope.to.should.containEql('joe@example.com');

            done();
        }).catch(done);
    });

    it('handles failure', function (done) {
        configUtils.set({mail: {transport: 'stub', options: {error: 'Stub made a boo boo :('}}});

        mailer = new mail.GhostMailer();

        mailer.transport.transportType.should.eql('STUB');

        mailer.send(mailDataNoServer).then(function () {
            done(new Error('Stub did not error'));
        }).catch(function (error) {
            error.message.should.containEql('Stub made a boo boo :(');
            done();
        }).catch(done);
    });

    it('should fail to send messages when given insufficient data', function (done) {
        mailer = new mail.GhostMailer();

        Promise.all([
            mailer.send().reflect(),
            mailer.send({}).reflect(),
            mailer.send({subject: '123'}).reflect(),
            mailer.send({subject: '', html: '123'}).reflect()
        ]).then(function (descriptors) {
            descriptors.forEach(function (d) {
                d.isFulfilled().should.be.false();
                d.reason().should.be.an.instanceOf(Error);
                d.reason().message.should.eql('Incomplete message data.');
            });
            done();
        }).catch(done);
    });

    describe('Direct', function () {
        beforeEach(function () {
            configUtils.set({mail: {}});

            mailer = new mail.GhostMailer();
        });

        afterEach(function () {
            mailer = null;
        });

        it('return correct failure message for domain doesn\'t exist', function (done) {
            mailer.transport.transportType.should.eql('DIRECT');

            mailer.send(mailDataNoDomain).then(function () {
                done(new Error('Error message not shown.'));
            }, function (error) {
                error.message.should.startWith('Failed to send email.');
                done();
            }).catch(done);
        });

        it('return correct failure message for no mail server at this address', function (done) {
            mailer.transport.transportType.should.eql('DIRECT');

            mailer.send(mailDataNoServer).then(function () {
                done(new Error('Error message not shown.'));
            }, function (error) {
                error.message.should.startWith('Failed to send email.');
                done();
            }).catch(done);
        });

        it('return correct failure message for incomplete data', function (done) {
            mailer.transport.transportType.should.eql('DIRECT');

            mailer.send(mailDataIncomplete).then(function () {
                done(new Error('Error message not shown.'));
            }, function (error) {
                error.message.should.eql('Incomplete message data.');
                done();
            }).catch(done);
        });
    });

    describe('From address', function () {
        it('should use the config', async function () {
            configUtils.set({
                mail: {
                    from: '"Blog Title" <static@example.com>'
                }
            });

            mailer = new mail.GhostMailer();

            sandbox.stub(mailer, 'sendMail').resolves();
            mailer.transport.transportType = 'NOT DIRECT';

            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"Blog Title" <static@example.com>');
        });

        describe('should fall back to [blog.title] <noreply@[blog.url]>', function () {
            beforeEach(async function () {
                mailer = new mail.GhostMailer();
                sandbox.stub(mailer, 'sendMail').resolves();
                mailer.transport.transportType = 'NOT DIRECT';
                sandbox.stub(settingsCache, 'get').returns('Test');
            });

            it('standard domain', async function () {
                sandbox.stub(urlUtils, 'urlFor').returns('http://default.com');
                configUtils.set({mail: {from: null}});

                await mailer.send({
                    to: 'user@example.com',
                    subject: 'subject',
                    html: 'content'
                });

                mailer.sendMail.firstCall.args[0].from.should.equal('"Test" <noreply@default.com>');
            });

            it('trailing slash', async function () {
                sandbox.stub(urlUtils, 'urlFor').returns('http://default.com/');
                configUtils.set({mail: {from: null}});

                await mailer.send({
                    to: 'user@example.com',
                    subject: 'subject',
                    html: 'content'
                });

                mailer.sendMail.firstCall.args[0].from.should.equal('"Test" <noreply@default.com>');
            });

            it('strip port', async function () {
                sandbox.stub(urlUtils, 'urlFor').returns('http://default.com:2368/');
                configUtils.set({mail: {from: null}});

                await mailer.send({
                    to: 'user@example.com',
                    subject: 'subject',
                    html: 'content'
                });

                mailer.sendMail.firstCall.args[0].from.should.equal('"Test" <noreply@default.com>');
            });

            it('Escape title', async function () {
                settingsCache.get.restore();
                sandbox.stub(settingsCache, 'get').returns('Test"');

                sandbox.stub(urlUtils, 'urlFor').returns('http://default.com:2368/');
                configUtils.set({mail: {from: null}});

                await mailer.send({
                    to: 'user@example.com',
                    subject: 'subject',
                    html: 'content'
                });

                mailer.sendMail.firstCall.args[0].from.should.equal('"Test\\"" <noreply@default.com>');
            });
        });

        it('should use mail.from', async function () {
            // Standard domain
            configUtils.set({mail: {from: '"bar" <from@default.com>'}});

            mailer = new mail.GhostMailer();

            sandbox.stub(mailer, 'sendMail').resolves();
            mailer.transport.transportType = 'NOT DIRECT';

            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"bar" <from@default.com>');
        });

        it('should attach blog title', async function () {
            sandbox.stub(settingsCache, 'get').returns('Test');

            configUtils.set({mail: {from: 'from@default.com'}});

            mailer = new mail.GhostMailer();

            sandbox.stub(mailer, 'sendMail').resolves();
            mailer.transport.transportType = 'NOT DIRECT';

            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"Test" <from@default.com>');

            // only from set
            configUtils.set({mail: {from: 'from@default.com'}});

            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"Test" <from@default.com>');
        });

        it('should ignore theme title if from address is Title <email@address.com> format', async function () {
            configUtils.set({mail: {from: '"R2D2" <from@default.com>'}});

            mailer = new mail.GhostMailer();

            sandbox.stub(mailer, 'sendMail').resolves();
            mailer.transport.transportType = 'NOT DIRECT';

            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"R2D2" <from@default.com>');

            // only from set
            configUtils.set({mail: {from: '"R2D2" <from@default.com>'}});
            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"R2D2" <from@default.com>');
        });

        it('should use default title if not theme title is provided', async function () {
            configUtils.set({mail: {from: null}});
            sandbox.stub(urlUtils, 'urlFor').returns('http://default.com:2368/');

            mailer = new mail.GhostMailer();

            sandbox.stub(mailer, 'sendMail').resolves();
            mailer.transport.transportType = 'NOT DIRECT';

            await mailer.send({
                to: 'user@example.com',
                subject: 'subject',
                html: 'content'
            });

            mailer.sendMail.firstCall.args[0].from.should.equal('"Ghost at default.com" <noreply@default.com>');
        });
    });
});
