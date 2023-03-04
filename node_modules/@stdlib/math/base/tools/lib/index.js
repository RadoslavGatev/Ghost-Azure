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
* @namespace tools
*/
var tools = {};

/**
* @name continuedFraction
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/continued-fraction}
*/
setReadOnly( tools, 'continuedFraction', require( './../../../base/tools/continued-fraction' ) );

/**
* @name evalpoly
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/evalpoly}
*/
setReadOnly( tools, 'evalpoly', require( './../../../base/tools/evalpoly' ) );

/**
* @name evalrational
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/evalrational}
*/
setReadOnly( tools, 'evalrational', require( './../../../base/tools/evalrational' ) );

/**
* @name fibpoly
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/fibpoly}
*/
setReadOnly( tools, 'fibpoly', require( './../../../base/tools/fibpoly' ) );

/**
* @name hermitepoly
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/hermitepoly}
*/
setReadOnly( tools, 'hermitepoly', require( './../../../base/tools/hermitepoly' ) );

/**
* @name lucaspoly
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/lucaspoly}
*/
setReadOnly( tools, 'lucaspoly', require( './../../../base/tools/lucaspoly' ) );

/**
* @name normhermitepoly
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/normhermitepoly}
*/
setReadOnly( tools, 'normhermitepoly', require( './../../../base/tools/normhermitepoly' ) );

/**
* @name sumSeries
* @memberof tools
* @readonly
* @type {Function}
* @see {@link module:@stdlib/math/base/tools/sum-series}
*/
setReadOnly( tools, 'sumSeries', require( './../../../base/tools/sum-series' ) );


// EXPORTS //

module.exports = tools;
