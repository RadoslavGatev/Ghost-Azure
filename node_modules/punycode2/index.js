"use strict";

/** Define the public API */
module.exports = {

	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	version: "1.3.2",

	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	ucs2: { decode: require("./ucs2/decode"), encode: require("./ucs2/encode") },
	decode: require("./decode"),
	encode: require("./encode"),
	toASCII: require("./to-ascii"),
	toUnicode: require("./to-unicode")
};
