import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { ParsingComponents } from "../../../results";
import { ParsingContext } from "../../../chrono";
export default class DETimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string;
    followingPhase(): string;
    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null;
}
