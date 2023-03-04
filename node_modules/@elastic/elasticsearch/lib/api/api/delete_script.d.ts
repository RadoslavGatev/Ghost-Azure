import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function DeleteScriptApi(this: That, params: T.DeleteScriptRequest | TB.DeleteScriptRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.DeleteScriptResponse>;
export default function DeleteScriptApi(this: That, params: T.DeleteScriptRequest | TB.DeleteScriptRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.DeleteScriptResponse, unknown>>;
export default function DeleteScriptApi(this: That, params: T.DeleteScriptRequest | TB.DeleteScriptRequest, options?: TransportRequestOptions): Promise<T.DeleteScriptResponse>;
export {};
