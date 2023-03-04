import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
export default class ENTimeExpressionParser extends AbstractTimeExpressionParser {
    constructor(strictMode: any);
    followingPhase(): string;
    primaryPrefix(): string;
    primarySuffix(): string;
    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray): null | ParsingComponents;
}
