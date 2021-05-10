const _ = require('lodash');
const should = require('should');
const supertest = require('supertest');
const ObjectId = require('bson-objectid');
const moment = require('moment-timezone');
const testUtils = require('../../../../utils');
const config = require('../../../../../core/shared/config');
const models = require('../../../../../core/server/models');
const localUtils = require('./utils');
const ghost = testUtils.startGhost;
let request;

describe('Posts API (canary)', function () {
    let ghostServer;
    let ownerCookie;

    before(function () {
        return ghost()
            .then(function (_ghostServer) {
                ghostServer = _ghostServer;
                request = supertest.agent(config.get('url'));
            })
            .then(function () {
                return localUtils.doAuth(request, 'users:extra', 'posts', 'emails');
            })
            .then(function (cookie) {
                ownerCookie = cookie;
            });
    });

    describe('Browse', function () {
        it('fields & formats combined', function (done) {
            request.get(localUtils.API.getApiQuery('posts/?formats=mobiledoc,html&fields=id,title'))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse.posts);
                    localUtils.API.checkResponse(jsonResponse, 'posts');
                    jsonResponse.posts.should.have.length(13);

                    localUtils.API.checkResponse(
                        jsonResponse.posts[0],
                        'post',
                        null,
                        null,
                        ['mobiledoc', 'id', 'title', 'html']
                    );

                    localUtils.API.checkResponse(jsonResponse.meta.pagination, 'pagination');

                    done();
                });
        });

        it('combined fields, formats, include and non existing', function (done) {
            request.get(localUtils.API.getApiQuery('posts/?formats=mobiledoc,html,plaintext&fields=id,title,primary_tag,doesnotexist&include=authors,tags,email'))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse.posts);
                    localUtils.API.checkResponse(jsonResponse, 'posts');
                    jsonResponse.posts.should.have.length(13);

                    localUtils.API.checkResponse(
                        jsonResponse.posts[0],
                        'post',
                        null,
                        null,
                        ['mobiledoc', 'plaintext', 'id', 'title', 'html', 'authors', 'tags', 'primary_tag', 'email']
                    );

                    localUtils.API.checkResponse(jsonResponse.meta.pagination, 'pagination');

                    done();
                });
        });

        it('can filter by fields coming from posts_meta table non null meta_description', function (done) {
            request.get(localUtils.API.getApiQuery(`posts/?filter=meta_description:-null`))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse.posts);
                    localUtils.API.checkResponse(jsonResponse, 'posts');
                    jsonResponse.posts.should.have.length(2);
                    jsonResponse.posts.forEach((post) => {
                        should.notEqual(post.meta_description, null);
                    });

                    localUtils.API.checkResponse(
                        jsonResponse.posts[0],
                        'post'
                    );

                    localUtils.API.checkResponse(jsonResponse.meta.pagination, 'pagination');

                    done();
                });
        });

        it('can filter by fields coming from posts_meta table by value', function (done) {
            request.get(localUtils.API.getApiQuery(`posts/?filter=meta_description:'meta description for short and sweet'`))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse.posts);
                    localUtils.API.checkResponse(jsonResponse, 'posts');
                    jsonResponse.posts.should.have.length(1);
                    jsonResponse.posts[0].id.should.equal(testUtils.DataGenerator.Content.posts[2].id);
                    jsonResponse.posts[0].meta_description.should.equal('meta description for short and sweet');

                    localUtils.API.checkResponse(
                        jsonResponse.posts[0],
                        'post'
                    );

                    localUtils.API.checkResponse(jsonResponse.meta.pagination, 'pagination');

                    done();
                });
        });

        it('can order by fields coming from posts_meta table', function (done) {
            request.get(localUtils.API.getApiQuery('posts/?order=meta_description%20ASC'))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse.posts);
                    localUtils.API.checkResponse(jsonResponse, 'posts');
                    jsonResponse.posts.should.have.length(13);

                    should.equal(jsonResponse.posts[0].meta_description, null);
                    jsonResponse.posts[12].slug.should.equal('short-and-sweet');
                    jsonResponse.posts[12].meta_description.should.equal('meta description for short and sweet');

                    localUtils.API.checkResponse(
                        jsonResponse.posts[0],
                        'post'
                    );

                    localUtils.API.checkResponse(jsonResponse.meta.pagination, 'pagination');

                    done();
                });
        });

        it('can order by email open rate', async function () {
            try {
                await testUtils.createEmailedPost({
                    postOptions: {
                        post: {
                            slug: '80-open-rate'
                        }
                    },
                    emailOptions: {
                        email: {
                            email_count: 100,
                            opened_count: 80,
                            track_opens: true
                        }
                    }
                });

                await testUtils.createEmailedPost({
                    postOptions: {
                        post: {
                            slug: '60-open-rate'
                        }
                    },
                    emailOptions: {
                        email: {
                            email_count: 100,
                            opened_count: 60,
                            track_opens: true
                        }
                    }
                });
            } catch (err) {
                if (_.isArray(err)) {
                    throw err[0];
                }
                throw err;
            }

            await request.get(localUtils.API.getApiQuery('posts/?order=email.open_rate%20DESC'))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .then((res) => {
                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse.posts);
                    localUtils.API.checkResponse(jsonResponse, 'posts');
                    jsonResponse.posts.should.have.length(15);

                    jsonResponse.posts[0].slug.should.equal('80-open-rate', 'DESC 1st');
                    jsonResponse.posts[1].slug.should.equal('60-open-rate', 'DESC 2nd');

                    localUtils.API.checkResponse(jsonResponse.meta.pagination, 'pagination');
                });

            await request.get(localUtils.API.getApiQuery('posts/?order=email.open_rate%20ASC'))
                .set('Origin', config.get('url'))
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .then((res) => {
                    const jsonResponse = res.body;
                    jsonResponse.posts[0].slug.should.equal('60-open-rate', 'ASC 1st');
                    jsonResponse.posts[1].slug.should.equal('80-open-rate', 'ASC 2nd');
                });
        });
    });

    describe('Read', function () {
        it('can\'t retrieve non existent post', function (done) {
            request.get(localUtils.API.getApiQuery(`posts/${ObjectId().toHexString()}/`))
                .set('Origin', config.get('url'))
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(404)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }

                    should.not.exist(res.headers['x-cache-invalidate']);
                    const jsonResponse = res.body;
                    should.exist(jsonResponse);
                    should.exist(jsonResponse.errors);
                    testUtils.API.checkResponseValue(jsonResponse.errors[0], [
                        'message',
                        'context',
                        'type',
                        'details',
                        'property',
                        'help',
                        'code',
                        'id'
                    ]);
                    done();
                });
        });
    });

    describe('Add', function () {
        it('adds default title when it is missing', function () {
            return request
                .post(localUtils.API.getApiQuery('posts/'))
                .set('Origin', config.get('url'))
                .send({
                    posts: [{
                        title: ''
                    }]
                })
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(201)
                .then((res) => {
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].title);
                    res.body.posts[0].title.should.equal('(Untitled)');

                    should.exist(res.headers.location);
                    res.headers.location.should.equal(`http://127.0.0.1:2369${localUtils.API.getApiQuery('posts/')}${res.body.posts[0].id}/`);
                });
        });
    });

    describe('Edit', function () {
        it('published_at = null', function () {
            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                published_at: null,
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    // @NOTE: if you set published_at to null and the post is published, we set it to NOW in model layer
                    should.exist(res.headers['x-cache-invalidate']);
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].published_at);
                });
        });

        it('html to plaintext', function () {
            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/?source=html&formats=html,plaintext'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                html: '<p>HTML Ipsum presents</p>',
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    return models.Post.findOne({
                        id: res.body.posts[0].id
                    }, testUtils.context.internal);
                })
                .then((model) => {
                    model.get('plaintext').should.equal('HTML Ipsum presents');
                });
        });

        it('canonical_url', function () {
            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                canonical_url: `/canonical/url`,
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].canonical_url);
                    res.body.posts[0].canonical_url.should.equal(`${config.get('url')}/canonical/url`);
                });
        });

        it('update dates & x_by', function () {
            const post = {
                created_by: ObjectId().toHexString(),
                updated_by: ObjectId().toHexString(),
                created_at: moment().add(2, 'days').format(),
                updated_at: moment().add(2, 'days').format()
            };

            return request
                .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                .set('Origin', config.get('url'))
                .send({posts: [post]})
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(200)
                .then((res) => {
                    // @NOTE: you cannot modify these fields above manually, that's why the resource won't change.
                    should.not.exist(res.headers['x-cache-invalidate']);

                    return models.Post.findOne({
                        id: res.body.posts[0].id
                    }, testUtils.context.internal);
                })
                .then((model) => {
                    // We expect that the changed properties aren't changed, they are still the same than before.
                    model.get('created_at').toISOString().should.not.eql(post.created_at);
                    model.get('updated_by').should.not.eql(post.updated_by);
                    model.get('created_by').should.not.eql(post.created_by);

                    // `updated_at` is automatically set, but it's not the date we send to override.
                    model.get('updated_at').toISOString().should.not.eql(post.updated_at);
                });
        });

        it('Can change scheduled post', function () {
            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[7].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    res.body.posts[0].status.should.eql('scheduled');

                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[7].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                title: 'change scheduled post',
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.exist(res.headers['x-cache-invalidate']);
                });
        });

        it('trims title', function () {
            const untrimmedTitle = '  test trimmed update title  ';

            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                title: untrimmedTitle,
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].title);
                    res.body.posts[0].title.should.equal(untrimmedTitle.trim());
                });
        });

        it('strips invisible unicode from slug', function () {
            const slug = 'this-is\u0008-invisible';

            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                slug: slug,
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].slug);
                    res.body.posts[0].slug.should.equal('this-is-invisible');
                });
        });

        it('accepts visibility parameter', function () {
            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                visibility: 'members',
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].visibility);
                    res.body.posts[0].visibility.should.equal('members');
                });
        });

        it('changes to post_meta fields triggers a cache invalidation', function () {
            return request
                .get(localUtils.API.getApiQuery(`posts/${testUtils.DataGenerator.Content.posts[0].id}/`))
                .set('Origin', config.get('url'))
                .expect(200)
                .then((res) => {
                    return request
                        .put(localUtils.API.getApiQuery('posts/' + testUtils.DataGenerator.Content.posts[0].id + '/'))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                meta_title: 'changed meta title',
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.exist(res.headers['x-cache-invalidate']);

                    should.exist(res.body.posts);
                    should.equal(res.body.posts[0].meta_title, 'changed meta title');
                });
        });

        it('saving post with no modbiledoc content doesn\t trigger cache invalidation', function () {
            return request
                .post(localUtils.API.getApiQuery('posts/'))
                .set('Origin', config.get('url'))
                .send({
                    posts: [{
                        title: 'Has a title by no other content',
                        status: 'published'
                    }]
                })
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(201)
                .then((res) => {
                    should.exist(res.body.posts);
                    should.exist(res.body.posts[0].title);
                    res.body.posts[0].title.should.equal('Has a title by no other content');
                    should.equal(res.body.posts[0].html, undefined);
                    should.equal(res.body.posts[0].plaintext, undefined);

                    return request
                        .put(localUtils.API.getApiQuery(`posts/${res.body.posts[0].id}/`))
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                title: res.body.posts[0].title,
                                mobilecdoc: res.body.posts[0].mobilecdoc,
                                updated_at: res.body.posts[0].updated_at
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(200);
                })
                .then((res) => {
                    should.not.exist(res.headers['x-cache-invalidate']);

                    should.exist(res.body.posts);
                    res.body.posts[0].title.should.equal('Has a title by no other content');
                    should.equal(res.body.posts[0].html, undefined);
                    should.equal(res.body.posts[0].plaintext, undefined);
                });
        });

        it('errors with invalid email recipient filter', function () {
            return request
                .post(localUtils.API.getApiQuery('posts/'))
                .set('Origin', config.get('url'))
                .send({
                    posts: [{
                        title: 'Ready to be emailed',
                        status: 'draft'
                    }]
                })
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(201)
                .then((res) => {
                    return request
                        .put(`${localUtils.API.getApiQuery(`posts/${res.body.posts[0].id}/`)}?email_recipient_filter=not a filter`)
                        .set('Origin', config.get('url'))
                        .send({
                            posts: [{
                                title: res.body.posts[0].title,
                                mobilecdoc: res.body.posts[0].mobilecdoc,
                                updated_at: res.body.posts[0].updated_at,
                                status: 'published'
                            }]
                        })
                        .expect('Content-Type', /json/)
                        .expect('Cache-Control', testUtils.cacheRules.private)
                        .expect(400);
                })
                .then((res) => {
                    res.text.should.match(/invalid filter/i);
                });
        });
    });

    describe('Destroy', function () {
        it('non existent post', function () {
            return request
                .del(localUtils.API.getApiQuery('posts/' + ObjectId().toHexString() + '/'))
                .set('Origin', config.get('url'))
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect('Cache-Control', testUtils.cacheRules.private)
                .expect(404)
                .then((res) => {
                    should.not.exist(res.headers['x-cache-invalidate']);
                    should.exist(res.body);
                    should.exist(res.body.errors);
                    testUtils.API.checkResponseValue(res.body.errors[0], [
                        'message',
                        'context',
                        'type',
                        'details',
                        'property',
                        'help',
                        'code',
                        'id'
                    ]);
                });
        });
    });
});
