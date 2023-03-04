/*!
 * source.js - script source for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const backend = require('./backend');
const env = require('./env');

/*
 * Constants
 */

const cache = Object.create(null);

/*
 * Base
 */

function location() {
  if (env.WORKER_EVAL) {
    const root = new URL(env.WORKER_LOCATION);

    if (env.WORKER_DIRNAME) {
      if (env.WORKER_DIRNAME === '/')
        return new URL('/[worker eval]', root);

      return new URL(env.WORKER_DIRNAME + '/[worker eval]', root);
    }

    return root;
  }

  const {document} = global;
  const root = new URL(backend.location);

  if (!document || !document.currentScript)
    return root;

  const {src} = document.currentScript;

  if (!src || typeof src !== 'string')
    return root;

  return new URL(document.currentScript.src, root);
}

function filename() {
  return urlToPath(location());
}

function dirname() {
  return pathResolve(filename(), '..');
}

/*
 * Resolve
 */

function resolve(req) {
  return toPath(req, dirname());
}

/*
 * Require
 */

function _require(req) {
  const url = toURL(req, dirname());
  const cached = cache[url.href];

  if (cached)
    return cached.exports;

  if (!backend.importScripts)
    throw new Error('Require is not available.');

  const __dirname = global.__dirname;
  const __filename = global.__filename;
  const _require = global.require;
  const _exports = global.exports;
  const _module = global.module;
  const exports = {};
  const module = { exports: exports };

  cache[url.href] = module;

  global.__dirname = undefined;
  global.__filename = undefined;
  global.require = undefined;
  global.exports = exports;
  global.module = module;

  try {
    backend.importScripts(url.href);
  } catch (e) {
    delete cache[url.href];
    throw e;
  } finally {
    global.__dirname = __dirname;
    global.__filename = __filename;
    global.require = _require;
    global.exports = _exports;
    global.module = _module;
  }

  return module.exports;
}

/*
 * Conversion
 */

function toPath(url, root) {
  url = String(url);

  if (/^(file|blob|data|https?):/.test(url))
    url = urlToPath(url);

  return pathResolve(root, url);
}

function toURL(file, root) {
  file = String(file);

  if (/^(file|blob|data|https?):/.test(file))
    return new URL(file);

  return pathToURL(pathResolve(root, file));
}

function urlToPath(url) {
  url = new URL(url);
  return decodeURI(url.pathname);
}

function pathToURL(file) {
  return new URL(file, location());
}

function pathResolve(...files) {
  const parts = [];

  if (files.length === 0)
    return '/';

  files[0] = String(files[0]);

  if (files[0][0] !== '/')
    files.unshift('/');

  for (let file of files) {
    file = String(file);

    if (file.length === 0)
      file += '.';

    file = file.replace(/\/+/g, '/');

    if (file[file.length - 1] === '/')
      file = file.slice(0, -1);

    parts.push(...file.split('/'));
  }

  const out = [];

  for (let i = 0; i < parts.length; i++) {
    const name = parts[i];

    if (name === '') {
      out.length = 0;
      continue;
    }

    if (name === '.')
      continue;

    if (name === '..') {
      out.pop();
      continue;
    }

    out.push(name);
  }

  return '/' + out.join('/');
}

/*
 * Expose
 */

exports.location = location;
exports.filename = filename;
exports.dirname = dirname;
exports.resolve = resolve;
exports.require = _require;
