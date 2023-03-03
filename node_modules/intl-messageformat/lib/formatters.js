var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { isArgumentElement, isLiteralElement, isDateElement, isTimeElement, isNumberElement, isSelectElement, isPluralElement } from 'intl-messageformat-parser';
var ESCAPE_HASH_REGEX = /\\#/g;
var FormatError = /** @class */ (function (_super) {
    __extends(FormatError, _super);
    function FormatError(msg, variableId) {
        var _this = _super.call(this, msg) || this;
        _this.variableId = variableId;
        return _this;
    }
    return FormatError;
}(Error));
function mergeLiteral(parts) {
    if (parts.length < 2) {
        return parts;
    }
    return parts.reduce(function (all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart ||
            lastPart.type !== 0 /* literal */ ||
            part.type !== 0 /* literal */) {
            all.push(part);
        }
        else {
            lastPart.value += part.value;
        }
        return all;
    }, []);
}
export function formatToParts(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    // Hot path for straight simple msg translations
    if (els.length === 1 && isLiteralElement(els[0])) {
        return [
            {
                type: 0 /* literal */,
                value: els[0].value.replace(ESCAPE_HASH_REGEX, '#')
            }
        ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        // Exit early for string parts.
        if (isLiteralElement(el)) {
            result.push({
                type: 0 /* literal */,
                value: el.value.replace(ESCAPE_HASH_REGEX, '#')
            });
            continue;
        }
        var varName = el.value;
        // Enforce that all required values are provided by the caller.
        if (!(values && varName in values)) {
            throw new FormatError("The intl string context variable '" + varName + "' was not provided to the string '" + originalMessage + "'");
        }
        var value = values[varName];
        if (isArgumentElement(el)) {
            if (!value || typeof value === 'string' || typeof value === 'number') {
                result.push({
                    type: 0 /* literal */,
                    value: typeof value === 'string' || typeof value === 'number'
                        ? String(value)
                        : ''
                });
            }
            else {
                result.push({
                    type: 1 /* argument */,
                    value: value
                });
            }
            continue;
        }
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (isDateElement(el)) {
            var style = el.style ? formats.date[el.style] : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value)
            });
            continue;
        }
        if (isTimeElement(el)) {
            var style = el.style ? formats.time[el.style] : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getDateTimeFormat(locales, style)
                    .format(value)
            });
            continue;
        }
        if (isNumberElement(el)) {
            var style = el.style ? formats.number[el.style] : undefined;
            result.push({
                type: 0 /* literal */,
                value: formatters
                    .getNumberFormat(locales, style)
                    .format(value)
            });
            continue;
        }
        if (isSelectElement(el)) {
            var opt = el.options[value] || el.options.other;
            if (!opt) {
                throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
        if (isPluralElement(el)) {
            var opt = el.options["=" + value];
            if (!opt) {
                var rule = formatters
                    .getPluralRules(locales, { type: el.pluralType })
                    .select(value - (el.offset || 0));
                opt = el.options[rule] || el.options.other;
            }
            if (!opt) {
                throw new RangeError("Invalid values for \"" + el.value + "\": \"" + value + "\". Options are \"" + Object.keys(el.options).join('", "') + "\"");
            }
            result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
            continue;
        }
    }
    return mergeLiteral(result);
}
export function formatToString(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    var parts = formatToParts(els, locales, formatters, formats, values, originalMessage);
    // Hot path for straight simple msg translations
    if (parts.length === 1) {
        return parts[0].value;
    }
    return parts.reduce(function (all, part) { return (all += part.value); }, '');
}
// Singleton
var domParser;
var TOKEN_DELIMITER = '@@';
var TOKEN_REGEX = /@@(.*?)@@/g;
var counter = 0;
function generateId() {
    return Date.now() + "_" + ++counter;
}
function restoreRichPlaceholderMessage(text, objectParts) {
    return text
        .split(TOKEN_REGEX)
        .filter(Boolean)
        .map(function (c) { return objectParts[c] || c; });
}
export function formatXMLMessage(els, locales, formatters, formats, values, 
// For debugging
originalMessage) {
    var parts = formatToParts(els, locales, formatters, formats, values, originalMessage);
    var objectParts = {};
    var formattedMessage = parts.reduce(function (all, part) {
        if (typeof part.value === 'string' || part.type === 0 /* literal */) {
            return (all += part.value);
        }
        var id = generateId();
        objectParts[id] = part.value;
        return (all += "" + TOKEN_DELIMITER + id + TOKEN_DELIMITER);
    }, '');
    // Not designed to filter out aggressively
    if (!~formattedMessage.indexOf('<')) {
        return restoreRichPlaceholderMessage(formattedMessage, objectParts);
    }
    if (!values) {
        throw new FormatError('Message has placeholders but no values was given');
    }
    if (typeof DOMParser === 'undefined') {
        throw new FormatError('Cannot format XML message without DOMParser');
    }
    if (!domParser) {
        domParser = new DOMParser();
    }
    // XML, not HTML since HTMl is strict about self-closing tag
    var dom = domParser.parseFromString("<template>" + formattedMessage + "</template>", 'application/xml');
    if (dom.getElementsByTagName('parsererror').length) {
        throw new FormatError("Malformed XML message " + dom.getElementsByTagName('parsererror')[0].innerHTML);
    }
    var content = dom.firstChild;
    if (!content) {
        throw new FormatError("Malformed XML message " + formattedMessage);
    }
    var tagsToFormat = Object.keys(values).filter(function (varName) { return !!dom.getElementsByTagName(varName).length; });
    // No tags to format
    if (!tagsToFormat.length) {
        return restoreRichPlaceholderMessage(formattedMessage, objectParts);
    }
    var childNodes = Array.prototype.slice.call(content.childNodes);
    return childNodes.reduce(function (reconstructedChunks, _a) {
        var tagName = _a.tagName, outerHTML = _a.outerHTML, textContent = _a.textContent;
        // Regular text
        if (!tagName) {
            var chunks = restoreRichPlaceholderMessage(textContent || '', objectParts);
            return reconstructedChunks.concat(chunks);
        }
        // Legacy HTML
        if (!values[tagName]) {
            var chunks = restoreRichPlaceholderMessage(outerHTML, objectParts);
            if (chunks.length === 1) {
                return reconstructedChunks.concat([chunks[0]]);
            }
            return reconstructedChunks.concat(chunks);
        }
        // XML Tag replacement
        var formatFnOrValue = values[tagName];
        if (typeof formatFnOrValue === 'function') {
            if (textContent == null) {
                return reconstructedChunks.concat([
                    formatFnOrValue(textContent || undefined)
                ]);
            }
            var chunks = restoreRichPlaceholderMessage(textContent, objectParts);
            return reconstructedChunks.concat([formatFnOrValue.apply(void 0, chunks)]);
        }
        return reconstructedChunks.concat([formatFnOrValue]);
    }, []);
}
