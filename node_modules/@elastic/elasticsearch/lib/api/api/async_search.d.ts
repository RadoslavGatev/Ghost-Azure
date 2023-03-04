import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class AsyncSearch {
    transport: Transport;
    constructor(transport: Transport);
    delete(this: That, params: T.AsyncSearchDeleteRequest | TB.AsyncSearchDeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchDeleteResponse>;
    delete(this: That, params: T.AsyncSearchDeleteRequest | TB.AsyncSearchDeleteRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchDeleteResponse, unknown>>;
    delete(this: That, params: T.AsyncSearchDeleteRequest | TB.AsyncSearchDeleteRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchDeleteResponse>;
    get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.AsyncSearchGetRequest | TB.AsyncSearchGetRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchGetResponse<TDocument, TAggregations>>;
    get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.AsyncSearchGetRequest | TB.AsyncSearchGetRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchGetResponse<TDocument, TAggregations>, unknown>>;
    get<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.AsyncSearchGetRequest | TB.AsyncSearchGetRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchGetResponse<TDocument, TAggregations>>;
    status(this: That, params: T.AsyncSearchStatusRequest | TB.AsyncSearchStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchStatusResponse>;
    status(this: That, params: T.AsyncSearchStatusRequest | TB.AsyncSearchStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchStatusResponse, unknown>>;
    status(this: That, params: T.AsyncSearchStatusRequest | TB.AsyncSearchStatusRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchStatusResponse>;
    submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params?: T.AsyncSearchSubmitRequest | TB.AsyncSearchSubmitRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.AsyncSearchSubmitResponse<TDocument, TAggregations>>;
    submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params?: T.AsyncSearchSubmitRequest | TB.AsyncSearchSubmitRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.AsyncSearchSubmitResponse<TDocument, TAggregations>, unknown>>;
    submit<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params?: T.AsyncSearchSubmitRequest | TB.AsyncSearchSubmitRequest, options?: TransportRequestOptions): Promise<T.AsyncSearchSubmitResponse<TDocument, TAggregations>>;
}
export {};
