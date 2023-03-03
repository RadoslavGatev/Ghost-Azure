import { Result } from './result';
import { Options, OptionPreset, InputOptions } from './types';
declare const optionPresets: {
    [presetId: string]: OptionPreset;
};
export declare const getOptionPreset: (presetId: string) => Result<OptionPreset, string>;
export declare const getOptionPresets: () => typeof optionPresets;
export declare const registerOptionPreset: (presetName: string, preset: OptionPreset) => void;
export declare const validateOptions: (inputOptions: InputOptions) => Result<Options, string[]>;
export {};
