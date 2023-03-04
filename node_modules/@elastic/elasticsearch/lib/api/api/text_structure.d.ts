import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class TextStructure {
    transport: Transport;
    constructor(transport: Transport);
    findStructure<TJsonDocument = unknown>(this: That, params: T.TextStructureFindStructureRequest<TJsonDocument> | TB.TextStructureFindStructureRequest<TJsonDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.TextStructureFindStructureResponse>;
    findStructure<TJsonDocument = unknown>(this: That, params: T.TextStructureFindStructureRequest<TJsonDocument> | TB.TextStructureFindStructureRequest<TJsonDocument>, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TextStructureFindStructureResponse, unknown>>;
    findStructure<TJsonDocument = unknown>(this: That, params: T.TextStructureFindStructureRequest<TJsonDocument> | TB.TextStructureFindStructureRequest<TJsonDocument>, options?: TransportRequestOptions): Promise<T.TextStructureFindStructureResponse>;
}
export {};
