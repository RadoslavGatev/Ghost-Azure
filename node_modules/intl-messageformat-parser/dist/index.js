"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var normalize_1 = require("./normalize");
__export(require("./types"));
__export(require("./parser"));
var printer_1 = require("./printer");
exports.printAST = printer_1.printAST;
function parse(input, opts) {
    var els = parser_1.parse(input, opts);
    if (!opts || opts.normalizeHashtagInPlural !== false) {
        normalize_1.normalizeHashtagInPlural(els);
    }
    return els;
}
exports.parse = parse;
