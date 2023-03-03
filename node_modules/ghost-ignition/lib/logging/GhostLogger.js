const each = require('lodash/each');
const upperFirst = require('lodash/upperFirst');
const toArray = require('lodash/toArray');
const isObject = require('lodash/isObject');
const isEmpty = require('lodash/isEmpty');
const includes = require('lodash/includes');
const bunyan = require('bunyan');
const fs = require('fs-extra');
const jsonStringifySafe = require('json-stringify-safe');
const GhostPrettyStream = require('./PrettyStream');

/**
 * @description Ghost's logger class.
 *
 * The logger handles any stdout/stderr logs and streams it into the configured transports.
 */
class GhostLogger {
    constructor(options) {
        options = options || {};

        this.name = options.name || 'Log';
        this.env = options.env || 'development';
        this.domain = options.domain || 'localhost';
        this.transports = options.transports || ['stdout'];
        this.level = process.env.LEVEL || options.level || 'info';
        this.logBody = options.logBody || false;
        this.mode = process.env.MODE || options.mode || 'short';
        this.path = options.path || process.cwd();
        this.loggly = options.loggly || {};
        this.elasticsearch = options.elasticsearch || {};
        this.gelf = options.gelf || {};

        // CASE: stdout has to be on the first position in the transport,  because if the GhostLogger itself logs, you won't see the stdout print
        if (this.transports.indexOf('stdout') !== -1 && this.transports.indexOf('stdout') !== 0) {
            this.transports.splice(this.transports.indexOf('stdout'), 1);
            this.transports = ['stdout'].concat(this.transports);
        }

        // CASE: special env variable to enable long mode and level info
        if (process.env.LOIN) {
            this.level = 'info';
            this.mode = 'long';
        }

        // CASE: ensure we have a trailing slash
        if (!this.path.match(/\/$|\\$/)) {
            this.path = this.path + '/';
        }

        this.rotation = options.rotation || {
            enabled: false,
            period: '1w',
            count: 100
        };

        this.streams = {};
        this.setSerializers();

        if (includes(this.transports, 'stderr') && !includes(this.transports, 'stdout')) {
            this.transports.push('stdout');
        }

        this.transports.forEach((transport) => {
            let transportFn = `set${upperFirst(transport)}Stream`;

            if (!this[transportFn]) {
                throw new Error(`${upperFirst(transport)} is an invalid transport`);
            }

            this[transportFn]();
        });
    }

    /**
     * @description Setup stdout stream.
     */
    setStdoutStream() {
        let prettyStdOut = new GhostPrettyStream({
            mode: this.mode
        });

        prettyStdOut.pipe(process.stdout);

        this.streams.stdout = {
            name: 'stdout',
            log: bunyan.createLogger({
                name: this.name,
                streams: [{
                    type: 'raw',
                    stream: prettyStdOut,
                    level: this.level
                }],
                serializers: this.serializers
            })
        };
    }

    /**
     * @description Setup stderr stream.
     */
    setStderrStream() {
        let prettyStdErr = new GhostPrettyStream({
            mode: this.mode
        });

        prettyStdErr.pipe(process.stderr);

        this.streams.stderr = {
            name: 'stderr',
            log: bunyan.createLogger({
                name: this.name,
                streams: [{
                    type: 'raw',
                    stream: prettyStdErr,
                    level: 'error'
                }],
                serializers: this.serializers
            })
        }
    }

    /**
     * @description Setup loggly.
     */
    setLogglyStream() {
        const Bunyan2Loggly = require('bunyan-loggly');

        let logglyStream = new Bunyan2Loggly({
            token: this.loggly.token,
            subdomain: this.loggly.subdomain,
            tags: this.loggly.tags
        });

        this.streams.loggly = {
            name: 'loggly',
            match: this.loggly.match,
            log: bunyan.createLogger({
                name: this.name,
                streams: [{
                    type: 'raw',
                    stream: logglyStream,
                    level: 'error'
                }],
                serializers: this.serializers
            })
        };
    }

    /**
     * @description Setup ElasticSearch.
     */
    setElasticsearchStream() {
        const ElasticSearch = require('@tryghost/elasticsearch-bunyan');

        const elasticStream = new ElasticSearch({
            node: this.elasticsearch.host,
            auth: {
                username: this.elasticsearch.username,
                password: this.elasticsearch.password
            }
        }, {
            index: this.elasticsearch.index,
            pipeline: this.elasticsearch.pipeline
        });

        this.streams.elasticsearch = {
            name: 'elasticsearch',
            log: bunyan.createLogger({
                name: this.name,
                streams: [{
                    type: 'raw',
                    stream: elasticStream,
                    level: this.elasticsearch.level
                }],
                serializers: this.serializers
            })
        };
    }

    /**
     * @description Setup gelf.
     */
    setGelfStream() {
        const gelfStream = require('gelf-stream');

        let stream = gelfStream.forBunyan(
            this.gelf.host || 'localhost',
            this.gelf.port || 12201,
            this.gelf.options || {}
        );

        this.streams.gelf = {
            name: 'gelf',
            log: bunyan.createLogger({
                name: this.name,
                streams: [{
                    type: 'raw',
                    stream: stream,
                    level: this.level
                }],
                serializers: this.serializers
            })
        };
    }

    /**
     * @description Setup file stream.
     *
     * By default we log into two files
     * 1. file-errors: all errors only
     * 2. file-all: everything
     */
    setFileStream() {
        // e.g. http://my-domain.com --> http___my_domain_com
        let sanitizedDomain = this.domain.replace(/[^\w]/gi, '_');

        // CASE: target log folder does not exist, show warning
        if (!fs.pathExistsSync(this.path)) {
            this.error('Target log folder does not exist: ' + this.path);
            return;
        }

        if (this.rotation.enabled) {
            if (this.rotation.useLibrary) {
                const RotatingFileStream = require('@tryghost/bunyan-rotating-filestream');
                const rotationConfig = {
                    path: `${this.path}${sanitizedDomain}_${this.env}.log`,
                    period: this.rotation.period,
                    threshold: this.rotation.threshold,
                    totalFiles: this.rotation.count,
                    gzip: this.rotation.gzip,
                    rotateExisting: (typeof this.rotation.rotateExisting === 'undefined') ? this.rotation.rotateExisting : true 
                };

                this.streams['rotation-errors'] = {
                    name: 'rotation-errors',
                    log: bunyan.createLogger({
                        name: this.name,
                        streams: [{
                            stream: new RotatingFileStream(Object.assign({}, rotationConfig, {
                                path: `${this.path}${sanitizedDomain}_${this.env}.error.log`
                            })),
                            level: 'error'
                        }],
                        serializers: this.serializers
                    })
                };

                this.streams['rotation-all'] = {
                    name: 'rotation-all',
                    log: bunyan.createLogger({
                        name: this.name,
                        streams: [{
                            stream: new RotatingFileStream(rotationConfig),
                            level: this.level
                        }],
                        serializers: this.serializers
                    })
                };
            } else {
                // TODO: Remove this when confidence is high in the external library for rotation
                this.streams['rotation-errors'] = {
                    name: 'rotation-errors',
                    log: bunyan.createLogger({
                        name: this.name,
                        streams: [{
                            type: 'rotating-file',
                            path: `${this.path}${sanitizedDomain}_${this.env}.error.log`,
                            period: this.rotation.period,
                            count: this.rotation.count,
                            level: "error"
                        }],
                        serializers: this.serializers
                    })
                };
    
                this.streams['rotation-all'] = {
                    name: 'rotation-all',
                    log: bunyan.createLogger({
                        name: this.name,
                        streams: [{
                            type: 'rotating-file',
                            path: `${this.path}${sanitizedDomain}_${this.env}.log`,
                            period: this.rotation.period,
                            count: this.rotation.count,
                            level: this.level
                        }],
                        serializers: this.serializers
                    })
                };
            }
        } else {
            this.streams['file-errors'] = {
                name: 'file',
                log: bunyan.createLogger({
                    name: this.name,
                    streams: [{
                        path: `${this.path}${sanitizedDomain}_${this.env}.error.log`,
                        level: 'error'
                    }],
                    serializers: this.serializers
                })
            };

            this.streams['file-all'] = {
                name: 'file',
                log: bunyan.createLogger({
                    name: this.name,
                    streams: [{
                        path: `${this.path}${sanitizedDomain}_${this.env}.log`,
                        level: this.level
                    }],
                    serializers: this.serializers
                })
            };
        }
    }

    // @TODO: res.on('finish') has no access to the response body
    /**
     * @description Serialize the log input.
     *
     * The goals are:
     *   - avoiding to log to much (pick useful information from request/response
     *   - removing/replacing sensitive data from logging to a stream/transport
     */
    setSerializers() {
        this.serializers = {
            req: (req) => {
                const requestLog = {
                    meta: {
                        requestId: req.requestId,
                        userId: req.userId
                    },
                    url: req.url,
                    method: req.method,
                    originalUrl: req.originalUrl,
                    params: req.params,
                    headers: this.removeSensitiveData(req.headers),
                    query: this.removeSensitiveData(req.query)
                };

                if (req.extra) {
                    requestLog.extra = req.extra;
                }

                if (this.logBody) {
                    requestLog.body = this.removeSensitiveData(req.body);
                }

                return requestLog;
            },
            res: (res) => {
                return {
                    _headers: this.removeSensitiveData(res.getHeaders()),
                    statusCode: res.statusCode,
                    responseTime: res.responseTime
                };
            },
            err: (err) => {
                return {
                    id: err.id,
                    domain: this.domain,
                    code: err.code,
                    name: err.errorType,
                    statusCode: err.statusCode,
                    level: err.level,
                    message: err.message,
                    context: jsonStringifySafe(err.context),
                    help: jsonStringifySafe(err.help),
                    stack: err.stack,
                    hideStack: err.hideStack,
                    errorDetails: jsonStringifySafe(err.errorDetails)
                };
            }
        };
    }

    /**
     * @description Remove sensitive data.
     * @param {Object} obj
     */
    removeSensitiveData(obj) {
        let newObj = {};

        each(obj, (value, key) => {
            try {
                if (isObject(value)) {
                    value = this.removeSensitiveData(value);
                }

                if (key.match(/pin|password|pass|key|authorization|bearer|cookie/gi)) {
                    newObj[key] = '**REDACTED**'
                }
                else {
                    newObj[key] = value;
                }
            } catch (err) {
                newObj[key] = value;
            }
        });

        return newObj;
    }

    /**
     * @description Centralised log function.
     *
     * Arguments can contain lot's of different things, we prepare the arguments here.
     * This function allows us to use logging very flexible!
     *
     * logging.info('HEY', 'DU') --> is one string
     * logging.info({}, {}) --> is one object
     * logging.error(new Error()) --> is {err: new Error()}
     */
    log(type, args) {
        let modifiedMessages = [];
        let modifiedObject = {};
        let modifiedArguments = [];

        each(args, function (value) {
           if (value instanceof Error) {
               modifiedObject.err = value;
           } else if (isObject(value)) {
               each(Object.keys(value), function (key) {
                   modifiedObject[key] = value[key];
               });
           } else {
               modifiedMessages.push(value);
           }
        });

        if (!isEmpty(modifiedObject)) {
            if (modifiedObject.err) {
                modifiedMessages.push(modifiedObject.err.message);
            }
            modifiedArguments.push(modifiedObject);
        }

        modifiedArguments.push(...modifiedMessages);

        each(this.streams, (logger) => {
            // If we have both a stdout and a stderr stream, don't log errors to stdout
            // because it would result in duplicate logs
            if (type === 'error' && logger.name === 'stdout' && includes(this.transports, 'stderr')) {
                return;
            }

            /**
             * @NOTE
             * Only `loggly` offers the `match` option.
             * And currently `loggly` is by default configured to only send errors (not configureable).
             * e.g. level info would get ignored.
             *
             * @NOTE
             * The `match` feature is not completed. We hardcode checking if the level/type is `error` for now.
             * Otherwise each `level:info` would has to run through the matching logic.
             *
             * @NOTE
             * Matching a string in the whole req/res object massively slows down the process, because it's a sync
             * operation.
             *
             * If we want to extend the feature, we can only offer matching certain keys e.g. status code, headers.
             * If we want to extend the feature, we have to do proper performance testing.
             *
             * `jsonStringifySafe` can match a string in an object, which has circular dependencies.
             * https://github.com/moll/json-stringify-safe
             */
            if (logger.match && type === 'error') {
                if (new RegExp(logger.match).test(jsonStringifySafe(modifiedArguments[0].err || null).replace(/"/g, ''))) {
                    logger.log[type](...modifiedArguments);
                }
            } else {
                logger.log[type](...modifiedArguments);
            }
        });
    }

    trace() {
        this.log('trace', toArray(arguments));
    }

    debug() {
        this.log('debug', toArray(arguments));
    }

    info() {
        this.log('info', toArray(arguments));
    }

    warn() {
        this.log('warn', toArray(arguments));
    }

    error() {
        this.log('error', toArray(arguments));
    }

    fatal() {
        this.log('fatal', toArray(arguments));
    }

    /**
     * @description Creates a child of the logger with some properties bound for every log message
     */
    child(boundProperties) {
        const result = new GhostLogger({
            name: this.name,
            env: this.env,
            domain: this.domain,
            transports: [],
            level: this.level,
            logBody: this.logBody,
            mode: this.mode,
        });

        result.streams = Object.keys(this.streams).reduce((acc, id) => {
            acc[id] = {
                name: this.streams[id].name,
                log: this.streams[id].log.child(boundProperties)
            };
            return acc
        }, {});

        return result;
    }
}

module.exports = GhostLogger;
