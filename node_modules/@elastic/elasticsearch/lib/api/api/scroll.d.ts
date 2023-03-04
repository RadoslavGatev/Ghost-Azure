import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.ScrollRequest | TB.ScrollRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ScrollResponse<TDocument, TAggregations>>;
export default function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.ScrollRequest | TB.ScrollRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ScrollResponse<TDocument, TAggregations>, unknown>>;
export default function ScrollApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.ScrollRequest | TB.ScrollRequest, options?: TransportRequestOptions): Promise<T.ScrollResponse<TDocument, TAggregations>>;
export {};
