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

export const MOBILEDOC_VERSION = '0.2.0';

function validateVersion(version) {
  if (version !== MOBILEDOC_VERSION) {
    throw new Error(`Unexpected Mobiledoc version "${version}"`);
  }
}

export default class Renderer {
  constructor(mobiledoc, state) {
    let { cards, cardOptions, atoms, unknownCardHandler } = state;
    let { version, sections: sectionData } = mobiledoc;
    validateVersion(version);

    let [, sections] = sectionData;

    this.root               = [];
    this.sections           = sections;
    this.cards              = cards;
    this.atoms              = atoms;
    this.cardOptions        = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;

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

  _createUnknownCard(name) {
    return {
      name,
      type: RENDER_TYPE,
      render: this.unknownCardHandler
    };
  }

  renderCardSection([type, name, payload]) {
    let card = this.findCard(name);

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

  renderMarkers(markers) {
    let str = '';
    markers.forEach(m => {
      let [, , text] = m;
      str += text;
    });
    return str;
  }
}
