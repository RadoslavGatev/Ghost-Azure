"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMergeDateRangeRefiner_1 = __importDefault(require("../../../common/refiners/AbstractMergeDateRangeRefiner"));
class RUMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner_1.default {
    patternBetween() {
        return /^\s*(и до|и по|до|по|-)\s*$/i;
    }
}
exports.default = RUMergeDateRangeRefiner;
//# sourceMappingURL=RUMergeDateRangeRefiner.js.map