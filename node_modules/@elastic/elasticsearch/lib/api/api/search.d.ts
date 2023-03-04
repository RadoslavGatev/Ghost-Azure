import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function SearchApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params?: T.SearchRequest | TB.SearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchResponse<TDocument, TAggregations>>;
export default function SearchApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params?: T.SearchRequest | TB.SearchRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SearchResponse<TDocument, TAggregations>, unknown>>;
export default function SearchApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params?: T.SearchRequest | TB.SearchRequest, options?: TransportRequestOptions): Promise<T.SearchResponse<TDocument, TAggregations>>;
export {};
