import { ParsingContext, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";
export default class ExtractTimezoneOffsetRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[];
}
