"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = exports.parse = exports.casual = exports.strict = exports.zh = exports.nl = exports.pt = exports.ja = exports.fr = exports.de = exports.Meridiem = exports.Chrono = exports.en = void 0;
const en = __importStar(require("./locales/en"));
exports.en = en;
const chrono_1 = require("./chrono");
Object.defineProperty(exports, "Chrono", { enumerable: true, get: function () { return chrono_1.Chrono; } });
var Meridiem;
(function (Meridiem) {
    Meridiem[Meridiem["AM"] = 0] = "AM";
    Meridiem[Meridiem["PM"] = 1] = "PM";
})(Meridiem = exports.Meridiem || (exports.Meridiem = {}));
const de = __importStar(require("./locales/de"));
exports.de = de;
const fr = __importStar(require("./locales/fr"));
exports.fr = fr;
const ja = __importStar(require("./locales/ja"));
exports.ja = ja;
const pt = __importStar(require("./locales/pt"));
exports.pt = pt;
const nl = __importStar(require("./locales/nl"));
exports.nl = nl;
const zh = __importStar(require("./locales/zh"));
exports.zh = zh;
exports.strict = en.strict;
exports.casual = en.casual;
function parse(text, ref, option) {
    return exports.casual.parse(text, ref, option);
}
exports.parse = parse;
function parseDate(text, ref, option) {
    return exports.casual.parseDate(text, ref, option);
}
exports.parseDate = parseDate;
