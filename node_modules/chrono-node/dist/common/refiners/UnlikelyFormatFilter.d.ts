import { Filter } from "../abstractRefiners";
import { ParsingResult } from "../../results";
export default class UnlikelyFormatFilter extends Filter {
    private strictMode;
    constructor(strictMode: boolean);
    isValid(context: any, result: ParsingResult): boolean;
    private isStrictModeValid;
}
