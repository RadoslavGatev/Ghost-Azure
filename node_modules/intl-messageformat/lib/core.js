/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isArgumentElement, isLiteralElement, isDateElement, isTimeElement, isNumberElement, isSelectElement, isPluralElement } from 'intl-messageformat-parser';
import memoizeIntlConstructor from 'intl-format-cache';
import { formatToString, formatToParts, formatXMLMessage } from './formatters';
// -- MessageFormat --------------------------------------------------------
function resolveLocale(locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }
    try {
        return Intl.NumberFormat.supportedLocalesOf(locales, {
            // IE11 localeMatcher `lookup` seems to convert `en` -> `en-US`
            // but not other browsers,
            localeMatcher: 'best fit'
        })[0];
    }
    catch (e) {
        return IntlMessageFormat.defaultLocale;
    }
}
function prewarmFormatters(els, locales, formatters, formats) {
    els
        .filter(function (el) { return !isArgumentElement(el) && !isLiteralElement(el); })
        .forEach(function (el) {
        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (isDateElement(el)) {
            var style = el.style ? formats.date[el.style] : undefined;
            return formatters.getDateTimeFormat(locales, style);
        }
        if (isTimeElement(el)) {
            var style = el.style ? formats.time[el.style] : undefined;
            return formatters.getDateTimeFormat(locales, style);
        }
        if (isNumberElement(el)) {
            var style = el.style ? formats.number[el.style] : undefined;
            return formatters.getNumberFormat(locales, style);
        }
        if (isSelectElement(el)) {
            return Object.keys(el.options).forEach(function (id) {
                return prewarmFormatters(el.options[id].value, locales, formatters, formats);
            });
        }
        if (isPluralElement(el)) {
            formatters.getPluralRules(locales, { type: el.pluralType });
            return Object.keys(el.options).forEach(function (id) {
                return prewarmFormatters(el.options[id].value, locales, formatters, formats);
            });
        }
    });
}
function mergeConfig(c1, c2) {
    if (!c2) {
        return c1;
    }
    return __assign({}, (c1 || {}), (c2 || {}), Object.keys(c1).reduce(function (all, k) {
        all[k] = __assign({}, c1[k], (c2[k] || {}));
        return all;
    }, {}));
}
function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
        return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function (all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
    }, __assign({}, defaultConfig));
}
export function createDefaultFormatters(cache) {
    if (cache === void 0) { cache = {
        number: {},
        dateTime: {},
        pluralRules: {}
    }; }
    return {
        getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat, cache.number),
        getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat, cache.dateTime),
        getPluralRules: memoizeIntlConstructor(Intl.PluralRules, cache.pluralRules)
    };
}
var IntlMessageFormat = /** @class */ (function () {
    function IntlMessageFormat(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) { locales = IntlMessageFormat.defaultLocale; }
        this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {}
        };
        this.format = function (values) {
            return formatToString(_this.ast, _this.locale, _this.formatters, _this.formats, values, _this.message);
        };
        this.formatToParts = function (values) {
            return formatToParts(_this.ast, _this.locale, _this.formatters, _this.formats, values, _this.message);
        };
        this.formatXMLMessage = function (values) {
            return formatXMLMessage(_this.ast, _this.locale, _this.formatters, _this.formats, values, _this.message);
        };
        this.resolvedOptions = function () { return ({ locale: _this.locale }); };
        this.getAst = function () { return _this.ast; };
        if (typeof message === 'string') {
            this.message = message;
            if (!IntlMessageFormat.__parse) {
                throw new TypeError('IntlMessageFormat.__parse must be set to process `message` of type `string`');
            }
            // Parse string messages into an AST.
            this.ast = IntlMessageFormat.__parse(message);
        }
        else {
            this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
            throw new TypeError('A message must be provided as a String or AST.');
        }
        // Creates a new object with the specified `formats` merged with the default
        // formats.
        this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);
        // Defined first because it's used to build the format pattern.
        this.locale = resolveLocale(locales || []);
        this.formatters =
            (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
        prewarmFormatters(this.ast, this.locale, this.formatters, this.formats);
    }
    IntlMessageFormat.defaultLocale = 'en';
    IntlMessageFormat.__parse = undefined;
    // Default format options used as the prototype of the `formats` provided to the
    // constructor. These are used when constructing the internal Intl.NumberFormat
    // and Intl.DateTimeFormat instances.
    IntlMessageFormat.formats = {
        number: {
            currency: {
                style: 'currency'
            },
            percent: {
                style: 'percent'
            }
        },
        date: {
            short: {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit'
            },
            medium: {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            },
            long: {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            },
            full: {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            }
        },
        time: {
            short: {
                hour: 'numeric',
                minute: 'numeric'
            },
            medium: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },
            long: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            },
            full: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            }
        }
    };
    return IntlMessageFormat;
}());
export { IntlMessageFormat };
export default IntlMessageFormat;
