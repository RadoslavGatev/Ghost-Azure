import { getCurrentHub } from '@sentry/core';
import { logger } from '@sentry/utils';

const DEFAULT_SHUTDOWN_TIMEOUT = 2000;

/**
 * @hidden
 */
function logAndExitProcess(error) {
  // eslint-disable-next-line no-console
  console.error(error && error.stack ? error.stack : error);

  const client = getCurrentHub().getClient();

  if (client === undefined) {
    (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && logger.warn('No NodeClient was defined, we are exiting the process now.');
    global.process.exit(1);
  }

  const options = client.getOptions();
  const timeout =
    (options && options.shutdownTimeout && options.shutdownTimeout > 0 && options.shutdownTimeout) ||
    DEFAULT_SHUTDOWN_TIMEOUT;
  client.close(timeout).then(
    (result) => {
      if (!result) {
        (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && logger.warn('We reached the timeout for emptying the request buffer, still exiting now!');
      }
      global.process.exit(1);
    },
    error => {
      (typeof __SENTRY_DEBUG__ === 'undefined' || __SENTRY_DEBUG__) && logger.error(error);
    },
  );
}

export { logAndExitProcess };
//# sourceMappingURL=errorhandling.js.map
