import { parse as pegParse } from './parser';
import { normalizeHashtagInPlural } from './normalize';
export * from './types';
export * from './parser';
export { printAST } from './printer';
export function parse(input, opts) {
    var els = pegParse(input, opts);
    if (!opts || opts.normalizeHashtagInPlural !== false) {
        normalizeHashtagInPlural(els);
    }
    return els;
}
