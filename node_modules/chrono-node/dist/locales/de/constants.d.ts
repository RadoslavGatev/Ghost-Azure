import { OpUnitType, QUnitType } from "dayjs";
import { TimeUnits } from "../../utils/timeunits";
export declare const WEEKDAY_DICTIONARY: {
    [word: string]: number;
};
export declare const MONTH_DICTIONARY: {
    [word: string]: number;
};
export declare const INTEGER_WORD_DICTIONARY: {
    [word: string]: number;
};
export declare const TIME_UNIT_DICTIONARY: {
    [word: string]: OpUnitType | QUnitType;
};
export declare const NUMBER_PATTERN: string;
export declare function parseNumberPattern(match: string): number;
export declare const YEAR_PATTERN = "(?:[0-9]{1,4}(?:\\s*[vn]\\.?\\s*(?:C(?:hr)?|(?:u\\.?|d\\.?(?:\\s*g\\.?)?)?\\s*Z)\\.?|\\s*(?:u\\.?|d\\.?(?:\\s*g\\.)?)\\s*Z\\.?)?)";
export declare function parseYear(match: string): number;
export declare const TIME_UNITS_PATTERN: string;
export declare function parseTimeUnits(timeunitText: any): TimeUnits;
