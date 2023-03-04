import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function TermsEnumApi(this: That, params: T.TermsEnumRequest | TB.TermsEnumRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TermsEnumResponse>;
export default function TermsEnumApi(this: That, params: T.TermsEnumRequest | TB.TermsEnumRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TermsEnumResponse, unknown>>;
export default function TermsEnumApi(this: That, params: T.TermsEnumRequest | TB.TermsEnumRequest, options?: TransportRequestOptions): Promise<T.TermsEnumResponse>;
export {};
