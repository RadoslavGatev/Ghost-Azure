import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function GetSourceApi<TDocument = unknown>(this: That, params: T.GetSourceRequest | TB.GetSourceRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GetSourceResponse<TDocument>>;
export default function GetSourceApi<TDocument = unknown>(this: That, params: T.GetSourceRequest | TB.GetSourceRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.GetSourceResponse<TDocument>, unknown>>;
export default function GetSourceApi<TDocument = unknown>(this: That, params: T.GetSourceRequest | TB.GetSourceRequest, options?: TransportRequestOptions): Promise<T.GetSourceResponse<TDocument>>;
export {};
