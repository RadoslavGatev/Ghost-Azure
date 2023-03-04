import { ParsingContext } from "../../../../chrono";
import { AbstractParserWithWordBoundaryChecking } from "../../../../common/parsers/AbstractParserWithWordBoundary";
import { ParsingComponents, ParsingResult } from "../../../../results";
export default class ZHHansCasualDateParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(context: ParsingContext): RegExp;
    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult;
}
