import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function UpdateByQueryRethrottleApi(this: That, params: T.UpdateByQueryRethrottleRequest | TB.UpdateByQueryRethrottleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.UpdateByQueryRethrottleResponse>;
export default function UpdateByQueryRethrottleApi(this: That, params: T.UpdateByQueryRethrottleRequest | TB.UpdateByQueryRethrottleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.UpdateByQueryRethrottleResponse, unknown>>;
export default function UpdateByQueryRethrottleApi(this: That, params: T.UpdateByQueryRethrottleRequest | TB.UpdateByQueryRethrottleRequest, options?: TransportRequestOptions): Promise<T.UpdateByQueryRethrottleResponse>;
export {};
