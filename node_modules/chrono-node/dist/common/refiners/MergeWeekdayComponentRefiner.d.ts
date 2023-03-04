import { MergingRefiner } from "../abstractRefiners";
import { ParsingResult } from "../../results";
export default class MergeWeekdayComponentRefiner extends MergingRefiner {
    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult;
    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean;
}
