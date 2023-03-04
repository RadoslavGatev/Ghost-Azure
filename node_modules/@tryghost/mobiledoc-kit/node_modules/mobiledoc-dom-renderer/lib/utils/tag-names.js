import {
  MARKUP_SECTION_TYPE,
  LIST_SECTION_TYPE
} from './section-types';
import { normalizeTagName } from './dom';

const MARKUP_SECTION_TAG_NAMES = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pull-quote', 'aside'
].map(normalizeTagName);

const MARKUP_SECTION_ELEMENT_NAMES = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'aside'
].map(normalizeTagName);

const LIST_SECTION_TAG_NAMES = [
  'ul', 'ol'
].map(normalizeTagName);

const MARKUP_TYPES = [
  'b', 'i', 'strong', 'em', 'a', 'u', 'sub', 'sup', 's', 'code'
].map(normalizeTagName);

function contains(array, item) {
  return array.indexOf(item) !== -1;
}

export function isValidSectionTagName(tagName, sectionType) {
  tagName = normalizeTagName(tagName);

  switch (sectionType) {
    case MARKUP_SECTION_TYPE:
      return contains(MARKUP_SECTION_TAG_NAMES, tagName);
    case LIST_SECTION_TYPE:
      return contains(LIST_SECTION_TAG_NAMES, tagName);
    default:
      throw new Error(`Cannot validate tagName for unknown section type "${sectionType}"`);
  }
}

export function isMarkupSectionElementName(tagName) {
  tagName = normalizeTagName(tagName);
  return contains(MARKUP_SECTION_ELEMENT_NAMES, tagName);
}

export function isValidMarkerType(type) {
  type = normalizeTagName(type);
  return contains(MARKUP_TYPES, type);
}
