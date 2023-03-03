(function() {
  'use strict';

  var JSML = module.exports = {};
  var objSeparator = /\r?\n---+\r?\n/;

  JSML.parse = function (docstr) {
    var doc = docstr.split(objSeparator);
    var len = doc.length;
    var result = new Array(len);
    for (var i = 0; i < len; i++) {
      result[i] = JSON.parse('{' + doc[i] + '}');
    }
    return result;
  };

  JSML.stringify = function (doc, replacer, space) {
    if (typeof doc != 'object')
      throw new Error('Argument has to be either an Object or an Array of '
        + 'Objects.');

    if (doc instanceof Array) {
      var len = doc.length;
      var result = new Array(len);
      for (var i = 0; i < len; i++) {
        result[i] = JSML.stringify(doc[i], replacer, space);
      }
      return result.join('\n---\n');
    } else {
      var json = JSON.stringify(doc, replacer, space);
      return json.substring(1, json.length - 1)
        .replace(new RegExp('\n'+space, 'g'), '\n').trim();
    }
  };
})();
