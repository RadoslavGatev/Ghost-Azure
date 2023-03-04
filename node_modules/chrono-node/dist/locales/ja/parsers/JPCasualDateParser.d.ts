import { Parser, ParsingContext } from "../../../chrono";
export default class JPCasualDateParser implements Parser {
    pattern(): RegExp;
    extract(context: ParsingContext, match: RegExpMatchArray): import("../../../results").ParsingComponents;
}
