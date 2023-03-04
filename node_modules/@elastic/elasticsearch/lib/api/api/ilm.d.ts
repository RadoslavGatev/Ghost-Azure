import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Ilm {
    transport: Transport;
    constructor(transport: Transport);
    deleteLifecycle(this: That, params: T.IlmDeleteLifecycleRequest | TB.IlmDeleteLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmDeleteLifecycleResponse>;
    deleteLifecycle(this: That, params: T.IlmDeleteLifecycleRequest | TB.IlmDeleteLifecycleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmDeleteLifecycleResponse, unknown>>;
    deleteLifecycle(this: That, params: T.IlmDeleteLifecycleRequest | TB.IlmDeleteLifecycleRequest, options?: TransportRequestOptions): Promise<T.IlmDeleteLifecycleResponse>;
    explainLifecycle(this: That, params: T.IlmExplainLifecycleRequest | TB.IlmExplainLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmExplainLifecycleResponse>;
    explainLifecycle(this: That, params: T.IlmExplainLifecycleRequest | TB.IlmExplainLifecycleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmExplainLifecycleResponse, unknown>>;
    explainLifecycle(this: That, params: T.IlmExplainLifecycleRequest | TB.IlmExplainLifecycleRequest, options?: TransportRequestOptions): Promise<T.IlmExplainLifecycleResponse>;
    getLifecycle(this: That, params?: T.IlmGetLifecycleRequest | TB.IlmGetLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmGetLifecycleResponse>;
    getLifecycle(this: That, params?: T.IlmGetLifecycleRequest | TB.IlmGetLifecycleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmGetLifecycleResponse, unknown>>;
    getLifecycle(this: That, params?: T.IlmGetLifecycleRequest | TB.IlmGetLifecycleRequest, options?: TransportRequestOptions): Promise<T.IlmGetLifecycleResponse>;
    getStatus(this: That, params?: T.IlmGetStatusRequest | TB.IlmGetStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmGetStatusResponse>;
    getStatus(this: That, params?: T.IlmGetStatusRequest | TB.IlmGetStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmGetStatusResponse, unknown>>;
    getStatus(this: That, params?: T.IlmGetStatusRequest | TB.IlmGetStatusRequest, options?: TransportRequestOptions): Promise<T.IlmGetStatusResponse>;
    migrateToDataTiers(this: That, params?: T.IlmMigrateToDataTiersRequest | TB.IlmMigrateToDataTiersRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmMigrateToDataTiersResponse>;
    migrateToDataTiers(this: That, params?: T.IlmMigrateToDataTiersRequest | TB.IlmMigrateToDataTiersRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmMigrateToDataTiersResponse, unknown>>;
    migrateToDataTiers(this: That, params?: T.IlmMigrateToDataTiersRequest | TB.IlmMigrateToDataTiersRequest, options?: TransportRequestOptions): Promise<T.IlmMigrateToDataTiersResponse>;
    moveToStep(this: That, params: T.IlmMoveToStepRequest | TB.IlmMoveToStepRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmMoveToStepResponse>;
    moveToStep(this: That, params: T.IlmMoveToStepRequest | TB.IlmMoveToStepRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmMoveToStepResponse, unknown>>;
    moveToStep(this: That, params: T.IlmMoveToStepRequest | TB.IlmMoveToStepRequest, options?: TransportRequestOptions): Promise<T.IlmMoveToStepResponse>;
    putLifecycle(this: That, params: T.IlmPutLifecycleRequest | TB.IlmPutLifecycleRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmPutLifecycleResponse>;
    putLifecycle(this: That, params: T.IlmPutLifecycleRequest | TB.IlmPutLifecycleRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmPutLifecycleResponse, unknown>>;
    putLifecycle(this: That, params: T.IlmPutLifecycleRequest | TB.IlmPutLifecycleRequest, options?: TransportRequestOptions): Promise<T.IlmPutLifecycleResponse>;
    removePolicy(this: That, params: T.IlmRemovePolicyRequest | TB.IlmRemovePolicyRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmRemovePolicyResponse>;
    removePolicy(this: That, params: T.IlmRemovePolicyRequest | TB.IlmRemovePolicyRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmRemovePolicyResponse, unknown>>;
    removePolicy(this: That, params: T.IlmRemovePolicyRequest | TB.IlmRemovePolicyRequest, options?: TransportRequestOptions): Promise<T.IlmRemovePolicyResponse>;
    retry(this: That, params: T.IlmRetryRequest | TB.IlmRetryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmRetryResponse>;
    retry(this: That, params: T.IlmRetryRequest | TB.IlmRetryRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmRetryResponse, unknown>>;
    retry(this: That, params: T.IlmRetryRequest | TB.IlmRetryRequest, options?: TransportRequestOptions): Promise<T.IlmRetryResponse>;
    start(this: That, params?: T.IlmStartRequest | TB.IlmStartRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmStartResponse>;
    start(this: That, params?: T.IlmStartRequest | TB.IlmStartRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmStartResponse, unknown>>;
    start(this: That, params?: T.IlmStartRequest | TB.IlmStartRequest, options?: TransportRequestOptions): Promise<T.IlmStartResponse>;
    stop(this: That, params?: T.IlmStopRequest | TB.IlmStopRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IlmStopResponse>;
    stop(this: That, params?: T.IlmStopRequest | TB.IlmStopRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IlmStopResponse, unknown>>;
    stop(this: That, params?: T.IlmStopRequest | TB.IlmStopRequest, options?: TransportRequestOptions): Promise<T.IlmStopResponse>;
}
export {};
