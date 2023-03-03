/*!
 * buffered.js - buffering event emitter for bthreads
 * Copyright (c) 2019, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bthreads
 */

'use strict';

const {EventEmitter} = require('events');

/**
 * BufferedEmitter
 */

class BufferedEmitter extends EventEmitter {
  constructor() {
    super();

    this._listening = false;
    this._buffer = [];

    this._setup();
  }

  _setup() {
    this.on('newListener', (event, handler) => {
      if (event === 'message' && this.listenerCount(event) === 0) {
        setImmediate(() => this._flush());
        this._listening = true;
      }
    });

    this.on('removeListener', (event, handler) => {
      if (event === 'message' && this.listenerCount(event) === 0)
        this._listening = false;
    });
  }

  _flush() {
    if (!this._listening)
      return;

    const buffer = this._buffer;

    if (!buffer || buffer.length === 0)
      return;

    this._buffer = [];

    for (const msg of buffer)
      super.emit('message', msg);
  }

  emit(name, ...args) {
    if (name === 'message' && !this._listening && this._buffer) {
      this._buffer.push(args[0]);
      return false;
    }

    if (name === 'close')
      this._buffer = null;

    return super.emit(name, ...args);
  }
}

/*
 * Expose
 */

module.exports = BufferedEmitter;
