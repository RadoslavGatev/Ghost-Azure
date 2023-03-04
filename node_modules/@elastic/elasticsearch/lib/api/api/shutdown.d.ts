import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Shutdown {
    transport: Transport;
    constructor(transport: Transport);
    deleteNode(this: That, params: T.ShutdownDeleteNodeRequest | TB.ShutdownDeleteNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ShutdownDeleteNodeResponse>;
    deleteNode(this: That, params: T.ShutdownDeleteNodeRequest | TB.ShutdownDeleteNodeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ShutdownDeleteNodeResponse, unknown>>;
    deleteNode(this: That, params: T.ShutdownDeleteNodeRequest | TB.ShutdownDeleteNodeRequest, options?: TransportRequestOptions): Promise<T.ShutdownDeleteNodeResponse>;
    getNode(this: That, params?: T.ShutdownGetNodeRequest | TB.ShutdownGetNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ShutdownGetNodeResponse>;
    getNode(this: That, params?: T.ShutdownGetNodeRequest | TB.ShutdownGetNodeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ShutdownGetNodeResponse, unknown>>;
    getNode(this: That, params?: T.ShutdownGetNodeRequest | TB.ShutdownGetNodeRequest, options?: TransportRequestOptions): Promise<T.ShutdownGetNodeResponse>;
    putNode(this: That, params: T.ShutdownPutNodeRequest | TB.ShutdownPutNodeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ShutdownPutNodeResponse>;
    putNode(this: That, params: T.ShutdownPutNodeRequest | TB.ShutdownPutNodeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ShutdownPutNodeResponse, unknown>>;
    putNode(this: That, params: T.ShutdownPutNodeRequest | TB.ShutdownPutNodeRequest, options?: TransportRequestOptions): Promise<T.ShutdownPutNodeResponse>;
}
export {};
