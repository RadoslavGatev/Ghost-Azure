import type { RequireResult } from './types';
/**
 * Adds a self-referential `default` property to CJS modules which aren't the result of transpilation from ESM modules.
 *
 * Adapted from Rollup (https://github.com/rollup/rollup)
 *
 * @param requireResult The result of calling `require` on a module
 * @returns Either `requireResult` or a copy of `requireResult` with an added self-referential `default` property
 */
export declare function _interopNamespace(requireResult: RequireResult): RequireResult;
//# sourceMappingURL=_interopNamespace.d.ts.map