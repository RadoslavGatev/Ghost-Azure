"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractTimeExpressionParser_1 = require("../../../common/parsers/AbstractTimeExpressionParser");
class DETimeExpressionParser extends AbstractTimeExpressionParser_1.AbstractTimeExpressionParser {
    primaryPrefix() {
        return "(?:(?:um|von)\\s*)?";
    }
    followingPhase() {
        return "\\s*(?:\\-|\\–|\\~|\\〜|bis)\\s*";
    }
    extractPrimaryTimeComponents(context, match) {
        if (match[0].match(/^\s*\d{4}\s*$/)) {
            return null;
        }
        return super.extractPrimaryTimeComponents(context, match);
    }
}
exports.default = DETimeExpressionParser;
//# sourceMappingURL=DETimeExpressionParser.js.map