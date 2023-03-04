import { Err, Valid } from './result';
import { InputOptions, Options } from './types';
export interface CronData {
    seconds?: string;
    minutes: string;
    hours: string;
    daysOfMonth: string;
    months: string;
    daysOfWeek: string;
    years?: string;
}
export declare type CronFieldType = 'seconds' | 'minutes' | 'hours' | 'daysOfMonth' | 'months' | 'daysOfWeek' | 'years';
declare const cron: (cronString: string, inputOptions?: InputOptions) => Err<Options | CronData, string[]> | Valid<CronData, string[]>;
export default cron;
