'use strict';

exports.createTextNode = createTextNode;
exports.normalizeTagName = normalizeTagName;
function addHTMLSpaces(text) {
  var nbsp = ' ';
  return text.replace(/  /g, ' ' + nbsp);
}

function createTextNode(dom, text) {
  return dom.createTextNode(addHTMLSpaces(text));
}

function normalizeTagName(tagName) {
  return tagName.toLowerCase();
}