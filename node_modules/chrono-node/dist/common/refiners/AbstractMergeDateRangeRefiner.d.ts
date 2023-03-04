import { ParsingResult } from "../../results";
import { MergingRefiner } from "../abstractRefiners";
export default abstract class AbstractMergeDateRangeRefiner extends MergingRefiner {
    abstract patternBetween(): RegExp;
    shouldMergeResults(textBetween: any, currentResult: any, nextResult: any): boolean;
    mergeResults(textBetween: any, fromResult: any, toResult: any): ParsingResult;
}
