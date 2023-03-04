/*!
 * eval.js - eval context for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

/* global __bthreads_polyfill_scope, importScripts */
/* eslint camelcase: "off" */
/* eslint strict: "off" */

const encoding = require('../encoding');
const env = require('./env');
const threads = require('./thread');
const {parentPort} = threads;

threads.Buffer = Buffer;

/*
 * Require
 */

function _require(location) {
  switch (location) {
    case './':
    case '../':
      return threads;
    case './encoding':
    case '../encoding':
      return encoding;
    case 'assert':
      return require('assert');
    case 'async_hooks': // Empty (not in browserify).
      return {};
    case 'buffer':
      return require('buffer');
    case 'bthreads':
    case 'bthreads/process':
    case 'bthreads/stable':
    case 'bthreads/threads':
      return threads;
    case 'bthreads/encoding':
      return encoding;
    case 'child_process': // Empty.
      return require('child_process');
    case 'cluster': // Empty.
      return require('cluster');
    case 'constants': // Extra.
      return require('constants');
    case 'console':
      return require('console');
    case 'crypto': // Extra.
      return require('crypto');
    case 'dgram': // Empty.
      return require('dgram');
    case 'dns': // Empty.
      return require('dns');
    case 'domain': // Extra.
      return require('domain');
    case 'events':
      return require('events');
    case 'fs': // Empty.
      return require('fs');
    case 'http': // Extra.
      return require('http');
    case 'http2': // Extra (not in browserify).
      return {};
    case 'https': // Extra.
      return require('https');
    case 'inspector': // Empty.
      return require('inspector');
    case 'module': // Empty.
      return require('module');
    case 'net': // Empty.
      return require('net');
    case 'os': // Extra.
      return require('os');
    case 'path': // Extra.
      return require('path');
    case 'process':
      return process;
    case 'perf_hooks': // Empty.
      return require('perf_hooks');
    case 'punycode': // Extra.
      return require('punycode');
    case 'querystring': // Extra.
      return require('querystring');
    case 'readline': // Empty.
      return require('readline');
    case 'repl': // Empty.
      return require('repl');
    case 'stream': // Extra.
      return require('stream');
    case 'string_decoder':
      return require('string_decoder');
    case 'sys':
      return require('sys');
    case 'timers':
      return require('timers');
    case 'tls': // Empty.
      return require('tls');
    case 'tty': // Extra.
      return require('tty');
    case 'url': // Extra.
      return require('url');
    case 'util':
      return require('util');
    case 'v8': // Empty.
      return require('v8');
    case 'vm': // Extra.
      return require('vm');
    case 'worker_threads':
      return threads;
    case 'zlib': // Extra.
      return require('zlib');
    default:
      return require(location);
  }
}

_require.cache = require.cache;
_require.extensions = require.extensions;
_require.main = undefined;
_require.resolve = require.resolve;

/*
 * Scripts
 */

function runScript(code, args) {
  const names = [];
  const values = [global];

  for (const name of Object.keys(args)) {
    names.push(name);
    values.push(args[name]);
  }

  if (typeof queueMicrotask === 'function') {
    names.push('queueMicrotask');
    values.push(queueMicrotask);
  }

  if (typeof __bthreads_polyfill_scope === 'object') {
    names.push('__bthreads_polyfill_scope');
    values.push(__bthreads_polyfill_scope);
    names.push('importScripts');
    values.push(importScripts);
  }

  const func = new Function(names.join(','), code);

  return func.call(...values);
}

function evalScript(name, code) {
  const root = env.WORKER_DIRNAME || '';
  const file = `${root}/${name}`;
  const exports = {};

  const module = {
    id: name,
    exports,
    parent: undefined,
    filename: file,
    loaded: false,
    children: [],
    paths: [root || '.'],
    require: _require
  };

  process.mainModule = undefined;

  let filename = name;
  let dirname = '.';

  if (env.WORKER_DIRNAME) {
    filename = module.filename;
    dirname = root;
  }

  if (typeof __bthreads_polyfill_scope !== 'object') {
    global.__filename = filename;
    global.__dirname = dirname;
    global.exports = exports;
    global.module = module;
    global.require = _require;
  }

  runScript(code, {
    // Globals
    global,
    self: global,
    globalThis: global,
    Buffer,
    console,
    process,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    setImmediate,
    clearImmediate,

    // Module
    __filename: filename,
    __dirname: dirname,
    exports,
    module,
    require: _require
  });
}

/*
 * Execute
 */

// Wait for code to come in.
parentPort.onmessage = ({data}) => {
  parentPort.onmessage = null;
  setImmediate(() => {
    try {
      evalScript('[worker eval]', data);
    } catch (e) {
      parentPort._exception(e);
    }
  });
};
