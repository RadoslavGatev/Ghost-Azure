/*!
 * proxy.js - event proxy for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

/**
 * EventProxy
 */

class EventProxy {
  constructor(target, dom = false) {
    assert(target);
    assert(typeof dom === 'boolean');
    assert(dom || target.on);

    this.target = target;
    this.dom = dom;
    this.count = 0;
    this.started = false;
    this.eternal = false;
    this.bound = false;
    this.events = [];
    this.watchers = [];
  }

  ref() {
    this.stop();
    this._ref();
    return this;
  }

  _ref() {
    if (this.count++ !== 0)
      return;

    if (this.eternal && this.bound)
      return;

    for (const [name, handler] of this.events) {
      if (this.dom)
        this.target[`on${name}`] = handler;
      else
        addListener(this.target, name, handler);
    }

    if (this.eternal) {
      this.bound = true;
      this.clear();
    }
  }

  unref() {
    this.stop();
    this._unref();
    return this;
  }

  _unref() {
    if (--this.count !== 0)
      return;

    if (this.eternal)
      return;

    for (const [name, handler] of this.events) {
      if (this.dom)
        this.target[`on${name}`] = null;
      else
        removeListener(this.target, name, handler);
    }
  }

  listen(name, handler) {
    assert(typeof name === 'string');
    assert(typeof handler === 'function');

    this.events.push([name, handler]);

    return this;
  }

  watch(watched, names) {
    assert(watched && watched.on);
    assert(names == null || Array.isArray(names));

    const watcher = new Watcher(this, watched, names);

    this.watchers.push(watcher.init());

    return this;
  }

  clear() {
    for (const watcher of this.watchers)
      watcher.clear();

    this.watchers.length = 0;
    this.events.length = 0;

    return this;
  }

  start() {
    if (!this.started) {
      this._ref();
      this.started = true;
    }
    return this;
  }

  stop() {
    if (this.started) {
      this.started = false;
      this._unref();
    }
    return this;
  }

  destroy() {
    this.count = 1;
    this.started = false;
    this.eternal = false;
    this.bound = false;
    this.unref();
    this.clear();
    return this;
  }
}

/**
 * Watcher
 */

class Watcher {
  constructor(proxy, watched, names) {
    this.proxy = proxy;
    this.watched = watched;
    this.names = names || null;
    this.onNew = this.handleNew.bind(this);
    this.onRemove = this.handleRemove.bind(this);
  }

  init() {
    this.watched.addListener('newListener', this.onNew);

    if (!this.proxy.eternal)
      this.watched.addListener('removeListener', this.onRemove);

    return this;
  }

  clear() {
    this.watched.removeListener('newListener', this.onNew);

    if (!this.proxy.eternal)
      this.watched.removeListener('removeListener', this.onRemove);

    return this;
  }

  has(name) {
    if (this.names)
      return this.names.includes(name);

    return name !== 'newListener'
        && name !== 'removeListener';
  }

  handleNew(name, listener) {
    if (this.has(name))
      this.proxy.ref();
  }

  handleRemove(name, listener) {
    if (this.has(name))
      this.proxy.unref();
  }
}

/*
 * Helpers
 */

function assert(ok) {
  if (!ok)
    throw new Error('Assertion failed');
}

function addListener(ee, name, handler) {
  try {
    ee.addListener(name, handler);
  } catch (e) {
    if (!isCloseError(name, e))
      throw e;
  }
}

function removeListener(ee, name, handler) {
  try {
    ee.removeListener(name, handler);
  } catch (e) {
    if (!isCloseError(name, e))
      throw e;
  }
}

function isCloseError(name, err) {
  if (name !== 'message')
    return false;

  // Node throws when trying to unbind `message` from a closed port.
  // See: https://github.com/nodejs/node/issues/26463
  return err && err.message === 'Cannot send data on closed MessagePort';
}

/*
 * Expose
 */

module.exports = EventProxy;
