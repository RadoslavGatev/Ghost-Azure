;(function() {

var fs = require('fs');
var ejs = require('ejs');

module.exports = function tplEngine(file, data) {
  var tpl = fs.readFileSync(file, 'utf8');
  return ejs.render(tpl, data);
};

}).call(this);
