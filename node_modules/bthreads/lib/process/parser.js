/*!
 * parser.js - streaming parser for bthreads
 * Copyright (c) 2014-2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const bio = require('bufio');
const EventEmitter = require('events');
const encoding = require('../internal/encoding');
const utils = require('../internal/utils');
const Packet = require('./packet');
const {WorkerError, errors} = utils;
const {types} = Packet;

/**
 * Parser
 */

class Parser extends EventEmitter {
  constructor(parent) {
    super();

    this.parent = parent;
    this.waiting = 13;
    this.header = null;
    this.pending = [];
    this.total = 0;
    this.closed = false;
  }

  destroy() {
    this.closed = true;
    this.waiting = -1 >>> 0;
    this.header = null;
    this.pending.length = 0;
    this.total = 0;
  }

  feed(data) {
    if (this.closed)
      return;

    this.total += data.length;
    this.pending.push(data);

    while (this.total >= this.waiting) {
      const chunk = this.read(this.waiting);
      this.parse(chunk);
    }
  }

  read(size) {
    if (this.total < size)
      throw new Error('Reading too much.');

    if (size === 0)
      return Buffer.alloc(0);

    const pending = this.pending[0];

    if (pending.length > size) {
      const chunk = pending.slice(0, size);
      this.pending[0] = pending.slice(size);
      this.total -= chunk.length;
      return chunk;
    }

    if (pending.length === size) {
      const chunk = this.pending.shift();
      this.total -= chunk.length;
      return chunk;
    }

    const chunk = Buffer.allocUnsafe(size);

    let off = 0;

    while (off < chunk.length) {
      const pending = this.pending[0];
      const len = pending.copy(chunk, off);
      if (len === pending.length)
        this.pending.shift();
      else
        this.pending[0] = pending.slice(len);
      off += len;
    }

    if (off !== chunk.length)
      throw new RangeError('Invalid length.');

    this.total -= chunk.length;

    return chunk;
  }

  parse(data) {
    let header = this.header;

    if (!header) {
      try {
        header = this.parseHeader(data);
      } catch (e) {
        this.emit('error', e);
        return;
      }

      this.header = header;
      this.waiting = header.size + 1;

      return;
    }

    this.waiting = 13;
    this.header = null;

    let packet;
    try {
      packet = this.parsePacket(header, data);
    } catch (e) {
      this.emit('error', e);
      return;
    }

    if (data[data.length - 1] !== 0x0a) {
      this.emit('error', new Error('No trailing newline.'));
      return;
    }

    this.emit('packet', packet);
  }

  parseHeader(data) {
    const type = data[0];

    if (type > types.MAX_TYPE)
      throw new WorkerError(errors.INVALID_PACKET, type);

    const port = bio.readU64(data, 1);
    const size = bio.readU32(data, 9);

    return new Header(type, port, size);
  }

  parsePacket(header, data) {
    const pkt = new Packet();
    pkt.type = header.type;
    pkt.port = header.port;
    pkt.value = encoding.decode(data, this.parent);
    return pkt;
  }
}

/**
 * Header
 */

class Header {
  constructor(type, port, size) {
    this.type = type;
    this.port = port;
    this.size = size;
  }
}

/*
 * Expose
 */

module.exports = Parser;
