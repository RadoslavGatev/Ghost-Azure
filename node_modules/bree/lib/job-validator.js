"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fs = require('fs');

var _require = require('path'),
    join = _require.join;

var combineErrors = require('combine-errors');

var cron = require('cron-validate');

var isSANB = require('is-string-and-not-blank');

var isValidPath = require('is-valid-path');

var threads = require('bthreads');

var _require2 = require('./job-utils'),
    getName = _require2.getName,
    isSchedule = _require2.isSchedule,
    parseValue = _require2.parseValue;

var validateReservedJobName = function validateReservedJobName(name) {
  // Don't allow a job to have the `index` file name
  if (['index', 'index.js', 'index.mjs'].includes(name)) {
    return new Error('You cannot use the reserved job name of "index", "index.js", nor "index.mjs"');
  }
};

var validateStringJob = function validateStringJob(job, i, config) {
  var errors = [];
  var jobNameError = validateReservedJobName(job);

  if (jobNameError) {
    throw jobNameError;
  }

  if (!config.root) {
    errors.push(new Error("Job #".concat(i + 1, " \"").concat(job, "\" requires root directory option to auto-populate path")));
    throw combineErrors(errors);
  }

  var path = join(config.root, config.acceptedExtensions.some(function (ext) {
    return job.endsWith(ext);
  }) ? job : "".concat(job, ".").concat(config.defaultExtension));
  /* istanbul ignore next */

  if (!threads.browser) {
    var stats = fs.statSync(path);

    if (!stats.isFile()) {
      throw new Error("Job #".concat(i + 1, " \"").concat(job, "\" path missing: ").concat(path));
    }
  }
};

var validateFunctionJob = function validateFunctionJob(job, i) {
  var errors = [];
  var path = "(".concat(job.toString(), ")()"); // Can't be a built-in or bound function

  if (path.includes('[native code]')) {
    errors.push(new Error("Job #".concat(i + 1, " can't be a bound or built-in function")));
  }

  if (errors.length > 0) {
    throw combineErrors(errors);
  }
};

var validateJobPath = function validateJobPath(job, prefix, config) {
  var errors = [];

  if (typeof job.path === 'function') {
    var path = "(".concat(job.path.toString(), ")()"); // Can't be a built-in or bound function

    if (path.includes('[native code]')) {
      errors.push(new Error("".concat(prefix, " can't be a bound or built-in function")));
    }
  } else if (!isSANB(job.path) && !config.root) {
    errors.push(new Error("".concat(prefix, " requires root directory option to auto-populate path")));
  } else {
    // Validate path
    var _path = isSANB(job.path) ? job.path : join(config.root, config.acceptedExtensions.some(function (ext) {
      return job.name.endsWith(ext);
    }) ? job.name : "".concat(job.name, ".").concat(config.defaultExtension));

    if (isValidPath(_path)) {
      try {
        /* istanbul ignore next */
        if (!threads.browser) {
          var stats = fs.statSync(_path); // eslint-disable-next-line max-depth

          if (!stats.isFile()) {
            throw new Error("".concat(prefix, " path missing: ").concat(_path));
          }
        }
      } catch (err) {
        /* istanbul ignore next */
        errors.push(err);
      }
    }
  }

  return errors;
};

var cronValidateWithSeconds = function cronValidateWithSeconds(job, config) {
  var preset = job.cronValidate && job.cronValidate.preset ? job.cronValidate.preset : config.cronValidate && config.cronValidate.preset ? config.cronValidate.preset : 'default';

  var override = _objectSpread(_objectSpread(_objectSpread({}, config.cronValidate && config.cronValidate.override ? config.cronValidate.override : {}), job.cronValidate && job.cronValidate.override ? job.cronValidate.override : {}), {}, {
    useSeconds: true
  });

  return _objectSpread(_objectSpread(_objectSpread({}, config.cronValidate), job.cronValidate), {}, {
    preset: preset,
    override: override
  });
};

var validateCron = function validateCron(job, prefix, config) {
  var errors = [];

  if (!isSchedule(job.cron)) {
    // If `hasSeconds` was `true` then set `cronValidate` and inherit any existing options
    var cronValidate = job.hasSeconds ? cronValidateWithSeconds(job, config) : config.cronValidate; //
    // validate cron pattern
    // (must support patterns such as `* * L * *` and `0 0/5 14 * * ?` (and aliases too)
    //
    //  <https://github.com/Airfooox/cron-validate/issues/67>
    //

    var result = cron(job.cron, cronValidate);

    if (!result.isValid()) {
      // NOTE: it is always valid
      // const schedule = later.schedule(
      //   later.parse.cron(
      //     job.cron,
      //     boolean(
      //       typeof job.hasSeconds === 'undefined'
      //         ? config.hasSeconds
      //         : job.hasSeconds
      //     )
      //   )
      // );
      // if (schedule.isValid()) {
      //   job.interval = schedule;
      // } // else {
      //   errors.push(
      //     new Error(
      //       `${prefix} had an invalid cron schedule (see <https://crontab.guru> if you need help)`
      //     )
      //   );
      // }
      var _iterator = _createForOfIteratorHelper(result.getError()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var message = _step.value;
          errors.push(new Error("".concat(prefix, " had an invalid cron pattern: ").concat(message)));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  return errors;
};

var validateJobName = function validateJobName(job, i, reservedNames) {
  var errors = [];
  var name = getName(job);

  if (!name) {
    errors.push(new Error("Job #".concat(i + 1, " is missing a name")));
  } // Throw an error if duplicate job names


  if (reservedNames.includes(name)) {
    errors.push(new Error("Job #".concat(i + 1, " has a duplicate job name of ").concat(getName(job))));
  }

  return errors;
}; // eslint-disable-next-line complexity


var validate = function validate(job, i, names, config) {
  var errors = validateJobName(job, i, names);

  if (errors.length > 0) {
    throw combineErrors(errors);
  } // Support a simple string which we will transform to have a path


  if (isSANB(job)) {
    return validateStringJob(job, i, config);
  } // Job is a function


  if (typeof job === 'function') {
    return validateFunctionJob(job, i);
  } // Use a prefix for errors


  var prefix = "Job #".concat(i + 1, " named \"").concat(job.name, "\"");
  errors.push.apply(errors, (0, _toConsumableArray2.default)(validateJobPath(job, prefix, config))); // Don't allow users to mix interval AND cron

  if (typeof job.interval !== 'undefined' && typeof job.cron !== 'undefined') {
    errors.push(new Error("".concat(prefix, " cannot have both interval and cron configuration")));
  } // Don't allow users to mix timeout AND date


  if (typeof job.timeout !== 'undefined' && typeof job.date !== 'undefined') {
    errors.push(new Error("".concat(prefix, " cannot have both timeout and date")));
  }

  var jobNameError = validateReservedJobName(job.name);

  if (jobNameError) {
    errors.push(jobNameError);
  } // Validate date


  if (typeof job.date !== 'undefined' && !(job.date instanceof Date)) {
    errors.push(new Error("".concat(prefix, " had an invalid Date of ").concat(job.date)));
  }

  ['timeout', 'interval'].forEach(function (prop) {
    if (typeof job[prop] !== 'undefined') {
      try {
        parseValue(job[prop]);
      } catch (err) {
        errors.push(combineErrors([new Error("".concat(prefix, " had an invalid ").concat(prop, " of ").concat(job.timeout)), err]));
      }
    }
  }); // Validate hasSeconds

  if (typeof job.hasSeconds !== 'undefined' && typeof job.hasSeconds !== 'boolean') {
    errors.push(new Error("".concat(prefix, " had hasSeconds value of ").concat(job.hasSeconds, " (it must be a Boolean)")));
  } // Validate cronValidate


  if (typeof job.cronValidate !== 'undefined' && (0, _typeof2.default)(job.cronValidate) !== 'object') {
    errors.push(new Error("".concat(prefix, " had cronValidate value set, but it must be an Object")));
  }

  if (typeof job.cron !== 'undefined') {
    errors.push.apply(errors, (0, _toConsumableArray2.default)(validateCron(job, prefix, config)));
  } // Validate closeWorkerAfterMs


  if (typeof job.closeWorkerAfterMs !== 'undefined' && (!Number.isFinite(job.closeWorkerAfterMs) || job.closeWorkerAfterMs <= 0)) {
    errors.push(new Error("".concat(prefix, " had an invalid closeWorkersAfterMs value of ").concat(job.closeWorkersAfterMs, " (it must be a finite number > 0)")));
  }

  if (isSANB(job.timezone) && !['local', 'system'].includes(job.timezone)) {
    try {
      // `.toLocaleString()` will throw a `RangeError` if `timeZone` string
      // is bogus or not supported by the environment.
      new Date().toLocaleString('ia', {
        timeZone: job.timezone
      });
    } catch (_unused) {
      errors.push(new Error("".concat(prefix, " had an invalid or unsupported timezone specified: ").concat(job.timezone)));
    }
  }

  if (errors.length > 0) {
    throw combineErrors(errors);
  }
};

module.exports = validate;
module.exports.cronValidateWithSeconds = cronValidateWithSeconds;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2ItdmFsaWRhdG9yLmpzIl0sIm5hbWVzIjpbImZzIiwicmVxdWlyZSIsImpvaW4iLCJjb21iaW5lRXJyb3JzIiwiY3JvbiIsImlzU0FOQiIsImlzVmFsaWRQYXRoIiwidGhyZWFkcyIsImdldE5hbWUiLCJpc1NjaGVkdWxlIiwicGFyc2VWYWx1ZSIsInZhbGlkYXRlUmVzZXJ2ZWRKb2JOYW1lIiwibmFtZSIsImluY2x1ZGVzIiwiRXJyb3IiLCJ2YWxpZGF0ZVN0cmluZ0pvYiIsImpvYiIsImkiLCJjb25maWciLCJlcnJvcnMiLCJqb2JOYW1lRXJyb3IiLCJyb290IiwicHVzaCIsInBhdGgiLCJhY2NlcHRlZEV4dGVuc2lvbnMiLCJzb21lIiwiZXh0IiwiZW5kc1dpdGgiLCJkZWZhdWx0RXh0ZW5zaW9uIiwiYnJvd3NlciIsInN0YXRzIiwic3RhdFN5bmMiLCJpc0ZpbGUiLCJ2YWxpZGF0ZUZ1bmN0aW9uSm9iIiwidG9TdHJpbmciLCJsZW5ndGgiLCJ2YWxpZGF0ZUpvYlBhdGgiLCJwcmVmaXgiLCJlcnIiLCJjcm9uVmFsaWRhdGVXaXRoU2Vjb25kcyIsInByZXNldCIsImNyb25WYWxpZGF0ZSIsIm92ZXJyaWRlIiwidXNlU2Vjb25kcyIsInZhbGlkYXRlQ3JvbiIsImhhc1NlY29uZHMiLCJyZXN1bHQiLCJpc1ZhbGlkIiwiZ2V0RXJyb3IiLCJtZXNzYWdlIiwidmFsaWRhdGVKb2JOYW1lIiwicmVzZXJ2ZWROYW1lcyIsInZhbGlkYXRlIiwibmFtZXMiLCJpbnRlcnZhbCIsInRpbWVvdXQiLCJkYXRlIiwiRGF0ZSIsImZvckVhY2giLCJwcm9wIiwiY2xvc2VXb3JrZXJBZnRlck1zIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJjbG9zZVdvcmtlcnNBZnRlck1zIiwidGltZXpvbmUiLCJ0b0xvY2FsZVN0cmluZyIsInRpbWVab25lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxF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NEMsa0JBQVgsS0FBa0MsV0FBbEMsS0FDQyxDQUFDQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0I5QyxHQUFHLENBQUM0QyxrQkFBcEIsQ0FBRCxJQUE0QzVDLEdBQUcsQ0FBQzRDLGtCQUFKLElBQTBCLENBRHZFLENBREYsRUFHRTtBQUNBekMsSUFBQUEsTUFBTSxDQUFDRyxJQUFQLENBQ0UsSUFBSVIsS0FBSixXQUNLdUIsTUFETCwwREFDMkRyQixHQUFHLENBQUMrQyxtQkFEL0QsdUNBREY7QUFLRDs7QUFFRCxNQUFJMUQsTUFBTSxDQUFDVyxHQUFHLENBQUNnRCxRQUFMLENBQU4sSUFBd0IsQ0FBQyxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CbkQsUUFBcEIsQ0FBNkJHLEdBQUcsQ0FBQ2dELFFBQWpDLENBQTdCLEVBQXlFO0FBQ3ZFLFFBQUk7QUFDRjtBQUNBO0FBQ0EsVUFBSVAsSUFBSixHQUFXUSxjQUFYLENBQTBCLElBQTFCLEVBQWdDO0FBQUVDLFFBQUFBLFFBQVEsRUFBRWxELEdBQUcsQ0FBQ2dEO0FBQWhCLE9BQWhDO0FBQ0QsS0FKRCxDQUlFLGdCQUFNO0FBQ043QyxNQUFBQSxNQUFNLENBQUNHLElBQVAsQ0FDRSxJQUFJUixLQUFKLFdBQ0t1QixNQURMLGdFQUNpRXJCLEdBQUcsQ0FBQ2dELFFBRHJFLEVBREY7QUFLRDtBQUNGOztBQUVELE1BQUk3QyxNQUFNLENBQUNnQixNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLFVBQU1oQyxhQUFhLENBQUNnQixNQUFELENBQW5CO0FBQ0Q7QUFDRixDQXBIRDs7QUFzSEFnRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJoQixRQUFqQjtBQUNBZSxNQUFNLENBQUNDLE9BQVAsQ0FBZTdCLHVCQUFmLEdBQXlDQSx1QkFBekMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCB7IGpvaW4gfSA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IGNvbWJpbmVFcnJvcnMgPSByZXF1aXJlKCdjb21iaW5lLWVycm9ycycpO1xuY29uc3QgY3JvbiA9IHJlcXVpcmUoJ2Nyb24tdmFsaWRhdGUnKTtcbmNvbnN0IGlzU0FOQiA9IHJlcXVpcmUoJ2lzLXN0cmluZy1hbmQtbm90LWJsYW5rJyk7XG5jb25zdCBpc1ZhbGlkUGF0aCA9IHJlcXVpcmUoJ2lzLXZhbGlkLXBhdGgnKTtcbmNvbnN0IHRocmVhZHMgPSByZXF1aXJlKCdidGhyZWFkcycpO1xuXG5jb25zdCB7IGdldE5hbWUsIGlzU2NoZWR1bGUsIHBhcnNlVmFsdWUgfSA9IHJlcXVpcmUoJy4vam9iLXV0aWxzJyk7XG5cbmNvbnN0IHZhbGlkYXRlUmVzZXJ2ZWRKb2JOYW1lID0gKG5hbWUpID0+IHtcbiAgLy8gRG9uJ3QgYWxsb3cgYSBqb2IgdG8gaGF2ZSB0aGUgYGluZGV4YCBmaWxlIG5hbWVcbiAgaWYgKFsnaW5kZXgnLCAnaW5kZXguanMnLCAnaW5kZXgubWpzJ10uaW5jbHVkZXMobmFtZSkpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgICAgJ1lvdSBjYW5ub3QgdXNlIHRoZSByZXNlcnZlZCBqb2IgbmFtZSBvZiBcImluZGV4XCIsIFwiaW5kZXguanNcIiwgbm9yIFwiaW5kZXgubWpzXCInXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgdmFsaWRhdGVTdHJpbmdKb2IgPSAoam9iLCBpLCBjb25maWcpID0+IHtcbiAgY29uc3QgZXJyb3JzID0gW107XG5cbiAgY29uc3Qgam9iTmFtZUVycm9yID0gdmFsaWRhdGVSZXNlcnZlZEpvYk5hbWUoam9iKTtcbiAgaWYgKGpvYk5hbWVFcnJvcikge1xuICAgIHRocm93IGpvYk5hbWVFcnJvcjtcbiAgfVxuXG4gIGlmICghY29uZmlnLnJvb3QpIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgYEpvYiAjJHtcbiAgICAgICAgICBpICsgMVxuICAgICAgICB9IFwiJHtqb2J9XCIgcmVxdWlyZXMgcm9vdCBkaXJlY3Rvcnkgb3B0aW9uIHRvIGF1dG8tcG9wdWxhdGUgcGF0aGBcbiAgICAgIClcbiAgICApO1xuICAgIHRocm93IGNvbWJpbmVFcnJvcnMoZXJyb3JzKTtcbiAgfVxuXG4gIGNvbnN0IHBhdGggPSBqb2luKFxuICAgIGNvbmZpZy5yb290LFxuICAgIGNvbmZpZy5hY2NlcHRlZEV4dGVuc2lvbnMuc29tZSgoZXh0KSA9PiBqb2IuZW5kc1dpdGgoZXh0KSlcbiAgICAgID8gam9iXG4gICAgICA6IGAke2pvYn0uJHtjb25maWcuZGVmYXVsdEV4dGVuc2lvbn1gXG4gICk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCF0aHJlYWRzLmJyb3dzZXIpIHtcbiAgICBjb25zdCBzdGF0cyA9IGZzLnN0YXRTeW5jKHBhdGgpO1xuICAgIGlmICghc3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSm9iICMke2kgKyAxfSBcIiR7am9ifVwiIHBhdGggbWlzc2luZzogJHtwYXRofWApO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdmFsaWRhdGVGdW5jdGlvbkpvYiA9IChqb2IsIGkpID0+IHtcbiAgY29uc3QgZXJyb3JzID0gW107XG5cbiAgY29uc3QgcGF0aCA9IGAoJHtqb2IudG9TdHJpbmcoKX0pKClgO1xuICAvLyBDYW4ndCBiZSBhIGJ1aWx0LWluIG9yIGJvdW5kIGZ1bmN0aW9uXG4gIGlmIChwYXRoLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgIG5ldyBFcnJvcihgSm9iICMke2kgKyAxfSBjYW4ndCBiZSBhIGJvdW5kIG9yIGJ1aWx0LWluIGZ1bmN0aW9uYClcbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgY29tYmluZUVycm9ycyhlcnJvcnMpO1xuICB9XG59O1xuXG5jb25zdCB2YWxpZGF0ZUpvYlBhdGggPSAoam9iLCBwcmVmaXgsIGNvbmZpZykgPT4ge1xuICBjb25zdCBlcnJvcnMgPSBbXTtcblxuICBpZiAodHlwZW9mIGpvYi5wYXRoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgcGF0aCA9IGAoJHtqb2IucGF0aC50b1N0cmluZygpfSkoKWA7XG5cbiAgICAvLyBDYW4ndCBiZSBhIGJ1aWx0LWluIG9yIGJvdW5kIGZ1bmN0aW9uXG4gICAgaWYgKHBhdGguaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuICAgICAgZXJyb3JzLnB1c2gobmV3IEVycm9yKGAke3ByZWZpeH0gY2FuJ3QgYmUgYSBib3VuZCBvciBidWlsdC1pbiBmdW5jdGlvbmApKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIWlzU0FOQihqb2IucGF0aCkgJiYgIWNvbmZpZy5yb290KSB7XG4gICAgZXJyb3JzLnB1c2goXG4gICAgICBuZXcgRXJyb3IoXG4gICAgICAgIGAke3ByZWZpeH0gcmVxdWlyZXMgcm9vdCBkaXJlY3Rvcnkgb3B0aW9uIHRvIGF1dG8tcG9wdWxhdGUgcGF0aGBcbiAgICAgIClcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIFZhbGlkYXRlIHBhdGhcbiAgICBjb25zdCBwYXRoID0gaXNTQU5CKGpvYi5wYXRoKVxuICAgICAgPyBqb2IucGF0aFxuICAgICAgOiBqb2luKFxuICAgICAgICAgIGNvbmZpZy5yb290LFxuICAgICAgICAgIGNvbmZpZy5hY2NlcHRlZEV4dGVuc2lvbnMuc29tZSgoZXh0KSA9PiBqb2IubmFtZS5lbmRzV2l0aChleHQpKVxuICAgICAgICAgICAgPyBqb2IubmFtZVxuICAgICAgICAgICAgOiBgJHtqb2IubmFtZX0uJHtjb25maWcuZGVmYXVsdEV4dGVuc2lvbn1gXG4gICAgICAgICk7XG4gICAgaWYgKGlzVmFsaWRQYXRoKHBhdGgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBpZiAoIXRocmVhZHMuYnJvd3Nlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmMocGF0aCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxuICAgICAgICAgIGlmICghc3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtwcmVmaXh9IHBhdGggbWlzc2luZzogJHtwYXRofWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIGVycm9ycy5wdXNoKGVycik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVycm9ycztcbn07XG5cbmNvbnN0IGNyb25WYWxpZGF0ZVdpdGhTZWNvbmRzID0gKGpvYiwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IHByZXNldCA9XG4gICAgam9iLmNyb25WYWxpZGF0ZSAmJiBqb2IuY3JvblZhbGlkYXRlLnByZXNldFxuICAgICAgPyBqb2IuY3JvblZhbGlkYXRlLnByZXNldFxuICAgICAgOiBjb25maWcuY3JvblZhbGlkYXRlICYmIGNvbmZpZy5jcm9uVmFsaWRhdGUucHJlc2V0XG4gICAgICA/IGNvbmZpZy5jcm9uVmFsaWRhdGUucHJlc2V0XG4gICAgICA6ICdkZWZhdWx0JztcbiAgY29uc3Qgb3ZlcnJpZGUgPSB7XG4gICAgLi4uKGNvbmZpZy5jcm9uVmFsaWRhdGUgJiYgY29uZmlnLmNyb25WYWxpZGF0ZS5vdmVycmlkZVxuICAgICAgPyBjb25maWcuY3JvblZhbGlkYXRlLm92ZXJyaWRlXG4gICAgICA6IHt9KSxcbiAgICAuLi4oam9iLmNyb25WYWxpZGF0ZSAmJiBqb2IuY3JvblZhbGlkYXRlLm92ZXJyaWRlXG4gICAgICA/IGpvYi5jcm9uVmFsaWRhdGUub3ZlcnJpZGVcbiAgICAgIDoge30pLFxuICAgIHVzZVNlY29uZHM6IHRydWVcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC4uLmNvbmZpZy5jcm9uVmFsaWRhdGUsXG4gICAgLi4uam9iLmNyb25WYWxpZGF0ZSxcbiAgICBwcmVzZXQsXG4gICAgb3ZlcnJpZGVcbiAgfTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlQ3JvbiA9IChqb2IsIHByZWZpeCwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IGVycm9ycyA9IFtdO1xuXG4gIGlmICghaXNTY2hlZHVsZShqb2IuY3JvbikpIHtcbiAgICAvLyBJZiBgaGFzU2Vjb25kc2Agd2FzIGB0cnVlYCB0aGVuIHNldCBgY3JvblZhbGlkYXRlYCBhbmQgaW5oZXJpdCBhbnkgZXhpc3Rpbmcgb3B0aW9uc1xuICAgIGNvbnN0IGNyb25WYWxpZGF0ZSA9IGpvYi5oYXNTZWNvbmRzXG4gICAgICA/IGNyb25WYWxpZGF0ZVdpdGhTZWNvbmRzKGpvYiwgY29uZmlnKVxuICAgICAgOiBjb25maWcuY3JvblZhbGlkYXRlO1xuXG4gICAgLy9cbiAgICAvLyB2YWxpZGF0ZSBjcm9uIHBhdHRlcm5cbiAgICAvLyAobXVzdCBzdXBwb3J0IHBhdHRlcm5zIHN1Y2ggYXMgYCogKiBMICogKmAgYW5kIGAwIDAvNSAxNCAqICogP2AgKGFuZCBhbGlhc2VzIHRvbylcbiAgICAvL1xuICAgIC8vICA8aHR0cHM6Ly9naXRodWIuY29tL0FpcmZvb294L2Nyb24tdmFsaWRhdGUvaXNzdWVzLzY3PlxuICAgIC8vXG4gICAgY29uc3QgcmVzdWx0ID0gY3Jvbihqb2IuY3JvbiwgY3JvblZhbGlkYXRlKTtcblxuICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgLy8gTk9URTogaXQgaXMgYWx3YXlzIHZhbGlkXG4gICAgICAvLyBjb25zdCBzY2hlZHVsZSA9IGxhdGVyLnNjaGVkdWxlKFxuICAgICAgLy8gICBsYXRlci5wYXJzZS5jcm9uKFxuICAgICAgLy8gICAgIGpvYi5jcm9uLFxuICAgICAgLy8gICAgIGJvb2xlYW4oXG4gICAgICAvLyAgICAgICB0eXBlb2Ygam9iLmhhc1NlY29uZHMgPT09ICd1bmRlZmluZWQnXG4gICAgICAvLyAgICAgICAgID8gY29uZmlnLmhhc1NlY29uZHNcbiAgICAgIC8vICAgICAgICAgOiBqb2IuaGFzU2Vjb25kc1xuICAgICAgLy8gICAgIClcbiAgICAgIC8vICAgKVxuICAgICAgLy8gKTtcbiAgICAgIC8vIGlmIChzY2hlZHVsZS5pc1ZhbGlkKCkpIHtcbiAgICAgIC8vICAgam9iLmludGVydmFsID0gc2NoZWR1bGU7XG4gICAgICAvLyB9IC8vIGVsc2Uge1xuICAgICAgLy8gICBlcnJvcnMucHVzaChcbiAgICAgIC8vICAgICBuZXcgRXJyb3IoXG4gICAgICAvLyAgICAgICBgJHtwcmVmaXh9IGhhZCBhbiBpbnZhbGlkIGNyb24gc2NoZWR1bGUgKHNlZSA8aHR0cHM6Ly9jcm9udGFiLmd1cnU+IGlmIHlvdSBuZWVkIGhlbHApYFxuICAgICAgLy8gICAgIClcbiAgICAgIC8vICAgKTtcbiAgICAgIC8vIH1cblxuICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIHJlc3VsdC5nZXRFcnJvcigpKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKFxuICAgICAgICAgIG5ldyBFcnJvcihgJHtwcmVmaXh9IGhhZCBhbiBpbnZhbGlkIGNyb24gcGF0dGVybjogJHttZXNzYWdlfWApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVycm9ycztcbn07XG5cbmNvbnN0IHZhbGlkYXRlSm9iTmFtZSA9IChqb2IsIGksIHJlc2VydmVkTmFtZXMpID0+IHtcbiAgY29uc3QgZXJyb3JzID0gW107XG4gIGNvbnN0IG5hbWUgPSBnZXROYW1lKGpvYik7XG5cbiAgaWYgKCFuYW1lKSB7XG4gICAgZXJyb3JzLnB1c2gobmV3IEVycm9yKGBKb2IgIyR7aSArIDF9IGlzIG1pc3NpbmcgYSBuYW1lYCkpO1xuICB9XG5cbiAgLy8gVGhyb3cgYW4gZXJyb3IgaWYgZHVwbGljYXRlIGpvYiBuYW1lc1xuICBpZiAocmVzZXJ2ZWROYW1lcy5pbmNsdWRlcyhuYW1lKSkge1xuICAgIGVycm9ycy5wdXNoKFxuICAgICAgbmV3IEVycm9yKGBKb2IgIyR7aSArIDF9IGhhcyBhIGR1cGxpY2F0ZSBqb2IgbmFtZSBvZiAke2dldE5hbWUoam9iKX1gKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZXJyb3JzO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmNvbnN0IHZhbGlkYXRlID0gKGpvYiwgaSwgbmFtZXMsIGNvbmZpZykgPT4ge1xuICBjb25zdCBlcnJvcnMgPSB2YWxpZGF0ZUpvYk5hbWUoam9iLCBpLCBuYW1lcyk7XG5cbiAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgY29tYmluZUVycm9ycyhlcnJvcnMpO1xuICB9XG5cbiAgLy8gU3VwcG9ydCBhIHNpbXBsZSBzdHJpbmcgd2hpY2ggd2Ugd2lsbCB0cmFuc2Zvcm0gdG8gaGF2ZSBhIHBhdGhcbiAgaWYgKGlzU0FOQihqb2IpKSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlU3RyaW5nSm9iKGpvYiwgaSwgY29uZmlnKTtcbiAgfVxuXG4gIC8vIEpvYiBpcyBhIGZ1bmN0aW9uXG4gIGlmICh0eXBlb2Ygam9iID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlRnVuY3Rpb25Kb2Ioam9iLCBpKTtcbiAgfVxuXG4gIC8vIFVzZSBhIHByZWZpeCBmb3IgZXJyb3JzXG4gIGNvbnN0IHByZWZpeCA9IGBKb2IgIyR7aSArIDF9IG5hbWVkIFwiJHtqb2IubmFtZX1cImA7XG5cbiAgZXJyb3JzLnB1c2goLi4udmFsaWRhdGVKb2JQYXRoKGpvYiwgcHJlZml4LCBjb25maWcpKTtcblxuICAvLyBEb24ndCBhbGxvdyB1c2VycyB0byBtaXggaW50ZXJ2YWwgQU5EIGNyb25cbiAgaWYgKHR5cGVvZiBqb2IuaW50ZXJ2YWwgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBqb2IuY3JvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgIG5ldyBFcnJvcihgJHtwcmVmaXh9IGNhbm5vdCBoYXZlIGJvdGggaW50ZXJ2YWwgYW5kIGNyb24gY29uZmlndXJhdGlvbmApXG4gICAgKTtcbiAgfVxuXG4gIC8vIERvbid0IGFsbG93IHVzZXJzIHRvIG1peCB0aW1lb3V0IEFORCBkYXRlXG4gIGlmICh0eXBlb2Ygam9iLnRpbWVvdXQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBqb2IuZGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlcnJvcnMucHVzaChuZXcgRXJyb3IoYCR7cHJlZml4fSBjYW5ub3QgaGF2ZSBib3RoIHRpbWVvdXQgYW5kIGRhdGVgKSk7XG4gIH1cblxuICBjb25zdCBqb2JOYW1lRXJyb3IgPSB2YWxpZGF0ZVJlc2VydmVkSm9iTmFtZShqb2IubmFtZSk7XG4gIGlmIChqb2JOYW1lRXJyb3IpIHtcbiAgICBlcnJvcnMucHVzaChqb2JOYW1lRXJyb3IpO1xuICB9XG5cbiAgLy8gVmFsaWRhdGUgZGF0ZVxuICBpZiAodHlwZW9mIGpvYi5kYXRlICE9PSAndW5kZWZpbmVkJyAmJiAhKGpvYi5kYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICBlcnJvcnMucHVzaChuZXcgRXJyb3IoYCR7cHJlZml4fSBoYWQgYW4gaW52YWxpZCBEYXRlIG9mICR7am9iLmRhdGV9YCkpO1xuICB9XG5cbiAgWyd0aW1lb3V0JywgJ2ludGVydmFsJ10uZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygam9iW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcGFyc2VWYWx1ZShqb2JbcHJvcF0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGVycm9ycy5wdXNoKFxuICAgICAgICAgIGNvbWJpbmVFcnJvcnMoW1xuICAgICAgICAgICAgbmV3IEVycm9yKGAke3ByZWZpeH0gaGFkIGFuIGludmFsaWQgJHtwcm9wfSBvZiAke2pvYi50aW1lb3V0fWApLFxuICAgICAgICAgICAgZXJyXG4gICAgICAgICAgXSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIFZhbGlkYXRlIGhhc1NlY29uZHNcbiAgaWYgKFxuICAgIHR5cGVvZiBqb2IuaGFzU2Vjb25kcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2Ygam9iLmhhc1NlY29uZHMgIT09ICdib29sZWFuJ1xuICApIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgYCR7cHJlZml4fSBoYWQgaGFzU2Vjb25kcyB2YWx1ZSBvZiAke2pvYi5oYXNTZWNvbmRzfSAoaXQgbXVzdCBiZSBhIEJvb2xlYW4pYFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBWYWxpZGF0ZSBjcm9uVmFsaWRhdGVcbiAgaWYgKFxuICAgIHR5cGVvZiBqb2IuY3JvblZhbGlkYXRlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBqb2IuY3JvblZhbGlkYXRlICE9PSAnb2JqZWN0J1xuICApIHtcbiAgICBlcnJvcnMucHVzaChcbiAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgYCR7cHJlZml4fSBoYWQgY3JvblZhbGlkYXRlIHZhbHVlIHNldCwgYnV0IGl0IG11c3QgYmUgYW4gT2JqZWN0YFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBpZiAodHlwZW9mIGpvYi5jcm9uICE9PSAndW5kZWZpbmVkJykge1xuICAgIGVycm9ycy5wdXNoKC4uLnZhbGlkYXRlQ3Jvbihqb2IsIHByZWZpeCwgY29uZmlnKSk7XG4gIH1cblxuICAvLyBWYWxpZGF0ZSBjbG9zZVdvcmtlckFmdGVyTXNcbiAgaWYgKFxuICAgIHR5cGVvZiBqb2IuY2xvc2VXb3JrZXJBZnRlck1zICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICghTnVtYmVyLmlzRmluaXRlKGpvYi5jbG9zZVdvcmtlckFmdGVyTXMpIHx8IGpvYi5jbG9zZVdvcmtlckFmdGVyTXMgPD0gMClcbiAgKSB7XG4gICAgZXJyb3JzLnB1c2goXG4gICAgICBuZXcgRXJyb3IoXG4gICAgICAgIGAke3ByZWZpeH0gaGFkIGFuIGludmFsaWQgY2xvc2VXb3JrZXJzQWZ0ZXJNcyB2YWx1ZSBvZiAke2pvYi5jbG9zZVdvcmtlcnNBZnRlck1zfSAoaXQgbXVzdCBiZSBhIGZpbml0ZSBudW1iZXIgPiAwKWBcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgaWYgKGlzU0FOQihqb2IudGltZXpvbmUpICYmICFbJ2xvY2FsJywgJ3N5c3RlbSddLmluY2x1ZGVzKGpvYi50aW1lem9uZSkpIHtcbiAgICB0cnkge1xuICAgICAgLy8gYC50b0xvY2FsZVN0cmluZygpYCB3aWxsIHRocm93IGEgYFJhbmdlRXJyb3JgIGlmIGB0aW1lWm9uZWAgc3RyaW5nXG4gICAgICAvLyBpcyBib2d1cyBvciBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudC5cbiAgICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ2lhJywgeyB0aW1lWm9uZTogam9iLnRpbWV6b25lIH0pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgZXJyb3JzLnB1c2goXG4gICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICBgJHtwcmVmaXh9IGhhZCBhbiBpbnZhbGlkIG9yIHVuc3VwcG9ydGVkIHRpbWV6b25lIHNwZWNpZmllZDogJHtqb2IudGltZXpvbmV9YFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IGNvbWJpbmVFcnJvcnMoZXJyb3JzKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZGF0ZTtcbm1vZHVsZS5leHBvcnRzLmNyb25WYWxpZGF0ZVdpdGhTZWNvbmRzID0gY3JvblZhbGlkYXRlV2l0aFNlY29uZHM7XG4iXX0=