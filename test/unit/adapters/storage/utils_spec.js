const should = require('should');
const sinon = require('sinon');
const urlUtils = require('../../../../core/shared/url-utils');

// Stuff we are testing
const storageUtils = require('../../../../core/server/adapters/storage/utils');

describe('storage utils', function () {
    let urlForStub;
    let urlGetSubdirStub;

    beforeEach(function () {
        urlForStub = sinon.stub();
    });

    afterEach(function () {
        sinon.restore();
    });

    describe('fn: getLocalFileStoragePath', function () {
        it('should return local file storage path for absolute URL', function () {
            const url = 'http://myblog.com/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.getLocalFileStoragePath(url);
            should.exist(result);
            result.should.be.equal('/2017/07/ghost-logo.png');
        });

        // Very unlikely that this is necessary, because Ghost will redirect the request beforehand.
        // See https://github.com/TryGhost/Ghost/blob/master/core/server/web/shared/middlewares/url-redirects.js#L76
        // TODO: Change the code to make this test work
        it.skip('should return local file storage path for https request, when blog setup as http', function () {
            const url = 'https://myblog.com/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.getLocalFileStoragePath(url);
            should.exist(result);
            result.should.be.equal('/2017/07/ghost-logo.png');
        });

        it('should return local file storage path for absolute URL with subdirectory', function () {
            const url = 'http://myblog.com/blog/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('/blog');

            result = storageUtils.getLocalFileStoragePath(url);
            should.exist(result);
            result.should.be.equal('/2017/07/ghost-logo.png');
        });

        it('should return local file storage path for relative URL', function () {
            const filePath = '/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.getLocalFileStoragePath(filePath);
            should.exist(result);
            result.should.be.equal('/2017/07/ghost-logo.png');
        });

        it('should return local file storage path for relative URL with subdirectory', function () {
            const filePath = '/blog/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('/blog');

            result = storageUtils.getLocalFileStoragePath(filePath);
            should.exist(result);
            result.should.be.equal('/2017/07/ghost-logo.png');
        });

        it('should not sanitize URL if not local file storage', function () {
            const url = 'http://example-blog.com/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.getLocalFileStoragePath(url);
            should.exist(result);
            result.should.be.equal('http://example-blog.com/ghost-logo.png');
        });
    });

    describe('fn: isLocalImage', function () {
        it('should return true when absolute URL and local file', function () {
            const url = 'http://myblog.com/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.isLocalImage(url);
            should.exist(result);
            result.should.be.equal(true);
        });

        // Very unlikely that this is necessary, because Ghost will redirect the request beforehand.
        // See https://github.com/TryGhost/Ghost/blob/master/core/server/web/shared/middlewares/url-redirects.js#L76
        // TODO: Change the code to make this test work
        it.skip('should return local file storage path for https request, when blog setup as http', function () {
            const url = 'https://myblog.com/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.isLocalImage(url);
            should.exist(result);
            result.should.be.equal(true);
        });

        it('should return true when absolute URL with subdirectory and local file', function () {
            const url = 'http://myblog.com/blog/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('/blog');

            result = storageUtils.isLocalImage(url);
            should.exist(result);
            result.should.be.equal(true);
        });

        it('should return true when relative URL and local file', function () {
            const url = '/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.isLocalImage(url);
            should.exist(result);
            result.should.be.equal(true);
        });

        it('should return true when relative URL and local file', function () {
            const url = '/blog/content/images/2017/07/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('/blog');

            result = storageUtils.isLocalImage(url);
            should.exist(result);
            result.should.be.equal(true);
        });

        it('should return false when no local file', function () {
            const url = 'http://somewebsite.com/ghost-logo.png';
            let result;

            urlForStub = sinon.stub(urlUtils, 'urlFor');
            urlForStub.withArgs('home').returns('http://myblog.com/');
            urlGetSubdirStub = sinon.stub(urlUtils, 'getSubdir');
            urlGetSubdirStub.returns('');

            result = storageUtils.isLocalImage(url);
            should.exist(result);
            result.should.be.equal(false);
        });
    });
});
