import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function MsearchTemplateApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.MsearchTemplateRequest | TB.MsearchTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MsearchTemplateResponse<TDocument, TAggregations>>;
export default function MsearchTemplateApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.MsearchTemplateRequest | TB.MsearchTemplateRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MsearchTemplateResponse<TDocument, TAggregations>, unknown>>;
export default function MsearchTemplateApi<TDocument = unknown, TAggregations = Record<T.AggregateName, T.AggregationsAggregate>>(this: That, params: T.MsearchTemplateRequest | TB.MsearchTemplateRequest, options?: TransportRequestOptions): Promise<T.MsearchTemplateResponse<TDocument, TAggregations>>;
export {};
