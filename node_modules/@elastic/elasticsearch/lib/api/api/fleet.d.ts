import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Fleet {
    transport: Transport;
    constructor(transport: Transport);
    globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest | TB.FleetGlobalCheckpointsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetGlobalCheckpointsResponse>;
    globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest | TB.FleetGlobalCheckpointsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetGlobalCheckpointsResponse, unknown>>;
    globalCheckpoints(this: That, params: T.FleetGlobalCheckpointsRequest | TB.FleetGlobalCheckpointsRequest, options?: TransportRequestOptions): Promise<T.FleetGlobalCheckpointsResponse>;
    msearch<TDocument = unknown>(this: That, params: T.FleetMsearchRequest | TB.FleetMsearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetMsearchResponse<TDocument>>;
    msearch<TDocument = unknown>(this: That, params: T.FleetMsearchRequest | TB.FleetMsearchRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetMsearchResponse<TDocument>, unknown>>;
    msearch<TDocument = unknown>(this: That, params: T.FleetMsearchRequest | TB.FleetMsearchRequest, options?: TransportRequestOptions): Promise<T.FleetMsearchResponse<TDocument>>;
    search<TDocument = unknown>(this: That, params: T.FleetSearchRequest | TB.FleetSearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FleetSearchResponse<TDocument>>;
    search<TDocument = unknown>(this: That, params: T.FleetSearchRequest | TB.FleetSearchRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FleetSearchResponse<TDocument>, unknown>>;
    search<TDocument = unknown>(this: That, params: T.FleetSearchRequest | TB.FleetSearchRequest, options?: TransportRequestOptions): Promise<T.FleetSearchResponse<TDocument>>;
}
export {};
