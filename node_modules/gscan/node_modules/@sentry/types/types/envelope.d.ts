import type { ClientReport } from './clientreport';
import type { DsnComponents } from './dsn';
import type { Event } from './event';
import type { ReplayEvent, ReplayRecordingData } from './replay';
import type { SdkInfo } from './sdkinfo';
import type { Session, SessionAggregates } from './session';
import type { Transaction } from './transaction';
import type { UserFeedback } from './user';
export declare type DynamicSamplingContext = {
    trace_id: Transaction['traceId'];
    public_key: DsnComponents['publicKey'];
    sample_rate?: string;
    release?: string;
    environment?: string;
    transaction?: string;
    user_segment?: string;
};
export declare type EnvelopeItemType = 'client_report' | 'user_report' | 'session' | 'sessions' | 'transaction' | 'attachment' | 'event' | 'profile' | 'replay_event' | 'replay_recording';
export declare type BaseEnvelopeHeaders = {
    [key: string]: unknown;
    dsn?: string;
    sdk?: SdkInfo;
};
export declare type BaseEnvelopeItemHeaders = {
    [key: string]: unknown;
    type: EnvelopeItemType;
    length?: number;
};
declare type BaseEnvelopeItem<ItemHeader, P> = [ItemHeader & BaseEnvelopeItemHeaders, P];
declare type BaseEnvelope<EnvelopeHeader, Item> = [EnvelopeHeader & BaseEnvelopeHeaders, Array<Item & BaseEnvelopeItem<BaseEnvelopeItemHeaders, unknown>>];
declare type EventItemHeaders = {
    type: 'event' | 'transaction' | 'profile';
};
declare type AttachmentItemHeaders = {
    type: 'attachment';
    length: number;
    filename: string;
    content_type?: string;
    attachment_type?: string;
};
declare type UserFeedbackItemHeaders = {
    type: 'user_report';
};
declare type SessionItemHeaders = {
    type: 'session';
};
declare type SessionAggregatesItemHeaders = {
    type: 'sessions';
};
declare type ClientReportItemHeaders = {
    type: 'client_report';
};
declare type ReplayEventItemHeaders = {
    type: 'replay_event';
};
declare type ReplayRecordingItemHeaders = {
    type: 'replay_recording';
    length: number;
};
export declare type EventItem = BaseEnvelopeItem<EventItemHeaders, Event>;
export declare type AttachmentItem = BaseEnvelopeItem<AttachmentItemHeaders, string | Uint8Array>;
export declare type UserFeedbackItem = BaseEnvelopeItem<UserFeedbackItemHeaders, UserFeedback>;
export declare type SessionItem = BaseEnvelopeItem<SessionItemHeaders, Session> | BaseEnvelopeItem<SessionAggregatesItemHeaders, SessionAggregates>;
export declare type ClientReportItem = BaseEnvelopeItem<ClientReportItemHeaders, ClientReport>;
declare type ReplayEventItem = BaseEnvelopeItem<ReplayEventItemHeaders, ReplayEvent>;
declare type ReplayRecordingItem = BaseEnvelopeItem<ReplayRecordingItemHeaders, ReplayRecordingData>;
export declare type EventEnvelopeHeaders = {
    event_id: string;
    sent_at: string;
    trace?: DynamicSamplingContext;
};
declare type SessionEnvelopeHeaders = {
    sent_at: string;
};
declare type ClientReportEnvelopeHeaders = BaseEnvelopeHeaders;
declare type ReplayEnvelopeHeaders = BaseEnvelopeHeaders;
export declare type EventEnvelope = BaseEnvelope<EventEnvelopeHeaders, EventItem | AttachmentItem | UserFeedbackItem>;
export declare type SessionEnvelope = BaseEnvelope<SessionEnvelopeHeaders, SessionItem>;
export declare type ClientReportEnvelope = BaseEnvelope<ClientReportEnvelopeHeaders, ClientReportItem>;
export declare type ReplayEnvelope = [ReplayEnvelopeHeaders, [ReplayEventItem, ReplayRecordingItem]];
export declare type Envelope = EventEnvelope | SessionEnvelope | ClientReportEnvelope | ReplayEnvelope;
export declare type EnvelopeItem = Envelope[1][number];
export {};
//# sourceMappingURL=envelope.d.ts.map