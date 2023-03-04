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
* @name ArrayBuffer
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/buffer}
*/
setReadOnly( ns, 'ArrayBuffer', require( './../buffer' ) );

/**
* @name Complex64Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/complex64}
*/
setReadOnly( ns, 'Complex64Array', require( './../complex64' ) );

/**
* @name Complex128Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/complex128}
*/
setReadOnly( ns, 'Complex128Array', require( './../complex128' ) );

/**
* @name convertArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/convert}
*/
setReadOnly( ns, 'convertArray', require( './../convert' ) );

/**
* @name convertArraySame
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/convert-same}
*/
setReadOnly( ns, 'convertArraySame', require( './../convert-same' ) );

/**
* @name arrayCtors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/ctors}
*/
setReadOnly( ns, 'arrayCtors', require( './../ctors' ) );

/**
* @name DataView
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/dataview}
*/
setReadOnly( ns, 'DataView', require( './../dataview' ) );

/**
* @name datespace
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/datespace}
*/
setReadOnly( ns, 'datespace', require( './../datespace' ) );

/**
* @name arrayDataType
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/dtype}
*/
setReadOnly( ns, 'arrayDataType', require( './../dtype' ) );

/**
* @name arrayDataTypes
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/dtypes}
*/
setReadOnly( ns, 'arrayDataTypes', require( './../dtypes' ) );

/**
* @name filledarray
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/filled}
*/
setReadOnly( ns, 'filledarray', require( './../filled' ) );

/**
* @name Float32Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/float32}
*/
setReadOnly( ns, 'Float32Array', require( './../float32' ) );

/**
* @name Float64Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/float64}
*/
setReadOnly( ns, 'Float64Array', require( './../float64' ) );

/**
* @name iterator2array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/from-iterator}
*/
setReadOnly( ns, 'iterator2array', require( './../from-iterator' ) );

/**
* @name incrspace
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/incrspace}
*/
setReadOnly( ns, 'incrspace', require( './../incrspace' ) );

/**
* @name Int8Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/int8}
*/
setReadOnly( ns, 'Int8Array', require( './../int8' ) );

/**
* @name Int16Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/int16}
*/
setReadOnly( ns, 'Int16Array', require( './../int16' ) );

/**
* @name Int32Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/int32}
*/
setReadOnly( ns, 'Int32Array', require( './../int32' ) );

/**
* @name linspace
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/linspace}
*/
setReadOnly( ns, 'linspace', require( './../linspace' ) );

/**
* @name logspace
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/logspace}
*/
setReadOnly( ns, 'logspace', require( './../logspace' ) );

/**
* @name arrayMinDataType
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/min-dtype}
*/
setReadOnly( ns, 'arrayMinDataType', require( './../min-dtype' ) );

/**
* @name arrayNextDataType
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/next-dtype}
*/
setReadOnly( ns, 'arrayNextDataType', require( './../next-dtype' ) );

/**
* @name typedarraypool
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/pool}
*/
setReadOnly( ns, 'typedarraypool', require( './../pool' ) );

/**
* @name arrayPromotionRules
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/promotion-rules}
*/
setReadOnly( ns, 'arrayPromotionRules', require( './../promotion-rules' ) );

/**
* @name reviveTypedArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/reviver}
*/
setReadOnly( ns, 'reviveTypedArray', require( './../reviver' ) );

/**
* @name arraySafeCasts
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/safe-casts}
*/
setReadOnly( ns, 'arraySafeCasts', require( './../safe-casts' ) );

/**
* @name arraySameKindCasts
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/same-kind-casts}
*/
setReadOnly( ns, 'arraySameKindCasts', require( './../same-kind-casts' ) );

/**
* @name arrayShape
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/shape}
*/
setReadOnly( ns, 'arrayShape', require( './../shape' ) );

/**
* @name SharedArrayBuffer
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/shared-buffer}
*/
setReadOnly( ns, 'SharedArrayBuffer', require( './../shared-buffer' ) );

/**
* @name circarray2iterator
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-circular-iterator}
*/
setReadOnly( ns, 'circarray2iterator', require( './../to-circular-iterator' ) );

/**
* @name array2iterator
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-iterator}
*/
setReadOnly( ns, 'array2iterator', require( './../to-iterator' ) );

/**
* @name array2iteratorRight
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-iterator-right}
*/
setReadOnly( ns, 'array2iteratorRight', require( './../to-iterator-right' ) );

/**
* @name typedarray2json
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-json}
*/
setReadOnly( ns, 'typedarray2json', require( './../to-json' ) );

/**
* @name sparsearray2iterator
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-sparse-iterator}
*/
setReadOnly( ns, 'sparsearray2iterator', require( './../to-sparse-iterator' ) );

/**
* @name sparsearray2iteratorRight
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-sparse-iterator-right}
*/
setReadOnly( ns, 'sparsearray2iteratorRight', require( './../to-sparse-iterator-right' ) );

/**
* @name stridedarray2iterator
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-strided-iterator}
*/
setReadOnly( ns, 'stridedarray2iterator', require( './../to-strided-iterator' ) );

/**
* @name arrayview2iterator
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-view-iterator}
*/
setReadOnly( ns, 'arrayview2iterator', require( './../to-view-iterator' ) );

/**
* @name arrayview2iteratorRight
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/to-view-iterator-right}
*/
setReadOnly( ns, 'arrayview2iteratorRight', require( './../to-view-iterator-right' ) );

/**
* @name typedarray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/typed}
*/
setReadOnly( ns, 'typedarray', require( './../typed' ) );

/**
* @name typedarrayComplexCtors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/typed-complex-ctors}
*/
setReadOnly( ns, 'typedarrayComplexCtors', require( './../typed-complex-ctors' ) );

/**
* @name typedarrayComplexDataTypes
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/typed-complex-dtypes}
*/
setReadOnly( ns, 'typedarrayComplexDataTypes', require( './../typed-complex-dtypes' ) );

/**
* @name typedarrayCtors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/typed-ctors}
*/
setReadOnly( ns, 'typedarrayCtors', require( './../typed-ctors' ) );

/**
* @name typedarrayDataTypes
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/array/typed-dtypes}
*/
setReadOnly( ns, 'typedarrayDataTypes', require( './../typed-dtypes' ) );

/**
* @name Uint8Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/uint8}
*/
setReadOnly( ns, 'Uint8Array', require( './../uint8' ) );

/**
* @name Uint8ClampedArray
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/uint8c}
*/
setReadOnly( ns, 'Uint8ClampedArray', require( './../uint8c' ) );

/**
* @name Uint16Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/uint16}
*/
setReadOnly( ns, 'Uint16Array', require( './../uint16' ) );

/**
* @name Uint32Array
* @memberof ns
* @readonly
* @constructor
* @see {@link module:@stdlib/array/uint32}
*/
setReadOnly( ns, 'Uint32Array', require( './../uint32' ) );

/**
* @name constants
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/constants/array}
*/
setReadOnly( ns, 'constants', require( '@stdlib/constants/array' ) );


// EXPORTS //

module.exports = ns;
