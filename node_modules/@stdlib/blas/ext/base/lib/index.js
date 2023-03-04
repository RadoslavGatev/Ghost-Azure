/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
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
* @name dapx
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dapx}
*/
setReadOnly( ns, 'dapx', require( './../../../ext/base/dapx' ) );

/**
* @name dapxsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dapxsum}
*/
setReadOnly( ns, 'dapxsum', require( './../../../ext/base/dapxsum' ) );

/**
* @name dapxsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dapxsumkbn}
*/
setReadOnly( ns, 'dapxsumkbn', require( './../../../ext/base/dapxsumkbn' ) );

/**
* @name dapxsumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dapxsumkbn2}
*/
setReadOnly( ns, 'dapxsumkbn2', require( './../../../ext/base/dapxsumkbn2' ) );

/**
* @name dapxsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dapxsumors}
*/
setReadOnly( ns, 'dapxsumors', require( './../../../ext/base/dapxsumors' ) );

/**
* @name dapxsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dapxsumpw}
*/
setReadOnly( ns, 'dapxsumpw', require( './../../../ext/base/dapxsumpw' ) );

/**
* @name dasumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dasumpw}
*/
setReadOnly( ns, 'dasumpw', require( './../../../ext/base/dasumpw' ) );

/**
* @name dcusum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dcusum}
*/
setReadOnly( ns, 'dcusum', require( './../../../ext/base/dcusum' ) );

/**
* @name dcusumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dcusumkbn}
*/
setReadOnly( ns, 'dcusumkbn', require( './../../../ext/base/dcusumkbn' ) );

/**
* @name dcusumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dcusumkbn2}
*/
setReadOnly( ns, 'dcusumkbn2', require( './../../../ext/base/dcusumkbn2' ) );

/**
* @name dcusumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dcusumors}
*/
setReadOnly( ns, 'dcusumors', require( './../../../ext/base/dcusumors' ) );

/**
* @name dcusumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dcusumpw}
*/
setReadOnly( ns, 'dcusumpw', require( './../../../ext/base/dcusumpw' ) );

/**
* @name dfill
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dfill}
*/
setReadOnly( ns, 'dfill', require( './../../../ext/base/dfill' ) );

/**
* @name dnanasum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnanasum}
*/
setReadOnly( ns, 'dnanasum', require( './../../../ext/base/dnanasum' ) );

/**
* @name dnanasumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnanasumors}
*/
setReadOnly( ns, 'dnanasumors', require( './../../../ext/base/dnanasumors' ) );

/**
* @name dnannsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnannsum}
*/
setReadOnly( ns, 'dnannsum', require( './../../../ext/base/dnannsum' ) );

/**
* @name dnannsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnannsumkbn}
*/
setReadOnly( ns, 'dnannsumkbn', require( './../../../ext/base/dnannsumkbn' ) );

/**
* @name dnannsumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnannsumkbn2}
*/
setReadOnly( ns, 'dnannsumkbn2', require( './../../../ext/base/dnannsumkbn2' ) );

/**
* @name dnannsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnannsumors}
*/
setReadOnly( ns, 'dnannsumors', require( './../../../ext/base/dnannsumors' ) );

/**
* @name dnannsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnannsumpw}
*/
setReadOnly( ns, 'dnannsumpw', require( './../../../ext/base/dnannsumpw' ) );

/**
* @name dnansum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnansum}
*/
setReadOnly( ns, 'dnansum', require( './../../../ext/base/dnansum' ) );

/**
* @name dnansumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnansumkbn}
*/
setReadOnly( ns, 'dnansumkbn', require( './../../../ext/base/dnansumkbn' ) );

/**
* @name dnansumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnansumkbn2}
*/
setReadOnly( ns, 'dnansumkbn2', require( './../../../ext/base/dnansumkbn2' ) );

/**
* @name dnansumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnansumors}
*/
setReadOnly( ns, 'dnansumors', require( './../../../ext/base/dnansumors' ) );

/**
* @name dnansumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dnansumpw}
*/
setReadOnly( ns, 'dnansumpw', require( './../../../ext/base/dnansumpw' ) );

/**
* @name drev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/drev}
*/
setReadOnly( ns, 'drev', require( './../../../ext/base/drev' ) );

/**
* @name dsapxsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsapxsum}
*/
setReadOnly( ns, 'dsapxsum', require( './../../../ext/base/dsapxsum' ) );

/**
* @name dsapxsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsapxsumpw}
*/
setReadOnly( ns, 'dsapxsumpw', require( './../../../ext/base/dsapxsumpw' ) );

/**
* @name dsnannsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsnannsumors}
*/
setReadOnly( ns, 'dsnannsumors', require( './../../../ext/base/dsnannsumors' ) );

/**
* @name dsnansum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsnansum}
*/
setReadOnly( ns, 'dsnansum', require( './../../../ext/base/dsnansum' ) );

/**
* @name dsnansumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsnansumors}
*/
setReadOnly( ns, 'dsnansumors', require( './../../../ext/base/dsnansumors' ) );

/**
* @name dsnansumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsnansumpw}
*/
setReadOnly( ns, 'dsnansumpw', require( './../../../ext/base/dsnansumpw' ) );

/**
* @name dsort2hp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsort2hp}
*/
setReadOnly( ns, 'dsort2hp', require( './../../../ext/base/dsort2hp' ) );

/**
* @name dsort2ins
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsort2ins}
*/
setReadOnly( ns, 'dsort2ins', require( './../../../ext/base/dsort2ins' ) );

/**
* @name dsort2sh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsort2sh}
*/
setReadOnly( ns, 'dsort2sh', require( './../../../ext/base/dsort2sh' ) );

/**
* @name dsorthp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsorthp}
*/
setReadOnly( ns, 'dsorthp', require( './../../../ext/base/dsorthp' ) );

/**
* @name dsortins
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsortins}
*/
setReadOnly( ns, 'dsortins', require( './../../../ext/base/dsortins' ) );

/**
* @name dsortsh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsortsh}
*/
setReadOnly( ns, 'dsortsh', require( './../../../ext/base/dsortsh' ) );

/**
* @name dssum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dssum}
*/
setReadOnly( ns, 'dssum', require( './../../../ext/base/dssum' ) );

/**
* @name dssumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dssumors}
*/
setReadOnly( ns, 'dssumors', require( './../../../ext/base/dssumors' ) );

/**
* @name dssumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dssumpw}
*/
setReadOnly( ns, 'dssumpw', require( './../../../ext/base/dssumpw' ) );

/**
* @name dsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsum}
*/
setReadOnly( ns, 'dsum', require( './../../../ext/base/dsum' ) );

/**
* @name dsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsumkbn}
*/
setReadOnly( ns, 'dsumkbn', require( './../../../ext/base/dsumkbn' ) );

/**
* @name dsumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsumkbn2}
*/
setReadOnly( ns, 'dsumkbn2', require( './../../../ext/base/dsumkbn2' ) );

/**
* @name dsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsumors}
*/
setReadOnly( ns, 'dsumors', require( './../../../ext/base/dsumors' ) );

/**
* @name dsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/dsumpw}
*/
setReadOnly( ns, 'dsumpw', require( './../../../ext/base/dsumpw' ) );

/**
* @name gapx
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gapx}
*/
setReadOnly( ns, 'gapx', require( './../../../ext/base/gapx' ) );

/**
* @name gapxsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gapxsum}
*/
setReadOnly( ns, 'gapxsum', require( './../../../ext/base/gapxsum' ) );

/**
* @name gapxsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gapxsumkbn}
*/
setReadOnly( ns, 'gapxsumkbn', require( './../../../ext/base/gapxsumkbn' ) );

/**
* @name gapxsumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gapxsumkbn2}
*/
setReadOnly( ns, 'gapxsumkbn2', require( './../../../ext/base/gapxsumkbn2' ) );

/**
* @name gapxsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gapxsumors}
*/
setReadOnly( ns, 'gapxsumors', require( './../../../ext/base/gapxsumors' ) );

/**
* @name gapxsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gapxsumpw}
*/
setReadOnly( ns, 'gapxsumpw', require( './../../../ext/base/gapxsumpw' ) );

/**
* @name gasumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gasumpw}
*/
setReadOnly( ns, 'gasumpw', require( './../../../ext/base/gasumpw' ) );

/**
* @name gcusum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gcusum}
*/
setReadOnly( ns, 'gcusum', require( './../../../ext/base/gcusum' ) );

/**
* @name gcusumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gcusumkbn}
*/
setReadOnly( ns, 'gcusumkbn', require( './../../../ext/base/gcusumkbn' ) );

/**
* @name gcusumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gcusumkbn2}
*/
setReadOnly( ns, 'gcusumkbn2', require( './../../../ext/base/gcusumkbn2' ) );

/**
* @name gcusumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gcusumors}
*/
setReadOnly( ns, 'gcusumors', require( './../../../ext/base/gcusumors' ) );

/**
* @name gcusumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gcusumpw}
*/
setReadOnly( ns, 'gcusumpw', require( './../../../ext/base/gcusumpw' ) );

/**
* @name gfill
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gfill}
*/
setReadOnly( ns, 'gfill', require( './../../../ext/base/gfill' ) );

/**
* @name gfillBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gfill-by}
*/
setReadOnly( ns, 'gfillBy', require( './../../../ext/base/gfill-by' ) );

/**
* @name gnannsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gnannsumkbn}
*/
setReadOnly( ns, 'gnannsumkbn', require( './../../../ext/base/gnannsumkbn' ) );

/**
* @name gnansum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gnansum}
*/
setReadOnly( ns, 'gnansum', require( './../../../ext/base/gnansum' ) );

/**
* @name gnansumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gnansumkbn}
*/
setReadOnly( ns, 'gnansumkbn', require( './../../../ext/base/gnansumkbn' ) );

/**
* @name gnansumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gnansumkbn2}
*/
setReadOnly( ns, 'gnansumkbn2', require( './../../../ext/base/gnansumkbn2' ) );

/**
* @name gnansumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gnansumors}
*/
setReadOnly( ns, 'gnansumors', require( './../../../ext/base/gnansumors' ) );

/**
* @name gnansumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gnansumpw}
*/
setReadOnly( ns, 'gnansumpw', require( './../../../ext/base/gnansumpw' ) );

/**
* @name grev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/grev}
*/
setReadOnly( ns, 'grev', require( './../../../ext/base/grev' ) );

/**
* @name gsort2hp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsort2hp}
*/
setReadOnly( ns, 'gsort2hp', require( './../../../ext/base/gsort2hp' ) );

/**
* @name gsort2ins
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsort2ins}
*/
setReadOnly( ns, 'gsort2ins', require( './../../../ext/base/gsort2ins' ) );

/**
* @name gsort2sh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsort2sh}
*/
setReadOnly( ns, 'gsort2sh', require( './../../../ext/base/gsort2sh' ) );

/**
* @name gsorthp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsorthp}
*/
setReadOnly( ns, 'gsorthp', require( './../../../ext/base/gsorthp' ) );

/**
* @name gsortins
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsortins}
*/
setReadOnly( ns, 'gsortins', require( './../../../ext/base/gsortins' ) );

/**
* @name gsortsh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsortsh}
*/
setReadOnly( ns, 'gsortsh', require( './../../../ext/base/gsortsh' ) );

/**
* @name gsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsum}
*/
setReadOnly( ns, 'gsum', require( './../../../ext/base/gsum' ) );

/**
* @name gsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsumkbn}
*/
setReadOnly( ns, 'gsumkbn', require( './../../../ext/base/gsumkbn' ) );

/**
* @name gsumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsumkbn2}
*/
setReadOnly( ns, 'gsumkbn2', require( './../../../ext/base/gsumkbn2' ) );

/**
* @name gsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsumors}
*/
setReadOnly( ns, 'gsumors', require( './../../../ext/base/gsumors' ) );

/**
* @name gsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/gsumpw}
*/
setReadOnly( ns, 'gsumpw', require( './../../../ext/base/gsumpw' ) );

/**
* @name sapx
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sapx}
*/
setReadOnly( ns, 'sapx', require( './../../../ext/base/sapx' ) );

/**
* @name sapxsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sapxsum}
*/
setReadOnly( ns, 'sapxsum', require( './../../../ext/base/sapxsum' ) );

/**
* @name sapxsumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sapxsumkbn}
*/
setReadOnly( ns, 'sapxsumkbn', require( './../../../ext/base/sapxsumkbn' ) );

/**
* @name sapxsumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sapxsumkbn2}
*/
setReadOnly( ns, 'sapxsumkbn2', require( './../../../ext/base/sapxsumkbn2' ) );

/**
* @name sapxsumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sapxsumors}
*/
setReadOnly( ns, 'sapxsumors', require( './../../../ext/base/sapxsumors' ) );

/**
* @name sapxsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sapxsumpw}
*/
setReadOnly( ns, 'sapxsumpw', require( './../../../ext/base/sapxsumpw' ) );

/**
* @name sasumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sasumpw}
*/
setReadOnly( ns, 'sasumpw', require( './../../../ext/base/sasumpw' ) );

/**
* @name scusum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/scusum}
*/
setReadOnly( ns, 'scusum', require( './../../../ext/base/scusum' ) );

/**
* @name scusumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/scusumkbn}
*/
setReadOnly( ns, 'scusumkbn', require( './../../../ext/base/scusumkbn' ) );

/**
* @name scusumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/scusumkbn2}
*/
setReadOnly( ns, 'scusumkbn2', require( './../../../ext/base/scusumkbn2' ) );

/**
* @name scusumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/scusumors}
*/
setReadOnly( ns, 'scusumors', require( './../../../ext/base/scusumors' ) );

/**
* @name scusumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/scusumpw}
*/
setReadOnly( ns, 'scusumpw', require( './../../../ext/base/scusumpw' ) );

/**
* @name sdsapxsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sdsapxsum}
*/
setReadOnly( ns, 'sdsapxsum', require( './../../../ext/base/sdsapxsum' ) );

/**
* @name sdsapxsumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sdsapxsumpw}
*/
setReadOnly( ns, 'sdsapxsumpw', require( './../../../ext/base/sdsapxsumpw' ) );

/**
* @name sdsnansum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sdsnansum}
*/
setReadOnly( ns, 'sdsnansum', require( './../../../ext/base/sdsnansum' ) );

/**
* @name sdsnansumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sdsnansumpw}
*/
setReadOnly( ns, 'sdsnansumpw', require( './../../../ext/base/sdsnansumpw' ) );

/**
* @name sdssum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sdssum}
*/
setReadOnly( ns, 'sdssum', require( './../../../ext/base/sdssum' ) );

/**
* @name sdssumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sdssumpw}
*/
setReadOnly( ns, 'sdssumpw', require( './../../../ext/base/sdssumpw' ) );

/**
* @name sfill
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/sfill}
*/
setReadOnly( ns, 'sfill', require( './../../../ext/base/sfill' ) );

/**
* @name snansum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/snansum}
*/
setReadOnly( ns, 'snansum', require( './../../../ext/base/snansum' ) );

/**
* @name snansumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/snansumkbn}
*/
setReadOnly( ns, 'snansumkbn', require( './../../../ext/base/snansumkbn' ) );

/**
* @name snansumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/snansumkbn2}
*/
setReadOnly( ns, 'snansumkbn2', require( './../../../ext/base/snansumkbn2' ) );

/**
* @name snansumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/snansumors}
*/
setReadOnly( ns, 'snansumors', require( './../../../ext/base/snansumors' ) );

/**
* @name snansumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/snansumpw}
*/
setReadOnly( ns, 'snansumpw', require( './../../../ext/base/snansumpw' ) );

/**
* @name srev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/srev}
*/
setReadOnly( ns, 'srev', require( './../../../ext/base/srev' ) );

/**
* @name ssort2hp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssort2hp}
*/
setReadOnly( ns, 'ssort2hp', require( './../../../ext/base/ssort2hp' ) );

/**
* @name ssort2ins
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssort2ins}
*/
setReadOnly( ns, 'ssort2ins', require( './../../../ext/base/ssort2ins' ) );

/**
* @name ssort2sh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssort2sh}
*/
setReadOnly( ns, 'ssort2sh', require( './../../../ext/base/ssort2sh' ) );

/**
* @name ssorthp
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssorthp}
*/
setReadOnly( ns, 'ssorthp', require( './../../../ext/base/ssorthp' ) );

/**
* @name ssortins
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssortins}
*/
setReadOnly( ns, 'ssortins', require( './../../../ext/base/ssortins' ) );

/**
* @name ssortsh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssortsh}
*/
setReadOnly( ns, 'ssortsh', require( './../../../ext/base/ssortsh' ) );

/**
* @name ssum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssum}
*/
setReadOnly( ns, 'ssum', require( './../../../ext/base/ssum' ) );

/**
* @name ssumkbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssumkbn}
*/
setReadOnly( ns, 'ssumkbn', require( './../../../ext/base/ssumkbn' ) );

/**
* @name ssumkbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssumkbn2}
*/
setReadOnly( ns, 'ssumkbn2', require( './../../../ext/base/ssumkbn2' ) );

/**
* @name ssumors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssumors}
*/
setReadOnly( ns, 'ssumors', require( './../../../ext/base/ssumors' ) );

/**
* @name ssumpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/blas/ext/base/ssumpw}
*/
setReadOnly( ns, 'ssumpw', require( './../../../ext/base/ssumpw' ) );


// EXPORTS //

module.exports = ns;
