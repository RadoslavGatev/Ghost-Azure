import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function BulkApi<TDocument = unknown, TPartialDocument = unknown>(this: That, params: T.BulkRequest<TDocument, TPartialDocument> | TB.BulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.BulkResponse>;
export default function BulkApi<TDocument = unknown, TPartialDocument = unknown>(this: That, params: T.BulkRequest<TDocument, TPartialDocument> | TB.BulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.BulkResponse, unknown>>;
export default function BulkApi<TDocument = unknown, TPartialDocument = unknown>(this: That, params: T.BulkRequest<TDocument, TPartialDocument> | TB.BulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): Promise<T.BulkResponse>;
export {};
