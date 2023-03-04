/*!
 * eval.js - eval context for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://github.com/nodejs/node/blob/84ebaaa/lib/internal/main/worker_thread.js#L98
 *   https://github.com/nodejs/node/blob/84ebaaa/lib/internal/process/execution.js#L36
 *   https://github.com/nodejs/node/blob/84ebaaa/lib/internal/modules/cjs/loader.js#L424
 *   https://github.com/nodejs/node/blob/da13c44/lib/internal/bootstrap/node.js#L725
 */

'use strict';

const path = require('path');
const vm = require('vm');
const {parentPort} = require('./thread');

/*
 * Helpers
 */

function getRoot() {
  const root = process.env.BTHREADS_WORKER_DIRNAME;

  if (root)
    return root;

  try {
    return process.cwd();
  } catch (e) {
    return path.dirname(process.execPath);
  }
}

function nodeModulePaths(root) {
  const paths = [];

  for (;;) {
    if (path.basename(root) !== 'node_modules')
      paths.push(path.join(root, 'node_modules'));

    const next = path.dirname(root);

    if (next === root)
      break;

    root = next;
  }

  return paths;
}

function resolveModule(request, parent) {
  if (request === ''
      || request === '.'
      || request.startsWith('/')
      || request.startsWith('./')
      || request.startsWith('../')
      || request.startsWith(path.sep)
      || request.startsWith('.' + path.sep)
      || request.startsWith('..' + path.sep)) {
    request = path.resolve(parent, request);
  }

  const mjs = require.extensions['.mjs'];

  require.extensions['.mjs'] = require.extensions['.js'];

  try {
    return require.resolve(request, {
      paths: [parent]
    });
  } finally {
    if (mjs === undefined)
      delete require.extensions['.mjs'];
    else
      require.extensions['.mjs'] = mjs;
  }
}

async function importModule(specifier, module) {
  const {fileURLToPath, pathToFileURL} = require('url');

  if (!fileURLToPath || !pathToFileURL)
    throw new Error('Cannot dynamically import ES module.');

  if (typeof specifier === 'object' || specifier.startsWith('file:'))
    specifier = fileURLToPath(specifier);

  const parent = module.url
    ? path.dirname(fileURLToPath(module.url))
    : getRoot();

  const file = resolveModule(specifier, parent);

  let url = file;

  if (path.isAbsolute(url))
    url = pathToFileURL(url).href;

  return new Function('url', 'return import(url);')(url);
}

function evalScript(name, body) {
  const root = getRoot();
  const paths = nodeModulePaths(root);

  module.id = name;
  module.filename = path.join(root, name);
  module.paths.length = 0;
  module.paths.push(...paths);

  // These are better for compat,
  // but I feel they may break
  // things unnecessarily:
  //
  // module.parent = undefined;
  // module.loaded = false;
  //
  // require.main = undefined;
  //
  // Should be at top of file,
  // above all requires:
  //
  // process.mainModule = undefined;

  global.__filename = name;
  global.__dirname = '.';
  global.exports = exports;
  global.module = module;
  global.require = require;

  if (process.env.BTHREADS_WORKER_DIRNAME) {
    global.__filename = module.filename;
    global.__dirname = root;
    name = module.filename;
  }

  vm.runInThisContext(body, {
    filename: name,
    displayErrors: true,
    importModuleDynamically: importModule
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
