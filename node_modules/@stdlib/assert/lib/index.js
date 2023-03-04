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
* @name contains
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/contains}
*/
setReadOnly( ns, 'contains', require( './../contains' ) );

/**
* @name deepEqual
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/deep-equal}
*/
setReadOnly( ns, 'deepEqual', require( './../deep-equal' ) );

/**
* @name deepHasOwnProp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/deep-has-own-property}
*/
setReadOnly( ns, 'deepHasOwnProp', require( './../deep-has-own-property' ) );

/**
* @name deepHasProp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/deep-has-property}
*/
setReadOnly( ns, 'deepHasProp', require( './../deep-has-property' ) );

/**
* @name hasArrayBufferSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-arraybuffer-support}
*/
setReadOnly( ns, 'hasArrayBufferSupport', require( './../has-arraybuffer-support' ) );

/**
* @name hasArrowFunctionSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-arrow-function-support}
*/
setReadOnly( ns, 'hasArrowFunctionSupport', require( './../has-arrow-function-support' ) );

/**
* @name hasAsyncAwaitSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-async-await-support}
*/
setReadOnly( ns, 'hasAsyncAwaitSupport', require( './../has-async-await-support' ) );

/**
* @name hasAsyncIteratorSymbolSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-async-iterator-symbol-support}
*/
setReadOnly( ns, 'hasAsyncIteratorSymbolSupport', require( './../has-async-iterator-symbol-support' ) );

/**
* @name hasBigIntSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-bigint-support}
*/
setReadOnly( ns, 'hasBigIntSupport', require( './../has-bigint-support' ) );

/**
* @name hasBigInt64ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-bigint64array-support}
*/
setReadOnly( ns, 'hasBigInt64ArraySupport', require( './../has-bigint64array-support' ) );

/**
* @name hasBigUint64ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-biguint64array-support}
*/
setReadOnly( ns, 'hasBigUint64ArraySupport', require( './../has-biguint64array-support' ) );

/**
* @name hasClassSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-class-support}
*/
setReadOnly( ns, 'hasClassSupport', require( './../has-class-support' ) );

/**
* @name hasDataViewSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-dataview-support}
*/
setReadOnly( ns, 'hasDataViewSupport', require( './../has-dataview-support' ) );

/**
* @name hasDefinePropertiesSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-define-properties-support}
*/
setReadOnly( ns, 'hasDefinePropertiesSupport', require( './../has-define-properties-support' ) );

/**
* @name hasDefinePropertySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-define-property-support}
*/
setReadOnly( ns, 'hasDefinePropertySupport', require( './../has-define-property-support' ) );

/**
* @name hasFloat32ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-float32array-support}
*/
setReadOnly( ns, 'hasFloat32ArraySupport', require( './../has-float32array-support' ) );

/**
* @name hasFloat64ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-float64array-support}
*/
setReadOnly( ns, 'hasFloat64ArraySupport', require( './../has-float64array-support' ) );

/**
* @name hasFunctionNameSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-function-name-support}
*/
setReadOnly( ns, 'hasFunctionNameSupport', require( './../has-function-name-support' ) );

/**
* @name hasGeneratorSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-generator-support}
*/
setReadOnly( ns, 'hasGeneratorSupport', require( './../has-generator-support' ) );

/**
* @name hasGlobalThisSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-globalthis-support}
*/
setReadOnly( ns, 'hasGlobalThisSupport', require( './../has-globalthis-support' ) );

/**
* @name hasInt8ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-int8array-support}
*/
setReadOnly( ns, 'hasInt8ArraySupport', require( './../has-int8array-support' ) );

/**
* @name hasInt16ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-int16array-support}
*/
setReadOnly( ns, 'hasInt16ArraySupport', require( './../has-int16array-support' ) );

/**
* @name hasInt32ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-int32array-support}
*/
setReadOnly( ns, 'hasInt32ArraySupport', require( './../has-int32array-support' ) );

/**
* @name hasIteratorSymbolSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-iterator-symbol-support}
*/
setReadOnly( ns, 'hasIteratorSymbolSupport', require( './../has-iterator-symbol-support' ) );

/**
* @name hasMapSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-map-support}
*/
setReadOnly( ns, 'hasMapSupport', require( './../has-map-support' ) );

/**
* @name hasNodeBufferSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-node-buffer-support}
*/
setReadOnly( ns, 'hasNodeBufferSupport', require( './../has-node-buffer-support' ) );

/**
* @name hasOwnProp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-own-property}
*/
setReadOnly( ns, 'hasOwnProp', require( './../has-own-property' ) );

/**
* @name hasProp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-property}
*/
setReadOnly( ns, 'hasProp', require( './../has-property' ) );

/**
* @name hasProxySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-proxy-support}
*/
setReadOnly( ns, 'hasProxySupport', require( './../has-proxy-support' ) );

/**
* @name hasSetSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-set-support}
*/
setReadOnly( ns, 'hasSetSupport', require( './../has-set-support' ) );

/**
* @name hasSharedArrayBufferSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-sharedarraybuffer-support}
*/
setReadOnly( ns, 'hasSharedArrayBufferSupport', require( './../has-sharedarraybuffer-support' ) );

/**
* @name hasSymbolSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-symbol-support}
*/
setReadOnly( ns, 'hasSymbolSupport', require( './../has-symbol-support' ) );

/**
* @name hasToStringTagSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-tostringtag-support}
*/
setReadOnly( ns, 'hasToStringTagSupport', require( './../has-tostringtag-support' ) );

/**
* @name hasUint8ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-uint8array-support}
*/
setReadOnly( ns, 'hasUint8ArraySupport', require( './../has-uint8array-support' ) );

/**
* @name hasUint8ClampedArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-uint8clampedarray-support}
*/
setReadOnly( ns, 'hasUint8ClampedArraySupport', require( './../has-uint8clampedarray-support' ) );

/**
* @name hasUint16ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-uint16array-support}
*/
setReadOnly( ns, 'hasUint16ArraySupport', require( './../has-uint16array-support' ) );

/**
* @name hasUint32ArraySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-uint32array-support}
*/
setReadOnly( ns, 'hasUint32ArraySupport', require( './../has-uint32array-support' ) );

/**
* @name hasUTF16SurrogatePairAt
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-utf16-surrogate-pair-at}
*/
setReadOnly( ns, 'hasUTF16SurrogatePairAt', require( './../has-utf16-surrogate-pair-at' ) );

/**
* @name hasWebAssemblySupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-wasm-support}
*/
setReadOnly( ns, 'hasWebAssemblySupport', require( './../has-wasm-support' ) );

/**
* @name hasWeakMapSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-weakmap-support}
*/
setReadOnly( ns, 'hasWeakMapSupport', require( './../has-weakmap-support' ) );

/**
* @name hasWeakSetSupport
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/has-weakset-support}
*/
setReadOnly( ns, 'hasWeakSetSupport', require( './../has-weakset-support' ) );

/**
* @name instanceOf
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/instance-of}
*/
setReadOnly( ns, 'instanceOf', require( './../instance-of' ) );

/**
* @name isAbsolutePath
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-absolute-path}
*/
setReadOnly( ns, 'isAbsolutePath', require( './../is-absolute-path' ) );

/**
* @name isAccessorProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-accessor-property}
*/
setReadOnly( ns, 'isAccessorProperty', require( './../is-accessor-property' ) );

/**
* @name isAccessorPropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-accessor-property-in}
*/
setReadOnly( ns, 'isAccessorPropertyIn', require( './../is-accessor-property-in' ) );

/**
* @name isAlphagram
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-alphagram}
*/
setReadOnly( ns, 'isAlphagram', require( './../is-alphagram' ) );

/**
* @name isAlphaNumeric
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-alphanumeric}
*/
setReadOnly( ns, 'isAlphaNumeric', require( './../is-alphanumeric' ) );

/**
* @name isAnagram
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-anagram}
*/
setReadOnly( ns, 'isAnagram', require( './../is-anagram' ) );

/**
* @name isArguments
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-arguments}
*/
setReadOnly( ns, 'isArguments', require( './../is-arguments' ) );

/**
* @name isArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array}
*/
setReadOnly( ns, 'isArray', require( './../is-array' ) );

/**
* @name isArrayArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-array}
*/
setReadOnly( ns, 'isArrayArray', require( './../is-array-array' ) );

/**
* @name isArrayLength
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-length}
*/
setReadOnly( ns, 'isArrayLength', require( './../is-array-length' ) );

/**
* @name isArrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-like}
*/
setReadOnly( ns, 'isArrayLike', require( './../is-array-like' ) );

/**
* @name isArrayLikeObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-array-like-object}
*/
setReadOnly( ns, 'isArrayLikeObject', require( './../is-array-like-object' ) );

/**
* @name isArrayBuffer
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-arraybuffer}
*/
setReadOnly( ns, 'isArrayBuffer', require( './../is-arraybuffer' ) );

/**
* @name isArrayBufferView
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-arraybuffer-view}
*/
setReadOnly( ns, 'isArrayBufferView', require( './../is-arraybuffer-view' ) );

/**
* @name isArrowFunction
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-arrow-function}
*/
setReadOnly( ns, 'isArrowFunction', require( './../is-arrow-function' ) );

/**
* @name isASCII
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-ascii}
*/
setReadOnly( ns, 'isASCII', require( './../is-ascii' ) );

/**
* @name isBetween
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-between}
*/
setReadOnly( ns, 'isBetween', require( './../is-between' ) );

/**
* @name isBetweenArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-between-array}
*/
setReadOnly( ns, 'isBetweenArray', require( './../is-between-array' ) );

/**
* @name IS_BIG_ENDIAN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-big-endian}
*/
setReadOnly( ns, 'IS_BIG_ENDIAN', require( './../is-big-endian' ) );

/**
* @name isBigInt
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-bigint}
*/
setReadOnly( ns, 'isBigInt', require( './../is-bigint' ) );

/**
* @name isBigInt64Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-bigint64array}
*/
setReadOnly( ns, 'isBigInt64Array', require( './../is-bigint64array' ) );

/**
* @name isBigUint64Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-biguint64array}
*/
setReadOnly( ns, 'isBigUint64Array', require( './../is-biguint64array' ) );

/**
* @name isBinaryString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-binary-string}
*/
setReadOnly( ns, 'isBinaryString', require( './../is-binary-string' ) );

/**
* @name isBoolean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-boolean}
*/
setReadOnly( ns, 'isBoolean', require( './../is-boolean' ) );

/**
* @name isBooleanArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-boolean-array}
*/
setReadOnly( ns, 'isBooleanArray', require( './../is-boolean-array' ) );

/**
* @name isBoxedPrimitive
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-boxed-primitive}
*/
setReadOnly( ns, 'isBoxedPrimitive', require( './../is-boxed-primitive' ) );

/**
* @name IS_BROWSER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-browser}
*/
setReadOnly( ns, 'IS_BROWSER', require( './../is-browser' ) );

/**
* @name isBuffer
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-buffer}
*/
setReadOnly( ns, 'isBuffer', require( './../is-buffer' ) );

/**
* @name isCapitalized
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-capitalized}
*/
setReadOnly( ns, 'isCapitalized', require( './../is-capitalized' ) );

/**
* @name isCentrosymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-centrosymmetric-matrix}
*/
setReadOnly( ns, 'isCentrosymmetricMatrix', require( './../is-centrosymmetric-matrix' ) );

/**
* @name isCircular
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-circular}
*/
setReadOnly( ns, 'isCircular', require( './../is-circular' ) );

/**
* @name isCircularArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-circular-array}
*/
setReadOnly( ns, 'isCircularArray', require( './../is-circular-array' ) );

/**
* @name isCircularPlainObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-circular-plain-object}
*/
setReadOnly( ns, 'isCircularPlainObject', require( './../is-circular-plain-object' ) );

/**
* @name isClass
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-class}
*/
setReadOnly( ns, 'isClass', require( './../is-class' ) );

/**
* @name isCollection
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-collection}
*/
setReadOnly( ns, 'isCollection', require( './../is-collection' ) );

/**
* @name isComplex
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex}
*/
setReadOnly( ns, 'isComplex', require( './../is-complex' ) );

/**
* @name isComplexLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex-like}
*/
setReadOnly( ns, 'isComplexLike', require( './../is-complex-like' ) );

/**
* @name isComplexTypedArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex-typed-array}
*/
setReadOnly( ns, 'isComplexTypedArray', require( './../is-complex-typed-array' ) );

/**
* @name isComplexTypedArrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex-typed-array-like}
*/
setReadOnly( ns, 'isComplexTypedArrayLike', require( './../is-complex-typed-array-like' ) );

/**
* @name isComplex64
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex64}
*/
setReadOnly( ns, 'isComplex64', require( './../is-complex64' ) );

/**
* @name isComplex64Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex64array}
*/
setReadOnly( ns, 'isComplex64Array', require( './../is-complex64array' ) );

/**
* @name isComplex128
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex128}
*/
setReadOnly( ns, 'isComplex128', require( './../is-complex128' ) );

/**
* @name isComplex128Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-complex128array}
*/
setReadOnly( ns, 'isComplex128Array', require( './../is-complex128array' ) );

/**
* @name isComposite
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-composite}
*/
setReadOnly( ns, 'isComposite', require( './../is-composite' ) );

/**
* @name isConfigurableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-configurable-property}
*/
setReadOnly( ns, 'isConfigurableProperty', require( './../is-configurable-property' ) );

/**
* @name isConfigurablePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-configurable-property-in}
*/
setReadOnly( ns, 'isConfigurablePropertyIn', require( './../is-configurable-property-in' ) );

/**
* @name isCubeNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-cube-number}
*/
setReadOnly( ns, 'isCubeNumber', require( './../is-cube-number' ) );

/**
* @name IS_DARWIN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-darwin}
*/
setReadOnly( ns, 'IS_DARWIN', require( './../is-darwin' ) );

/**
* @name isDataProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-data-property}
*/
setReadOnly( ns, 'isDataProperty', require( './../is-data-property' ) );

/**
* @name isDataPropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-data-property-in}
*/
setReadOnly( ns, 'isDataPropertyIn', require( './../is-data-property-in' ) );

/**
* @name isDataView
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-dataview}
*/
setReadOnly( ns, 'isDataView', require( './../is-dataview' ) );

/**
* @name isDateObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-date-object}
*/
setReadOnly( ns, 'isDateObject', require( './../is-date-object' ) );

/**
* @name isDigitString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-digit-string}
*/
setReadOnly( ns, 'isDigitString', require( './../is-digit-string' ) );

/**
* @name IS_DOCKER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-docker}
*/
setReadOnly( ns, 'IS_DOCKER', require( './../is-docker' ) );

/**
* @name IS_ELECTRON
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-electron}
*/
setReadOnly( ns, 'IS_ELECTRON', require( './../is-electron' ) );

/**
* @name IS_ELECTRON_MAIN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-electron-main}
*/
setReadOnly( ns, 'IS_ELECTRON_MAIN', require( './../is-electron-main' ) );

/**
* @name IS_ELECTRON_RENDERER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-electron-renderer}
*/
setReadOnly( ns, 'IS_ELECTRON_RENDERER', require( './../is-electron-renderer' ) );

/**
* @name isEmailAddress
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-email-address}
*/
setReadOnly( ns, 'isEmailAddress', require( './../is-email-address' ) );

/**
* @name isEmptyArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-empty-array}
*/
setReadOnly( ns, 'isEmptyArray', require( './../is-empty-array' ) );

/**
* @name isEmptyObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-empty-object}
*/
setReadOnly( ns, 'isEmptyObject', require( './../is-empty-object' ) );

/**
* @name isEmptyString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-empty-string}
*/
setReadOnly( ns, 'isEmptyString', require( './../is-empty-string' ) );

/**
* @name isEnumerableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-enumerable-property}
*/
setReadOnly( ns, 'isEnumerableProperty', require( './../is-enumerable-property' ) );

/**
* @name isEnumerablePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-enumerable-property-in}
*/
setReadOnly( ns, 'isEnumerablePropertyIn', require( './../is-enumerable-property-in' ) );

/**
* @name isError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-error}
*/
setReadOnly( ns, 'isError', require( './../is-error' ) );

/**
* @name isEvalError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-eval-error}
*/
setReadOnly( ns, 'isEvalError', require( './../is-eval-error' ) );

/**
* @name isEven
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-even}
*/
setReadOnly( ns, 'isEven', require( './../is-even' ) );

/**
* @name isFalsy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-falsy}
*/
setReadOnly( ns, 'isFalsy', require( './../is-falsy' ) );

/**
* @name isFalsyArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-falsy-array}
*/
setReadOnly( ns, 'isFalsyArray', require( './../is-falsy-array' ) );

/**
* @name isFinite
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-finite}
*/
setReadOnly( ns, 'isFinite', require( './../is-finite' ) );

/**
* @name isFiniteArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-finite-array}
*/
setReadOnly( ns, 'isFiniteArray', require( './../is-finite-array' ) );

/**
* @name isFloat32Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float32array}
*/
setReadOnly( ns, 'isFloat32Array', require( './../is-float32array' ) );

/**
* @name isFloat32MatrixLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float32matrix-like}
*/
setReadOnly( ns, 'isFloat32MatrixLike', require( './../is-float32matrix-like' ) );

/**
* @name isFloat32ndarrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float32ndarray-like}
*/
setReadOnly( ns, 'isFloat32ndarrayLike', require( './../is-float32ndarray-like' ) );

/**
* @name isFloat32VectorLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float32vector-like}
*/
setReadOnly( ns, 'isFloat32VectorLike', require( './../is-float32vector-like' ) );

/**
* @name isFloat64Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float64array}
*/
setReadOnly( ns, 'isFloat64Array', require( './../is-float64array' ) );

/**
* @name isFloat64MatrixLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float64matrix-like}
*/
setReadOnly( ns, 'isFloat64MatrixLike', require( './../is-float64matrix-like' ) );

/**
* @name isFloat64ndarrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float64ndarray-like}
*/
setReadOnly( ns, 'isFloat64ndarrayLike', require( './../is-float64ndarray-like' ) );

/**
* @name isFloat64VectorLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-float64vector-like}
*/
setReadOnly( ns, 'isFloat64VectorLike', require( './../is-float64vector-like' ) );

/**
* @name isFunction
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-function}
*/
setReadOnly( ns, 'isFunction', require( './../is-function' ) );

/**
* @name isFunctionArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-function-array}
*/
setReadOnly( ns, 'isFunctionArray', require( './../is-function-array' ) );

/**
* @name isGeneratorObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-generator-object}
*/
setReadOnly( ns, 'isGeneratorObject', require( './../is-generator-object' ) );

/**
* @name isGeneratorObjectLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-generator-object-like}
*/
setReadOnly( ns, 'isGeneratorObjectLike', require( './../is-generator-object-like' ) );

/**
* @name isgzipBuffer
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-gzip-buffer}
*/
setReadOnly( ns, 'isgzipBuffer', require( './../is-gzip-buffer' ) );

/**
* @name isHexString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-hex-string}
*/
setReadOnly( ns, 'isHexString', require( './../is-hex-string' ) );

/**
* @name isInfinite
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-infinite}
*/
setReadOnly( ns, 'isInfinite', require( './../is-infinite' ) );

/**
* @name isInheritedProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-inherited-property}
*/
setReadOnly( ns, 'isInheritedProperty', require( './../is-inherited-property' ) );

/**
* @name isInt8Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-int8array}
*/
setReadOnly( ns, 'isInt8Array', require( './../is-int8array' ) );

/**
* @name isInt16Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-int16array}
*/
setReadOnly( ns, 'isInt16Array', require( './../is-int16array' ) );

/**
* @name isInt32Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-int32array}
*/
setReadOnly( ns, 'isInt32Array', require( './../is-int32array' ) );

/**
* @name isInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-integer}
*/
setReadOnly( ns, 'isInteger', require( './../is-integer' ) );

/**
* @name isIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-integer-array}
*/
setReadOnly( ns, 'isIntegerArray', require( './../is-integer-array' ) );

/**
* @name isIterableLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-iterable-like}
*/
setReadOnly( ns, 'isIterableLike', require( './../is-iterable-like' ) );

/**
* @name isIteratorLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-iterator-like}
*/
setReadOnly( ns, 'isIteratorLike', require( './../is-iterator-like' ) );

/**
* @name isJSON
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-json}
*/
setReadOnly( ns, 'isJSON', require( './../is-json' ) );

/**
* @name isLeapYear
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-leap-year}
*/
setReadOnly( ns, 'isLeapYear', require( './../is-leap-year' ) );

/**
* @name IS_LITTLE_ENDIAN
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-little-endian}
*/
setReadOnly( ns, 'IS_LITTLE_ENDIAN', require( './../is-little-endian' ) );

/**
* @name isLowercase
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-lowercase}
*/
setReadOnly( ns, 'isLowercase', require( './../is-lowercase' ) );

/**
* @name isMatrixLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-matrix-like}
*/
setReadOnly( ns, 'isMatrixLike', require( './../is-matrix-like' ) );

/**
* @name isMethod
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-method}
*/
setReadOnly( ns, 'isMethod', require( './../is-method' ) );

/**
* @name isMethodIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-method-in}
*/
setReadOnly( ns, 'isMethodIn', require( './../is-method-in' ) );

/**
* @name IS_MOBILE
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-mobile}
*/
setReadOnly( ns, 'IS_MOBILE', require( './../is-mobile' ) );

/**
* @name isNamedTypedTupleLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-named-typed-tuple-like}
*/
setReadOnly( ns, 'isNamedTypedTupleLike', require( './../is-named-typed-tuple-like' ) );

/**
* @name isnan
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nan}
*/
setReadOnly( ns, 'isnan', require( './../is-nan' ) );

/**
* @name isNaNArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nan-array}
*/
setReadOnly( ns, 'isNaNArray', require( './../is-nan-array' ) );

/**
* @name isNativeFunction
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-native-function}
*/
setReadOnly( ns, 'isNativeFunction', require( './../is-native-function' ) );

/**
* @name isndarrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-ndarray-like}
*/
setReadOnly( ns, 'isndarrayLike', require( './../is-ndarray-like' ) );

/**
* @name isNegativeInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-integer}
*/
setReadOnly( ns, 'isNegativeInteger', require( './../is-negative-integer' ) );

/**
* @name isNegativeIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-integer-array}
*/
setReadOnly( ns, 'isNegativeIntegerArray', require( './../is-negative-integer-array' ) );

/**
* @name isNegativeNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-number}
*/
setReadOnly( ns, 'isNegativeNumber', require( './../is-negative-number' ) );

/**
* @name isNegativeNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-number-array}
*/
setReadOnly( ns, 'isNegativeNumberArray', require( './../is-negative-number-array' ) );

/**
* @name isNegativeZero
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-negative-zero}
*/
setReadOnly( ns, 'isNegativeZero', require( './../is-negative-zero' ) );

/**
* @name IS_NODE
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-node}
*/
setReadOnly( ns, 'IS_NODE', require( './../is-node' ) );

/**
* @name isNodeBuiltin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-builtin}
*/
setReadOnly( ns, 'isNodeBuiltin', require( './../is-node-builtin' ) );

/**
* @name isNodeDuplexStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-duplex-stream-like}
*/
setReadOnly( ns, 'isNodeDuplexStreamLike', require( './../is-node-duplex-stream-like' ) );

/**
* @name isNodeReadableStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-readable-stream-like}
*/
setReadOnly( ns, 'isNodeReadableStreamLike', require( './../is-node-readable-stream-like' ) );

/**
* @name isNodeREPL
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-repl}
*/
setReadOnly( ns, 'isNodeREPL', require( './../is-node-repl' ) );

/**
* @name isNodeStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-stream-like}
*/
setReadOnly( ns, 'isNodeStreamLike', require( './../is-node-stream-like' ) );

/**
* @name isNodeTransformStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-transform-stream-like}
*/
setReadOnly( ns, 'isNodeTransformStreamLike', require( './../is-node-transform-stream-like' ) );

/**
* @name isNodeWritableStreamLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-node-writable-stream-like}
*/
setReadOnly( ns, 'isNodeWritableStreamLike', require( './../is-node-writable-stream-like' ) );

/**
* @name isNonConfigurableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonconfigurable-property}
*/
setReadOnly( ns, 'isNonConfigurableProperty', require( './../is-nonconfigurable-property' ) );

/**
* @name isNonConfigurablePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonconfigurable-property-in}
*/
setReadOnly( ns, 'isNonConfigurablePropertyIn', require( './../is-nonconfigurable-property-in' ) );

/**
* @name isNonEnumerableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonenumerable-property}
*/
setReadOnly( ns, 'isNonEnumerableProperty', require( './../is-nonenumerable-property' ) );

/**
* @name isNonEnumerablePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonenumerable-property-in}
*/
setReadOnly( ns, 'isNonEnumerablePropertyIn', require( './../is-nonenumerable-property-in' ) );

/**
* @name isNonNegativeInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-integer}
*/
setReadOnly( ns, 'isNonNegativeInteger', require( './../is-nonnegative-integer' ) );

/**
* @name isNonNegativeIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-integer-array}
*/
setReadOnly( ns, 'isNonNegativeIntegerArray', require( './../is-nonnegative-integer-array' ) );

/**
* @name isNonNegativeNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-number}
*/
setReadOnly( ns, 'isNonNegativeNumber', require( './../is-nonnegative-number' ) );

/**
* @name isNonNegativeNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonnegative-number-array}
*/
setReadOnly( ns, 'isNonNegativeNumberArray', require( './../is-nonnegative-number-array' ) );

/**
* @name isNonPositiveInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-integer}
*/
setReadOnly( ns, 'isNonPositiveInteger', require( './../is-nonpositive-integer' ) );

/**
* @name isNonPositiveIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-integer-array}
*/
setReadOnly( ns, 'isNonPositiveIntegerArray', require( './../is-nonpositive-integer-array' ) );

/**
* @name isNonPositiveNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-number}
*/
setReadOnly( ns, 'isNonPositiveNumber', require( './../is-nonpositive-number' ) );

/**
* @name isNonPositiveNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonpositive-number-array}
*/
setReadOnly( ns, 'isNonPositiveNumberArray', require( './../is-nonpositive-number-array' ) );

/**
* @name isNonSymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-nonsymmetric-matrix}
*/
setReadOnly( ns, 'isNonSymmetricMatrix', require( './../is-nonsymmetric-matrix' ) );

/**
* @name isNull
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-null}
*/
setReadOnly( ns, 'isNull', require( './../is-null' ) );

/**
* @name isNullArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-null-array}
*/
setReadOnly( ns, 'isNullArray', require( './../is-null-array' ) );

/**
* @name isNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-number}
*/
setReadOnly( ns, 'isNumber', require( './../is-number' ) );

/**
* @name isNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-number-array}
*/
setReadOnly( ns, 'isNumberArray', require( './../is-number-array' ) );

/**
* @name isNumericArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-numeric-array}
*/
setReadOnly( ns, 'isNumericArray', require( './../is-numeric-array' ) );

/**
* @name isObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-object}
*/
setReadOnly( ns, 'isObject', require( './../is-object' ) );

/**
* @name isObjectArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-object-array}
*/
setReadOnly( ns, 'isObjectArray', require( './../is-object-array' ) );

/**
* @name isObjectLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-object-like}
*/
setReadOnly( ns, 'isObjectLike', require( './../is-object-like' ) );

/**
* @name isOdd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-odd}
*/
setReadOnly( ns, 'isOdd', require( './../is-odd' ) );

/**
* @name isPersymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-persymmetric-matrix}
*/
setReadOnly( ns, 'isPersymmetricMatrix', require( './../is-persymmetric-matrix' ) );

/**
* @name isPlainObject
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-plain-object}
*/
setReadOnly( ns, 'isPlainObject', require( './../is-plain-object' ) );

/**
* @name isPlainObjectArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-plain-object-array}
*/
setReadOnly( ns, 'isPlainObjectArray', require( './../is-plain-object-array' ) );

/**
* @name isPositiveInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-integer}
*/
setReadOnly( ns, 'isPositiveInteger', require( './../is-positive-integer' ) );

/**
* @name isPositiveIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-integer-array}
*/
setReadOnly( ns, 'isPositiveIntegerArray', require( './../is-positive-integer-array' ) );

/**
* @name isPositiveNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-number}
*/
setReadOnly( ns, 'isPositiveNumber', require( './../is-positive-number' ) );

/**
* @name isPositiveNumberArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-number-array}
*/
setReadOnly( ns, 'isPositiveNumberArray', require( './../is-positive-number-array' ) );

/**
* @name isPositiveZero
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-positive-zero}
*/
setReadOnly( ns, 'isPositiveZero', require( './../is-positive-zero' ) );

/**
* @name isPrime
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-prime}
*/
setReadOnly( ns, 'isPrime', require( './../is-prime' ) );

/**
* @name isPrimitive
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-primitive}
*/
setReadOnly( ns, 'isPrimitive', require( './../is-primitive' ) );

/**
* @name isPrimitiveArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-primitive-array}
*/
setReadOnly( ns, 'isPrimitiveArray', require( './../is-primitive-array' ) );

/**
* @name isPRNGLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-prng-like}
*/
setReadOnly( ns, 'isPRNGLike', require( './../is-prng-like' ) );

/**
* @name isProbability
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-probability}
*/
setReadOnly( ns, 'isProbability', require( './../is-probability' ) );

/**
* @name isProbabilityArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-probability-array}
*/
setReadOnly( ns, 'isProbabilityArray', require( './../is-probability-array' ) );

/**
* @name isPrototypeOf
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-prototype-of}
*/
setReadOnly( ns, 'isPrototypeOf', require( './../is-prototype-of' ) );

/**
* @name isRangeError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-range-error}
*/
setReadOnly( ns, 'isRangeError', require( './../is-range-error' ) );

/**
* @name isReadOnlyProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-read-only-property}
*/
setReadOnly( ns, 'isReadOnlyProperty', require( './../is-read-only-property' ) );

/**
* @name isReadOnlyPropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-read-only-property-in}
*/
setReadOnly( ns, 'isReadOnlyPropertyIn', require( './../is-read-only-property-in' ) );

/**
* @name isReadWriteProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-read-write-property}
*/
setReadOnly( ns, 'isReadWriteProperty', require( './../is-read-write-property' ) );

/**
* @name isReadWritePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-read-write-property-in}
*/
setReadOnly( ns, 'isReadWritePropertyIn', require( './../is-read-write-property-in' ) );

/**
* @name isReadableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-readable-property}
*/
setReadOnly( ns, 'isReadableProperty', require( './../is-readable-property' ) );

/**
* @name isReadablePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-readable-property-in}
*/
setReadOnly( ns, 'isReadablePropertyIn', require( './../is-readable-property-in' ) );

/**
* @name isReferenceError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-reference-error}
*/
setReadOnly( ns, 'isReferenceError', require( './../is-reference-error' ) );

/**
* @name isRegExp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-regexp}
*/
setReadOnly( ns, 'isRegExp', require( './../is-regexp' ) );

/**
* @name isRegExpString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-regexp-string}
*/
setReadOnly( ns, 'isRegExpString', require( './../is-regexp-string' ) );

/**
* @name isRelativePath
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-relative-path}
*/
setReadOnly( ns, 'isRelativePath', require( './../is-relative-path' ) );

/**
* @name isSafeInteger
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-safe-integer}
*/
setReadOnly( ns, 'isSafeInteger', require( './../is-safe-integer' ) );

/**
* @name isSafeIntegerArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-safe-integer-array}
*/
setReadOnly( ns, 'isSafeIntegerArray', require( './../is-safe-integer-array' ) );

/**
* @name isSameValue
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-same-value}
*/
setReadOnly( ns, 'isSameValue', require( './../is-same-value' ) );

/**
* @name isSameValueZero
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-same-value-zero}
*/
setReadOnly( ns, 'isSameValueZero', require( './../is-same-value-zero' ) );

/**
* @name isSharedArrayBuffer
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-sharedarraybuffer}
*/
setReadOnly( ns, 'isSharedArrayBuffer', require( './../is-sharedarraybuffer' ) );

/**
* @name isSkewCentrosymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-skew-centrosymmetric-matrix}
*/
setReadOnly( ns, 'isSkewCentrosymmetricMatrix', require( './../is-skew-centrosymmetric-matrix' ) );

/**
* @name isSkewPersymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-skew-persymmetric-matrix}
*/
setReadOnly( ns, 'isSkewPersymmetricMatrix', require( './../is-skew-persymmetric-matrix' ) );

/**
* @name isSkewSymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-skew-symmetric-matrix}
*/
setReadOnly( ns, 'isSkewSymmetricMatrix', require( './../is-skew-symmetric-matrix' ) );

/**
* @name isSquareMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-square-matrix}
*/
setReadOnly( ns, 'isSquareMatrix', require( './../is-square-matrix' ) );

/**
* @name isSquareNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-square-number}
*/
setReadOnly( ns, 'isSquareNumber', require( './../is-square-number' ) );

/**
* @name isSquareTriangularNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-square-triangular-number}
*/
setReadOnly( ns, 'isSquareTriangularNumber', require( './../is-square-triangular-number' ) );

/**
* @name isStrictEqual
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-strict-equal}
*/
setReadOnly( ns, 'isStrictEqual', require( './../is-strict-equal' ) );

/**
* @name isString
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-string}
*/
setReadOnly( ns, 'isString', require( './../is-string' ) );

/**
* @name isStringArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-string-array}
*/
setReadOnly( ns, 'isStringArray', require( './../is-string-array' ) );

/**
* @name isSymbol
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-symbol}
*/
setReadOnly( ns, 'isSymbol', require( './../is-symbol' ) );

/**
* @name isSymbolArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-symbol-array}
*/
setReadOnly( ns, 'isSymbolArray', require( './../is-symbol-array' ) );

/**
* @name isSymmetricMatrix
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-symmetric-matrix}
*/
setReadOnly( ns, 'isSymmetricMatrix', require( './../is-symmetric-matrix' ) );

/**
* @name isSyntaxError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-syntax-error}
*/
setReadOnly( ns, 'isSyntaxError', require( './../is-syntax-error' ) );

/**
* @name IS_TOUCH_DEVICE
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-touch-device}
*/
setReadOnly( ns, 'IS_TOUCH_DEVICE', require( './../is-touch-device' ) );

/**
* @name isTriangularNumber
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-triangular-number}
*/
setReadOnly( ns, 'isTriangularNumber', require( './../is-triangular-number' ) );

/**
* @name isTruthy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-truthy}
*/
setReadOnly( ns, 'isTruthy', require( './../is-truthy' ) );

/**
* @name isTruthyArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-truthy-array}
*/
setReadOnly( ns, 'isTruthyArray', require( './../is-truthy-array' ) );

/**
* @name isTypeError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-type-error}
*/
setReadOnly( ns, 'isTypeError', require( './../is-type-error' ) );

/**
* @name isTypedArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-typed-array}
*/
setReadOnly( ns, 'isTypedArray', require( './../is-typed-array' ) );

/**
* @name isTypedArrayLength
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-typed-array-length}
*/
setReadOnly( ns, 'isTypedArrayLength', require( './../is-typed-array-length' ) );

/**
* @name isTypedArrayLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-typed-array-like}
*/
setReadOnly( ns, 'isTypedArrayLike', require( './../is-typed-array-like' ) );

/**
* @name isUint8Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint8array}
*/
setReadOnly( ns, 'isUint8Array', require( './../is-uint8array' ) );

/**
* @name isUint8ClampedArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint8clampedarray}
*/
setReadOnly( ns, 'isUint8ClampedArray', require( './../is-uint8clampedarray' ) );

/**
* @name isUint16Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint16array}
*/
setReadOnly( ns, 'isUint16Array', require( './../is-uint16array' ) );

/**
* @name isUint32Array
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uint32array}
*/
setReadOnly( ns, 'isUint32Array', require( './../is-uint32array' ) );

/**
* @name isUNCPath
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-unc-path}
*/
setReadOnly( ns, 'isUNCPath', require( './../is-unc-path' ) );

/**
* @name isUndefined
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-undefined}
*/
setReadOnly( ns, 'isUndefined', require( './../is-undefined' ) );

/**
* @name isUndefinedOrNull
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-undefined-or-null}
*/
setReadOnly( ns, 'isUndefinedOrNull', require( './../is-undefined-or-null' ) );

/**
* @name isUnityProbabilityArray
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-unity-probability-array}
*/
setReadOnly( ns, 'isUnityProbabilityArray', require( './../is-unity-probability-array' ) );

/**
* @name isUppercase
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uppercase}
*/
setReadOnly( ns, 'isUppercase', require( './../is-uppercase' ) );

/**
* @name isURI
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uri}
*/
setReadOnly( ns, 'isURI', require( './../is-uri' ) );

/**
* @name isURIError
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-uri-error}
*/
setReadOnly( ns, 'isURIError', require( './../is-uri-error' ) );

/**
* @name isVectorLike
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-vector-like}
*/
setReadOnly( ns, 'isVectorLike', require( './../is-vector-like' ) );

/**
* @name IS_WEB_WORKER
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-web-worker}
*/
setReadOnly( ns, 'IS_WEB_WORKER', require( './../is-web-worker' ) );

/**
* @name isWhitespace
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-whitespace}
*/
setReadOnly( ns, 'isWhitespace', require( './../is-whitespace' ) );

/**
* @name IS_WINDOWS
* @memberof ns
* @readonly
* @type {boolean}
* @see {@link module:@stdlib/assert/is-windows}
*/
setReadOnly( ns, 'IS_WINDOWS', require( './../is-windows' ) );

/**
* @name isWritableProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-writable-property}
*/
setReadOnly( ns, 'isWritableProperty', require( './../is-writable-property' ) );

/**
* @name isWritablePropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-writable-property-in}
*/
setReadOnly( ns, 'isWritablePropertyIn', require( './../is-writable-property-in' ) );

/**
* @name isWriteOnlyProperty
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-write-only-property}
*/
setReadOnly( ns, 'isWriteOnlyProperty', require( './../is-write-only-property' ) );

/**
* @name isWriteOnlyPropertyIn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/assert/is-write-only-property-in}
*/
setReadOnly( ns, 'isWriteOnlyPropertyIn', require( './../is-write-only-property-in' ) );


// EXPORTS //

module.exports = ns;
