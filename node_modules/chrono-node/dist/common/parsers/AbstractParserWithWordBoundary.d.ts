import { Parser, ParsingContext } from "../../chrono";
import { ParsingComponents, ParsingResult } from "../../results";
import { Component } from "../../index";
export declare abstract class AbstractParserWithWordBoundaryChecking implements Parser {
    abstract innerPattern(context: ParsingContext): RegExp;
    abstract innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult | {
        [c in Component]?: number;
    } | null;
    private cachedInnerPattern?;
    private cachedPattern?;
    pattern(context: ParsingContext): RegExp;
    extract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult | {
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
