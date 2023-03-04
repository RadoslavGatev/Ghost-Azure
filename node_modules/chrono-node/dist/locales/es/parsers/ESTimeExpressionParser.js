"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTimeExpressionParser_1 = require("../../../common/parsers/AbstractTimeExpressionParser");
class ESTimeExpressionParser extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
    primaryPrefix() {
        return "(?:(?:aslas|deslas|las?|al?|de|del)\\s*)?";
    }
    followingPhase() {
        return "\\s*(?:\\-|\\–|\\~|\\〜|a(?:l)?|\\?)\\s*";
    }
}
exports.default = ESTimeExpressionParser;
//# sourceMappingURL=ESTimeExpressionParser.js.map