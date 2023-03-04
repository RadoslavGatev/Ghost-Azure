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

/*
* The following modules are intentionally not exported: library-manifest
*/

// MODULES //

var setReadOnly = require( './../define-read-only-property' );


// MAIN //

/**
* Top-level namespace.
*
* @namespace utils
*/
var utils = {};

/**
* @name any
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/any}
*/
setReadOnly( utils, 'any', require( './../any' ) );

/**
* @name anyBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/any-by}
*/
setReadOnly( utils, 'anyBy', require( './../any-by' ) );

/**
* @name anyByRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/any-by-right}
*/
setReadOnly( utils, 'anyByRight', require( './../any-by-right' ) );

/**
* @name append
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/append}
*/
setReadOnly( utils, 'append', require( './../append' ) );

/**
* @name argumentFunction
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/argument-function}
*/
setReadOnly( utils, 'argumentFunction', require( './../argument-function' ) );

/**
* @name async
* @memberof utils
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/utils/async}
*/
setReadOnly( utils, 'async', require( './../async' ) );

/**
* @name bifurcate
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/bifurcate}
*/
setReadOnly( utils, 'bifurcate', require( './../bifurcate' ) );

/**
* @name bifurcateBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/bifurcate-by}
*/
setReadOnly( utils, 'bifurcateBy', require( './../bifurcate-by' ) );

/**
* @name bifurcateIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/bifurcate-in}
*/
setReadOnly( utils, 'bifurcateIn', require( './../bifurcate-in' ) );

/**
* @name bifurcateOwn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/bifurcate-own}
*/
setReadOnly( utils, 'bifurcateOwn', require( './../bifurcate-own' ) );

/**
* @name capitalizeKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/capitalize-keys}
*/
setReadOnly( utils, 'capitalizeKeys', require( './../capitalize-keys' ) );

/**
* @name CircularBuffer
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/circular-buffer}
*/
setReadOnly( utils, 'CircularBuffer', require( './../circular-buffer' ) );

/**
* @name CompactAdjacencyMatrix
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/compact-adjacency-matrix}
*/
setReadOnly( utils, 'CompactAdjacencyMatrix', require( './../compact-adjacency-matrix' ) );

/**
* @name compose
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/compose}
*/
setReadOnly( utils, 'compose', require( './../compose' ) );

/**
* @name constantFunction
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/constant-function}
*/
setReadOnly( utils, 'constantFunction', require( './../constant-function' ) );

/**
* @name constructorName
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/constructor-name}
*/
setReadOnly( utils, 'constructorName', require( './../constructor-name' ) );

/**
* @name convertPath
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/convert-path}
*/
setReadOnly( utils, 'convertPath', require( './../convert-path' ) );

/**
* @name copy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/copy}
*/
setReadOnly( utils, 'copy', require( './../copy' ) );

/**
* @name countBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/count-by}
*/
setReadOnly( utils, 'countBy', require( './../count-by' ) );

/**
* @name curry
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/curry}
*/
setReadOnly( utils, 'curry', require( './../curry' ) );

/**
* @name curryRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/curry-right}
*/
setReadOnly( utils, 'curryRight', require( './../curry-right' ) );

/**
* @name deepGet
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/deep-get}
*/
setReadOnly( utils, 'deepGet', require( './../deep-get' ) );

/**
* @name deepPluck
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/deep-pluck}
*/
setReadOnly( utils, 'deepPluck', require( './../deep-pluck' ) );

/**
* @name deepSet
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/deep-set}
*/
setReadOnly( utils, 'deepSet', require( './../deep-set' ) );

/**
* @name setConfigurableReadOnlyAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-configurable-read-only-accessor}
*/
setReadOnly( utils, 'setConfigurableReadOnlyAccessor', require( './../define-configurable-read-only-accessor' ) );

/**
* @name setConfigurableReadOnly
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-configurable-read-only-property}
*/
setReadOnly( utils, 'setConfigurableReadOnly', require( './../define-configurable-read-only-property' ) );

/**
* @name setConfigurableReadWriteAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-configurable-read-write-accessor}
*/
setReadOnly( utils, 'setConfigurableReadWriteAccessor', require( './../define-configurable-read-write-accessor' ) );

/**
* @name setConfigurableWriteOnlyAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-configurable-write-only-accessor}
*/
setReadOnly( utils, 'setConfigurableWriteOnlyAccessor', require( './../define-configurable-write-only-accessor' ) );

/**
* @name setMemoizedConfigurableReadOnly
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-memoized-configurable-read-only-property}
*/
setReadOnly( utils, 'setMemoizedConfigurableReadOnly', require( './../define-memoized-configurable-read-only-property' ) );

/**
* @name defineMemoizedProperty
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-memoized-property}
*/
setReadOnly( utils, 'defineMemoizedProperty', require( './../define-memoized-property' ) );

/**
* @name setMemoizedReadOnly
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-memoized-read-only-property}
*/
setReadOnly( utils, 'setMemoizedReadOnly', require( './../define-memoized-read-only-property' ) );

/**
* @name setNonEnumerableProperty
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-nonenumerable-property}
*/
setReadOnly( utils, 'setNonEnumerableProperty', require( './../define-nonenumerable-property' ) );

/**
* @name setNonEnumerableReadOnlyAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-nonenumerable-read-only-accessor}
*/
setReadOnly( utils, 'setNonEnumerableReadOnlyAccessor', require( './../define-nonenumerable-read-only-accessor' ) );

/**
* @name setNonEnumerableReadOnly
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-nonenumerable-read-only-property}
*/
setReadOnly( utils, 'setNonEnumerableReadOnly', require( './../define-nonenumerable-read-only-property' ) );

/**
* @name setNonEnumerableReadWriteAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-nonenumerable-read-write-accessor}
*/
setReadOnly( utils, 'setNonEnumerableReadWriteAccessor', require( './../define-nonenumerable-read-write-accessor' ) );

/**
* @name setNonEnumerableWriteOnlyAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-nonenumerable-write-only-accessor}
*/
setReadOnly( utils, 'setNonEnumerableWriteOnlyAccessor', require( './../define-nonenumerable-write-only-accessor' ) );

/**
* @name defineProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-properties}
*/
setReadOnly( utils, 'defineProperties', require( './../define-properties' ) );

/**
* @name defineProperty
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-property}
*/
setReadOnly( utils, 'defineProperty', require( './../define-property' ) );

/**
* @name setReadOnlyAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-read-only-accessor}
*/
setReadOnly( utils, 'setReadOnlyAccessor', require( './../define-read-only-accessor' ) );

/**
* @name setReadOnly
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-read-only-property}
*/
setReadOnly( utils, 'setReadOnly', require( './../define-read-only-property' ) );

/**
* @name setReadWriteAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-read-write-accessor}
*/
setReadOnly( utils, 'setReadWriteAccessor', require( './../define-read-write-accessor' ) );

/**
* @name setWriteOnlyAccessor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/define-write-only-accessor}
*/
setReadOnly( utils, 'setWriteOnlyAccessor', require( './../define-write-only-accessor' ) );

/**
* @name dirname
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/dirname}
*/
setReadOnly( utils, 'dirname', require( './../dirname' ) );

/**
* @name doUntil
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/do-until}
*/
setReadOnly( utils, 'doUntil', require( './../do-until' ) );

/**
* @name doUntilEach
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/do-until-each}
*/
setReadOnly( utils, 'doUntilEach', require( './../do-until-each' ) );

/**
* @name doUntilEachRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/do-until-each-right}
*/
setReadOnly( utils, 'doUntilEachRight', require( './../do-until-each-right' ) );

/**
* @name doWhile
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/do-while}
*/
setReadOnly( utils, 'doWhile', require( './../do-while' ) );

/**
* @name doWhileEach
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/do-while-each}
*/
setReadOnly( utils, 'doWhileEach', require( './../do-while-each' ) );

/**
* @name doWhileEachRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/do-while-each-right}
*/
setReadOnly( utils, 'doWhileEachRight', require( './../do-while-each-right' ) );

/**
* @name DoublyLinkedList
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/doubly-linked-list}
*/
setReadOnly( utils, 'DoublyLinkedList', require( './../doubly-linked-list' ) );

/**
* @name objectEntries
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/entries}
*/
setReadOnly( utils, 'objectEntries', require( './../entries' ) );

/**
* @name objectEntriesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/entries-in}
*/
setReadOnly( utils, 'objectEntriesIn', require( './../entries-in' ) );

/**
* @name enumerableProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/enumerable-properties}
*/
setReadOnly( utils, 'enumerableProperties', require( './../enumerable-properties' ) );

/**
* @name enumerablePropertiesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/enumerable-properties-in}
*/
setReadOnly( utils, 'enumerablePropertiesIn', require( './../enumerable-properties-in' ) );

/**
* @name enumerablePropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/enumerable-property-symbols}
*/
setReadOnly( utils, 'enumerablePropertySymbols', require( './../enumerable-property-symbols' ) );

/**
* @name enumerablePropertySymbolsIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/enumerable-property-symbols-in}
*/
setReadOnly( utils, 'enumerablePropertySymbolsIn', require( './../enumerable-property-symbols-in' ) );

/**
* @name rescape
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/escape-regexp-string}
*/
setReadOnly( utils, 'rescape', require( './../escape-regexp-string' ) );

/**
* @name evil
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/eval}
*/
setReadOnly( utils, 'evil', require( './../eval' ) );

/**
* @name every
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/every}
*/
setReadOnly( utils, 'every', require( './../every' ) );

/**
* @name everyBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/every-by}
*/
setReadOnly( utils, 'everyBy', require( './../every-by' ) );

/**
* @name everyByRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/every-by-right}
*/
setReadOnly( utils, 'everyByRight', require( './../every-by-right' ) );

/**
* @name extname
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/extname}
*/
setReadOnly( utils, 'extname', require( './../extname' ) );

/**
* @name FIFO
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/fifo}
*/
setReadOnly( utils, 'FIFO', require( './../fifo' ) );

/**
* @name find
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/find}
*/
setReadOnly( utils, 'find', require( './../find' ) );

/**
* @name flattenArray
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/flatten-array}
*/
setReadOnly( utils, 'flattenArray', require( './../flatten-array' ) );

/**
* @name flattenObject
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/flatten-object}
*/
setReadOnly( utils, 'flattenObject', require( './../flatten-object' ) );

/**
* @name forEach
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/for-each}
*/
setReadOnly( utils, 'forEach', require( './../for-each' ) );

/**
* @name forEachRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/for-each-right}
*/
setReadOnly( utils, 'forEachRight', require( './../for-each-right' ) );

/**
* @name forIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/for-in}
*/
setReadOnly( utils, 'forIn', require( './../for-in' ) );

/**
* @name forOwn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/for-own}
*/
setReadOnly( utils, 'forOwn', require( './../for-own' ) );

/**
* @name objectFromEntries
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/from-entries}
*/
setReadOnly( utils, 'objectFromEntries', require( './../from-entries' ) );

/**
* @name functionName
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/function-name}
*/
setReadOnly( utils, 'functionName', require( './../function-name' ) );

/**
* @name functionSequence
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/function-sequence}
*/
setReadOnly( utils, 'functionSequence', require( './../function-sequence' ) );

/**
* @name getPrototypeOf
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/get-prototype-of}
*/
setReadOnly( utils, 'getPrototypeOf', require( './../get-prototype-of' ) );

/**
* @name getGlobal
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/global}
*/
setReadOnly( utils, 'getGlobal', require( './../global' ) );

/**
* @name group
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/group}
*/
setReadOnly( utils, 'group', require( './../group' ) );

/**
* @name groupBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/group-by}
*/
setReadOnly( utils, 'groupBy', require( './../group-by' ) );

/**
* @name groupIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/group-in}
*/
setReadOnly( utils, 'groupIn', require( './../group-in' ) );

/**
* @name groupOwn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/group-own}
*/
setReadOnly( utils, 'groupOwn', require( './../group-own' ) );

/**
* @name identity
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/identity-function}
*/
setReadOnly( utils, 'identity', require( './../identity-function' ) );

/**
* @name ifelse
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/if-else}
*/
setReadOnly( utils, 'ifelse', require( './../if-else' ) );

/**
* @name ifthen
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/if-then}
*/
setReadOnly( utils, 'ifthen', require( './../if-then' ) );

/**
* @name indexOf
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/index-of}
*/
setReadOnly( utils, 'indexOf', require( './../index-of' ) );

/**
* @name inherit
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherit}
*/
setReadOnly( utils, 'inherit', require( './../inherit' ) );

/**
* @name inheritedEnumerableProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-enumerable-properties}
*/
setReadOnly( utils, 'inheritedEnumerableProperties', require( './../inherited-enumerable-properties' ) );

/**
* @name inheritedEnumerablePropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-enumerable-property-symbols}
*/
setReadOnly( utils, 'inheritedEnumerablePropertySymbols', require( './../inherited-enumerable-property-symbols' ) );

/**
* @name inheritedKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-keys}
*/
setReadOnly( utils, 'inheritedKeys', require( './../inherited-keys' ) );

/**
* @name inheritedNonEnumerableProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-nonenumerable-properties}
*/
setReadOnly( utils, 'inheritedNonEnumerableProperties', require( './../inherited-nonenumerable-properties' ) );

/**
* @name inheritedNonEnumerablePropertyNames
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-nonenumerable-property-names}
*/
setReadOnly( utils, 'inheritedNonEnumerablePropertyNames', require( './../inherited-nonenumerable-property-names' ) );

/**
* @name inheritedNonEnumerablePropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-nonenumerable-property-symbols}
*/
setReadOnly( utils, 'inheritedNonEnumerablePropertySymbols', require( './../inherited-nonenumerable-property-symbols' ) );

/**
* @name inheritedProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-properties}
*/
setReadOnly( utils, 'inheritedProperties', require( './../inherited-properties' ) );

/**
* @name inheritedPropertyDescriptor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-property-descriptor}
*/
setReadOnly( utils, 'inheritedPropertyDescriptor', require( './../inherited-property-descriptor' ) );

/**
* @name inheritedPropertyDescriptors
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-property-descriptors}
*/
setReadOnly( utils, 'inheritedPropertyDescriptors', require( './../inherited-property-descriptors' ) );

/**
* @name inheritedPropertyNames
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-property-names}
*/
setReadOnly( utils, 'inheritedPropertyNames', require( './../inherited-property-names' ) );

/**
* @name inheritedPropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-property-symbols}
*/
setReadOnly( utils, 'inheritedPropertySymbols', require( './../inherited-property-symbols' ) );

/**
* @name inheritedWritableProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-writable-properties}
*/
setReadOnly( utils, 'inheritedWritableProperties', require( './../inherited-writable-properties' ) );

/**
* @name inheritedWritablePropertyNames
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-writable-property-names}
*/
setReadOnly( utils, 'inheritedWritablePropertyNames', require( './../inherited-writable-property-names' ) );

/**
* @name inheritedWritablePropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inherited-writable-property-symbols}
*/
setReadOnly( utils, 'inheritedWritablePropertySymbols', require( './../inherited-writable-property-symbols' ) );

/**
* @name inmap
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inmap}
*/
setReadOnly( utils, 'inmap', require( './../inmap' ) );

/**
* @name inmapRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/inmap-right}
*/
setReadOnly( utils, 'inmapRight', require( './../inmap-right' ) );

/**
* @name keyBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/key-by}
*/
setReadOnly( utils, 'keyBy', require( './../key-by' ) );

/**
* @name keyByRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/key-by-right}
*/
setReadOnly( utils, 'keyByRight', require( './../key-by-right' ) );

/**
* @name objectKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/keys}
*/
setReadOnly( utils, 'objectKeys', require( './../keys' ) );

/**
* @name keysIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/keys-in}
*/
setReadOnly( utils, 'keysIn', require( './../keys-in' ) );

/**
* @name LinkedList
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/linked-list}
*/
setReadOnly( utils, 'LinkedList', require( './../linked-list' ) );

/**
* @name lowercaseKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/lowercase-keys}
*/
setReadOnly( utils, 'lowercaseKeys', require( './../lowercase-keys' ) );

/**
* @name mapFun
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/map-function}
*/
setReadOnly( utils, 'mapFun', require( './../map-function' ) );

/**
* @name mapKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/map-keys}
*/
setReadOnly( utils, 'mapKeys', require( './../map-keys' ) );

/**
* @name mapValues
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/map-values}
*/
setReadOnly( utils, 'mapValues', require( './../map-values' ) );

/**
* @name memoize
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/memoize}
*/
setReadOnly( utils, 'memoize', require( './../memoize' ) );

/**
* @name merge
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/merge}
*/
setReadOnly( utils, 'merge', require( './../merge' ) );

/**
* @name moveProperty
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/move-property}
*/
setReadOnly( utils, 'moveProperty', require( './../move-property' ) );

/**
* @name namedtypedtuple
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/named-typed-tuple}
*/
setReadOnly( utils, 'namedtypedtuple', require( './../named-typed-tuple' ) );

/**
* @name nativeClass
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/native-class}
*/
setReadOnly( utils, 'nativeClass', require( './../native-class' ) );

/**
* @name nextTick
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/next-tick}
*/
setReadOnly( utils, 'nextTick', require( './../next-tick' ) );

/**
* @name none
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/none}
*/
setReadOnly( utils, 'none', require( './../none' ) );

/**
* @name noneBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/none-by}
*/
setReadOnly( utils, 'noneBy', require( './../none-by' ) );

/**
* @name noneByRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/none-by-right}
*/
setReadOnly( utils, 'noneByRight', require( './../none-by-right' ) );

/**
* @name nonEnumerableProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonenumerable-properties}
*/
setReadOnly( utils, 'nonEnumerableProperties', require( './../nonenumerable-properties' ) );

/**
* @name nonEnumerablePropertiesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonenumerable-properties-in}
*/
setReadOnly( utils, 'nonEnumerablePropertiesIn', require( './../nonenumerable-properties-in' ) );

/**
* @name nonEnumerablePropertyNames
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonenumerable-property-names}
*/
setReadOnly( utils, 'nonEnumerablePropertyNames', require( './../nonenumerable-property-names' ) );

/**
* @name nonEnumerablePropertyNamesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonenumerable-property-names-in}
*/
setReadOnly( utils, 'nonEnumerablePropertyNamesIn', require( './../nonenumerable-property-names-in' ) );

/**
* @name nonEnumerablePropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonenumerable-property-symbols}
*/
setReadOnly( utils, 'nonEnumerablePropertySymbols', require( './../nonenumerable-property-symbols' ) );

/**
* @name nonEnumerablePropertySymbolsIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonenumerable-property-symbols-in}
*/
setReadOnly( utils, 'nonEnumerablePropertySymbolsIn', require( './../nonenumerable-property-symbols-in' ) );

/**
* @name nonIndexKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/nonindex-keys}
*/
setReadOnly( utils, 'nonIndexKeys', require( './../nonindex-keys' ) );

/**
* @name noop
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/noop}
*/
setReadOnly( utils, 'noop', require( './../noop' ) );

/**
* @name objectInverse
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/object-inverse}
*/
setReadOnly( utils, 'objectInverse', require( './../object-inverse' ) );

/**
* @name objectInverseBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/object-inverse-by}
*/
setReadOnly( utils, 'objectInverseBy', require( './../object-inverse-by' ) );

/**
* @name omit
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/omit}
*/
setReadOnly( utils, 'omit', require( './../omit' ) );

/**
* @name omitBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/omit-by}
*/
setReadOnly( utils, 'omitBy', require( './../omit-by' ) );

/**
* @name openURL
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/open-url}
*/
setReadOnly( utils, 'openURL', require( './../open-url' ) );

/**
* @name papply
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/papply}
*/
setReadOnly( utils, 'papply', require( './../papply' ) );

/**
* @name papplyRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/papply-right}
*/
setReadOnly( utils, 'papplyRight', require( './../papply-right' ) );

/**
* @name parallel
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/parallel}
*/
setReadOnly( utils, 'parallel', require( './../parallel' ) );

/**
* @name parseJSON
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/parse-json}
*/
setReadOnly( utils, 'parseJSON', require( './../parse-json' ) );

/**
* @name pick
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/pick}
*/
setReadOnly( utils, 'pick', require( './../pick' ) );

/**
* @name pickBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/pick-by}
*/
setReadOnly( utils, 'pickBy', require( './../pick-by' ) );

/**
* @name pluck
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/pluck}
*/
setReadOnly( utils, 'pluck', require( './../pluck' ) );

/**
* @name pop
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/pop}
*/
setReadOnly( utils, 'pop', require( './../pop' ) );

/**
* @name prepend
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/prepend}
*/
setReadOnly( utils, 'prepend', require( './../prepend' ) );

/**
* @name properties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/properties}
*/
setReadOnly( utils, 'properties', require( './../properties' ) );

/**
* @name propertiesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/properties-in}
*/
setReadOnly( utils, 'propertiesIn', require( './../properties-in' ) );

/**
* @name propertyDescriptor
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-descriptor}
*/
setReadOnly( utils, 'propertyDescriptor', require( './../property-descriptor' ) );

/**
* @name propertyDescriptorIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-descriptor-in}
*/
setReadOnly( utils, 'propertyDescriptorIn', require( './../property-descriptor-in' ) );

/**
* @name propertyDescriptors
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-descriptors}
*/
setReadOnly( utils, 'propertyDescriptors', require( './../property-descriptors' ) );

/**
* @name propertyDescriptorsIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-descriptors-in}
*/
setReadOnly( utils, 'propertyDescriptorsIn', require( './../property-descriptors-in' ) );

/**
* @name propertyNames
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-names}
*/
setReadOnly( utils, 'propertyNames', require( './../property-names' ) );

/**
* @name propertyNamesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-names-in}
*/
setReadOnly( utils, 'propertyNamesIn', require( './../property-names-in' ) );

/**
* @name propertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-symbols}
*/
setReadOnly( utils, 'propertySymbols', require( './../property-symbols' ) );

/**
* @name propertySymbolsIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/property-symbols-in}
*/
setReadOnly( utils, 'propertySymbolsIn', require( './../property-symbols-in' ) );

/**
* @name push
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/push}
*/
setReadOnly( utils, 'push', require( './../push' ) );

/**
* @name realmax
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/real-max}
*/
setReadOnly( utils, 'realmax', require( './../real-max' ) );

/**
* @name realmin
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/real-min}
*/
setReadOnly( utils, 'realmin', require( './../real-min' ) );

/**
* @name reduce
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/reduce}
*/
setReadOnly( utils, 'reduce', require( './../reduce' ) );

/**
* @name reduceRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/reduce-right}
*/
setReadOnly( utils, 'reduceRight', require( './../reduce-right' ) );

/**
* @name reFromString
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/regexp-from-string}
*/
setReadOnly( utils, 'reFromString', require( './../regexp-from-string' ) );

/**
* @name reorderArguments
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/reorder-arguments}
*/
setReadOnly( utils, 'reorderArguments', require( './../reorder-arguments' ) );

/**
* @name reverseArguments
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/reverse-arguments}
*/
setReadOnly( utils, 'reverseArguments', require( './../reverse-arguments' ) );

/**
* @name safeintmax
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/safe-int-max}
*/
setReadOnly( utils, 'safeintmax', require( './../safe-int-max' ) );

/**
* @name safeintmin
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/safe-int-min}
*/
setReadOnly( utils, 'safeintmin', require( './../safe-int-min' ) );

/**
* @name shift
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/shift}
*/
setReadOnly( utils, 'shift', require( './../shift' ) );

/**
* @name sizeOf
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/size-of}
*/
setReadOnly( utils, 'sizeOf', require( './../size-of' ) );

/**
* @name some
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/some}
*/
setReadOnly( utils, 'some', require( './../some' ) );

/**
* @name someBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/some-by}
*/
setReadOnly( utils, 'someBy', require( './../some-by' ) );

/**
* @name someByRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/some-by-right}
*/
setReadOnly( utils, 'someByRight', require( './../some-by-right' ) );

/**
* @name Stack
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/stack}
*/
setReadOnly( utils, 'Stack', require( './../stack' ) );

/**
* @name tabulate
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/tabulate}
*/
setReadOnly( utils, 'tabulate', require( './../tabulate' ) );

/**
* @name tabulateBy
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/tabulate-by}
*/
setReadOnly( utils, 'tabulateBy', require( './../tabulate-by' ) );

/**
* @name timeit
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/timeit}
*/
setReadOnly( utils, 'timeit', require( './../timeit' ) );

/**
* @name trycatch
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/try-catch}
*/
setReadOnly( utils, 'trycatch', require( './../try-catch' ) );

/**
* @name tryFunction
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/try-function}
*/
setReadOnly( utils, 'tryFunction', require( './../try-function' ) );

/**
* @name tryRequire
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/try-require}
*/
setReadOnly( utils, 'tryRequire', require( './../try-require' ) );

/**
* @name trythen
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/try-then}
*/
setReadOnly( utils, 'trythen', require( './../try-then' ) );

/**
* @name typemax
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/type-max}
*/
setReadOnly( utils, 'typemax', require( './../type-max' ) );

/**
* @name typemin
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/type-min}
*/
setReadOnly( utils, 'typemin', require( './../type-min' ) );

/**
* @name typeOf
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/type-of}
*/
setReadOnly( utils, 'typeOf', require( './../type-of' ) );

/**
* @name uncapitalizeKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/uncapitalize-keys}
*/
setReadOnly( utils, 'uncapitalizeKeys', require( './../uncapitalize-keys' ) );

/**
* @name uncurry
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/uncurry}
*/
setReadOnly( utils, 'uncurry', require( './../uncurry' ) );

/**
* @name uncurryRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/uncurry-right}
*/
setReadOnly( utils, 'uncurryRight', require( './../uncurry-right' ) );

/**
* @name unshift
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/unshift}
*/
setReadOnly( utils, 'unshift', require( './../unshift' ) );

/**
* @name until
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/until}
*/
setReadOnly( utils, 'until', require( './../until' ) );

/**
* @name untilEach
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/until-each}
*/
setReadOnly( utils, 'untilEach', require( './../until-each' ) );

/**
* @name untilEachRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/until-each-right}
*/
setReadOnly( utils, 'untilEachRight', require( './../until-each-right' ) );

/**
* @name unzip
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/unzip}
*/
setReadOnly( utils, 'unzip', require( './../unzip' ) );

/**
* @name uppercaseKeys
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/uppercase-keys}
*/
setReadOnly( utils, 'uppercaseKeys', require( './../uppercase-keys' ) );

/**
* @name objectValues
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/values}
*/
setReadOnly( utils, 'objectValues', require( './../values' ) );

/**
* @name objectValuesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/values-in}
*/
setReadOnly( utils, 'objectValuesIn', require( './../values-in' ) );

/**
* @name whilst
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/while}
*/
setReadOnly( utils, 'whilst', require( './../while' ) );

/**
* @name whileEach
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/while-each}
*/
setReadOnly( utils, 'whileEach', require( './../while-each' ) );

/**
* @name whileEachRight
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/while-each-right}
*/
setReadOnly( utils, 'whileEachRight', require( './../while-each-right' ) );

/**
* @name writableProperties
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/writable-properties}
*/
setReadOnly( utils, 'writableProperties', require( './../writable-properties' ) );

/**
* @name writablePropertiesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/writable-properties-in}
*/
setReadOnly( utils, 'writablePropertiesIn', require( './../writable-properties-in' ) );

/**
* @name writablePropertyNames
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/writable-property-names}
*/
setReadOnly( utils, 'writablePropertyNames', require( './../writable-property-names' ) );

/**
* @name writablePropertyNamesIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/writable-property-names-in}
*/
setReadOnly( utils, 'writablePropertyNamesIn', require( './../writable-property-names-in' ) );

/**
* @name writablePropertySymbols
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/writable-property-symbols}
*/
setReadOnly( utils, 'writablePropertySymbols', require( './../writable-property-symbols' ) );

/**
* @name writablePropertySymbolsIn
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/writable-property-symbols-in}
*/
setReadOnly( utils, 'writablePropertySymbolsIn', require( './../writable-property-symbols-in' ) );

/**
* @name zip
* @memberof utils
* @readonly
* @type {Function}
* @see {@link module:@stdlib/utils/zip}
*/
setReadOnly( utils, 'zip', require( './../zip' ) );


// EXPORTS //

module.exports = utils;
