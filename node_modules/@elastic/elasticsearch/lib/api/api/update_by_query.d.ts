import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function UpdateByQueryApi(this: That, params: T.UpdateByQueryRequest | TB.UpdateByQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.UpdateByQueryResponse>;
export default function UpdateByQueryApi(this: That, params: T.UpdateByQueryRequest | TB.UpdateByQueryRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.UpdateByQueryResponse, unknown>>;
export default function UpdateByQueryApi(this: That, params: T.UpdateByQueryRequest | TB.UpdateByQueryRequest, options?: TransportRequestOptions): Promise<T.UpdateByQueryResponse>;
export {};
