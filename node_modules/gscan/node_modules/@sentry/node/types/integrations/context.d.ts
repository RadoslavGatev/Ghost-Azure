/// <reference types="node" />
import type { DeviceContext, Event, EventProcessor, Integration } from '@sentry/types';
import { readdir, readFile } from 'fs';
export declare const readFileAsync: typeof readFile.__promisify__;
export declare const readDirAsync: typeof readdir.__promisify__;
interface DeviceContextOptions {
    cpu?: boolean;
    memory?: boolean;
}
interface ContextOptions {
    app?: boolean;
    os?: boolean;
    device?: DeviceContextOptions | boolean;
    culture?: boolean;
}
/** Add node modules / packages to the event */
export declare class Context implements Integration {
    private readonly _options;
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * Caches context so it's only evaluated once
     */
    private _cachedContext;
    constructor(_options?: ContextOptions);
    /**
     * @inheritDoc
     */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void): void;
    /** Processes an event and adds context */
    addContext(event: Event): Promise<Event>;
    /**
     * Updates the context with dynamic values that can change
     */
    private _updateContext;
    /**
     * Gets the contexts for the current environment
     */
    private _getContexts;
}
/**
 * Gets device information from os
 */
export declare function getDeviceContext(deviceOpt: DeviceContextOptions | true): DeviceContext;
export {};
//# sourceMappingURL=context.d.ts.map