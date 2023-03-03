"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tonight = exports.tomorrow = exports.yesterday = exports.today = exports.now = void 0;
const results_1 = require("../results");
const dayjs_1 = __importDefault(require("dayjs"));
const dayjs_2 = require("../utils/dayjs");
const index_1 = require("../index");
function now(reference) {
    const targetDate = dayjs_1.default(reference.instant);
    const component = new results_1.ParsingComponents(reference, {});
    dayjs_2.assignSimilarDate(component, targetDate);
    dayjs_2.assignSimilarTime(component, targetDate);
    if (reference.timezoneOffset !== null) {
        component.assign("timezoneOffset", targetDate.utcOffset());
    }
    return component;
}
exports.now = now;
function today(reference) {
    const targetDate = dayjs_1.default(reference.instant);
    const component = new results_1.ParsingComponents(reference, {});
    dayjs_2.assignSimilarDate(component, targetDate);
    dayjs_2.implySimilarTime(component, targetDate);
    return component;
}
exports.today = today;
function yesterday(reference) {
    let targetDate = dayjs_1.default(reference.instant);
    const component = new results_1.ParsingComponents(reference, {});
    targetDate = targetDate.add(-1, "day");
    dayjs_2.assignSimilarDate(component, targetDate);
    dayjs_2.implySimilarTime(component, targetDate);
    return component;
}
exports.yesterday = yesterday;
function tomorrow(reference) {
    const targetDate = dayjs_1.default(reference.instant);
    const component = new results_1.ParsingComponents(reference, {});
    dayjs_2.assignTheNextDay(component, targetDate);
    return component;
}
exports.tomorrow = tomorrow;
function tonight(reference, implyHour = 22) {
    const targetDate = dayjs_1.default(reference.instant);
    const component = new results_1.ParsingComponents(reference, {});
    component.imply("hour", implyHour);
    component.imply("meridiem", index_1.Meridiem.PM);
    dayjs_2.assignSimilarDate(component, targetDate);
    return component;
}
exports.tonight = tonight;
