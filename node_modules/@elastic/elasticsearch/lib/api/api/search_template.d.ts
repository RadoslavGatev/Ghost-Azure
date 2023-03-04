import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function SearchTemplateApi<TDocument = unknown>(this: That, params?: T.SearchTemplateRequest | TB.SearchTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchTemplateResponse<TDocument>>;
export default function SearchTemplateApi<TDocument = unknown>(this: That, params?: T.SearchTemplateRequest | TB.SearchTemplateRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SearchTemplateResponse<TDocument>, unknown>>;
export default function SearchTemplateApi<TDocument = unknown>(this: That, params?: T.SearchTemplateRequest | TB.SearchTemplateRequest, options?: TransportRequestOptions): Promise<T.SearchTemplateResponse<TDocument>>;
export {};
