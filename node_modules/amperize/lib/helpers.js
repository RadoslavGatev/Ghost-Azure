'use strict';

var node = ['tag', 'script', 'style'],
    singular = [
        'area', 'base', 'br', 'col', 'command', 'embed', 'hr',
        'img', 'input', 'link', 'meta', 'param', 'source', 'wbr',
        'track'
    ];

function attributes(element) {
    var attr = element.attribs;

    if (!attr || typeof attr !== 'object') {
        return '';
    }

    return Object.keys(attr).reduce(function (result, key) {
        return result + ' ' + key + '="' + attr[key] + '"';
    }, '');
}

exports.tag = exports.script = exports.style = function tag(element) {
    return '<' + element.name + attributes(element) + '>';
};

exports.text = function text(element) {
    return element.data;
};

exports.comment = function comment(element) {
    return '<!--' + element.data + '-->';
};

exports.directive = function directive(element) {
    return '<' + element.data + '>';
};

exports.close = function close(element) {
    return ~node.indexOf(element.type) && !~singular.indexOf(element.name)
        ? '</' + element.name + '>'
        : '';
};
