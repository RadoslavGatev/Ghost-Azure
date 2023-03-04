import { _optionalChain } from '@sentry/utils/esm/buildPolyfills';
import { addGlobalEventProcessor, getCurrentHub } from '@sentry/core';
import { isInstanceOf, resolvedSyncPromise, SyncPromise } from '@sentry/utils';
import { exceptionFromError } from '../eventbuilder.js';
import { ContextLines } from './contextlines.js';

const DEFAULT_KEY = 'cause';
const DEFAULT_LIMIT = 5;

/** Adds SDK info to an event. */
class LinkedErrors  {
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'LinkedErrors';}

  /**
   * @inheritDoc
   */
    __init() {this.name = LinkedErrors.id;}

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */

  /**
   * @inheritDoc
   */
   constructor(options = {}) {LinkedErrors.prototype.__init.call(this);
    this._key = options.key || DEFAULT_KEY;
    this._limit = options.limit || DEFAULT_LIMIT;
  }

  /**
   * @inheritDoc
   */
   setupOnce() {
    addGlobalEventProcessor(async (event, hint) => {
      const hub = getCurrentHub();
      const self = hub.getIntegration(LinkedErrors);
      const client = hub.getClient();
      if (client && self && self._handler && typeof self._handler === 'function') {
        await self._handler(client.getOptions().stackParser, event, hint);
      }
      return event;
    });
  }

  /**
   * @inheritDoc
   */
   _handler(stackParser, event, hint) {
    if (!event.exception || !event.exception.values || !isInstanceOf(hint.originalException, Error)) {
      return resolvedSyncPromise(event);
    }

    return new SyncPromise(resolve => {
      void this._walkErrorTree(stackParser, hint.originalException , this._key)
        .then((linkedErrors) => {
          if (event && event.exception && event.exception.values) {
            event.exception.values = [...linkedErrors, ...event.exception.values];
          }
          resolve(event);
        })
        .then(null, () => {
          resolve(event);
        });
    });
  }

  /**
   * @inheritDoc
   */
   async _walkErrorTree(
    stackParser,
    error,
    key,
    stack = [],
  ) {
    if (!isInstanceOf(error[key], Error) || stack.length + 1 >= this._limit) {
      return Promise.resolve(stack);
    }

    const exception = exceptionFromError(stackParser, error[key]);

    // If the ContextLines integration is enabled, we add source code context to linked errors
    // because we can't guarantee the order that integrations are run.
    const contextLines = getCurrentHub().getIntegration(ContextLines);
    if (contextLines && _optionalChain([exception, 'access', _ => _.stacktrace, 'optionalAccess', _2 => _2.frames])) {
      await contextLines.addSourceContextToFrames(exception.stacktrace.frames);
    }

    return new Promise((resolve, reject) => {
      void this._walkErrorTree(stackParser, error[key], key, [exception, ...stack])
        .then(resolve)
        .then(null, () => {
          reject();
        });
    });
  }
}LinkedErrors.__initStatic();

export { LinkedErrors };
//# sourceMappingURL=linkederrors.js.map
