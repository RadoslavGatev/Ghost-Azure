'use strict';

var ucs2decode = require('./ucs2/decode')
  , adapt      = require('./lib/adapt')

  , stringFromCharCode = String.fromCharCode
  , floor = Math.floor

/** Highest positive signed 32-bit float value */
  , maxInt = 2147483647 // aka. 0x7FFFFFFF or 2^31-1

  , base = 36
  , delimiter = '-' // '\x2D'
  , initialBias = 72, initialN = 128, tMin = 1, tMax = 26;

/**
	* Converts a digit/integer into a basic code point.
	* @see `basicToDigit()`
	* @private
	* @param {Number} digit The numeric value of a basic code point.
	* @returns {Number} The basic code point whose value (when used for
	* representing integers) is `digit`, which needs to be in the range
	* `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	* used; else, the lowercase form is used. The behavior is undefined
	* if `flag` is non-zero and `digit` has no uppercase form.
*/
var digitToBasic = function (digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag !== 0) << 5);
};

/**
	* Converts a string of Unicode symbols (e.g. a domain name label) to a
	* Punycode string of ASCII-only symbols.
	* @memberOf punycode
	* @param {String} input The string of Unicode symbols.
	* @returns {String} The resulting Punycode string of ASCII-only symbols.
*/
module.exports = function (input) {
	var n,
	delta,
	handledCPCount,
	basicLength,
	bias,
	j,
	m,
	q,
	k,
	t,
	currentValue,
	output = [],
	/** `inputLength` will hold the number of code points in `input`. */
	inputLength,
	/** Cached calculation results */
	handledCPCountPlusOne,
	baseMinusT,
	qMinusT;

	// Convert the input in UCS-2 to Unicode
	input = ucs2decode(input);

	// Cache the length
	inputLength = input.length;

	// Initialize the state
	n = initialN;
	delta = 0;
	bias = initialBias;

	// Handle the basic code points
	for (j = 0; j < inputLength; ++j) {
		currentValue = input[j];
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	handledCPCount = basicLength = output.length;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string - if it is not empty - with a delimiter
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		for (m = maxInt, j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow
		handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			throw new RangeError('Overflow: input needs wider integers to process');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];

			if (currentValue < n && ++delta > maxInt) {
				throw new RangeError('Overflow: input needs wider integers to process');
			}

			if (currentValue === n) {
				// Represent delta as a generalized variable-length integer
				for (q = delta, k = base; true; k += base) {
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					qMinusT = q - t;
					baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};
