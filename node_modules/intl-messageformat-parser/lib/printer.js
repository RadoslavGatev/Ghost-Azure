/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
import { isLiteralElement, isSelectElement, isArgumentElement, isDateElement, isTimeElement, isNumberElement, isPluralElement, TYPE } from './types';
var ESCAPED_CHARS = {
    '\\': '\\\\',
    '\\#': '\\#',
    '{': '\\{',
    '}': '\\}'
};
var ESAPE_CHARS_REGEXP = /\\#|[{}\\]/g;
export function printAST(ast) {
    var printedNodes = ast.map(function (el) {
        if (isLiteralElement(el)) {
            return printLiteralElement(el);
        }
        if (isArgumentElement(el)) {
            return printArgumentElement(el);
        }
        if (isDateElement(el) || isTimeElement(el) || isNumberElement(el)) {
            return printSimpleFormatElement(el);
        }
        if (isPluralElement(el)) {
            return printPluralElement(el);
        }
        if (isSelectElement(el)) {
            return printSelectElement(el);
        }
    });
    return printedNodes.join('');
}
function printLiteralElement(_a) {
    var value = _a.value;
    return value.replace(ESAPE_CHARS_REGEXP, function (char) { return ESCAPED_CHARS[char]; });
}
function printArgumentElement(_a) {
    var value = _a.value;
    return "{" + value + "}";
}
function printSimpleFormatElement(el) {
    return "{" + el.value + ", " + TYPE[el.type] + (el.style ? ", " + el.style : '') + "}";
}
function printSelectElement(el) {
    var msg = [
        el.value,
        'select',
        Object.keys(el.options)
            .map(function (id) { return id + "{" + printAST(el.options[id].value) + "}"; })
            .join(' ')
    ].join(',');
    return "{" + msg + "}";
}
function printPluralElement(el) {
    var type = el.pluralType === 'cardinal' ? 'plural' : 'selectordinal';
    var msg = [
        el.value,
        type,
        [
            el.offset ? "offset:" + el.offset : ''
        ].concat(Object.keys(el.options).map(function (id) { return id + "{" + printAST(el.options[id].value) + "}"; })).filter(Boolean)
            .join(' ')
    ].join(',');
    return "{" + msg + "}";
}
