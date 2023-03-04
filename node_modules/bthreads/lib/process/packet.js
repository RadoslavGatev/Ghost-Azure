/*!
 * packet.js - worker packets for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const bio = require('bufio');
const encoding = require('../internal/encoding');
const utils = require('../internal/utils');
const {WorkerError, errors} = utils;

/*
 * Constants
 */

const types = {
  MESSAGE: 0,
  STDIO_READ: 1,
  STDIO_WRITE: 2,
  ERROR: 3,
  OPEN: 4,
  CLOSE: 5,
  EXIT: 6,
  MAX_TYPE: 6
};

/**
 * Packet
 */

class Packet extends bio.Struct {
  constructor(type, port, value) {
    super();

    this.type = type || 0;
    this.port = port || 0;
    this.value = value;
  }

  getSize() {
    return 13 + encoding.getSize(this.value) + 1;
  }

  write(bw) {
    const size = bw.data.length - 14;

    bw.writeU8(this.type);
    bw.writeU64(this.port);
    bw.writeU32(size);
    encoding.write(bw, this.value);
    bw.writeU8(0x0a);

    return this;
  }

  read(br, parent) {
    this.type = br.readU8();
    this.port = br.readU64();

    if (this.type > types.MAX_TYPE)
      throw new WorkerError(errors.INVALID_PACKET, this.type);

    const size = br.readU32();
    const data = br.readBytes(size, true);

    this.value = encoding.decode(data, parent);

    if (br.readU8() !== 0x0a)
      throw new Error('No trailing newline.');

    return this;
  }
}

/*
 * Static
 */

Packet.types = types;

/*
 * Expose
 */

module.exports = Packet;
