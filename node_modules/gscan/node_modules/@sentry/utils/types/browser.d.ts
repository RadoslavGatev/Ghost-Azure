/**
 * Given a child DOM element, returns a query-selector statement describing that
 * and its ancestors
 * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
 * @returns generated DOM path
 */
export declare function htmlTreeAsString(elem: unknown, options?: string[] | {
    keyAttrs?: string[];
    maxStringLength?: number;
}): string;
/**
 * A safe form of location.href
 */
export declare function getLocationHref(): string;
/**
 * Gets a DOM element by using document.querySelector.
 *
 * This wrapper will first check for the existance of the function before
 * actually calling it so that we don't have to take care of this check,
 * every time we want to access the DOM.
 *
 * Reason: DOM/querySelector is not available in all environments.
 *
 * We have to cast to any because utils can be consumed by a variety of environments,
 * and we don't want to break TS users. If you know what element will be selected by
 * `document.querySelector`, specify it as part of the generic call. For example,
 * `const element = getDomElement<Element>('selector');`
 *
 * @param selector the selector string passed on to document.querySelector
 */
export declare function getDomElement<E = any>(selector: string): E | null;
//# sourceMappingURL=browser.d.ts.map