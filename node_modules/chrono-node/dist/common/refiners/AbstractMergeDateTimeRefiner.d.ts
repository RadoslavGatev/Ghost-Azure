import { MergingRefiner } from "../abstractRefiners";
import { ParsingResult } from "../../results";
export default abstract class ENMergeDateTimeRefiner extends MergingRefiner {
    abstract patternBetween(): RegExp;
    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean;
    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult;
}
