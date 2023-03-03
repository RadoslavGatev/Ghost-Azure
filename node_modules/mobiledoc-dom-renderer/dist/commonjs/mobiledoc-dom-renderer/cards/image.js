'use strict';

var _utilsRenderType = require('../utils/render-type');

exports['default'] = {
  name: 'image',
  type: _utilsRenderType['default'],
  render: function render(_ref) {
    var payload = _ref.payload;
    var dom = _ref.env.dom;

    var img = dom.createElement('img');
    img.src = payload.src;
    return img;
  }
};