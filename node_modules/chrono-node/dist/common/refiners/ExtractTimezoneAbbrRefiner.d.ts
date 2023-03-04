import { ParsingContext, Refiner } from "../../chrono";
import { ParsingResult } from "../../results";
export default class ExtractTimezoneAbbrRefiner implements Refiner {
    private readonly timezone;
    constructor(timezoneOverrides?: {
        string: number;
    });
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[];
}
