'use strict';

var EventEmitter = require('events').EventEmitter,
    emits = require('emits'),
    html = require('htmlparser2'),
    domutils = require('domutils'),
    util = require('util'),
    uuid = require('uuid'),
    async = require('async'),
    url = require('url'),
    request = require('request-promise'),
    probeImageSize = require('probe-image-size'),
    _ = require('lodash'),
    sizeOf = require('image-size'),
    validator = require('validator'),
    helpers = require('./helpers'),
    DEFAULTS = {
        'amp-img': {
            layout: 'responsive',
            width: 600,
            height: 400
        },
        'amp-anim': {
            layout: 'responsive',
            width: 600,
            height: 400
        },
        'amp-iframe': {
            layout: 'responsive',
            width: 600,
            height: 400,
            sandbox: 'allow-scripts allow-same-origin'
        },
        'amp-youtube': {
            layout: 'responsive',
            width: 600,
            height: 400
        },
        'request_timeout': 3000
    };

// these are formats supported by image-size but not probe-image-size
const FETCH_ONLY_FORMATS = [
    'cur', 'icns', 'ico', 'dds'
];

/**
* Amperizer constructor. Borrows from Minimize.
*
* https://github.com/Swaagie/minimize/blob/4b815e274a424ca89551d28c4e0dd8b06d9bbdc2/lib/minimize.js#L15
*
* @constructor
* @param {Object} options Options object
* @api public
*/
function Amperize(options) {
    this.config = _.merge({}, DEFAULTS, options || {});
    this.emits = emits;

    this.htmlParser = new html.Parser(
        new html.DomHandler(this.emits('read'))
    );
}

util.inherits(Amperize, EventEmitter);

/**
* Parse the content and call the callback. Borrowed from Minimize.
*
* https://github.com/Swaagie/minimize/blob/4b815e274a424ca89551d28c4e0dd8b06d9bbdc2/lib/minimize.js#L51
*
* @param {String} content HTML
* @param {Function} callback
* @api public
*/
Amperize.prototype.parse = function parse(content, callback) {
    var id;

    if (typeof callback !== 'function') {
        throw new Error('No callback provided');
    }

    id = uuid.v4();

    this.once('read', this.amperizer.bind(this, id));
    this.once('parsed: ' + id, callback);

    this.htmlParser.parseComplete(content);
};

/**
* Turn a traversible DOM into string content. Borrowed from Minimize.
*
* https://github.com/Swaagie/minimize/blob/4b815e274a424ca89551d28c4e0dd8b06d9bbdc2/lib/minimize.js#L74
*
* @param {String} id
* @param {Object} error
* @param {Object} dom Traversible DOM object
* @api private
*/
Amperize.prototype.amperizer = function amperizer(id, error, dom) {
    if (error) {
        throw new Error('Amperizer failed to parse DOM', error);
    }

    this.traverse(dom, '', this.emits('parsed: ' + id));
};

/**
* Reduce the traversible DOM object to a string. Borrows from Minimize.
*
* https://github.com/Swaagie/minimize/blob/4b815e274a424ca89551d28c4e0dd8b06d9bbdc2/lib/minimize.js#L90
*
* @param {Array} data
* @param {String} html Compiled HTML contents
* @param {Function} done Callback function
* @api private
*/
Amperize.prototype.traverse = async function traverse(data, html, done) {
    var self = this;
    var imageSizeCache = {};

    var requestOptions = {
        // We need the user-agent, otherwise some https request may fail (e. g. cloudfare)
        headers: {
            'User-Agent': 'Mozilla/5.0 Safari/537.36'
        },
        timeout: self.config['request_timeout'],
        encoding: null
    };

    // check if element.width is smaller than 300 px. In that case, we shouldn't use
    // layout="responsive", because the media element will be stretched and it doesn't
    // look nice. Use layout="fixed" instead to fix that.
    function setLayoutAttribute(element) {
        var layout = element.attribs.width < 300 ? layout = 'fixed' : self.config[element.name].layout;
        element.attribs.layout = !element.attribs.layout ? layout : element.attribs.layout;
    }

    // Certain component src attribute must be with 'https' protocol otherwise it will not
    // get validated by AMP. If we're unable to replace it, we will deal with the valitation
    // error, but at least we tried.
    function useSecureSchema(element) {
        if (element.attribs && element.attribs.src) {
            if (element.attribs.src.indexOf('https://') === -1) {
                if (element.attribs.src.indexOf('http://') === 0) {
                    // Replace 'http' with 'https', so the validation passes
                    element.attribs.src = element.attribs.src.replace(/^http:\/\//i, 'https://');
                } else if (element.attribs.src.indexOf('//') === 0) {
                    // Giphy embedded iFrames are without protocol and start with '//', so at least
                    // we can fix those cases.
                    element.attribs.src = 'https:' + element.attribs.src;
                }
            }
        }
    }

    // probe will fetch the minimal amount of data needed to determine
    // the image dimensions so it's more performant than a full fetch
    function _probeImageSize(url) {
        return probeImageSize(
            url,
            requestOptions
        ).then(function (result) {
            imageSizeCache[url] = result;
            return result;
        });
    }

    // fetch the full image before reading dimensions using image-size,
    // it's slower but has better format support
    function _fetchImageSize(url) {
        return request(
            url,
            requestOptions
        ).then(function (response) {
            var result = sizeOf(response);
            imageSizeCache[url] = result;
            return result;
        });
    }

    // select appropriate method to get image size
    function _getImageSize(url) {
        // use cached image size if we've already seen this url
        if (imageSizeCache[url]) {
            return Promise.resolve(imageSizeCache[url]);
        }

        // fetch full image for formats we can't probe
        const extensionMatch = url.match(/(?:\.)([a-zA-Z]{3,4})(\?|$)/) || [];
        const extension = (extensionMatch[1] || '').toLowerCase();
        if (FETCH_ONLY_FORMATS.includes(extension)) {
            return _fetchImageSize(url);
        }

        // probe partial image everything else
        return _probeImageSize(url);
    }

    // convert <img> to <amp-img> or <amp-anim>, fetching dimensions of
    // external images. If anything fails leave the element as an <img>
    function amperizeImageElem(element) {
        return async function() {
            if (!element.attribs || !element.attribs.src) {
                return;
            }

            var src = url.parse(element.attribs.src).href;

            // when we have a gif it should be <amp-anim>.
            element.name = src.match(/(\.gif$)/) ? 'amp-anim' : 'amp-img';

            if (src.indexOf('http') === 0) {
                // external image, fetch real dimensions
                try {
                    if (!validator.isURL(src)) {
                        element.name = 'img';
                        return;
                    }

                    var dimensions = await _getImageSize(src);

                    // CASE: `.ico` files might have multiple images and therefore multiple sizes.
                    // We return the largest size found (image-size default is the first size found)
                    if (dimensions.images) {
                        dimensions.width = _.maxBy(dimensions.images, function (w) {return w.width;}).width;
                        dimensions.height = _.maxBy(dimensions.images, function (h) {return h.height;}).height;
                    }

                    if (!dimensions.width || !dimensions.height) {
                        element.name = 'img';
                        return;
                    }

                    element.attribs.width = dimensions.width;
                    element.attribs.height = dimensions.height;

                } catch (err) {
                    element.name = 'img';
                    return;
                }
            } else {
                // local image, use default fallback
                element.attribs.width = self.config[element.name].width;
                element.attribs.height = self.config[element.name].height;
            }

            if (!element.attribs.layout) {
                setLayoutAttribute(element);
            }
        }
    }



    // convert all of the img elements first so that we can perform lengthy
    // network requests in parallel before sequentially traversing the DOM
    if (self.config['amp-img']) {
        var imgTest = function(elem) {
            return elem.name === 'img' && elem.attribs.src;
        }
        var imgElems = domutils.findAll(elem => imgTest(elem), data);
        var imgTasks = imgElems.map(elem => amperizeImageElem(elem));
        await async.parallelLimit(imgTasks, 10);
    }

    // sequentially traverse the DOM
    async.reduce(data, html, function reduce(html, element, step) {
        var children;

        if (/(style|script|textarea|link)/.test(element.name)) {
            return step(null, html);
        }

        function close(error, html) {
            html += helpers.close(element);
            step(null, html);
        }

        function enter() {
            children = element.children;
            html += helpers[element.type](element);

            if (!children || !children.length) {
                return close(null, html);
            }

            setImmediate(function delay() {
                traverse.call(self, children, html, close);
            });
        }

        if (element.name === 'iframe') {
            if (!element.attribs.src) {
                return enter();
            }

            var youtubeId = element.attribs.src.match(/^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}).*/);
            useSecureSchema(element);

            if (youtubeId) {
                element.name = 'amp-youtube';
                element.attribs['data-videoid'] = youtubeId[4];
                delete element.attribs.src;
                delete element.attribs.sandbox;
                delete element.attribs.allowfullscreen;
                delete element.attribs.allow;
                delete element.attribs.frameborder;
            } else {
                element.name = 'amp-iframe';
                element.attribs.sandbox = !element.attribs.sandbox ? self.config['amp-iframe'].sandbox : element.attribs.sandbox;
            }

            if (element.attribs.hasOwnProperty('frameborder')) {
                element.attribs.frameborder = element.attribs.frameborder === '0' ? '0' : '1';
            }

            if (element.attribs.hasOwnProperty('scrolling')) {
                element.attribs.scrolling = element.attribs.scrolling === '0' ? '0' : '1';
            }

            if (element.attribs.hasOwnProperty('allowfullscreen')) {
                if (element.attribs.allowfullscreen === 'false') {
                    delete element.attribs.allowfullscreen;
                } else {
                    element.attribs.allowfullscreen = '';
                }
            }

            if (element.attribs.hasOwnProperty('allowtransparency')) {
                if (element.attribs.allowtransparency === 'false') {
                    delete element.attribs.allowtransparency;
                } else {
                    element.attribs.allowtransparency = '';
                }
            }

            if (!element.attribs.width || !element.attribs.height || !element.attribs.layout) {
                element.attribs.width = !element.attribs.width ? self.config['amp-iframe'].width : element.attribs.width;
                element.attribs.height = !element.attribs.height ? self.config['amp-iframe'].height : element.attribs.height;
                setLayoutAttribute(element);
            }
        }

        if (element.name === 'audio') {
            element.name = 'amp-audio';
            useSecureSchema(element);
        }

        if (element.attribs && element.attribs.src && element.parent && element.parent.name === 'amp-audio') {
            useSecureSchema(element);
        }

        return enter();
    }, done);
};

module.exports = Amperize;
