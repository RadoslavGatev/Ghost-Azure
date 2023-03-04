import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function PutScriptApi(this: That, params: T.PutScriptRequest | TB.PutScriptRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.PutScriptResponse>;
export default function PutScriptApi(this: That, params: T.PutScriptRequest | TB.PutScriptRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.PutScriptResponse, unknown>>;
export default function PutScriptApi(this: That, params: T.PutScriptRequest | TB.PutScriptRequest, options?: TransportRequestOptions): Promise<T.PutScriptResponse>;
export {};
