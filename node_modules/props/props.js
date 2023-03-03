var JSML = require('jsml');
var YAML = require('js-yaml');

module.exports = function(str, div) {
  div = div || /\n\n\n|\r\n\r\n\r\n/;

  // `str` must be a string
  if (typeof str != 'string')
    str = str.toString();

  // trim string
  str = str.trim();

  var split;
  var result = {};
  var content;

  // If a match was found
  if ((split = str.split(div)).length > 0)
    try {
      // JSON
      if (split[0].charAt(0) == '{')
        result = JSON.parse(split[0]);
      // JSML
      else if (split[0].charAt(0) == '"')
        result = JSML.parse(split[0]);
      // YAML
      else
        result = YAML.load(split[0]);
    } catch (e) {
      return { __content: str };
    }
  else
    return { __content: str };

  delete split[0];
  // Join remaining
  str = split.join('\n\n\n');

  str += '\n';  // append a line seperator after content, since some tools (like
                // pandoc) need it

  result.__content = str;
  return result;
};
