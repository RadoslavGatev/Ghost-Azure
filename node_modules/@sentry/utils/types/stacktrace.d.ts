import { StackFrame, StackLineParser, StackParser } from '@sentry/types';
/**
 * Creates a stack parser with the supplied line parsers
 *
 * StackFrames are returned in the correct order for Sentry Exception
 * frames and with Sentry SDK internal frames removed from the top and bottom
 *
 */
export declare function createStackParser(...parsers: StackLineParser[]): StackParser;
/**
 * Gets a stack parser implementation from Options.stackParser
 * @see Options
 *
 * If options contains an array of line parsers, it is converted into a parser
 */
export declare function stackParserFromStackParserOptions(stackParser: StackParser | StackLineParser[]): StackParser;
/**
 * @hidden
 */
export declare function stripSentryFramesAndReverse(stack: StackFrame[]): StackFrame[];
/**
 * Safely extract function name from itself
 */
export declare function getFunctionName(fn: unknown): string;
declare type GetModuleFn = (filename: string | undefined) => string | undefined;
/**
 * Node.js stack line parser
 *
 * This is in @sentry/utils so it can be used from the Electron SDK in the browser for when `nodeIntegration == true`.
 * This allows it to be used without referencing or importing any node specific code which causes bundlers to complain
 */
export declare function nodeStackLineParser(getModule?: GetModuleFn): StackLineParser;
export {};
//# sourceMappingURL=stacktrace.d.ts.map