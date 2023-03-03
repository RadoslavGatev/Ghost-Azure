import { Parser, ParsingContext } from "../../chrono";
import { ParsingComponents, ParsingResult } from "../../results";
export declare abstract class AbstractTimeExpressionParser implements Parser {
    abstract primaryPrefix(): string;
    abstract followingPhase(): string;
    strictMode: boolean;
    constructor(strictMode?: boolean);
    primarySuffix(): string;
    followingSuffix(): string;
    pattern(context: ParsingContext): RegExp;
    extract(context: ParsingContext, match: RegExpMatchArray): ParsingResult;
    extractPrimaryTimeComponents(context: ParsingContext, match: RegExpMatchArray, strict?: boolean): null | ParsingComponents;
    extractFollowingTimeComponents(context: ParsingContext, match: RegExpMatchArray, result: ParsingResult): null | ParsingComponents;
    private checkAndReturnWithoutFollowingPattern;
    private checkAndReturnWithFollowingPattern;
    private cachedPrimaryPrefix;
    private cachedPrimarySuffix;
    private cachedPrimaryTimePattern;
    getPrimaryTimePatternThroughCache(): any;
    private cachedFollowingPhase;
    private cachedFollowingSuffix;
    private cachedFollowingTimePatten;
    getFollowingTimePatternThroughCache(): any;
}
