export declare type AsyncDebugBlock = () => unknown;
export declare type DebugConsume = (debugLog: AsyncDebugBlock) => void;
export interface DebugHandler {
    debug: DebugConsume;
}
export declare class BufferedDebugHandler implements DebugHandler {
    private buffer;
    constructor();
    debug(debugMsg: AsyncDebugBlock): void;
    executeBufferedBlocks(): Array<unknown>;
}
