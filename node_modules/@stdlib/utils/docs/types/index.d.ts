/*
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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

// TypeScript Version: 2.0

/* tslint:disable:max-line-length */
/* tslint:disable:max-file-line-count */

import any = require( './../../any' );
import anyBy = require( './../../any-by' );
import anyByRight = require( './../../any-by-right' );
import append = require( './../../append' );
import argumentFunction = require( './../../argument-function' );
import async = require( './../../async' );
import bifurcate = require( './../../bifurcate' );
import bifurcateBy = require( './../../bifurcate-by' );
import bifurcateIn = require( './../../bifurcate-in' );
import bifurcateOwn = require( './../../bifurcate-own' );
import capitalizeKeys = require( './../../capitalize-keys' );
import CircularBuffer = require( './../../circular-buffer' );
import compose = require( './../../compose' );
import constantFunction = require( './../../constant-function' );
import constructorName = require( './../../constructor-name' );
import convertPath = require( './../../convert-path' );
import copy = require( './../../copy' );
import countBy = require( './../../count-by' );
import curry = require( './../../curry' );
import curryRight = require( './../../curry-right' );
import deepGet = require( './../../deep-get' );
import deepPluck = require( './../../deep-pluck' );
import deepSet = require( './../../deep-set' );
import setConfigurableReadOnlyAccessor = require( './../../define-configurable-read-only-accessor' );
import setConfigurableReadOnly = require( './../../define-configurable-read-only-property' );
import setConfigurableReadWriteAccessor = require( './../../define-configurable-read-write-accessor' );
import setConfigurableWriteOnlyAccessor = require( './../../define-configurable-write-only-accessor' );
import setMemoizedConfigurableReadOnly = require( './../../define-memoized-configurable-read-only-property' );
import defineMemoizedProperty = require( './../../define-memoized-property' );
import setMemoizedReadOnly = require( './../../define-memoized-read-only-property' );
import setNonEnumerableProperty = require( './../../define-nonenumerable-property' );
import setNonEnumerableReadOnlyAccessor = require( './../../define-nonenumerable-read-only-accessor' );
import setNonEnumerableReadOnly = require( './../../define-nonenumerable-read-only-property' );
import setNonEnumerableReadWriteAccessor = require( './../../define-nonenumerable-read-write-accessor' );
import setNonEnumerableWriteOnlyAccessor = require( './../../define-nonenumerable-write-only-accessor' );
import defineProperties = require( './../../define-properties' );
import defineProperty = require( './../../define-property' );
import setReadOnlyAccessor = require( './../../define-read-only-accessor' );
import setReadOnly = require( './../../define-read-only-property' );
import setReadWriteAccessor = require( './../../define-read-write-accessor' );
import setWriteOnlyAccessor = require( './../../define-write-only-accessor' );
import dirname = require( './../../dirname' );
import doUntil = require( './../../do-until' );
import doUntilEach = require( './../../do-until-each' );
import doUntilEachRight = require( './../../do-until-each-right' );
import doWhile = require( './../../do-while' );
import doWhileEach = require( './../../do-while-each' );
import doWhileEachRight = require( './../../do-while-each-right' );
import DoublyLinkedList = require( './../../doubly-linked-list' );
import objectEntries = require( './../../entries' );
import objectEntriesIn = require( './../../entries-in' );
import enumerableProperties = require( './../../enumerable-properties' );
import enumerablePropertiesIn = require( './../../enumerable-properties-in' );
import enumerablePropertySymbols = require( './../../enumerable-property-symbols' );
import enumerablePropertySymbolsIn = require( './../../enumerable-property-symbols-in' );
import rescape = require( './../../escape-regexp-string' );
import evil = require( './../../eval' );
import every = require( './../../every' );
import everyBy = require( './../../every-by' );
import everyByRight = require( './../../every-by-right' );
import extname = require( './../../extname' );
import FIFO = require( './../../fifo' );
import find = require( './../../find' );
import flattenArray = require( './../../flatten-array' );
import flattenObject = require( './../../flatten-object' );
import forEach = require( './../../for-each' );
import forEachRight = require( './../../for-each-right' );
import forIn = require( './../../for-in' );
import forOwn = require( './../../for-own' );
import objectFromEntries = require( './../../from-entries' );
import functionName = require( './../../function-name' );
import functionSequence = require( './../../function-sequence' );
import getPrototypeOf = require( './../../get-prototype-of' );
import getGlobal = require( './../../global' );
import group = require( './../../group' );
import groupBy = require( './../../group-by' );
import groupIn = require( './../../group-in' );
import groupOwn = require( './../../group-own' );
import identity = require( './../../identity-function' );
import ifelse = require( './../../if-else' );
import ifthen = require( './../../if-then' );
import indexOf = require( './../../index-of' );
import inherit = require( './../../inherit' );
import inheritedEnumerableProperties = require( './../../inherited-enumerable-properties' );
import inheritedEnumerablePropertySymbols = require( './../../inherited-enumerable-property-symbols' );
import inheritedKeys = require( './../../inherited-keys' );
import inheritedNonEnumerableProperties = require( './../../inherited-nonenumerable-properties' );
import inheritedNonEnumerablePropertyNames = require( './../../inherited-nonenumerable-property-names' );
import inheritedNonEnumerablePropertySymbols = require( './../../inherited-nonenumerable-property-symbols' );
import inheritedProperties = require( './../../inherited-properties' );
import inheritedPropertyDescriptor = require( './../../inherited-property-descriptor' );
import inheritedPropertyDescriptors = require( './../../inherited-property-descriptors' );
import inheritedPropertyNames = require( './../../inherited-property-names' );
import inheritedPropertySymbols = require( './../../inherited-property-symbols' );
import inheritedWritableProperties = require( './../../inherited-writable-properties' );
import inheritedWritablePropertyNames = require( './../../inherited-writable-property-names' );
import inheritedWritablePropertySymbols = require( './../../inherited-writable-property-symbols' );
import inmap = require( './../../inmap' );
import inmapRight = require( './../../inmap-right' );
import keyBy = require( './../../key-by' );
import keyByRight = require( './../../key-by-right' );
import objectKeys = require( './../../keys' );
import keysIn = require( './../../keys-in' );
import LinkedList = require( './../../linked-list' );
import lowercaseKeys = require( './../../lowercase-keys' );
import mapFun = require( './../../map-function' );
import mapKeys = require( './../../map-keys' );
import mapValues = require( './../../map-values' );
import memoize = require( './../../memoize' );
import merge = require( './../../merge' );
import moveProperty = require( './../../move-property' );
import namedtypedtuple = require( './../../named-typed-tuple' );
import nativeClass = require( './../../native-class' );
import nextTick = require( './../../next-tick' );
import none = require( './../../none' );
import noneBy = require( './../../none-by' );
import noneByRight = require( './../../none-by-right' );
import nonEnumerableProperties = require( './../../nonenumerable-properties' );
import nonEnumerablePropertiesIn = require( './../../nonenumerable-properties-in' );
import nonEnumerablePropertyNames = require( './../../nonenumerable-property-names' );
import nonEnumerablePropertyNamesIn = require( './../../nonenumerable-property-names-in' );
import nonEnumerablePropertySymbols = require( './../../nonenumerable-property-symbols' );
import nonEnumerablePropertySymbolsIn = require( './../../nonenumerable-property-symbols-in' );
import nonIndexKeys = require( './../../nonindex-keys' );
import noop = require( './../../noop' );
import objectInverse = require( './../../object-inverse' );
import objectInverseBy = require( './../../object-inverse-by' );
import omit = require( './../../omit' );
import omitBy = require( './../../omit-by' );
import openURL = require( './../../open-url' );
import papply = require( './../../papply' );
import papplyRight = require( './../../papply-right' );
import parallel = require( './../../parallel' );
import parseJSON = require( './../../parse-json' );
import pick = require( './../../pick' );
import pickBy = require( './../../pick-by' );
import pluck = require( './../../pluck' );
import pop = require( './../../pop' );
import prepend = require( './../../prepend' );
import properties = require( './../../properties' );
import propertiesIn = require( './../../properties-in' );
import propertyDescriptor = require( './../../property-descriptor' );
import propertyDescriptorIn = require( './../../property-descriptor-in' );
import propertyDescriptors = require( './../../property-descriptors' );
import propertyDescriptorsIn = require( './../../property-descriptors-in' );
import propertyNames = require( './../../property-names' );
import propertyNamesIn = require( './../../property-names-in' );
import propertySymbols = require( './../../property-symbols' );
import propertySymbolsIn = require( './../../property-symbols-in' );
import push = require( './../../push' );
import realmax = require( './../../real-max' );
import realmin = require( './../../real-min' );
import reduce = require( './../../reduce' );
import reduceRight = require( './../../reduce-right' );
import reFromString = require( './../../regexp-from-string' );
import reorderArguments = require( './../../reorder-arguments' );
import reverseArguments = require( './../../reverse-arguments' );
import safeintmax = require( './../../safe-int-max' );
import safeintmin = require( './../../safe-int-min' );
import shift = require( './../../shift' );
import sizeOf = require( './../../size-of' );
import some = require( './../../some' );
import someBy = require( './../../some-by' );
import someByRight = require( './../../some-by-right' );
import Stack = require( './../../stack' );
import tabulate = require( './../../tabulate' );
import tabulateBy = require( './../../tabulate-by' );
import timeit = require( './../../timeit' );
import trycatch = require( './../../try-catch' );
import tryFunction = require( './../../try-function' );
import tryRequire = require( './../../try-require' );
import trythen = require( './../../try-then' );
import typemax = require( './../../type-max' );
import typemin = require( './../../type-min' );
import typeOf = require( './../../type-of' );
import uncapitalizeKeys = require( './../../uncapitalize-keys' );
import uncurry = require( './../../uncurry' );
import uncurryRight = require( './../../uncurry-right' );
import unshift = require( './../../unshift' );
import until = require( './../../until' );
import untilEach = require( './../../until-each' );
import untilEachRight = require( './../../until-each-right' );
import unzip = require( './../../unzip' );
import uppercaseKeys = require( './../../uppercase-keys' );
import objectValues = require( './../../values' );
import objectValuesIn = require( './../../values-in' );
import whilst = require( './../../while' );
import whileEach = require( './../../while-each' );
import whileEachRight = require( './../../while-each-right' );
import writableProperties = require( './../../writable-properties' );
import writablePropertiesIn = require( './../../writable-properties-in' );
import writablePropertyNames = require( './../../writable-property-names' );
import writablePropertyNamesIn = require( './../../writable-property-names-in' );
import writablePropertySymbols = require( './../../writable-property-symbols' );
import writablePropertySymbolsIn = require( './../../writable-property-symbols-in' );
import zip = require( './../../zip' );

/**
* Interface describing the `utils` namespace.
*/
interface Namespace {
	/**
	* Tests whether at least one element in a collection is truthy.
	*
	* ## Notes
	*
	* -   The function immediately returns upon encountering a truthy value.
	* -   If provided an empty collection, the function returns `false`.
	*
	* @param collection - input collection
	* @returns boolean indicating whether at least one element is truthy
	*
	* @example
	* var arr = [ 0, 0, 0, 0, 1 ];
	*
	* var bool = ns.any( arr );
	* // returns true
	*/
	any: typeof any;

	/**
	* Tests whether at least one element in a collection passes a test implemented by a predicate function, iterating from right to left.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon encountering a truthy return value.
	*
	* -   If provided an empty collection, the function returns `false`.
	*
	* @param collection - input collection
	* @param predicate - test function
	* @param thisArg - execution context
	* @returns boolean indicating whether at least one element passes a test
	*
	* @example
	* function isNegative( v ) {
	*     return ( v < 0 );
	* }
	*
	* var arr = [ 1, 2, 3, 4, -1 ];
	*
	* var bool = ns.anyBy( arr, isNegative );
	* // returns true
	*/
	anyBy: typeof anyBy;

	/**
	* Tests whether at least one element in a collection passes a test implemented by a predicate function.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon encountering a truthy return value.
	*
	* -   If provided an empty collection, the function returns `false`.
	*
	* @param collection - input collection
	* @param predicate - test function
	* @param thisArg - execution context
	* @returns boolean indicating whether at least one element passes a test
	*
	* @example
	* function isNegative( v ) {
	*     return ( v < 0 );
	* }
	*
	* var arr = [ -1, 1, 2, 3, 4 ];
	*
	* var bool = ns.anyByRight( arr, isNegative );
	* // returns true
	*/
	anyByRight: typeof anyByRight;

	/**
	* Adds elements from one collection to the end of another collection.
	*
	* @param collection1 - collection
	* @param collection2 - collection containing elements to add
	* @returns updated collection
	*
	* @example
	* var arr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
	*
	* arr = ns.append( arr, [ 6.0, 7.0 ] );
	* // returns [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0 ]
	*
	* @example
	* var Float64Array = require( `@stdlib/array/float64` );
	*
	* var arr = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* arr = ns.append( arr, [ 6.0, 7.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0 ]
	*/
	append: typeof append;

	/**
	* Returns a function which always returns a specified argument.
	*
	* ## Notes
	*
	* -   The input argument corresponds to the zero-based index of the argument to return.
	*
	* @param idx - argument index
	* @throws must provide a nonnegative integer
	* @returns argument function
	*
	* @example
	* var argn = ns.argumentFunction( 1 );
	*
	* var v = argn( 1.0, 2.0, 3.0 );
	* // returns 2.0
	*
	* v = argn( 'a', 'b', 'c' );
	* // returns 'b'
	*
	* v = argn( null );
	* // returns undefined
	*/
	argumentFunction: typeof argumentFunction;

	/**
	* Standard async utilities.
	*/
	async: typeof async;

	/**
	* Splits values into two groups.
	*
	* ## Notes
	*
	* -   If an element in `filter` is truthy, then the corresponding element in the input collection belongs to the first group; otherwise, the collection element belongs to the second group.
	* -   If provided an empty collection, the function returns an empty array.
	*
	* @param collection - input collection
	* @param options - function options
	* @param options.returns - if `values`, values are returned; if `indices`, indices are returned; if `*`, both indices and values are returned (default: 'values')
	* @param filter - collection indicating which group an element in the input collection belongs to
	* @throws first and last arguments must be the same length
	* @returns results
	*
	* @example
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	* var filter = [ true, true, false, true ];
	*
	* var opts = {
	*     'returns': 'indices'
	* };
	*
	* var out = ns.bifurcate( arr, opts, filter );
	* // returns [ [ 0, 1, 3 ], [ 2 ] ]
	*
	* @example
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	* var filter = [ true, true, false, true ];
	*
	* var opts = {
	*     'returns': '*'
	* };
	*
	* var out = ns.bifurcate( arr, opts, filter );
	* // returns [ [ [ 0, 'beep' ], [ 1, 'boop' ], [ 3, 'bar' ] ], [ [ 2, 'foo' ] ] ]
	*/
	bifurcate: typeof bifurcate;

	/**
	* Splits values into two groups according to a predicate function.
	*
	* ## Notes
	*
	* -   When invoked, the predicate function is provided two arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*
	* -   If a predicate function returns a truthy value, a collection value is placed in the first group; otherwise, a collection value is placed in the second group.
	*
	* -   If provided an empty collection, the function returns an empty array.
	*
	*
	* @param collection - input collection
	* @param options - function options
	* @param options.thisArg - execution context
	* @param options.returns - if `'values'`, values are returned; if `'indices'`, indices are returned; if `'*'`, both indices and values are returned (default: 'values')
	* @param predicate - predicate function indicating which group an element in the input collection belongs to
	* @returns group results
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	*
	* var opts = {
	*     'returns': 'indices'
	* };
	* var out = ns.bifurcateBy( arr, opts, predicate );
	* // returns [ [ 0, 1, 3 ], [ 2 ] ]
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	*
	* var opts = {
	*     'returns': '*'
	* };
	* var out = ns.bifurcateBy( arr, opts, predicate );
	* // returns [ [ [ 0, 'beep' ], [ 1, 'boop' ], [ 3, 'bar' ] ], [ [ 2, 'foo' ] ] ]
	*/
	bifurcateBy: typeof bifurcateBy;

	/**
	* Splits an object's own and inherited property values into two groups according to a predicate function.
	*
	* ## Notes
	*
	* -   When invoked, the predicate function is provided two arguments:
	*
	*     -   `value`: object value
	*     -   `key`: object key
	*
	* -   If a predicate function returns a truthy value, a value is placed in the first group; otherwise, a value is placed in the second group.
	*
	* -   If provided an empty object with no prototype, the function returns an empty array.
	*
	* -   The function iterates over an object's own and inherited properties.
	*
	* -   Key iteration order is *not* guaranteed, and, thus, result order is *not* guaranteed.
	*
	* @param input object
	* @param options - function options
	* @param options.thisArg - execution context
	* @param options.returns - if `'values'`, values are returned; if `'keys'`, keys are returned; if `'*'`, both keys and values are returned (default: 'values')
	* @param predicate - predicate function indicating which group an element in the input object belongs to
	* @returns group results
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	*
	* function Foo() {
	*     this.a = 'beep';
	*     this.b = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype = Object.create( null );
	* Foo.prototype.c = 'foo';
	* Foo.prototype.d = 'bar';
	*
	* var obj = new Foo();
	*
	* var opts = {
	*     'returns': 'keys'
	* };
	* var out = ns.bifurcateIn( obj, opts, predicate );
	* // e.g., returns [ [ 'a', 'b', 'd' ], [ 'c' ] ]
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	*
	* function Foo() {
	*     this.a = 'beep';
	*     this.b = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype = Object.create( null );
	* Foo.prototype.c = 'foo';
	* Foo.prototype.d = 'bar';
	*
	* var obj = new Foo();
	*
	* var opts = {
	*     'returns': '*'
	* };
	* var out = ns.bifurcateIn( obj, opts, predicate );
	* // e.g., returns [ [ [ 'a', 'beep' ], [ 'b', 'boop' ], [ 'd', 'bar' ] ], [ [ 'c', 'foo' ] ] ]
	*/
	bifurcateIn: typeof bifurcateIn;

	/**
	* Splits an object's own property values into two groups according to a predicate function.
	*
	* @param obj - input object
	* @param options - function options
	* @param options.thisArg - execution context
	* @param options.returns - if `'values'`, values are returned; if `'keys'`, keys are returned; if `'*'`, both keys and values are returned
	* @param predicate - predicate function indicating which group an element in the input object belongs to
	* @returns group results
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	* var obj = {
	*     'a': 'beep',
	*     'b': 'boop',
	*     'c': 'foo',
	*     'd': 'bar'
	* };
	* var out = ns.bifurcateOwn( obj, predicate );
	* // e.g., returns [ [ 'beep', 'boop', 'bar' ], [ 'foo' ] ]
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	* var obj = {
	*     'a': 'beep',
	*     'b': 'boop',
	*     'c': 'foo',
	*     'd': 'bar'
	* };
	* var opts = {
	*     'returns': 'keys'
	* };
	* var out = ns.bifurcateOwn( obj, opts, predicate );
	* // e.g., returns [ [ 'a', 'b', 'd' ], [ 'c' ] ]
	*
	* @example
	* function predicate( v ) {
	*     return v[ 0 ] === 'b';
	* }
	* var obj = {
	*     'a': 'beep',
	*     'b': 'boop',
	*     'c': 'foo',
	*     'd': 'bar'
	* };
	* var opts = {
	*     'returns': '*'
	* };
	* var out = ns.bifurcateOwn( obj, opts, predicate );
	* // e.g., returns [ [ [ 'a', 'beep' ], [ 'b', 'boop' ], [ 'd', 'bar' ] ], [ [ 'c', 'foo' ] ] ]
	*/
	bifurcateOwn: typeof bifurcateOwn;

	/**
	* Converts the first letter of each object key to uppercase.
	*
	* ## Notes
	*
	* -   The function only transforms own properties. Hence, the function does not transform inherited properties.
	* -   The function shallow copies key values.
	*
	* @param obj - source object
	* @returns new object
	*
	* @example
	* var obj1 = {
	*     'aa': 1,
	*     'bb': 2
	* };
	*
	* var obj2 = ns.capitalizeKeys( obj1 );
	* // returns { 'Aa': 1, 'Bb': 2 }
	*/
	capitalizeKeys: typeof capitalizeKeys;

	/**
	* Circular buffer.
	*/
	CircularBuffer: typeof CircularBuffer;

	/**
	* Function composition.
	*
	* ## Notes
	*
	* -   Returns a composite function. Starting from the right, the composite function evaluates each function and passes the result as an argument to the next function. The result of the leftmost function is the result of the whole.
	* -   Only the rightmost function is explicitly permitted to accept multiple arguments. All other functions are evaluated as unary functions.
	* -   The function will throw if provided fewer than two input arguments.
	*
	* @param fcn - functions to compose
	* @throws must provide more than one argument
	* @returns composite function
	*
	* @example
	* function a( x ) {
	*     return 2 * x;
	* }
	*
	* function b( x ) {
	*     return x + 3;
	* }
	*
	* function c( x ) {
	*     return x / 5;
	* }
	*
	* var f = ns.compose( c, b, a );
	*
	* var z = f( 6 );
	* // returns 3
	*/
	compose: typeof compose;

	/**
	* Creates a function which always returns the same value.
	*
	* ## Notes
	*
	* -   When provided an object reference, the returned `function` always returns the same reference.
	*
	* @param value - value to always return
	* @returns constant function
	*
	* @example
	* var fcn = ns.constantFunction( 3.14 );
	*
	* var v = fcn();
	* // returns 3.14
	*
	* v = fcn();
	* // returns 3.14
	*
	* v = fcn();
	* // returns 3.14
	*/
	constantFunction: typeof constantFunction;

	/**
	* Determines the name of a value's constructor.
	*
	* @param v - input value
	* @returns name of a value's constructor
	*
	* @example
	* var v = ns.constructorName( 'a' );
	* // returns 'String'
	*
	* @example
	* var v = ns.constructorName( 5 );
	* // returns 'Number'
	*
	* @example
	* var v = ns.constructorName( null );
	* // returns 'Null'
	*
	* @example
	* var v = ns.constructorName( undefined );
	* // returns 'Undefined'
	*
	* @example
	* var v = ns.constructorName( function noop() {} );
	* // returns 'Function'
	*/
	constructorName: typeof constructorName;

	/**
	* Converts between POSIX and Windows paths.
	*
	* @param from - path to convert
	* @param to - output path convention
	* @throws second argument must be a recognized output path convention
	* @throws cannot convert a Windows extended-length path to a non-Windows path convention
	* @returns converted path
	*
	* @example
	* var p = ns.convertPath( '/c/foo/bar/beep.c', 'win32' );
	* // returns 'c:\\foo\\bar\\beep.c'
	*
	* @example
	* var p = ns.convertPath( '/c/foo/bar/beep.c', 'mixed' );
	* // returns 'c:/foo/bar/beep.c'
	*
	* @example
	* var p = ns.convertPath( 'C:\\foo\\bar\\beep.c', 'posix' );
	* // returns '/c/foo/bar/beep.c'
	*
	* @example
	* var p = ns.convertPath( 'C:\\foo\\bar\\beep.c', 'mixed' );
	* // returns 'C:/foo/bar/beep.c'
	*/
	convertPath: typeof convertPath;

	/**
	* Copies or deep clones a value to an arbitrary depth.
	*
	* ## Notes
	*
	* -   The implementation can handle circular references.
	* -   If a `Number`, `String`, or `Boolean` object is encountered, the value is cloned as a primitive. This behavior is intentional.
	* -   For objects, the implementation only copies enumerable keys and their associated property descriptors.
	* -   The implementation only checks whether basic `Objects`, `Arrays`, and class instances are extensible, sealed, and/or frozen.
	* -   Functions are not cloned; their reference is copied.
	* -   The implementation supports custom error types which are `Error` instances (e.g., ES2015 subclasses).
	* -   Support for copying class instances is inherently fragile. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This stated, basic copying of class instances is supported. Provided an environment which supports ES5, the implementation is greedy and performs a deep clone of any arbitrary class instance and its properties. The implementation assumes that the concept of `level` applies only to the class instance reference, but not to its internal state.
	*
	* @param value - value to copy
	* @param  level - copy depth (default: +infinity)
	* @throws `level` must be a nonnegative integer
	* @returns value copy
	*
	* @example
	* var out = ns.copy( 'beep' );
	* // returns 'beep'
	*
	* @example
	* var value = [
	*     {
	*         'a': 1,
	*         'b': true,
	*         'c': [ 1, 2, 3 ]
	*     }
	* ];
	* var out = ns.copy( value );
	* // returns [ { 'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
	*
	* var bool = ( value[0].c === out[0].c );
	* // returns false
	*/
	copy: typeof copy;

	/**
	* Groups values according to an indicator function and returns group counts.
	*
	* ## Notes
	*
	* -   When invoked, the indicator function is provided two arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*
	* -   The value returned by an indicator function should be a value which can be serialized as an object key.
	*
	* -   If provided an empty collection, the function returns an empty object.
	*
	* @param collection - input collection
	* @param options - function options
	* @param options.thisArg - execution context
	* @param indicator - indicator function specifying which group an element in the input collection belongs to
	* @returns counts
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	*
	* var out = ns.countBy( arr, indicator );
	* // returns { 'b': 3, 'f': 1 }
	*/
	countBy: typeof countBy;

	/**
	* Transforms a function into a sequence of functions each accepting a single argument.
	*
	* ## Notes
	*
	* -   Until return value resolution, each invocation returns a new partially applied curry function.
	*
	* @param fcn - function to curry
	* @param thisArg - evaluation context
	* @returns curry function
	*
	* @example
	* function add( x, y ) {
	*     return x + y;
	* }
	*
	* var f = ns.curry( add );
	*
	* var sum = f( 2 )( 3 );
	* // returns 5
	*/
	curry: typeof curry;

	/**
	* Transforms a function into a sequence of functions each accepting a single argument.
	*
	* ## Notes
	*
	* -   Until return value resolution, each invocation returns a new partially applied curry function.
	* -   This function applies arguments starting from the right.
	*
	* @param fcn - function to curry
	* @param thisArg - evaluation context
	* @returns curry function
	*
	* @example
	* function add( x, y ) {
	*     return x + y;
	* }
	*
	* var f = ns.curryRight( add );
	*
	* var sum = f( 2 )( 3 );
	* // returns 5
	*/
	curryRight: typeof curryRight;

	/**
	* Returns a nested property value.
	*
	* @param obj - input object
	* @param path - key path
	* @param options - function options
	* @param options.sep - key path separator (default: '.')
	* @returns nested property value
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	*
	* var val = ns.deepGet( obj, 'a.b.c' );
	* // returns 'd'
	*
	* @example
	* var dget = ns.deepGet.factory( 'a/b/c', {
	*     'sep': '/'
	* });
	*
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	*
	* var val = dget( obj );
	* // returns 'd'
	*/
	deepGet: typeof deepGet;

	/**
	* Extracts a nested property value from each element of an object array.
	*
	* ## Notes
	*
	* -   If a key path does not exist, the function sets the plucked value as `undefined`.
	* -   Extracted values are not cloned.
	*
	* @param arr - source array
	* @param path - key path
	* @param options - function options
	* @param options.copy - boolean indicating whether to return a new data structure (default: true)
	* @param options.sep - key path separator (default: '.')
	* @returns destination array
	*
	* @example
	* var arr = [
	*     {'a':{'b':{'c':1}}},
	*     {'a':{'b':{'c':2}}}
	* ];
	*
	* var out = ns.deepPluck( arr, 'a.b.c' );
	* // returns [ 1, 2 ]
	*
	* @example
	* var arr = [
	*     {'a':[0,1,2]},
	*     {'a':[3,4,5]}
	* ];
	*
	* var out = ns.deepPluck( arr, ['a',1] );
	* // returns [ 1, 4 ]
	*
	* @example
	* var arr = [
	*     {'a':{'b':{'c':1}}},
	*     {'a':{'b':{'c':2}}}
	* ];
	*
	* var out = ns.deepPluck( arr, 'a.b.c', {'copy':false} );
	* // returns [ 1, 2 ]
	*
	* var bool = ( arr[ 0 ] === out[ 0 ] );
	* // returns true
	*
	* @example
	* var arr = [
	*     {'a':{'b':{'c':1}}},
	*     {'a':{'b':{'c':2}}}
	* ];
	*
	* var out = ns.deepPluck( arr, 'a|b|c', {'sep':'|'} );
	* // returns [ 1, 2 ]
	*/
	deepPluck: typeof deepPluck;

	/**
	* Sets a nested property value.
	*
	* @param obj - input object
	* @param path - key path
	* @param value - value to set
	* @param options - function options
	* @param options.create - boolean indicating whether to create a path if the key path does not already exist (default: false)
	* @param options.sep - key path separator (default: '.')
	* @returns boolean indicating if the property was successfully set
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	* var bool = ns.deepSet( obj, 'a.b.c', 'woot' );
	* // returns true
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	* var bool = ns.deepSet( obj, 'a.beep.c', 'boop' );
	* // returns false
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	* var bool = ns.deepSet( null, 'a.beep.c', 'boop' );
	* // returns false
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	* bool = ns.deepSet( 'bap', 'a.beep.c', 'boop' );
	* // returns false
	*
	* @example
	* var arr = [
	*     { 'a': [ {'x': 5} ] },
	*     { 'a': [ {'x': 10} ] }
	* ];
	* var bool = ns.deepSet( arr, '1.a.0.x', 25 );
	* // returns true
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	* var bool = ns.deepSet( obj, 'a/b/c', 'beep', {
	*     'sep': '/'
	* });
	* // returns true
	*
	* @example
	* var obj = { 'a': { 'b': { 'c': 'd' } } };
	* var bool = ns.deepSet( obj, 'a.e.c', 'boop', {
	*     'create': true
	* });
	* // returns true
	*/
	deepSet: typeof deepSet;

	/**
	* Defines a configurable read-only accessor.
	*
	* ## Notes
	*
	* -   Configurable read-only accessors are **enumerable**.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param getter - get accessor
	*
	* @example
	* var obj = {};
	*
	* function getter() {
	*     return 'bar';
	* }
	*
	* ns.setConfigurableReadOnlyAccessor( obj, 'foo', getter );
	*
	* try {
	*     obj.foo = 'boop';
	* } catch ( err ) {
	*     console.error( err.message );
	* }
	*/
	setConfigurableReadOnlyAccessor: typeof setConfigurableReadOnlyAccessor;

	/**
	* Defines a configurable read-only property.
	*
	* ## Notes
	*
	* -   Configurable read-only properties are **enumerable**.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param value - value to set
	*
	* @example
	* var obj = {};
	*
	* ns.setConfigurableReadOnly( obj, 'foo', 'bar' );
	*
	* try {
	*     obj.foo = 'boop';
	* } catch ( err ) {
	*     console.error( err.message );
	* }
	*/
	setConfigurableReadOnly: typeof setConfigurableReadOnly;

	/**
	* Defines a configurable read-write accessor.
	*
	* ## Notes
	*
	* -   Configurable read-write accessors are **enumerable**.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param getter - get accessor
	* @param setter - set accessor
	*
	* @example
	* var name = 'bar';
	* var obj = {};
	*
	* function getter() {
	*     return name + ' foo';
	* }
	*
	* function setter( v ) {
	*     name = v;
	* }
	*
	* ns.setConfigurableReadWriteAccessor( obj, 'foo', getter, setter );
	*
	* var v = obj.foo;
	* // returns 'bar foo'
	*
	* obj.foo = 'beep';
	*
	* v = obj.foo;
	* // returns 'beep foo'
	*/
	setConfigurableReadWriteAccessor: typeof setConfigurableReadWriteAccessor;

	/**
	* Defines a configurable write-only accessor.
	*
	* ## Notes
	*
	* -   Configurable write-only accessors are **enumerable**.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param setter - set accessor
	*
	* @example
	* var obj = {};
	* var val = '';
	*
	* function setter( v ) {
	*     val = v;
	* }
	*
	* ns.setConfigurableWriteOnlyAccessor( obj, 'foo', setter );
	*
	* obj.foo = 'beep';
	*/
	setConfigurableWriteOnlyAccessor: typeof setConfigurableWriteOnlyAccessor;

	/**
	* Defines a configurable memoized read-only object property.
	*
	* ## Notes
	*
	* -   Configurable read-only properties are **enumerable**.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param fcn - function whose return value will be memoized and set as the property value
	*
	* @example
	* var obj = {};
	*
	* function foo() {
	*     return 'bar';
	* }
	*
	* ns.setMemoizedConfigurableReadOnly( obj, 'foo', foo );
	*
	* var v = obj.foo;
	* // returns 'bar'
	*/
	setMemoizedConfigurableReadOnly: typeof setMemoizedConfigurableReadOnly;

	/**
	* Defines a memoized object property.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param desc - property descriptor
	*
	* @example
	* var obj = {};
	*
	* function foo() {
	*     return 'bar';
	* }
	*
	* ns.defineMemoizedProperty( obj, 'foo', {
	*     'configurable': false,
	*     'enumerable': false,
	*     'writable': false,
	*     'value': foo
	* });
	*
	* var v = obj.foo;
	* // returns 'bar'
	*/
	defineMemoizedProperty: typeof defineMemoizedProperty;

	/**
	* Defines a memoized read-only object property.
	*
	* ## Notes
	*
	* -   Read-only properties are **enumerable** and **non-configurable**.
	*
	* @param obj - object on which to define property
	* @param prop - property name
	* @param fcn - function whose return value will be memoized and set as the property value
	*
	* @example
	* var obj = {};
	*
	* function foo() {
	*     return 'bar';
	* }
	*
	* ns.setMemoizedReadOnly( obj, 'foo', foo );
	*
	* var v = obj.foo;
	* // returns 'bar'
	*/
	setMemoizedReadOnly: typeof setMemoizedReadOnly;

	/**
	* Defines a non-enumerable property.
	*
	* ## Notes
	*
	* -   Non-enumerable properties are writable and configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param value - value to set
	*
	* @example
	* var objectKeys = require( `@stdlib/utils/keys` );
	*
	* var obj = {};
	*
	* ns.setNonEnumerableProperty( obj, 'foo', 'bar' );
	*
	* var v = obj.foo;
	* // returns 'bar'
	*
	* var keys = objectKeys( obj );
	* // returns []
	*/
	setNonEnumerableProperty: typeof setNonEnumerableProperty;

	/**
	* Defines a non-enumerable read-only accessor.
	*
	* ## Notes
	*
	* -   Non-enumerable read-only accessors are non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param getter - accessor
	*
	* @example
	* function getter() {
	*     return 'bar';
	* }
	*
	* var obj = {};
	*
	* ns.setNonEnumerableReadOnlyAccessor( obj, 'foo', getter );
	*
	* try {
	*     obj.foo = 'boop';
	* } catch ( err ) {
	*     console.error( err.message );
	* }
	*/
	setNonEnumerableReadOnlyAccessor: typeof setNonEnumerableReadOnlyAccessor;

	/**
	* Defines a non-enumerable read-only property.
	*
	* ## Notes
	*
	* -   Non-enumerable read-only properties are non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param value - value to set
	*
	* @example
	* var obj = {};
	*
	* ns.setNonEnumerableReadOnly( obj, 'foo', 'bar' );
	*
	* try {
	*     obj.foo = 'boop';
	* } catch ( err ) {
	*     console.error( err.message );
	* }
	*/
	setNonEnumerableReadOnly: typeof setNonEnumerableReadOnly;

	/**
	* Defines a non-enumerable read-write accessor.
	*
	* ## Notes
	*
	* -   Non-enumerable read-write accessors are non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param getter - get accessor
	* @param setter - set accessor
	*
	* @example
	* function getter() {
	*     return name + ' foo';
	* }
	*
	* function setter( v ) {
	*     name = v;
	* }
	*
	* var name = 'bar';
	* var obj = {};
	*
	* ns.setNonEnumerableReadWriteAccessor( obj, 'foo', getter, setter );
	*
	* var v = obj.foo;
	* // returns 'bar foo'
	*
	* obj.foo = 'beep';
	*
	* v = obj.foo;
	* // returns 'beep foo'
	*/
	setNonEnumerableReadWriteAccessor: typeof setNonEnumerableReadWriteAccessor;

	/**
	* Defines a non-enumerable write-only accessor.
	*
	* ## Notes
	*
	* -   Non-enumerable write-only accessors are non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param setter - accessor
	*
	* @example
	* var obj = {};
	* var val = '';
	*
	* function setter( v ) {
	*     val = v;
	* }
	*
	* ns.setNonEnumerableWriteOnlyAccessor( obj, 'foo', setter );
	*
	* obj.foo = 'beep';
	*/
	setNonEnumerableWriteOnlyAccessor: typeof setNonEnumerableWriteOnlyAccessor;

	/**
	* Defines (and/or modifies) object properties.
	*
	* @param obj - object on which to define the properties
	* @param props - object with property descriptors
	* @returns object with added and/or modified properties
	*
	* @example
	* var obj = {};
	* ns.defineProperties( obj, {
	*     'foo': {
	*         'value': 'bar'
	*     },
	*     'baz': {
	*          'value': 13
	*     }
	* });
	*
	* var val = obj.foo;
	* // returns 'bar'
	*
	* val = obj.baz;
	* // returns 13
	*/
	defineProperties: typeof defineProperties;

	/**
	* Defines (or modifies) an object property.
	*
	* ## Notes
	*
	* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param descriptor - property descriptor
	* @returns object with added property
	*
	* @example
	* var obj = {};
	*
	* ns.defineProperty( obj, 'foo', {
	*     'value': 'bar'
	* });
	*
	* var str = obj.foo;
	* // returns 'bar'
	*/
	defineProperty: typeof defineProperty;

	/**
	* Defines a read-only accessor.
	*
	* ## Notes
	*
	* -   Read-only accessors are enumerable and non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param getter - accessor
	*
	* @example
	* function getter() {
	*     return 'bar';
	* }
	*
	* var obj = {};
	*
	* ns.setReadOnlyAccessor( obj, 'foo', getter );
	*
	* try {
	*     obj.foo = 'boop';
	* } catch ( err ) {
	*     console.error( err.message );
	* }
	*/
	setReadOnlyAccessor: typeof setReadOnlyAccessor;

	/**
	* Defines a read-only property.
	*
	* ## Notes
	*
	* -   Read-only properties are enumerable and non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param value - value to set
	*
	* @example
	* var obj = {};
	*
	* ns.setReadOnly( obj, 'foo', 'bar' );
	*
	* try {
	*     obj.foo = 'boop';
	* } catch ( err ) {
	*     console.error( err.message );
	* }
	*/
	setReadOnly: typeof setReadOnly;

	/**
	* Defines a read-write accessor.
	*
	* ## Notes
	*
	* -   Read-write accessors are enumerable and non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param getter - get accessor
	* @param setter - set accessor
	*
	* @example
	* function getter() {
	*     return name + ' foo';
	* }
	*
	* function setter( v ) {
	*     name = v;
	* }
	*
	* var name = 'bar';
	* var obj = {};
	*
	* ns.setReadWriteAccessor( obj, 'foo', getter, setter );
	*
	* var v = obj.foo;
	* // returns 'bar foo'
	*
	* obj.foo = 'beep';
	*
	* v = obj.foo;
	* // returns 'beep foo'
	*/
	setReadWriteAccessor: typeof setReadWriteAccessor;

	/**
	* Defines a write-only accessor.
	*
	* ## Notes
	*
	* -   Write-only accessors are enumerable and non-configurable.
	*
	* @param obj - object on which to define the property
	* @param prop - property name
	* @param setter - accessor
	*
	* @example
	* var obj = {};
	* var val = '';
	*
	* function setter( v ) {
	*     val = v;
	* }
	*
	* ns.setWriteOnlyAccessor( obj, 'foo', setter );
	*
	* obj.foo = 'beep';
	*/
	setWriteOnlyAccessor: typeof setWriteOnlyAccessor;

	/**
	* Returns a path dirname.
	*
	* @param path - path
	* @returns directory name
	*
	* @example
	* var dir = ns.dirname( './foo/bar/index.js' );
	* // returns './foo/bar'
	*/
	dirname: typeof dirname;

	/**
	* Invokes a function until a test condition is true.
	*
	* ## Notes
	*
	* -   The condition is evaluated *after* executing the provided function; thus, `fcn` *always* executes at least once.
	* -   When invoked, both the predicate function and the function to invoke are provided a single argument:
	*
	*        - `i`: iteration number (starting from zero)
	*
	* @param fcn - function to invoke
	* @param predicate - function which indicates whether to stop invoking a function
	* @param thisArg - execution context for the invoked function
	*
	* @example
	* function predicate( i ) {
	*     return ( i <= 5 );
	* }
	*
	* function beep( i ) {
	*     console.log( 'beep: %d', i );
	* }
	*
	* ns.doUntil( beep, predicate );
	*/
	doUntil: typeof doUntil;

	/**
	* Until a test condition is true, invokes a function once for each element in a collection.
	*
	* ## Notes
	*
	* -   The condition is evaluated **after** executing the function to invoke; thus, the provided function **always** executes at least once.
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   If provided an empty collection, the function invokes the provided function with the collection index set to `undefined`.
	*
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param predicate - function which indicates whether to stop iterating over a collection
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v !== v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, 2, 3, 4, NaN, 5 ];
	*
	* ns.doUntilEach( arr, log, predicate );
	*/
	doUntilEach: typeof doUntilEach;

	/**
	* Until a test condition is true, invokes a function once for each element in a collection, iterating from right to left.
	*
	* ## Notes
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `doUntilEach` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `doUntilEach()`, `[].push()` behavior is consistent with `doUntilEachRight()` `[].unshift()` behavior.
	*
	* -   The condition is evaluated **after** executing the function to invoke; thus, the provided function **always** executes at least once.
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   If provided an empty collection, the function invokes the provided function with the collection index set to `undefined`.
	*
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param predicate - function which indicates whether to stop iterating over a collection
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v !== v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, NaN, 2, 3, 4, 5 ];
	*
	* ns.doUntilEachRight( arr, log, predicate );
	*/
	doUntilEachRight: typeof doUntilEachRight;

	/**
	* Invokes a function while a test condition is true.
	*
	* ## Notes
	*
	* -   The condition is evaluated *after* executing the provided function; thus, `fcn` *always* executes at least once.
	* -   When invoked, both the predicate function and the function to invoke are provided a single argument:
	*
	*        - `i`: iteration number (starting from zero)
	*
	* @param fcn - function to invoke
	* @param predicate - function which indicates whether to continue invoking a function
	* @param thisArg - execution context for the invoked function
	*
	* @example
	* function predicate( i ) {
	*     return ( i < 5 );
	* }
	*
	* function beep( i ) {
	*     console.log( 'beep: %d', i );
	* }
	*
	* ns.doWhile( beep, predicate );
	*/
	doWhile: typeof doWhile;

	/**
	* While a test condition is true, invokes a function once for each element in a collection.
	*
	* ## Notes
	*
	* -   The condition is evaluated **after** executing the function to invoke; thus, the provided function **always** executes at least once.
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   If provided an empty collection, the function invokes the provided function with the collection index set to `undefined`.
	*
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param predicate - function which indicates whether to continue iterating over a collection
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v === v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, 2, 3, 4, NaN, 5 ];
	*
	* ns.doWhileEach( arr, log, predicate );
	*/
	doWhileEach: typeof doWhileEach;

	/**
	* While a test condition is true, invokes a function once for each element in a collection, iterating from right to left.
	*
	* ## Notes
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `doWhileEach` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `doWhileEach()`, `[].push()` behavior is consistent with `doWhileEachRight()` `[].unshift()` behavior.
	*
	* -   The condition is evaluated **after** executing the function to invoke; thus, the provided function **always** executes at least once.
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   If provided an empty collection, the function invokes the provided function with the collection index set to `undefined`.
	*
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param predicate - function which indicates whether to continue iterating over a collection
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v === v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, NaN, 2, 3, 4, 5 ];
	*
	* ns.doWhileEachRight( arr, log, predicate );
	*/
	doWhileEachRight: typeof doWhileEachRight;

	/**
	* List node.
	*/
	DoublyLinkedList: typeof DoublyLinkedList;

	/**
	* Returns an array of an object's own enumerable property `[key, value]` pairs.
	*
	* ## Notes
	*
	* -   Entry order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic return values.
	*
	* @param obj - input object
	* @returns array containing key-value pairs
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 'bar'
	* };
	*
	* var entries = ns.objectEntries( obj );
	* // e.g., returns [ ['beep', 'boop'], ['foo', 'bar'] ]
	*/
	objectEntries: typeof objectEntries;

	/**
	* Returns an array of an object's own and inherited enumerable property `[key, value]` pairs.
	*
	* @param obj - input object
	* @returns array containing key-value pairs
	*
	* @example
	* function Foo() {
	*     this.beep = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype.foo = 'bar';
	*
	* var obj = new Foo();
	*
	* var entries = ns.objectEntriesIn( obj );
	* // e.g., returns [ ['beep', 'boop'], ['foo', 'bar'] ]
	*/
	objectEntriesIn: typeof objectEntriesIn;

	/**
	* Returns an array of an object's own enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own property enumerable names and symbols
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var props = ns.enumerableProperties( obj );
	* // e.g., returns [ 'beep', 'foo' ]
	*/
	enumerableProperties: typeof enumerableProperties;

	/**
	* Returns an array of an object's own and inherited enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited enumerable property names and symbols
	*
	* @example
	* var props = ns.enumerablePropertiesIn( [] );
	* // returns []
	*/
	enumerablePropertiesIn: typeof enumerablePropertiesIn;

	/**
	* Returns an array of an object's own enumerable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own enumerable symbol properties
	*
	* @example
	* var symbols = ns.enumerablePropertySymbols( {} );
	*/
	enumerablePropertySymbols: typeof enumerablePropertySymbols;

	/**
	* Returns an array of an object's own and inherited enumerable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited enumerable symbol properties
	*
	* @example
	* var symbols = ns.enumerablePropertySymbolsIn( {} );
	*/
	enumerablePropertySymbolsIn: typeof enumerablePropertySymbolsIn;

	/**
	* Escapes a regular expression string.
	*
	* @param str - regular expression string
	* @returns escaped string
	*
	* @example
	* var str = ns.rescape( '[A-Z]*' );
	* // returns '\\[A\\-Z\\]\\*'
	*/
	rescape: typeof rescape;

	/**
	* Alias for `eval` global.
	*
	* ## Notes
	*
	* -   A reference to `eval` is treated differently by the compiler. For example, when evaluating code containing block-scoped declarations  (e.g., `let`, `const`, `function`, `class`), the compiler may throw an `error` complaining that block-scoped declarations are not yet supported outside of `strict mode`. One possible workaround is to include `"use strict";` in the evaluated code.
	*
	* @param str - code to evaluate
	* @returns returned value if applicable
	*
	* @example
	* var v = ns.evil( '5*4*3*2*1' );
	* // returns 120
	*/
	evil: typeof evil;

	/**
	* Tests whether all elements in a collection are truthy.
	*
	* ## Notes
	*
	* -   The function immediately returns upon encountering a falsy value.
	* -   If provided an empty collection, the function returns `true`.
	*
	* @param collection - input collection
	* @returns boolean indicating whether all elements are truthy
	*
	* @example
	* var arr = [ 1, 1, 1, 1, 1 ];
	*
	* var bool = ns.every( arr );
	* // returns true
	*/
	every: typeof every;

	/**
	* Tests whether all elements in a collection pass a test implemented by a predicate function.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon encountering a non-truthy return value.
	*
	* -   If provided an empty collection, the function returns `true`.
	*
	* @param collection - input collection
	* @param predicate - test function
	* @param thisArg - execution context
	* @returns boolean indicating whether all elements pass a test
	*
	* @example
	* function isPositive( v ) {
	*     return ( v > 0 );
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* var bool = ns.everyBy( arr, isPositive );
	* // returns true
	*/
	everyBy: typeof everyBy;

	/**
	* Tests whether all elements in a collection pass a test implemented by a predicate function, iterating from right to left.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon encountering a non-truthy return value.
	*
	* -   If provided an empty collection, the function returns `true`.
	*
	* @param collection - input collection
	* @param predicate - test function
	* @param thisArg - execution context
	* @returns boolean indicating whether all elements pass a test
	*
	* @example
	* function isPositive( v ) {
	*     return ( v > 0 );
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* var bool = ns.everyByRight( arr, isPositive );
	* // returns true
	*/
	everyByRight: typeof everyByRight;

	/**
	* Returns a filename extension.
	*
	* @param filename - filename
	* @returns filename extension
	*
	* @example
	* var ext = ns.extname( 'index.js' );
	* // returns '.js'
	*/
	extname: typeof extname;

	/**
	* First-in-first-out (FIFO) queue.
	*/
	FIFO: typeof FIFO;

	/**
	* Finds elements in an array-like object that satisfy a test condition.
	*
	* @param arr - object from which elements will be tested
	* @param options - function options
	* @param options.k - limits the number of returned elements (default: arr.length)
	* @param options.returns - if `values`, values are returned; if `indices`, indices are returned; if `*`, both indices and values are returned (default: 'indices')
	* @param clbk - function invoked for each array element. If the return value is truthy, the value is considered to have satisfied the test condition.
	* @returns array of indices, element values, or arrays of index-value pairs
	*
	* @example
	* var data = [ 30, 20, 50, 60, 10 ];
	* var opts = {
	*     'k': 2,
	*     'returns': 'values'
	* };
	* var vals = ns.find( data, opts, condition );
	* // returns [ 30, 50 ]
	*
	* function condition( val ) {
	*     return val > 20;
	* }
	*
	* @example
	* var data = [ 30, 20, 50, 60, 10 ];
	* var opts = {
	*     'k': -2,
	*     'returns': 'values'
	* };
	* var vals = ns.find( data, opts, condition );
	* // returns [ 60, 50 ]
	*
	* function condition( val ) {
	*     return val > 20;
	* }
	*
	* @example
	* var data = [ 30, 20, 50, 60, 10 ];
	* var opts = {
	*     'k': -2,
	*     'returns': '*'
	* };
	* var vals = ns.find( data, opts, condition );
	* // returns [ [3, 60], [2, 50] ]
	*
	* function condition( val ) {
	*     return val > 20;
	* }
	*/
	find: typeof find;

	/**
	* Flatten an array.
	*
	* @param arr - input array
	* @param options - function options
	* @param options.depth - maximum depth to flatten
	* @param options.copy - boolean indicating whether to deep copy array elements (default: false)
	* @returns flattened array
	*
	* @example
	* var arr = [ 1, [2, [3, [4, [ 5 ], 6], 7], 8], 9 ];
	*
	* var out = ns.flattenArray( arr );
	* // returns [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
	*
	* @example
	* var flatten = ns.flattenArray.factory( [2,2], {
	*     'copy': false
	* });
	*
	* var out = flatten( [[1,2],[3,4]] );
	* // returns [ 1, 2, 3, 4 ]
	*
	* out = flatten( [[5,6],[7,8]] );
	* // returns [ 5, 6, 7, 8 ]
	*/
	flattenArray: typeof flattenArray;

	/**
	* Flatten an object.
	*
	* @param obj - object to flatten
	* @param options - function options
	* @param options.depth - maximum depth to flatten
	* @param options.copy - boolean indicating whether to deep copy (default: false)
	* @param options.flattenArrays - boolean indicating whether to flatten arrays (default: false)
	* @param options.delimiter - key path delimiter (default: '.')
	* @returns flattened object
	*
	* @example
	* var obj = {'a':{'b':{'c':'d'}}};
	*
	* var out = ns.flattenObject( obj );
	* // returns {'a.b.c':'d'}
	*
	* @example
	* var flatten = ns.flattenObject.factory({
	*     'depth': 2,
	*     'copy': true,
	*     'delimiter': '|'
	* });
	*
	* var obj = {'a':{'b':{'c':'d'}}};
	*
	* var out = flatten( obj );
	* // returns {'a|b':{'c':'d'}}
	*/
	flattenObject: typeof flattenObject;

	/**
	* Invokes a function once for each element in a collection.
	*
	* ## Notes
	*
	* -   When invoked, the input function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns input collection
	*
	* @example
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* ns.forEach( arr, log );
	*/
	forEach: typeof forEach;

	/**
	* Invokes a function once for each element in a collection, iterating from right to left.
	*
	* ## Notes
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `forEach` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `forEach()`, `[].push()` behavior is consistent with `forEachRight()` `[].unshift()` behavior.
	*
	* -   When invoked, the input function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns input collection
	*
	* @example
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* ns.forEachRight( arr, log );
	*/
	forEachRight: typeof forEachRight;

	/**
	* Invokes a function once for each own and inherited enumerable property of an object.
	*
	* ## Notes
	*
	* -   When invoked, the function is provided three arguments:
	*
	*     -   `value`: object property value
	*     -   `key`: object property
	*     -   `obj`: the input object
	*
	* -   To terminate iteration before visiting all properties, the provided function must explicitly return `false`.
	*
	* -   Iteration order is **not** guaranteed.
	*
	*
	* @param obj - input object
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns obj - input object
	*
	* @example
	* function log( v, key ) {
	*     console.log( '%s: %d', key, v );
	* }
	*
	* function Foo() {
	*     this.a = 1;
	*     this.b = 2;
	*     return this;
	* }
	*
	* Foo.prototype.c = 3;
	* Foo.prototype.d = 4;
	*
	* var obj = new Foo();
	*
	* ns.forIn( obj, log );
	*/
	forIn: typeof forIn;

	/**
	* Invokes a function once for each own enumerable property of an object.
	*
	* ## Notes
	*
	* -   When invoked, the function is provided three arguments:
	*
	*     -   `value`: object property value
	*     -   `key`: object property
	*     -   `obj`: the input object
	*
	* -   To terminate iteration before visiting all properties, the provided function must explicitly return `false`.
	*
	* -   The function determines the list of own enumerable properties *before* invoking the provided function. Hence, any modifications made to the input object *after* calling this function (such as adding and removing properties) will *not* affect the list of visited properties.
	*
	* -   Iteration order is **not** guaranteed.
	*
	*
	* @param obj - input object
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns obj - input object
	*
	* @example
	* function log( v, key ) {
	*     console.log( '%s: %d', key, v );
	* }
	*
	* var obj = {
	*     'a': 1,
	*     'b': 2,
	*     'c': 3,
	*     'd': 4
	* };
	*
	* ns.forOwn( obj, log );
	*/
	forOwn: typeof forOwn;

	/**
	* Creates an object from an array of key-value pairs.
	*
	* @param entries - input object
	* @returns object created from `[key, value]` pairs
	*
	* @example
	* var entries = [ ['beep', 'boop'], ['foo', 'bar'] ];
	*
	* var obj = ns.objectFromEntries( entries );
	* // returns {'beep': 'boop', 'foo': 'bar'}
	*/
	objectFromEntries: typeof objectFromEntries;

	/**
	* Returns the name of a function.
	*
	* ## Notes
	*
	* -   If provided an anonymous function, the function returns an empty `string` or the string `"anonymous"`.
	*
	* @param fcn - input function
	* @returns function name
	*
	* @example
	* var v = ns.functionName( String );
	* // returns 'String'
	*/
	functionName: typeof functionName;

	/**
	* Returns a pipeline function.
	*
	* ## Notes
	*
	* -   Starting from the left, the pipeline function evaluates each function and passes the result as an argument to the next function. The result of the rightmost function is the result of the whole.
	* -   Only the leftmost function is explicitly permitted to accept multiple arguments. All other functions are evaluated as unary functions.
	*
	* @param fcn - functions to evaluate in sequential order
	* @throws must provide more than one argument
	* @returns pipeline function
	*
	* @example
	* function a( x ) {
	*     return 2 * x;
	* }
	*
	* function b( x ) {
	*     return x + 3;
	* }
	*
	* function c( x ) {
	*     return x / 5;
	* }
	*
	* var f = ns.functionSequence( a, b, c );
	*
	* var z = f( 6 );
	* // returns 3
	*/
	functionSequence: typeof functionSequence;

	/**
	* Returns the prototype of a provided object.
	*
	* ## Notes
	*
	* -   In contrast to the native `Object.getPrototypeOf`, this function does not throw when provided `null` or `undefined`. Instead, similar to when provided any value with *no* inherited properties, the function returns `null`.
	* -   Value arguments other than `null` or `undefined` are coerced to objects.
	*
	* @param value - input value
	* @returns prototype
	*
	* @example
	* var proto = ns.getPrototypeOf( {} );
	* // returns {}
	*/
	getPrototypeOf: typeof getPrototypeOf;

	/**
	* Returns the global object.
	*
	* ## Notes
	*
	* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
	*
	* @param codegen - boolean indicating whether to use code generation to resolve the global object
	* @returns global object
	*
	* @example
	* var g = ns.getGlobal();
	* // returns {...}
	*/
	getGlobal: typeof getGlobal;

	/**
	* Groups values as arrays associated with distinct keys.
	*
	* ## Notes
	*
	* -   If provided an empty collection, the function returns an empty object.
	*
	* @param collection - collection to group
	* @param options - function options
	* @param options.returns - if `values`, values are returned; if `indices`, indices are returned; if `*`, both indices and values are returned (default: 'values')
	* @param groups - collection defining which group an element in the input collection belongs to
	* @throws first and last arguments must be the same length
	* @returns group results
	*
	* @example
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	* var ns.groups = [ 'b', 'b', 'f', 'b' ];
	*
	* var opts = {
	*     'returns': 'indices'
	* };
	*
	* var out = ns.group( arr, opts, ns.groups );
	* // returns { 'b': [ 0, 1, 3 ], 'f': [ 2 ] }
	*
	* @example
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	* var ns.groups = [ 'b', 'b', 'f', 'b' ];
	*
	* var opts = {
	*     'returns': '*'
	* };
	*
	* var out = ns.group( arr, opts, ns.groups );
	* // returns { 'b': [ [ 0, 'beep' ], [ 1, 'boop' ], [ 3, 'bar' ] ], 'f': [ [ 2, 'foo' ] ] }
	*/
	group: typeof group;

	/**
	* Groups values according to an indicator function.
	*
	* ## Notes
	*
	* -   When invoked, the indicator function is provided two arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*
	* -   The value returned by an indicator function should be a value which can be serialized as an object key.
	*
	* -   If provided an empty collection, the function returns an empty object.
	*
	* @param collection - collection to group
	* @param options - function options
	* @param options.thisArg - execution context
	* @param options.returns - if `values`, values are returned; if `indices`, indices are returned; if `*`, both indices and values are returned (default: 'values')
	* @param indicator - indicator function specifying which group an element in the input collection belongs to
	* @returns group results
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	*
	* var opts = {
	*     'returns': 'indices'
	* };
	* var out = ns.groupBy( arr, opts, indicator );
	* // returns { 'b': [ 0, 1, 3 ], 'f': [ 2 ] }
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	* var arr = [ 'beep', 'boop', 'foo', 'bar' ];
	*
	* var opts = {
	*     'returns': '*'
	* };
	* var out = ns.groupBy( arr, opts, indicator );
	* // returns { 'b': [ [ 0, 'beep' ], [ 1, 'boop' ], [ 3, 'bar' ] ], 'f': [ [ 2, 'foo' ] ] }
	*/
	groupBy: typeof groupBy;

	/**
	* Groups an object's own and inherited property values according to an indicator function.
	*
	* ## Notes
	*
	* -   When invoked, the indicator function is provided two arguments:
	*
	*     -   `value`: object value
	*     -   `key`: object key
	*
	* -   The value returned by an indicator function should be a value which can be serialized as an object key.
	*
	* -   If provided an empty object with no prototype, the function returns an empty object.
	*
	* -   The function iterates over an object's own and inherited properties.
	*
	* -   Key iteration order is **not** guaranteed, and, thus, result order is **not** guaranteed.
	*
	* @param obj - input object
	* @param options - function options
	* @param options.thisArg - execution context
	* @param options.returns - if `values`, values are returned; if `keys`, keys are returned; if `*`, both keys and values are returned (default: 'values')
	* @param indicator - indicator function indicating which group an element in the input object belongs to
	* @returns group results
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	*
	* function Foo() {
	*     this.a = 'beep';
	*     this.b = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype = Object.create( null );
	* Foo.prototype.c = 'foo';
	* Foo.prototype.d = 'bar';
	*
	* var obj = new Foo();
	*
	* var opts = {
	*     'returns': 'keys'
	* };
	* var out = ns.groupIn( obj, opts, indicator );
	* // e.g., returns { 'b': [ 'a', 'b', 'd' ], 'f': [ 'c' ] }
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	*
	* function Foo() {
	*     this.a = 'beep';
	*     this.b = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype = Object.create( null );
	* Foo.prototype.c = 'foo';
	* Foo.prototype.d = 'bar';
	*
	* var obj = new Foo();
	*
	* var opts = {
	*     'returns': '*'
	* };
	* var out = ns.groupIn( obj, opts, indicator );
	* // e.g., returns { 'b': [ [ 'a', 'beep' ], [ 'b', 'boop' ], [ 'd', 'bar' ] ], 'f': [ [ 'c', 'foo' ] ] }
	*/
	groupIn: typeof groupIn;

	/**
	* Groups an object's own property values according to an indicator function.
	*
	* ## Notes
	*
	* -   When invoked, the indicator function is provided two arguments:
	*
	*     -   `value`: object value
	*     -   `key`: object key
	*
	* -   The value returned by an indicator function should be a value which can be serialized as an object key.
	*
	* -   If provided an empty object, the function returns an empty object.
	*
	* -   The function iterates over an object's own properties.
	*
	* -   Key iteration order is **not** guaranteed, and, thus, result order is **not** guaranteed.
	*
	* @param obj - input object
	* @param options - function options
	* @param options.thisArg - execution context
	* @param options.returns - if `values`, values are returned; if `keys`, keys are returned; if `*`, both keys and values are returned (default: 'values')
	* @param indicator - indicator function indicating which group an element in the input object belongs to
	* @returns group results
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	* var obj = {
	*     'a': 'beep',
	*     'b': 'boop',
	*     'c': 'foo',
	*     'd': 'bar'
	* };
	* var out = ns.groupOwn( obj, indicator );
	* // e.g., returns { 'b': [ 'beep', 'boop', 'bar' ], 'f': [ 'foo' ] }
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	* var obj = {
	*     'a': 'beep',
	*     'b': 'boop',
	*     'c': 'foo',
	*     'd': 'bar'
	* };
	* var opts = {
	*     'returns': 'keys'
	* };
	* var out = ns.groupOwn( obj, opts, indicator );
	* // e.g., returns { 'b': [ 'a', 'b', 'd' ], 'f': [ 'c' ] }
	*
	* @example
	* function indicator( v ) {
	*     return v[ 0 ];
	* }
	* var obj = {
	*     'a': 'beep',
	*     'b': 'boop',
	*     'c': 'foo',
	*     'd': 'bar'
	* };
	* var opts = {
	*     'returns': '*'
	* };
	* var out = ns.groupOwn( obj, opts, indicator );
	* // e.g., returns { 'b': [ [ 'a', 'beep' ], [ 'b', 'boop' ], [ 'd', 'bar' ] ], 'f': [ [ 'c', 'foo' ] ] }
	*/
	groupOwn: typeof groupOwn;

	/**
	* Identity function.
	*
	* @param x - input value
	* @returns input value
	*
	* @example
	* var v = ns.identity( 3.14 );
	* // returns 3.14
	*/
	identity: typeof identity;

	/**
	* If a condition is truthy, returns `x`; otherwise, returns `y`.
	*
	* @param bool - condition
	* @param x - value to return if a condition is truthy
	* @param y - value to return if a condition is falsy
	* @returns either `x` or `y`
	*
	* @example
	* var randu = require( `@stdlib/random/base/randu` );
	*
	* var z = ns.ifelse( randu() > 0.5, 1.0, -1.0 );
	* // returns <number>
	*/
	ifelse: typeof ifelse;

	/**
	* If a condition is truthy, invokes `x`; otherwise, invokes `y`.
	*
	* @param bool - condition
	* @param x - function to invoke if a condition is truthy
	* @param y - function to invoke if a condition is falsy
	* @returns return value of either `x` or `y`
	*
	* @example
	* var randu = require( `@stdlib/random/base/randu` );
	*
	* function x() {
	*     return randu() * 100.0;
	* }
	*
	* function y() {
	*     return -1.0 * randu() * 100.0;
	* }
	*
	* var z = ns.ifthen( randu() > 0.5, x, y );
	* // returns <number>
	*/
	ifthen: typeof ifthen;

	/**
	* Returns the first index at which a given element can be found.
	*
	* ## Notes
	*
	* -   Search is performed using **strict equality** comparison.
	*
	* @param arr - array-like object
	* @param searchElement - element to find
	* @param fromIndex - starting index (if negative, the start index is determined relative to last element)
	* @throws `fromIndex` must be an integer
	* @returns index or -1
	*
	* @example
	* var arr = [ 4, 3, 2, 1 ];
	* var idx = ns.indexOf( arr, 3 );
	* // returns 1
	*
	* @example
	* var arr = [ 4, 3, 2, 1 ];
	* var idx = ns.indexOf( arr, 5 );
	* // returns -1
	*
	* @example
	* // Using a `fromIndex`:
	* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
	* var idx = ns.indexOf( arr, 2, 3 );
	* // returns 5
	*
	* @example
	* // `fromIndex` which exceeds `array` length:
	* var arr = [ 1, 2, 3, 4, 2, 5 ];
	* var idx = ns.indexOf( arr, 2, 10 );
	* // returns -1
	*
	* @example
	* // Negative `fromIndex`:
	* var arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
	* var idx = ns.indexOf( arr, 2, -4 );
	* // returns 5
	*
	* idx = ns.indexOf( arr, 2, -1 );
	* // returns 7
	*
	* @example
	* // Negative `fromIndex` exceeding input `array` length:
	* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
	* var idx = ns.indexOf( arr, 2, -10 );
	* // returns 1
	*
	* @example
	* // Array-like objects:
	* var str = 'bebop';
	* var idx = ns.indexOf( str, 'o' );
	* // returns 3
	*/
	indexOf: typeof indexOf;

	/**
	* Implements prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
	*
	* @param ctor - constructor which will inherit
	* @param superCtor - super (parent) constructor
	* @throws first argument must be either an object or a function which can inherit
	* @throws second argument must be either an object or a function from which a constructor can inherit
	* @throws second argument must have an inheritable prototype
	* @returns child constructor
	*
	* @example
	* function Foo() {
	*     return this;
	* }
	* Foo.prototype.beep = function beep() {
	*     return 'boop';
	* };
	*
	* function Bar() {
	*     Foo.call( this );
	*     return this;
	* }
	* ns.inherit( Bar, Foo );
	*
	* var bar = new Bar();
	* var v = bar.beep();
	* // returns 'boop'
	*/
	inherit: typeof inherit;

	/**
	* Returns an array of an object's inherited enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited enumerable property names and symbols
	*
	* @example
	* var props = ns.inheritedEnumerableProperties( {} );
	*/
	inheritedEnumerableProperties: typeof inheritedEnumerableProperties;

	/**
	* Returns an array of an object's inherited enumerable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited enumerable symbol properties
	*
	* @example
	* var symbols = ns.inheritedEnumerablePropertySymbols( [] );
	*/
	inheritedEnumerablePropertySymbols: typeof inheritedEnumerablePropertySymbols;

	/**
	* Returns an array of an object's inherited enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited enumerable property names
	*
	* @example
	* var keys = ns.inheritedKeys( {} );
	*/
	inheritedKeys: typeof inheritedKeys;

	/**
	* Returns an array of an object's inherited non-enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited non-enumerable property names and symbols
	*
	* @example
	* var props = ns.inheritedNonEnumerableProperties( {} );
	*/
	inheritedNonEnumerableProperties: typeof inheritedNonEnumerableProperties;

	/**
	* Returns an array of an object's inherited non-enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited non-enumerable property names
	*
	* @example
	* var keys = ns.inheritedNonEnumerablePropertyNames( {} );
	*/
	inheritedNonEnumerablePropertyNames: typeof inheritedNonEnumerablePropertyNames;

	/**
	* Returns an array of an object's inherited non-enumerable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited non-enumerable symbol properties
	*
	* @example
	* var symbols = ns.inheritedNonEnumerablePropertySymbols( [] );
	*/
	inheritedNonEnumerablePropertySymbols: typeof inheritedNonEnumerablePropertySymbols;

	/**
	* Returns an array of an object's inherited property names and symbols.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited property names and symbols
	*
	* @example
	* var props = ns.inheritedProperties( [] );
	* // returns [...]
	*/
	inheritedProperties: typeof inheritedProperties;

	/**
	* Returns a property descriptor for an object's inherited property.
	*
	* ## Notes
	*
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if provided `undefined` or `null`, rather than throwing an error.
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if an object does not have an inherited provided property, rather than `undefined`.
	*
	* @param value - input object
	* @param property - property
	* @param level - inheritance level
	* @throws third argument must be a positive integer
	* @returns property descriptor or null
	*
	* @example
	* var desc = ns.inheritedPropertyDescriptor( {}, 'toString' );
	* // returns {...}
	*/
	inheritedPropertyDescriptor: typeof inheritedPropertyDescriptor;

	/**
	* Returns an object's inherited property descriptors.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty object.
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptors()`, this function returns an empty object if provided `undefined` or `null`, rather than throwing an error.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns inherited property descriptors
	*
	* @example
	* var desc = ns.inheritedPropertyDescriptors( [] );
	* // returns {...}
	*/
	inheritedPropertyDescriptors: typeof inheritedPropertyDescriptors;

	/**
	* Returns an array of an object's inherited enumerable and non-enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited enumerable and non-enumerable property names
	*
	* @example
	* var keys = ns.inheritedPropertyNames( [] );
	*/
	inheritedPropertyNames: typeof inheritedPropertyNames;

	/**
	* Returns an array of an object's inherited symbol properties.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited symbol properties
	*
	* @example
	* var symbols = ns.inheritedPropertySymbols( [] );
	*/
	inheritedPropertySymbols: typeof inheritedPropertySymbols;

	/**
	* Returns an array of an object's inherited writable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited writable property names and symbols
	*
	* @example
	* var props = ns.inheritedWritableProperties( {} );
	*/
	inheritedWritableProperties: typeof inheritedWritableProperties;

	/**
	* Returns an array of an object's inherited writable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited writable property names
	*
	* @example
	* var keys = ns.inheritedWritablePropertyNames( {} );
	*/
	inheritedWritablePropertyNames: typeof inheritedWritablePropertyNames;

	/**
	* Returns an array of an object's inherited writable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @param level - inheritance level
	* @throws second argument must be a positive integer
	* @returns a list of inherited writable symbol properties
	*
	* @example
	* var symbols = ns.inheritedWritablePropertySymbols( [] );
	*/
	inheritedWritablePropertySymbols: typeof inheritedWritablePropertySymbols;

	/**
	* Invokes a function once for each element in a collection and updates the collection in-place.
	*
	* ## Notes
	*
	* -   The invoked function's return value is cached prior to updating a collection. Before updating the collection, a collection must be inspected to ensure that a collection has not been resized during invocation such that an index no longer has a corresponding element in the collection. Were a return value automatically used to update a collection, an input collection could be converted into a sparse data structure. While some might consider this a feature, here, we take stance that a user should be less clever.
	*
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns input collection
	*
	* @example
	* function scale( value, index, collection ) {
	*     return value * index;
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* var out = ns.inmap( arr, scale );
	* // returns [ 0, 2, 6, 12 ]
	*
	* var bool = ( out === arr );
	* // returns true
	*/
	inmap: typeof inmap;

	/**
	* Invokes a function once for each element in a collection and updates the collection in-place, iterating from right to left.
	*
	* ## Notes
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `inmap` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `inmap()`, `[].push()` behavior is consistent with `inmapRight()` `[].unshift()` behavior.
	*
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns input collection
	*
	* @example
	* function scale( value, index, collection ) {
	*     console.log( '%s: %d', index, value );
	*     return value * index;
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* var out = ns.inmapRight( arr, scale );
	* // returns [ 0, 2, 6, 12 ]
	*
	* var bool = ( out === arr );
	* // returns true
	*/
	inmapRight: typeof inmapRight;

	/**
	* Converts a collection to an object whose keys are determined by a provided function and whose values are the collection values.
	*
	* ## Notes
	*
	* -   When invoked, the input function is provided two arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*
	* -   If more than one element in a collection resolves to the same key, the key value is the collection element which last resolved to the key.
	*
	* -   Object values are shallow copies.
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns output object
	*
	* @example
	* function toKey( value, index ) {
	*     console.log( '%d: %s', index, JSON.stringify( value ) );
	*     return value.name;
	* }
	*
	* var collection = [
	*     { 'name': 'beep', 'a': 1 },
	*     { 'name': 'boop', 'b': 2 }
	* ];
	*
	* var obj = ns.keyBy( collection, toKey );
	* // returns { 'beep': { 'name': 'beep', 'a': 1 }, 'boop': { 'name': 'boop', 'b': 2 } }
	*/
	keyBy: typeof keyBy;

	/**
	* Converts a collection to an object whose keys are determined by a provided function and whose values are the collection values, iterating from right to left.
	*
	* ## Notes
	*
	* -   When invoked, the input function is provided two arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*
	* -   If more than one element in a collection resolves to the same key, the key value is the collection element which last resolved to the key.
	*
	* -   Object values are shallow copies.
	*
	* @param collection - input collection
	* @param fcn - function to invoke
	* @param thisArg - execution context
	* @returns output object
	*
	* @example
	* function toKey( value, index ) {
	*     console.log( '%d: %s', index, JSON.stringify( value ) );
	*     return value.name;
	* }
	*
	* var collection = [
	*     { 'name': 'beep', 'a': 1 },
	*     { 'name': 'boop', 'b': 2 }
	* ];
	*
	* var obj = ns.keyByRight( collection, toKey );
	* // returns { 'boop': { 'name': 'boop', 'b': 2 }, 'beep': { 'name': 'beep', 'a': 1 } }
	*/
	keyByRight: typeof keyByRight;

	/**
	* Returns an array of an object's own enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own enumerable property names
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var k = ns.objectKeys( obj );
	* // e.g., returns [ 'beep', 'foo' ]
	*/
	objectKeys: typeof objectKeys;

	/**
	* Returns an array of an object's own and inherited enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	*
	* @param obj - input value
	* @returns key array
	*
	* @example
	* function Foo() {
	*     this.beep = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype.foo = 'bar';
	*
	* var obj = new Foo();
	*
	* var keys = ns.keysIn( obj );
	* // e.g., returns [ 'beep', 'foo' ]
	*/
	keysIn: typeof keysIn;

	/**
	* List node.
	*/
	LinkedList: typeof LinkedList;

	/**
	* Converts each object key to lowercase.
	*
	* ## Notes
	*
	* -   The function only transforms own properties. Hence, the function does not transform inherited properties.
	* -   The function shallow copies key values.
	*
	* @param obj - source object
	* @returns new object
	*
	* @example
	* var obj1 = {
	*     'A': 1,
	*     'B': 2
	* };
	*
	* var obj2 = ns.lowercaseKeys( obj1 );
	* // returns { 'a': 1, 'b': 2 }
	*/
	lowercaseKeys: typeof lowercaseKeys;

	/**
	* Invokes a function `n` times and returns an array of accumulated function return values.
	*
	* ## Notes
	*
	* -   The invoked function is provided a single argument: the invocation index (zero-based).
	*
	* @param fcn - function to invoke
	* @param n - number of function invocations
	* @param thisArg - execution context
	* @throws second argument must be a nonnegative integer
	* @returns accumulated results
	*
	* @example
	* function fcn( i ) {
	*     return i;
	* }
	*
	* var arr = ns.mapFun( fcn, 5 );
	* // returns [ 0, 1, 2, 3, 4 ]
	*/
	mapFun: typeof mapFun;

	/**
	* Maps keys from one object to a new object having the same values.
	*
	* ## Notes
	*
	* -   The transform function is provided three arguments:
	*
	*     -   `key`: object key
	*     -   `value`: object value corresponding to `key`
	*     -   `obj`: the input object
	*
	* -   The value returned by a transform function should be a value which can be serialized as an object key.
	*
	* -   The function only maps own properties. Hence, the function does not map inherited properties.
	*
	* -   The function shallow copies key values.
	*
	* -   Iteration order is **not** guaranteed.
	*
	* @param obj - source object
	* @param transform - transform function
	* @returns new object
	*
	* @example
	* function transform( key, value ) {
	*     return key + value;
	* }
	*
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.mapKeys( obj1, transform );
	* // returns { 'a1': 1, 'b2': 2 }
	*/
	mapKeys: typeof mapKeys;

	/**
	* Maps values from one object to a new object having the same keys.
	*
	* ## Notes
	*
	* -   The transform function is provided three arguments:
	*
	*     -   `value`: object value corresponding to `key`
	*     -   `key`: object key
	*     -   `obj`: the input object
	*
	* -   The function only maps values from own properties. Hence, the function does not map inherited properties.
	*
	* -   The function shallow copies key values.
	*
	* -   Iteration order is **not** guaranteed.
	*
	* @param obj - source object
	* @param transform - transform function
	* @returns new object
	*
	* @example
	* function transform( value, key ) {
	*     return key + value;
	* }
	*
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.mapValues( obj1, transform );
	* // returns { 'a': 'a1', 'b': 'b2' }
	*/
	mapValues: typeof mapValues;

	/**
	* Returns a memoized function.
	*
	* ## Notes
	*
	* -   The function does not set the `length` property of the returned function. Accordingly, the returned function `length` is always zero.
	* -   The evaluation context is always `null`.
	* -   The function serializes provided arguments as a string and stores results using the string as an identifier. To use a custom hash function, provide a hash function argument.
	*
	* @param fcn - function to memoize
	* @param hashFunction - function to map a set of arguments to a single value identifying that set
	* @returns memoized function
	*
	* @example
	* function factorial( n ) {
	*     var prod;
	*     var i;
	*     prod = 1;
	*     for ( i = n; i > 1; i-- ) {
	*         prod *= i;
	*     }
	*     return prod;
	* }
	*
	* var ns.memoized = ns.memoize( factorial );
	*
	* var v = ns.memoized( 5 );
	* // returns 120
	*
	* v = ns.memoized( 5 );
	* // returns 120
	*/
	memoize: typeof memoize;

	/**
	* Merges objects into a target object.
	*
	* ## Notes
	*
	* -   The target object is mutated.
	*
	* @param target - target object
	* @param source - source objects (i.e., objects to be merged into the target object)
	* @returns merged (target) object
	*
	* @example
	* var target = {
	*     'a': 'beep'
	* };
	* var source = {
	*     'a': 'boop',
	*     'b': 'bap'
	* };
	*
	* var out = ns.merge( target, source );
	* // returns {'a':'boop', 'b':'bap'}
	*
	* @example
	* var opts = {
	*     'level': 100,
	*     'copy': true,
	*     'override': true,
	*     'extend': true
	* };
	*
	* var ns.mergefcn = ns.merge.factory( opts );
	* // returns <Function>
	*/
	merge: typeof merge;

	/**
	* Moves a property from one object to another object.
	*
	* ## Notes
	*
	* -   The property is deleted from the source object and the property's descriptor is preserved during transfer.
	* -   If a source property is not configurable, the function throws an error, as the property cannot be deleted from the source object.
	*
	* @param source - source object
	* @param prop - property to move
	* @param target - target object
	* @returns boolean indicating whether operation was successful
	*
	* @example
	* var obj1 = { 'a': 'b' };
	* var obj2 = {};
	*
	* var bool = ns.moveProperty( obj1, 'a', obj2 );
	* // returns true
	*
	* @example
	* var obj1 = { 'a': 'b' };
	* var obj2 = {};
	*
	* var bool = ns.moveProperty( obj1, 'c', obj2 );
	* // returns false
	*/
	moveProperty: typeof moveProperty;

	/**
	* Returns a named typed tuple factory.
	*
	* @param names - field (property) names
	* @param options - options
	* @param options.dtype - default data type (default: 'float64')
	* @param options.name - tuple name (default: 'tuple')
	* @throws must provide distinct field names
	* @throws cannot provide a reserved field (property) name
	* @throws must provide valid options
	* @throws must provide a recognized data type
	* @returns factory function
	*
	* @example
	* var point = ns.namedtypedtuple( [ 'x', 'y' ] );
	*
	* var p = point( [ 1.0, -1.0 ] );
	*
	* var x = p[ 0 ];
	* // returns 1.0
	*
	* x = p.x;
	* // returns 1.0
	*
	* var y = p[ 1 ];
	* // returns -1.0
	*
	* y = p.y;
	* // returns -1.0
	*/
	namedtypedtuple: typeof namedtypedtuple;

	/**
	* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
	*
	* ## Notes
	*
	* -   The function is *not* robust for ES2015+ environments. In ES2015+, `Symbol.toStringTag` allows overriding the default description of an object. While measures are taken to uncover the default description, such measures can be thwarted. While this function remains useful for type-checking, be aware that value impersonation is possible. Where possible, prefer functions tailored to checking for particular value types, as specialized functions are better equipped to address `Symbol.toStringTag`.
	*
	* @param v - input value
	* @returns string value indicating a specification defined classification of the input value
	*
	* @example
	* var str = ns.nativeClass( 'a' );
	* // returns '[object String]'
	*
	* @example
	* var str = ns.nativeClass( 5 );
	* // returns '[object Number]'
	*
	* @example
	* function Beep() {
	*     return this;
	* }
	* var str = ns.nativeClass( new Beep() );
	* // returns '[object Object]'
	*/
	nativeClass: typeof nativeClass;

	/**
	* Adds a callback to the "next tick queue".
	*
	* ## Notes
	*
	* -   The queue is fully drained after the current operation on the JavaScript stack runs to completion and before the event loop is allowed to continue.
	*
	* @param clbk - callback
	* @param args - arguments to supply to the callback upon invocation
	*
	* @example
	* function beep() {
	*     console.log( 'boop' );
	* }
	*
	* ns.nextTick( beep );
	*/
	nextTick: typeof nextTick;

	/**
	* Tests whether all elements in a collection are falsy.
	*
	* ## Notes
	*
	* -   The function immediately returns upon encountering a truthy value.
	* -   If provided an empty collection, the function returns `true`.
	*
	* @param collection - input collection
	* @returns boolean indicating whether all elements are falsy
	*
	* @example
	* var arr = [ 0, 0, 0, 0, 0 ];
	*
	* var bool = ns.none( arr );
	* // returns true
	*/
	none: typeof none;

	/**
	* Tests whether all elements in a collection fail a test implemented by a predicate function.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon encountering a truthy return value.
	* -   If provided an empty collection, the function returns `true`.
	*
	* @param collection - input collection
	* @param predicate - test function
	* @param thisArg - execution context
	* @returns boolean indicating whether all elements fail a test
	*
	* @example
	* function isPositive( v ) {
	*     return ( v > 0 );
	* }
	*
	* var arr = [ -1, -2, -3, -4 ];
	*
	* var bool = ns.noneBy( arr, isPositive );
	* // returns true
	*/
	noneBy: typeof noneBy;

	/**
	* Tests whether all elements in a collection fail a test implemented by a predicate function, iterating from right to left.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon encountering a truthy return value.
	*
	* -   If provided an empty collection, the function returns `true`.
	*
	* @param collection - input collection
	* @param predicate - test function
	* @param thisArg - execution context
	* @returns boolean indicating whether all elements fail a test
	*
	* @example
	* function isPositive( v ) {
	*     return ( v > 0 );
	* }
	*
	* var arr = [ -1, -2, -3, -4 ];
	*
	* var bool = ns.noneByRight( arr, isPositive );
	* // returns true
	*/
	noneByRight: typeof noneByRight;

	/**
	* Returns an array of an object's own non-enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own non-enumerable property names and symbols
	*
	* @example
	* var defineProperty = require( `@stdlib/utils/define-property` );
	*
	* var obj = {};
	*
	* obj.a = 'a';
	* defineProperty( obj, 'b', {
	*     'configurable': false,
	*     'enumerable': false,
	*     'writable': false,
	*     'value': 'b'
	* });
	*
	* var props = ns.nonEnumerableProperties( obj );
	* // returns [ 'b' ]
	*/
	nonEnumerableProperties: typeof nonEnumerableProperties;

	/**
	* Returns an array of an object's own and inherited non-enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited non-enumerable property names and symbols
	*
	* @example
	* var props = ns.nonEnumerablePropertiesIn( [] );
	* // returns [...]
	*/
	nonEnumerablePropertiesIn: typeof nonEnumerablePropertiesIn;

	/**
	* Returns an array of an object's own non-enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own non-enumerable property names
	*
	* @example
	* var defineProperty = require( `@stdlib/utils/define-property` );
	*
	* var obj = {};
	*
	* defineProperty( obj, 'beep', {
	*     'configurable': false,
	*     'enumerable': false,
	*     'writable': false,
	*     'value': 'boop'
	* });
	*
	* var keys = ns.nonEnumerablePropertyNames( obj );
	* // returns [ 'beep' ]
	*/
	nonEnumerablePropertyNames: typeof nonEnumerablePropertyNames;

	/**
	* Returns an array of an object's own and inherited non-enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited non-enumerable property names
	*
	* @example
	* var defineProperty = require( `@stdlib/utils/define-property` );
	*
	* var obj = {};
	*
	* defineProperty( obj, 'beep', {
	*     'configurable': false,
	*     'enumerable': false,
	*     'writable': false,
	*     'value': 'boop'
	* });
	*
	* var keys = ns.nonEnumerablePropertyNamesIn( obj );
	* // e.g., returns [ 'beep', ... ]
	*/
	nonEnumerablePropertyNamesIn: typeof nonEnumerablePropertyNamesIn;

	/**
	* Returns an array of an object's own non-enumerable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own non-enumerable symbol properties
	*
	* @example
	* var symbols = ns.nonEnumerablePropertySymbols( {} );
	*/
	nonEnumerablePropertySymbols: typeof nonEnumerablePropertySymbols;

	/**
	* Returns an array of an object's own and inherited non-enumerable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited non-enumerable symbol properties
	*
	* @example
	* var symbols = ns.nonEnumerablePropertySymbolsIn( {} );
	*/
	nonEnumerablePropertySymbolsIn: typeof nonEnumerablePropertySymbolsIn;

	/**
	* Returns an array of an object's own enumerable property names which are not integer indices.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param obj - input value
	* @returns key array
	*
	* @example
	* function Foo() {
	*     this.beep = 'boop';
	*     this[ 0 ] = 3.14;
	*     return this;
	* }
	*
	* Foo.prototype.foo = 'bar';
	*
	* var obj = new Foo();
	*
	* var keys = ns.nonIndexKeys( obj );
	* // e.g., returns [ 'beep' ]
	*/
	nonIndexKeys: typeof nonIndexKeys;

	/**
	* A function which does nothing.
	*
	* @example
	* ns.noop();
	* // ...does nothing.
	*/
	noop: typeof noop;

	/**
	* Inverts an object, such that keys become values and values become keys.
	*
	* @param obj - input object
	* @param opts - function options
	* @param opts.duplicates - boolean indicating whether to store duplicate keys (default: true)
	* @returns inverted object
	*
	* @example
	* var out = ns.objectInverse({
	*     'a': 'beep',
	*     'b': 'boop'
	* });
	* // returns { 'beep': 'a', 'boop': 'b' }
	*
	* @example
	* var out = ns.objectInverse({
	*     'a': 'beep',
	*     'b': 'beep'
	* });
	* // returns { 'beep': [ 'a', 'b' ] }
	*
	* @example
	* var obj = {};
	* obj.a = 'beep';
	* obj.b = 'boop';
	* obj.c = 'beep'; // inserted after `a`
	*
	* var out = ns.objectInverse( obj, {
	*     'duplicates': false
	* });
	* // returns { 'beep': 'c', 'boop': 'b' }
	*/
	objectInverse: typeof objectInverse;

	/**
	* Inverts an object, such that keys become values and values become keys, according to a transform function.
	*
	* ## Notes
	*
	* -   The transform function is provided three arguments:
	*
	*     -   `key`: object key
	*     -   `value`: object value corresponding to `key`
	*     -   `obj`: the input object
	*
	* -   The value returned by a transform function should be a value which can be serialized as an object key. Hence, beware when providing objects having values which are themselves objects. The function relies on native object serialization (`#toString`) when converting transform function return values to keys.
	*
	* -   Insertion order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic inversion.
	*
	* @param obj - input object
	* @param opts - function options
	* @param opts.duplicates - boolean indicating whether to store duplicate keys (default: true)
	* @param transform - transform function
	* @returns inverted object
	*
	* @example
	* function transform( key, value ) {
	*     return value;
	* }
	*
	* var obj = {};
	* obj.a = 'beep';
	* obj.b = 'boop';
	* obj.c = 'beep'; // inserted after `a`
	*
	* var opts = {
	*     'duplicates': false
	* };
	* var out = ns.objectInverseBy( obj, opts, transform );
	* // returns { 'beep': 'c', 'boop': 'b' }
	*/
	objectInverseBy: typeof objectInverseBy;

	/**
	* Returns a partial object copy excluding specified keys.
	*
	* ## Notes
	*
	* -   The function returns a shallow copy.
	* -   The function ignores non-existent keys.
	* -   The function only copies own properties. Hence, the function never copies inherited properties.
	*
	* @param obj - source object
	* @param keys - keys to exclude
	* @returns new object
	*
	* @example
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.omit( obj1, 'b' );
	* // returns { 'a': 1 }
	*/
	omit: typeof omit;

	/**
	* Returns a partial object copy excluding properties for which a predicate returns a truthy value.
	*
	* ## Notes
	*
	* -   The function returns a shallow copy.
	* -   The function only copies own properties. Hence, the function never copies inherited properties.
	*
	* @param obj - source object
	* @param predicate - predicate function
	* @returns new object
	*
	* @example
	* function predicate( key, value ) {
	*     return ( value > 1 );
	* }
	*
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.omitBy( obj1, predicate );
	* // returns { 'a': 1 }
	*/
	omitBy: typeof omitBy;

	/**
	* Opens a URL.
	*
	* ## Notes
	*
	* -   In a non-browser environment, the function returns an unreferenced child process. In a browser environment, the function returns a reference to a `window` object.
	*
	* @param url - URL to open
	* @throws must provide a valid URI
	* @returns spawned process (unreferenced)
	*
	* @example
	* var proc = ns.openURL( 'https://google.com' );
	*/
	openURL: typeof openURL;

	/**
	* Returns a function of smaller arity by partially applying arguments.
	*
	* @param fcn - function to partially apply
	* @param args - arguments to partially apply
	* @returns partially applied function
	*
	* @example
	* function add( x, y ) {
	*     return x + y;
	* }
	*
	* var add2 = ns.papply( add, 2 );
	*
	* var sum = add2( 3 );
	* // returns 5
	*/
	papply: typeof papply;

	/**
	* Returns a function of smaller arity by partially applying arguments from the right.
	*
	* @param fcn - function to partially apply
	* @param args - arguments to partially apply
	* @returns partially applied function
	*
	* @example
	* function say( text, name ) {
	*     return text + ', ' + name + '.';
	* }
	*
	* var toGrace = ns.papplyRight( say, 'Grace Hopper' );
	*
	* var str = toGrace( 'Hello' );
	* // returns 'Hello, Grace Hopper.'
	*
	* str = toGrace( 'Thank you' );
	* // returns 'Thank you, Grace Hopper.'
	*/
	papplyRight: typeof papplyRight;

	/**
	* Executes scripts in parallel.
	*
	* @param files - script file paths
	* @param options - function options
	* @param options.cmd - executable file/command (default: 'node')
	* @param options.concurrency - number of scripts to execute concurrently
	* @param options.workers - number of workers
	* @param options.ordered - boolean indicating whether to preserve the order of script output
	* @param options.uid - process user identity
	* @param options.gid - process group identity
	* @param options.maxBuffer - max child process `stdio` buffer size (default: 200*1024*1024)
	* @param clbk - callback to invoke after executing all scripts
	* @throws must provide valid options
	*
	* @example
	* var files = [ './a.js', './b.js ' ];
	*
	* var opts = {
	*     'workers': 3,
	*     'concurrency': 3
	* };
	*
	* function done( error ) {
	*     if ( error ) {
	*         throw error;
	*     }
	* }
	*
	* ns.parallel( files, opts, done );
	*/
	parallel: typeof parallel;

	/**
	* Attempts to parse a string as JSON.
	*
	* @param str - string to parse
	* @param reviver - transformation function
	* @returns parsed value or parse error
	*
	* @example
	* var obj = ns.parseJSON( '{"beep":"boop"}' );
	* // returns {'beep':'boop'}
	*/
	parseJSON: typeof parseJSON;

	/**
	* Returns a partial object copy containing only specified keys.
	*
	* ## Notes
	*
	* -   If a key does not exist as an own property in a source object, the key is ignored.
	*
	* @param obj - source object
	* @param keys - keys to copy
	* @returns new object
	*
	* @example
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.pick( obj1, 'b' );
	* // returns { 'b': 2 }
	*/
	pick: typeof pick;

	/**
	* Returns a partial object copy containing properties for which a predicate returns a truthy value.
	*
	* @param obj - source object
	* @param predicate - predicate function
	* @returns new object
	*
	* @example
	* function predicate( key, value ) {
	*     return ( value > 1 );
	* }
	*
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.pickBy( obj1, predicate );
	* // returns { 'b': 2 }
	*/
	pickBy: typeof pickBy;

	/**
	* Extracts a property value from each element of an object array.
	*
	* ## Notes
	*
	* -   The function skips `null` and `undefined` array elements.
	* -   Extracted values are not cloned.
	*
	* @param arr - source array
	* @param prop - property to access
	* @param options - function options
	* @param options.copy - boolean indicating whether to return a new data structure (default: true)
	* @throws first argument must be an object array
	* @returns destination array
	*
	* @example
	* var arr = [
	*     { 'a': 1, 'b': 2 },
	*     { 'a': 0.5, 'b': 3 }
	* ];
	*
	* var out = ns.pluck( arr, 'a' );
	* // returns [ 1, 0.5 ]
	*
	* @example
	* var arr = [
	*     { 'a': 1, 'b': 2 },
	*     { 'a': 0.5, 'b': 3 }
	* ];
	*
	* var out = ns.pluck( arr, 'a', {'copy':false} );
	* // returns [ 1, 0.5 ]
	*
	* var bool = ( arr[ 0 ] === out[ 0 ] );
	* // returns true
	*/
	pluck: typeof pluck;

	/**
	* Removes and returns the last element of a collection.
	*
	* ## Notes
	*
	* -   The function returns an array with two elements: the shortened collection and the removed element.
	* -   If the input collection is a typed array whose length is greater than `0`, the first return value does not equal the input reference.
	* -   For purposes of generality, always treat the output collection as distinct from the input collection.
	*
	* @param collection - collection
	* @returns updated collection and the removed element
	*
	* @example
	* var arr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
	*
	* var out = ns.pop( arr );
	* // returns [ [ 1.0, 2.0, 3.0, 4.0 ], 5.0 ]
	*
	* @example
	* var Float64Array = require( `@stdlib/array/float64` );
	*
	* var arr = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* var out = ns.pop( arr );
	* // returns [ <Float64Array>[ 1.0, 2.0, 3.0, 4.0 ], 5.0 ]
	*/
	pop: typeof pop;

	/**
	* Adds elements from one collection to the beginning of another collection.
	*
	* ## Notes
	*
	* -   If the input collection is a typed array, the output value does not equal the input reference and the underlying `ArrayBuffer` may *not* be the same as the `ArrayBuffer` belonging to the input view.
	* -   For purposes of generality, always treat the output collection as distinct from the input collection.
	*
	* @param collection1 - collection
	* @param collection2 - collection containing elements to add
	* @returns updated collection
	*
	* @example
	* var arr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
	*
	* arr = ns.prepend( arr, [ 6.0, 7.0 ] );
	* // returns [ 6.0, 7.0, 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* @example
	* var Float64Array = require( `@stdlib/array/float64` );
	*
	* var arr = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* arr = ns.prepend( arr, [ 6.0, 7.0 ] );
	* // returns <Float64Array>[ 6.0, 7.0, 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*/
	prepend: typeof prepend;

	/**
	* Returns an array of an object's own enumerable and non-enumerable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own property names and symbols
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var props = ns.properties( obj );
	* // e.g., returns [ 'beep', 'foo' ]
	*/
	properties: typeof properties;

	/**
	* Returns an array of an object's own and inherited property names and symbols.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited property names and symbols
	*
	* @example
	* var props = ns.propertiesIn( [] );
	* // returns [...]
	*/
	propertiesIn: typeof propertiesIn;

	/**
	* Returns a property descriptor for an object's own property.
	*
	* ## Notes
	*
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if provided `undefined` or `null`, rather than throwing an error.
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if an object does not have a provided property, rather than `undefined`.
	*
	*
	* @param value - input object
	* @param  property - property
	* @returns property descriptor or null
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var desc = ns.propertyDescriptor( obj, 'foo' );
	* // returns {'configurable':true,'enumerable':true,'writable':true,'value':3.14}
	*/
	propertyDescriptor: typeof propertyDescriptor;

	/**
	* Returns a property descriptor for an object's own or inherited property.
	*
	* ## Notes
	*
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if provided `undefined` or `null`, rather than throwing an error.
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptor()`, this function returns `null` if an object does not have a provided property, rather than `undefined`.
	*
	* @param value - input object
	* @param property - property
	* @returns property descriptor or null
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var desc = ns.propertyDescriptorIn( obj, 'foo' );
	* // returns {'configurable':true,'enumerable':true,'writable':true,'value':3.14}
	*/
	propertyDescriptorIn: typeof propertyDescriptorIn;

	/**
	* Returns an object's own property descriptors.
	*
	* ## Notes
	*
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptors()`, this function returns an empty object if provided `undefined` or `null`, rather than throwing an error.
	*
	* @param value - input object
	* @returns property descriptors
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var desc = ns.propertyDescriptors( obj );
	* // returns {...}
	*/
	propertyDescriptors: typeof propertyDescriptors;

	/**
	* Returns an object's own and inherited property descriptors.
	*
	* ## Notes
	*
	* -   In contrast to the built-in `Object.getOwnPropertyDescriptors()`, this function returns an empty object if provided `undefined` or `null`, rather than throwing an error.
	*
	* @param value - input object
	* @returns own and inherited property descriptors
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var desc = ns.propertyDescriptorsIn( obj );
	* // returns { 'beep': {...}, 'foo': {...}, ... }
	*/
	propertyDescriptorsIn: typeof propertyDescriptorsIn;

	/**
	* Returns an array of an object's own enumerable and non-enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own property names
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var keys = ns.propertyNames( obj );
	* // e.g., returns [ 'beep', 'foo' ]
	*/
	propertyNames: typeof propertyNames;

	/**
	* Returns an array of an object's own and inherited enumerable and non-enumerable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited property names
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var keys = ns.propertyNamesIn( obj );
	* // e.g., returns [ 'beep', 'foo', ... ]
	*/
	propertyNamesIn: typeof propertyNamesIn;

	/**
	* Returns an array of an object's own symbol properties.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own symbol properties
	*
	* @example
	* var symbols = ns.propertySymbols( {} );
	* // returns []
	*/
	propertySymbols: typeof propertySymbols;

	/**
	* Returns an array of an object's own and inherited symbol properties.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited symbol properties
	*
	* @example
	* var symbols = ns.propertySymbolsIn( [] );
	*/
	propertySymbolsIn: typeof propertySymbolsIn;

	/**
	* Adds one or more elements to the end of a collection.
	*
	* ## Notes
	*
	* -   If the input collection is a typed array, the output value does not equal the input reference and the underlying `ArrayBuffer` may *not* be the same as the `ArrayBuffer` belonging to the input view.
	* -   For purposes of generality, always treat the output collection as distinct from the input collection.
	*
	* @param collection - collection
	* @param items - items to add
	* @returns updated collection
	*
	* @example
	* var arr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
	*
	* arr = ns.push( arr, 6.0, 7.0 );
	* // returns [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0 ]
	*
	* @example
	* var Float64Array = require( `@stdlib/array/float64` );
	*
	* var arr = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* arr = ns.push( arr, 6.0, 7.0 );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0 ]
	*/
	push: typeof push;

	/**
	* Returns the maximum finite value capable of being represented by a numeric real type.
	*
	* ## Notes
	*
	* The following numeric real types are supported:
	*
	* -   `float64`: double-precision floating-point numbers
	* -   `float32`: single-precision floating-point numbers
	* -   `float16`: half-precision floating-point numbers
	*
	* @param dtype - numeric type
	* @throws must provide a recognized numeric type
	* @returns maximum finite value
	*
	* @example
	* var m = ns.realmax( 'float64' );
	* // returns 1.7976931348623157e+308
	*
	* @example
	* var m = ns.realmax( 'float16' );
	* // returns 65504.0
	*
	* @example
	* var m = ns.realmax( 'float32' );
	* // returns 3.4028234663852886e+38
	*/
	realmax: typeof realmax;

	/**
	* Returns the smallest positive normal value capable of being represented by a numeric real type.
	*
	* ## Notes
	*
	* The following numeric real types are supported:
	*
	* -   `float64`: double-precision floating-point numbers
	* -   `float32`: single-precision floating-point numbers
	* -   `float16`: half-precision floating-point numbers
	*
	* @param dtype - numeric type
	* @throws must provide a recognized numeric type
	* @returns smallest positive normal value
	*
	* @example
	* var m = ns.realmin( 'float64' );
	* // returns 2.2250738585072014e-308
	*
	* @example
	* var m = ns.realmin( 'float16' );
	* // returns 0.00006103515625
	*
	* @example
	* var m = ns.realmin( 'float32' );
	* // returns 1.1754943508222875e-38
	*/
	realmin: typeof realmin;

	/**
	* Applies a function against an accumulator and each element in a collection and returns the accumulated result.
	*
	* ## Notes
	*
	* -   When invoked, the reduction function is provided four arguments:
	*
	*     -   `accumulator`: accumulated value
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   If provided an empty collection, the function returns the initial value.
	*
	* @param collection - input collection
	* @param initial - initial value
	* @param reducer - reduction function
	* @param thisArg - reduction function execution context
	* @returns accumulated result
	*
	* @example
	* function sum( acc, value ) {
	*     return acc + value;
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* var s = ns.reduce( arr, 0, sum );
	* // returns 10
	*/
	reduce: typeof reduce;

	/**
	* Applies a function against an accumulator and each element in a collection and returns the accumulated result, iterating from right to left.
	*
	* ## Notes
	*
	* -   When invoked, the reduction function is provided four arguments:
	*
	*     -   `accumulator`: accumulated value
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   If provided an empty collection, the function returns the initial value.
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `reduce` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `reduce()`, `[].push()` behavior is consistent with `reduceRight()` `[].unshift()` behavior.
	*
	* @param collection - input collection
	* @param initial - initial value
	* @param reducer - reduction function
	* @param thisArg - reduction function execution context
	* @returns accumulated result
	*
	* @example
	* function sum( acc, value, index ) {
	*     console.log( '%s: %d', index, value );
	*     return acc + value;
	* }
	*
	* var arr = [ 1, 2, 3, 4 ];
	*
	* var s = ns.reduceRight( arr, 0, sum );
	* // returns 10
	*/
	reduceRight: typeof reduceRight;

	/**
	* Parses a regular expression string and returns a new regular expression.
	*
	* ## Notes
	*
	* -   Provided strings should be properly escaped.
	* -   If unable to parse a string as a regular expression, the function returns `null`.
	*
	* @param str - regular expression string
	* @throws must provide a regular expression string
	* @returns regular expression or null
	*
	* @example
	* var re = ns.reFromString( '/beep/' );
	* // returns /beep/
	*/
	reFromString: typeof reFromString;

	/**
	* Returns a function that invokes a provided function with reordered arguments.
	*
	* @param fcn - input function
	* @param indices - argument indices
	* @param thisArg - function context
	* @throws second argument must be an array of nonnegative integers
	* @returns function with reordered arguments
	*
	* @example
	* function foo( a, b, c ) {
	*     return [ a, b, c ];
	* }
	*
	* var bar = ns.reorderArguments( foo, [ 2, 0, 1 ] );
	*
	* var out = bar( 1, 2, 3 );
	* // returns [ 3, 1, 2 ]
	*/
	reorderArguments: typeof reorderArguments;

	/**
	* Returns a function that invokes a provided function with arguments in reverse order.
	*
	* @param fcn - input function
	* @param thisArg - function context
	* @returns reverse arguments function
	*
	* @example
	* function foo( a, b, c ) {
	*     return [ a, b, c ];
	* }
	*
	* var bar = ns.reverseArguments( foo );
	*
	* var out = bar( 1, 2, 3 );
	* // returns [ 3, 2, 1 ]
	*/
	reverseArguments: typeof reverseArguments;

	/**
	* Returns the maximum safe integer capable of being represented by a numeric real type.
	*
	* ## Notes
	*
	* The following numeric real types are supported:
	*
	* -   `float64`: double-precision floating-point numbers
	* -   `float32`: single-precision floating-point numbers
	* -   `float16`: half-precision floating-point numbers
	*
	* @param dtype - numeric type
	* @throws must provide a recognized numeric type
	* @returns maximum safe integer
	*
	* @example
	* var m = ns.safeintmax( 'float64' );
	* // returns 9007199254740991
	*
	* @example
	* var m = ns.safeintmax( 'float16' );
	* // returns 2047
	*
	* @example
	* var m = ns.safeintmax( 'float32' );
	* // returns 16777215
	*/
	safeintmax: typeof safeintmax;

	/**
	* Returns the minimum safe integer capable of being represented by a numeric real type.
	*
	* ## Notes
	*
	* The following numeric real types are supported:
	*
	* -   `float64`: double-precision floating-point numbers
	* -   `float32`: single-precision floating-point numbers
	* -   `float16`: half-precision floating-point numbers
	*
	* @param dtype - numeric type
	* @throws must provide a recognized numeric type
	* @returns minimum safe integer
	*
	* @example
	* var m = ns.safeintmin( 'float64' );
	* // returns -9007199254740991
	*
	* @example
	* var m = ns.safeintmin( 'float16' );
	* // returns -2047
	*
	* @example
	* var m = ns.safeintmin( 'float32' );
	* // returns -16777215
	*/
	safeintmin: typeof safeintmin;

	/**
	* Removes and returns the first element of a collection.
	*
	* ## Notes
	*
	* -   The function returns an array with two elements: the shortened collection and the removed element.
	* -   If the input collection is a typed array whose length is greater than `0`, the first return value does not equal the input reference.
	* -   For purposes of generality, always treat the output collection as distinct from the input collection.
	*
	* @param collection - collection
	* @returns updated collection and the removed element
	*
	* @example
	* var arr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
	*
	* var out = ns.shift( arr );
	* // returns [ [ 2.0, 3.0, 4.0, 5.0 ], 1.0 ]
	*
	* @example
	* var Float64Array = require( `@stdlib/array/float64` );
	*
	* var arr = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* var out = ns.shift( arr );
	* // returns [ <Float64Array>[ 2.0, 3.0, 4.0, 5.0 ], 1.0 ]
	*/
	shift: typeof shift;

	/**
	* Returns the size (in bytes) of the canonical binary representation of a specified numeric type.
	*
	* ## Notes
	*
	* The following numeric types are supported:
	*
	* -   float64: double-precision floating-point numbers
	* -   float32: single-precision floating-point numbers
	* -   float16: half-precision floating-point numbers
	* -   int32: 32-bit two's complement signed integers
	* -   uint32: 32-bit unsigned integers
	* -   int16: 16-bit two's complement signed integers
	* -   uint16: 16-bit unsigned integers
	* -   int8: 8-bit two's complement signed integers
	* -   uint8: 8-bit unsigned integers
	* -   uint8c: 8-bit unsigned integers clamped to 0-255
	* -   complex128: 128-bit complex numbers
	* -   complex64: 64-bit complex numbers
	*
	* @param dtype - numeric type
	* @returns size in bytes
	*
	* @example
	* var s = ns.sizeOf( 'int8' );
	* // returns 1
	*
	* @example
	* var s = ns.sizeOf( 'uint8' );
	* // returns 1
	*
	* @example
	* var s = ns.sizeOf( 'int16' );
	* // returns 2
	*/
	sizeOf: typeof sizeOf;

	/**
	* Tests whether a collection contains at least `n` elements which are truthy.
	*
	* ## Notes
	*
	* -   The function immediately returns upon finding `n` truthy elements.
	* -   If provided an empty collection, the function returns `false`.
	*
	* @param collection - input collection
	* @param n - number of elements
	* @throws second argument must be a positive integer
	* @returns boolean indicating whether a collection contains at least `n` elements which are truthy
	*
	* @example
	* var arr = [ 0, 0, 1, 2, 3 ];
	*
	* var bool = ns.some( arr, 3 );
	* // returns true
	*/
	some: typeof some;

	/**
	* Tests whether a collection contains at least `n` elements which pass a test implemented by a predicate function.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon finding `n` successful elements.
	*
	* -   If provided an empty collection, the function returns `false`.
	*
	* @param collection - input collection
	* @param n - number of elements
	* @param predicate - test function
	* @param thisArg - execution context
	* @throws second argument must be a positive integer
	* @returns boolean indicating whether a collection contains at least `n` elements which pass a test
	*
	* @example
	* function isNegative( v ) {
	*     return ( v < 0 );
	* }
	*
	* var arr = [ 1, 2, -3, 4, -1 ];
	*
	* var bool = ns.someBy( arr, 2, isNegative );
	* // returns true
	*/
	someBy: typeof someBy;

	/**
	* Tests whether a collection contains at least `n` elements which pass a test implemented by a predicate function, iterating from right to left.
	*
	* ## Notes
	*
	* -   The predicate function is provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   The function immediately returns upon finding `n` successful elements.
	*
	* -   If provided an empty collection, the function returns `false`.
	*
	* @param collection - input collection
	* @param n - number of elements
	* @param predicate - test function
	* @param thisArg - execution context
	* @throws second argument must be a positive integer
	* @returns boolean indicating whether a collection contains at least `n` elements which pass a test
	*
	* @example
	* function isNegative( v ) {
	*     return ( v < 0 );
	* }
	*
	* var arr = [ -1, 1, -2, 3, 4 ];
	*
	* var bool = ns.someByRight( arr, 2, isNegative );
	* // returns true
	*/
	someByRight: typeof someByRight;

	/**
	* Stack
	*/
	Stack: typeof Stack;

	/**
	* Generates a frequency table.
	*
	* ## Notes
	*
	* -   The output is an array of arrays. Each sub-array corresponds to a unique value in the input collection and is structured as follows:
	*
	*     -   0: unique value
	*     -   1: value count
	*     -   2: frequency percentage
	*
	* -   If provided an empty collection, the function returns an empty array.
	*
	* @param collection - input collection
	* @returns frequency table
	*
	* @example
	* var arr = [ 'beep', 'boop', 'foo', 'beep' ];
	*
	* var out = ns.tabulate( arr );
	* // returns [ [ 'beep', 2, 0.5 ], [ 'boop', 1, 0.25 ], [ 'foo', 1, 0.25 ] ]
	*/
	tabulate: typeof tabulate;

	/**
	* Generates a frequency table according to a provided function.
	*
	* ## Notes
	*
	* ## Notes
	*
	* -   When invoked, the indicator function is provided two arguments:
	*
	*     - `value`: collection value
	*     - `index`: collection index
	*
	* -   The output is an array of arrays. Each sub-array corresponds to a unique value in the input collection and is structured as follows:
	*
	*     -   0: unique value
	*     -   1: value count
	*     -   2: frequency percentage
	*
	* -   If provided an empty collection, the function returns an empty array.
	*
	*
	* @param collection - input collection
	* @param options - function options
	* @param options.thisArg - execution context
	* @param indicator - function whose return values are used to populate the output frequency table
	* @returns frequency table
	*
	* @example
	* function indicator( value ) {
	*     return value[ 0 ];
	* }
	*
	* var arr = [ 'beep', 'boop', 'foo', 'beep' ];
	*
	* var opts = {
	*     'thisArg': {}
	* };
	* var out = ns.tabulateBy( arr, opts, indicator );
	* // returns [ [ 'b', 3, 0.75 ], [ 'f', 1, 0.25 ] ]
	*/
	tabulateBy: typeof tabulateBy;

	/**
	* Times a snippet.
	*
	* ## Notes
	*
	* -   If the `asynchronous` option is set to `true`, the implementation assumes that `before`, `after`, and `code` snippets are all asynchronous. Accordingly, these snippets should invoke a `next( [error] )` callback once complete. The implementation wraps the snippet within a function accepting two arguments: `state` and `next`.
	* -   The `state` parameter is simply an empty object which allows the `before`, `after`, and `code` snippets to share state.
	* -   Snippets always run in strict mode.
	* -   Always verify results. Doing so prevents the compiler from performing dead code elimination and other optimization techniques, which would render timing results meaningless.
	* -   Executed code is not sandboxed and has access to the global state. You are strongly advised against timing untrusted code. To time untrusted code, do so in an isolated environment (e.g., a separate process with restricted access to both global state and the host environment).
	* -   Wrapping asynchronous code does add overhead, but, in most cases, the overhead should be negligible compared to the execution cost of the timed snippet.
	* -   When the `asynchronous` option is `true`, ensure that the main `code` snippet is actually asynchronous. If a snippet releases the zalgo, an error complaining about exceeding the maximum call stack size is highly likely.
	* -   While many benchmark frameworks calculate various statistics over raw timing results (e.g., mean and standard deviation), do not do this. Instead, consider the fastest time an approximate lower bound for how fast an environment can execute a snippet. Slower times are more likely attributable to other processes interfering with timing accuracy rather than attributable to variability in JavaScript's speed. In which case, the minimum time is most likely the only result of interest. When considering all raw timing results, apply common sense rather than statistics.
	*
	* @param code - snippet to time
	* @param options - function options
	* @param options.before - setup code (default: '')
	* @param options.after - cleanup code (default: '')
	* @param options.iterations - number of iterations (default: 1e6)
	* @param options.repeats - number of repeats (default: 3)
	* @param options.asynchronous - boolean indicating whether a snippet is asynchronous (default: false)
	* @param clbk - callback to invoke upon completion
	*
	* @example
	* var code = 'var x = Math.pow( Math.random(), 3 );';
	* code += 'if ( x !== x ) {';
	* code += 'var err = new Error( \'Something went wrong.\' );';
	* code += 'next( err );';
	* code += '}';
	* code += 'process.nextTick( next );';
	*
	* var opts = {
	*     'iterations': 1e2,
	*     'asynchronous': true
	* };
	*
	* ns.timeit( code, opts, done );
	*
	* function done( error, results ) {
	*     if ( error ) {
	*         throw error;
	*     }
	*     console.dir( results );
	* }
	*/
	timeit: typeof timeit;

	/**
	* If a function does not throw, returns the function return value; otherwise, returns `y`.
	*
	* @param x - function to try invoking
	* @param y - value to return if a function throws
	* @returns either the return value of `x` or the provided argument `y`
	*
	* @example
	* var randu = require( `@stdlib/random/base/randu` );
	*
	* function x() {
	*     if ( randu() < 0.5 ) {
	*         throw new Error( 'beep' );
	*     }
	*     return 1.0;
	* }
	* var z = ns.trycatch( x, -1.0 );
	* // returns <number>
	*/
	trycatch: typeof trycatch;

	/**
	* Wraps a function in a try/catch block.
	*
	* ## Notes
	*
	* -   If provided an asynchronous function, the returned function only traps errors which occur during the current event loop tick.
	* -   If a function throws a literal, the literal is serialized as a string and returned as an `Error` object.
	*
	* @param fcn - function to wrap
	* @param thisArg - function context
	* @returns wrapped function
	*
	* @example
	* function fcn() {
	*     throw new Error( 'beep boop' );
	* }
	*
	* var f = ns.tryFunction( fcn );
	*
	* var out = f();
	* if ( out instanceof Error ) {
	*     console.error( out.message );
	*     // => 'beep boop'
	* }
	*/
	tryFunction: typeof tryFunction;

	/**
	* Wraps `require` in a try/catch block.
	*
	* ## Notes
	*
	* -   This function traps and returns any errors encountered when attempting to require a module.
	* -   Use caution when attempting to resolve a relative path or a local module. This function attempts to resolve a module from its current path. Thus, the function is unable to resolve anything which is not along its search path. For local requires, use an absolute file path.
	*
	* @param id - module id
	* @returns `module.exports` of the resolved module or an error
	*
	* @example
	* var out = ns.tryRequire( 'beepboop' );
	*
	* if ( out instanceof Error ) {
	*     console.error( out.message );
	* }
	*/
	tryRequire: typeof tryRequire;

	/**
	* If a function does not throw, returns the function return value; otherwise, returns the return value of a second function `y`.
	*
	* ## Notes
	*
	* -   The function `y` is provided a single argument:
	*
	*     -   error: the error thrown by `x`
	*
	* @param x - function to try invoking
	* @param y - function to invoke if a function throws
	* @returns the return value of either `x` or `y`
	*
	* @example
	* var randu = require( `@stdlib/random/base/randu` );
	*
	* function x() {
	*     if ( randu() < 0.5 ) {
	*         throw new Error( 'beep' );
	*     }
	*     return 1.0;
	* }
	*
	* function y() {
	*     return randu();
	* }
	*
	* var z = ns.trythen( x, y );
	* // returns <number>
	*/
	trythen: typeof trythen;

	/**
	* Returns the maximum value of a specified numeric type.
	*
	* ## Notes
	*
	* The following numeric types are supported:
	*
	* -   `float64`: double-precision floating-point numbers
	* -   `float32`: single-precision floating-point numbers
	* -   `float16`: half-precision floating-point numbers
	* -   `int32`: 32-bit two's complement signed integers
	* -   `uint32`: 32-bit unsigned integers
	* -   `int16`: 16-bit two's complement signed integers
	* -   `uint16`: 16-bit unsigned integers
	* -   `int8`: 8-bit two's complement signed integers
	* -   `uint8`: 8-bit unsigned integers
	* -   `uint8c`: 8-bit unsigned integers clamped to 0-255
	*
	* @param dtype - numeric type
	* @throws must provide a recognized numeric type
	* @returns maximum value
	*
	* @example
	* var m = ns.typemax( 'int8' );
	* // returns 127
	*
	* @example
	* var m = ns.typemax( 'uint8' );
	* // returns 255
	*
	* @example
	* var m = ns.typemax( 'int16' );
	* // returns 32767
	*/
	typemax: typeof typemax;

	/**
	* Returns the minimum value of a specified numeric type.
	*
	* ## Notes
	*
	* The following numeric types are supported:
	*
	* -   `float64`: double-precision floating-point numbers
	* -   `float32`: single-precision floating-point numbers
	* -   `float16`: half-precision floating-point numbers
	* -   `int32`: 32-bit two's complement signed integers
	* -   `uint32`: 32-bit unsigned integers
	* -   `int16`: 16-bit two's complement signed integers
	* -   `uint16`: 16-bit unsigned integers
	* -   `int8`: 8-bit two's complement signed integers
	* -   `uint8`: 8-bit unsigned integers
	* -   `uint8c`: 8-bit unsigned integers clamped to 0-255
	*
	* @param dtype - numeric type
	* @throws must provide a recognized numeric type
	* @returns minimum value
	*
	* @example
	* var m = ns.typemin( 'int8' );
	* // returns -128
	*
	* @example
	* var m = ns.typemin( 'uint8' );
	* // returns 0
	*
	* @example
	* var m = ns.typemin( 'int16' );
	* // returns -32768
	*/
	typemin: typeof typemin;

	/**
	* Determines a value's type.
	*
	* ## Notes
	*
	* The following values are not natively provided in older JavaScript engines:
	*
	* -   `Map`
	* -   `Set`
	* -   `WeakMap`
	* -   `WeakSet`
	* -   `Symbol`
	*
	* @param value - input value
	* @returns string indicating the value's type
	*
	* @example
	* var str = ns.typeOf( 'a' );
	* // returns 'string'
	*
	* @example
	* var str = ns.typeOf( 5 );
	* // returns 'number'
	*/
	typeOf: typeof typeOf;

	/**
	* Converts the first letter of each object key to lowercase.
	*
	* ## Notes
	*
	* -   The function only transforms own properties. Hence, the function does not transform inherited properties.
	* -   The function shallow copies key values.
	*
	* @param obj - source object
	* @returns new object
	*
	* @example
	* var obj1 = {
	*     'AA': 1,
	*     'BB': 2
	* };
	*
	* var obj2 = ns.uncapitalizeKeys( obj1 );
	* // returns { 'aA': 1, 'bB': 2 }
	*/
	uncapitalizeKeys: typeof uncapitalizeKeys;

	/**
	* Transforms a curried function into a function invoked with multiple arguments.
	*
	* @param fcn - curried function
	* @param thisArg - evaluation context
	* @returns uncurried function
	*
	* @example
	* function addX( x ) {
	*     return function addY( y ) {
	*         return x + y;
	*     };
	* }
	*
	* var add = ns.uncurry( addX );
	*
	* var sum = add( 2, 3 );
	* // returns 5
	*/
	uncurry: typeof uncurry;

	/**
	* Transforms a curried function into a function invoked with multiple arguments.
	*
	* @param fcn - curried function
	* @param thisArg - evaluation context
	* @returns uncurried function
	*
	* @example
	* function addX( x ) {
	*     return function addY( y ) {
	*         return x + y;
	*     };
	* }
	*
	* var add = ns.uncurryRight( addX );
	*
	* var sum = add( 3, 2 );
	* // returns 5
	*/
	uncurryRight: typeof uncurryRight;

	/**
	* Adds one or more elements to the beginning of a collection.
	*
	* ## Notes
	*
	* -   If the input collection is a typed array, the output value does not equal the input reference and the underlying `ArrayBuffer` may *not* be the same as the `ArrayBuffer` belonging to the input view.
	* -   For purposes of generality, always treat the output collection as distinct from the input collection.
	*
	* @param collection - collection
	* @param items - items to add
	* @returns updated collection
	*
	* @example
	* var arr = [ 1.0, 2.0, 3.0, 4.0, 5.0 ];
	*
	* arr = ns.unshift( arr, 6.0, 7.0 );
	* // returns [ 6.0, 7.0, 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* @example
	* var Float64Array = require( `@stdlib/array/float64` );
	*
	* var arr = new Float64Array( [ 1.0, 2.0, 3.0, 4.0, 5.0 ] );
	* // returns <Float64Array>[ 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*
	* arr = ns.unshift( arr, 6.0, 7.0 );
	* // returns <Float64Array>[ 6.0, 7.0, 1.0, 2.0, 3.0, 4.0, 5.0 ]
	*/
	unshift: typeof unshift;

	/**
	* Invokes a function until a test condition is true.
	*
	* ## Notes
	*
	* -   The condition is evaluated *after* executing the provided function; thus, `fcn` *always* executes at least once.
	* -   When invoked, both the predicate function and the function to invoke are provided a single argument:
	*
	*        - `i`: iteration number (starting from zero)
	*
	* @param predicate - function which indicates whether to stop invoking a function
	* @param fcn - function to invoke
	* @param thisArg - execution context for the invoked function
	*
	* @example
	* function predicate( i ) {
	*     return ( i >= 5 );
	* }
	*
	* function beep( i ) {
	*     console.log( 'beep: %d', i );
	* }
	*
	* ns.until( predicate, beep );
	*/
	until: typeof until;

	/**
	* Until a test condition is true, invokes a function once for each element in a collection.
	*
	* ## Notes
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* @param collection - input collection
	* @param predicate - function which indicates whether to stop iterating over a collection
	* @param fcn - function to invoke
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, key, collection ) {
	*     return ( v !== v );
	* }
	*
	* function log( v, key, collection ) {
	*     console.log( '%s: %d', key, v );
	* }
	*
	* var arr = [ 1, 2, 3, 4, NaN, 5 ];
	*
	* ns.untilEach( arr, predicate, log );
	*/
	untilEach: typeof untilEach;

	/**
	* Until a test condition is true, invokes a function once for each element in a collection, iterating from right to left.
	*
	* ## Notes
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `untilEach` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `untilEach()`, `[].push()` behavior is consistent with `untilEachRight()` `[].unshift()` behavior.
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* @param collection - input collection
	* @param predicate - function which indicates whether to stop iterating over a collection
	* @param fcn - function to invoke
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v !== v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, NaN, 2, 3, 4, 5 ];
	*
	* ns.untilEachRight( arr, predicate, log );
	*/
	untilEachRight: typeof untilEachRight;

	/**
	* Unzips a zipped array (i.e., a nested array of tuples).
	*
	* @param arr - zipped array
	* @param idx - array of indices specifying which tuple elements to unzip
	* @returns array of unzipped arrays
	*
	* @example
	* var arr = [ [ 1, 'a', 3 ], [ 2, 'b', 4 ] ];
	*
	* var out = ns.unzip( arr );
	* // returns [ [ 1, 2 ], [ 'a', 'b' ], [ 3, 4 ] ]
	*
	* @example
	* var arr = [ [ 1, 'a', 3 ], [ 2, 'b', 4 ] ];
	*
	* var out = ns.unzip( arr, [ 0, 2 ] );
	* // returns [ [ 1, 2 ], [ 3, 4 ] ]
	*/
	unzip: typeof unzip;

	/**
	* Converts each object key to uppercase.
	*
	* ## Notes
	*
	* -   The function only transforms own properties. Hence, the function does not transform inherited properties.
	* -   The function shallow copies key values.
	*
	* @param obj - source object
	* @returns new object
	*
	* @example
	* var obj1 = {
	*     'a': 1,
	*     'b': 2
	* };
	*
	* var obj2 = ns.uppercaseKeys( obj1 );
	* // returns { 'A': 1, 'B': 2 }
	*/
	uppercaseKeys: typeof uppercaseKeys;

	/**
	* Returns an array of an object's own enumerable property values.
	*
	* ## Notes
	*
	* -   Value order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	*
	* @param obj - input object
	* @returns value array
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 'bar'
	* };
	*
	* var vals = ns.objectValues( obj );
	* // e.g., returns [ 'boop', 'bar' ]
	*/
	objectValues: typeof objectValues;

	/**
	* Returns an array of an object's own and inherited enumerable property values.
	*
	* ## Notes
	*
	* -   Value order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	*
	* @param obj - input object
	* @returns value array
	*
	* @example
	* function Foo() {
	*     this.beep = 'boop';
	*     return this;
	* }
	*
	* Foo.prototype.foo = 'bar';
	*
	* var obj = new Foo();
	*
	* var values = ns.objectValuesIn( obj );
	* // e.g., returns [ 'boop', 'bar' ]
	*/
	objectValuesIn: typeof objectValuesIn;

	/**
	* Invokes a function while a test condition is true.
	*
	* ## Notes
	*
	* -   The condition is evaluated *after* executing the provided function; thus, `fcn` *always* executes at least once.
	* -   When invoked, both the predicate function and the function to invoke are provided a single argument:
	*
	*        - `i`: iteration number (starting from zero)
	*
	* @param predicate - function which indicates whether to continue invoking a function
	* @param fcn - function to invoke
	* @param thisArg - execution context for the invoked function
	*
	* @example
	* function predicate( i ) {
	*     return ( i < 5 );
	* }
	*
	* function beep( i ) {
	*     console.log( 'beep: %d', i );
	* }
	*
	* ns.whilst( predicate, beep );
	*/
	whilst: typeof whilst;

	/**
	* While a test condition is true, invokes a function once for each element in a collection.
	*
	* ## Notes
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* @param collection - input collection
	* @param predicate - function which indicates whether to continue iterating over a collection
	* @param fcn - function to invoke
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v === v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, 2, 3, 4, NaN, 5 ];
	*
	* ns.whileEach( arr, predicate, log );
	*/
	whileEach: typeof whileEach;

	/**
	* While a test condition is true, invokes a function once for each element in a collection, iterating from right to left.
	*
	* ## Notes
	*
	* -   When invoked, both the predicate function and the function to apply are provided three arguments:
	*
	*     -   `value`: collection value
	*     -   `index`: collection index
	*     -   `collection`: the input collection
	*
	* -   For dynamic array resizing, the only behavior made intentionally consistent with `whileEach` (iterating from left to right) is when elements are pushed onto the beginning (end) of an array. In other words, for `whileEach()`, `[].push()` behavior is consistent with `whileEachRight()` `[].unshift()` behavior.
	*
	*
	* @param collection - input collection
	* @param predicate - function which indicates whether to continue iterating over a collection
	* @param fcn - function to invoke
	* @param thisArg - execution context for the applied function
	* @returns input collection
	*
	* @example
	* function predicate( v, index, collection ) {
	*     return ( v === v );
	* }
	*
	* function log( v, index, collection ) {
	*     console.log( '%s: %d', index, v );
	* }
	*
	* var arr = [ 1, NaN, 2, 3, 4, 5 ];
	*
	* ns.whileEachRight( arr, predicate, log );
	*/
	whileEachRight: typeof whileEachRight;

	/**
	* Returns an array of an object's own writable property names and symbols.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own property writable names and symbols
	*
	* @example
	* var obj = {
	*     'beep': 'boop',
	*     'foo': 3.14
	* };
	*
	* var props = ns.writableProperties( obj );
	* // e.g., returns [ 'beep', 'foo' ]
	*/
	writableProperties: typeof writableProperties;

	/**
	* Returns an array of an object's own and inherited writable property names and symbols.
	*
	* ## Notes
	*
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited writable property names and symbols
	*
	* @example
	* var props = ns.writablePropertiesIn( [] );
	* // returns [...]
	*/
	writablePropertiesIn: typeof writablePropertiesIn;

	/**
	* Returns an array of an object's own writable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own writable property names
	*
	* @example
	* var defineProperty = require( `@stdlib/utils/define-property` );
	*
	* var obj = { 'a': 'b' };
	*
	* defineProperty( obj, 'beep', {
	*     'configurable': true,
	*     'enumerable': true,
	*     'writable': false,
	*     'value': 'boop'
	* });
	*
	* var keys = ns.writablePropertyNames( obj );
	* // returns [ 'a' ]
	*/
	writablePropertyNames: typeof writablePropertyNames;

	/**
	* Returns an array of an object's own and inherited writable property names.
	*
	* ## Notes
	*
	* -   Name order is not guaranteed, as object key enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's keys, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited writable property names
	*
	* @example
	* var defineProperty = require( `@stdlib/utils/define-property` );
	*
	* var obj = { 'a': 'b' };
	*
	* defineProperty( obj, 'beep', {
	*     'configurable': true,
	*     'enumerable': true,
	*     'writable': false,
	*     'value': 'boop'
	* });
	*
	* var keys = ns.writablePropertyNamesIn( obj );
	* // e.g., returns [ 'a', ... ]
	*/
	writablePropertyNamesIn: typeof writablePropertyNamesIn;

	/**
	* Returns an array of an object's own writable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own writable symbol properties
	*
	* @example
	* var symbols = ns.writablePropertySymbols( {} );
	*/
	writablePropertySymbols: typeof writablePropertySymbols;

	/**
	* Returns an array of an object's own and inherited writable symbol properties.
	*
	* ## Notes
	*
	* -   Property order is not guaranteed, as object property enumeration is not specified according to the ECMAScript specification. In practice, however, most engines use insertion order to sort an object's properties, thus allowing for deterministic extraction.
	* -   If provided `null` or `undefined`, the function returns an empty array.
	*
	* @param value - input object
	* @returns a list of own and inherited writable symbol properties
	*
	* @example
	* var symbols = ns.writablePropertySymbolsIn( {} );
	*/
	writablePropertySymbolsIn: typeof writablePropertySymbolsIn;

	/**
	* Generates array tuples from input arrays.
	*
	* @param arr0 - first input array
	* @param arr1 - second input array
	* @param args - subsequent arrays followed by an optional options object
	* @returns output array of arrays
	*
	* @example
	* var ns.zipped = ns.zip( [ 1, 2 ], [ 'a', 'b' ] );
	* // returns [ [ 1, 'a' ], [ 2, 'b' ] ]
	*
	* @example
	* var ns.zipped = ns.zip( [ 1, 2, 3 ], [ 'a', 'b' ] );
	* // returns [ [ 1, 'a' ], [ 2, 'b' ] ]
	*
	* @example
	* var opts = {
	*     'trunc': false
	* };
	*
	* var ns.zipped = ns.zip( [ 1, 2, 3 ], [ 'a', 'b' ], opts );
	* // returns [ [ 1, 'a' ], [ 2, 'b' ], [ 3, null ] ]
	*
	* @example
	* var opts = {
	*     'trunc': false,
	*     'fill': ''
	* };
	*
	* var ns.zipped = ns.zip( [ 1, 2, 3 ], [ 'a', 'b' ], opts );
	* // returns [ [ 1, 'a' ], [ 2, 'b' ], [ 3, '' ] ]
	*
	* @example
	* var arr = [ [ 1, 2 ], [ 'a', 'b' ] ];
	*
	* // Default behavior:
	* var ns.zipped = ns.zip( arr );
	* // returns [ [ [ 1, 2 ] ], [ [ 'a', 'b' ] ] ]
	*
	* // Array of arrays:
	* ns.zipped = ns.zip( arr, { 'arrays': true } );
	* // returns [ [ 1, 'a' ], [ 2, 'b' ] ]
	*/
	zip: typeof zip;
}

/**
* Standard utilities.
*/
declare var ns: Namespace;


// EXPORTS //

export = ns;
