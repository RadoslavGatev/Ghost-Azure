/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/*
* When adding modules to the namespace, ensure that they are added in alphabetical order according to module name.
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );


// MAIN //

/**
* Top-level namespace.
*
* @namespace degenerate
*/
var degenerate = {};

/**
* @name cdf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/cdf}
*/
setReadOnly( degenerate, 'cdf', require( './../../../../base/dists/degenerate/cdf' ) );

/**
* @name Degenerate
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/ctor}
*/
setReadOnly( degenerate, 'Degenerate', require( './../../../../base/dists/degenerate/ctor' ) );

/**
* @name entropy
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/entropy}
*/
setReadOnly( degenerate, 'entropy', require( './../../../../base/dists/degenerate/entropy' ) );

/**
* @name logcdf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/logcdf}
*/
setReadOnly( degenerate, 'logcdf', require( './../../../../base/dists/degenerate/logcdf' ) );

/**
* @name logpdf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/logpdf}
*/
setReadOnly( degenerate, 'logpdf', require( './../../../../base/dists/degenerate/logpdf' ) );

/**
* @name logpmf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/logpmf}
*/
setReadOnly( degenerate, 'logpmf', require( './../../../../base/dists/degenerate/logpmf' ) );

/**
* @name mean
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/mean}
*/
setReadOnly( degenerate, 'mean', require( './../../../../base/dists/degenerate/mean' ) );

/**
* @name median
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/median}
*/
setReadOnly( degenerate, 'median', require( './../../../../base/dists/degenerate/median' ) );

/**
* @name mgf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/mgf}
*/
setReadOnly( degenerate, 'mgf', require( './../../../../base/dists/degenerate/mgf' ) );

/**
* @name mode
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/mode}
*/
setReadOnly( degenerate, 'mode', require( './../../../../base/dists/degenerate/mode' ) );

/**
* @name pdf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/pdf}
*/
setReadOnly( degenerate, 'pdf', require( './../../../../base/dists/degenerate/pdf' ) );

/**
* @name pmf
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/pmf}
*/
setReadOnly( degenerate, 'pmf', require( './../../../../base/dists/degenerate/pmf' ) );

/**
* @name quantile
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/quantile}
*/
setReadOnly( degenerate, 'quantile', require( './../../../../base/dists/degenerate/quantile' ) );

/**
* @name stdev
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/stdev}
*/
setReadOnly( degenerate, 'stdev', require( './../../../../base/dists/degenerate/stdev' ) );

/**
* @name variance
* @memberof degenerate
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dists/degenerate/variance}
*/
setReadOnly( degenerate, 'variance', require( './../../../../base/dists/degenerate/variance' ) );


// EXPORTS //

module.exports = degenerate;
