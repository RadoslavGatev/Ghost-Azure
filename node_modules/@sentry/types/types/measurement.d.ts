/**
 * A time duration.
 */
export declare type DurationUnit = 'nanosecond' | 'microsecond' | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week';
/**
 * Size of information derived from bytes.
 */
export declare type InformationUnit = 'bit' | 'byte' | 'kilobyte' | 'kibibyte' | 'megabyte' | 'mebibyte' | 'gigabyte' | 'terabyte' | 'tebibyte' | 'petabyte' | 'exabyte' | 'exbibyte';
/**
 * Fractions such as percentages.
 */
export declare type FractionUnit = 'ratio' | 'percent';
/**
 * Untyped value without a unit.
 */
export declare type NoneUnit = '' | 'none';
declare type LiteralUnion<T extends string> = T | Omit<T, T>;
export declare type MeasurementUnit = LiteralUnion<DurationUnit | InformationUnit | FractionUnit | NoneUnit>;
export declare type Measurements = Record<string, {
    value: number;
    unit: MeasurementUnit;
}>;
export {};
//# sourceMappingURL=measurement.d.ts.map