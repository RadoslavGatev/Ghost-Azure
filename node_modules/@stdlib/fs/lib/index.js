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
* @namespace fs
*/
var fs = {};

/**
* @name close
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/close}
*/
setReadOnly( fs, 'close', require( './../close' ) );

/**
* @name exists
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/exists}
*/
setReadOnly( fs, 'exists', require( './../exists' ) );

/**
* @name open
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/open}
*/
setReadOnly( fs, 'open', require( './../open' ) );

/**
* @name readDir
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/read-dir}
*/
setReadOnly( fs, 'readDir', require( './../read-dir' ) );

/**
* @name readFile
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/read-file}
*/
setReadOnly( fs, 'readFile', require( './../read-file' ) );

/**
* @name readFileList
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/read-file-list}
*/
setReadOnly( fs, 'readFileList', require( './../read-file-list' ) );

/**
* @name readJSON
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/read-json}
*/
setReadOnly( fs, 'readJSON', require( './../read-json' ) );

/**
* @name readWASM
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/read-wasm}
*/
setReadOnly( fs, 'readWASM', require( './../read-wasm' ) );

/**
* @name rename
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/rename}
*/
setReadOnly( fs, 'rename', require( './../rename' ) );

/**
* @name resolveParentPath
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/resolve-parent-path}
*/
setReadOnly( fs, 'resolveParentPath', require( './../resolve-parent-path' ) );

/**
* @name resolveParentPathBy
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/resolve-parent-path-by}
*/
setReadOnly( fs, 'resolveParentPathBy', require( './../resolve-parent-path-by' ) );

/**
* @name unlink
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/unlink}
*/
setReadOnly( fs, 'unlink', require( './../unlink' ) );

/**
* @name writeFile
* @memberof fs
* @readonly
* @type {Function}
* @see {@link module:@stdlib/fs/write-file}
*/
setReadOnly( fs, 'writeFile', require( './../write-file' ) );


// EXPORTS //

module.exports = fs;
