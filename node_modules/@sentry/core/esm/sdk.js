import { getCurrentHub } from '@sentry/hub';
import { logger } from '@sentry/utils';

/** A class object that can instantiate Client objects. */

/**
 * Internal function to create a new SDK client instance. The client is
 * installed and then bound to the current scope.
 *
 * @param clientClass The client class to instantiate.
 * @param options Options to pass to the client.
 */
function initAndBind(
  clientClass,
  options,
) {
  if (options.debug === true) {
    if ((typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__)) {
      logger.enable();
    } else {
      // use `console.warn` rather than `logger.warn` since by non-debug bundles have all `logger.x` statements stripped
            console.warn('[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.');
    }
  }
  var hub = getCurrentHub();
  var scope = hub.getScope();
  if (scope) {
    scope.update(options.initialScope);
  }

  var client = new clientClass(options);
  hub.bindClient(client);
}

export { initAndBind };
//# sourceMappingURL=sdk.js.map
