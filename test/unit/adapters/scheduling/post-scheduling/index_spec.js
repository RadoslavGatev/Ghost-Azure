const errors = require('@tryghost/errors');
const should = require('should');
const sinon = require('sinon');
const Promise = require('bluebird');
const moment = require('moment');
const testUtils = require('../../../../utils');
const models = require('../../../../../core/server/models');
const events = require('../../../../../core/server/lib/common/events');
const api = require('../../../../../core/server/api');
const schedulingUtils = require('../../../../../core/server/adapters/scheduling/utils');
const SchedulingDefault = require('../../../../../core/server/adapters/scheduling/SchedulingDefault');
const postScheduling = require('../../../../../core/server/adapters/scheduling/post-scheduling');
const urlUtils = require('../../../../../core/shared/url-utils');

// NOTE: to be unskiped and corrected once default scheduler code is migrated
describe.skip('Scheduling: Post Scheduling', function () {
    const scope = {
        events: {},
        scheduledPosts: [],
        apiUrl: 'localhost:1111/',
        client: null,
        post: null
    };

    before(function () {
        models.init();
    });

    beforeEach(function () {
        scope.client = models.Client.forge(testUtils.DataGenerator.forKnex.createClient({slug: 'ghost-scheduler'}));
        scope.post = models.Post.forge(testUtils.DataGenerator.forKnex.createPost({
            id: 1337,
            mobiledoc: testUtils.DataGenerator.markdownToMobiledoc('something')
        }));

        scope.adapter = new SchedulingDefault();

        sinon.stub(api.schedules, 'getScheduledPosts').callsFake(function () {
            return Promise.resolve({posts: scope.scheduledPosts});
        });

        sinon.stub(schedulingUtils, 'createAdapter').returns(Promise.resolve(scope.adapter));

        sinon.stub(models.Client, 'findOne').callsFake(function () {
            return Promise.resolve(scope.client);
        });

        sinon.spy(scope.adapter, 'schedule');
        sinon.spy(scope.adapter, 'reschedule');
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('fn:init', function () {
        describe('success', function () {
            it('will be scheduled', function (done) {
                postScheduling.init({
                    apiUrl: scope.apiUrl
                }).then(function () {
                    scope.events['post.scheduled'](scope.post);
                    scope.adapter.schedule.called.should.eql(true);

                    scope.adapter.schedule.calledWith({
                        time: moment(scope.post.get('published_at')).valueOf(),
                        url: urlUtils.urlJoin(scope.apiUrl, 'schedules', 'posts', scope.post.get('id')) + '?client_id=' + scope.client.get('slug') + '&client_secret=' + scope.client.get('secret'),
                        extra: {
                            httpMethod: 'PUT',
                            oldTime: null
                        }
                    }).should.eql(true);

                    done();
                }).catch(done);
            });

            it('will load scheduled posts from database', function (done) {
                scope.scheduledPosts = [
                    models.Post.forge(testUtils.DataGenerator.forKnex.createPost({status: 'scheduled'})),
                    models.Post.forge(testUtils.DataGenerator.forKnex.createPost({status: 'scheduled'}))
                ];

                postScheduling.init({
                    apiUrl: scope.apiUrl
                }).then(function () {
                    scope.adapter.reschedule.calledTwice.should.eql(true);
                    done();
                }).catch(done);
            });
        });

        describe('error', function () {
            it('no url passed', function (done) {
                postScheduling.init()
                    .catch(function (err) {
                        should.exist(err);
                        (err instanceof errors.IncorrectUsageError).should.eql(true);
                        done();
                    });
            });
        });
    });
});
