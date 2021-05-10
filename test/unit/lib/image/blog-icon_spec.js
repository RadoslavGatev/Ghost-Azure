const should = require('should');
const sinon = require('sinon');
const _ = require('lodash');
const path = require('path');
const BlogIcon = require('../../../../core/server/lib/image/blog-icon');

describe('lib/image: blog icon', function () {
    describe('getIconUrl', function () {
        it('custom uploaded ico blog icon', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {
                urlFor: (key, boolean) => [key, boolean]
            }, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return '/content/images/2017/04/my-icon.ico';
                    }
                }
            }});
            blogIcon.getIconUrl().should.deepEqual([{relativeUrl: '/favicon.ico'}, undefined]);
        });

        it('custom uploaded png blog icon', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {
                urlFor: (key, boolean) => [key, boolean]
            }, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return '/content/images/2017/04/my-icon.png';
                    }
                }
            }});
            blogIcon.getIconUrl().should.deepEqual([{relativeUrl: '/favicon.png'}, undefined]);
        });

        it('default ico blog icon', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {
                urlFor: key => key
            }, settingsCache: {
                get: () => {}
            }});
            blogIcon.getIconUrl().should.deepEqual({relativeUrl: '/favicon.ico'});
        });

        describe('absolute URL', function () {
            it('custom uploaded ico blog icon', function () {
                const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {
                    urlFor: (key, boolean) => [key, boolean]
                }, settingsCache: {
                    get: (key) => {
                        if (key === 'icon') {
                            return '/content/images/2017/04/my-icon.ico';
                        }
                    }
                }});
                blogIcon.getIconUrl(true).should.deepEqual([{relativeUrl: '/favicon.ico'}, true]);
            });

            it('custom uploaded png blog icon', function () {
                const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {
                    urlFor: (key, boolean) => [key, boolean]
                }, settingsCache: {
                    get: (key) => {
                        if (key === 'icon') {
                            return '/content/images/2017/04/my-icon.png';
                        }
                    }
                }});
                blogIcon.getIconUrl(true).should.deepEqual([{relativeUrl: '/favicon.png'}, true]);
            });

            it('default ico blog icon', function () {
                const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {
                    urlFor: (key, boolean) => [key, boolean]
                }, settingsCache: {
                    get: () => {}
                }});
                blogIcon.getIconUrl(true).should.deepEqual([{relativeUrl: '/favicon.ico'}, true]);
            });
        });
    });

    describe('getIconPath', function () {
        it('custom uploaded ico blog icon', function () {
            const stub = sinon.stub();
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {
                getLocalFileStoragePath: stub
            }, urlUtils: {}, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return '/content/images/2017/04/my-icon.ico';
                    }
                }
            }});

            blogIcon.getIconPath();
            stub.calledOnce.should.be.true();
        });

        it('custom uploaded png blog icon', function () {
            const stub = sinon.stub();
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {
                getLocalFileStoragePath: stub
            }, urlUtils: {}, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return '/content/images/2017/04/my-icon.png';
                    }
                }
            }});

            blogIcon.getIconPath();
            stub.calledOnce.should.be.true();
        });

        it('default ico blog icon', function () {
            const root = '/home/test';
            const blogIcon = new BlogIcon({config: {
                get: (key) => {
                    if (key === 'paths:publicFilePath') {
                        return root;
                    }
                }
            }, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {
                get: () => {}
            }});
            blogIcon.getIconPath().should.eql(path.join(root, 'favicon.ico'));
        });
    });

    describe('isIcoImageType', function () {
        it('returns true, if icon is .ico filetype', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.isIcoImageType('icon.ico').should.be.true();
        });

        it('returns false, if icon is not .ico filetype', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.isIcoImageType('icon.png').should.be.false();
        });

        it('returns true, if icon is .ico filetype when using settingsCache', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return 'icon.ico';
                    }
                }
            }});
            blogIcon.isIcoImageType().should.be.true();
        });

        it('returns false, if icon is not .ico filetype when using settingsCache', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return 'icon.png';
                    }
                }
            }});
            blogIcon.isIcoImageType().should.be.false();
        });
    });

    describe('getIconType', function () {
        it('returns x-icon for ico icons', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.getIconType('favicon.ico').should.eql('x-icon');
        });

        it('returns png for png icon', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.getIconType('favicon.png').should.eql('png');
        });

        it('returns x-icon for ico icons when the icon is cached', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return 'favicon.ico';
                    }
                }
            }});
            blogIcon.getIconType().should.eql('x-icon');
        });

        it('returns png for png icon when the icon is cached', function () {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {
                get: (key) => {
                    if (key === 'icon') {
                        return 'favicon.png';
                    }
                }
            }});
            blogIcon.getIconType().should.eql('png');
        });
    });

    describe('getIconDimensions', function () {
        it('[success] returns .ico dimensions', function (done) {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.getIconDimensions(path.join(__dirname, '../../../utils/fixtures/images/favicon.ico'))
                .then(function (result) {
                    should.exist(result);
                    result.should.eql({
                        width: 48,
                        height: 48
                    });
                    done();
                }).catch(done);
        });

        it('[success] returns .png dimensions', function (done) {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.getIconDimensions(path.join(__dirname, '../../../utils/fixtures/images/favicon.png'))
                .then(function (result) {
                    should.exist(result);
                    result.should.eql({
                        width: 100,
                        height: 100
                    });
                    done();
                }).catch(done);
        });

        it('[success] returns .ico dimensions for icon with multiple sizes', function (done) {
            const blogIcon = new BlogIcon({config: {}, i18n: {}, storageUtils: {}, urlUtils: {}, settingsCache: {}});
            blogIcon.getIconDimensions(path.join(__dirname, '../../../utils/fixtures/images/favicon_multi_sizes.ico'))
                .then(function (result) {
                    should.exist(result);
                    result.should.eql({
                        width: 64,
                        height: 64
                    });
                    done();
                }).catch(done);
        });

        it('[failure] return error message', function (done) {
            const blogIcon = new BlogIcon({config: {}, i18n: {
                t: key => key
            }, storageUtils: {}, urlUtils: {}, settingsCache: {}});

            blogIcon.getIconDimensions(path.join(__dirname, '../../../utils/fixtures/images/favicon_multi_sizes_FILE_DOES_NOT_EXIST.ico'))
                .catch(function (error) {
                    should.exist(error);
                    error.message.should.eql('errors.utils.blogIcon.error');
                    done();
                });
        });
    });
});
