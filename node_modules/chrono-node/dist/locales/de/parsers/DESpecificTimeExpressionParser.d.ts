import { Parser, ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
export default class DESpecificTimeExpressionParser implements Parser {
    pattern(context: any): RegExp;
    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult | null;
    private static extractTimeComponent;
}
