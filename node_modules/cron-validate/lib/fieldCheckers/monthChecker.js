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
        return result_1.err(['months field is undefined.']);
    }
    const { months } = cronData;
    return helper_1.default(months, 'months', options);
};
exports.default = checkMonths;
