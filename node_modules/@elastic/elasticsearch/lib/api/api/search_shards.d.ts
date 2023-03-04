import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function SearchShardsApi(this: That, params?: T.SearchShardsRequest | TB.SearchShardsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchShardsResponse>;
export default function SearchShardsApi(this: That, params?: T.SearchShardsRequest | TB.SearchShardsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.SearchShardsResponse, unknown>>;
export default function SearchShardsApi(this: That, params?: T.SearchShardsRequest | TB.SearchShardsRequest, options?: TransportRequestOptions): Promise<T.SearchShardsResponse>;
export {};
