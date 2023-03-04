/*!
 * main.js - main thread entry point for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const socket = require('../internal/socket');
const source = require('../internal/source');
const {getter} = require('../internal/utils');
const {MessagePortBase, MessageChannel} = require('./common');
const Worker = require('./worker');

exports.isMainThread = true;
exports.parentPort = null;
exports.threadId = 0;
exports.workerData = null;
exports.MessagePort = MessagePortBase;
exports.MessageChannel = MessageChannel;
exports.Worker = Worker;
exports.moveMessagePortToContext = null;
exports.receiveMessageOnPort = null;
exports.SHARE_ENV = Symbol.for('nodejs.worker_threads.SHARE_ENV');

exports.backend = 'child_process';
exports.browser = false;
getter(exports, 'location', () => source.location(__filename));
getter(exports, 'filename', () => source.filename(__filename));
getter(exports, 'dirname', () => source.dirname(__filename));
exports.require = req => source.require(req, __filename);
exports.resolve = req => source.resolve(req, __filename);
exports.exit = process.exit.bind(process);

socket.inject(exports, source, Buffer, null);
