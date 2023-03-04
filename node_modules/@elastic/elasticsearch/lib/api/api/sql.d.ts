import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Sql {
    transport: Transport;
    constructor(transport: Transport);
    clearCursor(this: That, params: T.SqlClearCursorRequest | TB.SqlClearCursorRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlClearCursorResponse>;
    clearCursor(this: That, params: T.SqlClearCursorRequest | TB.SqlClearCursorRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SqlClearCursorResponse, unknown>>;
    clearCursor(this: That, params: T.SqlClearCursorRequest | TB.SqlClearCursorRequest, options?: TransportRequestOptions): Promise<T.SqlClearCursorResponse>;
    deleteAsync(this: That, params: T.SqlDeleteAsyncRequest | TB.SqlDeleteAsyncRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlDeleteAsyncResponse>;
    deleteAsync(this: That, params: T.SqlDeleteAsyncRequest | TB.SqlDeleteAsyncRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SqlDeleteAsyncResponse, unknown>>;
    deleteAsync(this: That, params: T.SqlDeleteAsyncRequest | TB.SqlDeleteAsyncRequest, options?: TransportRequestOptions): Promise<T.SqlDeleteAsyncResponse>;
    getAsync(this: That, params: T.SqlGetAsyncRequest | TB.SqlGetAsyncRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlGetAsyncResponse>;
    getAsync(this: That, params: T.SqlGetAsyncRequest | TB.SqlGetAsyncRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SqlGetAsyncResponse, unknown>>;
    getAsync(this: That, params: T.SqlGetAsyncRequest | TB.SqlGetAsyncRequest, options?: TransportRequestOptions): Promise<T.SqlGetAsyncResponse>;
    getAsyncStatus(this: That, params: T.SqlGetAsyncStatusRequest | TB.SqlGetAsyncStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlGetAsyncStatusResponse>;
    getAsyncStatus(this: That, params: T.SqlGetAsyncStatusRequest | TB.SqlGetAsyncStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SqlGetAsyncStatusResponse, unknown>>;
    getAsyncStatus(this: That, params: T.SqlGetAsyncStatusRequest | TB.SqlGetAsyncStatusRequest, options?: TransportRequestOptions): Promise<T.SqlGetAsyncStatusResponse>;
    query(this: That, params?: T.SqlQueryRequest | TB.SqlQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlQueryResponse>;
    query(this: That, params?: T.SqlQueryRequest | TB.SqlQueryRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SqlQueryResponse, unknown>>;
    query(this: That, params?: T.SqlQueryRequest | TB.SqlQueryRequest, options?: TransportRequestOptions): Promise<T.SqlQueryResponse>;
    translate(this: That, params: T.SqlTranslateRequest | TB.SqlTranslateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SqlTranslateResponse>;
    translate(this: That, params: T.SqlTranslateRequest | TB.SqlTranslateRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SqlTranslateResponse, unknown>>;
    translate(this: That, params: T.SqlTranslateRequest | TB.SqlTranslateRequest, options?: TransportRequestOptions): Promise<T.SqlTranslateResponse>;
}
export {};
