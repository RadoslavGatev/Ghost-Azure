"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeCommonConfiguration = void 0;
const ExtractTimezoneAbbrRefiner_1 = __importDefault(require("./common/refiners/ExtractTimezoneAbbrRefiner"));
const ExtractTimezoneOffsetRefiner_1 = __importDefault(require("./common/refiners/ExtractTimezoneOffsetRefiner"));
const OverlapRemovalRefiner_1 = __importDefault(require("./common/refiners/OverlapRemovalRefiner"));
const ForwardDateRefiner_1 = __importDefault(require("./common/refiners/ForwardDateRefiner"));
const UnlikelyFormatFilter_1 = __importDefault(require("./common/refiners/UnlikelyFormatFilter"));
const ISOFormatParser_1 = __importDefault(require("./common/parsers/ISOFormatParser"));
const MergeWeekdayComponentRefiner_1 = __importDefault(require("./common/refiners/MergeWeekdayComponentRefiner"));
function includeCommonConfiguration(configuration, strictMode = false) {
    configuration.parsers.unshift(new ISOFormatParser_1.default());
    configuration.refiners.unshift(new MergeWeekdayComponentRefiner_1.default());
    configuration.refiners.unshift(new ExtractTimezoneAbbrRefiner_1.default());
    configuration.refiners.unshift(new ExtractTimezoneOffsetRefiner_1.default());
    configuration.refiners.unshift(new OverlapRemovalRefiner_1.default());
    configuration.refiners.push(new OverlapRemovalRefiner_1.default());
    configuration.refiners.push(new ForwardDateRefiner_1.default());
    configuration.refiners.push(new UnlikelyFormatFilter_1.default(strictMode));
    return configuration;
}
exports.includeCommonConfiguration = includeCommonConfiguration;
