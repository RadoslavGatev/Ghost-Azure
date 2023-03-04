import { isNodeEnv } from './node.js';

/** Internal */

var fallbackGlobalObject = {};

/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
function getGlobalObject() {
  return (
    isNodeEnv()
      ? global
      : typeof window !== 'undefined'       ? window       : typeof self !== 'undefined'
      ? self
      : fallbackGlobalObject
  ) ;
}

/**
 * Returns a global singleton contained in the global `__SENTRY__` object.
 *
 * If the singleton doesn't already exist in `__SENTRY__`, it will be created using the given factory
 * function and added to the `__SENTRY__` object.
 *
 * @param name name of the global singleton on __SENTRY__
 * @param creator creator Factory function to create the singleton if it doesn't already exist on `__SENTRY__`
 * @param obj (Optional) The global object on which to look for `__SENTRY__`, if not `getGlobalObject`'s return value
 * @returns the singleton
 */
function getGlobalSingleton(name, creator, obj) {
  var global = (obj || getGlobalObject()) ;
  var __SENTRY__ = (global.__SENTRY__ = global.__SENTRY__ || {});
  var singleton = __SENTRY__[name] || (__SENTRY__[name] = creator());
  return singleton;
}

export { getGlobalObject, getGlobalSingleton };
//# sourceMappingURL=global.js.map
