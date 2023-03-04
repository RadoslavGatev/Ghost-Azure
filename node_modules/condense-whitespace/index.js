'use strict';

module.exports = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	return string.trim().replace(/\s{2,}/g, ' ');
};
