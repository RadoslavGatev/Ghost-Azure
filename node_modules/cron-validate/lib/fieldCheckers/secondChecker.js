"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
const result_1 = require("../result");
const helper_1 = __importDefault(require("../helper"));
require("../types");
const checkSeconds = (cronData, options) => {
    if (!cronData.seconds) {
        return result_1.err([
            'seconds field is undefined, but useSeconds options is enabled.',
        ]);
    }
    const { seconds } = cronData;
    return helper_1.default(seconds, 'seconds', options);
};
exports.default = checkSeconds;
