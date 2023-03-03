import { ParsingComponents, ReferenceWithTimezone } from "../results";
export declare function now(reference: ReferenceWithTimezone): ParsingComponents;
export declare function today(reference: ReferenceWithTimezone): ParsingComponents;
export declare function yesterday(reference: ReferenceWithTimezone): ParsingComponents;
export declare function tomorrow(reference: ReferenceWithTimezone): ParsingComponents;
export declare function tonight(reference: ReferenceWithTimezone, implyHour?: number): ParsingComponents;
