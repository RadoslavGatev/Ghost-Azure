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

// MAIN //

var CDF = {};

CDF[ 'arcsine' ] = require( './../../base/dists/arcsine/cdf' );
CDF[ 'beta' ] = require( './../../base/dists/beta/cdf' );
CDF[ 'betaprime' ] = require( './../../base/dists/betaprime/cdf' );
CDF[ 'cauchy' ] = require( './../../base/dists/cauchy/cdf' );
CDF[ 'chi' ] = require( './../../base/dists/chi/cdf' );
CDF[ 'chisquare' ] = require( './../../base/dists/chisquare/cdf' );
CDF[ 'cosine' ] = require( './../../base/dists/cosine/cdf' );
CDF[ 'erlang' ] = require( './../../base/dists/erlang/cdf' );
CDF[ 'exponential' ] = require( './../../base/dists/exponential/cdf' );
CDF[ 'f' ] = require( './../../base/dists/f/cdf' );
CDF[ 'frechet' ] = require( './../../base/dists/frechet/cdf' );
CDF[ 'gamma' ] = require( './../../base/dists/gamma/cdf' );
CDF[ 'gumbel' ] = require( './../../base/dists/gumbel/cdf' );
CDF[ 'invgamma' ] = require( './../../base/dists/invgamma/cdf' );
CDF[ 'kumaraswamy' ] = require( './../../base/dists/kumaraswamy/cdf' );
CDF[ 'laplace' ] = require( './../../base/dists/laplace/cdf' );
CDF[ 'levy' ] = require( './../../base/dists/levy/cdf' );
CDF[ 'logistic' ] = require( './../../base/dists/logistic/cdf' );
CDF[ 'lognormal' ] = require( './../../base/dists/lognormal/cdf' );
CDF[ 'normal' ] = require( './../../base/dists/normal/cdf' );
CDF[ 'pareto-type1' ] = require( './../../base/dists/pareto-type1/cdf' );
CDF[ 'rayleigh' ] = require( './../../base/dists/rayleigh/cdf' );
CDF[ 't' ] = require( './../../base/dists/t/cdf' );
CDF[ 'triangular' ] = require( './../../base/dists/triangular/cdf' );
CDF[ 'uniform' ] = require( './../../base/dists/uniform/cdf' );
CDF[ 'weibull' ] = require( './../../base/dists/weibull/cdf' );


// EXPORTS //

module.exports = CDF;
