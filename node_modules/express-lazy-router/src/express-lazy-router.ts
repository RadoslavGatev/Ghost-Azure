import express from "express";

export type createLazyLoaderOptions = {
    /**
     * if preload is true, load router asap
     * Default: false
     */
    preload?: boolean;
};

/**
 * @param options
 * @example
 * ```js
 * const lazyLoad = createLazyLoader();
 * router.use(
 *   '/path_to_router',
 *   lazyLoad(() => import('./path_to_router')),
 * );
 * ```
 */
export function createLazyRouter(options: createLazyLoaderOptions = {}) {
    const preload = options.preload ?? false;
    /**
     * lazy load express router
     * @param resolver
     */
    return function lazyRouter(resolver: () => Promise<{ default: express.Router } | express.Router>) {
        const lazyRouter = express.Router();
        // Preserve loading order of router for default error handler
        // https://github.com/azu/express-lazy-router/issues/1
        let loadedRouter: express.Router;
        const resolveResolver = () => {
            return resolver().then((router) => {
                if ("default" in router) {
                    loadedRouter = router.default;
                } else {
                    loadedRouter = router;
                }
            });
        };
        lazyRouter.use((req, res, next) => {
            if (loadedRouter) {
                return loadedRouter(req, res, next);
            } else {
                // request handler at first time
                resolveResolver()
                    .then(() => {
                        return loadedRouter(req, res, next);
                    })
                    .catch((error) => {
                        next(error);
                    });
            }
        });
        if (preload) {
            resolveResolver().catch((error) => {
                console.error("[lazy-router] Fail to preload", error);
            });
        }
        return lazyRouter;
    };
}
