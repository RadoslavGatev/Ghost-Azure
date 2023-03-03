const ElasticSearch = require('./elasticsearch');

class ElasticSearchBunyan {
    constructor(clientConfig, indexConfig) {
        this.client = new ElasticSearch(clientConfig);
        this.index = indexConfig;
    }

    async write(data) {
        await this.client.index({
            body: data,
            ...this.index
        });
    }
}

module.exports = ElasticSearchBunyan;