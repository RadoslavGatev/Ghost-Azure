"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDayJSClosestWeekday = exports.toDayJSWeekday = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function toDayJSWeekday(refDate, offset, modifier) {
    if (!modifier) {
        return toDayJSClosestWeekday(refDate, offset);
    }
    let date = dayjs_1.default(refDate);
    switch (modifier) {
        case "this":
            date = date.day(offset);
            break;
        case "next":
            date = date.day(offset + 7);
            break;
        case "last":
            date = date.day(offset - 7);
            break;
    }
    return date;
}
exports.toDayJSWeekday = toDayJSWeekday;
function toDayJSClosestWeekday(refDate, offset) {
    let date = dayjs_1.default(refDate);
    const refOffset = date.day();
    if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
        date = date.day(offset - 7);
    }
    else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
        date = date.day(offset + 7);
    }
    else {
        date = date.day(offset);
    }
    return date;
}
exports.toDayJSClosestWeekday = toDayJSClosestWeekday;
