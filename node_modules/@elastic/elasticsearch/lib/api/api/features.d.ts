import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Features {
    transport: Transport;
    constructor(transport: Transport);
    getFeatures(this: That, params?: T.FeaturesGetFeaturesRequest | TB.FeaturesGetFeaturesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FeaturesGetFeaturesResponse>;
    getFeatures(this: That, params?: T.FeaturesGetFeaturesRequest | TB.FeaturesGetFeaturesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FeaturesGetFeaturesResponse, unknown>>;
    getFeatures(this: That, params?: T.FeaturesGetFeaturesRequest | TB.FeaturesGetFeaturesRequest, options?: TransportRequestOptions): Promise<T.FeaturesGetFeaturesResponse>;
    resetFeatures(this: That, params?: T.FeaturesResetFeaturesRequest | TB.FeaturesResetFeaturesRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.FeaturesResetFeaturesResponse>;
    resetFeatures(this: That, params?: T.FeaturesResetFeaturesRequest | TB.FeaturesResetFeaturesRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.FeaturesResetFeaturesResponse, unknown>>;
    resetFeatures(this: That, params?: T.FeaturesResetFeaturesRequest | TB.FeaturesResetFeaturesRequest, options?: TransportRequestOptions): Promise<T.FeaturesResetFeaturesResponse>;
}
export {};
