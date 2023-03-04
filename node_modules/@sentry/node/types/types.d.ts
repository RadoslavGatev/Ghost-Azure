import { ClientOptions, Options, TracePropagationTargets } from '@sentry/types';
import { NodeTransportOptions } from './transports';
export interface BaseNodeOptions {
    /** Sets an optional server name (device name) */
    serverName?: string;
    /**
     * List of strings/regex controlling to which outgoing requests
     * the SDK will attach tracing headers.
     *
     * By default the SDK will attach those headers to all outgoing
     * requests. If this option is provided, the SDK will match the
     * request URL of outgoing requests against the items in this
     * array, and only attach tracing headers if a match was found.
     */
    tracePropagationTargets?: TracePropagationTargets;
    /** Callback that is executed when a fatal global error occurs. */
    onFatalError?(error: Error): void;
}
/**
 * Configuration options for the Sentry Node SDK
 * @see @sentry/types Options for more information.
 */
export interface NodeOptions extends Options<NodeTransportOptions>, BaseNodeOptions {
}
/**
 * Configuration options for the Sentry Node SDK Client class
 * @see NodeClient for more information.
 */
export interface NodeClientOptions extends ClientOptions<NodeTransportOptions>, BaseNodeOptions {
}
//# sourceMappingURL=types.d.ts.map