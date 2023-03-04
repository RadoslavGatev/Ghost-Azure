import * as Ast from './ast';
/**
 * Parse a CSS selector string.
 *
 * This function supports comma-separated selector lists
 * and always returns an AST starting from a node of type `list`.
 *
 * @param str - CSS selector string (can contain commas).
 */
declare function parse(str: string): Ast.ListSelector;
/**
 * Parse a CSS selector string.
 *
 * This function does not support comma-separated selector lists
 * and always returns an AST starting from a node of type `compound`.
 *
 * @param str - CSS selector string (no commas).
 */
declare function parse1(str: string): Ast.CompoundSelector;
/**
 * Convert a selector AST back to a string representation.
 *
 * Note: formatting is not preserved in the AST.
 *
 * @param selector - A selector AST object.
 */
declare function serialize(selector: Ast.Selector): string;
/**
 * Modifies the given AST **in place** to have all internal arrays
 * in a stable order. Returns the AST.
 *
 * Intended for consitent processing and normalized `serialize()` output.
 *
 * @param selector - A selector AST object.
 */
declare function normalize(selector: Ast.Selector): Ast.Selector;
/**
 * Compare selectors based on their specificity.
 *
 * Usable as a comparator for sorting.
 *
 * @param a - First selector.
 * @param b - Second selector.
 */
declare function compareSelectors(a: Ast.SimpleSelector | Ast.CompoundSelector, b: Ast.SimpleSelector | Ast.CompoundSelector): number;
/**
 * Compare specificity values without reducing them
 * as arbitrary base numbers.
 *
 * Usable as a comparator for sorting.
 *
 * @param a - First specificity value.
 * @param b - Second specificity value.
 */
declare function compareSpecificity(a: Ast.Specificity, b: Ast.Specificity): number;
export { Ast, compareSelectors, compareSpecificity, normalize, parse, parse1, serialize };
