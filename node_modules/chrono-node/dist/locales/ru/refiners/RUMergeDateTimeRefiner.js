"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMergeDateTimeRefiner_1 = __importDefault(require("../../../common/refiners/AbstractMergeDateTimeRefiner"));
class RUMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner_1.default {
    patternBetween() {
        return new RegExp(`^\\s*(T|в|,|-)?\\s*$`);
    }
}
exports.default = RUMergeDateTimeRefiner;
//# sourceMappingURL=RUMergeDateTimeRefiner.js.map