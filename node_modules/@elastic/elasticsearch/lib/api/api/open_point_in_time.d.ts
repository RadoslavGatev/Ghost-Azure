import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function OpenPointInTimeApi(this: That, params: T.OpenPointInTimeRequest | TB.OpenPointInTimeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.OpenPointInTimeResponse>;
export default function OpenPointInTimeApi(this: That, params: T.OpenPointInTimeRequest | TB.OpenPointInTimeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.OpenPointInTimeResponse, unknown>>;
export default function OpenPointInTimeApi(this: That, params: T.OpenPointInTimeRequest | TB.OpenPointInTimeRequest, options?: TransportRequestOptions): Promise<T.OpenPointInTimeResponse>;
export {};
