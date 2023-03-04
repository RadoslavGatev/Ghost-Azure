'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsDom = require('../utils/dom');

var _cardsImage = require('../cards/image');

var _utilsRenderType = require('../utils/render-type');

var _utilsSectionTypes = require('../utils/section-types');

var _utilsTagNames = require('../utils/tag-names');

var _utilsSanitizationUtils = require('../utils/sanitization-utils');

var _utilsRenderUtils = require('../utils/render-utils');

var MOBILEDOC_VERSION = '0.2.0';

exports.MOBILEDOC_VERSION = MOBILEDOC_VERSION;
var IMAGE_SECTION_TAG_NAME = 'img';

function validateVersion(version) {
  if (version !== MOBILEDOC_VERSION) {
    throw new Error('Unexpected Mobiledoc version "' + version + '"');
  }
}

var Renderer = (function () {
  function Renderer(mobiledoc, options) {
    var _this = this;

    _classCallCheck(this, Renderer);

    var cards = options.cards;
    var cardOptions = options.cardOptions;
    var unknownCardHandler = options.unknownCardHandler;
    var markupElementRenderer = options.markupElementRenderer;
    var sectionElementRenderer = options.sectionElementRenderer;
    var dom = options.dom;
    var version = mobiledoc.version;
    var sectionData = mobiledoc.sections;

    validateVersion(version);

    var _sectionData = _slicedToArray(sectionData, 2);

    var markerTypes = _sectionData[0];
    var sections = _sectionData[1];

    this.dom = dom;
    this.root = dom.createDocumentFragment();
    this.markerTypes = markerTypes;
    this.sections = sections;
    this.cards = cards;
    this.cardOptions = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;

    this.sectionElementRenderer = {
      '__default__': _utilsRenderUtils.defaultSectionElementRenderer
    };
    Object.keys(sectionElementRenderer).forEach(function (key) {
      _this.sectionElementRenderer[key.toLowerCase()] = sectionElementRenderer[key];
    });

    this.markupElementRenderer = {
      '__default__': _utilsRenderUtils.defaultMarkupElementRenderer
    };
    Object.keys(markupElementRenderer).forEach(function (key) {
      _this.markupElementRenderer[key.toLowerCase()] = markupElementRenderer[key];
    });

    this._renderCallbacks = [];
    this._teardownCallbacks = [];
    this._renderedChildNodes = [];
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.sections.forEach(function (section) {
        var rendered = _this2.renderSection(section);
        if (rendered) {
          _this2.root.appendChild(rendered);
        }
      });
      for (var i = 0; i < this._renderCallbacks.length; i++) {
        this._renderCallbacks[i]();
      }
      // maintain a reference to child nodes so they can be cleaned up later by teardown
      this._renderedChildNodes = [];
      var node = this.root.firstChild;
      while (node) {
        this._renderedChildNodes.push(node);
        node = node.nextSibling;
      }
      return { result: this.root, teardown: function teardown() {
          return _this2.teardown();
        } };
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      for (var i = 0; i < this._teardownCallbacks.length; i++) {
        this._teardownCallbacks[i]();
      }
      for (var i = 0; i < this._renderedChildNodes.length; i++) {
        var node = this._renderedChildNodes[i];
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section) {
      var _section = _slicedToArray(section, 1);

      var type = _section[0];

      switch (type) {
        case _utilsSectionTypes.MARKUP_SECTION_TYPE:
          return this.renderMarkupSection(section);
        case _utilsSectionTypes.IMAGE_SECTION_TYPE:
          return this.renderImageSection(section);
        case _utilsSectionTypes.LIST_SECTION_TYPE:
          return this.renderListSection(section);
        case _utilsSectionTypes.CARD_SECTION_TYPE:
          return this.renderCardSection(section);
        default:
          throw new Error('Cannot render mobiledoc section of type "' + type + '"');
      }
    }
  }, {
    key: 'renderMarkersOnElement',
    value: function renderMarkersOnElement(element, markers) {
      var elements = [element];
      var currentElement = element;

      var pushElement = function pushElement(openedElement) {
        currentElement.appendChild(openedElement);
        elements.push(openedElement);
        currentElement = openedElement;
      };

      for (var i = 0, l = markers.length; i < l; i++) {
        var marker = markers[i];

        var _marker = _slicedToArray(marker, 3);

        var openTypes = _marker[0];
        var closeCount = _marker[1];
        var text = _marker[2];

        for (var j = 0, m = openTypes.length; j < m; j++) {
          var markerType = this.markerTypes[openTypes[j]];

          var _markerType = _slicedToArray(markerType, 2);

          var tagName = _markerType[0];
          var _markerType$1 = _markerType[1];
          var attrs = _markerType$1 === undefined ? [] : _markerType$1;

          if ((0, _utilsTagNames.isValidMarkerType)(tagName)) {
            pushElement(this.renderMarkupElement(tagName, attrs));
          } else {
            closeCount--;
          }
        }

        currentElement.appendChild((0, _utilsDom.createTextNode)(this.dom, text));

        for (var j = 0, m = closeCount; j < m; j++) {
          elements.pop();
          currentElement = elements[elements.length - 1];
        }
      }
    }

    /**
     * @param attrs Array
     */
  }, {
    key: 'renderMarkupElement',
    value: function renderMarkupElement(tagName, attrs) {
      tagName = tagName.toLowerCase();
      attrs = (0, _utilsSanitizationUtils.reduceAttributes)(attrs);

      var renderer = this.markupElementRendererFor(tagName);
      return renderer(tagName, this.dom, attrs);
    }
  }, {
    key: 'markupElementRendererFor',
    value: function markupElementRendererFor(tagName) {
      return this.markupElementRenderer[tagName] || this.markupElementRenderer.__default__;
    }
  }, {
    key: 'renderListItem',
    value: function renderListItem(markers) {
      var element = this.dom.createElement('li');
      this.renderMarkersOnElement(element, markers);
      return element;
    }
  }, {
    key: 'renderListSection',
    value: function renderListSection(_ref) {
      var _this3 = this;

      var _ref2 = _slicedToArray(_ref, 3);

      var type = _ref2[0];
      var tagName = _ref2[1];
      var listItems = _ref2[2];

      if (!(0, _utilsTagNames.isValidSectionTagName)(tagName, _utilsSectionTypes.LIST_SECTION_TYPE)) {
        return;
      }
      var element = this.dom.createElement(tagName);
      listItems.forEach(function (li) {
        element.appendChild(_this3.renderListItem(li));
      });
      return element;
    }
  }, {
    key: 'renderImageSection',
    value: function renderImageSection(_ref3) {
      var _ref32 = _slicedToArray(_ref3, 2);

      var type = _ref32[0];
      var src = _ref32[1];

      var element = this.dom.createElement(IMAGE_SECTION_TAG_NAME);
      element.src = src;
      return element;
    }
  }, {
    key: 'findCard',
    value: function findCard(name) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].name === name) {
          return this.cards[i];
        }
      }
      if (name === _cardsImage['default'].name) {
        return _cardsImage['default'];
      }
      return this._createUnknownCard(name);
    }
  }, {
    key: '_createUnknownCard',
    value: function _createUnknownCard(name) {
      return {
        name: name,
        type: _utilsRenderType['default'],
        render: this.unknownCardHandler
      };
    }
  }, {
    key: '_createCardArgument',
    value: function _createCardArgument(card) {
      var _this4 = this;

      var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var env = {
        name: card.name,
        isInEditor: false,
        dom: this.dom,
        didRender: function didRender(callback) {
          return _this4._registerRenderCallback(callback);
        },
        onTeardown: function onTeardown(callback) {
          return _this4._registerTeardownCallback(callback);
        }
      };

      var options = this.cardOptions;

      return { env: env, options: options, payload: payload };
    }
  }, {
    key: '_registerRenderCallback',
    value: function _registerRenderCallback(callback) {
      this._renderCallbacks.push(callback);
    }
  }, {
    key: '_registerTeardownCallback',
    value: function _registerTeardownCallback(callback) {
      this._teardownCallbacks.push(callback);
    }
  }, {
    key: 'renderCardSection',
    value: function renderCardSection(_ref4) {
      var _ref42 = _slicedToArray(_ref4, 3);

      var type = _ref42[0];
      var name = _ref42[1];
      var payload = _ref42[2];

      var card = this.findCard(name);

      var cardArg = this._createCardArgument(card, payload);
      var rendered = card.render(cardArg);

      this._validateCardRender(rendered, card.name);

      return rendered;
    }
  }, {
    key: '_validateCardRender',
    value: function _validateCardRender(rendered, cardName) {
      if (!rendered) {
        return;
      }

      if (typeof rendered !== 'object') {
        throw new Error('Card "' + cardName + '" must render ' + _utilsRenderType['default'] + ', but result was "' + rendered + '"');
      }
    }
  }, {
    key: 'renderMarkupSection',
    value: function renderMarkupSection(_ref5) {
      var _ref52 = _slicedToArray(_ref5, 3);

      var type = _ref52[0];
      var tagName = _ref52[1];
      var markers = _ref52[2];

      tagName = tagName.toLowerCase();
      if (!(0, _utilsTagNames.isValidSectionTagName)(tagName, _utilsSectionTypes.MARKUP_SECTION_TYPE)) {
        return;
      }

      var renderer = this.sectionElementRendererFor(tagName);
      var element = renderer(tagName, this.dom);

      this.renderMarkersOnElement(element, markers);
      return element;
    }
  }, {
    key: 'sectionElementRendererFor',
    value: function sectionElementRendererFor(tagName) {
      return this.sectionElementRenderer[tagName] || this.sectionElementRenderer.__default__;
    }
  }, {
    key: '_defaultUnknownCardHandler',
    get: function get() {
      return function (_ref6) {
        var name = _ref6.env.name;

        throw new Error('Card "' + name + '" not found but no unknownCardHandler was registered');
      };
    }
  }]);

  return Renderer;
})();

exports['default'] = Renderer;