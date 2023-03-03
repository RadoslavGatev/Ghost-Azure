"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfiguration = exports.createCasualConfiguration = exports.parseDate = exports.parse = exports.strict = exports.casual = void 0;
const configurations_1 = require("../../configurations");
const chrono_1 = require("../../chrono");
const NLMergeDateRangeRefiner_1 = __importDefault(require("./refiners/NLMergeDateRangeRefiner"));
const NLMergeDateTimeRefiner_1 = __importDefault(require("./refiners/NLMergeDateTimeRefiner"));
const NLCasualDateParser_1 = __importDefault(require("./parsers/NLCasualDateParser"));
const NLCasualTimeParser_1 = __importDefault(require("./parsers/NLCasualTimeParser"));
const SlashDateFormatParser_1 = __importDefault(require("../../common/parsers/SlashDateFormatParser"));
const NLTimeUnitWithinFormatParser_1 = __importDefault(require("./parsers/NLTimeUnitWithinFormatParser"));
const NLWeekdayParser_1 = __importDefault(require("./parsers/NLWeekdayParser"));
const NLMonthNameMiddleEndianParser_1 = __importDefault(require("./parsers/NLMonthNameMiddleEndianParser"));
const NLMonthNameParser_1 = __importDefault(require("./parsers/NLMonthNameParser"));
const NLSlashMonthFormatParser_1 = __importDefault(require("./parsers/NLSlashMonthFormatParser"));
const NLTimeExpressionParser_1 = __importDefault(require("./parsers/NLTimeExpressionParser"));
const NLCasualYearMonthDayParser_1 = __importDefault(require("./parsers/NLCasualYearMonthDayParser"));
const NLCasualDateTimeParser_1 = __importDefault(require("./parsers/NLCasualDateTimeParser"));
const NLTimeUnitCasualRelativeFormatParser_1 = __importDefault(require("./parsers/NLTimeUnitCasualRelativeFormatParser"));
const NLRelativeDateFormatParser_1 = __importDefault(require("./parsers/NLRelativeDateFormatParser"));
const NLTimeUnitAgoFormatParser_1 = __importDefault(require("./parsers/NLTimeUnitAgoFormatParser"));
const NLTimeUnitLaterFormatParser_1 = __importDefault(require("./parsers/NLTimeUnitLaterFormatParser"));
exports.casual = new chrono_1.Chrono(createCasualConfiguration());
exports.strict = new chrono_1.Chrono(createConfiguration(true));
function parse(text, ref, option) {
    return exports.casual.parse(text, ref, option);
}
exports.parse = parse;
function parseDate(text, ref, option) {
    return exports.casual.parseDate(text, ref, option);
}
exports.parseDate = parseDate;
function createCasualConfiguration(littleEndian = true) {
    const option = createConfiguration(false, littleEndian);
    option.parsers.unshift(new NLCasualDateParser_1.default());
    option.parsers.unshift(new NLCasualTimeParser_1.default());
    option.parsers.unshift(new NLCasualDateTimeParser_1.default());
    option.parsers.unshift(new NLMonthNameParser_1.default());
    option.parsers.unshift(new NLRelativeDateFormatParser_1.default());
    option.parsers.unshift(new NLTimeUnitCasualRelativeFormatParser_1.default());
    return option;
}
exports.createCasualConfiguration = createCasualConfiguration;
function createConfiguration(strictMode = true, littleEndian = true) {
    return configurations_1.includeCommonConfiguration({
        parsers: [
            new SlashDateFormatParser_1.default(littleEndian),
            new NLTimeUnitWithinFormatParser_1.default(),
            new NLMonthNameMiddleEndianParser_1.default(),
            new NLMonthNameParser_1.default(),
            new NLWeekdayParser_1.default(),
            new NLCasualYearMonthDayParser_1.default(),
            new NLSlashMonthFormatParser_1.default(),
            new NLTimeExpressionParser_1.default(strictMode),
            new NLTimeUnitAgoFormatParser_1.default(strictMode),
            new NLTimeUnitLaterFormatParser_1.default(strictMode),
        ],
        refiners: [new NLMergeDateTimeRefiner_1.default(), new NLMergeDateRangeRefiner_1.default()],
    }, strictMode);
}
exports.createConfiguration = createConfiguration;
