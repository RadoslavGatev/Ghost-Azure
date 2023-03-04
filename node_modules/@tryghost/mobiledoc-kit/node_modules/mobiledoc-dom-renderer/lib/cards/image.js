import RENDER_TYPE from '../utils/render-type';

export default {
  name: 'image',
  type: RENDER_TYPE,
  render({payload, env: {dom}}) {
    let img = dom.createElement('img');
    img.src = payload.src;
    return img;
  }
};
