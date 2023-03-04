"use strict";

var floor = Math.floor
  , base = 36
  , tMin = 1
  , tMax = 26
  , damp = 700
  , skew = 38
  , baseMinusTMin = base - tMin;

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
module.exports = function (delta, numPoints, firstTime) {
	var k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (k = 0; delta > (baseMinusTMin * tMax) >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
};
