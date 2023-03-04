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
* @namespace ns
*/
var ns = {};

/**
* @name array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/array}
*/
setReadOnly( ns, 'array', require( './../array' ) );

/**
* @name base
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/ndarray/base}
*/
setReadOnly( ns, 'base', require( './../base' ) );

/**
* @name ndarrayCastingModes
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/casting-modes}
*/
setReadOnly( ns, 'ndarrayCastingModes', require( './../casting-modes' ) );

/**
* @name ndarray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/ctor}
*/
setReadOnly( ns, 'ndarray', require( './../ctor' ) );

/**
* @name ndarrayDataTypes
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/dtypes}
*/
setReadOnly( ns, 'ndarrayDataTypes', require( './../dtypes' ) );

/**
* @name ind2sub
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/ind2sub}
*/
setReadOnly( ns, 'ind2sub', require( './../ind2sub' ) );

/**
* @name ndarrayIndexModes
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/index-modes}
*/
setReadOnly( ns, 'ndarrayIndexModes', require( './../index-modes' ) );

/**
* @name ndarrayMinDataType
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/min-dtype}
*/
setReadOnly( ns, 'ndarrayMinDataType', require( './../min-dtype' ) );

/**
* @name ndarrayNextDataType
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/next-dtype}
*/
setReadOnly( ns, 'ndarrayNextDataType', require( './../next-dtype' ) );

/**
* @name ndarrayOrders
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/orders}
*/
setReadOnly( ns, 'ndarrayOrders', require( './../orders' ) );

/**
* @name ndarrayPromotionRules
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/promotion-rules}
*/
setReadOnly( ns, 'ndarrayPromotionRules', require( './../promotion-rules' ) );

/**
* @name ndarraySafeCasts
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/safe-casts}
*/
setReadOnly( ns, 'ndarraySafeCasts', require( './../safe-casts' ) );

/**
* @name ndarraySameKindCasts
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/same-kind-casts}
*/
setReadOnly( ns, 'ndarraySameKindCasts', require( './../same-kind-casts' ) );

/**
* @name sub2ind
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/ndarray/sub2ind}
*/
setReadOnly( ns, 'sub2ind', require( './../sub2ind' ) );


// EXPORTS //

module.exports = ns;
