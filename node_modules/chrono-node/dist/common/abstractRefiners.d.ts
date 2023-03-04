import { ParsingContext, Refiner } from "../chrono";
import { ParsingResult } from "../results";
export declare abstract class Filter implements Refiner {
    abstract isValid(context: ParsingContext, result: ParsingResult): boolean;
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[];
}
export declare abstract class MergingRefiner implements Refiner {
    abstract shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult, context: ParsingContext): boolean;
    abstract mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult, context: ParsingContext): ParsingResult;
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[];
}
