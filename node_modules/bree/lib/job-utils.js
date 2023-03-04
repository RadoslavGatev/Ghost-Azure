"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ms = require('ms');

var humanInterval = require('human-interval');

var later = require('@breejs/later');

var isSANB = require('is-string-and-not-blank');
/**
 * Naively checks if passed value is of later.js schedule format (https://breejs.github.io/later/schedules.html)
 *
 * @param {*} value to check for schedule format
 * @returns {boolean}
 */


var isSchedule = function isSchedule(value) {
  return (0, _typeof2.default)(value) === 'object' && Array.isArray(value.schedules);
};
/**
 * Extracts job name from job definition
 *
 * @param {string | Object | Function} job definition
 * @returns {string}
 */


var getName = function getName(job) {
  if (isSANB(job)) return job;
  if ((0, _typeof2.default)(job) === 'object' && isSANB(job.name)) return job.name;
  if (typeof job === 'function' && isSANB(job.name)) return job.name;
};
/**
 * Parses provided value into millisecond
 *
 * @param {string} _value
 */


var getHumanToMs = function getHumanToMs(_value) {
  var value = humanInterval(_value);
  if (Number.isNaN(value)) return ms(_value);
  return value;
};
/**
 * Parses schedule value into "later" schedule object or milliseconds
 *
 * @param {boolean | string | number | Object} value
 * @returns {number | boolean | Object}
 */


var parseValue = function parseValue(value) {
  var originalValue = value;
  if (value === false) return value;
  if (isSchedule(value)) return value;

  if (isSANB(value)) {
    var schedule = later.schedule(later.parse.text(value));
    if (schedule.isValid()) return later.parse.text(value);
    value = getHumanToMs(value);

    if (value === 0) {
      // There is a bug in the human-interval library that causes some invalid
      // strings to be parsed as valid, returning 0 as output (instead of NaN).
      // Since the user is using a String to define the interval, it is most
      // likely that he/she is not trying to set it to 0ms.
      // Hence, this must be an error.
      throw new Error("Value \"".concat(originalValue, "\" is not a String parseable by `later.parse.text` (see <https://breejs.github.io/later/parsers.html#text> for examples)"));
    }
  }

  if (!Number.isFinite(value) || value < 0) throw new Error("Value \"".concat(originalValue, "\" must be a finite number >= 0 or a String parseable by `later.parse.text` (see <https://breejs.github.io/later/parsers.html#text> for examples)"));
  return value;
};
/**
 * Processes job objects extracting their names
 * Can conditionaly skip records by their index
 *
 * @param {any[]} jobs
 * @param {number} excludeIndex
 * @returns {string[]} job names
 */


var getJobNames = function getJobNames(jobs, excludeIndex) {
  var names = [];

  var _iterator = _createForOfIteratorHelper(jobs.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
          i = _step$value[0],
          job = _step$value[1];

      if (i === excludeIndex) continue;
      var name = getName(job);
      if (name) names.push(name);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return names;
};

module.exports.isSchedule = isSchedule;
module.exports.getName = getName;
module.exports.getHumanToMs = getHumanToMs;
module.exports.parseValue = parseValue;
module.exports.getJobNames = getJobNames;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2ItdXRpbHMuanMiXSwibmFtZXMiOlsibXMiLCJyZXF1aXJlIiwiaHVtYW5JbnRlcnZhbCIsImxhdGVyIiwiaXNTQU5CIiwiaXNTY2hlZHVsZSIsInZhbHVlIiwiQXJyYXkiLCJpc0FycmF5Iiwic2NoZWR1bGVzIiwiZ2V0TmFtZSIsImpvYiIsIm5hbWUiLCJnZXRIdW1hblRvTXMiLCJfdmFsdWUiLCJOdW1iZXIiLCJpc05hTiIsInBhcnNlVmFsdWUiLCJvcmlnaW5hbFZhbHVlIiwic2NoZWR1bGUiLCJwYXJzZSIsInRleHQiLCJpc1ZhbGlkIiwiRXJyb3IiLCJpc0Zpbml0ZSIsImdldEpvYk5hbWVzIiwiam9icyIsImV4Y2x1ZGVJbmRleCIsIm5hbWVzIiwiZW50cmllcyIsImkiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUNBLElBQU1DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQTdCOztBQUNBLElBQU1FLEtBQUssR0FBR0YsT0FBTyxDQUFDLGVBQUQsQ0FBckI7O0FBQ0EsSUFBTUcsTUFBTSxHQUFHSCxPQUFPLENBQUMseUJBQUQsQ0FBdEI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQU1JLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLEtBQUQsRUFBVztBQUM1QixTQUFPLHNCQUFPQSxLQUFQLE1BQWlCLFFBQWpCLElBQTZCQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsS0FBSyxDQUFDRyxTQUFwQixDQUFwQztBQUNELENBRkQ7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLENBQUNDLEdBQUQsRUFBUztBQUN2QixNQUFJUCxNQUFNLENBQUNPLEdBQUQsQ0FBVixFQUFpQixPQUFPQSxHQUFQO0FB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UCxDQUFlUixXQUFmLEdBQTZCQSxXQUE3QiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1zID0gcmVxdWlyZSgnbXMnKTtcbmNvbnN0IGh1bWFuSW50ZXJ2YWwgPSByZXF1aXJlKCdodW1hbi1pbnRlcnZhbCcpO1xuY29uc3QgbGF0ZXIgPSByZXF1aXJlKCdAYnJlZWpzL2xhdGVyJyk7XG5jb25zdCBpc1NBTkIgPSByZXF1aXJlKCdpcy1zdHJpbmctYW5kLW5vdC1ibGFuaycpO1xuXG4vKipcbiAqIE5haXZlbHkgY2hlY2tzIGlmIHBhc3NlZCB2YWx1ZSBpcyBvZiBsYXRlci5qcyBzY2hlZHVsZSBmb3JtYXQgKGh0dHBzOi8vYnJlZWpzLmdpdGh1Yi5pby9sYXRlci9zY2hlZHVsZXMuaHRtbClcbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIHRvIGNoZWNrIGZvciBzY2hlZHVsZSBmb3JtYXRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1NjaGVkdWxlID0gKHZhbHVlKSA9PiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodmFsdWUuc2NoZWR1bGVzKTtcbn07XG5cbi8qKlxuICogRXh0cmFjdHMgam9iIG5hbWUgZnJvbSBqb2IgZGVmaW5pdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgT2JqZWN0IHwgRnVuY3Rpb259IGpvYiBkZWZpbml0aW9uXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5jb25zdCBnZXROYW1lID0gKGpvYikgPT4ge1xuICBpZiAoaXNTQU5CKGpvYikpIHJldHVybiBqb2I7XG4gIGlmICh0eXBlb2Ygam9iID09PSAnb2JqZWN0JyAmJiBpc1NBTkIoam9iLm5hbWUpKSByZXR1cm4gam9iLm5hbWU7XG4gIGlmICh0eXBlb2Ygam9iID09PSAnZnVuY3Rpb24nICYmIGlzU0FOQihqb2IubmFtZSkpIHJldHVybiBqb2IubmFtZTtcbn07XG5cbi8qKlxuICogUGFyc2VzIHByb3ZpZGVkIHZhbHVlIGludG8gbWlsbGlzZWNvbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gX3ZhbHVlXG4gKi9cbmNvbnN0IGdldEh1bWFuVG9NcyA9IChfdmFsdWUpID0+IHtcbiAgY29uc3QgdmFsdWUgPSBodW1hbkludGVydmFsKF92YWx1ZSk7XG4gIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSByZXR1cm4gbXMoX3ZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBQYXJzZXMgc2NoZWR1bGUgdmFsdWUgaW50byBcImxhdGVyXCIgc2NoZWR1bGUgb2JqZWN0IG9yIG1pbGxpc2Vjb25kc1xuICpcbiAqIEBwYXJhbSB7Ym9vbGVhbiB8IHN0cmluZyB8IG51bWJlciB8IE9iamVjdH0gdmFsdWVcbiAqIEByZXR1cm5zIHtudW1iZXIgfCBib29sZWFuIHwgT2JqZWN0fVxuICovXG5jb25zdCBwYXJzZVZhbHVlID0gKHZhbHVlKSA9PiB7XG4gIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSB2YWx1ZTtcblxuICBpZiAodmFsdWUgPT09IGZhbHNlKSByZXR1cm4gdmFsdWU7XG5cbiAgaWYgKGlzU2NoZWR1bGUodmFsdWUpKSByZXR1cm4gdmFsdWU7XG5cbiAgaWYgKGlzU0FOQih2YWx1ZSkpIHtcbiAgICBjb25zdCBzY2hlZHVsZSA9IGxhdGVyLnNjaGVkdWxlKGxhdGVyLnBhcnNlLnRleHQodmFsdWUpKTtcbiAgICBpZiAoc2NoZWR1bGUuaXNWYWxpZCgpKSByZXR1cm4gbGF0ZXIucGFyc2UudGV4dCh2YWx1ZSk7XG4gICAgdmFsdWUgPSBnZXRIdW1hblRvTXModmFsdWUpO1xuICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgLy8gVGhlcmUgaXMgYSBidWcgaW4gdGhlIGh1bWFuLWludGVydmFsIGxpYnJhcnkgdGhhdCBjYXVzZXMgc29tZSBpbnZhbGlkXG4gICAgICAvLyBzdHJpbmdzIHRvIGJlIHBhcnNlZCBhcyB2YWxpZCwgcmV0dXJuaW5nIDAgYXMgb3V0cHV0IChpbnN0ZWFkIG9mIE5hTikuXG4gICAgICAvLyBTaW5jZSB0aGUgdXNlciBpcyB1c2luZyBhIFN0cmluZyB0byBkZWZpbmUgdGhlIGludGVydmFsLCBpdCBpcyBtb3N0XG4gICAgICAvLyBsaWtlbHkgdGhhdCBoZS9zaGUgaXMgbm90IHRyeWluZyB0byBzZXQgaXQgdG8gMG1zLlxuICAgICAgLy8gSGVuY2UsIHRoaXMgbXVzdCBiZSBhbiBlcnJvci5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFZhbHVlIFwiJHtvcmlnaW5hbFZhbHVlfVwiIGlzIG5vdCBhIFN0cmluZyBwYXJzZWFibGUgYnkgXFxgbGF0ZXIucGFyc2UudGV4dFxcYCAoc2VlIDxodHRwczovL2JyZWVqcy5naXRodWIuaW8vbGF0ZXIvcGFyc2Vycy5odG1sI3RleHQ+IGZvciBleGFtcGxlcylgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSB8fCB2YWx1ZSA8IDApXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFZhbHVlIFwiJHtvcmlnaW5hbFZhbHVlfVwiIG11c3QgYmUgYSBmaW5pdGUgbnVtYmVyID49IDAgb3IgYSBTdHJpbmcgcGFyc2VhYmxlIGJ5IFxcYGxhdGVyLnBhcnNlLnRleHRcXGAgKHNlZSA8aHR0cHM6Ly9icmVlanMuZ2l0aHViLmlvL2xhdGVyL3BhcnNlcnMuaHRtbCN0ZXh0PiBmb3IgZXhhbXBsZXMpYFxuICAgICk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgam9iIG9iamVjdHMgZXh0cmFjdGluZyB0aGVpciBuYW1lc1xuICogQ2FuIGNvbmRpdGlvbmFseSBza2lwIHJlY29yZHMgYnkgdGhlaXIgaW5kZXhcbiAqXG4gKiBAcGFyYW0ge2FueVtdfSBqb2JzXG4gKiBAcGFyYW0ge251bWJlcn0gZXhjbHVkZUluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nW119IGpvYiBuYW1lc1xuICovXG5jb25zdCBnZXRKb2JOYW1lcyA9IChqb2JzLCBleGNsdWRlSW5kZXgpID0+IHtcbiAgY29uc3QgbmFtZXMgPSBbXTtcblxuICBmb3IgKGNvbnN0IFtpLCBqb2JdIG9mIGpvYnMuZW50cmllcygpKSB7XG4gICAgaWYgKGkgPT09IGV4Y2x1ZGVJbmRleCkgY29udGludWU7XG5cbiAgICBjb25zdCBuYW1lID0gZ2V0TmFtZShqb2IpO1xuXG4gICAgaWYgKG5hbWUpIG5hbWVzLnB1c2gobmFtZSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5pc1NjaGVkdWxlID0gaXNTY2hlZHVsZTtcbm1vZHVsZS5leHBvcnRzLmdldE5hbWUgPSBnZXROYW1lO1xubW9kdWxlLmV4cG9ydHMuZ2V0SHVtYW5Ub01zID0gZ2V0SHVtYW5Ub01zO1xubW9kdWxlLmV4cG9ydHMucGFyc2VWYWx1ZSA9IHBhcnNlVmFsdWU7XG5tb2R1bGUuZXhwb3J0cy5nZXRKb2JOYW1lcyA9IGdldEpvYk5hbWVzO1xuIl19