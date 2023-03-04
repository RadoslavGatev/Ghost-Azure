import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Monitoring {
    transport: Transport;
    constructor(transport: Transport);
    bulk<TDocument = unknown, TPartialDocument = unknown>(this: That, params: T.MonitoringBulkRequest<TDocument, TPartialDocument> | TB.MonitoringBulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.MonitoringBulkResponse>;
    bulk<TDocument = unknown, TPartialDocument = unknown>(this: That, params: T.MonitoringBulkRequest<TDocument, TPartialDocument> | TB.MonitoringBulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MonitoringBulkResponse, unknown>>;
    bulk<TDocument = unknown, TPartialDocument = unknown>(this: That, params: T.MonitoringBulkRequest<TDocument, TPartialDocument> | TB.MonitoringBulkRequest<TDocument, TPartialDocument>, options?: TransportRequestOptions): Promise<T.MonitoringBulkResponse>;
}
export {};
