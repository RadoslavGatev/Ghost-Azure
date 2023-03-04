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

// MODULES //

var Float64Array = require( './../../float64' );
var Float32Array = require( './../../float32' );
var Int16Array = require( './../../int16' );
var Int32Array = require( './../../int32' );
var Int8Array = require( './../../int8' );
var Uint16Array = require( './../../uint16' );
var Uint32Array = require( './../../uint32' );
var Uint8Array = require( './../../uint8' );
var Uint8ClampedArray = require( './../../uint8c' );


// MAIN //

// Mapping from data types to constructors...
var ctors = {
	'float64': Float64Array,
	'float32': Float32Array,
	'generic': Array, // TODO: replace with `stdlib` pkg
	'int16': Int16Array,
	'int32': Int32Array,
	'int8': Int8Array,
	'uint16': Uint16Array,
	'uint32': Uint32Array,
	'uint8': Uint8Array,
	'uint8c': Uint8ClampedArray
};


// EXPORTS //

module.exports = ctors;
