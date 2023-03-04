const jsonStringifySafe = require('json-stringify-safe');

try {
    const allSettled = require('promise.allsettled');
    allSettled.shim();
} catch (err) {
    // no-op - shim not required
}

/**
 * @description Metric shipper class built on the loggingrc config used in Ghost projects
 */
class GhostMetrics {
    /**
     * Properties in the options bag:
     *
     * domain:             Metadata for metrics in shared databases.
     * mode:               Is used to print short or long log - used for stdout shipper.
     * metrics.transports: An array of transports for metric shipping (e.g. ['stdout', 'elasticsearch'])
     * metrics.metadata:   A property bag of metadata values to be shipped alongside the metric value
     * elasticsearch:      Elasticsearch transport configuration
     * @param {object} options Bag of options
     */
    constructor(options) {
        options = options || {};

        this.domain = options.domain || 'localhost';
        this.elasticsearch = options.elasticsearch || {};
        this.mode = process.env.MODE || options.mode || 'short';
        if ('metrics' in options && typeof options.metrics === 'object') {
            this.transports = options.metrics.transports || [];
            this.metadata = options.metrics.metadata || {};
        } else {
            this.transports = [];
            this.metadata = {};
        }

        // CASE: special env variable to enable long mode and level info
        if (process.env.LOIN) {
            this.mode = 'long';
        }

        this.shippers = {};

        this.transports.forEach((transport) => {
            let transportFn = `setup${transport[0].toUpperCase()}${transport.substr(1)}Shipper`;

            if (!this[transportFn]) {
                throw new Error(`${transport} is an invalid transport`); // eslint-disable-line
            }

            this[transportFn]();
        });
    }

    /**
     * @description Setup stdout stream.
     */
    setupStdoutShipper() {
        const GhostPrettyStream = require('@tryghost/pretty-stream');
        const prettyStdOut = new GhostPrettyStream({
            mode: this.mode
        });

        prettyStdOut.pipe(process.stdout);

        this.shippers.stdout = (name, value) => {
            prettyStdOut.write({
                msg: `Metric ${name}: ${jsonStringifySafe(value)}`,
                level: 30 // Magic number, log level for info
            });

            return Promise.resolve();
        };
    }

    /**
     * @description Setup ElasticSearch metric shipper
     * ElasticSearch metrics are shipped to an index individually for each metric.
     * The name of the index is the name of the metric prefixed with "metrics-", the metric name itself should be sluggified
     */
    setupElasticsearchShipper() {
        const ElasticSearch = require('@tryghost/elasticsearch');

        const elasticSearch = new ElasticSearch({
            node: this.elasticsearch.host,
            auth: {
                username: this.elasticsearch.username,
                password: this.elasticsearch.password
            },
            requestTimeout: 5000,
            proxy: 'proxy' in this.elasticsearch ? this.elasticsearch.proxy : null
        });

        this.shippers.elasticsearch = (name, value) => {
            if (typeof value !== 'object') {
                value = {value};
            }

            if (!('@timestamp' in value)) {
                value['@timestamp'] = Date.now();
            }

            if (this.metadata) {
                value.metadata = this.metadata;
            }

            return elasticSearch.index(value, `metrics-${name}`);
        };
    }

    /**
     * @description Metric shipper function
     * @param {string} name Name of the metric, should be slugified for increased back-end compatibility (e.g. "memory-usage")
     * @param {any} value Value of metric, will be co-erced to an object before being shipped
     */
    metric(name, value) {
        const promises = [];
        for (const metricShipper of Object.values(this.shippers)) {
            promises.push(metricShipper(name, value));
        }

        return Promise.allSettled(promises).then(() => null);
    }
}

module.exports = GhostMetrics;
