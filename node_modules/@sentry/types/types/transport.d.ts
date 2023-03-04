import { EventDropReason } from './clientreport';
import { DataCategory } from './datacategory';
import { Envelope } from './envelope';
import { TextEncoderInternal } from './textencoder';
export declare type TransportRequest = {
    body: string | Uint8Array;
};
export declare type TransportMakeRequestResponse = {
    statusCode?: number;
    headers?: {
        [key: string]: string | null;
        'x-sentry-rate-limits': string | null;
        'retry-after': string | null;
    };
};
export interface InternalBaseTransportOptions {
    bufferSize?: number;
    recordDroppedEvent: (reason: EventDropReason, dataCategory: DataCategory) => void;
    textEncoder?: TextEncoderInternal;
}
export interface BaseTransportOptions extends InternalBaseTransportOptions {
    url: string;
}
export interface Transport {
    send(request: Envelope): PromiseLike<void>;
    flush(timeout?: number): PromiseLike<boolean>;
}
export declare type TransportRequestExecutor = (request: TransportRequest) => PromiseLike<TransportMakeRequestResponse>;
//# sourceMappingURL=transport.d.ts.map