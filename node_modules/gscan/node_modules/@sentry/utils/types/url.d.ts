/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
export declare function parseUrl(url: string): {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};
/**
 * Strip the query string and fragment off of a given URL or path (if present)
 *
 * @param urlPath Full URL or path, including possible query string and/or fragment
 * @returns URL or path without query string or fragment
 */
export declare function stripUrlQueryAndFragment(urlPath: string): string;
/**
 * Returns number of URL segments of a passed string URL.
 */
export declare function getNumberOfUrlSegments(url: string): number;
//# sourceMappingURL=url.d.ts.map