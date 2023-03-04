import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ExistsSourceApi(this: That, params: T.ExistsSourceRequest | TB.ExistsSourceRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ExistsSourceResponse>;
export default function ExistsSourceApi(this: That, params: T.ExistsSourceRequest | TB.ExistsSourceRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ExistsSourceResponse, unknown>>;
export default function ExistsSourceApi(this: That, params: T.ExistsSourceRequest | TB.ExistsSourceRequest, options?: TransportRequestOptions): Promise<T.ExistsSourceResponse>;
export {};
