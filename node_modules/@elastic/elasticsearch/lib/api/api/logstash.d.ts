import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Logstash {
    transport: Transport;
    constructor(transport: Transport);
    deletePipeline(this: That, params: T.LogstashDeletePipelineRequest | TB.LogstashDeletePipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LogstashDeletePipelineResponse>;
    deletePipeline(this: That, params: T.LogstashDeletePipelineRequest | TB.LogstashDeletePipelineRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.LogstashDeletePipelineResponse, unknown>>;
    deletePipeline(this: That, params: T.LogstashDeletePipelineRequest | TB.LogstashDeletePipelineRequest, options?: TransportRequestOptions): Promise<T.LogstashDeletePipelineResponse>;
    getPipeline(this: That, params: T.LogstashGetPipelineRequest | TB.LogstashGetPipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LogstashGetPipelineResponse>;
    getPipeline(this: That, params: T.LogstashGetPipelineRequest | TB.LogstashGetPipelineRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.LogstashGetPipelineResponse, unknown>>;
    getPipeline(this: That, params: T.LogstashGetPipelineRequest | TB.LogstashGetPipelineRequest, options?: TransportRequestOptions): Promise<T.LogstashGetPipelineResponse>;
    putPipeline(this: That, params: T.LogstashPutPipelineRequest | TB.LogstashPutPipelineRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.LogstashPutPipelineResponse>;
    putPipeline(this: That, params: T.LogstashPutPipelineRequest | TB.LogstashPutPipelineRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.LogstashPutPipelineResponse, unknown>>;
    putPipeline(this: That, params: T.LogstashPutPipelineRequest | TB.LogstashPutPipelineRequest, options?: TransportRequestOptions): Promise<T.LogstashPutPipelineResponse>;
}
export {};
