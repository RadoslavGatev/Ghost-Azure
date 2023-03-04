import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ScriptsPainlessExecuteApi<TResult = unknown>(this: That, params?: T.ScriptsPainlessExecuteRequest | TB.ScriptsPainlessExecuteRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ScriptsPainlessExecuteResponse<TResult>>;
export default function ScriptsPainlessExecuteApi<TResult = unknown>(this: That, params?: T.ScriptsPainlessExecuteRequest | TB.ScriptsPainlessExecuteRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ScriptsPainlessExecuteResponse<TResult>, unknown>>;
export default function ScriptsPainlessExecuteApi<TResult = unknown>(this: That, params?: T.ScriptsPainlessExecuteRequest | TB.ScriptsPainlessExecuteRequest, options?: TransportRequestOptions): Promise<T.ScriptsPainlessExecuteResponse<TResult>>;
export {};
