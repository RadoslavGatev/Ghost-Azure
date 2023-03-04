import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default class Graph {
    transport: Transport;
    constructor(transport: Transport);
    explore(this: That, params: T.GraphExploreRequest | TB.GraphExploreRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.GraphExploreResponse>;
    explore(this: That, params: T.GraphExploreRequest | TB.GraphExploreRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.GraphExploreResponse, unknown>>;
    explore(this: That, params: T.GraphExploreRequest | TB.GraphExploreRequest, options?: TransportRequestOptions): Promise<T.GraphExploreResponse>;
}
export {};
