import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Nodes {
    transport: Transport;
    constructor(transport: Transport);
    clearRepositoriesMeteringArchive(this: That, params: T.NodesClearRepositoriesMeteringArchiveRequest | TB.NodesClearRepositoriesMeteringArchiveRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesClearRepositoriesMeteringArchiveResponse>;
    clearRepositoriesMeteringArchive(this: That, params: T.NodesClearRepositoriesMeteringArchiveRequest | TB.NodesClearRepositoriesMeteringArchiveRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesClearRepositoriesMeteringArchiveResponse, unknown>>;
    clearRepositoriesMeteringArchive(this: That, params: T.NodesClearRepositoriesMeteringArchiveRequest | TB.NodesClearRepositoriesMeteringArchiveRequest, options?: TransportRequestOptions): Promise<T.NodesClearRepositoriesMeteringArchiveResponse>;
    getRepositoriesMeteringInfo(this: That, params: T.NodesGetRepositoriesMeteringInfoRequest | TB.NodesGetRepositoriesMeteringInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesGetRepositoriesMeteringInfoResponse>;
    getRepositoriesMeteringInfo(this: That, params: T.NodesGetRepositoriesMeteringInfoRequest | TB.NodesGetRepositoriesMeteringInfoRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesGetRepositoriesMeteringInfoResponse, unknown>>;
    getRepositoriesMeteringInfo(this: That, params: T.NodesGetRepositoriesMeteringInfoRequest | TB.NodesGetRepositoriesMeteringInfoRequest, options?: TransportRequestOptions): Promise<T.NodesGetRepositoriesMeteringInfoResponse>;
    hotThreads(this: That, params?: T.NodesHotThreadsRequest | TB.NodesHotThreadsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesHotThreadsResponse>;
    hotThreads(this: That, params?: T.NodesHotThreadsRequest | TB.NodesHotThreadsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesHotThreadsResponse, unknown>>;
    hotThreads(this: That, params?: T.NodesHotThreadsRequest | TB.NodesHotThreadsRequest, options?: TransportRequestOptions): Promise<T.NodesHotThreadsResponse>;
    info(this: That, params?: T.NodesInfoRequest | TB.NodesInfoRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesInfoResponse>;
    info(this: That, params?: T.NodesInfoRequest | TB.NodesInfoRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesInfoResponse, unknown>>;
    info(this: That, params?: T.NodesInfoRequest | TB.NodesInfoRequest, options?: TransportRequestOptions): Promise<T.NodesInfoResponse>;
    reloadSecureSettings(this: That, params?: T.NodesReloadSecureSettingsRequest | TB.NodesReloadSecureSettingsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesReloadSecureSettingsResponse>;
    reloadSecureSettings(this: That, params?: T.NodesReloadSecureSettingsRequest | TB.NodesReloadSecureSettingsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesReloadSecureSettingsResponse, unknown>>;
    reloadSecureSettings(this: That, params?: T.NodesReloadSecureSettingsRequest | TB.NodesReloadSecureSettingsRequest, options?: TransportRequestOptions): Promise<T.NodesReloadSecureSettingsResponse>;
    stats(this: That, params?: T.NodesStatsRequest | TB.NodesStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesStatsResponse>;
    stats(this: That, params?: T.NodesStatsRequest | TB.NodesStatsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesStatsResponse, unknown>>;
    stats(this: That, params?: T.NodesStatsRequest | TB.NodesStatsRequest, options?: TransportRequestOptions): Promise<T.NodesStatsResponse>;
    usage(this: That, params?: T.NodesUsageRequest | TB.NodesUsageRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.NodesUsageResponse>;
    usage(this: That, params?: T.NodesUsageRequest | TB.NodesUsageRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.NodesUsageResponse, unknown>>;
    usage(this: That, params?: T.NodesUsageRequest | TB.NodesUsageRequest, options?: TransportRequestOptions): Promise<T.NodesUsageResponse>;
}
export {};
