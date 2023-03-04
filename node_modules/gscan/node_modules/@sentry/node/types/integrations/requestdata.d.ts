import type { Event, EventProcessor, Hub, Integration, PolymorphicRequest } from '@sentry/types';
import type { TransactionNamingScheme } from '../requestdata';
export declare type RequestDataIntegrationOptions = {
    /**
     * Controls what data is pulled from the request and added to the event
     */
    include?: {
        cookies?: boolean;
        data?: boolean;
        headers?: boolean;
        ip?: boolean;
        query_string?: boolean;
        url?: boolean;
        user?: boolean | {
            id?: boolean;
            username?: boolean;
            email?: boolean;
        };
    };
    /** Whether to identify transactions by parameterized path, parameterized path with method, or handler name */
    transactionNamingScheme?: TransactionNamingScheme;
};
/** Add data about a request to an event. Primarily for use in Node-based SDKs, but included in `@sentry/integrations`
 * so it can be used in cross-platform SDKs like `@sentry/nextjs`. */
export declare class RequestData implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * Function for adding request data to event. Defaults to `addRequestDataToEvent` from `@sentry/node` for now, but
     * left as a property so this integration can be moved to `@sentry/core` as a base class in case we decide to use
     * something similar in browser-based SDKs in the future.
     */
    protected _addRequestData: (event: Event, req: PolymorphicRequest, options?: {
        [key: string]: unknown;
    }) => Event;
    private _options;
    /**
     * @inheritDoc
     */
    constructor(options?: RequestDataIntegrationOptions);
    /**
     * @inheritDoc
     */
    setupOnce(addGlobalEventProcessor: (eventProcessor: EventProcessor) => void, getCurrentHub: () => Hub): void;
}
//# sourceMappingURL=requestdata.d.ts.map