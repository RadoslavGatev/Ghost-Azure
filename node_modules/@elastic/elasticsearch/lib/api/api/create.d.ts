import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function CreateApi<TDocument = unknown>(this: That, params: T.CreateRequest<TDocument> | TB.CreateRequest<TDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.CreateResponse>;
export default function CreateApi<TDocument = unknown>(this: That, params: T.CreateRequest<TDocument> | TB.CreateRequest<TDocument>, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.CreateResponse, unknown>>;
export default function CreateApi<TDocument = unknown>(this: That, params: T.CreateRequest<TDocument> | TB.CreateRequest<TDocument>, options?: TransportRequestOptions): Promise<T.CreateResponse>;
export {};
