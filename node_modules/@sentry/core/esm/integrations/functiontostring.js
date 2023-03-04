import { getOriginalFunction } from '@sentry/utils';

let originalFunctionToString;

/** Patch toString calls to return proper name for wrapped functions */
class FunctionToString  {constructor() { FunctionToString.prototype.__init.call(this); }
  /**
   * @inheritDoc
   */
   static __initStatic() {this.id = 'FunctionToString';}

  /**
   * @inheritDoc
   */
   __init() {this.name = FunctionToString.id;}

  /**
   * @inheritDoc
   */
   setupOnce() {
        originalFunctionToString = Function.prototype.toString;

        Function.prototype.toString = function ( ...args) {
      var context = getOriginalFunction(this) || this;
      return originalFunctionToString.apply(context, args);
    };
  }
} FunctionToString.__initStatic();

export { FunctionToString };
//# sourceMappingURL=functiontostring.js.map
