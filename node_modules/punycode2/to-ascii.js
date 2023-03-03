'use strict';

var mapDomain = require('./lib/map-domain')
  , encode    = require('./encode')

  , regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars

/**
	* Converts a Unicode string representing a domain name or an email address to
	* Punycode. Only the non-ASCII parts of the domain name will be converted,
	* i.e. it doesn't matter if you call it with a domain that's already in
	* ASCII.
	* @memberOf punycode
	* @param {String} input The domain name or email address to convert, as a
	* Unicode string.
	* @returns {String} The Punycode representation of the given domain name or
	* email address.
*/
module.exports = function (input) {
	return mapDomain(input, function (string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};
