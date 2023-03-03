# express-lazy-router

Lazy loading for express router.

## Motivation

I've used [ts-node](https://github.com/TypeStrong/ts-node)([ts-node-dev](https://github.com/wclr/ts-node-dev)) for
developing Node.js Web Application. It means that compile all TypeScript files at start time.

Many compilation make startup of the web app slow. Lazy routing avoid this compilation overhead by compiled when needed.

- [Compilation is unbelievably slow · Issue #754 · TypeStrong/ts-node](https://github.com/TypeStrong/ts-node/issues/754)

In a frontend, We have already used lazy loading for router like React Router, Vue Router.

- [Route-based code splitting | React](https://reactjs.org/docs/code-splitting.html#route-based-code-splitting)
- [Lazy Loading Routes | Vue Router](https://router.vuejs.org/guide/advanced/lazy-loading.html)

Also, [webpack](https://github.com/webpack/webpack) support [experiments.lazyCompilation](https://github.com/webpack/webpack/releases/tag/v5.17.0) as experimentally.

So, We can get lazy routing in Node.js [Express routing](https://expressjs.com/en/guide/routing.html) too.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install express-lazy-router

## Usage

```ts
import express from 'express';
import { createLazyRouter } from 'express-lazy-router';
const lazyLoad = createLazyRouter({
    // In production, Load router asap
    preload: process.env.NODE_ENV === 'production',
});
const app = express();
// Load ./path_to_router.js when receive request to "/path_to_router"
app.use(
    '/path_to_router',
    lazyLoad(() => import('./path_to_router')),
);
app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000`)
});
```

## Options

### `preload` 

> Default: false

If it is `true`, preload the router module as soon as.
It does not mean sync loading.

## Examples

**Before**: No lazy loading

`index.js`:

```js
import express from 'express';
import api from "./api";
const app = express();
app.use(
    '/api',
    api
);
app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:8000`)
});
```

`api.js`:

```js
import express from 'express';
const router = express.Router();
// GET api/status
router.get("/status", (_, res) => {
    res.json({ ok: true })
});
export default router;
```

Behavior:

- load `index.js`
- load `api.js`
- complete to launch the express app 
- `GET /api/status`
- > `{ ok: true }`

**After**: lazy loading for api.js

`index.js`:

```diff
import express from 'express';
- import api from "./api";
+ import { createLazyRouter } from 'express-lazy-router';
+ const lazyLoad = createLazyRouter({
+     preload: process.env.NODE_ENV === 'production',
+ });
const app = express();
app.use(
    '/api',
-    api
+    lazyLoad(() => import("./api"))
);
app.listen(8000, () => {
    console.log(`Example app listening at http://localhost:8000`)
});
```

`api.js`: No need to change!

Behavior:

- load `index.js`
- complete to launch the express app
- `GET /api/status`
- load `api.js`
- > `{ ok: true }`

The more details behavior when you use loader like [@babel/register](https://babeljs.io/docs/en/babel-register) or [ts-node](https://github.com/TypeStrong/ts-node).

- load `index.js`
    - Compile `index.js` by babe;
- complete to launch the express app
- `GET /api/status`
- load `api.js`
  - Compile `api.js` by babe;
- > `{ ok: true }`

## Limitation

### Avoid to use non-path router

NG: express-lazy-router does not expect this way.

```ts
import { createLazyRouter } from 'express-lazy-router';
const lazyLoad = createLazyRouter();
const app = express();
app.use(
    lazyLoad(() => import('./path_to_router')),
);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
```

## Changelog

See [Releases page](https://github.com/azu/express-lazy-router/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/express-lazy-router/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
