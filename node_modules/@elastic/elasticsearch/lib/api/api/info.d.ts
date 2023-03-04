import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function InfoApi(this: That, params?: T.InfoRequest | TB.InfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InfoResponse>;
export default function InfoApi(this: That, params?: T.InfoRequest | TB.InfoRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.InfoResponse, unknown>>;
export default function InfoApi(this: That, params?: T.InfoRequest | TB.InfoRequest, options?: TransportRequestOptions): Promise<T.InfoResponse>;
export {};
