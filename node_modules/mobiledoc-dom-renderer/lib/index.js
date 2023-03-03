import RendererFactory from './renderer-factory';
import RENDER_TYPE from './utils/render-type';

export { RENDER_TYPE };

export function registerGlobal(window) {
  window.MobiledocDOMRenderer = RendererFactory;
}

export default RendererFactory;
