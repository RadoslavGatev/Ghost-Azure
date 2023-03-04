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

// This file is generated using `scripts/build.js`.

'use strict';

// MODULES //

var prng0 = require( './../../../base/arcsine' );
var prng1 = require( './../../../base/bernoulli' );
var prng2 = require( './../../../base/beta' );
var prng3 = require( './../../../base/betaprime' );
var prng4 = require( './../../../base/binomial' );
var prng5 = require( './../../../base/box-muller' );
var prng6 = require( './../../../base/cauchy' );
var prng7 = require( './../../../base/chi' );
var prng8 = require( './../../../base/chisquare' );
var prng9 = require( './../../../base/cosine' );
var prng10 = require( './../../../base/discrete-uniform' );
var prng11 = require( './../../../base/erlang' );
var prng12 = require( './../../../base/exponential' );
var prng13 = require( './../../../base/f' );
var prng14 = require( './../../../base/frechet' );
var prng15 = require( './../../../base/gamma' );
var prng16 = require( './../../../base/geometric' );
var prng17 = require( './../../../base/gumbel' );
var prng18 = require( './../../../base/hypergeometric' );
var prng19 = require( './../../../base/improved-ziggurat' );
var prng20 = require( './../../../base/invgamma' );
var prng21 = require( './../../../base/kumaraswamy' );
var prng22 = require( './../../../base/laplace' );
var prng23 = require( './../../../base/levy' );
var prng24 = require( './../../../base/logistic' );
var prng25 = require( './../../../base/lognormal' );
var prng26 = require( './../../../base/minstd' );
var prng27 = require( './../../../base/minstd-shuffle' );
var prng28 = require( './../../../base/mt19937' );
var prng29 = require( './../../../base/negative-binomial' );
var prng30 = require( './../../../base/normal' );
var prng31 = require( './../../../base/pareto-type1' );
var prng32 = require( './../../../base/poisson' );
var prng33 = require( './../../../base/randi' );
var prng34 = require( './../../../base/randn' );
var prng35 = require( './../../../base/randu' );
var prng36 = require( './../../../base/rayleigh' );
var prng37 = require( './../../../base/t' );
var prng38 = require( './../../../base/triangular' );
var prng39 = require( './../../../base/uniform' );
var prng40 = require( './../../../base/weibull' );


// MAIN //

var prngs = {};
prngs[ 'arcsine' ] = prng0.factory;
prngs[ 'bernoulli' ] = prng1.factory;
prngs[ 'beta' ] = prng2.factory;
prngs[ 'betaprime' ] = prng3.factory;
prngs[ 'binomial' ] = prng4.factory;
prngs[ 'box-muller' ] = prng5.factory;
prngs[ 'cauchy' ] = prng6.factory;
prngs[ 'chi' ] = prng7.factory;
prngs[ 'chisquare' ] = prng8.factory;
prngs[ 'cosine' ] = prng9.factory;
prngs[ 'discrete-uniform' ] = prng10.factory;
prngs[ 'erlang' ] = prng11.factory;
prngs[ 'exponential' ] = prng12.factory;
prngs[ 'f' ] = prng13.factory;
prngs[ 'frechet' ] = prng14.factory;
prngs[ 'gamma' ] = prng15.factory;
prngs[ 'geometric' ] = prng16.factory;
prngs[ 'gumbel' ] = prng17.factory;
prngs[ 'hypergeometric' ] = prng18.factory;
prngs[ 'improved-ziggurat' ] = prng19.factory;
prngs[ 'invgamma' ] = prng20.factory;
prngs[ 'kumaraswamy' ] = prng21.factory;
prngs[ 'laplace' ] = prng22.factory;
prngs[ 'levy' ] = prng23.factory;
prngs[ 'logistic' ] = prng24.factory;
prngs[ 'lognormal' ] = prng25.factory;
prngs[ 'minstd' ] = prng26.factory;
prngs[ 'minstd-shuffle' ] = prng27.factory;
prngs[ 'mt19937' ] = prng28.factory;
prngs[ 'negative-binomial' ] = prng29.factory;
prngs[ 'normal' ] = prng30.factory;
prngs[ 'pareto-type1' ] = prng31.factory;
prngs[ 'poisson' ] = prng32.factory;
prngs[ 'randi' ] = prng33.factory;
prngs[ 'randn' ] = prng34.factory;
prngs[ 'randu' ] = prng35.factory;
prngs[ 'rayleigh' ] = prng36.factory;
prngs[ 't' ] = prng37.factory;
prngs[ 'triangular' ] = prng38.factory;
prngs[ 'uniform' ] = prng39.factory;
prngs[ 'weibull' ] = prng40.factory;


// EXPORTS //

module.exports = prngs;
