"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
const result_1 = require("../result");
const helper_1 = __importDefault(require("../helper"));
require("../types");
const checkYears = (cronData, options) => {
    if (!cronData.years) {
        return (0, result_1.err)(['years field is undefined, but useYears option is enabled.']);
    }
    const { years } = cronData;
    return (0, helper_1.default)(years, 'years', options);
};
exports.default = checkYears;
