"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var EventEmitter = require('events');

var fs = require('fs');

var _require = require('path'),
    resolve = _require.resolve;

var pWaitFor = require('p-wait-for');

var combineErrors = require('combine-errors');

var debug = require('debug')('bree');

var isSANB = require('is-string-and-not-blank');

var isValidPath = require('is-valid-path');

var later = require('@breejs/later');

var threads = require('bthreads');

var _require2 = require('safe-timers'),
    setTimeout = _require2.setTimeout,
    setInterval = _require2.setInterval;

var _require3 = require('./job-utils'),
    isSchedule = _require3.isSchedule,
    getName = _require3.getName,
    getHumanToMs = _require3.getHumanToMs,
    parseValue = _require3.parseValue,
    getJobNames = _require3.getJobNames;

var buildJob = require('./job-builder');

var validateJob = require('./job-validator'); // Bthreads requires us to do this for web workers (see bthreads docs for insight)


threads.Buffer = Buffer; // Instead of `threads.browser` checks below, we previously used this boolean
// const hasFsStatSync = typeof fs === 'object' && typeof fs.statSync === 'function';

var Bree = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2.default)(Bree, _EventEmitter);

  var _super = _createSuper(Bree);

  function Bree(config) {
    var _this;

    (0, _classCallCheck2.default)(this, Bree);
    _this = _super.call(this);
    _this.config = _objectSpread({
      // We recommend using Cabin for logging
      // <https://cabinjs.com>
      logger: console,
      // Set this to `false` to prevent requiring a root directory of jobs
      // (e.g. if your jobs are not all in one directory)
      root: threads.browser
      /* istanbul ignore next */
      ? threads.resolve('jobs') : resolve('jobs'),
      // Default timeout for jobs
      // (set this to `false` if you do not wish for a default timeout to be set)
      timeout: 0,
      // Default interval for jobs
      // (set this to `0` for no interval, and > 0 for a default interval to be set)
      interval: 0,
      // Default timezone for jobs
      // Must be a IANA string (ie. 'America/New_York', 'EST', 'UTC', etc).
      // To use the system specified timezone, set this to 'local' or 'system'.
      timezone: 'local',
      // This is an Array of your job definitions (see README for examples)
      jobs: [],
      // <https://breejs.github.io/later/parsers.html#cron>
      // (can be overridden on a job basis with same prop name)
      hasSeconds: false,
      // <https://github.com/Airfooox/cron-validate>
      cronValidate: {},
      // If you set a value > 0 here, then it will terminate workers after this time (ms)
      closeWorkerAfterMs: 0,
      // Could also be mjs if desired
      // (this is the default extension if you just specify a job's name without ".js" or ".mjs")
      defaultExtension: 'js',
      // an array of accepted extensions
      // NOTE: if you add to this array you must extend `createWorker`
      //        to deal with the conversion to acceptable files for
      //        Node Workers
      acceptedExtensions: ['.js', '.mjs'],
      // Default worker options to pass to ~`new Worker`~ `new threads.Worker`
      // (can be overridden on a per job basis)
      // <https://nodejs.org/api/worker_threads.html#worker_threads_new_worker_filename_options>
      worker: {},
      // Custom handler to execute when error events are emitted by the workers or when they exit
      // with non-zero code
      // pass in a callback function with following signature: `(error, workerMetadata) => { // custom handling here }`
      errorHandler: null,
      // Custom handler executed when a `message` event is received from a worker.
      // A special 'done' even is also broadcasted while leaving worker shutdown logic in place.
      workerMessageHandler: null,
      //
      // if you set this to `true`, then a second arg is passed to log output
      // and it will be an Object with `{ worker: Object }` set, for example:
      // (see the documentation at <https://nodejs.org/api/worker_threads.html> for more insight)
      //
      // logger.info('...', {
      //   worker: {
      //     isMainThread: Boolean
      //     resourceLimits: Object,
      //     threadId: String
      //   }
      // });
      //
      outputWorkerMetadata: false
    }, config); // Validate timezone string
    // `.toLocaleString()` will throw a `RangeError` if `timeZone` string
    // is bogus or not supported by the environment.

    if (isSANB(_this.config.timezone) && !['local', 'system'].includes(_this.config.timezone)) {
      new Date().toLocaleString('ia', {
        timeZone: _this.config.timezone
      });
    } //
    // if `hasSeconds` is `true` then ensure that
    // `cronValidate` object has `override` object with `useSeconds` set to `true`
    // <https://github.com/breejs/bree/issues/7>
    //


    if (_this.config.hasSeconds) {
      _this.config.cronValidate = _objectSpread(_objectSpread({}, _this.config.cronValidate), {}, {
        preset: _this.config.cronValidate && _this.config.cronValidate.preset ? _this.config.cronValidate.preset : 'default',
        override: _objectSpread(_objectSpread({}, _this.config.cronValidate && _this.config.cronValidate.override ? _this.config.cronValidate.override : {}), {}, {
          useSeconds: true
        })
      });
    } // validate acceptedExtensions


    if (!_this.config.acceptedExtensions || !Array.isArray(_this.config.acceptedExtensions)) {
      throw new TypeError('`acceptedExtensions` must be defined and an Array');
    }

    debug('config', _this.config);
    _this.closeWorkerAfterMs = {};
    _this.workers = {};
    _this.timeouts = {};
    _this.intervals = {};
    _this.isSchedule = isSchedule;
    _this.getWorkerMetadata = _this.getWorkerMetadata.bind((0, _assertThisInitialized2.default)(_this));
    _this.run = _this.run.bind((0, _assertThisInitialized2.default)(_this));
    _this.start = _this.start.bind((0, _assertThisInitialized2.default)(_this));
    _this.stop = _this.stop.bind((0, _assertThisInitialized2.default)(_this));
    _this.add = _this.add.bind((0, _assertThisInitialized2.default)(_this));
    _this.remove = _this.remove.bind((0, _assertThisInitialized2.default)(_this));
    _this.removeSafeTimer = _this.removeSafeTimer.bind((0, _assertThisInitialized2.default)(_this));
    _this.validateJob = validateJob;
    _this.getName = getName;
    _this.getHumanToMs = getHumanToMs;
    _this.parseValue = parseValue; // so plugins can extend constructor

    _this.init = _this.init.bind((0, _assertThisInitialized2.default)(_this));

    _this.init();

    debug('this.config.jobs', _this.config.jobs);
    return _this;
  }

  (0, _createClass2.default)(Bree, [{
    key: "init",
    value: function init() {
      // Validate root (sync check)
      if (isSANB(this.config.root)) {
        /* istanbul ignore next */
        if (!threads.browser && isValidPath(this.config.root)) {
          var stats = fs.statSync(this.config.root);

          if (!stats.isDirectory()) {
            throw new Error("Root directory of ".concat(this.config.root, " does not exist"));
          }
        }
      } // Validate timeout


      this.config.timeout = this.parseValue(this.config.timeout);
      debug('timeout', this.config.timeout); // Validate interval

      this.config.interval = this.parseValue(this.config.interval);
      debug('interval', this.config.interval); //
      // if `this.config.jobs` is an empty array
      // then we should try to load `jobs/index.js`
      //

      if (this.config.root && (!Array.isArray(this.config.jobs) || this.config.jobs.length === 0)) {
        try {
          this.config.jobs = threads.require(this.config.root);
        } catch (err) {
          this.config.logger.error(err);
        }
      } //
      // validate jobs
      //


      if (!Array.isArray(this.config.jobs)) {
        throw new TypeError('Jobs must be an Array');
      } // Provide human-friendly errors for complex configurations


      var errors = [];
      /*
      Jobs = [
        'name',
        { name: 'boot' },
        { name: 'timeout', timeout: ms('3s') },
        { name: 'cron', cron: '* * * * *' },
        { name: 'cron with timeout', timeout: '3s', cron: '* * * * *' },
        { name: 'interval', interval: ms('4s') }
        { name: 'interval', path: '/some/path/to/script.js', interval: ms('4s') },
        { name: 'timeout', timeout: 'three minutes' },
        { name: 'interval', interval: 'one minute' },
        { name: 'timeout', timeout: '3s' },
        { name: 'interval', interval: '30d' },
        { name: 'schedule object', interval: { schedules: [] } }
      ]
      */

      for (var i = 0; i < this.config.jobs.length; i++) {
        try {
          var names = getJobNames(this.config.jobs, i);
          validateJob(this.config.jobs[i], i, names, this.config);
          this.config.jobs[i] = buildJob(this.config.jobs[i], this.config);
        } catch (err) {
          errors.push(err);
        }
      } // If there were any errors then throw them


      if (errors.length > 0) {
        throw combineErrors(errors);
      }
    }
  }, {
    key: "getWorkerMetadata",
    value: function getWorkerMetadata(name) {
      var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var job = this.config.jobs.find(function (j) {
        return j.name === name;
      });

      if (!job) {
        throw new Error("Job \"".concat(name, "\" does not exist"));
      }

      if (!this.config.outputWorkerMetadata && !job.outputWorkerMetadata) {
        return meta && (typeof meta.err !== 'undefined' || typeof meta.message !== 'undefined') ? meta : undefined;
      }

      return this.workers[name] ? _objectSpread(_objectSpread({}, meta), {}, {
        worker: {
          isMainThread: this.workers[name].isMainThread,
          resourceLimits: this.workers[name].resourceLimits,
          threadId: this.workers[name].threadId
        }
      }) : meta;
    }
  }, {
    key: "run",
    value: function run(name) {
      var _this2 = this;

      debug('run', name);

      if (name) {
        var job = this.config.jobs.find(function (j) {
          return j.name === name;
        });

        if (!job) {
          throw new Error("Job \"".concat(name, "\" does not exist"));
        }

        if (this.workers[name]) {
          return this.config.logger.warn(new Error("Job \"".concat(name, "\" is already running")), this.getWorkerMetadata(name));
        }

        debug('starting worker', name);

        var object = _objectSpread(_objectSpread(_objectSpread({}, this.config.worker ? this.config.worker : {}), job.worker ? job.worker : {}), {}, {
          workerData: _objectSpread(_objectSpread({
            job: job
          }, this.config.worker && this.config.worker.workerData ? this.config.worker.workerData : {}), job.worker && job.worker.workerData ? job.worker.workerData : {})
        });

        this.workers[name] = this.createWorker(job.path, object);
        this.emit('worker created', name);
        debug('worker started', name);
        var prefix = "Worker for job \"".concat(name, "\"");
        this.workers[name].on('online', function () {
          // If we specified a value for `closeWorkerAfterMs`
          // then we need to terminate it after that execution time
          var closeWorkerAfterMs = Number.isFinite(job.closeWorkerAfterMs) ? job.closeWorkerAfterMs : _this2.config.closeWorkerAfterMs;

          if (Number.isFinite(closeWorkerAfterMs) && closeWorkerAfterMs > 0) {
            debug('worker has close set', name, closeWorkerAfterMs);
            _this2.closeWorkerAfterMs[name] = setTimeout(function () {
              /* istanbul ignore else */
              if (_this2.workers[name]) {
                debug('worker has been terminated', name);

                _this2.workers[name].terminate();
              }
            }, closeWorkerAfterMs);
          }

          _this2.config.logger.info("".concat(prefix, " online"), _this2.getWorkerMetadata(name));
        });
        this.workers[name].on('message', function (message) {
          var metadata = _this2.getWorkerMetadata(name, {
            message: message
          });

          if (_this2.config.workerMessageHandler) {
            _this2.config.workerMessageHandler(_objectSpread({
              name: name
            }, metadata));
          } else if (message === 'done') {
            _this2.config.logger.info("".concat(prefix, " signaled completion"), metadata);
          } else {
            _this2.config.logger.info("".concat(prefix, " sent a message"), metadata);
          }

          if (message === 'done') {
            _this2.workers[name].removeAllListeners('message');

            _this2.workers[name].removeAllListeners('exit');

            _this2.workers[name].terminate();

            delete _this2.workers[name]; // remove closeWorkerAfterMs if exist

            _this2.removeSafeTimer('closeWorkerAfterMs', name);
          }
        }); // NOTE: you cannot catch messageerror since it is a Node internal
        //       (if anyone has any idea how to catch this in tests let us know)

        /* istanbul ignore next */

        this.workers[name].on('messageerror', function (err) {
          if (_this2.config.errorHandler) {
            _this2.config.errorHandler(err, _objectSpread({
              name: name
            }, _this2.getWorkerMetadata(name, {
              err: err
            })));
          } else {
            _this2.config.logger.error("".concat(prefix, " had a message error"), _this2.getWorkerMetadata(name, {
              err: err
            }));
          }
        });
        this.workers[name].on('error', function (err) {
          if (_this2.config.errorHandler) {
            _this2.config.errorHandler(err, _objectSpread({
              name: name
            }, _this2.getWorkerMetadata(name, {
              err: err
            })));
          } else {
            _this2.config.logger.error("".concat(prefix, " had an error"), _this2.getWorkerMetadata(name, {
              err: err
            }));
          }
        });
        this.workers[name].on('exit', function (code) {
          var level = code === 0 ? 'info' : 'error';

          if (level === 'error' && _this2.config.errorHandler) {
            _this2.config.errorHandler(new Error("".concat(prefix, " exited with code ").concat(code)), _objectSpread({
              name: name
            }, _this2.getWorkerMetadata(name)));
          } else {
            _this2.config.logger[level]("".concat(prefix, " exited with code ").concat(code), _this2.getWorkerMetadata(name));
          }

          delete _this2.workers[name]; // remove closeWorkerAfterMs if exist

          _this2.removeSafeTimer('closeWorkerAfterMs', name);

          _this2.emit('worker deleted', name);
        });
        return;
      }

      var _iterator = _createForOfIteratorHelper(this.config.jobs),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _job = _step.value;
          this.run(_job.name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "start",
    value: function start(name) {
      var _this3 = this;

      debug('start', name);

      if (name) {
        var job = this.config.jobs.find(function (j) {
          return j.name === name;
        });

        if (!job) {
          throw new Error("Job ".concat(name, " does not exist"));
        }

        if (this.timeouts[name] || this.intervals[name] || this.workers[name]) {
          return this.config.logger.warn(new Error("Job \"".concat(name, "\" is already started")));
        }

        debug('job', job); // Check for date and if it is in the past then don't run it

        if (job.date instanceof Date) {
          debug('job date', job);

          if (job.date.getTime() < Date.now()) {
            debug('job date was in the past');
            return;
          }

          this.timeouts[name] = setTimeout(function () {
            _this3.run(name);

            if (_this3.isSchedule(job.interval)) {
              debug('job.interval is schedule', job);
              _this3.intervals[name] = later.setInterval(function () {
                return _this3.run(name);
              }, job.interval, job.timezone);
            } else if (Number.isFinite(job.interval) && job.interval > 0) {
              debug('job.interval is finite', job);
              _this3.intervals[name] = setInterval(function () {
                return _this3.run(name);
              }, job.interval);
            } else {
              debug('job.date was scheduled to run only once', job);
            }

            delete _this3.timeouts[name];
          }, job.date.getTime() - Date.now());
          return;
        } // This is only complex because both timeout and interval can be a schedule


        if (this.isSchedule(job.timeout)) {
          debug('job timeout is schedule', job);
          this.timeouts[name] = later.setTimeout(function () {
            _this3.run(name);

            if (_this3.isSchedule(job.interval)) {
              debug('job.interval is schedule', job);
              _this3.intervals[name] = later.setInterval(function () {
                return _this3.run(name);
              }, job.interval, job.timezone);
            } else if (Number.isFinite(job.interval) && job.interval > 0) {
              debug('job.interval is finite', job);
              _this3.intervals[name] = setInterval(function () {
                return _this3.run(name);
              }, job.interval);
            }

            delete _this3.timeouts[name];
          }, job.timeout, job.timezone);
          return;
        }

        if (Number.isFinite(job.timeout)) {
          debug('job timeout is finite', job);
          this.timeouts[name] = setTimeout(function () {
            _this3.run(name);

            if (_this3.isSchedule(job.interval)) {
              debug('job.interval is schedule', job);
              _this3.intervals[name] = later.setInterval(function () {
                return _this3.run(name);
              }, job.interval, job.timezone);
            } else if (Number.isFinite(job.interval) && job.interval > 0) {
              debug('job.interval is finite', job.interval);
              _this3.intervals[name] = setInterval(function () {
                return _this3.run(name);
              }, job.interval);
            }

            delete _this3.timeouts[name];
          }, job.timeout);
        } else if (this.isSchedule(job.interval)) {
          debug('job.interval is schedule', job);
          this.intervals[name] = later.setInterval(function () {
            return _this3.run(name);
          }, job.interval, job.timezone);
        } else if (Number.isFinite(job.interval) && job.interval > 0) {
          debug('job.interval is finite', job);
          this.intervals[name] = setInterval(function () {
            return _this3.run(name);
          }, job.interval);
        }

        return;
      }

      var _iterator2 = _createForOfIteratorHelper(this.config.jobs),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _job2 = _step2.value;
          this.start(_job2.name);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "stop",
    value: function () {
      var _stop = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(name) {
        var _this4 = this;

        var _iterator3, _step3, job;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!name) {
                  _context.next = 6;
                  break;
                }

                this.removeSafeTimer('timeouts', name);
                this.removeSafeTimer('intervals', name);

                if (this.workers[name]) {
                  this.workers[name].once('message', function (message) {
                    if (message === 'cancelled') {
                      _this4.config.logger.info("Gracefully cancelled worker for job \"".concat(name, "\""), _this4.getWorkerMetadata(name));

                      _this4.workers[name].terminate();
                    }
                  });
                  this.workers[name].postMessage('cancel');
                }

                this.removeSafeTimer('closeWorkerAfterMs', name);
                return _context.abrupt("return", pWaitFor(function () {
                  return _this4.workers[name] === undefined;
                }));

              case 6:
                _iterator3 = _createForOfIteratorHelper(this.config.jobs);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    job = _step3.value;
                    this.stop(job.name);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

                return _context.abrupt("return", pWaitFor(function () {
                  return Object.keys(_this4.workers).length === 0;
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function stop(_x) {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "add",
    value: function add(jobs) {
      var _this$config$jobs;

      //
      // make sure jobs is an array
      //
      if (!Array.isArray(jobs)) {
        jobs = [jobs];
      }

      var errors = [];
      var addedJobs = [];

      var _iterator4 = _createForOfIteratorHelper(jobs.entries()),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _step4$value = (0, _slicedToArray2.default)(_step4.value, 2),
              i = _step4$value[0],
              job_ = _step4$value[1];

          try {
            var names = [].concat((0, _toConsumableArray2.default)(getJobNames(jobs, i)), (0, _toConsumableArray2.default)(getJobNames(this.config.jobs)));
            validateJob(job_, i, names, this.config);
            var job = buildJob(job_, this.config);
            addedJobs.push(job);
          } catch (err) {
            errors.push(err);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      debug('jobs added', this.config.jobs); // If there were any errors then throw them

      if (errors.length > 0) {
        throw combineErrors(errors);
      }

      (_this$config$jobs = this.config.jobs).push.apply(_this$config$jobs, addedJobs);

      return addedJobs;
    }
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(name) {
        var job;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                job = this.config.jobs.find(function (j) {
                  return j.name === name;
                });

                if (job) {
                  _context2.next = 3;
                  break;
                }

                throw new Error("Job \"".concat(name, "\" does not exist"));

              case 3:
                _context2.next = 5;
                return this.stop(name);

              case 5:
                this.config.jobs = this.config.jobs.filter(function (j) {
                  return j.name !== name;
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function remove(_x2) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
    /**
     * A friendly helper to clear safe-timers timeout and interval
     * @param {string} type
     * @param {string} name
     */

  }, {
    key: "removeSafeTimer",
    value: function removeSafeTimer(type, name) {
      if (this[type][name]) {
        if ((0, _typeof2.default)(this[type][name]) === 'object' && typeof this[type][name].clear === 'function') {
          this[type][name].clear();
        }

        delete this[type][name];
      }
    }
  }, {
    key: "createWorker",
    value: function createWorker(filename, options) {
      return new threads.Worker(filename, options);
    }
  }]);
  return Bree;
}(EventEmitter); // Expose bthreads (useful for tests)
// https://github.com/chjj/bthreads#api


Bree.threads = {
  backend: threads.backend,
  browser: threads.browser,
  location: threads.location,
  filename: threads.filename,
  dirname: threads.dirname,
  require: threads.require,
  resolve: threads.resolve,
  exit: threads.exit,
  cores: threads.cores
}; // plugins inspired by Dayjs

Bree.extend = function (plugin, options) {
  if (!plugin.$i) {
    // install plugin only once
    plugin(options, Bree);
    plugin.$i = true;
  }

  return Bree;
};

module.exports = Bree;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiZnMiLCJyZXNvbHZlIiwicFdhaXRGb3IiLCJjb21iaW5lRXJyb3JzIiwiZGVidWciLCJpc1NBTkIiLCJpc1ZhbGlkUGF0aCIsImxhdGVyIiwidGhyZWFkcyIsInNldFRpbWVvdXQiLCJzZXRJbnRlcnZhbCIsImlzU2NoZWR1bGUiLCJnZXROYW1lIiwiZ2V0SHVtYW5Ub01zIiwicGFyc2VWYWx1ZSIsImdldEpvYk5hbWVzIiwiYnVpbGRKb2IiLCJ2YWxpZGF0ZUpvYiIsIkJ1ZmZlciIsIkJyZWUiLCJjb25maWciLCJsb2dnZXIiLCJjb25zb2xlIiwicm9vdCIsImJyb3dzZXIiLCJ0aW1lb3V0IiwiaW50ZXJ2YWwiLCJ0aW1lem9uZSIsImpvYnMiLCJoYXNTZWNvbmRzIiwiY3JvblZhbGlkYXRlIiwiY2xvc2VXb3JrZXJBZnRlck1zIiwiZGVmYXVsdEV4dGVuc2lvbiIsImFjY2VwdGVkRXh0ZW5zaW9ucyIsIndvcmtlciIsImVycm9ySGFuZGxlciIsIndvcmtlck1lc3NhZ2VIYW5kbGVyIiwib3V0cHV0V29ya2VyTWV0YWRhdGEiLCJpbmNsdWRlcyIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyIsInRpbWVab25lIiwicHJlc2V0Iiwib3ZlcnJpZGUiLCJ1c2VTZWNvbmRzIiwiQXJyYXkiLCJpc0FycmF5IiwiVHlwZUVycm9yIiwid29ya2VycyIsInRpbWVvdXRzIiwiaW50ZXJ2YWxzIiwiZ2V0V29ya2VyTWV0YWRhdGEiLCJiaW5kIiwicnVuIiwic3RhcnQiLCJzdG9wIiwiYWRkIiwicmVtb3ZlIiwicmVtb3ZlU2FmZVRpbWVyIiwiaW5pdCIsInN0YXRzIiwic3RhdFN5bmMiLCJpc0RpcmVjdG9yeSIsIkVycm9yIiwibGVuZ3RoIiwiZXJyIiwiZXJyb3IiLCJlcnJvcnMiLCJpIiwibmFtZXMiLCJwdXNoIiwibmFtZSIsIm1ldGEiLCJqb2IiLCJmaW5kIiwiaiIsIm1lc3NhZ2UiLCJ1bmRlZmluZWQiLCJpc01haW5UaHJlYWQiLCJyZXNvdXJjZUxpbWl0cyIsInRocmVhZElkIiwid2FybiIsIm9iamVjdCIsIndvcmtlckRhdGEiLCJjcmVhdGVXb3JrZXIiLCJwYXRoIiwiZW1pdCIsInByZWZpeCIsIm9uIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJ0ZXJtaW5hdGUiLCJpbmZvIiwibWV0YWRhdGEiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJjb2RlIiwibGV2ZWwiLCJkYXRlIiwiZ2V0VGltZSIsIm5vdyIsIm9uY2UiLCJwb3N0TWVzc2FnZSIsIk9iamVjdCIsImtleXMiLCJhZGRlZEpvYnMiLCJlbnRyaWVzIiwiam9iXyIsImZpbHRlciIsInR5cGUiLCJjbGVhciIsImZpbGVuYW1lIiwib3B0aW9ucyIsIldvcmtlciIsImJhY2tlbmQiLCJsb2NhdGlvbiIsImRpcm5hbWUiLCJleGl0IiwiY29yZXMiLCJleHRlbmQiLCJwbHVnaW4iLCIkaSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFlBQVksR0FBR0MsT0FBTyxDQUFDLFFBQUQsQ0FBNUI7O0FBQ0EsSUFBTUMsRUFBRSxHQUFHRCxPQUFPLENBQUMsSUFBRCxDQUFsQjs7ZUFDb0JBLE9BQU8sQ0FBQyxNQUFELEM7SUFBbkJFLE8sWUFBQUEsTzs7QUFDUixJQUFNQyxRQUFRLEdBQUdILE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUNBLElBQU1JLGFBQWEsR0FBR0osT0FBTyxDQUFDLGdCQUFELENBQTdCOztBQUNBLElBQU1LLEtBQUssR0FBR0wsT0FBTyxDQUFDLE9BQUQsQ0FBUCxDQUFpQixNQUFqQixDQUFkOztBQUNBLElBQU1NLE1BQU0sR0FBR04sT0FBTyxDQUFDLHlCQUFELENBQXRCOztBQUNBLElBQU1PLFdBQVcsR0FBR1AsT0FBTyxDQUFDLGVBQUQsQ0FBM0I7O0FBQ0EsSUFBTVEsS0FBSyxHQUFHUixPQUFP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dmxCZ0JqSCxZLEdBMGxCbkI7QUFDQTs7O0FBQ0FxQixJQUFJLENBQUNYLE9BQUwsR0FBZTtBQUNieUcsRUFBQUEsT0FBTyxFQUFFekcsT0FBTyxDQUFDeUcsT0FESjtBQUViekYsRUFBQUEsT0FBTyxFQUFFaEIsT0FBTyxDQUFDZ0IsT0FGSjtBQUdiMEYsRUFBQUEsUUFBUSxFQUFFMUcsT0FBTyxDQUFDMEcsUUFITDtBQUliSixFQUFBQSxRQUFRLEVBQUV0RyxPQUFPLENBQUNzRyxRQUpMO0FBS2JLLEVBQUFBLE9BQU8sRUFBRTNHLE9BQU8sQ0FBQzJHLE9BTEo7QUFNYnBILEVBQUFBLE9BQU8sRUFBRVMsT0FBTyxDQUFDVCxPQU5KO0FBT2JFLEVBQUFBLE9BQU8sRUFBRU8sT0FBTyxDQUFDUCxPQVBKO0FBUWJtSCxFQUFBQSxJQUFJLEVBQUU1RyxPQUFPLENBQUM0RyxJQVJEO0FBU2JDLEVBQUFBLEtBQUssRUFBRTdHLE9BQU8sQ0FBQzZHO0FBVEYsQ0FBZixDLENBWUE7O0FBQ0FsRyxJQUFJLENBQUNtRyxNQUFMLEdBQWMsVUFBQ0MsTUFBRCxFQUFTUixPQUFULEVBQXFCO0FBQ2pDLE1BQUksQ0FBQ1EsTUFBTSxDQUFDQyxFQUFaLEVBQWdCO0FBQ2Q7QUFDQUQsSUFBQUEsTUFBTSxDQUFDUixPQUFELEVBQVU1RixJQUFWLENBQU47QUFDQW9HLElBQUFBLE1BQU0sQ0FBQ0MsRUFBUCxHQUFZLElBQVo7QUFDRDs7QUFFRCxTQUFPckcsSUFBUDtBQUNELENBUkQ7O0FBVUFzRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ2RyxJQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgeyByZXNvbHZlIH0gPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBwV2FpdEZvciA9IHJlcXVpcmUoJ3Atd2FpdC1mb3InKTtcbmNvbnN0IGNvbWJpbmVFcnJvcnMgPSByZXF1aXJlKCdjb21iaW5lLWVycm9ycycpO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdicmVlJyk7XG5jb25zdCBpc1NBTkIgPSByZXF1aXJlKCdpcy1zdHJpbmctYW5kLW5vdC1ibGFuaycpO1xuY29uc3QgaXNWYWxpZFBhdGggPSByZXF1aXJlKCdpcy12YWxpZC1wYXRoJyk7XG5jb25zdCBsYXRlciA9IHJlcXVpcmUoJ0BicmVlanMvbGF0ZXInKTtcbmNvbnN0IHRocmVhZHMgPSByZXF1aXJlKCdidGhyZWFkcycpO1xuY29uc3QgeyBzZXRUaW1lb3V0LCBzZXRJbnRlcnZhbCB9ID0gcmVxdWlyZSgnc2FmZS10aW1lcnMnKTtcblxuY29uc3Qge1xuICBpc1NjaGVkdWxlLFxuICBnZXROYW1lLFxuICBnZXRIdW1hblRvTXMsXG4gIHBhcnNlVmFsdWUsXG4gIGdldEpvYk5hbWVzXG59ID0gcmVxdWlyZSgnLi9qb2ItdXRpbHMnKTtcbmNvbnN0IGJ1aWxkSm9iID0gcmVxdWlyZSgnLi9qb2ItYnVpbGRlcicpO1xuY29uc3QgdmFsaWRhdGVKb2IgPSByZXF1aXJlKCcuL2pvYi12YWxpZGF0b3InKTtcblxuLy8gQnRocmVhZHMgcmVxdWlyZXMgdXMgdG8gZG8gdGhpcyBmb3Igd2ViIHdvcmtlcnMgKHNlZSBidGhyZWFkcyBkb2NzIGZvciBpbnNpZ2h0KVxudGhyZWFkcy5CdWZmZXIgPSBCdWZmZXI7XG5cbi8vIEluc3RlYWQgb2YgYHRocmVhZHMuYnJvd3NlcmAgY2hlY2tzIGJlbG93LCB3ZSBwcmV2aW91c2x5IHVzZWQgdGhpcyBib29sZWFuXG4vLyBjb25zdCBoYXNGc1N0YXRTeW5jID0gdHlwZW9mIGZzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZnMuc3RhdFN5bmMgPT09ICdmdW5jdGlvbic7XG5cbmNsYXNzIEJyZWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgLy8gV2UgcmVjb21tZW5kIHVzaW5nIENhYmluIGZvciBsb2dnaW5nXG4gICAgICAvLyA8aHR0cHM6Ly9jYWJpbmpzLmNvbT5cbiAgICAgIGxvZ2dlcjogY29uc29sZSxcbiAgICAgIC8vIFNldCB0aGlzIHRvIGBmYWxzZWAgdG8gcHJldmVudCByZXF1aXJpbmcgYSByb290IGRpcmVjdG9yeSBvZiBqb2JzXG4gICAgICAvLyAoZS5nLiBpZiB5b3VyIGpvYnMgYXJlIG5vdCBhbGwgaW4gb25lIGRpcmVjdG9yeSlcbiAgICAgIHJvb3Q6IHRocmVhZHMuYnJvd3NlciAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICA/IHRocmVhZHMucmVzb2x2ZSgnam9icycpXG4gICAgICAgIDogcmVzb2x2ZSgnam9icycpLFxuICAgICAgLy8gRGVmYXVsdCB0aW1lb3V0IGZvciBqb2JzXG4gICAgICAvLyAoc2V0IHRoaXMgdG8gYGZhbHNlYCBpZiB5b3UgZG8gbm90IHdpc2ggZm9yIGEgZGVmYXVsdCB0aW1lb3V0IHRvIGJlIHNldClcbiAgICAgIHRpbWVvdXQ6IDAsXG4gICAgICAvLyBEZWZhdWx0IGludGVydmFsIGZvciBqb2JzXG4gICAgICAvLyAoc2V0IHRoaXMgdG8gYDBgIGZvciBubyBpbnRlcnZhbCwgYW5kID4gMCBmb3IgYSBkZWZhdWx0IGludGVydmFsIHRvIGJlIHNldClcbiAgICAgIGludGVydmFsOiAwLFxuICAgICAgLy8gRGVmYXVsdCB0aW1lem9uZSBmb3Igam9ic1xuICAgICAgLy8gTXVzdCBiZSBhIElBTkEgc3RyaW5nIChpZS4gJ0FtZXJpY2EvTmV3X1lvcmsnLCAnRVNUJywgJ1VUQycsIGV0YykuXG4gICAgICAvLyBUbyB1c2UgdGhlIHN5c3RlbSBzcGVjaWZpZWQgdGltZXpvbmUsIHNldCB0aGlzIHRvICdsb2NhbCcgb3IgJ3N5c3RlbScuXG4gICAgICB0aW1lem9uZTogJ2xvY2FsJyxcbiAgICAgIC8vIFRoaXMgaXMgYW4gQXJyYXkgb2YgeW91ciBqb2IgZGVmaW5pdGlvbnMgKHNlZSBSRUFETUUgZm9yIGV4YW1wbGVzKVxuICAgICAgam9iczogW10sXG4gICAgICAvLyA8aHR0cHM6Ly9icmVlanMuZ2l0aHViLmlvL2xhdGVyL3BhcnNlcnMuaHRtbCNjcm9uPlxuICAgICAgLy8gKGNhbiBiZSBvdmVycmlkZGVuIG9uIGEgam9iIGJhc2lzIHdpdGggc2FtZSBwcm9wIG5hbWUpXG4gICAgICBoYXNTZWNvbmRzOiBmYWxzZSxcbiAgICAgIC8vIDxodHRwczovL2dpdGh1Yi5jb20vQWlyZm9vb3gvY3Jvbi12YWxpZGF0ZT5cbiAgICAgIGNyb25WYWxpZGF0ZToge30sXG4gICAgICAvLyBJZiB5b3Ugc2V0IGEgdmFsdWUgPiAwIGhlcmUsIHRoZW4gaXQgd2lsbCB0ZXJtaW5hdGUgd29ya2VycyBhZnRlciB0aGlzIHRpbWUgKG1zKVxuICAgICAgY2xvc2VXb3JrZXJBZnRlck1zOiAwLFxuICAgICAgLy8gQ291bGQgYWxzbyBiZSBtanMgaWYgZGVzaXJlZFxuICAgICAgLy8gKHRoaXMgaXMgdGhlIGRlZmF1bHQgZXh0ZW5zaW9uIGlmIHlvdSBqdXN0IHNwZWNpZnkgYSBqb2IncyBuYW1lIHdpdGhvdXQgXCIuanNcIiBvciBcIi5tanNcIilcbiAgICAgIGRlZmF1bHRFeHRlbnNpb246ICdqcycsXG4gICAgICAvLyBhbiBhcnJheSBvZiBhY2NlcHRlZCBleHRlbnNpb25zXG4gICAgICAvLyBOT1RFOiBpZiB5b3UgYWRkIHRvIHRoaXMgYXJyYXkgeW91IG11c3QgZXh0ZW5kIGBjcmVhdGVXb3JrZXJgXG4gICAgICAvLyAgICAgICAgdG8gZGVhbCB3aXRoIHRoZSBjb252ZXJzaW9uIHRvIGFjY2VwdGFibGUgZmlsZXMgZm9yXG4gICAgICAvLyAgICAgICAgTm9kZSBXb3JrZXJzXG4gICAgICBhY2NlcHRlZEV4dGVuc2lvbnM6IFsnLmpzJywgJy5tanMnXSxcbiAgICAgIC8vIERlZmF1bHQgd29ya2VyIG9wdGlvbnMgdG8gcGFzcyB0byB+YG5ldyBXb3JrZXJgfiBgbmV3IHRocmVhZHMuV29ya2VyYFxuICAgICAgLy8gKGNhbiBiZSBvdmVycmlkZGVuIG9uIGEgcGVyIGpvYiBiYXNpcylcbiAgICAgIC8vIDxodHRwczovL25vZGVqcy5vcmcvYXBpL3dvcmtlcl90aHJlYWRzLmh0bWwjd29ya2VyX3RocmVhZHNfbmV3X3dvcmtlcl9maWxlbmFtZV9vcHRpb25zPlxuICAgICAgd29ya2VyOiB7fSxcbiAgICAgIC8vIEN1c3RvbSBoYW5kbGVyIHRvIGV4ZWN1dGUgd2hlbiBlcnJvciBldmVudHMgYXJlIGVtaXR0ZWQgYnkgdGhlIHdvcmtlcnMgb3Igd2hlbiB0aGV5IGV4aXRcbiAgICAgIC8vIHdpdGggbm9uLXplcm8gY29kZVxuICAgICAgLy8gcGFzcyBpbiBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggZm9sbG93aW5nIHNpZ25hdHVyZTogYChlcnJvciwgd29ya2VyTWV0YWRhdGEpID0+IHsgLy8gY3VzdG9tIGhhbmRsaW5nIGhlcmUgfWBcbiAgICAgIGVycm9ySGFuZGxlcjogbnVsbCxcbiAgICAgIC8vIEN1c3RvbSBoYW5kbGVyIGV4ZWN1dGVkIHdoZW4gYSBgbWVzc2FnZWAgZXZlbnQgaXMgcmVjZWl2ZWQgZnJvbSBhIHdvcmtlci5cbiAgICAgIC8vIEEgc3BlY2lhbCAnZG9uZScgZXZlbiBpcyBhbHNvIGJyb2FkY2FzdGVkIHdoaWxlIGxlYXZpbmcgd29ya2VyIHNodXRkb3duIGxvZ2ljIGluIHBsYWNlLlxuICAgICAgd29ya2VyTWVzc2FnZUhhbmRsZXI6IG51bGwsXG4gICAgICAvL1xuICAgICAgLy8gaWYgeW91IHNldCB0aGlzIHRvIGB0cnVlYCwgdGhlbiBhIHNlY29uZCBhcmcgaXMgcGFzc2VkIHRvIGxvZyBvdXRwdXRcbiAgICAgIC8vIGFuZCBpdCB3aWxsIGJlIGFuIE9iamVjdCB3aXRoIGB7IHdvcmtlcjogT2JqZWN0IH1gIHNldCwgZm9yIGV4YW1wbGU6XG4gICAgICAvLyAoc2VlIHRoZSBkb2N1bWVudGF0aW9uIGF0IDxodHRwczovL25vZGVqcy5vcmcvYXBpL3dvcmtlcl90aHJlYWRzLmh0bWw+IGZvciBtb3JlIGluc2lnaHQpXG4gICAgICAvL1xuICAgICAgLy8gbG9nZ2VyLmluZm8oJy4uLicsIHtcbiAgICAgIC8vICAgd29ya2VyOiB7XG4gICAgICAvLyAgICAgaXNNYWluVGhyZWFkOiBCb29sZWFuXG4gICAgICAvLyAgICAgcmVzb3VyY2VMaW1pdHM6IE9iamVjdCxcbiAgICAgIC8vICAgICB0aHJlYWRJZDogU3RyaW5nXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgLy9cbiAgICAgIG91dHB1dFdvcmtlck1ldGFkYXRhOiBmYWxzZSxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH07XG5cbiAgICAvLyBWYWxpZGF0ZSB0aW1lem9uZSBzdHJpbmdcbiAgICAvLyBgLnRvTG9jYWxlU3RyaW5nKClgIHdpbGwgdGhyb3cgYSBgUmFuZ2VFcnJvcmAgaWYgYHRpbWVab25lYCBzdHJpbmdcbiAgICAvLyBpcyBib2d1cyBvciBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbnZpcm9ubWVudC5cbiAgICBpZiAoXG4gICAgICBpc1NBTkIodGhpcy5jb25maWcudGltZXpvbmUpICYmXG4gICAgICAhWydsb2NhbCcsICdzeXN0ZW0nXS5pbmNsdWRlcyh0aGlzLmNvbmZpZy50aW1lem9uZSlcbiAgICApIHtcbiAgICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ2lhJywgeyB0aW1lWm9uZTogdGhpcy5jb25maWcudGltZXpvbmUgfSk7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBpZiBgaGFzU2Vjb25kc2AgaXMgYHRydWVgIHRoZW4gZW5zdXJlIHRoYXRcbiAgICAvLyBgY3JvblZhbGlkYXRlYCBvYmplY3QgaGFzIGBvdmVycmlkZWAgb2JqZWN0IHdpdGggYHVzZVNlY29uZHNgIHNldCB0byBgdHJ1ZWBcbiAgICAvLyA8aHR0cHM6Ly9naXRodWIuY29tL2JyZWVqcy9icmVlL2lzc3Vlcy83PlxuICAgIC8vXG4gICAgaWYgKHRoaXMuY29uZmlnLmhhc1NlY29uZHMpIHtcbiAgICAgIHRoaXMuY29uZmlnLmNyb25WYWxpZGF0ZSA9IHtcbiAgICAgICAgLi4udGhpcy5jb25maWcuY3JvblZhbGlkYXRlLFxuICAgICAgICBwcmVzZXQ6XG4gICAgICAgICAgdGhpcy5jb25maWcuY3JvblZhbGlkYXRlICYmIHRoaXMuY29uZmlnLmNyb25WYWxpZGF0ZS5wcmVzZXRcbiAgICAgICAgICAgID8gdGhpcy5jb25maWcuY3JvblZhbGlkYXRlLnByZXNldFxuICAgICAgICAgICAgOiAnZGVmYXVsdCcsXG4gICAgICAgIG92ZXJyaWRlOiB7XG4gICAgICAgICAgLi4uKHRoaXMuY29uZmlnLmNyb25WYWxpZGF0ZSAmJiB0aGlzLmNvbmZpZy5jcm9uVmFsaWRhdGUub3ZlcnJpZGVcbiAgICAgICAgICAgID8gdGhpcy5jb25maWcuY3JvblZhbGlkYXRlLm92ZXJyaWRlXG4gICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICB1c2VTZWNvbmRzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdmFsaWRhdGUgYWNjZXB0ZWRFeHRlbnNpb25zXG4gICAgaWYgKFxuICAgICAgIXRoaXMuY29uZmlnLmFjY2VwdGVkRXh0ZW5zaW9ucyB8fFxuICAgICAgIUFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuYWNjZXB0ZWRFeHRlbnNpb25zKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGFjY2VwdGVkRXh0ZW5zaW9uc2AgbXVzdCBiZSBkZWZpbmVkIGFuZCBhbiBBcnJheScpO1xuICAgIH1cblxuICAgIGRlYnVnKCdjb25maWcnLCB0aGlzLmNvbmZpZyk7XG5cbiAgICB0aGlzLmNsb3NlV29ya2VyQWZ0ZXJNcyA9IHt9O1xuICAgIHRoaXMud29ya2VycyA9IHt9O1xuICAgIHRoaXMudGltZW91dHMgPSB7fTtcbiAgICB0aGlzLmludGVydmFscyA9IHt9O1xuXG4gICAgdGhpcy5pc1NjaGVkdWxlID0gaXNTY2hlZHVsZTtcbiAgICB0aGlzLmdldFdvcmtlck1ldGFkYXRhID0gdGhpcy5nZXRXb3JrZXJNZXRhZGF0YS5iaW5kKHRoaXMpO1xuICAgIHRoaXMucnVuID0gdGhpcy5ydW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXJ0ID0gdGhpcy5zdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RvcCA9IHRoaXMuc3RvcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWRkID0gdGhpcy5hZGQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlbW92ZSA9IHRoaXMucmVtb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZW1vdmVTYWZlVGltZXIgPSB0aGlzLnJlbW92ZVNhZmVUaW1lci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy52YWxpZGF0ZUpvYiA9IHZhbGlkYXRlSm9iO1xuICAgIHRoaXMuZ2V0TmFtZSA9IGdldE5hbWU7XG4gICAgdGhpcy5nZXRIdW1hblRvTXMgPSBnZXRIdW1hblRvTXM7XG4gICAgdGhpcy5wYXJzZVZhbHVlID0gcGFyc2VWYWx1ZTtcblxuICAgIC8vIHNvIHBsdWdpbnMgY2FuIGV4dGVuZCBjb25zdHJ1Y3RvclxuICAgIHRoaXMuaW5pdCA9IHRoaXMuaW5pdC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgZGVidWcoJ3RoaXMuY29uZmlnLmpvYnMnLCB0aGlzLmNvbmZpZy5qb2JzKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gVmFsaWRhdGUgcm9vdCAoc3luYyBjaGVjaylcbiAgICBpZiAoaXNTQU5CKHRoaXMuY29uZmlnLnJvb3QpKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKCF0aHJlYWRzLmJyb3dzZXIgJiYgaXNWYWxpZFBhdGgodGhpcy5jb25maWcucm9vdCkpIHtcbiAgICAgICAgY29uc3Qgc3RhdHMgPSBmcy5zdGF0U3luYyh0aGlzLmNvbmZpZy5yb290KTtcbiAgICAgICAgaWYgKCFzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFJvb3QgZGlyZWN0b3J5IG9mICR7dGhpcy5jb25maWcucm9vdH0gZG9lcyBub3QgZXhpc3RgXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZhbGlkYXRlIHRpbWVvdXRcbiAgICB0aGlzLmNvbmZpZy50aW1lb3V0ID0gdGhpcy5wYXJzZVZhbHVlKHRoaXMuY29uZmlnLnRpbWVvdXQpO1xuICAgIGRlYnVnKCd0aW1lb3V0JywgdGhpcy5jb25maWcudGltZW91dCk7XG5cbiAgICAvLyBWYWxpZGF0ZSBpbnRlcnZhbFxuICAgIHRoaXMuY29uZmlnLmludGVydmFsID0gdGhpcy5wYXJzZVZhbHVlKHRoaXMuY29uZmlnLmludGVydmFsKTtcbiAgICBkZWJ1ZygnaW50ZXJ2YWwnLCB0aGlzLmNvbmZpZy5pbnRlcnZhbCk7XG5cbiAgICAvL1xuICAgIC8vIGlmIGB0aGlzLmNvbmZpZy5qb2JzYCBpcyBhbiBlbXB0eSBhcnJheVxuICAgIC8vIHRoZW4gd2Ugc2hvdWxkIHRyeSB0byBsb2FkIGBqb2JzL2luZGV4LmpzYFxuICAgIC8vXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcucm9vdCAmJlxuICAgICAgKCFBcnJheS5pc0FycmF5KHRoaXMuY29uZmlnLmpvYnMpIHx8IHRoaXMuY29uZmlnLmpvYnMubGVuZ3RoID09PSAwKVxuICAgICkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5jb25maWcuam9icyA9IHRocmVhZHMucmVxdWlyZSh0aGlzLmNvbmZpZy5yb290KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLmNvbmZpZy5sb2dnZXIuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIHZhbGlkYXRlIGpvYnNcbiAgICAvL1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmNvbmZpZy5qb2JzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSm9icyBtdXN0IGJlIGFuIEFycmF5Jyk7XG4gICAgfVxuXG4gICAgLy8gUHJvdmlkZSBodW1hbi1mcmllbmRseSBlcnJvcnMgZm9yIGNvbXBsZXggY29uZmlndXJhdGlvbnNcbiAgICBjb25zdCBlcnJvcnMgPSBbXTtcblxuICAgIC8qXG4gICAgSm9icyA9IFtcbiAgICAgICduYW1lJyxcbiAgICAgIHsgbmFtZTogJ2Jvb3QnIH0sXG4gICAgICB7IG5hbWU6ICd0aW1lb3V0JywgdGltZW91dDogbXMoJzNzJykgfSxcbiAgICAgIHsgbmFtZTogJ2Nyb24nLCBjcm9uOiAnKiAqICogKiAqJyB9LFxuICAgICAgeyBuYW1lOiAnY3JvbiB3aXRoIHRpbWVvdXQnLCB0aW1lb3V0OiAnM3MnLCBjcm9uOiAnKiAqICogKiAqJyB9LFxuICAgICAgeyBuYW1lOiAnaW50ZXJ2YWwnLCBpbnRlcnZhbDogbXMoJzRzJykgfVxuICAgICAgeyBuYW1lOiAnaW50ZXJ2YWwnLCBwYXRoOiAnL3NvbWUvcGF0aC90by9zY3JpcHQuanMnLCBpbnRlcnZhbDogbXMoJzRzJykgfSxcbiAgICAgIHsgbmFtZTogJ3RpbWVvdXQnLCB0aW1lb3V0OiAndGhyZWUgbWludXRlcycgfSxcbiAgICAgIHsgbmFtZTogJ2ludGVydmFsJywgaW50ZXJ2YWw6ICdvbmUgbWludXRlJyB9LFxuICAgICAgeyBuYW1lOiAndGltZW91dCcsIHRpbWVvdXQ6ICczcycgfSxcbiAgICAgIHsgbmFtZTogJ2ludGVydmFsJywgaW50ZXJ2YWw6ICczMGQnIH0sXG4gICAgICB7IG5hbWU6ICdzY2hlZHVsZSBvYmplY3QnLCBpbnRlcnZhbDogeyBzY2hlZHVsZXM6IFtdIH0gfVxuICAgIF1cbiAgICAqL1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZy5qb2JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBuYW1lcyA9IGdldEpvYk5hbWVzKHRoaXMuY29uZmlnLmpvYnMsIGkpO1xuXG4gICAgICAgIHZhbGlkYXRlSm9iKHRoaXMuY29uZmlnLmpvYnNbaV0sIGksIG5hbWVzLCB0aGlzLmNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5jb25maWcuam9ic1tpXSA9IGJ1aWxkSm9iKHRoaXMuY29uZmlnLmpvYnNbaV0sIHRoaXMuY29uZmlnKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIHdlcmUgYW55IGVycm9ycyB0aGVuIHRocm93IHRoZW1cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IGNvbWJpbmVFcnJvcnMoZXJyb3JzKTtcbiAgICB9XG4gIH1cblxuICBnZXRXb3JrZXJNZXRhZGF0YShuYW1lLCBtZXRhID0ge30pIHtcbiAgICBjb25zdCBqb2IgPSB0aGlzLmNvbmZpZy5qb2JzLmZpbmQoKGopID0+IGoubmFtZSA9PT0gbmFtZSk7XG4gICAgaWYgKCFqb2IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSm9iIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5vdXRwdXRXb3JrZXJNZXRhZGF0YSAmJiAham9iLm91dHB1dFdvcmtlck1ldGFkYXRhKSB7XG4gICAgICByZXR1cm4gbWV0YSAmJlxuICAgICAgICAodHlwZW9mIG1ldGEuZXJyICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgbWV0YS5tZXNzYWdlICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgPyBtZXRhXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLndvcmtlcnNbbmFtZV1cbiAgICAgID8ge1xuICAgICAgICAgIC4uLm1ldGEsXG4gICAgICAgICAgd29ya2VyOiB7XG4gICAgICAgICAgICBpc01haW5UaHJlYWQ6IHRoaXMud29ya2Vyc1tuYW1lXS5pc01haW5UaHJlYWQsXG4gICAgICAgICAgICByZXNvdXJjZUxpbWl0czogdGhpcy53b3JrZXJzW25hbWVdLnJlc291cmNlTGltaXRzLFxuICAgICAgICAgICAgdGhyZWFkSWQ6IHRoaXMud29ya2Vyc1tuYW1lXS50aHJlYWRJZFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgOiBtZXRhO1xuICB9XG5cbiAgcnVuKG5hbWUpIHtcbiAgICBkZWJ1ZygncnVuJywgbmFtZSk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGNvbnN0IGpvYiA9IHRoaXMuY29uZmlnLmpvYnMuZmluZCgoaikgPT4gai5uYW1lID09PSBuYW1lKTtcbiAgICAgIGlmICgham9iKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSm9iIFwiJHtuYW1lfVwiIGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLndvcmtlcnNbbmFtZV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmxvZ2dlci53YXJuKFxuICAgICAgICAgIG5ldyBFcnJvcihgSm9iIFwiJHtuYW1lfVwiIGlzIGFscmVhZHkgcnVubmluZ2ApLFxuICAgICAgICAgIHRoaXMuZ2V0V29ya2VyTWV0YWRhdGEobmFtZSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZGVidWcoJ3N0YXJ0aW5nIHdvcmtlcicsIG5hbWUpO1xuICAgICAgY29uc3Qgb2JqZWN0ID0ge1xuICAgICAgICAuLi4odGhpcy5jb25maWcud29ya2VyID8gdGhpcy5jb25maWcud29ya2VyIDoge30pLFxuICAgICAgICAuLi4oam9iLndvcmtlciA/IGpvYi53b3JrZXIgOiB7fSksXG4gICAgICAgIHdvcmtlckRhdGE6IHtcbiAgICAgICAgICBqb2IsXG4gICAgICAgICAgLi4uKHRoaXMuY29uZmlnLndvcmtlciAmJiB0aGlzLmNvbmZpZy53b3JrZXIud29ya2VyRGF0YVxuICAgICAgICAgICAgPyB0aGlzLmNvbmZpZy53b3JrZXIud29ya2VyRGF0YVxuICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgLi4uKGpvYi53b3JrZXIgJiYgam9iLndvcmtlci53b3JrZXJEYXRhID8gam9iLndvcmtlci53b3JrZXJEYXRhIDoge30pXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0aGlzLndvcmtlcnNbbmFtZV0gPSB0aGlzLmNyZWF0ZVdvcmtlcihqb2IucGF0aCwgb2JqZWN0KTtcbiAgICAgIHRoaXMuZW1pdCgnd29ya2VyIGNyZWF0ZWQnLCBuYW1lKTtcbiAgICAgIGRlYnVnKCd3b3JrZXIgc3RhcnRlZCcsIG5hbWUpO1xuXG4gICAgICBjb25zdCBwcmVmaXggPSBgV29ya2VyIGZvciBqb2IgXCIke25hbWV9XCJgO1xuICAgICAgdGhpcy53b3JrZXJzW25hbWVdLm9uKCdvbmxpbmUnLCAoKSA9PiB7XG4gICAgICAgIC8vIElmIHdlIHNwZWNpZmllZCBhIHZhbHVlIGZvciBgY2xvc2VXb3JrZXJBZnRlck1zYFxuICAgICAgICAvLyB0aGVuIHdlIG5lZWQgdG8gdGVybWluYXRlIGl0IGFmdGVyIHRoYXQgZXhlY3V0aW9uIHRpbWVcbiAgICAgICAgY29uc3QgY2xvc2VXb3JrZXJBZnRlck1zID0gTnVtYmVyLmlzRmluaXRlKGpvYi5jbG9zZVdvcmtlckFmdGVyTXMpXG4gICAgICAgICAgPyBqb2IuY2xvc2VXb3JrZXJBZnRlck1zXG4gICAgICAgICAgOiB0aGlzLmNvbmZpZy5jbG9zZVdvcmtlckFmdGVyTXM7XG4gICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoY2xvc2VXb3JrZXJBZnRlck1zKSAmJiBjbG9zZVdvcmtlckFmdGVyTXMgPiAwKSB7XG4gICAgICAgICAgZGVidWcoJ3dvcmtlciBoYXMgY2xvc2Ugc2V0JywgbmFtZSwgY2xvc2VXb3JrZXJBZnRlck1zKTtcbiAgICAgICAgICB0aGlzLmNsb3NlV29ya2VyQWZ0ZXJNc1tuYW1lXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLndvcmtlcnNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3dvcmtlciBoYXMgYmVlbiB0ZXJtaW5hdGVkJywgbmFtZSk7XG4gICAgICAgICAgICAgIHRoaXMud29ya2Vyc1tuYW1lXS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBjbG9zZVdvcmtlckFmdGVyTXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcubG9nZ2VyLmluZm8oXG4gICAgICAgICAgYCR7cHJlZml4fSBvbmxpbmVgLFxuICAgICAgICAgIHRoaXMuZ2V0V29ya2VyTWV0YWRhdGEobmFtZSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy53b3JrZXJzW25hbWVdLm9uKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB0aGlzLmdldFdvcmtlck1ldGFkYXRhKG5hbWUsIHsgbWVzc2FnZSB9KTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcud29ya2VyTWVzc2FnZUhhbmRsZXIpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy53b3JrZXJNZXNzYWdlSGFuZGxlcih7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgLi4ubWV0YWRhdGFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlID09PSAnZG9uZScpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5sb2dnZXIuaW5mbyhgJHtwcmVmaXh9IHNpZ25hbGVkIGNvbXBsZXRpb25gLCBtZXRhZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb25maWcubG9nZ2VyLmluZm8oYCR7cHJlZml4fSBzZW50IGEgbWVzc2FnZWAsIG1ldGFkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXNzYWdlID09PSAnZG9uZScpIHtcbiAgICAgICAgICB0aGlzLndvcmtlcnNbbmFtZV0ucmVtb3ZlQWxsTGlzdGVuZXJzKCdtZXNzYWdlJyk7XG4gICAgICAgICAgdGhpcy53b3JrZXJzW25hbWVdLnJlbW92ZUFsbExpc3RlbmVycygnZXhpdCcpO1xuICAgICAgICAgIHRoaXMud29ya2Vyc1tuYW1lXS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICBkZWxldGUgdGhpcy53b3JrZXJzW25hbWVdO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIGNsb3NlV29ya2VyQWZ0ZXJNcyBpZiBleGlzdFxuICAgICAgICAgIHRoaXMucmVtb3ZlU2FmZVRpbWVyKCdjbG9zZVdvcmtlckFmdGVyTXMnLCBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBOT1RFOiB5b3UgY2Fubm90IGNhdGNoIG1lc3NhZ2VlcnJvciBzaW5jZSBpdCBpcyBhIE5vZGUgaW50ZXJuYWxcbiAgICAgIC8vICAgICAgIChpZiBhbnlvbmUgaGFzIGFueSBpZGVhIGhvdyB0byBjYXRjaCB0aGlzIGluIHRlc3RzIGxldCB1cyBrbm93KVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgIHRoaXMud29ya2Vyc1tuYW1lXS5vbignbWVzc2FnZWVycm9yJywgKGVycikgPT4ge1xuICAgICAgICBpZiAodGhpcy5jb25maWcuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgdGhpcy5jb25maWcuZXJyb3JIYW5kbGVyKGVyciwge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIC4uLnRoaXMuZ2V0V29ya2VyTWV0YWRhdGEobmFtZSwgeyBlcnIgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICBgJHtwcmVmaXh9IGhhZCBhIG1lc3NhZ2UgZXJyb3JgLFxuICAgICAgICAgICAgdGhpcy5nZXRXb3JrZXJNZXRhZGF0YShuYW1lLCB7IGVyciB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy53b3JrZXJzW25hbWVdLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmVycm9ySGFuZGxlcikge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmVycm9ySGFuZGxlcihlcnIsIHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAuLi50aGlzLmdldFdvcmtlck1ldGFkYXRhKG5hbWUsIHsgZXJyIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb25maWcubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgYCR7cHJlZml4fSBoYWQgYW4gZXJyb3JgLFxuICAgICAgICAgICAgdGhpcy5nZXRXb3JrZXJNZXRhZGF0YShuYW1lLCB7IGVyciB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy53b3JrZXJzW25hbWVdLm9uKCdleGl0JywgKGNvZGUpID0+IHtcbiAgICAgICAgY29uc3QgbGV2ZWwgPSBjb2RlID09PSAwID8gJ2luZm8nIDogJ2Vycm9yJztcbiAgICAgICAgaWYgKGxldmVsID09PSAnZXJyb3InICYmIHRoaXMuY29uZmlnLmVycm9ySGFuZGxlcikge1xuICAgICAgICAgIHRoaXMuY29uZmlnLmVycm9ySGFuZGxlcihcbiAgICAgICAgICAgIG5ldyBFcnJvcihgJHtwcmVmaXh9IGV4aXRlZCB3aXRoIGNvZGUgJHtjb2RlfWApLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAuLi50aGlzLmdldFdvcmtlck1ldGFkYXRhKG5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZy5sb2dnZXJbbGV2ZWxdKFxuICAgICAgICAgICAgYCR7cHJlZml4fSBleGl0ZWQgd2l0aCBjb2RlICR7Y29kZX1gLFxuICAgICAgICAgICAgdGhpcy5nZXRXb3JrZXJNZXRhZGF0YShuYW1lKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgdGhpcy53b3JrZXJzW25hbWVdO1xuXG4gICAgICAgIC8vIHJlbW92ZSBjbG9zZVdvcmtlckFmdGVyTXMgaWYgZXhpc3RcbiAgICAgICAgdGhpcy5yZW1vdmVTYWZlVGltZXIoJ2Nsb3NlV29ya2VyQWZ0ZXJNcycsIG5hbWUpO1xuXG4gICAgICAgIHRoaXMuZW1pdCgnd29ya2VyIGRlbGV0ZWQnLCBuYW1lKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgam9iIG9mIHRoaXMuY29uZmlnLmpvYnMpIHtcbiAgICAgIHRoaXMucnVuKGpvYi5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBzdGFydChuYW1lKSB7XG4gICAgZGVidWcoJ3N0YXJ0JywgbmFtZSk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIGNvbnN0IGpvYiA9IHRoaXMuY29uZmlnLmpvYnMuZmluZCgoaikgPT4gai5uYW1lID09PSBuYW1lKTtcbiAgICAgIGlmICgham9iKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSm9iICR7bmFtZX0gZG9lcyBub3QgZXhpc3RgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMudGltZW91dHNbbmFtZV0gfHwgdGhpcy5pbnRlcnZhbHNbbmFtZV0gfHwgdGhpcy53b3JrZXJzW25hbWVdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5sb2dnZXIud2FybihcbiAgICAgICAgICBuZXcgRXJyb3IoYEpvYiBcIiR7bmFtZX1cIiBpcyBhbHJlYWR5IHN0YXJ0ZWRgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBkZWJ1Zygnam9iJywgam9iKTtcblxuICAgICAgLy8gQ2hlY2sgZm9yIGRhdGUgYW5kIGlmIGl0IGlzIGluIHRoZSBwYXN0IHRoZW4gZG9uJ3QgcnVuIGl0XG4gICAgICBpZiAoam9iLmRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIGRlYnVnKCdqb2IgZGF0ZScsIGpvYik7XG4gICAgICAgIGlmIChqb2IuZGF0ZS5nZXRUaW1lKCkgPCBEYXRlLm5vdygpKSB7XG4gICAgICAgICAgZGVidWcoJ2pvYiBkYXRlIHdhcyBpbiB0aGUgcGFzdCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZW91dHNbbmFtZV0gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJ1bihuYW1lKTtcbiAgICAgICAgICBpZiAodGhpcy5pc1NjaGVkdWxlKGpvYi5pbnRlcnZhbCkpIHtcbiAgICAgICAgICAgIGRlYnVnKCdqb2IuaW50ZXJ2YWwgaXMgc2NoZWR1bGUnLCBqb2IpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbHNbbmFtZV0gPSBsYXRlci5zZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW4obmFtZSksXG4gICAgICAgICAgICAgIGpvYi5pbnRlcnZhbCxcbiAgICAgICAgICAgICAgam9iLnRpbWV6b25lXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSBpZiAoTnVtYmVyLmlzRmluaXRlKGpvYi5pbnRlcnZhbCkgJiYgam9iLmludGVydmFsID4gMCkge1xuICAgICAgICAgICAgZGVidWcoJ2pvYi5pbnRlcnZhbCBpcyBmaW5pdGUnLCBqb2IpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbHNbbmFtZV0gPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW4obmFtZSksXG4gICAgICAgICAgICAgIGpvYi5pbnRlcnZhbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVidWcoJ2pvYi5kYXRlIHdhcyBzY2hlZHVsZWQgdG8gcnVuIG9ubHkgb25jZScsIGpvYik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVsZXRlIHRoaXMudGltZW91dHNbbmFtZV07XG4gICAgICAgIH0sIGpvYi5kYXRlLmdldFRpbWUoKSAtIERhdGUubm93KCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoaXMgaXMgb25seSBjb21wbGV4IGJlY2F1c2UgYm90aCB0aW1lb3V0IGFuZCBpbnRlcnZhbCBjYW4gYmUgYSBzY2hlZHVsZVxuICAgICAgaWYgKHRoaXMuaXNTY2hlZHVsZShqb2IudGltZW91dCkpIHtcbiAgICAgICAgZGVidWcoJ2pvYiB0aW1lb3V0IGlzIHNjaGVkdWxlJywgam9iKTtcbiAgICAgICAgdGhpcy50aW1lb3V0c1tuYW1lXSA9IGxhdGVyLnNldFRpbWVvdXQoXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ydW4obmFtZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1NjaGVkdWxlKGpvYi5pbnRlcnZhbCkpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ2pvYi5pbnRlcnZhbCBpcyBzY2hlZHVsZScsIGpvYik7XG4gICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxzW25hbWVdID0gbGF0ZXIuc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5ydW4obmFtZSksXG4gICAgICAgICAgICAgICAgam9iLmludGVydmFsLFxuICAgICAgICAgICAgICAgIGpvYi50aW1lem9uZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChOdW1iZXIuaXNGaW5pdGUoam9iLmludGVydmFsKSAmJiBqb2IuaW50ZXJ2YWwgPiAwKSB7XG4gICAgICAgICAgICAgIGRlYnVnKCdqb2IuaW50ZXJ2YWwgaXMgZmluaXRlJywgam9iKTtcbiAgICAgICAgICAgICAgdGhpcy5pbnRlcnZhbHNbbmFtZV0gPSBzZXRJbnRlcnZhbChcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnJ1bihuYW1lKSxcbiAgICAgICAgICAgICAgICBqb2IuaW50ZXJ2YWxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMudGltZW91dHNbbmFtZV07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBqb2IudGltZW91dCxcbiAgICAgICAgICBqb2IudGltZXpvbmVcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGpvYi50aW1lb3V0KSkge1xuICAgICAgICBkZWJ1Zygnam9iIHRpbWVvdXQgaXMgZmluaXRlJywgam9iKTtcbiAgICAgICAgdGhpcy50aW1lb3V0c1tuYW1lXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucnVuKG5hbWUpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaXNTY2hlZHVsZShqb2IuaW50ZXJ2YWwpKSB7XG4gICAgICAgICAgICBkZWJ1Zygnam9iLmludGVydmFsIGlzIHNjaGVkdWxlJywgam9iKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxzW25hbWVdID0gbGF0ZXIuc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICgpID0+IHRoaXMucnVuKG5hbWUpLFxuICAgICAgICAgICAgICBqb2IuaW50ZXJ2YWwsXG4gICAgICAgICAgICAgIGpvYi50aW1lem9uZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKE51bWJlci5pc0Zpbml0ZShqb2IuaW50ZXJ2YWwpICYmIGpvYi5pbnRlcnZhbCA+IDApIHtcbiAgICAgICAgICAgIGRlYnVnKCdqb2IuaW50ZXJ2YWwgaXMgZmluaXRlJywgam9iLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWxzW25hbWVdID0gc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgICAgICgpID0+IHRoaXMucnVuKG5hbWUpLFxuICAgICAgICAgICAgICBqb2IuaW50ZXJ2YWxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVsZXRlIHRoaXMudGltZW91dHNbbmFtZV07XG4gICAgICAgIH0sIGpvYi50aW1lb3V0KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1NjaGVkdWxlKGpvYi5pbnRlcnZhbCkpIHtcbiAgICAgICAgZGVidWcoJ2pvYi5pbnRlcnZhbCBpcyBzY2hlZHVsZScsIGpvYik7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWxzW25hbWVdID0gbGF0ZXIuc2V0SW50ZXJ2YWwoXG4gICAgICAgICAgKCkgPT4gdGhpcy5ydW4obmFtZSksXG4gICAgICAgICAgam9iLmludGVydmFsLFxuICAgICAgICAgIGpvYi50aW1lem9uZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChOdW1iZXIuaXNGaW5pdGUoam9iLmludGVydmFsKSAmJiBqb2IuaW50ZXJ2YWwgPiAwKSB7XG4gICAgICAgIGRlYnVnKCdqb2IuaW50ZXJ2YWwgaXMgZmluaXRlJywgam9iKTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbHNbbmFtZV0gPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnJ1bihuYW1lKSwgam9iLmludGVydmFsKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgam9iIG9mIHRoaXMuY29uZmlnLmpvYnMpIHtcbiAgICAgIHRoaXMuc3RhcnQoam9iLm5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN0b3AobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICB0aGlzLnJlbW92ZVNhZmVUaW1lcigndGltZW91dHMnLCBuYW1lKTtcbiAgICAgIHRoaXMucmVtb3ZlU2FmZVRpbWVyKCdpbnRlcnZhbHMnLCBuYW1lKTtcblxuICAgICAgaWYgKHRoaXMud29ya2Vyc1tuYW1lXSkge1xuICAgICAgICB0aGlzLndvcmtlcnNbbmFtZV0ub25jZSgnbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UgPT09ICdjYW5jZWxsZWQnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5sb2dnZXIuaW5mbyhcbiAgICAgICAgICAgICAgYEdyYWNlZnVsbHkgY2FuY2VsbGVkIHdvcmtlciBmb3Igam9iIFwiJHtuYW1lfVwiYCxcbiAgICAgICAgICAgICAgdGhpcy5nZXRXb3JrZXJNZXRhZGF0YShuYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMud29ya2Vyc1tuYW1lXS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndvcmtlcnNbbmFtZV0ucG9zdE1lc3NhZ2UoJ2NhbmNlbCcpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbW92ZVNhZmVUaW1lcignY2xvc2VXb3JrZXJBZnRlck1zJywgbmFtZSk7XG5cbiAgICAgIHJldHVybiBwV2FpdEZvcigoKSA9PiB0aGlzLndvcmtlcnNbbmFtZV0gPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBqb2Igb2YgdGhpcy5jb25maWcuam9icykge1xuICAgICAgdGhpcy5zdG9wKGpvYi5uYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcFdhaXRGb3IoKCkgPT4gT2JqZWN0LmtleXModGhpcy53b3JrZXJzKS5sZW5ndGggPT09IDApO1xuICB9XG5cbiAgYWRkKGpvYnMpIHtcbiAgICAvL1xuICAgIC8vIG1ha2Ugc3VyZSBqb2JzIGlzIGFuIGFycmF5XG4gICAgLy9cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoam9icykpIHtcbiAgICAgIGpvYnMgPSBbam9ic107XG4gICAgfVxuXG4gICAgY29uc3QgZXJyb3JzID0gW107XG4gICAgY29uc3QgYWRkZWRKb2JzID0gW107XG5cbiAgICBmb3IgKGNvbnN0IFtpLCBqb2JfXSBvZiBqb2JzLmVudHJpZXMoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBbXG4gICAgICAgICAgLi4uZ2V0Sm9iTmFtZXMoam9icywgaSksXG4gICAgICAgICAgLi4uZ2V0Sm9iTmFtZXModGhpcy5jb25maWcuam9icylcbiAgICAgICAgXTtcblxuICAgICAgICB2YWxpZGF0ZUpvYihqb2JfLCBpLCBuYW1lcywgdGhpcy5jb25maWcpO1xuICAgICAgICBjb25zdCBqb2IgPSBidWlsZEpvYihqb2JfLCB0aGlzLmNvbmZpZyk7XG5cbiAgICAgICAgYWRkZWRKb2JzLnB1c2goam9iKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdqb2JzIGFkZGVkJywgdGhpcy5jb25maWcuam9icyk7XG5cbiAgICAvLyBJZiB0aGVyZSB3ZXJlIGFueSBlcnJvcnMgdGhlbiB0aHJvdyB0aGVtXG4gICAgaWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBjb21iaW5lRXJyb3JzKGVycm9ycyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb25maWcuam9icy5wdXNoKC4uLmFkZGVkSm9icyk7XG4gICAgcmV0dXJuIGFkZGVkSm9icztcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZShuYW1lKSB7XG4gICAgY29uc3Qgam9iID0gdGhpcy5jb25maWcuam9icy5maW5kKChqKSA9PiBqLm5hbWUgPT09IG5hbWUpO1xuICAgIGlmICgham9iKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEpvYiBcIiR7bmFtZX1cIiBkb2VzIG5vdCBleGlzdGApO1xuICAgIH1cblxuICAgIC8vIG1ha2Ugc3VyZSBpdCBhbHNvIGNsb3NlcyBhbnkgb3BlbiB3b3JrZXJzXG4gICAgYXdhaXQgdGhpcy5zdG9wKG5hbWUpO1xuXG4gICAgdGhpcy5jb25maWcuam9icyA9IHRoaXMuY29uZmlnLmpvYnMuZmlsdGVyKChqKSA9PiBqLm5hbWUgIT09IG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZnJpZW5kbHkgaGVscGVyIHRvIGNsZWFyIHNhZmUtdGltZXJzIHRpbWVvdXQgYW5kIGludGVydmFsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqL1xuICByZW1vdmVTYWZlVGltZXIodHlwZSwgbmFtZSkge1xuICAgIGlmICh0aGlzW3R5cGVdW25hbWVdKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiB0aGlzW3R5cGVdW25hbWVdID09PSAnb2JqZWN0JyAmJlxuICAgICAgICB0eXBlb2YgdGhpc1t0eXBlXVtuYW1lXS5jbGVhciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgKSB7XG4gICAgICAgIHRoaXNbdHlwZV1bbmFtZV0uY2xlYXIoKTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIHRoaXNbdHlwZV1bbmFtZV07XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlV29ya2VyKGZpbGVuYW1lLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyB0aHJlYWRzLldvcmtlcihmaWxlbmFtZSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuLy8gRXhwb3NlIGJ0aHJlYWRzICh1c2VmdWwgZm9yIHRlc3RzKVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2NoamovYnRocmVhZHMjYXBpXG5CcmVlLnRocmVhZHMgPSB7XG4gIGJhY2tlbmQ6IHRocmVhZHMuYmFja2VuZCxcbiAgYnJvd3NlcjogdGhyZWFkcy5icm93c2VyLFxuICBsb2NhdGlvbjogdGhyZWFkcy5sb2NhdGlvbixcbiAgZmlsZW5hbWU6IHRocmVhZHMuZmlsZW5hbWUsXG4gIGRpcm5hbWU6IHRocmVhZHMuZGlybmFtZSxcbiAgcmVxdWlyZTogdGhyZWFkcy5yZXF1aXJlLFxuICByZXNvbHZlOiB0aHJlYWRzLnJlc29sdmUsXG4gIGV4aXQ6IHRocmVhZHMuZXhpdCxcbiAgY29yZXM6IHRocmVhZHMuY29yZXNcbn07XG5cbi8vIHBsdWdpbnMgaW5zcGlyZWQgYnkgRGF5anNcbkJyZWUuZXh0ZW5kID0gKHBsdWdpbiwgb3B0aW9ucykgPT4ge1xuICBpZiAoIXBsdWdpbi4kaSkge1xuICAgIC8vIGluc3RhbGwgcGx1Z2luIG9ubHkgb25jZVxuICAgIHBsdWdpbihvcHRpb25zLCBCcmVlKTtcbiAgICBwbHVnaW4uJGkgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIEJyZWU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWU7XG4iXX0=