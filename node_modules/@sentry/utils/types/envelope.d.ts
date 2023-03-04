import { Attachment, AttachmentItem, DataCategory, Envelope, EnvelopeItemType, TextEncoderInternal } from '@sentry/types';
/**
 * Creates an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */
export declare function createEnvelope<E extends Envelope>(headers: E[0], items?: E[1]): E;
/**
 * Add an item to an envelope.
 * Make sure to always explicitly provide the generic to this function
 * so that the envelope types resolve correctly.
 */
export declare function addItemToEnvelope<E extends Envelope>(envelope: E, newItem: E[1][number]): E;
/**
 * Convenience function to loop through the items and item types of an envelope.
 * (This function was mostly created because working with envelope types is painful at the moment)
 */
export declare function forEachEnvelopeItem<E extends Envelope>(envelope: Envelope, callback: (envelopeItem: E[1][number], envelopeItemType: E[1][number][0]['type']) => void): void;
/**
 * Serializes an envelope.
 */
export declare function serializeEnvelope(envelope: Envelope, textEncoder?: TextEncoderInternal): string | Uint8Array;
/**
 * Creates attachment envelope items
 */
export declare function createAttachmentEnvelopeItem(attachment: Attachment, textEncoder?: TextEncoderInternal): AttachmentItem;
/**
 * Maps the type of an envelope item to a data category.
 */
export declare function envelopeItemTypeToDataCategory(type: EnvelopeItemType): DataCategory;
//# sourceMappingURL=envelope.d.ts.map