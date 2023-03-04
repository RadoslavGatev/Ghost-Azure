import { Parser, Grammar } from 'nearley';
import * as moo from 'moo';

// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d) { return d[0]; }
const lexer = moo.compile({
    ws: { match: /[ \t\r\n\f]+/, lineBreaks: true },
    idn: { match: /[a-zA-Z_-][a-zA-Z0-9_-]*/ },
    hashToken: { match: /#[a-zA-Z0-9_-]+/, value: (s) => s.slice(1) },
    str1: { match: /'(?:\\['\\]|[^\n'\\])*'/, value: (s) => s.slice(1, -1) },
    str2: { match: /"(?:\\["\\]|[^\n"\\])*"/, value: (s) => s.slice(1, -1) },
    asterisk: '*',
    fullstop: '.',
    comma: ',',
    lbr: '[',
    rbr: ']',
    eq: '=',
    gt: '>',
    vbar: '|',
    plus: '+',
    tilde: '~',
    caret: '^',
    dollar: '$',
    //colon:      ':',
    //lpar:       '(',
    //rpar:       ')',
});
function firstTokenValue(tokens) {
    return tokens[0].value;
}
function second(tokens) {
    return tokens[1];
}
function sumSpec([a0, a1, a2], [b0, b1, b2]) {
    return [a0 + b0, a1 + b1, a2 + b2];
}
const grammar = {
    Lexer: lexer,
    ParserRules: [
        { "name": "main", "symbols": ["_", "listSelector", "_"], "postprocess": second },
        { "name": "mainNoList", "symbols": ["_", "complexSelector", "_"], "postprocess": second },
        { "name": "listSelector", "symbols": ["complexSelector"], "postprocess": ([next]) => ({ type: 'list', list: [next] }) },
        { "name": "listSelector", "symbols": ["listSelector", "_", (lexer.has("comma") ? { type: "comma" } : comma), "_", "complexSelector"], "postprocess": ([acc, , , , next]) => ({ type: 'list', list: [...acc.list, next] }) },
        { "name": "complexSelector", "symbols": ["compoundSelector"], "postprocess": id },
        { "name": "complexSelector", "symbols": ["complexSelector", "__", "compoundSelector"], "postprocess": ([left, , right]) => ({
                type: 'compound',
                list: [...right.list, { type: 'combinator', combinator: ' ', left: left, specificity: left.specificity }],
                specificity: sumSpec(left.specificity, right.specificity)
            }) },
        { "name": "complexSelector", "symbols": ["complexSelector", "_", "combinator", "_", "compoundSelector"], "postprocess": ([left, , c, , right]) => ({
                type: 'compound',
                list: [...right.list, { type: 'combinator', combinator: c, left: left, specificity: left.specificity }],
                specificity: sumSpec(left.specificity, right.specificity)
            }) },
        { "name": "combinator", "symbols": [(lexer.has("gt") ? { type: "gt" } : gt)], "postprocess": () => '>' },
        { "name": "combinator", "symbols": [(lexer.has("plus") ? { type: "plus" } : plus)], "postprocess": () => '+' },
        { "name": "combinator", "symbols": [(lexer.has("tilde") ? { type: "tilde" } : tilde)], "postprocess": () => '~' },
        { "name": "combinator", "symbols": [(lexer.has("vbar") ? { type: "vbar" } : vbar), (lexer.has("vbar") ? { type: "vbar" } : vbar)], "postprocess": () => '||' },
        { "name": "compoundSelector", "symbols": ["typeSelector"], "postprocess": ([next]) => ({
                type: 'compound',
                list: [next],
                specificity: next.specificity
            }) },
        { "name": "compoundSelector", "symbols": ["subclassSelector"], "postprocess": ([next]) => ({
                type: 'compound',
                list: [next],
                specificity: next.specificity
            }) },
        { "name": "compoundSelector", "symbols": ["compoundSelector", "subclassSelector"], "postprocess": ([acc, next]) => ({
                type: 'compound',
                list: [...acc.list, next],
                specificity: sumSpec(acc.specificity, next.specificity)
            }) },
        { "name": "subclassSelector", "symbols": ["idSelector"], "postprocess": id },
        { "name": "subclassSelector", "symbols": ["classSelector"], "postprocess": id },
        { "name": "subclassSelector", "symbols": ["attrSelector"], "postprocess": id },
        { "name": "attrSelector", "symbols": ["attrPresenceSelector"], "postprocess": id },
        { "name": "attrSelector", "symbols": ["attrValueSelector"], "postprocess": id },
        { "name": "typeSelector", "symbols": ["tagSelector"], "postprocess": id },
        { "name": "typeSelector", "symbols": ["uniSelector"], "postprocess": id },
        { "name": "attrPresenceSelector", "symbols": [(lexer.has("lbr") ? { type: "lbr" } : lbr), "_", "wqname", "_", (lexer.has("rbr") ? { type: "rbr" } : rbr)], "postprocess": ([, , wqname]) => ({
                type: 'attrPresence',
                name: wqname.name,
                namespace: wqname.namespace,
                specificity: [0, 1, 0]
            })
        },
        { "name": "attrValueSelector", "symbols": [(lexer.has("lbr") ? { type: "lbr" } : lbr), "_", "wqname", "_", "attrMatcher", "_", "attrValue", "_", (lexer.has("rbr") ? { type: "rbr" } : rbr)], "postprocess": ([, , wqname, , matcher, , v]) => ({
                type: 'attrValue',
                name: wqname.name,
                namespace: wqname.namespace,
                matcher: matcher,
                value: v.value,
                modifier: v.modifier,
                specificity: [0, 1, 0]
            })
        },
        { "name": "attrMatcher", "symbols": [(lexer.has("eq") ? { type: "eq" } : eq)], "postprocess": () => '=' },
        { "name": "attrMatcher", "symbols": [(lexer.has("tilde") ? { type: "tilde" } : tilde), (lexer.has("eq") ? { type: "eq" } : eq)], "postprocess": () => '~=' },
        { "name": "attrMatcher", "symbols": [(lexer.has("vbar") ? { type: "vbar" } : vbar), (lexer.has("eq") ? { type: "eq" } : eq)], "postprocess": () => '|=' },
        { "name": "attrMatcher", "symbols": [(lexer.has("caret") ? { type: "caret" } : caret), (lexer.has("eq") ? { type: "eq" } : eq)], "postprocess": () => '^=' },
        { "name": "attrMatcher", "symbols": [(lexer.has("dollar") ? { type: "dollar" } : dollar), (lexer.has("eq") ? { type: "eq" } : eq)], "postprocess": () => '$=' },
        { "name": "attrMatcher", "symbols": [(lexer.has("asterisk") ? { type: "asterisk" } : asterisk), (lexer.has("eq") ? { type: "eq" } : eq)], "postprocess": () => '*=' },
        { "name": "attrValue", "symbols": ["str"], "postprocess": ([v]) => ({ value: v, modifier: null }) },
        { "name": "attrValue", "symbols": ["idn"], "postprocess": ([v]) => ({ value: v, modifier: null }) },
        { "name": "attrValue", "symbols": ["str", "_", "attrModifier"], "postprocess": ([v, , mod]) => ({ value: v, modifier: mod }) },
        { "name": "attrValue", "symbols": ["idn", "__", "attrModifier"], "postprocess": ([v, , mod]) => ({ value: v, modifier: mod }) },
        { "name": "attrModifier", "symbols": [{ "literal": "i" }], "postprocess": () => 'i' },
        { "name": "attrModifier", "symbols": [{ "literal": "I" }], "postprocess": () => 'i' },
        { "name": "attrModifier", "symbols": [{ "literal": "s" }], "postprocess": () => 's' },
        { "name": "attrModifier", "symbols": [{ "literal": "S" }], "postprocess": () => 's' },
        { "name": "idSelector", "symbols": [(lexer.has("hashToken") ? { type: "hashToken" } : hashToken)], "postprocess": ([{ value: name }]) => ({ type: 'id', name: name, specificity: [1, 0, 0] }) },
        { "name": "classSelector", "symbols": [(lexer.has("fullstop") ? { type: "fullstop" } : fullstop), "idn"], "postprocess": ([, name]) => ({ type: 'class', name: name, specificity: [0, 1, 0] }) },
        { "name": "tagSelector", "symbols": ["wqname"], "postprocess": ([wqname]) => ({
                type: 'tag',
                name: wqname.name,
                namespace: wqname.namespace,
                specificity: [0, 0, 1]
            })
        },
        { "name": "uniSelector", "symbols": [(lexer.has("asterisk") ? { type: "asterisk" } : asterisk)], "postprocess": () => ({ type: 'universal', namespace: null, specificity: [0, 0, 0] }) },
        { "name": "uniSelector", "symbols": ["ns", (lexer.has("asterisk") ? { type: "asterisk" } : asterisk)], "postprocess": ([ns]) => ({ type: 'universal', namespace: ns, specificity: [0, 0, 0] }) },
        { "name": "wqname", "symbols": ["idn"], "postprocess": ([name]) => ({ name: name, namespace: null }) },
        { "name": "wqname", "symbols": ["ns", "idn"], "postprocess": ([ns, name]) => ({ name: name, namespace: ns }) },
        { "name": "ns", "symbols": [(lexer.has("vbar") ? { type: "vbar" } : vbar)], "postprocess": () => '' },
        { "name": "ns", "symbols": ["idn", (lexer.has("vbar") ? { type: "vbar" } : vbar)], "postprocess": id },
        { "name": "str", "symbols": [(lexer.has("str1") ? { type: "str1" } : str1)], "postprocess": firstTokenValue },
        { "name": "str", "symbols": [(lexer.has("str2") ? { type: "str2" } : str2)], "postprocess": firstTokenValue },
        { "name": "idn", "symbols": [(lexer.has("idn") ? { type: "idn" } : idn)], "postprocess": firstTokenValue },
        { "name": "_$ebnf$1", "symbols": [(lexer.has("ws") ? { type: "ws" } : ws)], "postprocess": id },
        { "name": "_$ebnf$1", "symbols": [], "postprocess": () => null },
        { "name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null },
        { "name": "__", "symbols": [(lexer.has("ws") ? { type: "ws" } : ws)], "postprocess": () => null }
    ],
    ParserStart: "main",
};

var ast = /*#__PURE__*/Object.freeze({
    __proto__: null
});

// Passing the start argument to a parser or grammar constructor
// doesn't seem to work as expected.
const compiledRulesNoList = { ...grammar, ParserStart: 'mainNoList' };
/**
 * Parse a CSS selector string.
 *
 * This function supports comma-separated selector lists
 * and always returns an AST starting from a node of type `list`.
 *
 * @param str - CSS selector string (can contain commas).
 */
function parse(str) {
    return _parse(grammar, str);
}
/**
 * Parse a CSS selector string.
 *
 * This function does not support comma-separated selector lists
 * and always returns an AST starting from a node of type `compound`.
 *
 * @param str - CSS selector string (no commas).
 */
function parse1(str) {
    return _parse(compiledRulesNoList, str);
}
function _parse(compiledRules1, str) {
    const parser = new Parser(Grammar.fromCompiled(compiledRules1));
    parser.feed(str);
    if (parser.results.length === 0) {
        throw new Error('Failed to parse - input string might be incomplete.');
    }
    return parser.results[0];
}
/**
 * Convert a selector AST back to a string representation.
 *
 * Note: formatting is not preserved in the AST.
 *
 * @param selector - A selector AST object.
 */
function serialize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch (selector.type) {
        case 'universal':
            return _serNs(selector.namespace) + '*';
        case 'tag':
            return _serNs(selector.namespace) + selector.name;
        case 'class':
            return '.' + selector.name;
        case 'id':
            return '#' + selector.name;
        case 'attrPresence':
            return `[${_serNs(selector.namespace)}${selector.name}]`;
        case 'attrValue':
            return `[${_serNs(selector.namespace)}${selector.name}${selector.matcher}${_serStr(selector.value)}${(selector.modifier ? selector.modifier : '')}]`;
        case 'combinator':
            return serialize(selector.left) + selector.combinator;
        case 'compound':
            return selector.list.reduce((acc, node) => {
                if (node.type === 'combinator') {
                    return serialize(node) + acc;
                }
                else {
                    return acc + serialize(node);
                }
            }, '');
        case 'list':
            return selector.list.map(serialize).join(',');
    }
}
function _serNs(ns) {
    return (ns || ns === '')
        ? ns + '|'
        : '';
}
function _serStr(str) {
    if (str.indexOf('"') === -1) {
        return `"${str}"`;
    }
    else if (str.indexOf("'") === -1) {
        return `'${str}'`;
    }
    else {
        return `"${str.replace('"', '\\"')}"`;
    }
}
/**
 * Modifies the given AST **in place** to have all internal arrays
 * in a stable order. Returns the AST.
 *
 * Intended for consitent processing and normalized `serialize()` output.
 *
 * @param selector - A selector AST object.
 */
function normalize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch (selector.type) {
        case 'compound': {
            selector.list.forEach(normalize);
            selector.list.sort((a, b) => _compareArrays(_getSelectorPriority(a), _getSelectorPriority(b)));
            break;
        }
        case 'combinator': {
            normalize(selector.left);
            break;
        }
        case 'list': {
            selector.list.forEach(normalize);
            selector.list.sort((a, b) => (serialize(a) < serialize(b)) ? -1 : 1);
            break;
        }
    }
    return selector;
}
function _getSelectorPriority(selector) {
    switch (selector.type) {
        case 'universal':
            return [1];
        case 'tag':
            return [1];
        case 'id':
            return [2];
        case 'class':
            return [3, selector.name];
        case 'attrPresence':
            return [4, serialize(selector)];
        case 'attrValue':
            return [5, serialize(selector)];
        case 'combinator':
            return [15, serialize(selector)];
    }
}
/**
 * Compare selectors based on their specificity.
 *
 * Usable as a comparator for sorting.
 *
 * @param a - First selector.
 * @param b - Second selector.
 */
function compareSelectors(a, b) {
    return _compareArrays(a.specificity, b.specificity);
}
/**
 * Compare specificity values without reducing them
 * as arbitrary base numbers.
 *
 * Usable as a comparator for sorting.
 *
 * @param a - First specificity value.
 * @param b - Second specificity value.
 */
function compareSpecificity(a, b) {
    return _compareArrays(a, b);
}
function _compareArrays(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        throw new Error('Arguments must be arrays.');
    }
    const shorter = (a.length < b.length) ? a.length : b.length;
    for (let i = 0; i < shorter; i++) {
        if (a[i] === b[i]) {
            continue;
        }
        return (a[i] < b[i]) ? -1 : 1;
    }
    return a.length - b.length;
}

export { ast as Ast, compareSelectors, compareSpecificity, normalize, parse, parse1, serialize };
