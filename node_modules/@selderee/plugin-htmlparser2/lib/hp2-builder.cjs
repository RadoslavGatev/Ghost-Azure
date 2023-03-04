'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var domhandler = require('domhandler');
var selderee = require('selderee');

/**
 * A {@link BuilderFunction} implementation.
 *
 * Creates a function (in a {@link Picker} wrapper) that can run
 * the decision tree against `htmlparser2` `Element` nodes.
 *
 * @typeParam V - the type of values associated with selectors.
 *
 * @param nodes - nodes ({@link DecisionTreeNode})
 * from the root level of the decision tree.
 *
 * @returns a {@link Picker} object.
 */
function hp2Builder(nodes) {
    return new selderee.Picker(handleArray(nodes));
}
// ==============================================
function handleArray(nodes) {
    const matchers = nodes.map(handleNode);
    return (el, ...tail) => flatMap(matchers, m => m(el, ...tail));
}
function handleNode(node) {
    switch (node.type) {
        case 'terminal': {
            const result = [node.valueContainer];
            return (el, ...tail) => result;
        }
        case 'tagName':
            return handleTagName(node);
        case 'attrValue':
            return handleAttrValueName(node);
        case 'attrPresence':
            return handleAttrPresenceName(node);
        case 'pushElement':
            return handlePushElementNode(node);
        case 'popElement':
            return handlePopElementNode(node);
    }
}
function handleTagName(node) {
    const variants = {};
    for (const variant of node.variants) {
        variants[variant.value] = handleArray(variant.cont);
    }
    return (el, ...tail) => {
        const continuation = variants[el.name];
        return (continuation) ? continuation(el, ...tail) : [];
    };
}
function handleAttrPresenceName(node) {
    const attrName = node.name;
    const continuation = handleArray(node.cont);
    return (el, ...tail) => (Object.prototype.hasOwnProperty.call(el.attribs, attrName))
        ? continuation(el, ...tail)
        : [];
}
function handleAttrValueName(node) {
    const callbacks = [];
    for (const matcher of node.matchers) {
        const predicate = matcher.predicate;
        const continuation = handleArray(matcher.cont);
        callbacks.push((attr, el, ...tail) => (predicate(attr) ? continuation(el, ...tail) : []));
    }
    const attrName = node.name;
    return (el, ...tail) => {
        const attr = el.attribs[attrName];
        return (attr || attr === '')
            ? flatMap(callbacks, cb => cb(attr, el, ...tail))
            : [];
    };
}
function handlePushElementNode(node) {
    const continuation = handleArray(node.cont);
    const leftElementGetter = (node.combinator === '+')
        ? getPrecedingElement
        : getParentElement;
    return (el, ...tail) => {
        const next = leftElementGetter(el);
        if (next === null) {
            return [];
        }
        return continuation(next, el, ...tail);
    };
}
const getPrecedingElement = (el) => {
    const prev = el.prev;
    if (prev === null) {
        return null;
    }
    return (domhandler.isTag(prev)) ? prev : getPrecedingElement(prev);
};
const getParentElement = (el) => {
    const parent = el.parent;
    return (parent && domhandler.isTag(parent)) ? parent : null;
};
function handlePopElementNode(node) {
    const continuation = handleArray(node.cont);
    return (el, next, ...tail) => continuation(next, ...tail);
}
// Can be removed after transition to Node 12.
function flatMap(items, mapper) {
    return [].concat(...amap(items, mapper));
}
function amap(items, mapper) {
    const len = items.length;
    const res = new Array(len);
    for (let i = 0; i < len; i++) {
        res[i] = mapper(items[i]);
    }
    return res;
}

exports.hp2Builder = hp2Builder;
