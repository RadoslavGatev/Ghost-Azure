import RendererFactory from './renderer-factory';
import RENDER_TYPE from './utils/render-type';

export function registerGlobal(window) {
  window.MobiledocTextRenderer = RendererFactory;
}
export { RENDER_TYPE };
export default RendererFactory;
