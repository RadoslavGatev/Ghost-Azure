"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
const result_1 = require("../result");
const helper_1 = __importDefault(require("../helper"));
require("../types");
const checkMinutes = (cronData, options) => {
    if (!cronData.minutes) {
        return result_1.err(['minutes field is undefined.']);
    }
    const { minutes } = cronData;
    return helper_1.default(minutes, 'minutes', options);
};
exports.default = checkMinutes;
