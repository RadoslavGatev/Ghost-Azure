import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class DanglingIndices {
    transport: Transport;
    constructor(transport: Transport);
    deleteDanglingIndex(this: That, params: T.DanglingIndicesDeleteDanglingIndexRequest | TB.DanglingIndicesDeleteDanglingIndexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DanglingIndicesDeleteDanglingIndexResponse>;
    deleteDanglingIndex(this: That, params: T.DanglingIndicesDeleteDanglingIndexRequest | TB.DanglingIndicesDeleteDanglingIndexRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.DanglingIndicesDeleteDanglingIndexResponse, unknown>>;
    deleteDanglingIndex(this: That, params: T.DanglingIndicesDeleteDanglingIndexRequest | TB.DanglingIndicesDeleteDanglingIndexRequest, options?: TransportRequestOptions): Promise<T.DanglingIndicesDeleteDanglingIndexResponse>;
    importDanglingIndex(this: That, params: T.DanglingIndicesImportDanglingIndexRequest | TB.DanglingIndicesImportDanglingIndexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DanglingIndicesImportDanglingIndexResponse>;
    importDanglingIndex(this: That, params: T.DanglingIndicesImportDanglingIndexRequest | TB.DanglingIndicesImportDanglingIndexRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.DanglingIndicesImportDanglingIndexResponse, unknown>>;
    importDanglingIndex(this: That, params: T.DanglingIndicesImportDanglingIndexRequest | TB.DanglingIndicesImportDanglingIndexRequest, options?: TransportRequestOptions): Promise<T.DanglingIndicesImportDanglingIndexResponse>;
    listDanglingIndices(this: That, params?: T.DanglingIndicesListDanglingIndicesRequest | TB.DanglingIndicesListDanglingIndicesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DanglingIndicesListDanglingIndicesResponse>;
    listDanglingIndices(this: That, params?: T.DanglingIndicesListDanglingIndicesRequest | TB.DanglingIndicesListDanglingIndicesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.DanglingIndicesListDanglingIndicesResponse, unknown>>;
    listDanglingIndices(this: That, params?: T.DanglingIndicesListDanglingIndicesRequest | TB.DanglingIndicesListDanglingIndicesRequest, options?: TransportRequestOptions): Promise<T.DanglingIndicesListDanglingIndicesResponse>;
}
export {};
