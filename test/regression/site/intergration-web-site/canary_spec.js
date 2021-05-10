const should = require('should');
const sinon = require('sinon');
const _ = require('lodash');
const cheerio = require('cheerio');
const testUtils = require('../../../utils');
const mockUtils = require('../../../utils/mocks');
const configUtils = require('../../../utils/configUtils');
const urlUtils = require('../../../utils/urlUtils');
const appService = require('../../../../core/frontend/services/apps');
const frontendSettingsService = require('../../../../core/frontend/services/settings');
const themeEngine = require('../../../../core/frontend/services/theme-engine');
const siteApp = require('../../../../core/server/web/parent/app');

describe('Integration - Web - Site canary', function () {
    let app;

    before(testUtils.integrationTesting.urlService.resetGenerators);
    before(testUtils.teardownDb);
    before(testUtils.setup('users:roles', 'posts'));

    let postSpy;

    describe('default routes.yaml', function () {
        before(function () {
            testUtils.integrationTesting.urlService.resetGenerators();
            testUtils.integrationTesting.defaultMocks(sinon, {amp: true});
            testUtils.integrationTesting.overrideGhostConfig(configUtils);

            return testUtils.integrationTesting.initGhost()
                .then(function () {
                    sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                    sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                    app = siteApp({start: true});
                    return testUtils.integrationTesting.urlServiceInitAndWait();
                })
                .then(() => {
                    return appService.init();
                });
        });

        before(function () {
            configUtils.set('url', 'http://example.com');
            urlUtils.stubUrlUtilsFromConfig();
        });

        beforeEach(function () {
            const postsAPI = require('../../../../core/server/api/canary/posts-public');
            postSpy = sinon.spy(postsAPI.browse, 'query');
        });

        afterEach(function () {
            postSpy.restore();
        });

        after(function () {
            configUtils.restore();
            urlUtils.restore();
            sinon.restore();
        });

        describe('behaviour: default cases', function () {
            it('serve post', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('post');
                    });
            });

            it('serve amp', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/html-ipsum/amp/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.match(/amp\.hbs/);
                        response.body.should.match(/<h1>HTML Ipsum Presents<\/h1>/);
                    });
            });

            it('post not found', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/not-found/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });

            it('serve static page', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/static-page-test/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('page');
                    });
            });

            it('serve author', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/author/joe-bloggs/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('author');

                        $('.author-bio').length.should.equal(1);
                    });
            });

            it('serve tag', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/tag/bacon/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('tag');

                        postSpy.args[0][0].options.filter.should.eql('(tags:\'bacon\'+tags.visibility:public)+type:post');
                        postSpy.args[0][0].options.page.should.eql(1);
                        postSpy.args[0][0].options.limit.should.eql(2);
                    });
            });

            it('serve tag rss', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/tag/bacon/rss/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });

            it('serve collection', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(2);

                        should.exist(response.res.locals.context);
                        should.exist(response.res.locals.version);
                        should.exist(response.res.locals.safeVersion);
                        should.exist(response.res.locals.safeVersion);
                        should.exist(response.res.locals.relativeUrl);
                        should.exist(response.res.locals.secure);
                        should.exist(response.res.routerOptions);
                    });
            });

            it('serve collection: page 2', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/page/2/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(2);
                    });
            });

            it('serve theme asset', function () {
                //configUtils.set('url', 'https://example.com');

                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/assets/css/screen.css',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });
        });

        describe('behaviour: prettify', function () {
            it('url without slash', function () {
                const req = {
                    secure: false,
                    method: 'GET',
                    url: '/prettify-me',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('/prettify-me/');
                    });
            });
        });

        describe('behaviour: url redirects', function () {
            describe('pagination', function () {
                it('redirect /page/1/ to /', function () {
                    const req = {
                        secure: false,
                        host: 'example.com',
                        method: 'GET',
                        url: '/page/1/'
                    };

                    return mockUtils.express.invoke(app, req)
                        .then(function (response) {
                            response.statusCode.should.eql(301);
                            response.headers.location.should.eql('/');
                        });
                });
            });

            describe('rss', function () {
                it('redirect /feed/ to /rss/', function () {
                    const req = {
                        secure: false,
                        host: 'example.com',
                        method: 'GET',
                        url: '/feed/'
                    };

                    return mockUtils.express.invoke(app, req)
                        .then(function (response) {
                            response.statusCode.should.eql(301);
                            response.headers.location.should.eql('/rss/');
                        });
                });
            });
        });
    });

    describe('https', function () {
        before(function () {
            configUtils.set('url', 'https://example.com');
            urlUtils.stubUrlUtilsFromConfig();
        });

        after(function () {
            urlUtils.restore();
            configUtils.restore();
        });

        describe('protocol', function () {
            it('blog is https, request is http', function () {
                const req = {
                    secure: false,
                    host: 'example.com',
                    method: 'GET',
                    url: '/html-ipsum'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('https://example.com/html-ipsum/');
                    });
            });

            it('blog is https, request is http, trailing slash exists already', function () {
                const req = {
                    secure: false,
                    method: 'GET',
                    url: '/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('https://example.com/html-ipsum/');
                    });
            });
        });

        describe('assets', function () {
            it('blog is https, request is http', function () {
                const req = {
                    secure: false,
                    method: 'GET',
                    url: '/favicon.png',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('https://example.com/favicon.png');
                    });
            });

            it('blog is https, request is http', function () {
                const req = {
                    secure: false,
                    method: 'GET',
                    url: '/assets/css/main.css',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('https://example.com/assets/css/main.css');
                    });
            });
        });
    });

    describe('extended routes.yaml: collections', function () {
        describe('2 collections', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {
                        '/': {templates: ['home']}
                    },

                    collections: {
                        '/podcast/': {
                            permalink: '/podcast/:slug/',
                            filter: 'featured:true'
                        },

                        '/something/': {
                            permalink: '/something/:slug/',
                            filter: 'featured:false'
                        }
                    },

                    taxonomies: {
                        tag: '/categories/:slug/',
                        author: '/authors/:slug/'
                    }
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon, {theme: 'test-theme'});

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve static route', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('home');
                    });
            });

            it('serve rss', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/podcast/rss/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });

            it('serve post', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/something/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('post');
                    });
            });

            it('serve collection: podcast with default template', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/podcast/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(2);
                    });
            });

            it('serve collection: something with custom template', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/something/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('something');
                    });
            });
        });

        describe('no collections', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {
                        '/something/': {
                            templates: ['something']
                        }
                    },
                    collections: {},
                    taxonomies: {}
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon, {theme: 'test-theme'});

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve route', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/something/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('something');
                    });
            });
        });

        describe('static permalink route', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {},

                    collections: {
                        '/podcast/': {
                            permalink: '/featured/',
                            filter: 'featured:true'
                        },

                        '/': {
                            permalink: '/:slug/'
                        }
                    },

                    taxonomies: {}
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon);

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve post', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/featured/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        // We can't find a post with the slug "featured"
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });

            it('serve post', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('post');
                    });
            });

            it('serve author', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/author/joe-bloggs/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });

            it('serve tag', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/tag/bacon/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });
        });

        describe('primary author permalink', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {},

                    collections: {
                        '/something/': {
                            permalink: '/:primary_author/:slug/'
                        }
                    },

                    taxonomies: {}
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon);

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve post', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/joe-bloggs/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('post');
                    });
            });

            it('post without author', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });

            it('page', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/static-page-test/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('page');
                    });
            });
        });

        describe('primary tag permalink', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {},

                    collections: {
                        '/something/': {
                            permalink: '/something/:primary_tag/:slug/'
                        }
                    },

                    taxonomies: {}
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon);

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve post', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/something/kitchen-sink/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('post');
                    });
            });

            it('post without tag', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/something/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });

            it('post without tag', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(404);
                        response.template.should.eql('error-404');
                    });
            });

            it('page', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/static-page-test/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('page');
                    });
            });
        });

        describe('collection/routes with data key', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {
                        '/my-page/': {
                            data: {
                                query: {
                                    page: {
                                        controller: 'pagesPublic',
                                        resource: 'pages',
                                        type: 'read',
                                        options: {
                                            slug: 'static-page-test'
                                        }
                                    }
                                },
                                router: {
                                    pages: [{redirect: true, slug: 'static-page-test'}]
                                }
                            },
                            templates: ['page']
                        }
                    },

                    collections: {
                        '/food/': {
                            permalink: '/food/:slug/',
                            filter: 'tag:bacon+tag:-chorizo',
                            data: {
                                query: {
                                    tag: {
                                        controller: 'tagsPublic',
                                        resource: 'tags',
                                        type: 'read',
                                        options: {
                                            slug: 'bacon'
                                        }
                                    }
                                },
                                router: {
                                    tags: [{redirect: true, slug: 'bacon'}]
                                }
                            }
                        },
                        '/sport/': {
                            permalink: '/sport/:slug/',
                            filter: 'tag:chorizo+tag:-bacon',
                            data: {
                                query: {
                                    apollo: {
                                        controller: 'tagsPublic',
                                        resource: 'tags',
                                        type: 'read',
                                        options: {
                                            slug: 'chorizo'
                                        }
                                    }
                                },
                                router: {
                                    tags: [{redirect: false, slug: 'chorizo'}]
                                }
                            }
                        }
                    },

                    taxonomies: {
                        tag: '/categories/:slug/',
                        author: '/authors/:slug/'
                    }
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon);

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve /food/', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/food/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');
                    });
            });

            it('serve bacon tag', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/categories/bacon/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                    });
            });

            it('serve /sport/', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/sport/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');
                    });
            });

            it('serve chorizo tag', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/categories/chorizo/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });

            it('serve my-page', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/my-page/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });
        });
    });

    describe('extended routes.yaml: templates', function () {
        describe('default template, no template', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {},

                    collections: {
                        '/': {
                            permalink: '/:slug/',
                            templates: ['default']
                        },
                        '/magic/': {
                            permalink: '/magic/:slug/'
                        }
                    }
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon);

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve collection', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('default');
                    });
            });

            it('serve second collectiom', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/magic/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');
                    });
            });
        });

        describe('two templates', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {},

                    collections: {
                        '/': {
                            permalink: '/:slug/',
                            templates: ['something', 'default']
                        }
                    }
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon);

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve collection', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('default');
                    });
            });
        });

        describe('home.hbs priority', function () {
            before(function () {
                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {},

                    collections: {
                        '/': {
                            permalink: '/:slug/',
                            templates: ['something', 'default']
                        },
                        '/magic/': {
                            permalink: '/magic/:slug/',
                            templates: ['something', 'default']
                        }
                    }
                });

                testUtils.integrationTesting.urlService.resetGenerators();
                testUtils.integrationTesting.defaultMocks(sinon, {theme: 'test-theme'});

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve collection', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('home');
                    });
            });

            it('serve second page collection: should use index.hbs', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/magic/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.template.should.eql('something');
                    });
            });
        });
    });

    describe('extended routes.yaml: routes', function () {
        describe('channels', function () {
            before(testUtils.integrationTesting.urlService.resetGenerators);
            before(testUtils.teardownDb);
            before(testUtils.setup('users:roles', 'posts'));

            before(function () {
                testUtils.integrationTesting.defaultMocks(sinon, {theme: 'test-theme-channels'});

                sinon.stub(frontendSettingsService, 'get').returns({
                    routes: {
                        '/channel1/': {
                            controller: 'channel',
                            filter: 'tag:kitchen-sink',
                            data: {
                                query: {
                                    tag: {
                                        controller: 'tagsPublic',
                                        resource: 'tags',
                                        type: 'read',
                                        options: {
                                            slug: 'kitchen-sink'
                                        }
                                    }
                                },
                                router: {
                                    tags: [{redirect: true, slug: 'kitchen-sink'}]
                                }
                            }
                        },

                        '/channel2/': {
                            controller: 'channel',
                            filter: 'tag:bacon',
                            data: {
                                query: {
                                    tag: {
                                        controller: 'tagsPublic',
                                        resource: 'tags',
                                        type: 'read',
                                        options: {
                                            slug: 'bacon'
                                        }
                                    }
                                },
                                router: {
                                    tags: [{redirect: true, slug: 'bacon'}]
                                }
                            },
                            templates: ['default']
                        },

                        '/channel3/': {
                            controller: 'channel',
                            filter: 'author:joe-bloggs',
                            data: {
                                query: {
                                    joe: {
                                        controller: 'authorsPublic',
                                        resource: 'authors',
                                        type: 'read',
                                        options: {
                                            slug: 'joe-bloggs',
                                            redirect: false
                                        }
                                    }
                                },
                                router: {
                                    authors: [{redirect: false, slug: 'joe-bloggs'}]
                                }
                            }
                        },

                        '/channel4/': {
                            controller: 'channel',
                            filter: 'author:joe-bloggs'
                        },

                        '/channel5/': {
                            controller: 'channel',
                            data: {
                                query: {
                                    tag: {
                                        controller: 'authorsPublic',
                                        resource: 'authors',
                                        type: 'read',
                                        options: {
                                            slug: 'joe-bloggs',
                                            redirect: false
                                        }
                                    }
                                },
                                router: {
                                    authors: [{redirect: false, slug: 'joe-bloggs'}]
                                }
                            }
                        },

                        '/channel6/': {
                            controller: 'channel',
                            data: {
                                query: {
                                    post: {
                                        controller: 'postsPublic',
                                        resource: 'posts',
                                        type: 'read',
                                        options: {
                                            slug: 'html-ipsum',
                                            redirect: true
                                        }
                                    }
                                },
                                router: {
                                    posts: [{redirect: true, slug: 'html-ipsum'}]
                                }
                            }
                        }
                    },

                    collections: {
                        '/': {
                            permalink: '/:slug/'
                        }
                    },

                    taxonomies: {
                        tag: '/tag/:slug/',
                        author: '/author/:slug/'
                    }
                });

                return testUtils.integrationTesting.initGhost()
                    .then(function () {
                        sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                        sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(10);

                        app = siteApp({start: true});
                        return testUtils.integrationTesting.urlServiceInitAndWait();
                    });
            });

            beforeEach(function () {
                testUtils.integrationTesting.overrideGhostConfig(configUtils);
            });

            afterEach(function () {
                configUtils.restore();
                urlUtils.restore();
            });

            after(function () {
                sinon.restore();
            });

            it('serve channel 1', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel1/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(2);
                    });
            });

            it('serve channel 1: rss', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel1/rss/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                        response.headers['content-type'].should.eql('text/xml; charset=UTF-8');
                    });
            });

            it('serve channel 2', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel2/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('default');

                        // default template does not list posts
                        $('.post-card').length.should.equal(0);
                    });
            });

            it('serve channel 3', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel3/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('channel3');
                    });
            });

            it('serve channel 4', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel4/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(4);
                    });
            });

            it('serve channel 5', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel5/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(4);
                    });
            });

            it('serve channel 6', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/channel6/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        const $ = cheerio.load(response.body);

                        response.statusCode.should.eql(200);
                        response.template.should.eql('index');

                        $('.post-card').length.should.equal(4);
                    });
            });

            it('serve kitching-sink: redirect', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/tag/kitchen-sink/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('/channel1/');
                    });
            });

            it('serve html-ipsum: redirect', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/html-ipsum/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(301);
                        response.headers.location.should.eql('/channel6/');
                    });
            });

            it('serve chorizo: no redirect', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/tag/chorizo/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });

            it('serve joe-bloggs', function () {
                const req = {
                    secure: true,
                    method: 'GET',
                    url: '/author/joe-bloggs/',
                    host: 'example.com'
                };

                return mockUtils.express.invoke(app, req)
                    .then(function (response) {
                        response.statusCode.should.eql(200);
                    });
            });
        });
    });

    describe('extended routes.yaml (5): rss override', function () {
        before(function () {
            sinon.stub(frontendSettingsService, 'get').returns({
                routes: {
                    '/podcast/rss/': {
                        templates: ['podcast/rss'],
                        content_type: 'text/xml'
                    },
                    '/cooking/': {
                        controller: 'channel',
                        rss: false
                    },
                    '/flat/': {
                        controller: 'channel'
                    }
                },

                collections: {
                    '/podcast/': {
                        permalink: '/:slug/',
                        filter: 'featured:true',
                        templates: ['home'],
                        rss: false
                    },
                    '/music/': {
                        permalink: '/:slug/',
                        rss: false
                    },
                    '/': {
                        permalink: '/:slug/'
                    }
                },

                taxonomies: {}
            });

            testUtils.integrationTesting.urlService.resetGenerators();
            testUtils.integrationTesting.defaultMocks(sinon, {theme: 'test-theme'});

            return testUtils.integrationTesting.initGhost()
                .then(function () {
                    sinon.stub(themeEngine.getActive(), 'engine').withArgs('ghost-api').returns('canary');
                    sinon.stub(themeEngine.getActive(), 'config').withArgs('posts_per_page').returns(2);

                    app = siteApp({start: true});
                    return testUtils.integrationTesting.urlServiceInitAndWait();
                });
        });

        beforeEach(function () {
            testUtils.integrationTesting.overrideGhostConfig(configUtils);
        });

        afterEach(function () {
            configUtils.restore();
            urlUtils.restore();
        });

        after(function () {
            sinon.restore();
        });

        it('serve /rss/', function () {
            const req = {
                secure: true,
                method: 'GET',
                url: '/rss/',
                host: 'example.com'
            };

            return mockUtils.express.invoke(app, req)
                .then(function (response) {
                    response.statusCode.should.eql(200);
                });
        });

        it('serve /music/rss/', function () {
            const req = {
                secure: true,
                method: 'GET',
                url: '/music/rss/',
                host: 'example.com'
            };

            return mockUtils.express.invoke(app, req)
                .then(function (response) {
                    response.statusCode.should.eql(404);
                });
        });

        it('serve /cooking/rss/', function () {
            const req = {
                secure: true,
                method: 'GET',
                url: '/cooking/rss/',
                host: 'example.com'
            };

            return mockUtils.express.invoke(app, req)
                .then(function (response) {
                    response.statusCode.should.eql(404);
                });
        });

        it('serve /flat/rss/', function () {
            const req = {
                secure: true,
                method: 'GET',
                url: '/flat/rss/',
                host: 'example.com'
            };

            return mockUtils.express.invoke(app, req)
                .then(function (response) {
                    response.statusCode.should.eql(200);
                });
        });

        it('serve /podcast/rss/', function () {
            const req = {
                secure: true,
                method: 'GET',
                url: '/podcast/rss/',
                host: 'example.com'
            };

            return mockUtils.express.invoke(app, req)
                .then(function (response) {
                    response.statusCode.should.eql(200);
                    response.template.should.eql('podcast/rss');
                    response.headers['content-type'].should.eql('text/xml; charset=utf-8');
                    response.body.match(/<link>/g).length.should.eql(2);
                });
        });

        it('serve /podcast/', function () {
            const req = {
                secure: true,
                method: 'GET',
                url: '/podcast/',
                host: 'example.com'
            };

            return mockUtils.express.invoke(app, req)
                .then(function (response) {
                    const $ = cheerio.load(response.body);
                    response.statusCode.should.eql(200);
                    $('head link')[1].attribs.href.should.eql('https://127.0.0.1:2369/rss/');
                });
        });
    });
});
