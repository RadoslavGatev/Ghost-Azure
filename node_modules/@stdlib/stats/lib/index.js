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
* @name anova1
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/anova1}
*/
setReadOnly( ns, 'anova1', require( './../anova1' ) );

/**
* @name bartlettTest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/bartlett-test}
*/
setReadOnly( ns, 'bartlettTest', require( './../bartlett-test' ) );

/**
* @name binomialTest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/binomial-test}
*/
setReadOnly( ns, 'binomialTest', require( './../binomial-test' ) );

/**
* @name chi2gof
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/chi2gof}
*/
setReadOnly( ns, 'chi2gof', require( './../chi2gof' ) );

/**
* @name chi2test
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/chi2test}
*/
setReadOnly( ns, 'chi2test', require( './../chi2test' ) );

/**
* @name flignerTest
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/stats/fligner-test}
*/
setReadOnly( ns, 'flignerTest', require( './../fligner-test' ) );

/**
* @name incr
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/stats/incr}
*/
setReadOnly( ns, 'incr', require( './../incr' ) );

/**
* @name iterators
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/stats/iter}
*/
setReadOnly( ns, 'iterators', require( './../iter' ) );

/**
* @name kde2d
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/kde2d}
*/
setReadOnly( ns, 'kde2d', require( './../kde2d' ) );

/**
* @name kruskalTest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/kruskal-test}
*/
setReadOnly( ns, 'kruskalTest', require( './../kruskal-test' ) );

/**
* @name kstest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/kstest}
*/
setReadOnly( ns, 'kstest', require( './../kstest' ) );

/**
* @name leveneTest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/levene-test}
*/
setReadOnly( ns, 'leveneTest', require( './../levene-test' ) );

/**
* @name lowess
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/lowess}
*/
setReadOnly( ns, 'lowess', require( './../lowess' ) );

/**
* @name padjust
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/padjust}
*/
setReadOnly( ns, 'padjust', require( './../padjust' ) );

/**
* @name pcorrtest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/pcorrtest}
*/
setReadOnly( ns, 'pcorrtest', require( './../pcorrtest' ) );

/**
* @name ranks
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/ranks}
*/
setReadOnly( ns, 'ranks', require( './../ranks' ) );

/**
* @name ttest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/ttest}
*/
setReadOnly( ns, 'ttest', require( './../ttest' ) );

/**
* @name ttest2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/ttest2}
*/
setReadOnly( ns, 'ttest2', require( './../ttest2' ) );

/**
* @name vartest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/vartest}
*/
setReadOnly( ns, 'vartest', require( './../vartest' ) );

/**
* @name wilcoxon
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/wilcoxon}
*/
setReadOnly( ns, 'wilcoxon', require( './../wilcoxon' ) );

/**
* @name ztest
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/ztest}
*/
setReadOnly( ns, 'ztest', require( './../ztest' ) );

/**
* @name ztest2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/ztest2}
*/
setReadOnly( ns, 'ztest2', require( './../ztest2' ) );


// EXPORTS //

module.exports = ns;
