var GhostLogger = require('./GhostLogger');

/**
 * @description Create a new logging instance.
 *
 * name:            Name of the logger. The name will appear in the raw log files with {"name": String...}
 * domain:          Is used for creating the file name.
 * env:             Is used for creating the file name.
 * mode:            Is used to print short or long log.
 * level:           The level defines the default level of all transports except of stderr.
 * logBody:         Disable or enable if the body of a request should be logged to the target stream.
 * transports:      An array of comma separated transports (e.g. stdout, stderr, geld, loggly, file)
 * rotation:        Enable or disable file rotation.
 * path:            Path where to store log files.
 * loggly:          Loggly transport configuration.
 * elasticsearch:   Elasticsearch transport configuration
 * gelf:            Gelf transport configuration.
 *
 *
 * @param {Object} options
 * @return {GhostLogger}
 */
module.exports = function createNewInstance(options) {
    options = options || {};

    var adapter = new GhostLogger({
        name: options.name,
        domain: options.domain,
        env: options.env,
        mode: options.mode,
        level: options.level,
        logBody: options.logBody,
        transports: options.transports,
        rotation: options.rotation,
        path: options.path,
        loggly: options.loggly,
        elasticsearch: options.elasticsearch,
        gelf: options.gelf
    });

    return adapter;
};

module.exports.GhostLogger = GhostLogger;
