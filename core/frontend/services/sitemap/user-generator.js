const _ = require('lodash'),
    validator = require('validator'),
    BaseMapGenerator = require('./base-generator');

class UserMapGenerator extends BaseMapGenerator {
    constructor(opts) {
        super();

        this.name = 'authors';
        _.extend(this, opts);
    }

    validateImageUrl(imageUrl) {
        return imageUrl && validator.isURL(imageUrl, {protocols: ['http', 'https'], require_protocol: true});
    }
}

module.exports = UserMapGenerator;
