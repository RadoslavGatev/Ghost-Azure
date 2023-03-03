"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('path'),
    join = _require.join;

var isSANB = require('is-string-and-not-blank');

var isValidPath = require('is-valid-path');

var _require2 = require('boolean'),
    boolean = _require2.boolean;

var later = require('@breejs/later');

var _require3 = require('./job-utils'),
    isSchedule = _require3.isSchedule,
    parseValue = _require3.parseValue;

later.date.localTime(); // eslint-disable-next-line complexity

var buildJob = function buildJob(job, config) {
  if (isSANB(job)) {
    var path = join(config.root, config.acceptedExtensions.some(function (ext) {
      return job.endsWith(ext);
    }) ? job : "".concat(job, ".").concat(config.defaultExtension));
    var jobObject = {
      name: job,
      path: path,
      timeout: config.timeout,
      interval: config.interval
    };

    if (isSANB(config.timezone)) {
      jobObject.timezone = config.timezone;
    }

    return jobObject;
  }

  if (typeof job === 'function') {
    var _path = "(".concat(job.toString(), ")()");

    var _jobObject = {
      name: job.name,
      path: _path,
      worker: {
        eval: true
      },
      timeout: config.timeout,
      interval: config.interval
    };

    if (isSANB(config.timezone)) {
      _jobObject.timezone = config.timezone;
    }

    return _jobObject;
  } // Process job.path


  if (typeof job.path === 'function') {
    var _path2 = "(".concat(job.path.toString(), ")()");

    job.path = _path2;
    job.worker = _objectSpread({
      eval: true
    }, job.worker);
  } else {
    var _path3 = isSANB(job.path) ? job.path : join(config.root, config.acceptedExtensions.some(function (ext) {
      return job.name.endsWith(ext);
    }) ? job.name : "".concat(job.name, ".").concat(config.defaultExtension));

    if (isValidPath(_path3)) {
      job.path = _path3;
    } else {
      // Assume that it's a transformed eval string
      job.worker = _objectSpread({
        eval: true
      }, job.worker);
    }
  }

  if (typeof job.timeout !== 'undefined') {
    job.timeout = parseValue(job.timeout);
  }

  if (typeof job.interval !== 'undefined') {
    job.interval = parseValue(job.interval);
  } // Build cron


  if (typeof job.cron !== 'undefined') {
    if (isSchedule(job.cron)) {
      job.interval = job.cron; // Delete job.cron;
    } else {
      job.interval = later.parse.cron(job.cron, boolean(typeof job.hasSeconds === 'undefined' ? config.hasSeconds : job.hasSeconds));
    }
  } // If timeout was undefined, cron was undefined,
  // and date was undefined then set the default
  // (as long as the default timeout is >= 0)


  if (Number.isFinite(config.timeout) && config.timeout >= 0 && typeof job.timeout === 'undefined' && typeof job.cron === 'undefined' && typeof job.date === 'undefined' && typeof job.interval === 'undefined') {
    job.timeout = config.timeout;
  } // If interval was undefined, cron was undefined,
  // and date was undefined then set the default
  // (as long as the default interval is > 0, or it was a schedule, or it was valid)


  if ((Number.isFinite(config.interval) && config.interval > 0 || isSchedule(config.interval)) && typeof job.interval === 'undefined' && typeof job.cron === 'undefined' && typeof job.date === 'undefined') {
    job.interval = config.interval;
  }

  if (isSANB(config.timezone) && !job.timezone) {
    job.timezone = config.timezone;
  }

  return job;
};

module.exports = buildJob;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2ItYnVpbGRlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiam9pbiIsImlzU0FOQiIsImlzVmFsaWRQYXRoIiwiYm9vbGVhbiIsImxhdGVyIiwiaXNTY2hlZHVsZSIsInBhcnNlVmFsdWUiLCJkYXRlIiwibG9jYWxUaW1lIiwiYnVpbGRKb2IiLCJqb2IiLCJjb25maWciLCJwYXRoIiwicm9vdCIsImFjY2VwdGVkRXh0ZW5zaW9ucyIsInNvbWUiLCJleHQiLCJlbmRzV2l0aCIsImRlZmF1bHRFeHRlbnNpb24iLCJqb2JPYmplY3QiLCJuYW1lIiwidGltZW91dCIsImludGVydmFsIiwidGltZXpvbmUiLCJ0b1N0cmluZyIsIndvcmtlciIsImV2YWwiLCJjcm9uIiwicGFyc2UiLCJoYXNTZWNvbmRzIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2VBQWlCQSxPQUFPLENBQUMsTUFBRCxDO0lBQWhCQyxJLFlBQUFBLEk7O0FBQ1IsSUFBTUMsTUFBTSxHQUFHRixPQUFPLENBQUMseUJBQUQsQ0FBdEI7O0FBQ0EsSUFBTUcsV0FBVyxHQUFHSCxPQUFPLENBQUMsZUFBRCxDQUEzQjs7Z0JBQ29CQSxPQUFPLENBQUMsU0FBRCxDO0lBQW5CSSxPLGFBQUFBLE87O0FBQ1IsSUFBTUMsS0FBSyxHQUFHTCxPQUFPLENBQUMsZUFBRCxDQUFyQjs7Z0JBQ21DQSxPQUFPLENBQUMsYUFBRCxDO0lBQWxDTSxVLGFBQUFBLFU7SUFBWUMsVSxhQUFBQSxVOztBQUVwQkYsS0FBSyxDQUFDRyxJQUFOLENBQVdDLFNBQVgsRyxDQUVBOztBQUNBLElBQU1DLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUNoQyxNQUFJVixNQUFNLENBQUNTLEdBQUQsQ0FBVixFQUFpQjtBQUNmLFFBQU1FLElBQUksR0FBR1osSUFBSSxDQUNmVyxNQUFNLENBQUNFLElBRFEs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QU0sQ0FBQ0MsUUFBUCxDQUFnQnBCLE1BQU0sQ0FBQ1csUUFBdkIsS0FBb0NYLE1BQU0sQ0FBQ1csUUFBUCxHQUFrQixDQUF2RCxJQUNDakIsVUFBVSxDQUFDTSxNQUFNLENBQUNXLFFBQVIsQ0FEWixLQUVBLE9BQU9aLEdBQUcsQ0FBQ1ksUUFBWCxLQUF3QixXQUZ4QixJQUdBLE9BQU9aLEdBQUcsQ0FBQ2lCLElBQVgsS0FBb0IsV0FIcEIsSUFJQSxPQUFPakIsR0FBRyxDQUFDSCxJQUFYLEtBQW9CLFdBTHRCLEVBTUU7QUFDQUcsSUFBQUEsR0FBRyxDQUFDWSxRQUFKLEdBQWVYLE1BQU0sQ0FBQ1csUUFBdEI7QUFDRDs7QUFFRCxNQUFJckIsTUFBTSxDQUFDVSxNQUFNLENBQUNZLFFBQVIsQ0FBTixJQUEyQixDQUFDYixHQUFHLENBQUNhLFFBQXBDLEVBQThDO0FBQzVDYixJQUFBQSxHQUFHLENBQUNhLFFBQUosR0FBZVosTUFBTSxDQUFDWSxRQUF0QjtBQUNEOztBQUVELFNBQU9iLEdBQVA7QUFDRCxDQTlIRDs7QUFnSUFzQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ4QixRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgam9pbiB9ID0gcmVxdWlyZSgncGF0aCcpO1xuY29uc3QgaXNTQU5CID0gcmVxdWlyZSgnaXMtc3RyaW5nLWFuZC1ub3QtYmxhbmsnKTtcbmNvbnN0IGlzVmFsaWRQYXRoID0gcmVxdWlyZSgnaXMtdmFsaWQtcGF0aCcpO1xuY29uc3QgeyBib29sZWFuIH0gPSByZXF1aXJlKCdib29sZWFuJyk7XG5jb25zdCBsYXRlciA9IHJlcXVpcmUoJ0BicmVlanMvbGF0ZXInKTtcbmNvbnN0IHsgaXNTY2hlZHVsZSwgcGFyc2VWYWx1ZSB9ID0gcmVxdWlyZSgnLi9qb2ItdXRpbHMnKTtcblxubGF0ZXIuZGF0ZS5sb2NhbFRpbWUoKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmNvbnN0IGJ1aWxkSm9iID0gKGpvYiwgY29uZmlnKSA9PiB7XG4gIGlmIChpc1NBTkIoam9iKSkge1xuICAgIGNvbnN0IHBhdGggPSBqb2luKFxuICAgICAgY29uZmlnLnJvb3QsXG4gICAgICBjb25maWcuYWNjZXB0ZWRFeHRlbnNpb25zLnNvbWUoKGV4dCkgPT4gam9iLmVuZHNXaXRoKGV4dCkpXG4gICAgICAgID8gam9iXG4gICAgICAgIDogYCR7am9ifS4ke2NvbmZpZy5kZWZhdWx0RXh0ZW5zaW9ufWBcbiAgICApO1xuXG4gICAgY29uc3Qgam9iT2JqZWN0ID0ge1xuICAgICAgbmFtZTogam9iLFxuICAgICAgcGF0aCxcbiAgICAgIHRpbWVvdXQ6IGNvbmZpZy50aW1lb3V0LFxuICAgICAgaW50ZXJ2YWw6IGNvbmZpZy5pbnRlcnZhbFxuICAgIH07XG4gICAgaWYgKGlzU0FOQihjb25maWcudGltZXpvbmUpKSB7XG4gICAgICBqb2JPYmplY3QudGltZXpvbmUgPSBjb25maWcudGltZXpvbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvYk9iamVjdDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygam9iID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgcGF0aCA9IGAoJHtqb2IudG9TdHJpbmcoKX0pKClgO1xuXG4gICAgY29uc3Qgam9iT2JqZWN0ID0ge1xuICAgICAgbmFtZTogam9iLm5hbWUsXG4gICAgICBwYXRoLFxuICAgICAgd29ya2VyOiB7IGV2YWw6IHRydWUgfSxcbiAgICAgIHRpbWVvdXQ6IGNvbmZpZy50aW1lb3V0LFxuICAgICAgaW50ZXJ2YWw6IGNvbmZpZy5pbnRlcnZhbFxuICAgIH07XG4gICAgaWYgKGlzU0FOQihjb25maWcudGltZXpvbmUpKSB7XG4gICAgICBqb2JPYmplY3QudGltZXpvbmUgPSBjb25maWcudGltZXpvbmU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvYk9iamVjdDtcbiAgfVxuXG4gIC8vIFByb2Nlc3Mgam9iLnBhdGhcbiAgaWYgKHR5cGVvZiBqb2IucGF0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHBhdGggPSBgKCR7am9iLnBhdGgudG9TdHJpbmcoKX0pKClgO1xuXG4gICAgam9iLnBhdGggPSBwYXRoO1xuICAgIGpvYi53b3JrZXIgPSB7XG4gICAgICBldmFsOiB0cnVlLFxuICAgICAgLi4uam9iLndvcmtlclxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGF0aCA9IGlzU0FOQihqb2IucGF0aClcbiAgICAgID8gam9iLnBhdGhcbiAgICAgIDogam9pbihcbiAgICAgICAgICBjb25maWcucm9vdCxcbiAgICAgICAgICBjb25maWcuYWNjZXB0ZWRFeHRlbnNpb25zLnNvbWUoKGV4dCkgPT4gam9iLm5hbWUuZW5kc1dpdGgoZXh0KSlcbiAgICAgICAgICAgID8gam9iLm5hbWVcbiAgICAgICAgICAgIDogYCR7am9iLm5hbWV9LiR7Y29uZmlnLmRlZmF1bHRFeHRlbnNpb259YFxuICAgICAgICApO1xuXG4gICAgaWYgKGlzVmFsaWRQYXRoKHBhdGgpKSB7XG4gICAgICBqb2IucGF0aCA9IHBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFzc3VtZSB0aGF0IGl0J3MgYSB0cmFuc2Zvcm1lZCBldmFsIHN0cmluZ1xuICAgICAgam9iLndvcmtlciA9IHtcbiAgICAgICAgZXZhbDogdHJ1ZSxcbiAgICAgICAgLi4uam9iLndvcmtlclxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIGpvYi50aW1lb3V0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGpvYi50aW1lb3V0ID0gcGFyc2VWYWx1ZShqb2IudGltZW91dCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGpvYi5pbnRlcnZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBqb2IuaW50ZXJ2YWwgPSBwYXJzZVZhbHVlKGpvYi5pbnRlcnZhbCk7XG4gIH1cblxuICAvLyBCdWlsZCBjcm9uXG4gIGlmICh0eXBlb2Ygam9iLmNyb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKGlzU2NoZWR1bGUoam9iLmNyb24pKSB7XG4gICAgICBqb2IuaW50ZXJ2YWwgPSBqb2IuY3JvbjtcbiAgICAgIC8vIERlbGV0ZSBqb2IuY3JvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgam9iLmludGVydmFsID0gbGF0ZXIucGFyc2UuY3JvbihcbiAgICAgICAgam9iLmNyb24sXG4gICAgICAgIGJvb2xlYW4oXG4gICAgICAgICAgdHlwZW9mIGpvYi5oYXNTZWNvbmRzID09PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBjb25maWcuaGFzU2Vjb25kc1xuICAgICAgICAgICAgOiBqb2IuaGFzU2Vjb25kc1xuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRpbWVvdXQgd2FzIHVuZGVmaW5lZCwgY3JvbiB3YXMgdW5kZWZpbmVkLFxuICAvLyBhbmQgZGF0ZSB3YXMgdW5kZWZpbmVkIHRoZW4gc2V0IHRoZSBkZWZhdWx0XG4gIC8vIChhcyBsb25nIGFzIHRoZSBkZWZhdWx0IHRpbWVvdXQgaXMgPj0gMClcbiAgaWYgKFxuICAgIE51bWJlci5pc0Zpbml0ZShjb25maWcudGltZW91dCkgJiZcbiAgICBjb25maWcudGltZW91dCA+PSAwICYmXG4gICAgdHlwZW9mIGpvYi50aW1lb3V0ID09PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBqb2IuY3JvbiA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2Ygam9iLmRhdGUgPT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGpvYi5pbnRlcnZhbCA9PT0gJ3VuZGVmaW5lZCdcbiAgKSB7XG4gICAgam9iLnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcbiAgfVxuXG4gIC8vIElmIGludGVydmFsIHdhcyB1bmRlZmluZWQsIGNyb24gd2FzIHVuZGVmaW5lZCxcbiAgLy8gYW5kIGRhdGUgd2FzIHVuZGVmaW5lZCB0aGVuIHNldCB0aGUgZGVmYXVsdFxuICAvLyAoYXMgbG9uZyBhcyB0aGUgZGVmYXVsdCBpbnRlcnZhbCBpcyA+IDAsIG9yIGl0IHdhcyBhIHNjaGVkdWxlLCBvciBpdCB3YXMgdmFsaWQpXG4gIGlmIChcbiAgICAoKE51bWJlci5pc0Zpbml0ZShjb25maWcuaW50ZXJ2YWwpICYmIGNvbmZpZy5pbnRlcnZhbCA+IDApIHx8XG4gICAgICBpc1NjaGVkdWxlKGNvbmZpZy5pbnRlcnZhbCkpICYmXG4gICAgdHlwZW9mIGpvYi5pbnRlcnZhbCA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2Ygam9iLmNyb24gPT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGpvYi5kYXRlID09PSAndW5kZWZpbmVkJ1xuICApIHtcbiAgICBqb2IuaW50ZXJ2YWwgPSBjb25maWcuaW50ZXJ2YWw7XG4gIH1cblxuICBpZiAoaXNTQU5CKGNvbmZpZy50aW1lem9uZSkgJiYgIWpvYi50aW1lem9uZSkge1xuICAgIGpvYi50aW1lem9uZSA9IGNvbmZpZy50aW1lem9uZTtcbiAgfVxuXG4gIHJldHVybiBqb2I7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkSm9iO1xuIl19