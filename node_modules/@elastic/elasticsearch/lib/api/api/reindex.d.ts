import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ReindexApi(this: That, params: T.ReindexRequest | TB.ReindexRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ReindexResponse>;
export default function ReindexApi(this: That, params: T.ReindexRequest | TB.ReindexRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ReindexResponse, unknown>>;
export default function ReindexApi(this: That, params: T.ReindexRequest | TB.ReindexRequest, options?: TransportRequestOptions): Promise<T.ReindexResponse>;
export {};
