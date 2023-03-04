"use strict";

var stringFromCharCode = String.fromCharCode;

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
module.exports = function (array) {
	return array
		.map(function (value) {
			var output = "";
			if (value > 0xffff) {
				value -= 0x10000;
				output += stringFromCharCode(((value >>> 10) & 0x3ff) | 0xd800);
				value = 0xdc00 | (value & 0x3ff);
			}
			output += stringFromCharCode(value);
			return output;
		})
		.join("");
};
