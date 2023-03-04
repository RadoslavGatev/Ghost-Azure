export declare type InstrumentHandlerType = 'console' | 'dom' | 'fetch' | 'history' | 'sentry' | 'xhr' | 'error' | 'unhandledrejection';
export declare type InstrumentHandlerCallback = (data: any) => void;
/**
 * Add handler that will be called when given type of instrumentation triggers.
 * Use at your own risk, this might break without changelog notice, only used internally.
 * @hidden
 */
export declare function addInstrumentationHandler(type: InstrumentHandlerType, callback: InstrumentHandlerCallback): void;
//# sourceMappingURL=instrument.d.ts.map