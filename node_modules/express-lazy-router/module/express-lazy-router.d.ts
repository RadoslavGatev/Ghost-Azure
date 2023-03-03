import express from "express";
export declare type createLazyLoaderOptions = {
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
export declare function createLazyRouter(options?: createLazyLoaderOptions): (resolver: () => Promise<{
    default: express.Router;
} | express.Router>) => import("express-serve-static-core").Router;
