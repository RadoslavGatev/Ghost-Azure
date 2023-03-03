"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
const result_1 = require("../result");
const helper_1 = __importDefault(require("../helper"));
require("../types");
const checkHours = (cronData, options) => {
    if (!cronData.hours) {
        return result_1.err(['hours field is undefined.']);
    }
    const { hours } = cronData;
    return helper_1.default(hours, 'hours', options);
};
exports.default = checkHours;
