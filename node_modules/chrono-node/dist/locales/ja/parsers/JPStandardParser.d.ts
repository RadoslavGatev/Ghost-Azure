import { Parser, ParsingContext } from "../../../chrono";
export default class JPStandardParser implements Parser {
    pattern(): RegExp;
    extract(context: ParsingContext, match: RegExpMatchArray): import("../../../results").ParsingComponents;
}
