import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function GetScriptApi(this: That, params: T.GetScriptRequest | TB.GetScriptRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GetScriptResponse>;
export default function GetScriptApi(this: That, params: T.GetScriptRequest | TB.GetScriptRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.GetScriptResponse, unknown>>;
export default function GetScriptApi(this: That, params: T.GetScriptRequest | TB.GetScriptRequest, options?: TransportRequestOptions): Promise<T.GetScriptResponse>;
export {};
