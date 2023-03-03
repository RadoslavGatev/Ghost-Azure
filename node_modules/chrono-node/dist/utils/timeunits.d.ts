import { OpUnitType, QUnitType } from "dayjs";
import { ParsingComponents } from "../results";
export declare type TimeUnits = {
    [c in OpUnitType | QUnitType]?: number;
};
export declare function reverseTimeUnits(timeUnits: TimeUnits): TimeUnits;
export declare function addImpliedTimeUnits(components: ParsingComponents, timeUnits: TimeUnits): ParsingComponents;
