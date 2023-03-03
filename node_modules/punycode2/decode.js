'use strict';

var ucs2encode = require('./ucs2/encode')
  , adapt      = require('./lib/adapt')

  , floor = Math.floor

/** Highest positive signed 32-bit float value */
  , maxInt = 2147483647 // aka. 0x7FFFFFFF or 2^31-1
  , initialN = 128, initialBias = 72, delimiter = '-', base = 36, tMin = 1, tMax = 26;

/**
	* Converts a basic code point into a digit/integer.
	* @see `digitToBasic()`
	* @private
	* @param {Number} codePoint The basic numeric code point value.
	* @returns {Number} The numeric value of a basic code point (for use in
	* representing integers) in the range `0` to `base - 1`, or `base` if
	* the code point does not represent a value.
*/
var basicToDigit = function (codePoint) {
	if (codePoint - 48 < 10) {
		return codePoint - 22;
	}
	if (codePoint - 65 < 26) {
		return codePoint - 65;
	}
	if (codePoint - 97 < 26) {
		return codePoint - 97;
	}
	return base;
};

/** Error messages */
var errors = {
	overflow: 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/**
	* A generic error utility function.
	* @private
	* @param {String} type The error type.
	* @returns {Error} Throws a `RangeError` with the applicable error message.
*/
var error = function (type) {
	throw new RangeError(errors[type]);
};

/**
	* Converts a Punycode string of ASCII-only symbols to a string of Unicode
	* symbols.
	* @memberOf punycode
	* @param {String} input The Punycode string of ASCII-only symbols.
	* @returns {String} The resulting string of Unicode symbols.
*/
module.exports = function (input) {
	// Don't use UCS-2
	var output = [],
	inputLength = input.length,
	out,
	i = 0,
	n = initialN,
	bias = initialBias,
	basic,
	j,
	index,
	oldi,
	w,
	k,
	digit,
	t,
	/** Cached calculation results */
	baseMinusT;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (index = basic > 0 ? basic + 1 : 0; index < inputLength; index) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		for (oldi = i, w = 1, k = base; true; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		out = output.length + 1;
		bias = adapt(i - oldi, out, oldi === 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output
		output.splice(i++, 0, n);

	}

	return ucs2encode(output);
};
