import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function ExplainApi<TDocument = unknown>(this: That, params: T.ExplainRequest | TB.ExplainRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ExplainResponse<TDocument>>;
export default function ExplainApi<TDocument = unknown>(this: That, params: T.ExplainRequest | TB.ExplainRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.ExplainResponse<TDocument>, unknown>>;
export default function ExplainApi<TDocument = unknown>(this: That, params: T.ExplainRequest | TB.ExplainRequest, options?: TransportRequestOptions): Promise<T.ExplainResponse<TDocument>>;
export {};
