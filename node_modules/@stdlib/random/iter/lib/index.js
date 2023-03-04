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
* @name arcsine
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/arcsine}
*/
setReadOnly( ns, 'arcsine', require( './../../iter/arcsine' ) );

/**
* @name bernoulli
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/bernoulli}
*/
setReadOnly( ns, 'bernoulli', require( './../../iter/bernoulli' ) );

/**
* @name beta
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/beta}
*/
setReadOnly( ns, 'beta', require( './../../iter/beta' ) );

/**
* @name betaprime
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/betaprime}
*/
setReadOnly( ns, 'betaprime', require( './../../iter/betaprime' ) );

/**
* @name binomial
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/binomial}
*/
setReadOnly( ns, 'binomial', require( './../../iter/binomial' ) );

/**
* @name boxMuller
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/box-muller}
*/
setReadOnly( ns, 'boxMuller', require( './../../iter/box-muller' ) );

/**
* @name cauchy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/cauchy}
*/
setReadOnly( ns, 'cauchy', require( './../../iter/cauchy' ) );

/**
* @name chi
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/chi}
*/
setReadOnly( ns, 'chi', require( './../../iter/chi' ) );

/**
* @name chisquare
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/chisquare}
*/
setReadOnly( ns, 'chisquare', require( './../../iter/chisquare' ) );

/**
* @name cosine
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/cosine}
*/
setReadOnly( ns, 'cosine', require( './../../iter/cosine' ) );

/**
* @name discreteUniform
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/discrete-uniform}
*/
setReadOnly( ns, 'discreteUniform', require( './../../iter/discrete-uniform' ) );

/**
* @name erlang
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/erlang}
*/
setReadOnly( ns, 'erlang', require( './../../iter/erlang' ) );

/**
* @name exponential
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/exponential}
*/
setReadOnly( ns, 'exponential', require( './../../iter/exponential' ) );

/**
* @name f
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/f}
*/
setReadOnly( ns, 'f', require( './../../iter/f' ) );

/**
* @name frechet
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/frechet}
*/
setReadOnly( ns, 'frechet', require( './../../iter/frechet' ) );

/**
* @name gamma
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/gamma}
*/
setReadOnly( ns, 'gamma', require( './../../iter/gamma' ) );

/**
* @name geometric
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/geometric}
*/
setReadOnly( ns, 'geometric', require( './../../iter/geometric' ) );

/**
* @name gumbel
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/gumbel}
*/
setReadOnly( ns, 'gumbel', require( './../../iter/gumbel' ) );

/**
* @name hypergeometric
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/hypergeometric}
*/
setReadOnly( ns, 'hypergeometric', require( './../../iter/hypergeometric' ) );

/**
* @name improvedZiggurat
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/improved-ziggurat}
*/
setReadOnly( ns, 'improvedZiggurat', require( './../../iter/improved-ziggurat' ) );

/**
* @name invgamma
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/invgamma}
*/
setReadOnly( ns, 'invgamma', require( './../../iter/invgamma' ) );

/**
* @name kumaraswamy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/kumaraswamy}
*/
setReadOnly( ns, 'kumaraswamy', require( './../../iter/kumaraswamy' ) );

/**
* @name laplace
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/laplace}
*/
setReadOnly( ns, 'laplace', require( './../../iter/laplace' ) );

/**
* @name levy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/levy}
*/
setReadOnly( ns, 'levy', require( './../../iter/levy' ) );

/**
* @name logistic
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/logistic}
*/
setReadOnly( ns, 'logistic', require( './../../iter/logistic' ) );

/**
* @name lognormal
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/lognormal}
*/
setReadOnly( ns, 'lognormal', require( './../../iter/lognormal' ) );

/**
* @name minstd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/minstd}
*/
setReadOnly( ns, 'minstd', require( './../../iter/minstd' ) );

/**
* @name minstdShuffle
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/minstd-shuffle}
*/
setReadOnly( ns, 'minstdShuffle', require( './../../iter/minstd-shuffle' ) );

/**
* @name mt19937
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/mt19937}
*/
setReadOnly( ns, 'mt19937', require( './../../iter/mt19937' ) );

/**
* @name negativeBinomial
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/negative-binomial}
*/
setReadOnly( ns, 'negativeBinomial', require( './../../iter/negative-binomial' ) );

/**
* @name normal
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/normal}
*/
setReadOnly( ns, 'normal', require( './../../iter/normal' ) );

/**
* @name pareto1
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/pareto-type1}
*/
setReadOnly( ns, 'pareto1', require( './../../iter/pareto-type1' ) );

/**
* @name poisson
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/poisson}
*/
setReadOnly( ns, 'poisson', require( './../../iter/poisson' ) );

/**
* @name randi
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/randi}
*/
setReadOnly( ns, 'randi', require( './../../iter/randi' ) );

/**
* @name randn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/randn}
*/
setReadOnly( ns, 'randn', require( './../../iter/randn' ) );

/**
* @name randu
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/randu}
*/
setReadOnly( ns, 'randu', require( './../../iter/randu' ) );

/**
* @name rayleigh
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/rayleigh}
*/
setReadOnly( ns, 'rayleigh', require( './../../iter/rayleigh' ) );

/**
* @name t
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/t}
*/
setReadOnly( ns, 't', require( './../../iter/t' ) );

/**
* @name triangular
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/triangular}
*/
setReadOnly( ns, 'triangular', require( './../../iter/triangular' ) );

/**
* @name uniform
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/uniform}
*/
setReadOnly( ns, 'uniform', require( './../../iter/uniform' ) );

/**
* @name weibull
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/iter/weibull}
*/
setReadOnly( ns, 'weibull', require( './../../iter/weibull' ) );


// EXPORTS //

module.exports = ns;
