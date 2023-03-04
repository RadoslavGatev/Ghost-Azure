/**
 * runtime Text renderer
 * renders a mobiledoc to Text
 *
 * input: mobiledoc
 * output: Text (string)
 */
import ImageCard from '../cards/image';
import RENDER_TYPE from '../utils/render-type';

const LINE_BREAK = '\n';

import {
  MARKUP_SECTION_TYPE,
  LIST_SECTION_TYPE,
  CARD_SECTION_TYPE,
  IMAGE_SECTION_TYPE
} from '../utils/section-types';

import {
  MARKUP_MARKER_TYPE,
  ATOM_MARKER_TYPE
} from '../utils/marker-types';

export const MOBILEDOC_VERSION_0_3 = '0.3.0';
export const MOBILEDOC_VERSION_0_3_1 = '0.3.1';
export const MOBILEDOC_VERSION_0_3_2 = '0.3.2';

function validateVersion(version) {
  if (
    version !== MOBILEDOC_VERSION_0_3 &&
    version !== MOBILEDOC_VERSION_0_3_1 &&
    version !== MOBILEDOC_VERSION_0_3_2
  ) {
    throw new Error(`Unexpected Mobiledoc version "${version}"`);
  }
}

export default class Renderer {
  constructor(mobiledoc, state) {

    let { cards, cardOptions, atoms, unknownCardHandler, unknownAtomHandler } = state;
    let { version, sections, atoms: atomTypes, cards: cardTypes } = mobiledoc;
    validateVersion(version);

    this.root               = [];
    this.sections           = sections;
    this.atomTypes          = atomTypes;
    this.cardTypes          = cardTypes;
    this.cards              = cards;
    this.atoms              = atoms;
    this.cardOptions        = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;
    this.unknownAtomHandler = unknownAtomHandler || this._defaultUnknownAtomHandler;

    this._teardownCallbacks  = [];
  }

  render() {
    this.sections.forEach(section => {
      this.root.push(this.renderSection(section));
    });

    let result = this.root.join(LINE_BREAK);
    return { result, teardown: () => this.teardown() };
  }

  teardown() {
    for (let i=0; i < this._teardownCallbacks.length; i++) {
      this._teardownCallbacks[i]();
    }
  }

  get _defaultUnknownCardHandler() {
    return () => {
      // for the text renderer, a missing card is a no-op
    };
  }

  get _defaultUnknownAtomHandler() {
    return ({ value }) => {
      return value || '';
    };
  }

  renderSection(section) {
    const [type] = section;
    switch (type) {
      case MARKUP_SECTION_TYPE:
        return  this.renderMarkupSection(section);
      case IMAGE_SECTION_TYPE:
        return this.renderImageSection(section);
      case LIST_SECTION_TYPE:
        return this.renderListSection(section);
      case CARD_SECTION_TYPE:
        return this.renderCardSection(section);
      default:
        throw new Error('Unimplemented renderer for type ' + type);
    }
  }

  renderImageSection() {
    return '';
  }

  renderListSection([type, tagName, items]) {
    return items.map(
      li => this.renderListItem(li)
    ).join(LINE_BREAK);
  }

  renderListItem(markers) {
    return this.renderMarkers(markers);
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

  renderCardSection([type, index]) {
    let { card, payload } = this._findCardByIndex(index);

    let cardArg = this._createCardArgument(card, payload);
    let rendered = card.render(cardArg);

    this._validateCardRender(rendered, card.name);

    return rendered || '';
  }

  _validateCardRender(rendered, cardName) {
    if (!rendered) {
      return;
    }

    if (typeof rendered !== 'string') {
      throw new Error(`Card "${cardName}" must render ${RENDER_TYPE}, but result was ${typeof rendered}"`);
    }
  }

  _registerTeardownCallback(callback) {
    this._teardownCallbacks.push(callback);
  }

  _createCardArgument(card, payload={}) {
    let env = {
      name: card.name,
      isInEditor: false,
      onTeardown: (callback) => this._registerTeardownCallback(callback)
    };

    let options = this.cardOptions;

    return { env, options, payload };
  }

  renderMarkupSection([type, tagName, markers]) {
    return this.renderMarkers(markers);
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
      onTeardown: (callback) => this._registerTeardownCallback(callback)
    };

    let options = this.cardOptions;

    return { env, options, value, payload };
  }

  _validateAtomRender(rendered, atomName) {
    if (!rendered) {
      return;
    }

    if (typeof rendered !== 'string') {
      throw new Error(`Atom "${atomName}" must render ${RENDER_TYPE}, but result was ${typeof rendered}"`);
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

    return rendered || '';
  }

  renderMarkers(markers) {
    let str = '';
    markers.forEach(m => {
      let [type, , , value] = m;
      switch (type) {
        case MARKUP_MARKER_TYPE:
          str += value;
          break;
        case ATOM_MARKER_TYPE:
          str += this._renderAtom(value);
          break;
        default:
          throw new Error(`Unknown markup type (${type})`);
      }
    });
    return str;
  }
}
