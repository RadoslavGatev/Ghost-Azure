Object.defineProperty(exports, '__esModule', { value: true });

const core = require('@sentry/core');
const utils = require('@sentry/utils');
const util = require('util');

/** Console module integration */
class Console  {constructor() { Console.prototype.__init.call(this); }
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'Console';}

  /**
   * @inheritDoc
   */
   __init() {this.name = Console.id;}

  /**
   * @inheritDoc
   */
   setupOnce() {
    for (const level of ['debug', 'info', 'warn', 'error', 'log']) {
      utils.fill(console, level, createConsoleWrapper(level));
    }
  }
} Console.__initStatic();

/**
 * Wrapper function that'll be used for every console level
 */
function createConsoleWrapper(level) {
  return function consoleWrapper(originalConsoleMethod) {
    const sentryLevel = utils.severityLevelFromString(level);

    /* eslint-disable prefer-rest-params */
    return function () {
      if (core.getCurrentHub().getIntegration(Console)) {
        core.getCurrentHub().addBreadcrumb(
          {
            category: 'console',
            level: sentryLevel,
            message: util.format.apply(undefined, arguments),
          },
          {
            input: [...arguments],
            level,
          },
        );
      }

      originalConsoleMethod.apply(this, arguments);
    };
    /* eslint-enable prefer-rest-params */
  };
}

exports.Console = Console;
//# sourceMappingURL=console.js.map
