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

import arcsine = require( './../../../../base/dists/arcsine' );
import bernoulli = require( './../../../../base/dists/bernoulli' );
import beta = require( './../../../../base/dists/beta' );
import betaprime = require( './../../../../base/dists/betaprime' );
import binomial = require( './../../../../base/dists/binomial' );
import cauchy = require( './../../../../base/dists/cauchy' );
import chi = require( './../../../../base/dists/chi' );
import chisquare = require( './../../../../base/dists/chisquare' );
import cosine = require( './../../../../base/dists/cosine' );
import degenerate = require( './../../../../base/dists/degenerate' );
import discreteUniform = require( './../../../../base/dists/discrete-uniform' );
import erlang = require( './../../../../base/dists/erlang' );
import exponential = require( './../../../../base/dists/exponential' );
import f = require( './../../../../base/dists/f' );
import frechet = require( './../../../../base/dists/frechet' );
import gamma = require( './../../../../base/dists/gamma' );
import geometric = require( './../../../../base/dists/geometric' );
import gumbel = require( './../../../../base/dists/gumbel' );
import hypergeometric = require( './../../../../base/dists/hypergeometric' );
import invgamma = require( './../../../../base/dists/invgamma' );
import kumaraswamy = require( './../../../../base/dists/kumaraswamy' );
import laplace = require( './../../../../base/dists/laplace' );
import levy = require( './../../../../base/dists/levy' );
import logistic = require( './../../../../base/dists/logistic' );
import lognormal = require( './../../../../base/dists/lognormal' );
import negativeBinomial = require( './../../../../base/dists/negative-binomial' );
import normal = require( './../../../../base/dists/normal' );
import pareto1 = require( './../../../../base/dists/pareto-type1' );
import poisson = require( './../../../../base/dists/poisson' );
import rayleigh = require( './../../../../base/dists/rayleigh' );
import signrank = require( './../../../../base/dists/signrank' );
import t = require( './../../../../base/dists/t' );
import triangular = require( './../../../../base/dists/triangular' );
import truncatedNormal = require( './../../../../base/dists/truncated-normal' );
import uniform = require( './../../../../base/dists/uniform' );
import weibull = require( './../../../../base/dists/weibull' );

/**
* Interface describing the `dists` namespace.
*/
interface Namespace {
	/**
	* Arcsine distribution.
	*/
	arcsine: typeof arcsine;

	/**
	* Bernoulli distribution.
	*/
	bernoulli: typeof bernoulli;

	/**
	* Beta distribution.
	*/
	beta: typeof beta;

	/**
	* Beta prime distribution.
	*/
	betaprime: typeof betaprime;

	/**
	* Binomial distribution.
	*/
	binomial: typeof binomial;

	/**
	* Cauchy distribution.
	*/
	cauchy: typeof cauchy;

	/**
	* Chi distribution.
	*/
	chi: typeof chi;

	/**
	* Chi-squared distribution.
	*/
	chisquare: typeof chisquare;

	/**
	* Raised cosine distribution.
	*/
	cosine: typeof cosine;

	/**
	* Degenerate distribution.
	*/
	degenerate: typeof degenerate;

	/**
	* Discrete uniform distribution.
	*/
	discreteUniform: typeof discreteUniform;

	/**
	* Erlang distribution.
	*/
	erlang: typeof erlang;

	/**
	* Exponential distribution.
	*/
	exponential: typeof exponential;

	/**
	* Fisher's F distribution.
	*/
	f: typeof f;

	/**
	* Fréchet distribution.
	*/
	frechet: typeof frechet;

	/**
	* Gamma distribution.
	*/
	gamma: typeof gamma;

	/**
	* Geometric distribution.
	*/
	geometric: typeof geometric;

	/**
	* Gumbel distribution.
	*/
	gumbel: typeof gumbel;

	/**
	* Hypergeometric distribution.
	*/
	hypergeometric: typeof hypergeometric;

	/**
	* Inverse gamma distribution.
	*/
	invgamma: typeof invgamma;

	/**
	* Kumaraswamy's double bounded distribution.
	*/
	kumaraswamy: typeof kumaraswamy;

	/**
	* Laplace distribution.
	*/
	laplace: typeof laplace;

	/**
	* Lévy distribution.
	*/
	levy: typeof levy;

	/**
	* Logistic distribution.
	*/
	logistic: typeof logistic;

	/**
	* Lognormal distribution.
	*/
	lognormal: typeof lognormal;

	/**
	* Negative binomial distribution.
	*/
	negativeBinomial: typeof negativeBinomial;

	/**
	* Normal distribution.
	*/
	normal: typeof normal;

	/**
	* Pareto (Type I) distribution.
	*/
	pareto1: typeof pareto1;

	/**
	* Poisson distribution.
	*/
	poisson: typeof poisson;

	/**
	* Rayleigh distribution.
	*/
	rayleigh: typeof rayleigh;

	/**
	* Distribution of Wilcoxon signed rank test statistic.
	*/
	signrank: typeof signrank;

	/**
	* Student's t distribution.
	*/
	t: typeof t;

	/**
	* Triangular distribution.
	*/
	triangular: typeof triangular;

	/**
	* Truncated normal distribution.
	*/
	truncatedNormal: typeof truncatedNormal;

	/**
	* Uniform distribution.
	*/
	uniform: typeof uniform;

	/**
	* Weibull distribution.
	*/
	weibull: typeof weibull;
}

/**
* Standard library probability distribution modules.
*/
declare var ns: Namespace;


// EXPORTS //

export = ns;
