import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function IndexApi<TDocument = unknown>(this: That, params: T.IndexRequest<TDocument> | TB.IndexRequest<TDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.IndexResponse>;
export default function IndexApi<TDocument = unknown>(this: That, params: T.IndexRequest<TDocument> | TB.IndexRequest<TDocument>, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IndexResponse, unknown>>;
export default function IndexApi<TDocument = unknown>(this: That, params: T.IndexRequest<TDocument> | TB.IndexRequest<TDocument>, options?: TransportRequestOptions): Promise<T.IndexResponse>;
export {};
