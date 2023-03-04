import type { Primitive } from '@sentry/types';
export declare type GenericObject = {
    [key: string]: Value;
};
export declare type GenericFunction = (...args: unknown[]) => Value;
export declare type Value = Primitive | GenericFunction | GenericObject;
export declare type RequireResult = GenericObject | (GenericFunction & GenericObject);
//# sourceMappingURL=types.d.ts.map