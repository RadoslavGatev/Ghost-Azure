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
* @namespace random
*/
var random = {};

/**
* @name arcsine
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/arcsine}
*/
setReadOnly( random, 'arcsine', require( './../../base/arcsine' ) );

/**
* @name bernoulli
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/bernoulli}
*/
setReadOnly( random, 'bernoulli', require( './../../base/bernoulli' ) );

/**
* @name beta
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/beta}
*/
setReadOnly( random, 'beta', require( './../../base/beta' ) );

/**
* @name betaprime
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/betaprime}
*/
setReadOnly( random, 'betaprime', require( './../../base/betaprime' ) );

/**
* @name binomial
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/binomial}
*/
setReadOnly( random, 'binomial', require( './../../base/binomial' ) );

/**
* @name boxMuller
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/box-muller}
*/
setReadOnly( random, 'boxMuller', require( './../../base/box-muller' ) );

/**
* @name cauchy
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/cauchy}
*/
setReadOnly( random, 'cauchy', require( './../../base/cauchy' ) );

/**
* @name chi
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/chi}
*/
setReadOnly( random, 'chi', require( './../../base/chi' ) );

/**
* @name chisquare
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/chisquare}
*/
setReadOnly( random, 'chisquare', require( './../../base/chisquare' ) );

/**
* @name cosine
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/cosine}
*/
setReadOnly( random, 'cosine', require( './../../base/cosine' ) );

/**
* @name discreteUniform
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/discrete-uniform}
*/
setReadOnly( random, 'discreteUniform', require( './../../base/discrete-uniform' ) );

/**
* @name erlang
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/erlang}
*/
setReadOnly( random, 'erlang', require( './../../base/erlang' ) );

/**
* @name exponential
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/exponential}
*/
setReadOnly( random, 'exponential', require( './../../base/exponential' ) );

/**
* @name f
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/f}
*/
setReadOnly( random, 'f', require( './../../base/f' ) );

/**
* @name frechet
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/frechet}
*/
setReadOnly( random, 'frechet', require( './../../base/frechet' ) );

/**
* @name gamma
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/gamma}
*/
setReadOnly( random, 'gamma', require( './../../base/gamma' ) );

/**
* @name geometric
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/geometric}
*/
setReadOnly( random, 'geometric', require( './../../base/geometric' ) );

/**
* @name gumbel
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/gumbel}
*/
setReadOnly( random, 'gumbel', require( './../../base/gumbel' ) );

/**
* @name hypergeometric
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/hypergeometric}
*/

setReadOnly( random, 'hypergeometric', require( './../../base/hypergeometric' ) );

/**
* @name improvedZiggurat
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/improved-ziggurat}
*/
setReadOnly( random, 'improvedZiggurat', require( './../../base/improved-ziggurat' ) );

/**
* @name invgamma
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/invgamma}
*/
setReadOnly( random, 'invgamma', require( './../../base/invgamma' ) );

/**
* @name kumaraswamy
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/kumaraswamy}
*/
setReadOnly( random, 'kumaraswamy', require( './../../base/kumaraswamy' ) );

/**
* @name laplace
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/laplace}
*/
setReadOnly( random, 'laplace', require( './../../base/laplace' ) );

/**
* @name levy
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/levy}
*/
setReadOnly( random, 'levy', require( './../../base/levy' ) );

/**
* @name logistic
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/logistic}
*/
setReadOnly( random, 'logistic', require( './../../base/logistic' ) );

/**
* @name lognormal
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/lognormal}
*/
setReadOnly( random, 'lognormal', require( './../../base/lognormal' ) );

/**
* @name minstd
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/minstd}
*/
setReadOnly( random, 'minstd', require( './../../base/minstd' ) );

/**
* @name minstdShuffle
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/minstd-shuffle}
*/
setReadOnly( random, 'minstdShuffle', require( './../../base/minstd-shuffle' ) );

/**
* @name mt19937
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/mt19937}
*/
setReadOnly( random, 'mt19937', require( './../../base/mt19937' ) );

/**
* @name negativeBinomial
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/negative-binomial}
*/
setReadOnly( random, 'negativeBinomial', require( './../../base/negative-binomial' ) );

/**
* @name normal
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/normal}
*/
setReadOnly( random, 'normal', require( './../../base/normal' ) );

/**
* @name pareto1
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/pareto-type1}
*/
setReadOnly( random, 'pareto1', require( './../../base/pareto-type1' ) );

/**
* @name poisson
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/poisson}
*/
setReadOnly( random, 'poisson', require( './../../base/poisson' ) );

/**
* @name randi
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/randi}
*/
setReadOnly( random, 'randi', require( './../../base/randi' ) );

/**
* @name randn
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/randn}
*/
setReadOnly( random, 'randn', require( './../../base/randn' ) );

/**
* @name randu
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/randu}
*/
setReadOnly( random, 'randu', require( './../../base/randu' ) );

/**
* @name rayleigh
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/rayleigh}
*/
setReadOnly( random, 'rayleigh', require( './../../base/rayleigh' ) );

/**
* @name reviveBasePRNG
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/reviver}
*/
setReadOnly( random, 'reviveBasePRNG', require( './../../base/reviver' ) );

/**
* @name t
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/t}
*/
setReadOnly( random, 't', require( './../../base/t' ) );

/**
* @name triangular
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/triangular}
*/
setReadOnly( random, 'triangular', require( './../../base/triangular' ) );

/**
* @name uniform
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/uniform}
*/
setReadOnly( random, 'uniform', require( './../../base/uniform' ) );

/**
* @name weibull
* @memberof random
* @readonly
* @type {Function}
* @see {@link module:@stdlib/random/base/weibull}
*/
setReadOnly( random, 'weibull', require( './../../base/weibull' ) );


// EXPORTS //

module.exports = random;
