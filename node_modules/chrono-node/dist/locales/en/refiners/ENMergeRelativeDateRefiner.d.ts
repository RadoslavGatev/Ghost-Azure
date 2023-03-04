import { MergingRefiner } from "../../../common/abstractRefiners";
import { ParsingResult } from "../../../results";
export default class ENMergeRelativeDateRefiner extends MergingRefiner {
    patternBetween(): RegExp;
    shouldMergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): boolean;
    mergeResults(textBetween: string, currentResult: ParsingResult, nextResult: ParsingResult): ParsingResult;
}
