import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Ingest {
    transport: Transport;
    constructor(transport: Transport);
    deletePipeline(this: That, params: T.IngestDeletePipelineRequest | TB.IngestDeletePipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestDeletePipelineResponse>;
    deletePipeline(this: That, params: T.IngestDeletePipelineRequest | TB.IngestDeletePipelineRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IngestDeletePipelineResponse, unknown>>;
    deletePipeline(this: That, params: T.IngestDeletePipelineRequest | TB.IngestDeletePipelineRequest, options?: TransportRequestOptions): Promise<T.IngestDeletePipelineResponse>;
    geoIpStats(this: That, params?: T.IngestGeoIpStatsRequest | TB.IngestGeoIpStatsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestGeoIpStatsResponse>;
    geoIpStats(this: That, params?: T.IngestGeoIpStatsRequest | TB.IngestGeoIpStatsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IngestGeoIpStatsResponse, unknown>>;
    geoIpStats(this: That, params?: T.IngestGeoIpStatsRequest | TB.IngestGeoIpStatsRequest, options?: TransportRequestOptions): Promise<T.IngestGeoIpStatsResponse>;
    getPipeline(this: That, params?: T.IngestGetPipelineRequest | TB.IngestGetPipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestGetPipelineResponse>;
    getPipeline(this: That, params?: T.IngestGetPipelineRequest | TB.IngestGetPipelineRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IngestGetPipelineResponse, unknown>>;
    getPipeline(this: That, params?: T.IngestGetPipelineRequest | TB.IngestGetPipelineRequest, options?: TransportRequestOptions): Promise<T.IngestGetPipelineResponse>;
    processorGrok(this: That, params?: T.IngestProcessorGrokRequest | TB.IngestProcessorGrokRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestProcessorGrokResponse>;
    processorGrok(this: That, params?: T.IngestProcessorGrokRequest | TB.IngestProcessorGrokRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IngestProcessorGrokResponse, unknown>>;
    processorGrok(this: That, params?: T.IngestProcessorGrokRequest | TB.IngestProcessorGrokRequest, options?: TransportRequestOptions): Promise<T.IngestProcessorGrokResponse>;
    putPipeline(this: That, params: T.IngestPutPipelineRequest | TB.IngestPutPipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestPutPipelineResponse>;
    putPipeline(this: That, params: T.IngestPutPipelineRequest | TB.IngestPutPipelineRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IngestPutPipelineResponse, unknown>>;
    putPipeline(this: That, params: T.IngestPutPipelineRequest | TB.IngestPutPipelineRequest, options?: TransportRequestOptions): Promise<T.IngestPutPipelineResponse>;
    simulate(this: That, params?: T.IngestSimulateRequest | TB.IngestSimulateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.IngestSimulateResponse>;
    simulate(this: That, params?: T.IngestSimulateRequest | TB.IngestSimulateRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.IngestSimulateResponse, unknown>>;
    simulate(this: That, params?: T.IngestSimulateRequest | TB.IngestSimulateRequest, options?: TransportRequestOptions): Promise<T.IngestSimulateResponse>;
}
export {};
