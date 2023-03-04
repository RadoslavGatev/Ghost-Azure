import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
export default class ESTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string;
    followingPhase(): string;
}
