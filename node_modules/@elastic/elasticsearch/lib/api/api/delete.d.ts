import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function DeleteApi(this: That, params: T.DeleteRequest | TB.DeleteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DeleteResponse>;
export default function DeleteApi(this: That, params: T.DeleteRequest | TB.DeleteRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.DeleteResponse, unknown>>;
export default function DeleteApi(this: That, params: T.DeleteRequest | TB.DeleteRequest, options?: TransportRequestOptions): Promise<T.DeleteResponse>;
export {};
