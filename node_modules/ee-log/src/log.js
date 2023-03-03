'use strict';


const Logger = require('./Logger');
const logger = new Logger();

const log = (...values) => {
    logger.info(...values);
};



['trace', 'dir', 'wtf', 'info', 'debug', 'warn', 'error', 'highlight', 'success'].forEach((key) => {
    log[key] = (...values) => {
        logger[key](...values);
    }
});



module.exports = log;
