import * as en from "./locales/en";
import { Chrono, Parser, Refiner } from "./chrono";
export { en, Chrono, Parser, Refiner };
export interface ParsingOption {
    forwardDate?: boolean;
    timezones?: {
        [tzKeyword: string]: number;
    };
}
export interface ParsingReference {
    instant?: Date;
    timezone?: string | number;
}
export interface ParsedResult {
    readonly refDate: Date;
    readonly index: number;
    readonly text: string;
    readonly start: ParsedComponents;
    readonly end?: ParsedComponents;
    date(): Date;
}
export interface ParsedComponents {
    isCertain(component: Component): boolean;
    get(component: Component): number | null;
    date(): Date;
}
export declare type Component = "year" | "month" | "day" | "weekday" | "hour" | "minute" | "second" | "millisecond" | "meridiem" | "timezoneOffset";
export declare enum Meridiem {
    AM = 0,
    PM = 1
}
import * as de from "./locales/de";
import * as fr from "./locales/fr";
import * as ja from "./locales/ja";
import * as pt from "./locales/pt";
import * as nl from "./locales/nl";
import * as zh from "./locales/zh";
export { de, fr, ja, pt, nl, zh };
export declare const strict: Chrono;
export declare const casual: Chrono;
export declare function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[];
export declare function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date;
