import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Ssl {
    transport: Transport;
    constructor(transport: Transport);
    certificates(this: That, params?: T.SslCertificatesRequest | TB.SslCertificatesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SslCertificatesResponse>;
    certificates(this: That, params?: T.SslCertificatesRequest | TB.SslCertificatesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SslCertificatesResponse, unknown>>;
    certificates(this: That, params?: T.SslCertificatesRequest | TB.SslCertificatesRequest, options?: TransportRequestOptions): Promise<T.SslCertificatesResponse>;
}
export {};
