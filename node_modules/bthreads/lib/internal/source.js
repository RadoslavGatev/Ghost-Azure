/*!
 * source.js - script source for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const path = require('path');
const url = require('url');

/*
 * URL
 */

let {URL, fileURLToPath, pathToFileURL} = url;

/*
 * Base
 */

function location(caller) {
  const file = toPath(caller, '.');
  const url = toURL(caller, '.');
  const prepareStackTrace = Error.prepareStackTrace;
  const stackTraceLimit = Error.stackTraceLimit;
  const dummy = {};

  Error.prepareStackTrace = (error, stack) => {
    let saw = false;

    for (let i = 0; i < stack.length; i++) {
      const name = stack[i].getFileName();

      if (name !== file && name !== url) {
        if (saw)
          return name;

        continue;
      }

      saw = true;
    }

    return '.';
  };

  Error.stackTraceLimit = 20;
  Error.captureStackTrace(dummy);

  let result = dummy.stack;

  Error.prepareStackTrace = prepareStackTrace;
  Error.stackTraceLimit = stackTraceLimit;

  if (file.startsWith('file:'))
    return new URL(file);

  if (!path.isAbsolute(result))
    result = path.join(process.cwd(), '[worker eval]');

  return pathToFileURL(result);
}

function filename(caller) {
  return toPath(location(caller), '.');
}

function dirname(caller) {
  return path.dirname(filename(caller));
}

/*
 * Resolve
 */

function resolve(req, caller) {
  return toPath(req, dirname(caller));
}

/*
 * Require
 */

function _require(req, caller) {
  return require(resolve(req, caller));
}

/*
 * Conversion
 */

function toPath(url, root) {
  url = String(url);

  if (url.startsWith('file:'))
    url = fileURLToPath(url);

  return path.resolve(root, url);
}

function toURL(file, root) {
  file = String(file);

  if (file.startsWith('file:'))
    return new URL(file);

  return pathToFileURL(path.resolve(root, file));
}

if (!fileURLToPath) {
  fileURLToPath = (url) => {
    url = new URL(url);
    return decodeURI(url.pathname);
  };
}

if (!pathToFileURL) {
  pathToFileURL = (file) => {
    return new URL('file://' + encodeURI(file));
  };
}

/*
 * Expose
 */

exports.location = location;
exports.filename = filename;
exports.dirname = dirname;
exports.resolve = resolve;
exports.require = _require;
