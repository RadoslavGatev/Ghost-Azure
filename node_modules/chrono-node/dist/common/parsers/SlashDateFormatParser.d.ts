import { Parser, ParsingContext } from "../../chrono";
import { ParsingResult } from "../../results";
export default class SlashDateFormatParser implements Parser {
    groupNumberMonth: number;
    groupNumberDay: number;
    constructor(littleEndian: boolean);
    pattern(): RegExp;
    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult;
}
