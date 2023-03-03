(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  factory((global.SimpleDOM = {}));
}(this, function (exports) { 'use strict';

  function Node(nodeType, nodeName, nodeValue) {
    this.nodeType = nodeType;
    this.nodeName = nodeName;
    this.nodeValue = nodeValue;

    this.childNodes = new ChildNodes(this);

    this.parentNode = null;
    this.previousSibling = null;
    this.nextSibling = null;
    this.firstChild = null;
    this.lastChild = null;
  }

  Node.prototype._cloneNode = function() {
    return new Node(this.nodeType, this.nodeName, this.nodeValue);
  };

  Node.prototype.cloneNode = function(deep) {
    var node = this._cloneNode();

    if (deep) {
      var child = this.firstChild, nextChild = child;

      while (nextChild) {
        nextChild = child.nextSibling;
        node.appendChild(child.cloneNode(true));
        child = nextChild;
      }
    }

    return node;
  };

  Node.prototype.appendChild = function(node) {
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      insertFragment(node, this, this.lastChild, null);
      return node;
    }

    if (node.parentNode) { node.parentNode.removeChild(node); }

    node.parentNode = this;
    var refNode = this.lastChild;
    if (refNode === null) {
      this.firstChild = node;
      this.lastChild = node;
    } else {
      node.previousSibling = refNode;
      refNode.nextSibling = node;
      this.lastChild = node;
    }

    return node;
  };

  function insertFragment(fragment, newParent, before, after) {
    if (!fragment.firstChild) { return; }

    var firstChild = fragment.firstChild;
    var lastChild = firstChild;
    var node = firstChild;

    firstChild.previousSibling = before;
    if (before) {
      before.nextSibling = firstChild;
    } else {
      newParent.firstChild = firstChild;
    }

    while (node) {
      node.parentNode = newParent;
      lastChild = node;
      node = node.nextSibling;
    }

    lastChild.nextSibling = after;
    if (after) {
      after.previousSibling = lastChild;
    } else {
      newParent.lastChild = lastChild;
    }
  }

  Node.prototype.insertBefore = function(node, refNode) {
    if (refNode == null) {
      return this.appendChild(node);
    }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      insertFragment(node, this, refNode ? refNode.previousSibling : null, refNode);
      return;
    }

    if (node.parentNode) { node.parentNode.removeChild(node); }

    node.parentNode = this;

    var previousSibling = refNode.previousSibling;
    if (previousSibling) {
      previousSibling.nextSibling = node;
      node.previousSibling = previousSibling;
    } else {
      node.previousSibling = null;
    }

    refNode.previousSibling = node;
    node.nextSibling = refNode;

    if (this.firstChild === refNode) {
      this.firstChild = node;
    }
  };

  Node.prototype.removeChild = function(refNode) {
    if (this.firstChild === refNode) {
      this.firstChild = refNode.nextSibling;
    }
    if (this.lastChild === refNode) {
      this.lastChild = refNode.previousSibling;
    }
    if (refNode.previousSibling) {
      refNode.previousSibling.nextSibling = refNode.nextSibling;
    }
    if (refNode.nextSibling) {
      refNode.nextSibling.previousSibling = refNode.previousSibling;
    }
    refNode.parentNode = null;
    refNode.nextSibling = null;
    refNode.previousSibling = null;
  };

  Node.ELEMENT_NODE = 1;
  Node.ATTRIBUTE_NODE = 2;
  Node.TEXT_NODE = 3;
  Node.CDATA_SECTION_NODE = 4;
  Node.ENTITY_REFERENCE_NODE = 5;
  Node.ENTITY_NODE = 6;
  Node.PROCESSING_INSTRUCTION_NODE = 7;
  Node.COMMENT_NODE = 8;
  Node.DOCUMENT_NODE = 9;
  Node.DOCUMENT_TYPE_NODE = 10;
  Node.DOCUMENT_FRAGMENT_NODE = 11;
  Node.NOTATION_NODE = 12;

  function ChildNodes(node) {
    this.node = node;
  }

  ChildNodes.prototype.item = function(index) {
    var child = this.node.firstChild;

    for (var i = 0; child && index !== i; i++) {
      child = child.nextSibling;
    }

    return child;
  };

  function Element(tagName) {
    tagName = tagName.toUpperCase();

    this.nodeConstructor(1, tagName, null);
    this.attributes = [];
    this.tagName = tagName;
  }

  Element.prototype = Object.create(Node.prototype);
  Element.prototype.constructor = Element;
  Element.prototype.nodeConstructor = Node;

  Element.prototype._cloneNode = function() {
    var node = new Element(this.tagName);

    node.attributes = this.attributes.map(function(attr) {
      return { name: attr.name, value: attr.value, specified: attr.specified };
    });

    return node;
  };

  Element.prototype.getAttribute = function(_name) {
    var attributes = this.attributes;
    var name = _name.toLowerCase();
    var attr;
    for (var i=0, l=attributes.length; i<l; i++) {
      attr = attributes[i];
      if (attr.name === name) {
        return attr.value;
      }
    }
    return '';
  };

  Element.prototype.setAttribute = function(_name, _value) {
    var attributes = this.attributes;
    var name = _name.toLowerCase();
    var value;
    if (typeof _value === 'string') {
      value = _value;
    } else {
      value = '' + _value;
    }
    var attr;
    for (var i=0, l=attributes.length; i<l; i++) {
      attr = attributes[i];
      if (attr.name === name) {
        attr.value = value;
        return;
      }
    }
    attributes.push({
      name: name,
      value: value,
      specified: true // serializer compat with old IE
    });
  };

  Element.prototype.removeAttribute = function(name) {
    var attributes = this.attributes;
    for (var i=0, l=attributes.length; i<l; i++) {
      var attr = attributes[i];
      if (attr.name === name) {
        attributes.splice(i, 1);
        return;
      }
    }
  };

  function DocumentFragment() {
    this.nodeConstructor(11, '#document-fragment', null);
  }

  DocumentFragment.prototype._cloneNode = function() {
    return new DocumentFragment();
  };

  DocumentFragment.prototype = Object.create(Node.prototype);
  DocumentFragment.prototype.constructor = DocumentFragment;
  DocumentFragment.prototype.nodeConstructor = Node;

  function Text(text) {
    this.nodeConstructor(3, '#text', text);
  }

  Text.prototype._cloneNode = function() {
    return new Text(this.nodeValue);
  };

  Text.prototype = Object.create(Node.prototype);
  Text.prototype.constructor = Text;
  Text.prototype.nodeConstructor = Node;

  function Comment(text) {
    this.nodeConstructor(8, '#comment', text);
  }

  Comment.prototype._cloneNode = function() {
    return new Comment(this.nodeValue);
  };

  Comment.prototype = Object.create(Node.prototype);
  Comment.prototype.constructor = Comment;
  Comment.prototype.nodeConstructor = Node;

  function RawHTMLSection(text) {
    this.nodeConstructor(-1, "#raw-html-section", text);
  }

  RawHTMLSection.prototype = Object.create(Node.prototype);
  RawHTMLSection.prototype.constructor = RawHTMLSection;
  RawHTMLSection.prototype.nodeConstructor = Node;

  function Document() {
    this.nodeConstructor(9, '#document', null);
    this.documentElement = new Element('html');
    this.head = new Element('head');
    this.body = new Element('body');
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.appendChild(this.documentElement);
  }

  Document.prototype = Object.create(Node.prototype);
  Document.prototype.constructor = Document;
  Document.prototype.nodeConstructor = Node;

  Document.prototype.createElement = function(tagName) {
    return new Element(tagName);
  };

  Document.prototype.createTextNode = function(text) {
    return new Text(text);
  };

  Document.prototype.createComment = function(text) {
    return new Comment(text);
  };

  Document.prototype.createRawHTMLSection = function(text) {
    return new RawHTMLSection(text);
  };

  Document.prototype.createDocumentFragment = function() {
    return new DocumentFragment();
  };

  function HTMLParser(tokenize, document, voidMap) {
    this.tokenize = tokenize;
    this.document = document;
    this.voidMap = voidMap;
    this.parentStack = [];
  }

  HTMLParser.prototype.isVoid = function(element) {
    return this.voidMap[element.nodeName] === true;
  };

  HTMLParser.prototype.pushElement = function(token) {
    var el = this.document.createElement(token.tagName);

    for (var i=0;i<token.attributes.length;i++) {
      var attr = token.attributes[i];
      el.setAttribute(attr[0], attr[1]);
    }

    if (this.isVoid(el)) {
      return this.appendChild(el);
    }

    this.parentStack.push(el);
  };

  HTMLParser.prototype.popElement = function(token) {
    var el = this.parentStack.pop();

    if (el.nodeName !== token.tagName.toUpperCase()) {
      throw new Error('unbalanced tag');
    }

    this.appendChild(el);
  };

  HTMLParser.prototype.appendText = function(token) {
    var text = this.document.createTextNode(token.chars);
    this.appendChild(text);
  };

  HTMLParser.prototype.appendComment = function(token) {
    var comment = this.document.createComment(token.chars);
    this.appendChild(comment);
  };

  HTMLParser.prototype.appendChild = function(node) {
    var parentNode = this.parentStack[this.parentStack.length-1];
    parentNode.appendChild(node);
  };

  HTMLParser.prototype.parse = function(html/*, context*/) {
    // TODO use context for namespaceURI issues
    var fragment = this.document.createDocumentFragment();
    this.parentStack.push(fragment);

    var tokens = this.tokenize(html);
    for (var i=0, l=tokens.length; i<l; i++) {
      var token = tokens[i];
      switch (token.type) {
        case 'StartTag':
          this.pushElement(token);
          break;
        case 'EndTag':
          this.popElement(token);
          break;
        case 'Chars':
          this.appendText(token);
          break;
        case 'Comment':
          this.appendComment(token);
          break;
      }
    }

    return this.parentStack.pop();
  };

  function HTMLSerializer(voidMap) {
    this.voidMap = voidMap;
  }

  HTMLSerializer.prototype.openTag = function(element) {
    return '<' + element.nodeName.toLowerCase() + this.attributes(element.attributes) + '>';
  };

  HTMLSerializer.prototype.closeTag = function(element) {
    return '</' + element.nodeName.toLowerCase() + '>';
  };

  HTMLSerializer.prototype.isVoid = function(element) {
    return this.voidMap[element.nodeName] === true;
  };

  HTMLSerializer.prototype.attributes = function(namedNodeMap) {
    var buffer = '';
    for (var i=0, l=namedNodeMap.length; i<l; i++) {
      buffer += this.attr(namedNodeMap[i]);
    }
    return buffer;
  };

  HTMLSerializer.prototype.escapeAttrValue = function(attrValue) {
    return attrValue.replace(/[&"]/g, function(match) {
      switch(match) {
        case '&':
          return '&amp;';
        case '\"':
          return '&quot;';
      }
    });
  };

  HTMLSerializer.prototype.attr = function(attr) {
    if (!attr.specified) {
      return '';
    }
    if (attr.value) {
      return ' ' + attr.name + '="' + this.escapeAttrValue(attr.value) + '"';
    }
    return ' ' + attr.name;
  };

  HTMLSerializer.prototype.escapeText = function(textNodeValue) {
    return textNodeValue.replace(/[&<>]/g, function(match) {
      switch(match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
      }
    });
  };

  HTMLSerializer.prototype.text = function(text) {
    return this.escapeText(text.nodeValue);
  };

  HTMLSerializer.prototype.rawHTMLSection = function(text) {
    return text.nodeValue;
  };

  HTMLSerializer.prototype.comment = function(comment) {
    return '<!--'+comment.nodeValue+'-->';
  };

  HTMLSerializer.prototype.serializeChildren = function(node) {
    var buffer = '';
    var next = node.firstChild;
    if (next) {
      buffer += this.serialize(next);

      while(next = next.nextSibling) {
        buffer += this.serialize(next);
      }
    }
    return buffer;
  };

  HTMLSerializer.prototype.serialize = function(node) {
    var buffer = '';

    // open
    switch (node.nodeType) {
      case 1:
        buffer += this.openTag(node);
        break;
      case 3:
        buffer += this.text(node);
        break;
      case -1:
        buffer += this.rawHTMLSection(node);
        break;
      case 8:
        buffer += this.comment(node);
        break;
      default:
        break;
    }

    buffer += this.serializeChildren(node);

    if (node.nodeType === 1 && !this.isVoid(node)) {
      buffer += this.closeTag(node);
    }

    return buffer;
  };

  var _voidMap = {
    AREA: true,
    BASE: true,
    BR: true,
    COL: true,
    COMMAND: true,
    EMBED: true,
    HR: true,
    IMG: true,
    INPUT: true,
    KEYGEN: true,
    LINK: true,
    META: true,
    PARAM: true,
    SOURCE: true,
    TRACK: true,
    WBR: true
  };

  exports.Node = Node;
  exports.Element = Element;
  exports.DocumentFragment = DocumentFragment;
  exports.Document = Document;
  exports.HTMLParser = HTMLParser;
  exports.HTMLSerializer = HTMLSerializer;
  exports.voidMap = _voidMap;

}));
//# sourceMappingURL=simple-dom.js.map