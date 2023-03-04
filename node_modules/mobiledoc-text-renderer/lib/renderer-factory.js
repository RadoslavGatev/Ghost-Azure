import Renderer_0_2, {
  MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_2
} from './renderers/0-2';
import Renderer_0_3, {
  MOBILEDOC_VERSION_0_3,
  MOBILEDOC_VERSION_0_3_1,
  MOBILEDOC_VERSION_0_3_2
} from './renderers/0-3';
import RENDER_TYPE from './utils/render-type';
/**
 * runtime Text renderer
 * renders a mobiledoc to Text
 *
 * input: mobiledoc
 * output: Text (string)
 */

function validateCards(cards) {
  if (!Array.isArray(cards)) {
    throw new Error('`cards` must be passed as an array');
  }
  for (let i=0; i < cards.length; i++) {
    let card = cards[i];
    if (card.type !== RENDER_TYPE) {
      throw new Error(`Card "${card.name}" must be type "${RENDER_TYPE}", was "${card.type}"`);
    }
    if (!card.render) {
      throw new Error(`Card "${card.name}" must define \`render\``);
    }
  }
}

function validateAtoms(atoms) {
  if (!Array.isArray(atoms)) {
    throw new Error('`atoms` must be passed as an array');
  }
  for (let i=0; i < atoms.length; i++) {
    let atom = atoms[i];
    if (atom.type !== RENDER_TYPE) {
      throw new Error(`Atom "${atom.name}" must be type "${RENDER_TYPE}", was "${atom.type}"`);
    }
    if (!atom.render) {
      throw new Error(`Atom "${atom.name}" must define \`render\``);
    }
  }
}

export default class RendererFactory {
  constructor({cards, atoms, cardOptions, unknownCardHandler, unknownAtomHandler}={}) {
    cards = cards || [];
    validateCards(cards);
    atoms = atoms || [];
    validateAtoms(atoms);
    cardOptions = cardOptions || {};

    this.state = {cards, atoms, cardOptions, unknownCardHandler, unknownAtomHandler};
  }

  render(mobiledoc) {
    let { version } = mobiledoc;
    switch (version) {
      case MOBILEDOC_VERSION_0_2:
        return new Renderer_0_2(mobiledoc, this.state).render();
      case undefined:
      case null:
      case MOBILEDOC_VERSION_0_3:
      case MOBILEDOC_VERSION_0_3_1:
      case MOBILEDOC_VERSION_0_3_2:
        return new Renderer_0_3(mobiledoc, this.state).render();
      default:
        throw new Error(`Unexpected Mobiledoc version "${version}"`);
    }
  }
}
