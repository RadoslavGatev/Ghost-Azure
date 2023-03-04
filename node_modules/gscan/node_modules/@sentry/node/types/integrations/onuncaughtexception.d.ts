import type { Integration } from '@sentry/types';
interface OnUncaughtExceptionOptions {
    /**
     * Controls if the SDK should register a handler to exit the process on uncaught errors:
     * - `true`: The SDK will exit the process on all uncaught errors.
     * - `false`: The SDK will only exit the process when there are no other `uncaughtException` handlers attached.
     *
     * Default: `true`
     */
    exitEvenIfOtherHandlersAreRegistered: boolean;
    /**
     * This is called when an uncaught error would cause the process to exit.
     *
     * @param firstError Uncaught error causing the process to exit
     * @param secondError Will be set if the handler was called multiple times. This can happen either because
     * `onFatalError` itself threw, or because an independent error happened somewhere else while `onFatalError`
     * was running.
     */
    onFatalError?(this: void, firstError: Error, secondError?: Error): void;
}
/** Global Exception handler */
export declare class OnUncaughtException implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    readonly handler: (error: Error) => void;
    private readonly _options;
    /**
     * @inheritDoc
     */
    constructor(options?: Partial<OnUncaughtExceptionOptions>);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /**
     * @hidden
     */
    private _makeErrorHandler;
}
export {};
//# sourceMappingURL=onuncaughtexception.d.ts.map