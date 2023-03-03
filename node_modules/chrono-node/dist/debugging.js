"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedDebugHandler = void 0;
class BufferedDebugHandler {
    constructor() {
        this.buffer = [];
    }
    debug(debugMsg) {
        this.buffer.push(debugMsg);
    }
    executeBufferedBlocks() {
        const logs = this.buffer.map((block) => block());
        this.buffer = [];
        return logs;
    }
}
exports.BufferedDebugHandler = BufferedDebugHandler;
