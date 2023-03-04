import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function GetScriptLanguagesApi(this: That, params?: T.GetScriptLanguagesRequest | TB.GetScriptLanguagesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GetScriptLanguagesResponse>;
export default function GetScriptLanguagesApi(this: That, params?: T.GetScriptLanguagesRequest | TB.GetScriptLanguagesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.GetScriptLanguagesResponse, unknown>>;
export default function GetScriptLanguagesApi(this: That, params?: T.GetScriptLanguagesRequest | TB.GetScriptLanguagesRequest, options?: TransportRequestOptions): Promise<T.GetScriptLanguagesResponse>;
export {};
