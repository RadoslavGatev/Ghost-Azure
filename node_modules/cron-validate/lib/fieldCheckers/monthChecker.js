"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
const result_1 = require("../result");
const helper_1 = __importDefault(require("../helper"));
require("../types");
const checkMonths = (cronData, options) => {
    if (!cronData.months) {
        return (0, result_1.err)(['months field is undefined.']);
    }
    const { months } = cronData;
    return (0, helper_1.default)(months, 'months', options);
};
exports.default = checkMonths;
