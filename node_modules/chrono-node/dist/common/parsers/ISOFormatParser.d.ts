import { ParsingContext } from "../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "./AbstractParserWithWordBoundary";
export default class ISOFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp;
    innerExtract(context: ParsingContext, match: RegExpMatchArray): {
        day?: number;
        hour?: number;
        minute?: number;
        month?: number;
        second?: number;
        weekday?: number;
        year?: number;
        millisecond?: number;
        meridiem?: number;
        timezoneOffset?: number;
    };
}
