import { Transport, TransportRequestOptions, TransportRequestOptionsWithMeta, TransportRequestOptionsWithOutMeta, TransportResult } from '@elastic/transport';
import * as T from '../types';
import * as TB from '../typesWithBodyKey';
interface That {
    transport: Transport;
}
export default function RankEvalApi(this: That, params: T.RankEvalRequest | TB.RankEvalRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.RankEvalResponse>;
export default function RankEvalApi(this: That, params: T.RankEvalRequest | TB.RankEvalRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.RankEvalResponse, unknown>>;
export default function RankEvalApi(this: That, params: T.RankEvalRequest | TB.RankEvalRequest, options?: TransportRequestOptions): Promise<T.RankEvalResponse>;
export {};
