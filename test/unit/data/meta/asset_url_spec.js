const should = require('should');
const sinon = require('sinon');
const rewire = require('rewire');
const imageLib = require('../../../../core/server/lib/image');
const settingsCache = require('../../../../core/server/services/settings/cache');
const configUtils = require('../../../utils/configUtils');
const urlUtils = require('../../../utils/urlUtils');
const config = configUtils.config;

const getAssetUrl = rewire('../../../../core/frontend/meta/asset_url');

describe('getAssetUrl', function () {
    afterEach(function () {
        configUtils.restore();
        sinon.restore();
    });

    it('should return asset url with just context', function () {
        const testUrl = getAssetUrl('myfile.js');
        testUrl.should.equal('/assets/myfile.js?v=' + config.get('assetHash'));
    });

    it('should return asset url with just context even with leading /', function () {
        const testUrl = getAssetUrl('/myfile.js');
        testUrl.should.equal('/assets/myfile.js?v=' + config.get('assetHash'));
    });

    it('should not add asset to url if ghost.css for default templates', function () {
        const testUrl = getAssetUrl('public/ghost.css');
        testUrl.should.equal('/public/ghost.css?v=' + config.get('assetHash'));
    });

    it('should not add asset to url has public in it', function () {
        const testUrl = getAssetUrl('public/myfile.js');
        testUrl.should.equal('/public/myfile.js?v=' + config.get('assetHash'));
    });

    describe('favicon', function () {
        it('should not add asset to url if favicon.ico', function () {
            const testUrl = getAssetUrl('favicon.ico');
            testUrl.should.equal('/favicon.ico');
        });

        it('should not add asset to url if favicon.png', function () {
            const testUrl = getAssetUrl('favicon.png');
            testUrl.should.equal('/favicon.ico');
        });

        it('should correct favicon path for custom png', function () {
            sinon.stub(settingsCache, 'get').withArgs('icon').returns('/content/images/2017/04/my-icon.png');
            const testUrl = getAssetUrl('favicon.ico');
            testUrl.should.equal('/favicon.png');
        });
    });

    describe('minify', function () {
        it('should return asset minified url when hasMinFile & useMinFiles are both set to true', function () {
            configUtils.set('useMinFiles', true);
            const testUrl = getAssetUrl('myfile.js', true);
            testUrl.should.equal('/assets/myfile.min.js?v=' + config.get('assetHash'));
        });

        it('should NOT return asset minified url when hasMinFile true but useMinFiles is false', function () {
            configUtils.set('useMinFiles', false);
            const testUrl = getAssetUrl('myfile.js', true);
            testUrl.should.equal('/assets/myfile.js?v=' + config.get('assetHash'));
        });

        it('should NOT return asset minified url when hasMinFile false but useMinFiles is true', function () {
            configUtils.set('useMinFiles', true);
            const testUrl = getAssetUrl('myfile.js', false);
            testUrl.should.equal('/assets/myfile.js?v=' + config.get('assetHash'));
        });

        it('should not add min to anything besides the last .', function () {
            configUtils.set('useMinFiles', true);
            const testUrl = getAssetUrl('test.page/myfile.js', true);
            testUrl.should.equal('/assets/test.page/myfile.min.js?v=' + config.get('assetHash'));
        });
    });

    describe('with /blog subdirectory', function () {
        beforeEach(function () {
            getAssetUrl.__set__('urlUtils', urlUtils.getInstance({url: 'http://localhost:65535/blog'}));
        });

        it('should return asset url with just context', function () {
            const testUrl = getAssetUrl('myfile.js');
            testUrl.should.equal('/blog/assets/myfile.js?v=' + config.get('assetHash'));
        });

        it('should return asset url with just context even with leading /', function () {
            const testUrl = getAssetUrl('/myfile.js');
            testUrl.should.equal('/blog/assets/myfile.js?v=' + config.get('assetHash'));
        });

        it('should not add asset to url if ghost.css for default templates', function () {
            const testUrl = getAssetUrl('public/ghost.css');
            testUrl.should.equal('/blog/public/ghost.css?v=' + config.get('assetHash'));
        });

        it('should not add asset to url has public in it', function () {
            const testUrl = getAssetUrl('public/myfile.js');
            testUrl.should.equal('/blog/public/myfile.js?v=' + config.get('assetHash'));
        });

        describe('favicon', function () {
            it('should not add asset to url if favicon.ico', function () {
                sinon.stub(imageLib.blogIcon, 'getIconUrl').returns('/blog/favicon.ico');
                const testUrl = getAssetUrl('favicon.ico');
                testUrl.should.equal('/blog/favicon.ico');
            });

            it('should not add asset to url if favicon.png', function () {
                sinon.stub(imageLib.blogIcon, 'getIconUrl').returns('/blog/favicon.ico');
                const testUrl = getAssetUrl('favicon.png');
                testUrl.should.equal('/blog/favicon.ico');
            });

            it('should return correct favicon path for custom png', function () {
                sinon.stub(imageLib.blogIcon, 'getIconUrl').returns('/blog/favicon.png');
                sinon.stub(settingsCache, 'get').withArgs('icon').returns('/content/images/2017/04/my-icon.png');
                const testUrl = getAssetUrl('favicon.ico');
                testUrl.should.equal('/blog/favicon.png');
            });
        });

        describe('minify', function () {
            it('should return asset minified url when hasMinFile & useMinFiles are both set to true', function () {
                configUtils.set('useMinFiles', true);
                const testUrl = getAssetUrl('myfile.js', true);
                testUrl.should.equal('/blog/assets/myfile.min.js?v=' + config.get('assetHash'));
            });

            it('should NOT return asset minified url when hasMinFile true but useMinFiles is false', function () {
                configUtils.set('useMinFiles', false);
                const testUrl = getAssetUrl('myfile.js', true);
                testUrl.should.equal('/blog/assets/myfile.js?v=' + config.get('assetHash'));
            });

            it('should NOT return asset minified url when hasMinFile false but useMinFiles is true', function () {
                configUtils.set('useMinFiles', true);
                const testUrl = getAssetUrl('myfile.js', false);
                testUrl.should.equal('/blog/assets/myfile.js?v=' + config.get('assetHash'));
            });

            it('should not add min to anything besides the last .', function () {
                configUtils.set('useMinFiles', true);
                const testUrl = getAssetUrl('test.page/myfile.js', true);
                testUrl.should.equal('/blog/assets/test.page/myfile.min.js?v=' + config.get('assetHash'));
            });
        });
    });
});
