import type { DataCategory } from './datacategory';
export declare type EventDropReason = 'before_send' | 'event_processor' | 'network_error' | 'queue_overflow' | 'ratelimit_backoff' | 'sample_rate' | 'send_error' | 'internal_sdk_error';
export declare type Outcome = {
    reason: EventDropReason;
    category: DataCategory;
    quantity: number;
};
export declare type ClientReport = {
    timestamp: number;
    discarded_events: Outcome[];
};
//# sourceMappingURL=clientreport.d.ts.map