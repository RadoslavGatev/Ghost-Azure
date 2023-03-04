import type { RequireResult } from './types';
/**
 * Adds a `default` property to CJS modules which aren't the result of transpilation from ESM modules.
 *
 * Adapted from Sucrase (https://github.com/alangpierce/sucrase)
 *
 * @param requireResult The result of calling `require` on a module
 * @returns Either `requireResult` or a copy of `requireResult` with an added self-referential `default` property
 */
export declare function _interopRequireWildcard(requireResult: RequireResult): RequireResult;
//# sourceMappingURL=_interopRequireWildcard.d.ts.map