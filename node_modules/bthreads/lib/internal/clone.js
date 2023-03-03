/*!
 * clone.js - object cloning for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Resources:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
 *   https://developer.mozilla.org/en-US/docs/Web/API/Transferable
 *   https://w3c.github.io/html/infrastructure.html#safe-passing-of-structured-data
 *   https://w3c.github.io/html/infrastructure.html#serializable-objects
 *   https://heycam.github.io/webidl/#dfn-platform-object
 */

/* global Blob, File, FileList, ImageData, ImageBitmap */

'use strict';

const isProxy = require('./is-proxy');
const utils = require('./utils');

const {
  errors,
  DataCloneError,
  WorkerError,
  hasDuplicates
} = utils;

/*
 * Constants
 */

const HAS_SHARED_ARRAY_BUFFER = typeof SharedArrayBuffer === 'function';
const HAS_BLOB = typeof Blob === 'function';
const HAS_FILE = typeof File === 'function';
const HAS_FILE_LIST = typeof FileList === 'function';
const HAS_IMAGE_DATA = typeof ImageData === 'function';
const HAS_IMAGE_BITMAP = typeof ImageBitmap === 'function';

/**
 * Cloner
 */

class Cloner {
  transform(value, opt) {
    return value;
  }

  isPort(value, opt) {
    return false;
  }

  toPort(value, opt) {
    return value;
  }

  hasPort(transferList, opt) {
    if (!Array.isArray(transferList))
      return false;

    for (const item of transferList) {
      if (this.isPort(item, opt))
        return true;
    }

    return false;
  }

  hasTransfer(value, list) {
    return true;
  }

  clone(value, opt) {
    return this._walk(value, opt);
  }

  _walk(value, opt, seen = new Map()) {
    if (!isObject(value))
      return this.transform(value, opt);

    if (seen.has(value))
      return seen.get(value);

    if (isProxy(value))
      throw new DataCloneError(null, value);

    if (isSimple(value)) {
      const out = this.transform(value, opt);
      seen.set(value, out);
      return out;
    }

    if (this.isPort(value, opt)) {
      if (!this.hasTransfer(value, opt))
        throw new WorkerError(errors.NO_PORT);

      const port = this.toPort(value, opt);
      seen.set(value, port);
      return port;
    }

    if (Array.isArray(value)) {
      const out = [];

      seen.set(value, out);

      for (const val of value)
        out.push(this._walk(val, opt, seen));

      return out;
    }

    if (value instanceof Map) {
      const out = new Map();

      seen.set(value, out);

      for (const [key, val] of value) {
        out.set(this._walk(key, opt, seen),
                this._walk(val, opt, seen));
      }

      return out;
    }

    if (value instanceof Set) {
      const out = new Set();

      seen.set(value, out);

      for (const key of value)
        out.add(this._walk(key, opt, seen));

      return out;
    }

    const out = {};

    seen.set(value, out);

    for (const key of Object.keys(value)) {
      if (key === '__proto__')
        continue;

      out[key] = this._walk(value[key], opt, seen);
    }

    return out;
  }

  morph(value, transferList, opt) {
    if (hasDuplicates(transferList))
      throw new DataCloneError(errors.DUPLICATE_ITEM);

    if (!this.hasPort(transferList, opt))
      return [value, transferList, false];

    const list = [];

    for (const item of transferList) {
      if (this.isPort(item, opt))
        list.push(this.toPort(item, opt));
      else
        list.push(item);
    }

    return [this.clone(value, opt), list, true];
  }

  static clone(value, opt) {
    return new this().clone(value, opt);
  }

  static morph(value, transferList, opt) {
    return new this().morph(value, transferList, opt);
  }
}

/**
 * Uncloner
 */

class Uncloner {
  transform(value, opt) {
    return value;
  }

  isPort(value, opt) {
    return false;
  }

  toPort(value, opt) {
    return value;
  }

  unclone(value, opt) {
    return this._walk(value, opt);
  }

  _walk(value, opt, seen = new Map()) {
    if (!isObject(value))
      return this.transform(value, opt);

    if (seen.has(value))
      return seen.get(value);

    if (isSimple(value)) {
      const out = this.transform(value, opt);
      seen.set(value, out);
      return out;
    }

    if (this.isPort(value, opt)) {
      const port = this.toPort(value, opt);
      seen.set(value, port);
      return port;
    }

    seen.set(value, value);

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++)
        value[i] = this._walk(value[i], opt, seen);

      return value;
    }

    if (value instanceof Map) {
      const added = [];

      for (const [key, val] of value) {
        const k = this._walk(key, opt, seen);
        const v = this._walk(val, opt, seen);

        if (k !== key) {
          value.delete(key);
          added.push([k, v]);
        } else if (v !== val) {
          value.set(k, v);
        }
      }

      for (const [k, v] of added)
        value.set(k, v);

      return value;
    }

    if (value instanceof Set) {
      const added = [];

      for (const key of value) {
        const k = this._walk(key, opt, seen);

        if (k !== key) {
          value.delete(key);
          added.push(k);
        }
      }

      for (const k of added)
        value.add(k);

      return value;
    }

    for (const key of Object.keys(value)) {
      const val = value[key];
      const v = this._walk(val, opt, seen);

      if (v !== val)
        value[key] = v;
    }

    return value;
  }

  static unclone(value, opt) {
    return new this().unclone(value, opt);
  }
}

/**
 * Collector
 */

class Collector {
  isPort(value, opt) {
    return false;
  }

  collect(value, opt) {
    return this._walk(value, opt, []);
  }

  _walk(value, opt, list, seen = new Set()) {
    if (!isObject(value) || isSimple(value))
      return list;

    if (seen.has(value))
      return list;

    seen.add(value);

    if (this.isPort(value, opt)) {
      list.push(value);
      return list;
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++)
        this._walk(value[i], opt, list, seen);
    } else if (value instanceof Map) {
      for (const [key, val] of value) {
        this._walk(key, opt, list, seen);
        this._walk(val, opt, list, seen);
      }
    } else if (value instanceof Set) {
      for (const key of value) {
        this._walk(key, opt, list, seen);
      }
    } else {
      for (const key of Object.keys(value))
        this._walk(value[key], opt, list, seen);
    }

    return list;
  }

  static collect(value, opt) {
    return new this().collect(value, opt);
  }
}

/**
 * FullCloner
 */

class FullCloner extends Cloner {
  constructor() {
    super();
  }

  hasTransfer(value, list) {
    return list.has(value);
  }

  isTransferList(list) {
    if (list === undefined)
      return true;

    if (!Array.isArray(list))
      return false;

    for (const item of list) {
      if (!this.isTransferable(item))
        return false;
    }

    return true;
  }

  isTransferable(item) {
    if (item instanceof ArrayBuffer)
      return true;

    if (this.isPort(item, null))
      return true;

    if (HAS_IMAGE_BITMAP) {
      if (item instanceof ImageBitmap)
        return true;
    }

    return false;
  }

  transform(value, list) {
    if (typeof value === 'function')
      throw new DataCloneError(null, value);

    if (typeof value === 'symbol')
      throw new DataCloneError(null, value);

    if (!isObject(value))
      return value;

    if (value instanceof Error)
      throw new DataCloneError(null, value);

    if (value instanceof RegExp)
      return new RegExp(value.source, value.flags);

    if (value instanceof Date)
      return new Date(value.getTime());

    if (value instanceof Promise)
      throw new DataCloneError(null, value);

    if (value instanceof ArrayBuffer) {
      if (list.has(value))
        return value;

      return value.slice(0);
    }

    if (HAS_SHARED_ARRAY_BUFFER) {
      if (value instanceof SharedArrayBuffer)
        return value;
    }

    if (ArrayBuffer.isView(value)) {
      let TypedArray = value.constructor;

      if (TypedArray.allocUnsafe)
        TypedArray = Uint8Array;

      if (isShareable(value, list)) {
        return new TypedArray(value.buffer,
                              value.byteOffset,
                              value.length);
      }

      return new TypedArray(value);
    }

    if (HAS_FILE) {
      if (value instanceof File)
        return value;
    }

    if (HAS_BLOB) {
      if (value instanceof Blob)
        return value;
    }

    if (HAS_FILE_LIST) {
      if (value instanceof FileList)
        return value;
    }

    if (HAS_IMAGE_DATA) {
      if (value instanceof ImageData) {
        let data;

        if (isShareable(value.data, list)) {
          data = new Uint8ClampedArray(value.data.buffer,
                                       value.data.byteOffset,
                                       value.data.byteLength);
        } else {
          data = new Uint8ClampedArray(value.data);
        }

        const {width, height} = value;

        return new ImageData(data, width, height);
      }
    }

    if (HAS_IMAGE_BITMAP) {
      if (value instanceof ImageBitmap) {
        if (list.has(value))
          return value;

        throw new DataCloneError(null, value);
      }
    }

    return value;
  }

  clone(value, transferList) {
    // A word about transfer list types:
    //   - MDN claims postMessage throws on null but not undefined.
    //   - Chromium 72 does not throw on array, undefined, or null.
    //   - Node.js doesn't throw on anything.
    // Let's mimic chromium, since that seems the sanest.
    if (transferList == null)
      transferList = [];

    if (!Array.isArray(transferList))
      throw new TypeError(errors.INVALID_LIST);

    if (!this.isTransferList(transferList))
      throw new WorkerError(errors.INVALID_OBJECT);

    const list = new Set(transferList);

    if (list.size !== transferList.length)
      throw new DataCloneError(errors.DUPLICATE_ITEM);

    return this._walk(value, list);
  }
}

/*
 * Helpers
 */

function isObject(value) {
  if (value === null)
    return false;

  return typeof value === 'object';
}

function isSimple(value) {
  if (value instanceof Error)
    return true;

  if (value instanceof RegExp)
    return true;

  if (value instanceof Date)
    return true;

  if (value instanceof Promise)
    return true;

  if (value instanceof ArrayBuffer)
    return true;

  if (HAS_SHARED_ARRAY_BUFFER) {
    if (value instanceof SharedArrayBuffer)
      return true;
  }

  if (ArrayBuffer.isView(value))
    return true;

  if (HAS_BLOB) {
    if (value instanceof Blob)
      return true;
  }

  if (HAS_FILE) {
    if (value instanceof File)
      return true;
  }

  if (HAS_FILE_LIST) {
    if (value instanceof FileList)
      return true;
  }

  if (HAS_IMAGE_DATA) {
    if (value instanceof ImageData)
      return true;
  }

  if (HAS_IMAGE_BITMAP) {
    if (value instanceof ImageBitmap)
      return true;
  }

  return false;
}

function isShareable(value, list) {
  if (HAS_SHARED_ARRAY_BUFFER) {
    if (value.buffer instanceof SharedArrayBuffer)
      return true;
  }

  return list.has(value.buffer);
}

/*
 * Expose
 */

exports.Cloner = Cloner;
exports.Uncloner = Uncloner;
exports.Collector = Collector;
exports.FullCloner = FullCloner;
