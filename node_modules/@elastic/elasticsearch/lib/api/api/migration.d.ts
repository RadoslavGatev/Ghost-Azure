import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Migration {
    transport: Transport;
    constructor(transport: Transport);
    deprecations(this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationDeprecationsResponse>;
    deprecations(this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationDeprecationsResponse, unknown>>;
    deprecations(this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptions): Promise<T.MigrationDeprecationsResponse>;
    getFeatureUpgradeStatus(this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationGetFeatureUpgradeStatusResponse>;
    getFeatureUpgradeStatus(this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationGetFeatureUpgradeStatusResponse, unknown>>;
    getFeatureUpgradeStatus(this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptions): Promise<T.MigrationGetFeatureUpgradeStatusResponse>;
    postFeatureUpgrade(this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationPostFeatureUpgradeResponse>;
    postFeatureUpgrade(this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationPostFeatureUpgradeResponse, unknown>>;
    postFeatureUpgrade(this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptions): Promise<T.MigrationPostFeatureUpgradeResponse>;
}
export {};
