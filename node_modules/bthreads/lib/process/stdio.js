/*!
 * stdio.js - stdio streams for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 *
 * Parts of this software are based on nodejs/node:
 *   Copyright Node.js contributors. All rights reserved.
 *   https://github.com/nodejs/node
 */

'use strict';

const stream = require('stream');
const utils = require('../internal/utils');
const Packet = require('./packet');
const {custom, inspectify} = utils;
const {STDIO_READ, STDIO_WRITE} = Packet.types;

/**
 * Readable
 */

class Readable extends stream.Readable {
  constructor(port, fd) {
    super();

    this._port = port;
    this._fd = fd;
    this._increments = true;
    this._started = false;

    this.on('end', () => {
      // See: https://github.com/nodejs/node/pull/28153
      if (this._started && this._increments) {
        if (--this._port._stdioRefs === 0)
          this._port._stdioRef.unref();
      }
    });
  }

  _read() {
    if (!this._started && this._increments) {
      this._started = true;

      if (this._port._stdioRefs === 0)
        this._port._stdioRef.ref();

      this._port._stdioRefs += 1;
    }

    this._port._send(new Packet(STDIO_READ, 0, this._fd));
  }

  [custom]() {
    return inspectify(Readable);
  }
}

/**
 * Writable
 */

class Writable extends stream.Writable {
  constructor(port, fd) {
    super({ decodeStrings: false });
    this._port = port;
    this._fd = fd;
    this._callbacks = [];
  }

  _write(data, enc, cb) {
    this._port._send(new Packet(STDIO_WRITE, 0, [this._fd, data, enc]));
    this._callbacks.push(cb);

    if (this._port._stdioRefs === 0)
      this._port._stdioRef.ref();

    this._port._stdioRefs += 1;
  }

  _final(cb) {
    this._port._send(new Packet(STDIO_WRITE, 0, [this._fd, null, null]));
    cb();
  }

  _moreData() {
    const cbs = this._callbacks;

    this._callbacks = [];

    for (const cb of cbs)
      cb();

    this._port._stdioRefs -= cbs.length;

    if (this._port._stdioRefs === 0)
      this._port._stdioRef.unref();
  }

  [custom]() {
    return inspectify(Writable);
  }
}

/*
 * Expose
 */

exports.Readable = Readable;
exports.Writable = Writable;
