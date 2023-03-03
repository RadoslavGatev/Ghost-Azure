'use strict';

exports.registerGlobal = registerGlobal;

var _rendererFactory = require('./renderer-factory');

var _utilsRenderType = require('./utils/render-type');

exports.RENDER_TYPE = _utilsRenderType['default'];

function registerGlobal(window) {
  window.MobiledocDOMRenderer = _rendererFactory['default'];
}

exports['default'] = _rendererFactory['default'];