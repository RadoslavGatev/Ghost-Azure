;(function() {
var fs = require('fs');
var props = require('props');
var marked = require('marked');

// parse the file and return it's contents
module.exports = function parser(file) {
  var content = fs.readFileSync(file, 'utf8');

  // parse content
  var doc = props(content);
  // markdown -> HTML
  doc.__content = marked(doc.__content);

  return doc;
};

}).call(this);
