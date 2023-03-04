import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ClearScrollApi(this: That, params?: T.ClearScrollRequest | TB.ClearScrollRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ClearScrollResponse>;
export default function ClearScrollApi(this: That, params?: T.ClearScrollRequest | TB.ClearScrollRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ClearScrollResponse, unknown>>;
export default function ClearScrollApi(this: That, params?: T.ClearScrollRequest | TB.ClearScrollRequest, options?: TransportRequestOptions): Promise<T.ClearScrollResponse>;
export {};
