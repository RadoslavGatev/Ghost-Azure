import { CronFieldType } from './index';
import { Result } from './result';
import { Options } from './types';
declare const checkField: (cronField: string, cronFieldType: CronFieldType, options: Options) => Result<boolean, string[]>;
export default checkField;
