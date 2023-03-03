export var TYPE;
(function (TYPE) {
    /**
     * Raw text
     */
    TYPE[TYPE["literal"] = 0] = "literal";
    /**
     * Variable w/o any format, e.g `var` in `this is a {var}`
     */
    TYPE[TYPE["argument"] = 1] = "argument";
    /**
     * Variable w/ number format
     */
    TYPE[TYPE["number"] = 2] = "number";
    /**
     * Variable w/ date format
     */
    TYPE[TYPE["date"] = 3] = "date";
    /**
     * Variable w/ time format
     */
    TYPE[TYPE["time"] = 4] = "time";
    /**
     * Variable w/ select format
     */
    TYPE[TYPE["select"] = 5] = "select";
    /**
     * Variable w/ plural format
     */
    TYPE[TYPE["plural"] = 6] = "plural";
})(TYPE || (TYPE = {}));
/**
 * Type Guards
 */
export function isLiteralElement(el) {
    return el.type === TYPE.literal;
}
export function isArgumentElement(el) {
    return el.type === TYPE.argument;
}
export function isNumberElement(el) {
    return el.type === TYPE.number;
}
export function isDateElement(el) {
    return el.type === TYPE.date;
}
export function isTimeElement(el) {
    return el.type === TYPE.time;
}
export function isSelectElement(el) {
    return el.type === TYPE.select;
}
export function isPluralElement(el) {
    return el.type === TYPE.plural;
}
export function createLiteralElement(value) {
    return {
        type: TYPE.literal,
        value: value
    };
}
export function createNumberElement(value, style) {
    return {
        type: TYPE.number,
        value: value,
        style: style
    };
}
