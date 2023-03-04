Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Wrap a module in an object, as the value under the key `default`.
 *
 * Adapted from Rollup (https://github.com/rollup/rollup)
 *
 * @param requireResult The result of calling `require` on a module
 * @returns An object containing the key-value pair (`default`, `requireResult`)
 */
function _interopNamespaceDefaultOnly$1(requireResult) {
  return {
    __proto__: null,
    default: requireResult,
  };
}

// Rollup version
// function _interopNamespaceDefaultOnly(e) {
//   return {
//     __proto__: null,
//     'default': e
//   };
// }

exports._interopNamespaceDefaultOnly = _interopNamespaceDefaultOnly$1;
//# sourceMappingURL=_interopNamespaceDefaultOnly.js.map
