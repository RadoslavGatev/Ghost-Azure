import { CronData } from '../index';
import { Result } from '../result';
import { Options } from '../types';
declare const checkDaysOfWeek: (cronData: CronData, options: Options) => Result<boolean, string[]>;
export default checkDaysOfWeek;
