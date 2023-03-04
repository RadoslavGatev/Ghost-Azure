const BlogIcon = require('./blog-icon');
const CachedImageSizeFromUrl = require('./cached-image-size-from-url');
const Gravatar = require('./gravatar');
const ImageSize = require('./image-size');

class ImageUtils {
    constructor({config, urlUtils, settingsCache, storageUtils, storage, validator, request, cacheStore}) {
        this.blogIcon = new BlogIcon({config, urlUtils, settingsCache, storageUtils});
        this.imageSize = new ImageSize({config, storage, storageUtils, validator, urlUtils, request});
        this.cachedImageSizeFromUrl = new CachedImageSizeFromUrl({
            getImageSizeFromUrl: this.imageSize.getImageSizeFromUrl.bind(this.imageSize),
            cache: cacheStore
        });
        this.gravatar = new Gravatar({config, request});
    }
}

module.exports = ImageUtils;
