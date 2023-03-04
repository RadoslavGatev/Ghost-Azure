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

export const MOBILEDOC_VERSION = '0.2.0';

const IMAGE_SECTION_TAG_NAME = 'img';

function validateVersion(version) {
  if (version !== MOBILEDOC_VERSION) {
    throw new Error(`Unexpected Mobiledoc version "${version}"`);
  }
}

export default class Renderer {
  constructor(mobiledoc, options) {
    let {
      cards,
      cardOptions,
      unknownCardHandler,
      markupElementRenderer,
      sectionElementRenderer,
      dom
    } = options;
    let {
      version,
      sections: sectionData
    } = mobiledoc;
    validateVersion(version);

    const [markerTypes, sections] = sectionData;

    this.dom                = dom;
    this.root               = dom.createDocumentFragment();
    this.markerTypes        = markerTypes;
    this.sections           = sections;
    this.cards              = cards;
    this.cardOptions        = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;

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

    this._renderCallbacks    = [];
    this._teardownCallbacks  = [];
    this._renderedChildNodes = [];
  }

  get _defaultUnknownCardHandler() {
    return ({env: {name}}) => {
      throw new Error(`Card "${name}" not found but no unknownCardHandler was registered`);
    };
  }

  render() {
    this.sections.forEach(section => {
      let rendered = this.renderSection(section);
      if (rendered) {
        this.root.appendChild(rendered);
      }
    });
    for (let i = 0; i < this._renderCallbacks.length; i++) {
      this._renderCallbacks[i]();
    }
    // maintain a reference to child nodes so they can be cleaned up later by teardown
    this._renderedChildNodes = [];
    let node = this.root.firstChild;
    while (node) {
      this._renderedChildNodes.push(node);
      node = node.nextSibling;
    }
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
      let [openTypes, closeCount, text] = marker;

      for (let j=0, m=openTypes.length; j<m; j++) {
        let markerType = this.markerTypes[openTypes[j]];
        let [tagName, attrs=[]] = markerType;
        if (isValidMarkerType(tagName)) {
          pushElement(this.renderMarkupElement(tagName, attrs));
        } else {
          closeCount--;
        }
      }

      currentElement.appendChild(createTextNode(this.dom, text));

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

  _registerRenderCallback(callback) {
    this._renderCallbacks.push(callback);
  }

  _registerTeardownCallback(callback) {
    this._teardownCallbacks.push(callback);
  }

  renderCardSection([type, name, payload]) {
    let card = this.findCard(name);

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

  renderMarkupSection([type, tagName, markers]) {
    tagName = tagName.toLowerCase();
    if (!isValidSectionTagName(tagName, MARKUP_SECTION_TYPE)) {
      return;
    }

    let renderer = this.sectionElementRendererFor(tagName);
    let element = renderer(tagName, this.dom);

    this.renderMarkersOnElement(element, markers);
    return element;
  }

  sectionElementRendererFor(tagName) {
    return this.sectionElementRenderer[tagName] ||
      this.sectionElementRenderer.__default__;
  }
}

