export declare type Result<T, E> = Valid<T, E> | Err<T, E>;
export declare const valid: <T, E>(value: T) => Valid<T, E>;
export declare const err: <T, E>(error: E) => Err<T, E>;
export declare class Valid<T, E> {
    readonly value: T;
    constructor(value: T);
    isValid(): this is Valid<T, E>;
    isError(): this is Err<T, E>;
    getValue(): T;
    getError(): E;
    map<A>(func: (t: T) => A): Result<A, E>;
    mapErr<U>(func: (e: E) => U): Result<T, U>;
}
export declare class Err<T, E> {
    readonly error: E;
    constructor(error: E);
    isError(): this is Err<T, E>;
    isValid(): this is Valid<T, E>;
    getValue(): T;
    getError(): E;
    map<A>(func: (t: T) => A): Result<A, E>;
    mapErr<U>(func: (e: E) => U): Result<T, U>;
}
