# bthreads

A [worker_threads] wrapper for node.js. Provides transparent fallback for
pre-11.7.0 node.js (via `child_process`) as well as browser web workers.
Browserifiable, webpack-able.

## Usage

``` js
const threads = require('bthreads');

if (threads.isMainThread) {
  const worker = new threads.Worker(__filename, {
    workerData: 'foo'
  });

  worker.on('message', console.log);
  worker.on('error', console.error);

  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(`Worker stopped with exit code ${code}.`);
  });
} else {
  threads.parentPort.postMessage(threads.workerData + 'bar');
}
```

Output (with node@<11.7.0):

``` bash
$ node --experimental-worker threads.js
foobar
$ node threads.js
foobar
```

## Backends

bthreads has 4 backends and a few layers of fallback:

- `worker_threads` - Uses the still experimental [worker_threads] module in
  node.js. Only usable prior to node.js v11.7.0 if `--experimental-worker` is
  passed on the command line.
- `child_process` - Leverages the [child_process] module in node.js to emulate
  worker threads.
- `web_workers` - [Web Workers API][web_workers] (browser only).
- `polyfill` - A [polyfill] for the web workers API.

The current backend is exposed as `threads.backend`. Note that the current
backend can be set with the `BTHREADS_BACKEND` environment variable.

### Multiple Entry Points

`require('bthreads')` will automatically pick the backend depending on what is
available, but in some cases that may not be what you want. Because of this,
there are also more explicit entry points:

- `require('bthreads/process')` - Always the `child_process` backend,
  regardless of node version.
- `require('bthreads/threads')` - Always the `worker_threads` backend,
  regardless of node version.
- `require('bthreads/stable')` - Points to the `worker_threads` backend once it
  is considered "stable", `child_process` otherwise. The current "stable" node
  version for `worker_threads` is considered to be 11.11.0. May change in the
  future.

## Caveats

Some caveats for the `child_process` backend:

- The transfer list only works for MessagePorts. ArrayBuffers won't _actually_
  be transferred.
- `options.workerData` probably has a limited size depending on platform (the
  maximum size of an environment variable).
- `SharedArrayBuffer` does not work and will throw an error if sent.
- In order to avoid memory leaks, MessagePorts (all aside from the parentPort)
  do not hold event loop references (`ref()` and `unref()` are noops).
- Prior to node 10, objects like `Proxy`s can be serialized and cloned as they
  cannot be detected from regular javascript.
- `SHARE_ENV` does not work and will throw an error if passed.

Caveats for the `web_workers` backend:

- `options.workerData` possibly has a limited size depending on the browser
  (the maximum size of `options.name`).
- `options.eval` requires a "bootstrap" file for code. This is essentially a
  bundle which provides all the necessary browserify modules (such that
  `require('path')` works, for example), as well as bthreads itself.  By
  default, bthreads will pull in its own [bundle] as an [npm
  package][bthreads-bundle] from [unpkg.com]. If using the default bootstrap
  file, you must have `blob:` and/or `data:` set as a [Content-Security-Policy]
  source (see [content-security-policy.com] for a guide). When using a bundler,
  note that the bundler will _not_ be able to compile the eval'd code. This
  means that `require` will have limited usability (restricted to only core
  browserify modules and `bthreads` itself).
- The `close` event for MessagePorts only has partial support (if a thread
  suddenly terminates, `close` will not be emitted for any remote ports).
  This is because the `close` event is not yet a part of the standard Web
  Worker API. See https://github.com/whatwg/html/issues/1766 for more info.
- `SHARE_ENV` does not work and will throw an error if passed.
- `workerData` is serialized as json instead of using the structured clone
  algorithm. This limits what can be sent as `workerData`. This was done to
  reduce code size since serializing structured data is non-trivial.
- The `stdio`, `stdin`, and `stdout` options will throw an error if passed.
  STDIO streams do not exist in the browser. This is done to reduce code size.
- To make sure bthreads is aware of the `Buffer` object in the browser, you
  must assign `bthreads.Buffer` like so: `bthreads.Buffer = Buffer;`. Once
  again, this was done to reduce code size.

Caveats for the `polyfill` backend:

- Code will not actually run in a separate context (obviously).
- `importScripts` will perform a synchronous `XMLHttpRequest` and potentially
  freeze the UI. Additionally, XHR is bound to certain cross-origin rules that
  `importScripts` is not.
- Similarly, worker scripts are also spawned using XHR. This means they are
  restricted by the `connect-src` `Content-Security-Policy` directive
  specifically (instead of perhaps the `worker-src` directive).
- All transferred `ArrayBuffer`s behave as if they were `SharedArrayBuffer`s
  (i.e. they're not neutered). Be careful!
- Uncaught errors will not be caught and emitted as `error` events on worker
  objects.
- Worker scripts cannot be executed as ES modules.
- Exotic objects like `Proxy`s can be serialized and cloned as they cannot be
  detected from regular javascript.

Caveats for all of the above:

- For a number of reasons, bthreads has to walk the objects you pass in to
  send. Note that the cloning function may get confused if you attempt to send
  the raw prototype of a built-in object (for example
  `worker.postMessage(Buffer.prototype)`).

Finally, caveats for the `worker_threads` backend:

- It is somewhat unstable and crashes a lot with assertion failures,
  particularly when there is an uncaught exception or the thread is forcefully
  terminated. Note that `worker_threads` is still experimental in node.js!
- Native modules will be unusable if they are not built as context-aware
  addons.

## High-level API

The low-level node.js API is not very useful on its own. bthreads optionally
provides an API similar to [bsock].

Example (for brevity, the async wrapper is not included below):

``` js
const threads = require('bthreads');

if (threads.isMainThread) {
  const thread = new threads.Thread(__filename);

  thread.bind('event', (x, y) => {
    console.log(x + y);
  });

  console.log(await thread.call('job', ['hello']));
} else {
  const {parent} = threads;

  parent.hook('job', async (arg) => {
    return arg + ' world';
  });

  parent.fire('event', ['foo', 'bar']);
}
```

Output:

``` js
foobar
hello world
```

### Creating a thread pool

You may find yourself wanting to parallelize the same worker jobs. The
high-level API offers a thread pool object (`threads.Pool`) which will
automatically load balance and scale to the number of CPU cores.

``` js
if (threads.isMainThread) {
  const pool = new threads.Pool(__filename);

  const results = await Promise.all([
    pool.call('job1'), // Runs on thread 1.
    pool.call('job2'), // Runs on thread 2.
    pool.call('job3')  // Runs on thread 3.
  ]);

  console.log(results);
} else {
  const {parent} = threads;

  Buffer.poolSize = 1; // Make buffers easily transferrable.

  parent.hook('job1', async () => {
    const buf = Buffer.from('job1 result');
    return [buf, [buf.buffer]]; // Transfer the array buffer.
  });

  parent.hook('job2', async () => {
    return 'job2 result';
  });

  parent.hook('job3', async () => {
    return 'job3 result';
  });
}
```

## Writing code for node and the browser

One of the remarkable features of bthreads is that it allows for static
analysis when bundling. The `threads.Pool` and `threads.Thread` objects resolve
their `filename` argument as if it was a `require()` from the calling file.

``` js
const thread = new threads.Thread('./worker.js');
```

The above line will resolve to `${__dirname}/worker.js` in node.js and
`${window.location}/worker.js` in the browser. In node.js, it is _not_ relative
to the current working directory! We accomplish this through various forms of
sorcery.

Why does this matter? Because it allows for browserify and/or webpack to do
static analysis on your code and ship your code (including workers) as a single
bundled file! Of course, this would require an extra browserify or webpack
plugin which adds some more initialization code for choosing the proper entry
point.

### How this works behind the scenes (for plugin implementers)

Statically analyzing the line above, the compiler should replace
`'./worker.js'` with `'bthreads-worker@[id]'`. When initializing the code,
`bthreads` should be implicitly required. `bthreads` will set an environment
variable called `process.env.BTHREADS_WORKER_INLINE` which contains the `[id]`
you generated previously, allowing you to determine which function to run
inside the worker thread.

In other words, when the compiler comes across:

``` js
const thread = new threads.Thread('./worker.js');
```

`./worker.js` should be included in the bundled and mapped to an ID (in our
case, we include it in the bundle with an ID of `1`).

Our line becomes:

``` js
const thread = new threads.Thread('bthreads-worker@1');
```

The bundle's main entry point should include some initialization code like:

``` js
requireBthreads();

if (process.env.BTHREADS_WORKER_INLINE)
  requireWorker(process.env.BTHREADS_WORKER_INLINE);
else
  requireMain();
```

## importScripts

In the browser, bthreads exposes a more useful version of `importScripts`
called `threads.require`.

``` js
const threads = require('bthreads');
const _ = threads.require('https://unpkg.com/underscore/underscore.js');
```

This should work for any library exposed as UMD or CommonJS. Note that
`threads.require` behaves more like `require` in that it caches modules
by URL.

## More about eval'd browser code

Note that if you are eval'ing some code inside a script you plan to bundle with
browserify or webpack, `require` may get unintentionally transformed or
overridden. This generally happens when you are calling toString on a defined
function.

``` js
const threads = require('bthreads');

function myWorker() {
  const threads = require('bthreads');

  threads.parentPort.postMessage('foo');
}

const code = `(${myWorker})();`;
const worker = new threads.Worker(code, { eval: true });
```

The solution is to access `module.require` instead of `require`.

``` js
const threads = require('bthreads');

function myWorker() {
  const threads = module.require('bthreads');

  threads.parentPort.postMessage('foo');
}

const code = `(${myWorker})();`;
const worker = new threads.Worker(code, { eval: true });
```

## API

- Default API
  - `threads.isMainThread` - See [worker_threads] documentation.
  - `threads.parentPort` - See [worker_threads] documentation (worker only).
  - `threads.threadId` - See [worker_threads] documentation.
  - `threads.workerData` - See [worker_threads] documentation (worker only).
  - `threads.MessagePort` - See [worker_threads] documentation.
  - `threads.MessageChannel` - See [worker_threads] documentation.
  - `threads.Worker` - See [worker_threads] documentation.
- Helpers
  - `threads.backend` - A string indicating the current backend
    (`worker_threads`, `child_process`, `web_workers`, or `polyfill`).
  - `threads.browser` - `true` if a browser backend is being used.
  - `threads.location` - The current module URL (cross-platform
    `import.meta.url`).
  - `threads.filename` - The current module filename (cross-platform
    `__filename`).
  - `threads.dirname` - The current module dirname (cross-platform
    `__dirname`).
  - `threads.require(location)` - `importScripts()` wrapper (browser+worker
    only).
  - `threads.resolve(location)` - Resolve a URL or path to a filename. This is
    what `threads.require` calls internally.
  - `threads.exit(code)` - A reference to `process.exit`.
  - `threads.cores` - Number of CPU cores available.
- Options
  - `threads.Buffer` - In the browser, this must be set to the `Buffer` object
    in order for bthreads to be aware of buffers.
  - `threads.bufferify` - A boolean indicating whether to cast Uint8Arrays
     to Buffer objects after receiving. Only affects the high-level API. This
     option is on by default.
- High-Level API
  - `threads.Thread` - `Thread` Class (see below).
  - `threads.Port` - `Port` Class (see below).
  - `threads.Channel` - `Channel` Class (see below).
  - `threads.Pool` - `Pool` Class (see below).
  - `threads.parent` - A reference to the parent `Port` (worker only, see
    below).

### Socket Class (abstract, extends EventEmitter)

- Constructor
  - `new Socket()` - Not meant to be called directly.
- Properties
  - `Socket#events` (read only) - A reference to the bind `EventEmitter`.
  - `Socket#closed` (read only) - A boolean representing whether the socket is
    closed.
- Methods
  - `Socket#bind(name, handler)` - Bind remote event.
  - `Socket#unbind(name, handler)` - Unbind remote event.
  - `Socket#hook(name, handler)` - Add hook handler.
  - `Socket#unhook(name)` - Remove hook handler.
  - `Socket#send(msg, [transferList])` - Send message, will be emitted as a
    `message` event on the other side.
  - `Socket#read()` (async) - Wait for and read the next `message` event.
  - `Socket#fire(name, args, [transferList])` - Fire bind event.
  - `Socket#call(name, args, [transferList], [timeout])` (async) - Call remote
    hook.
  - `Socket#hasRef()` - Test whether socket has reference.
  - `Socket#ref()` - Reference socket.
  - `Socket#unref()` - Clear socket reference.
- Events
  - `Socket@message(msg)` - Emitted on message received.
  - `Socket@error(err)` - Emitted on error.
  - `Socket@event(event, args)` - Emitted on bind event.

### Thread Class (extends Socket)

- Constructor
  - `new Thread(filename, [options])` - Instantiate thread with module.
  - `new Thread(code, [options])` - Instantiate thread with code.
  - `new Thread(function, [options])` - Instantiate thread with function.
- Properties
  - `Thread#online` (read only) - A boolean representing whether the thread is
    online.
  - `Thread#stdin` (read only) - A writable stream representing stdin (only
    present if `options.stdin` was passed).
  - `Thread#stdout` (read only) - A readable stream representing stdout.
  - `Thread#stderr` (read only) - A readable stream representing stderr.
  - `Thread#threadId` (read only) - An integer representing the thread ID.
- Methods
  - `Thread#open()` (async) - Wait for the `online` event to be emitted.
  - `Thread#close()` (async) - Terminate the thread and wait for `exit` event
    but also listen for errors and reject the promise if any occur (in other
    words, a better `async` version of `Thread#terminate`).
  - `Thread#wait()` (async) - Wait for thread to exit, but do not invoke
    `close()`. Also listen for errors and reject the promise if any occur.
- Events
  - `Thread@online()` - Emitted once thread is online.
  - `Thread@exit(code)` - Emitted on exit.

### Port Class (extends Socket)

- Constructor
  - `new Port()` - Not meant to be called directly.
- Methods
  - `Port#start()` - Open and bind port (usually automatic).
  - `Port#close()` (async) - Close the port and wait for `close` event, but
  - `Port#wait()` (async) - Wait for port to exit, but do not invoke `close()`.
    Also listen for errors and reject the promise if any occur.
- Events
  - `Port@close()` - Emitted on port close.

### Channel Class

- Constructor
  - `new Channel()` - Instantiate channel.
- Properties
  - `Channel#port1` (read only) - A `Port` object.
  - `Channel#port2` (read only) - A `Port` object.

### Pool Class (extends EventEmitter)

- Constructor
  - `new Pool(filename, [options])` - Instantiate pool with module.
  - `new Pool(code, [options])` - Instantiate pool with code.
  - `new Pool(function, [options])` - Instantiate pool with function.
- Properties
  - `Pool#file` (read only) - A reference to the filename, function, or code
    that was passed in.
  - `Pool#options` (read only) - A reference to the options passed in.
  - `Pool#size` (read only) - Number of threads to spawn.
  - `Pool#events` (read only) - A reference to the bind `EventEmitter`.
  - `Pool#threads` (read only) - A `Set` containing all spawned threads.
- Methods
  - `Pool#open()` (async) - Populate and wait until all threads are online
    (otherwise threads will be lazily spawned).
  - `Pool#close()` (async) - Close all threads in pool, reject on errors.
  - `Pool#populate()` - Populate the pool with `this.size` threads (otherwise
    threads will be lazily spawned).
  - `Pool#next()` - Return the next thread in queue (this may spawn a new
    thread).
  - `Pool#bind(name, handler)` - Bind remote event for all threads.
  - `Pool#unbind(name, handler)` - Unbind remote event for all threads.
  - `Pool#hook(name, handler)` - Add hook handler for all threads.
  - `Pool#unhook(name)` - Remove hook handler for all threads.
  - `Pool#send(msg)` - Send message to all threads, will be emitted as a
    `message` event on the other side (this will populate the pool with threads
    on the first call).
  - `Pool#fire(name, args)` - Fire bind event to all threads (this will
    populate the pool with threads on the first call).
  - `Pool#call(name, args, [transferList], [timeout])` (async) - Call remote
    hook on next thread in queue (this may spawn a new thread).
  - `Pool#hasRef()` - Test whether pool has reference.
  - `Pool#ref()` - Reference pool.
  - `Pool#unref()` - Clear pool reference.
- Events
  - `Pool@message(msg, thread)` - Emitted on message received.
  - `Pool@error(err, thread)` - Emitted on error.
  - `Pool@event(event, args, thread)` - Emitted on bind event.
  - `Pool@spawn(thread)` - Emitted immediately after thread is spawned.
  - `Pool@online(thread)` - Emitted once thread is online.
  - `Pool@exit(code, thread)` - Emitted on thread exit.

### Thread, Pool, and Worker Options

The `options` object accepted by the `Thread`, `Pool`, and `Worker` classes is
nearly identical to the [worker_threads] worker options with some differences:

- `options.type` and `options.credentials` are valid options when using the
  browser backend (see [web_workers]). Note that `options.type = 'module'` will
  not work with the `polyfill` backend. If a file extension is `.mjs`,
  `options.type` is automatically set to `module` for consistency with node.js.
- `options.bootstrap` is a valid option in the browser when used in combination
  with `options.eval`. Its value should be the URL of a compiled [bundle] file.
  For security, it's recommended to serve your own bootstrap file. This can be
  set to `false` to do a _raw_ eval (you must inline your own initialization
  code, presumably by using `importScripts`).
- The `Pool` class accepts `size` option. This allows you to manually set the
  pool size instead of determining it by the number of CPU cores.
- `options.dirname` allows you to set the `__dirname` of an eval'd module.
  This makes `require` more predictable in eval'd modules (note this is _not_
  necessary with the `Thread` and `Pool` objects -- it is done automatically).

#### Worker Data

In the browser, `workerData` is serialized as JSON instead of structured data.
To force usage of the structured clone algorithm, it's possible to require
`./lib/encoding` (note that this will increase your code size _greatly_).

``` js
const encoding = require('bthreads/encoding');
const thread = new threads.Thread('./worker.js', {
  workerData: encoding.stringify({ foo: 'bar' })
});
```

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

- Copyright (c) 2019, Christopher Jeffrey (MIT License).

See LICENSE for more info.

[worker_threads]: https://nodejs.org/api/worker_threads.html
[child_process]: https://nodejs.org/api/child_process.html
[web_workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[polyfill]: https://github.com/chjj/bthreads/blob/master/lib/browser/polyfill.js
[Content-Security-Policy]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
[content-security-policy.com]: https://content-security-policy.com/
[bsock]: https://github.com/bcoin-org/bsock
[bundle]: https://github.com/chjj/bthreads/blob/master/lib/browser/eval.js
[bthreads-bundle]: https://www.npmjs.com/package/bthreads-bundle
[unpkg.com]: https://unpkg.com/
