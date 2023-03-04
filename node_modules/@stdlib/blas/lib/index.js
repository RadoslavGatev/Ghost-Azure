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
* @name base
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/blas/base}
*/
setReadOnly( ns, 'base', require( './../base' ) );

/**
* @name ddot
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ddot}
*/
setReadOnly( ns, 'ddot', require( './../ddot' ) );

/**
* @name dswap
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/dswap}
*/
setReadOnly( ns, 'dswap', require( './../dswap' ) );

/**
* @name ext
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/blas/ext}
*/
setReadOnly( ns, 'ext', require( './../ext' ) );

/**
* @name gdot
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/gdot}
*/
setReadOnly( ns, 'gdot', require( './../gdot' ) );

/**
* @name gswap
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/gswap}
*/
setReadOnly( ns, 'gswap', require( './../gswap' ) );

/**
* @name sdot
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/sdot}
*/
setReadOnly( ns, 'sdot', require( './../sdot' ) );

/**
* @name sswap
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/sswap}
*/
setReadOnly( ns, 'sswap', require( './../sswap' ) );


// EXPORTS //

module.exports = ns;
