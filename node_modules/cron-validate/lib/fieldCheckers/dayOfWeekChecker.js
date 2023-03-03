"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../index");
const result_1 = require("../result");
const helper_1 = __importDefault(require("../helper"));
require("../types");
const checkDaysOfWeek = (cronData, options) => {
    if (!cronData.daysOfWeek) {
        return result_1.err(['daysOfWeek field is undefined.']);
    }
    const { daysOfWeek } = cronData;
    if (options.allowOnlyOneBlankDayField &&
        cronData.daysOfMonth === '?' &&
        cronData.daysOfWeek === '?') {
        return result_1.err([
            `Cannot use blank value in daysOfMonth and daysOfWeek field when allowOnlyOneBlankDayField option is enabled.`,
        ]);
    }
    if (options.mustHaveBlankDayField &&
        cronData.daysOfMonth !== '?' &&
        cronData.daysOfWeek !== '?') {
        return result_1.err([
            `Cannot specify both daysOfMonth and daysOfWeek field when mustHaveBlankDayField option is enabled.`,
        ]);
    }
    // Based on this implementation logic:
    // https://github.com/quartz-scheduler/quartz/blob/1e0ed76c5c141597eccd76e44583557729b5a7cb/quartz-core/src/main/java/org/quartz/CronExpression.java#L477
    if (options.useLastDayOfWeek &&
        cronData.daysOfWeek.indexOf('L') !== -1 &&
        cronData.daysOfWeek.match(/[,/-]/)) {
        return result_1.err([
            `Cannot specify last day of week with lists, steps or ranges (symbols ,-/).`,
        ]);
    }
    if (options.useNthWeekdayOfMonth &&
        cronData.daysOfWeek.indexOf('#') !== -1 &&
        cronData.daysOfWeek.match(/[,/-]/)) {
        return result_1.err([
            `Cannot specify Nth weekday of month with lists, steps or ranges (symbols ,-/).`,
        ]);
    }
    return helper_1.default(daysOfWeek, 'daysOfWeek', options);
};
exports.default = checkDaysOfWeek;
