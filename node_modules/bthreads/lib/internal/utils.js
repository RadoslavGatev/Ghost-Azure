/*!
 * utils.js - utils for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const {custom} = require('./custom');

/*
 * Errors
 */

// Differences from node:
//   DUPLICATE_ITEM says `item` instead of `ArrayBuffer` or `MessagePort`.
//
// Currently Unused Errors:
//   - CLOSED_PORT (soon to be deprecated)
//   - COULD_NOT_CLONE_OOM
//   - DESERIALIZE_VERSION
//   - EXTERNALIZED_SHARED
//   - MISSING_PLATFORM
//   - NEUTERED_BUFFER


const errors = {
  // Type Errors
  INVALID_LIST: 'Transfer list must be undefined, null, or an Array.',
  INVALID_RESULT: 'Call result must be in the form of [result, transferList] '
                + 'or must not be an Array.',

  // Data Clone Errors
  COULD_NOT_CLONE: '%o could not be cloned.',
  COULD_NOT_CLONE_OOM: 'Data cannot not be cloned, out of memory.',
  DESERIALIZE: 'Unable to deserialize cloned data.',
  DESERIALIZE_VERSION: 'Unable to deserialize cloned data '
                     + 'due to invalid or unsupported version.',
  INVALID_SHARED: 'A SharedArrayBuffer could not be cloned. '
                + 'SharedArrayBuffer must not be transferred.',
  NEUTERED_BUFFER: 'An ArrayBuffer is neutered and could not be cloned.',

  // Non-explicitly-defined Data Clone Errors
  DETACHED_PORT: 'MessagePort in transfer list is already detached',
  DUPLICATE_ITEM: 'Transfer list contains duplicate item',
  SOURCE_PORT: 'Transfer list contains source port',

  // JS Worker Errors
  INVALID_ARGV: [
    'ERR_WORKER_INVALID_EXEC_ARGV',
    'Initiated Worker with invalid execArgv flags: %s'
  ],

  INVALID_PATH: [
    'ERR_WORKER_PATH',
    ['The worker script filename must be an absolute path',
     'or a relative path starting with \'./\' or \'../\'.',
     'Received "%s"'].join(' ')
  ],

  UNSERIALIZABLE_ERROR: [
    'ERR_WORKER_UNSERIALIZABLE_ERROR',
    'Serializing an uncaught exception failed'
  ],

  UNSUPPORTED_EXTENSION: [
    'ERR_WORKER_UNSUPPORTED_EXTENSION',
    'The worker script extension must be ".js" or ".mjs". Received "%s"'
  ],

  UNSUPPORTED_OPERATION: [
    'ERR_WORKER_UNSUPPORTED_OPERATION',
    '%s is not supported in workers'
  ],

  // C++ Worker Errors
  CANNOT_TRANSFER: [
    'ERR_CANNOT_TRANSFER_OBJECT',
    'Cannot transfer object of unsupported type'
  ],

  CLOSED_PORT: [
    'ERR_CLOSED_MESSAGE_PORT',
    'Cannot send data on closed MessagePort'
  ],

  EXTERNALIZED_SHARED: [
    'ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER',
    'Cannot serialize externalized SharedArrayBuffer'
  ],

  INVALID_CONSTRUCTOR: [ // See: https://github.com/nodejs/node/pull/28032
    'ERR_CONSTRUCT_CALL_INVALID',
    'Constructor cannot be called'
  ],

  INVALID_OBJECT: [
    'ERR_INVALID_TRANSFER_OBJECT',
    'Found invalid object in transferList'
  ],

  MISSING_PLATFORM: [
    'ERR_MISSING_PLATFORM_FOR_WORKER',
    ['The V8 platform used by this instance of',
     'Node does not support creating Workers'].join(' ')
  ],

  NO_PORT: [
    'ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST',
    'MessagePort was found in message but not listed in transferList'
  ],

  OUT_OF_MEMORY: [
    'ERR_WORKER_OUT_OF_MEMORY',
    'Worker terminated due to reaching memory limit'
  ],

  // Custom Worker Errors
  BUNDLED_EVAL: [
    'ERR_WORKER_BUNDLED_EVAL',
    'Cannot eval worker script when bundled.'
  ],

  ES_MODULE: [
    'ERR_WORKER_ES_MODULE',
    'Cannot execute ES module from worker. Reason: %s.'
  ],

  INVALID_PACKET: [
    'ERR_WORKER_INVALID_PACKET',
    'Received invalid packet (%s).'
  ],

  INVALID_PORT: [
    'ERR_WORKER_PORT_ID',
    'Invalid port number (%s).'
  ],

  NO_SHARE_ENV: [
    'ERR_SHARE_ENV_NOT_SUPPORTED',
    'SHARE_ENV is not supported on this backend.'
  ],

  NO_STDIO: [
    'ERR_STDIO_NOT_SUPPORTED',
    'STDIO streams are not supported on this backend.'
  ],

  // High Level Worker Errors
  BLACKLIST: ['ERR_WORKER_BLACKLIST', 'Cannot bind blacklisted event: "%s".'],
  FATAL_ERROR: ['ERR_WORKER_FATAL_ERROR', 'Fatal exception.'],
  HOOK_NONE: ['ERR_WORKER_HOOK_NONE', 'Hook does not exist: "%s".'],
  HOOK_EXISTS: ['ERR_WORKER_HOOK_EXISTS', 'Hook already exists: "%s".'],
  JOB_NONE: ['ERR_WORKER_JOB_NONE', 'Job is not in progress (%s).'],
  JOB_COLLISION: ['ERR_WORKER_JOB_COLLISION', 'Job collision (%s).'],
  JOB_TIMEOUT: ['ERR_WORKER_JOB_TIMEOUT', 'Job timed out (%s).'],
  JOB_DESTROYED: ['ERR_WORKER_JOB_DESTROYED', 'Job was destroyed (%s).'],
  PORT_CLOSED: ['ERR_WORKER_PORT_CLOSED', 'Port is closed.'],
  PORT_DESTROYED: ['ERR_WORKER_PORT_DESTROYED', 'Port was destroyed.']
};

/*
 * Constants
 */

const INLINE_PREFIX = 'bthreads-worker@';

/**
 * ArgError
 */

class ArgError extends TypeError {
  constructor(name, value, expect, start) {
    let msg;

    if (Array.isArray(expect) && expect.length === 1)
      [expect] = expect;

    if (Array.isArray(expect)) {
      const last = expect.pop();

      msg = `The "${name}" argument must be one of type `
          + `${expect.join(', ')}, or ${last}. `
          + `Received type ${typeof value}`;
    } else {
      msg = `The "${name}" argument must be of type ${expect}. `
          + `Received type ${typeof value}`;
    }

    super(msg);

    this.code = 'ERR_INVALID_ARG_TYPE';
    this.name = `TypeError [${this.code}]`;

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, start || this.constructor);
  }
}

/**
 * DataCloneError
 */

class DataCloneError extends Error {
  constructor(msg, arg, start) {
    super();

    if (msg == null)
      msg = errors.COULD_NOT_CLONE;

    this.name = 'DataCloneError';
    this.message = format(msg, arg);
    this.code = 25;

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, start || this.constructor);
  }
}

DataCloneError.DATA_CLONE_ERR = 25;

/**
 * WorkerError
 */

class WorkerError extends Error {
  constructor(desc, arg, start) {
    super();

    if (!Array.isArray(desc))
      desc = errors.FATAL_ERROR;

    this.code = toString(desc[0]);
    this.name = `Error [${this.code}]`;
    this.message = format(desc[1], arg);

    if (Error.captureStackTrace)
      Error.captureStackTrace(this, start || this.constructor);
  }
}

/*
 * Utils
 */

function toString(obj) {
  try {
    return String(obj);
  } catch (e) {
    return 'Object';
  }
}

function format(msg, arg) {
  return toString(msg).replace(/%s/, _ => toString(arg));
}

function getStack(err) {
  let stack = null;

  if (err != null) {
    try {
      stack = err.stack;
    } catch (e) {
      ;
    }
  }

  if (stack != null)
    err = stack;

  return toString(err);
}

function hasDuplicates(list) {
  if (!Array.isArray(list))
    return false;

  switch (list.length) {
    case 0:
    case 1: {
      return false;
    }
    case 2: {
      return list[0] === list[1];
    }
    case 3: {
      return list[0] === list[1]
          || list[1] === list[2]
          || list[2] === list[0];
    }
    default: {
      const set = new Set(list);
      return set.size !== list.length;
    }
  }
}

function hasSelf(list, port) {
  if (!Array.isArray(list))
    return false;

  return list.includes(port);
}

function toBuffer(value, ctor) {
  if (value instanceof Uint8Array)
    return ctor.from(value.buffer, value.byteOffset, value.byteLength);
  return value;
}

function setupRefs(ref, ee, event) {
  ref.unref();

  ee.on('newListener', (name) => {
    if (name === event && ee.listenerCount(event) === 0)
      ref.ref();
  });

  ee.on('removeListener', (name) => {
    if (name === event && ee.listenerCount(event) === 0)
      ref.unref();
  });
}

function bindDefault(ee, event, handler) {
  const maxListeners = ee._maxListeners;

  ee.setMaxListeners(Infinity);

  if (ee.listenerCount(event) === 0)
    ee.addListener(event, handler);

  // Note: newListener increments count _after_ emission.
  ee.on('newListener', (name, listener) => {
    if (name !== event || handler === listener)
      return;

    if (ee.listenerCount(event) === 1)
      ee.removeListener(event, handler);
  });

  // Note: removeListener decrements count _before_ emission.
  ee.on('removeListener', (name, listener) => {
    if (name !== event || handler === listener)
      return;

    if (ee.listenerCount(event) === 0)
      ee.addListener(event, handler);
  });

  ee._maxListeners = maxListeners;
}

function encodeError(err) {
  try {
    return _encodeError(err);
  } catch (e) {
    return _encodeError(null);
  }
}

function _encodeError(err) {
  if (!(err instanceof Error)) {
    if (typeof err === 'string')
      err = new Error(err);
    else if (err && typeof err.message === 'string')
      err = new Error(err.message);
    else
      err = new WorkerError(errors.UNSERIALIZABLE_ERROR);
  }

  const values = [];

  for (const key of Object.keys(err)) {
    if (key === '__proto__'
        || key === 'name'
        || key === 'message'
        || key === 'stack') {
      continue;
    }

    let value = null;

    try {
      value = err[key];
    } catch (e) {
      continue;
    }

    if (value !== null && typeof value === 'object')
      continue;

    if (typeof value === 'function')
      continue;

    if (typeof value === 'symbol')
      continue;

    values.push([key, value]);
  }

  return [
    String(err.name),
    String(err.message),
    String(err.stack),
    values
  ];
}

function decodeError(items) {
  if (!Array.isArray(items) || items.length !== 4)
    throw new ArgError('items', items, 'Array');

  const [name, message, stack, values] = items;

  if (typeof name !== 'string')
    throw new ArgError('name', name, 'string');

  if (typeof message !== 'string')
    throw new ArgError('message', message, 'string');

  if (typeof stack !== 'string')
    throw new ArgError('stack', stack, 'string');

  if (!Array.isArray(values))
    throw new ArgError('values', values, 'Array');

  for (const item of values) {
    if (!Array.isArray(item) || item.length !== 2)
      throw new ArgError('item', item, 'Array');

    if (typeof item[0] !== 'string')
      throw new ArgError('key', item[0], 'string');
  }

  let ErrorType = Error;

  switch (name.split(' [')[0]) {
    case 'EvalError':
      ErrorType = EvalError;
      break;
    case 'RangeError':
      ErrorType = RangeError;
      break;
    case 'ReferenceError':
      ErrorType = ReferenceError;
      break;
    case 'SyntaxError':
      ErrorType = SyntaxError;
      break;
    case 'TypeError':
      ErrorType = TypeError;
      break;
    case 'URIError':
      ErrorType = URIError;
      break;
    case 'DataCloneError':
      ErrorType = DataCloneError;
      break;
  }

  const err = new ErrorType(message);

  err.name = name;

  try {
    err.stack = stack;
  } catch (e) {
    ;
  }

  for (const [key, value] of values)
    err[key] = value;

  return err;
}

function inspectify(parent, ...details) {
  const obj = Object.create({ constructor: parent });
  return Object.assign(obj, ...details);
}

function getter(obj, name, get) {
  Object.defineProperty(obj, name, { get });
}

function noop() {}

/*
 * Expose
 */

exports.custom = custom;
exports.errors = errors;
exports.INLINE_PREFIX = INLINE_PREFIX;
exports.ArgError = ArgError;
exports.DataCloneError = DataCloneError;
exports.WorkerError = WorkerError;
exports.toString = toString;
exports.format = format;
exports.getStack = getStack;
exports.hasDuplicates = hasDuplicates;
exports.hasSelf = hasSelf;
exports.toBuffer = toBuffer;
exports.setupRefs = setupRefs;
exports.bindDefault = bindDefault;
exports.encodeError = encodeError;
exports.decodeError = decodeError;
exports.inspectify = inspectify;
exports.getter = getter;
exports.noop = noop;
