'use strict';

exports.isValidSectionTagName = isValidSectionTagName;
exports.isMarkupSectionElementName = isMarkupSectionElementName;
exports.isValidMarkerType = isValidMarkerType;

var _sectionTypes = require('./section-types');

var _dom = require('./dom');

var MARKUP_SECTION_TAG_NAMES = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pull-quote', 'aside'].map(_dom.normalizeTagName);

var MARKUP_SECTION_ELEMENT_NAMES = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'aside'].map(_dom.normalizeTagName);

var LIST_SECTION_TAG_NAMES = ['ul', 'ol'].map(_dom.normalizeTagName);

var MARKUP_TYPES = ['b', 'i', 'strong', 'em', 'a', 'u', 'sub', 'sup', 's', 'code'].map(_dom.normalizeTagName);

function contains(array, item) {
  return array.indexOf(item) !== -1;
}

function isValidSectionTagName(tagName, sectionType) {
  tagName = (0, _dom.normalizeTagName)(tagName);

  switch (sectionType) {
    case _sectionTypes.MARKUP_SECTION_TYPE:
      return contains(MARKUP_SECTION_TAG_NAMES, tagName);
    case _sectionTypes.LIST_SECTION_TYPE:
      return contains(LIST_SECTION_TAG_NAMES, tagName);
    default:
      throw new Error('Cannot validate tagName for unknown section type "' + sectionType + '"');
  }
}

function isMarkupSectionElementName(tagName) {
  tagName = (0, _dom.normalizeTagName)(tagName);
  return contains(MARKUP_SECTION_ELEMENT_NAMES, tagName);
}

function isValidMarkerType(type) {
  type = (0, _dom.normalizeTagName)(type);
  return contains(MARKUP_TYPES, type);
}