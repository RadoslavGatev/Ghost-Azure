import { createTextNode } from '../utils/dom';
import ImageCard from '../cards/image';
import RENDER_TYPE from '../utils/render-type';
import {
  MARKUP_SECTION_TYPE,
  IMAGE_SECTION_TYPE,
  LIST_SECTION_TYPE,
  CARD_SECTION_TYPE
} from '../utils/section-types';
import {
  isValidSectionTagName,
  isValidMarkerType
} from '../utils/tag-names';
import {
  reduceAttributes
} from '../utils/sanitization-utils';
import {
  defaultSectionElementRenderer,
  defaultMarkupElementRenderer
} from '../utils/render-utils';

import {
  MARKUP_MARKER_TYPE,
  ATOM_MARKER_TYPE
} from '../utils/marker-types';

export const MOBILEDOC_VERSION_0_3_0 = '0.3.0';
export const MOBILEDOC_VERSION_0_3_1 = '0.3.1';
export const MOBILEDOC_VERSION_0_3_2 = '0.3.2';

const IMAGE_SECTION_TAG_NAME = 'img';

function validateVersion(version) {
  switch (version) {
    case MOBILEDOC_VERSION_0_3_0:
    case MOBILEDOC_VERSION_0_3_1:
    case MOBILEDOC_VERSION_0_3_2:
      return;
    default:
      throw new Error(`Unexpected Mobiledoc version "${version}"`);
  }
}

export default class Renderer {
  constructor(mobiledoc, state) {

    let {
      cards,
      cardOptions,
      atoms,
      unknownCardHandler,
      unknownAtomHandler,
      markupElementRenderer,
      sectionElementRenderer,
      dom
    } = state;
    let {
      version,
      sections,
      atoms: atomTypes,
      cards: cardTypes,
      markups: markerTypes
    } = mobiledoc;
    validateVersion(version);

    this.dom                = dom;
    this.root               = this.dom.createDocumentFragment();
    this.sections           = sections;
    this.atomTypes          = atomTypes;
    this.cardTypes          = cardTypes;
    this.markerTypes        = markerTypes;
    this.cards              = cards;
    this.atoms              = atoms;
    this.cardOptions        = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;
    this.unknownAtomHandler = unknownAtomHandler || this._defaultUnknownAtomHandler;

    this.sectionElementRenderer = {
      '__default__': defaultSectionElementRenderer
    };
    Object.keys(sectionElementRenderer).forEach(key => {
      this.sectionElementRenderer[key.toLowerCase()] = sectionElementRenderer[key];
    });

    this.markupElementRenderer = {
      '__default__': defaultMarkupElementRenderer
    };
    Object.keys(markupElementRenderer).forEach(key => {
      this.markupElementRenderer[key.toLowerCase()] = markupElementRenderer[key];
    });

    this._renderCallbacks = [];
    this._teardownCallbacks  = [];
  }

  get _defaultUnknownCardHandler() {
    return ({env: {name}}) => {
      throw new Error(`Card "${name}" not found but no unknownCardHandler was registered`);
    };
  }

  get _defaultUnknownAtomHandler() {
    return ({env: {name}}) => {
      throw new Error(`Atom "${name}" not found but no unknownAtomHandler was registered`);
    };
  }

  render() {
    this.sections.forEach(section => {
      let rendered = this.renderSection(section);
      if (rendered) {
        this.root.appendChild(rendered);
      }
    });
    for (let i=0; i < this._renderCallbacks.length; i++) {
      this._renderCallbacks[i]();
    }
    // maintain a reference to child nodes so they can be cleaned up later by teardown
    this._renderedChildNodes = Array.prototype.slice.call(this.root.childNodes);
    return { result: this.root, teardown: () => this.teardown() };
  }

  teardown() {
    for (let i=0; i < this._teardownCallbacks.length; i++) {
      this._teardownCallbacks[i]();
    }
    for (let i=0; i < this._renderedChildNodes.length; i++) {
      let node = this._renderedChildNodes[i];
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }
  }

  renderSection(section) {
    const [type] = section;
    switch (type) {
      case MARKUP_SECTION_TYPE:
        return this.renderMarkupSection(section);
      case IMAGE_SECTION_TYPE:
        return this.renderImageSection(section);
      case LIST_SECTION_TYPE:
        return this.renderListSection(section);
      case CARD_SECTION_TYPE:
        return this.renderCardSection(section);
      default:
        throw new Error(`Cannot render mobiledoc section of type "${type}"`);
    }
  }

  renderMarkersOnElement(element, markers) {
    let elements = [element];
    let currentElement = element;

    let pushElement = (openedElement) => {
      currentElement.appendChild(openedElement);
      elements.push(openedElement);
      currentElement = openedElement;
    };

    for (let i=0, l=markers.length; i<l; i++) {
      let marker = markers[i];
      let [type, openTypes, closeCount, value] = marker;

      for (let j=0, m=openTypes.length; j<m; j++) {
        let markerType = this.markerTypes[openTypes[j]];
        let [tagName, attrs=[]] = markerType;

        if (isValidMarkerType(tagName)) {
          pushElement(this.renderMarkupElement(tagName, attrs));
        } else {
          closeCount--;
        }
      }

      switch (type) {
        case MARKUP_MARKER_TYPE:
          currentElement.appendChild(createTextNode(this.dom, value));
          break;
        case ATOM_MARKER_TYPE:
          currentElement.appendChild(this._renderAtom(value));
          break;
        default:
          throw new Error(`Unknown markup type (${type})`);
      }

      for (let j=0, m=closeCount; j<m; j++) {
        elements.pop();
        currentElement = elements[elements.length - 1];
      }
    }
  }

  /**
   * @param attrs Array
   */
  renderMarkupElement(tagName, attrs) {
    tagName = tagName.toLowerCase();
    attrs   = reduceAttributes(attrs);

    let renderer = this.markupElementRendererFor(tagName);
    return renderer(tagName, this.dom, attrs);
  }

  markupElementRendererFor(tagName) {
    return this.markupElementRenderer[tagName] ||
      this.markupElementRenderer.__default__;
  }

  renderListItem(markers) {
    const element = this.dom.createElement('li');
    this.renderMarkersOnElement(element, markers);
    return element;
  }

  renderListSection([type, tagName, listItems]) {
    if (!isValidSectionTagName(tagName, LIST_SECTION_TYPE)) {
      return;
    }
    const element = this.dom.createElement(tagName);
    listItems.forEach(li => {
      element.appendChild(this.renderListItem(li));
    });
    return element;
  }

  renderImageSection([type, src]) {
    let element = this.dom.createElement(IMAGE_SECTION_TAG_NAME);
    element.src = src;
    return element;
  }

  findCard(name) {
    for (let i=0; i < this.cards.length; i++) {
      if (this.cards[i].name === name) {
        return this.cards[i];
      }
    }
    if (name === ImageCard.name) {
      return ImageCard;
    }
    return this._createUnknownCard(name);
  }

  _findCardByIndex(index) {
    let cardType = this.cardTypes[index];
    if (!cardType) {
      throw new Error(`No card definition found at index ${index}`);
    }

    let [ name, payload ] = cardType;
    let card = this.findCard(name);

    return {
      card,
      payload
    };
  }

  _createUnknownCard(name) {
    return {
      name,
      type: RENDER_TYPE,
      render: this.unknownCardHandler
    };
  }

  _createCardArgument(card, payload={}) {
    let env = {
      name: card.name,
      isInEditor: false,
      dom: this.dom,
      didRender: (callback) => this._registerRenderCallback(callback),
      onTeardown: (callback) => this._registerTeardownCallback(callback)
    };

    let options = this.cardOptions;

    return { env, options, payload };
  }

  _registerTeardownCallback(callback) {
    this._teardownCallbacks.push(callback);
  }

  _registerRenderCallback(callback) {
    this._renderCallbacks.push(callback);
  }

  renderCardSection([type, index]) {
    let { card, payload } = this._findCardByIndex(index);

    let cardArg = this._createCardArgument(card, payload);
    let rendered = card.render(cardArg);

    this._validateCardRender(rendered, card.name);

    return rendered;
  }

  _validateCardRender(rendered, cardName) {
    if (!rendered) {
      return;
    }

    if (typeof rendered !== 'object') {
      throw new Error(`Card "${cardName}" must render ${RENDER_TYPE}, but result was "${rendered}"`);
    }
  }

  findAtom(name) {
    for (let i=0; i < this.atoms.length; i++) {
      if (this.atoms[i].name === name) {
        return this.atoms[i];
      }
    }
    return this._createUnknownAtom(name);
  }

  _createUnknownAtom(name) {
    return {
      name,
      type: RENDER_TYPE,
      render: this.unknownAtomHandler
    };
  }

  _createAtomArgument(atom, value, payload) {
    let env = {
      name: atom.name,
      isInEditor: false,
      dom: this.dom,
      onTeardown: (callback) => this._registerTeardownCallback(callback)
    };

    let options = this.cardOptions;

    return { env, options, value, payload };
  }

  _validateAtomRender(rendered, atomName) {
    if (!rendered) {
      return;
    }

    if (typeof rendered !== 'object') {
      throw new Error(`Atom "${atomName}" must render ${RENDER_TYPE}, but result was "${rendered}"`);
    }
  }

  _findAtomByIndex(index) {
    let atomType = this.atomTypes[index];
    if (!atomType) {
      throw new Error(`No atom definition found at index ${index}`);
    }

    let [ name, value, payload ] = atomType;
    let atom = this.findAtom(name);

    return {
      atom,
      value,
      payload
    };
  }

  _renderAtom(index) {
    let { atom, value, payload } = this._findAtomByIndex(index);

    let atomArg = this._createAtomArgument(atom, value, payload);
    let rendered = atom.render(atomArg);

    this._validateAtomRender(rendered, atom.name);

    return rendered || createTextNode(this.dom, '');
  }

  renderMarkupSection([type, tagName, markers, attributes = []]) {
    tagName = tagName.toLowerCase();
    if (!isValidSectionTagName(tagName, MARKUP_SECTION_TYPE)) {
      return;
    }

    let attrsObj = reduceAttributes(attributes);
    let renderer = this.sectionElementRendererFor(tagName);
    let element = renderer(tagName, this.dom, attrsObj);

    this.renderMarkersOnElement(element, markers);
    return element;
  }

  sectionElementRendererFor(tagName) {
    return this.sectionElementRenderer[tagName] ||
      this.sectionElementRenderer.__default__;
  }
}

