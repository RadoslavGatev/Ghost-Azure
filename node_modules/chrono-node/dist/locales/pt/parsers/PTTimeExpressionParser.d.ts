import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";
export default class PTTimeExpressionParser extends AbstractTimeExpressionParser {
    primaryPrefix(): string;
    followingPhase(): string;
}
