import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Enrich {
    transport: Transport;
    constructor(transport: Transport);
    deletePolicy(this: That, params: T.EnrichDeletePolicyRequest | TB.EnrichDeletePolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichDeletePolicyResponse>;
    deletePolicy(this: That, params: T.EnrichDeletePolicyRequest | TB.EnrichDeletePolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichDeletePolicyResponse, unknown>>;
    deletePolicy(this: That, params: T.EnrichDeletePolicyRequest | TB.EnrichDeletePolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichDeletePolicyResponse>;
    executePolicy(this: That, params: T.EnrichExecutePolicyRequest | TB.EnrichExecutePolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichExecutePolicyResponse>;
    executePolicy(this: That, params: T.EnrichExecutePolicyRequest | TB.EnrichExecutePolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichExecutePolicyResponse, unknown>>;
    executePolicy(this: That, params: T.EnrichExecutePolicyRequest | TB.EnrichExecutePolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichExecutePolicyResponse>;
    getPolicy(this: That, params?: T.EnrichGetPolicyRequest | TB.EnrichGetPolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichGetPolicyResponse>;
    getPolicy(this: That, params?: T.EnrichGetPolicyRequest | TB.EnrichGetPolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichGetPolicyResponse, unknown>>;
    getPolicy(this: That, params?: T.EnrichGetPolicyRequest | TB.EnrichGetPolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichGetPolicyResponse>;
    putPolicy(this: That, params: T.EnrichPutPolicyRequest | TB.EnrichPutPolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichPutPolicyResponse>;
    putPolicy(this: That, params: T.EnrichPutPolicyRequest | TB.EnrichPutPolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichPutPolicyResponse, unknown>>;
    putPolicy(this: That, params: T.EnrichPutPolicyRequest | TB.EnrichPutPolicyRequest, options?: TransportRequestOptions): Promise<T.EnrichPutPolicyResponse>;
    stats(this: That, params?: T.EnrichStatsRequest | TB.EnrichStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.EnrichStatsResponse>;
    stats(this: That, params?: T.EnrichStatsRequest | TB.EnrichStatsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.EnrichStatsResponse, unknown>>;
    stats(this: That, params?: T.EnrichStatsRequest | TB.EnrichStatsRequest, options?: TransportRequestOptions): Promise<T.EnrichStatsResponse>;
}
export {};
