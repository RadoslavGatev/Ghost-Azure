var JSML = require('./jsml.js');

var doc = '"hi": "there"\n---\n"i\'m": "jsml!"';

var jsml = JSML.parse(doc);
console.log(jsml);

console.log(JSML.stringify(jsml));
