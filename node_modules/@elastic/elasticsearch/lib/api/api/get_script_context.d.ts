import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function GetScriptContextApi(this: That, params?: T.GetScriptContextRequest | TB.GetScriptContextRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GetScriptContextResponse>;
export default function GetScriptContextApi(this: That, params?: T.GetScriptContextRequest | TB.GetScriptContextRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.GetScriptContextResponse, unknown>>;
export default function GetScriptContextApi(this: That, params?: T.GetScriptContextRequest | TB.GetScriptContextRequest, options?: TransportRequestOptions): Promise<T.GetScriptContextResponse>;
export {};
