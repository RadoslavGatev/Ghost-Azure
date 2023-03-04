import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Transform {
    transport: Transport;
    constructor(transport: Transport);
    deleteTransform(this: That, params: T.TransformDeleteTransformRequest | TB.TransformDeleteTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformDeleteTransformResponse>;
    deleteTransform(this: That, params: T.TransformDeleteTransformRequest | TB.TransformDeleteTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformDeleteTransformResponse, unknown>>;
    deleteTransform(this: That, params: T.TransformDeleteTransformRequest | TB.TransformDeleteTransformRequest, options?: TransportRequestOptions): Promise<T.TransformDeleteTransformResponse>;
    getTransform(this: That, params?: T.TransformGetTransformRequest | TB.TransformGetTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformGetTransformResponse>;
    getTransform(this: That, params?: T.TransformGetTransformRequest | TB.TransformGetTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformGetTransformResponse, unknown>>;
    getTransform(this: That, params?: T.TransformGetTransformRequest | TB.TransformGetTransformRequest, options?: TransportRequestOptions): Promise<T.TransformGetTransformResponse>;
    getTransformStats(this: That, params: T.TransformGetTransformStatsRequest | TB.TransformGetTransformStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformGetTransformStatsResponse>;
    getTransformStats(this: That, params: T.TransformGetTransformStatsRequest | TB.TransformGetTransformStatsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformGetTransformStatsResponse, unknown>>;
    getTransformStats(this: That, params: T.TransformGetTransformStatsRequest | TB.TransformGetTransformStatsRequest, options?: TransportRequestOptions): Promise<T.TransformGetTransformStatsResponse>;
    previewTransform<TTransform = unknown>(this: That, params?: T.TransformPreviewTransformRequest | TB.TransformPreviewTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformPreviewTransformResponse<TTransform>>;
    previewTransform<TTransform = unknown>(this: That, params?: T.TransformPreviewTransformRequest | TB.TransformPreviewTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformPreviewTransformResponse<TTransform>, unknown>>;
    previewTransform<TTransform = unknown>(this: That, params?: T.TransformPreviewTransformRequest | TB.TransformPreviewTransformRequest, options?: TransportRequestOptions): Promise<T.TransformPreviewTransformResponse<TTransform>>;
    putTransform(this: That, params: T.TransformPutTransformRequest | TB.TransformPutTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformPutTransformResponse>;
    putTransform(this: That, params: T.TransformPutTransformRequest | TB.TransformPutTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformPutTransformResponse, unknown>>;
    putTransform(this: That, params: T.TransformPutTransformRequest | TB.TransformPutTransformRequest, options?: TransportRequestOptions): Promise<T.TransformPutTransformResponse>;
    resetTransform(this: That, params: T.TransformResetTransformRequest | TB.TransformResetTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformResetTransformResponse>;
    resetTransform(this: That, params: T.TransformResetTransformRequest | TB.TransformResetTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformResetTransformResponse, unknown>>;
    resetTransform(this: That, params: T.TransformResetTransformRequest | TB.TransformResetTransformRequest, options?: TransportRequestOptions): Promise<T.TransformResetTransformResponse>;
    startTransform(this: That, params: T.TransformStartTransformRequest | TB.TransformStartTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformStartTransformResponse>;
    startTransform(this: That, params: T.TransformStartTransformRequest | TB.TransformStartTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformStartTransformResponse, unknown>>;
    startTransform(this: That, params: T.TransformStartTransformRequest | TB.TransformStartTransformRequest, options?: TransportRequestOptions): Promise<T.TransformStartTransformResponse>;
    stopTransform(this: That, params: T.TransformStopTransformRequest | TB.TransformStopTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformStopTransformResponse>;
    stopTransform(this: That, params: T.TransformStopTransformRequest | TB.TransformStopTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformStopTransformResponse, unknown>>;
    stopTransform(this: That, params: T.TransformStopTransformRequest | TB.TransformStopTransformRequest, options?: TransportRequestOptions): Promise<T.TransformStopTransformResponse>;
    updateTransform(this: That, params: T.TransformUpdateTransformRequest | TB.TransformUpdateTransformRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformUpdateTransformResponse>;
    updateTransform(this: That, params: T.TransformUpdateTransformRequest | TB.TransformUpdateTransformRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformUpdateTransformResponse, unknown>>;
    updateTransform(this: That, params: T.TransformUpdateTransformRequest | TB.TransformUpdateTransformRequest, options?: TransportRequestOptions): Promise<T.TransformUpdateTransformResponse>;
    upgradeTransforms(this: That, params?: T.TransformUpgradeTransformsRequest | TB.TransformUpgradeTransformsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TransformUpgradeTransformsResponse>;
    upgradeTransforms(this: That, params?: T.TransformUpgradeTransformsRequest | TB.TransformUpgradeTransformsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.TransformUpgradeTransformsResponse, unknown>>;
    upgradeTransforms(this: That, params?: T.TransformUpgradeTransformsRequest | TB.TransformUpgradeTransformsRequest, options?: TransportRequestOptions): Promise<T.TransformUpgradeTransformsResponse>;
}
export {};
