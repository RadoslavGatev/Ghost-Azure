import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
import { ParsingComponents } from "../../../results";
import { ParsingContext } from "../../../chrono";
export default class NLTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string;
    followingPhase(): string;
    primarySuffix(): string;
    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | null;
}
