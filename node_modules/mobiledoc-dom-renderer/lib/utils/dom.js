const NBSP = '\u00A0';
const EMSP = '\u2003';

function prepareText(text) {
  return text.replace(/  /g, ' ' + NBSP).replace(/\t/g, EMSP);
}

export function createTextNode(dom, text) {
  return dom.createTextNode(prepareText(text));
}

export function normalizeTagName(tagName) {
  return tagName.toLowerCase();
}
