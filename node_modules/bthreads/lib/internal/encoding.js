/*!
 * encoding.js - object serialization for bthreads
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

/* global Blob, File, FileList, ImageData, ImageBitmap, XMLHttpRequest */

'use strict';

const bio = require('bufio');
const isProxy = require('./is-proxy');
const utils = require('./utils');

const {
  errors,
  ArgError,
  DataCloneError,
  WorkerError
} = utils;

/*
 * Constants
 */

const HAS_BIGINT = typeof BigInt === 'function';
const HAS_BIGINT64_ARRAY = typeof BigInt64Array === 'function';
const HAS_BIGUINT64_ARRAY = typeof BigUint64Array === 'function';
const HAS_SHARED_ARRAY_BUFFER = typeof SharedArrayBuffer === 'function';
const HAS_BLOB = typeof Blob === 'function';
const HAS_FILE = typeof File === 'function';
const HAS_FILE_LIST = typeof FileList === 'function';
const HAS_IMAGE_DATA = typeof ImageData === 'function';
const HAS_IMAGE_BITMAP = typeof ImageBitmap === 'function';
const HAS_XHR = typeof XMLHttpRequest === 'function';
const HAS_URL = typeof URL === 'function'
             && typeof URL.createObjectURL === 'function';
const B0 = HAS_BIGINT ? BigInt(0) : null;
const B8 = HAS_BIGINT ? BigInt(8) : null;

const types = {
  REFERENCE: 0,
  UNDEFINED: 1,
  NULL: 2,
  TRUE: 3,
  FALSE: 4,
  NUMBER: 5,
  NAN: 6,
  POSITIVE_INFINITY: 7,
  NEGATIVE_INFINITY: 8,
  NEGATIVE_ZERO: 9,
  INT32: 10,
  UINT32: 11,
  STRING: 12,
  SYMBOL: 13,
  BIGINT: 14,
  FUNCTION: 15,
  OBJECT: 16,
  ARRAY: 17,
  MAP: 18,
  SET: 19,
  ERROR: 20,
  REGEX: 21,
  DATE: 22,
  INVALID_DATE: 23,
  PROMISE: 24,
  PROXY: 25,
  ARRAY_BUFFER: 26,
  SHARED_ARRAY_BUFFER: 27,
  BUFFER: 28,
  INT8_ARRAY: 29,
  UINT8_ARRAY: 30,
  UINT8_CLAMPED_ARRAY: 31,
  INT16_ARRAY: 32,
  UINT16_ARRAY: 33,
  INT32_ARRAY: 34,
  UINT32_ARRAY: 35,
  FLOAT32_ARRAY: 36,
  FLOAT64_ARRAY: 37,
  DATA_VIEW: 38,
  BIG_INT64_ARRAY: 39,
  BIG_UINT64_ARRAY: 40,
  BLOB: 41,
  FILE: 42,
  FILE_LIST: 43,
  IMAGE_DATA: 44,
  IMAGE_BITMAP: 45,
  MESSAGE_PORT: 46
};

/*
 * Encoding
 */

function encode(value) {
  const size = getSize(value);
  const bw = bio.write(size);
  write(bw, value);
  return bw.render();
}

function getType(value) {
  switch (typeof value) {
    case 'undefined': {
      return types.UNDEFINED;
    }

    case 'boolean': {
      return value ? types.TRUE : types.FALSE;
    }

    case 'number': {
      if (value === 0) {
        if (1 / value === -Infinity)
          return types.NEGATIVE_ZERO;
      }

      if ((value >>> 0) === value)
        return types.UINT32;

      if ((value | 0) === value)
        return types.INT32;

      if (value !== value)
        return types.NAN;

      if (value === Infinity)
        return types.POSITIVE_INFINITY;

      if (value === -Infinity)
        return types.NEGATIVE_INFINITY;

      return types.NUMBER;
    }

    case 'string': {
      return types.STRING;
    }

    case 'symbol': {
      return types.SYMBOL;
    }

    case 'bigint': {
      return types.BIGINT;
    }

    case 'function': {
      return types.FUNCTION;
    }

    case 'object': {
      if (value === null)
        return types.NULL;

      if (isProxy(value))
        return types.PROXY;

      if (value instanceof Error)
        return types.ERROR;

      if (value instanceof RegExp)
        return types.REGEX;

      if (value instanceof Date) {
        const time = value.getTime();
        if (time !== time)
          return types.INVALID_DATE;
        return types.DATE;
      }

      if (value instanceof Promise)
        return types.PROMISE;

      if (value instanceof ArrayBuffer)
        return types.ARRAY_BUFFER;

      if (HAS_SHARED_ARRAY_BUFFER) {
        if (value instanceof SharedArrayBuffer)
          return types.SHARED_ARRAY_BUFFER;
      }

      if (Buffer.isBuffer(value))
        return types.BUFFER;

      if (value instanceof Int8Array)
        return types.INT8_ARRAY;

      if (value instanceof Uint8Array)
        return types.UINT8_ARRAY;

      if (value instanceof Uint8ClampedArray)
        return types.UINT8_CLAMPED_ARRAY;

      if (value instanceof Int16Array)
        return types.INT16_ARRAY;

      if (value instanceof Uint16Array)
        return types.UINT16_ARRAY;

      if (value instanceof Int32Array)
        return types.INT32_ARRAY;

      if (value instanceof Uint32Array)
        return types.UINT32_ARRAY;

      if (value instanceof Float32Array)
        return types.FLOAT32_ARRAY;

      if (value instanceof Float64Array)
        return types.FLOAT64_ARRAY;

      if (value instanceof DataView)
        return types.DATA_VIEW;

      if (HAS_BIGINT64_ARRAY) {
        if (value instanceof BigInt64Array)
          return types.BIG_INT64_ARRAY;
      }

      if (HAS_BIGUINT64_ARRAY) {
        if (value instanceof BigUint64Array)
          return types.BIG_UINT64_ARRAY;
      }

      if (HAS_FILE) {
        if (value instanceof File)
          return types.FILE;
      }

      if (HAS_BLOB) {
        if (value instanceof Blob)
          return types.BLOB;
      }

      if (HAS_FILE_LIST) {
        if (value instanceof FileList)
          return types.FILE_LIST;
      }

      if (HAS_IMAGE_DATA) {
        if (value instanceof ImageData)
          return types.IMAGE_DATA;
      }

      if (HAS_IMAGE_BITMAP) {
        if (value instanceof ImageBitmap)
          return types.IMAGE_BITMAP;
      }

      if (value._bthreadsPort === true)
        return types.MESSAGE_PORT;

      if (Array.isArray(value))
        return types.ARRAY;

      if (value instanceof Map)
        return types.MAP;

      if (value instanceof Set)
        return types.SET;

      return types.OBJECT;
    }

    default: {
      throw new DataCloneError(null, value);
    }
  }
}

function getSize(value, seen = new Set()) {
  const type = getType(value);

  let size = 0;

  if (isObject(value)) {
    if (seen.has(value)) {
      size += 1;
      size += 4;
      return size;
    }

    seen.add(value);
  }

  size += 1;

  switch (type) {
    case types.REFERENCE: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.UNDEFINED: {
      break;
    }

    case types.NULL: {
      break;
    }

    case types.TRUE: {
      break;
    }

    case types.FALSE: {
      break;
    }

    case types.NUMBER: {
      size += 8;
      break;
    }

    case types.NAN: {
      break;
    }

    case types.POSITIVE_INFINITY: {
      break;
    }

    case types.NEGATIVE_INFINITY: {
      break;
    }

    case types.NEGATIVE_ZERO: {
      break;
    }

    case types.INT32: {
      size += 4;
      break;
    }

    case types.UINT32: {
      size += 4;
      break;
    }

    case types.STRING: {
      size += bio.sizeVarString(value, 'utf8');
      break;
    }

    case types.SYMBOL: {
      throw new DataCloneError(null, value);
    }

    case types.BIGINT: {
      if (!HAS_BIGINT)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      if (value < B0)
        value = -value;

      size += 1;

      let len = 0;

      while (value > B0) {
        value >>= B8;
        len += 1;
      }

      if (len === 0)
        len = 1;

      size += bio.sizeVarlen(len);

      break;
    }

    case types.FUNCTION: {
      throw new DataCloneError(null, value);
    }

    case types.OBJECT: {
      const keys = Object.keys(value);

      size += 4;

      for (const key of keys) {
        size += bio.sizeVarString(key, 'utf8');
        size += getSize(value[key], seen);
      }

      break;
    }

    case types.ARRAY: {
      size += 4;

      for (const val of value)
        size += getSize(val, seen);

      break;
    }

    case types.MAP: {
      size += 4;

      for (const [key, val] of value) {
        size += getSize(key, seen);
        size += getSize(val, seen);
      }

      break;
    }

    case types.SET: {
      size += 4;

      for (const key of value)
        size += getSize(key, seen);

      break;
    }

    case types.ERROR: {
      throw new DataCloneError(null, value);
    }

    case types.REGEX: {
      size += bio.sizeVarString(value.source, 'utf8');
      size += bio.sizeVarString(value.flags, 'utf8');
      break;
    }

    case types.DATE: {
      size += 8;
      break;
    }

    case types.INVALID_DATE: {
      break;
    }

    case types.PROMISE: {
      throw new DataCloneError(null, value);
    }

    case types.PROXY: {
      throw new DataCloneError(null, value);
    }

    case types.ARRAY_BUFFER: {
      size += bio.sizeVarlen(value.byteLength);
      break;
    }

    case types.SHARED_ARRAY_BUFFER: {
      throw new DataCloneError(errors.INVALID_SHARED);
    }

    case types.BUFFER: {
      size += bio.sizeVarlen(value.length);
      break;
    }

    case types.INT8_ARRAY:
    case types.UINT8_ARRAY:
    case types.UINT8_CLAMPED_ARRAY:
    case types.INT16_ARRAY:
    case types.UINT16_ARRAY:
    case types.INT32_ARRAY:
    case types.UINT32_ARRAY:
    case types.FLOAT32_ARRAY:
    case types.FLOAT64_ARRAY:
    case types.DATA_VIEW:
    case types.BIG_INT64_ARRAY:
    case types.BIG_UINT64_ARRAY: {
      size += bio.sizeVarlen(value.byteLength);
      break;
    }

    case types.BLOB: {
      size += bio.sizeVarString(value.type, 'utf8');
      size += bio.sizeVarlen(value.size);
      break;
    }

    case types.FILE: {
      size += bio.sizeVarString(value.name, 'utf8');
      size += bio.sizeVarString(value.type, 'utf8');
      size += 8;
      size += bio.sizeVarlen(value.size);
      break;
    }

    case types.FILE_LIST: {
      size += 4;

      for (let i = 0; i < value.length; i++)
        size += getSize(value[i], seen);

      break;
    }

    case types.IMAGE_DATA: {
      size += 4;
      size += 4;
      size += getSize(value.data, seen);
      break;
    }

    case types.IMAGE_BITMAP: {
      throw new DataCloneError(null, value);
    }

    case types.MESSAGE_PORT: {
      size += 8;
      break;
    }

    default: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }
  }

  return size;
}

function write(bw, value, seen = new Map()) {
  const type = getType(value);

  if (isObject(value)) {
    const index = seen.get(value);

    if (index != null) {
      bw.writeU8(types.REFERENCE);
      bw.writeU32(index);
      return;
    }

    seen.set(value, seen.size);
  }

  bw.writeU8(type);

  switch (type) {
    case types.REFERENCE: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.UNDEFINED: {
      break;
    }

    case types.NULL: {
      break;
    }

    case types.TRUE: {
      break;
    }

    case types.FALSE: {
      break;
    }

    case types.NUMBER: {
      bw.writeDouble(value);
      break;
    }

    case types.NAN: {
      break;
    }

    case types.POSITIVE_INFINITY: {
      break;
    }

    case types.NEGATIVE_INFINITY: {
      break;
    }

    case types.NEGATIVE_ZERO: {
      break;
    }

    case types.INT32: {
      bw.writeI32(value);
      break;
    }

    case types.UINT32: {
      bw.writeU32(value);
      break;
    }

    case types.STRING: {
      bw.writeVarString(value, 'utf8');
      break;
    }

    case types.SYMBOL: {
      throw new DataCloneError(null, value);
    }

    case types.BIGINT: {
      if (!HAS_BIGINT)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      let sign = 0;

      if (value < B0) {
        sign = 1;
        value = -value;
      }

      bw.writeU8(sign);

      let hex = value.toString(16);

      if (hex.length & 1)
        hex = '0' + hex;

      bw.writeVarString(hex, 'hex');

      break;
    }

    case types.FUNCTION: {
      throw new DataCloneError(null, value);
    }

    case types.OBJECT: {
      const keys = Object.keys(value);

      bw.writeU32(keys.length);

      for (const key of keys) {
        bw.writeVarString(key, 'utf8');
        write(bw, value[key], seen);
      }

      break;
    }

    case types.ARRAY: {
      bw.writeU32(value.length);

      for (const val of value)
        write(bw, val, seen);

      break;
    }

    case types.MAP: {
      bw.writeU32(value.size);

      for (const [key, val] of value) {
        write(bw, key, seen);
        write(bw, val, seen);
      }

      break;
    }

    case types.SET: {
      bw.writeU32(value.size);

      for (const key of value)
        write(bw, key, seen);

      break;
    }

    case types.ERROR: {
      throw new DataCloneError(null, value);
    }

    case types.REGEX: {
      bw.writeVarString(value.source, 'utf8');
      bw.writeVarString(value.flags, 'utf8');
      break;
    }

    case types.DATE: {
      bw.writeU64(value.getTime());
      break;
    }

    case types.INVALID_DATE: {
      break;
    }

    case types.PROMISE: {
      throw new DataCloneError(null, value);
    }

    case types.PROXY: {
      throw new DataCloneError(null, value);
    }

    case types.ARRAY_BUFFER: {
      const data = Buffer.from(value, 0, value.byteLength);
      bw.writeVarBytes(data);
      break;
    }

    case types.SHARED_ARRAY_BUFFER: {
      throw new DataCloneError(errors.INVALID_SHARED);
    }

    case types.BUFFER: {
      bw.writeVarBytes(value);
      break;
    }

    case types.INT8_ARRAY:
    case types.UINT8_ARRAY:
    case types.UINT8_CLAMPED_ARRAY:
    case types.INT16_ARRAY:
    case types.UINT16_ARRAY:
    case types.INT32_ARRAY:
    case types.UINT32_ARRAY:
    case types.FLOAT32_ARRAY:
    case types.FLOAT64_ARRAY:
    case types.DATA_VIEW:
    case types.BIG_INT64_ARRAY:
    case types.BIG_UINT64_ARRAY: {
      const data = Buffer.from(value.buffer,
                               value.byteOffset,
                               value.byteLength);
      bw.writeVarBytes(data);
      break;
    }

    case types.BLOB: {
      bw.writeVarString(value.type, 'utf8');
      bw.writeVarBytes(unblob(value));
      break;
    }

    case types.FILE: {
      bw.writeVarString(value.name, 'utf8');
      bw.writeVarString(value.type, 'utf8');
      bw.writeU64(value.lastModified);
      bw.writeVarBytes(unblob(value));
      break;
    }

    case types.FILE_LIST: {
      bw.writeU32(value.length);

      for (let i = 0; i < value.length; i++)
        write(bw, value[i], seen);

      break;
    }

    case types.IMAGE_DATA: {
      bw.writeU32(value.width);
      bw.writeU32(value.height);
      write(bw, value.data, seen);
      break;
    }

    case types.IMAGE_BITMAP: {
      throw new DataCloneError(null, value);
    }

    case types.MESSAGE_PORT: {
      if (value._closed || !value._port)
        throw new DataCloneError(errors.DETACHED_PORT);

      if (!value._dead || !value._list)
        throw new WorkerError(errors.NO_PORT);

      bw.writeU64(value._id);

      value._list = false;

      break;
    }

    default: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }
  }
}

function decode(data, parent) {
  return read(bio.read(data), parent);
}

function read(br, parent, refs = []) {
  const type = br.readU8();

  switch (type) {
    case types.REFERENCE: {
      const index = br.readU32();

      if (index >= refs.length)
        throw new DataCloneError(errors.DESERIALIZE);

      return refs[index];
    }

    case types.UNDEFINED: {
      return undefined;
    }

    case types.NULL: {
      return null;
    }

    case types.TRUE: {
      return true;
    }

    case types.FALSE: {
      return false;
    }

    case types.NUMBER: {
      return br.readDouble();
    }

    case types.NAN: {
      return NaN;
    }

    case types.POSITIVE_INFINITY: {
      return Infinity;
    }

    case types.NEGATIVE_INFINITY: {
      return -Infinity;
    }

    case types.NEGATIVE_ZERO: {
      return -0;
    }

    case types.INT32: {
      return br.readI32();
    }

    case types.UINT32: {
      return br.readU32();
    }

    case types.STRING: {
      return br.readVarString('utf8');
    }

    case types.SYMBOL: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.BIGINT: {
      if (!HAS_BIGINT)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const sign = br.readU8();
      const hex = br.readVarString('hex');

      let value = BigInt(`0x${hex}`);

      if (sign)
        value = -value;

      return value;
    }

    case types.FUNCTION: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.OBJECT: {
      const obj = {};
      const count = br.readU32();

      refs.push(obj);

      for (let i = 0; i < count; i++) {
        const key = br.readVarString('utf8');
        const value = read(br, parent, refs);

        if (key === '__proto__')
          continue;

        obj[key] = value;
      }

      return obj;
    }

    case types.ARRAY: {
      const arr = [];
      const count = br.readU32();

      refs.push(arr);

      for (let i = 0; i < count; i++) {
        const value = read(br, parent, refs);
        arr.push(value);
      }

      return arr;
    }

    case types.MAP: {
      const map = new Map();
      const count = br.readU32();

      refs.push(map);

      for (let i = 0; i < count; i++) {
        const key = read(br, parent, refs);
        const value = read(br, parent, refs);

        map.set(key, value);
      }

      return map;
    }

    case types.SET: {
      const set = new Set();
      const count = br.readU32();

      refs.push(set);

      for (let i = 0; i < count; i++) {
        const value = read(br, parent, refs);
        set.add(value);
      }

      return set;
    }

    case types.ERROR: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.REGEX: {
      const source = br.readVarString('utf8');
      const flags = br.readVarString('utf8');
      const regex = new RegExp(source, flags);

      refs.push(regex);

      return regex;
    }

    case types.DATE: {
      const ms = br.readU64();
      const date = new Date(ms);
      refs.push(date);
      return date;
    }

    case types.INVALID_DATE: {
      const date = new Date(NaN);
      refs.push(date);
      return date;
    }

    case types.PROMISE: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.PROXY: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.ARRAY_BUFFER: {
      const slice = br.readVarBytes(true);
      const data = Buffer.allocUnsafeSlow(slice.length);
      slice.copy(data, 0);
      refs.push(data.buffer);
      return data.buffer;
    }

    case types.SHARED_ARRAY_BUFFER: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.BUFFER: {
      const data = br.readVarBytes();
      const arr = new Uint8Array(data.buffer,
                                 data.byteOffset,
                                 data.byteLength);
      refs.push(arr);
      return arr;
    }

    case types.INT8_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Int8Array(data.buffer,
                                data.byteOffset,
                                data.byteLength);
      refs.push(arr);
      return arr;
    }

    case types.UINT8_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Uint8Array(data.buffer,
                                 data.byteOffset,
                                 data.byteLength);
      refs.push(arr);
      return arr;
    }

    case types.UINT8_CLAMPED_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Uint8ClampedArray(data.buffer,
                                        data.byteOffset,
                                        data.byteLength);
      refs.push(arr);
      return arr;
    }

    case types.INT16_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Int16Array(data.buffer,
                                 data.byteOffset,
                                 data.byteLength / 2);
      refs.push(arr);
      return arr;
    }

    case types.UINT16_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Uint16Array(data.buffer,
                                  data.byteOffset,
                                  data.byteLength / 2);
      refs.push(arr);
      return arr;
    }

    case types.INT32_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Int32Array(data.buffer,
                                 data.byteOffset,
                                 data.byteLength / 4);
      refs.push(arr);
      return arr;
    }

    case types.UINT32_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Uint32Array(data.buffer,
                                  data.byteOffset,
                                  data.byteLength / 4);
      refs.push(arr);
      return arr;
    }

    case types.FLOAT32_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Float32Array(data.buffer,
                                   data.byteOffset,
                                   data.byteLength / 4);
      refs.push(arr);
      return arr;
    }

    case types.FLOAT64_ARRAY: {
      const data = br.readVarBytes();
      const arr = new Float64Array(data.buffer,
                                   data.byteOffset,
                                   data.byteLength / 8);
      refs.push(arr);
      return arr;
    }

    case types.DATA_VIEW: {
      const data = br.readVarBytes();
      const arr = new DataView(data.buffer,
                               data.byteOffset,
                               data.byteLength);
      refs.push(arr);
      return arr;
    }

    case types.BIG_INT64_ARRAY: {
      if (!HAS_BIGINT64_ARRAY)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const data = br.readVarBytes();
      const arr = new BigInt64Array(data.buffer,
                                    data.byteOffset,
                                    data.byteLength / 8);

      refs.push(arr);

      return arr;
    }

    case types.BIG_UINT64_ARRAY: {
      if (!HAS_BIGUINT64_ARRAY)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const data = br.readVarBytes();
      const arr = new BigUint64Array(data.buffer,
                                     data.byteOffset,
                                     data.byteLength / 8);

      refs.push(arr);

      return arr;
    }

    case types.BLOB: {
      if (!HAS_BLOB)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const type = br.readVarString('utf8');
      const data = br.readVarBytes();
      const blob = new Blob([data], { type });

      refs.push(blob);

      return blob;
    }

    case types.FILE: {
      if (!HAS_FILE)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const name = br.readVarString('utf8');
      const type = br.readVarString('utf8');
      const lastModified = br.readU64();
      const data = br.readVarBytes();
      const file = new File([data], name, { type, lastModified });

      refs.push(file);

      return file;
    }

    case types.FILE_LIST: {
      if (!HAS_FILE_LIST)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const count = br.readU32();
      const list = [];

      refs.push(list);

      for (let i = 0; i < count; i++)
        list.push(read(br, parent, refs));

      return list;
    }

    case types.IMAGE_DATA: {
      if (!HAS_IMAGE_DATA)
        throw new WorkerError(errors.CANNOT_TRANSFER);

      const width = br.readU32();
      const height = br.readU32();
      const index = refs.push(null) - 1;
      const data = read(br, parent, refs);
      const image = new ImageData(data, width, height);

      refs[index] = image;

      return image;
    }

    case types.IMAGE_BITMAP: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }

    case types.MESSAGE_PORT: {
      if (!parent)
        throw new DataCloneError(errors.DESERIALIZE);

      const id = br.readU64();
      const port = parent._attach(id);

      refs.push(port);

      return port;
    }

    default: {
      throw new WorkerError(errors.CANNOT_TRANSFER);
    }
  }
}

/*
 * Stringification
 */

function stringify(value) {
  return encode(value).toString('base64');
}

function parse(str) {
  if (typeof str !== 'string')
    throw new ArgError('str', str, 'string');

  const data = Buffer.from(str, 'base64');

  return decode(data);
}

/*
 * Helpers
 */

function isObject(value) {
  if (value === null)
    return false;

  return typeof value === 'object';
}

function unblob(blob) {
  if (!HAS_URL || !HAS_XHR)
    throw new WorkerError(errors.CANNOT_TRANSFER);

  // Hack to get a blob's data synchronously.
  const url = URL.createObjectURL(blob);
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, false);
  xhr.overrideMimeType('text/plain; charset=x-user-defined');

  try {
    xhr.send(null);
  } catch (e) {
    throw new DataCloneError(null, blob);
  } finally {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {
      ;
    }
  }

  const status = xhr.status >>> 0;

  if (status < 200 || status >= 400)
    throw new DataCloneError(null, blob);

  const data = String(xhr.responseText || '');

  return Buffer.from(data, 'binary');
}

/*
 * Expose
 */

exports.encode = encode;
exports.getType = getType;
exports.getSize = getSize;
exports.write = write;
exports.decode = decode;
exports.read = read;
exports.stringify = stringify;
exports.parse = parse;
