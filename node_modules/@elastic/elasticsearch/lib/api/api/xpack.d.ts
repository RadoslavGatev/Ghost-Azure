import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Xpack {
    transport: Transport;
    constructor(transport: Transport);
    info(this: That, params?: T.XpackInfoRequest | TB.XpackInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.XpackInfoResponse>;
    info(this: That, params?: T.XpackInfoRequest | TB.XpackInfoRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.XpackInfoResponse, unknown>>;
    info(this: That, params?: T.XpackInfoRequest | TB.XpackInfoRequest, options?: TransportRequestOptions): Promise<T.XpackInfoResponse>;
    usage(this: That, params?: T.XpackUsageRequest | TB.XpackUsageRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.XpackUsageResponse>;
    usage(this: That, params?: T.XpackUsageRequest | TB.XpackUsageRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.XpackUsageResponse, unknown>>;
    usage(this: That, params?: T.XpackUsageRequest | TB.XpackUsageRequest, options?: TransportRequestOptions): Promise<T.XpackUsageResponse>;
}
export {};
