import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ReindexRethrottleApi(this: That, params: T.ReindexRethrottleRequest | TB.ReindexRethrottleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ReindexRethrottleResponse>;
export default function ReindexRethrottleApi(this: That, params: T.ReindexRethrottleRequest | TB.ReindexRethrottleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ReindexRethrottleResponse, unknown>>;
export default function ReindexRethrottleApi(this: That, params: T.ReindexRethrottleRequest | TB.ReindexRethrottleRequest, options?: TransportRequestOptions): Promise<T.ReindexRethrottleResponse>;
export {};
