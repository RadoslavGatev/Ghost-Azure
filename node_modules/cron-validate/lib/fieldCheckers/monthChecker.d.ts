import { CronData } from '../index';
import { Result } from '../result';
import { Options } from '../types';
declare const checkMonths: (cronData: CronData, options: Options) => Result<boolean, string[]>;
export default checkMonths;
