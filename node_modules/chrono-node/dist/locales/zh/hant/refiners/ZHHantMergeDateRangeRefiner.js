"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractMergeDateRangeRefiner_1 = __importDefault(require("../../../../common/refiners/AbstractMergeDateRangeRefiner"));
class ZHHantMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner_1.default {
    patternBetween() {
        return /^\s*(至|到|\-|\~|～|－|ー)\s*$/i;
    }
}
exports.default = ZHHantMergeDateRangeRefiner;
//# sourceMappingURL=ZHHantMergeDateRangeRefiner.js.map