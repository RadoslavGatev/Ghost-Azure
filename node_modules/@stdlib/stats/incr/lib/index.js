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
* @name incrapcorr
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/apcorr}
*/
setReadOnly( ns, 'incrapcorr', require( './../../incr/apcorr' ) );

/**
* @name incrcount
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/count}
*/
setReadOnly( ns, 'incrcount', require( './../../incr/count' ) );

/**
* @name incrcovariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/covariance}
*/
setReadOnly( ns, 'incrcovariance', require( './../../incr/covariance' ) );

/**
* @name incrcovmat
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/covmat}
*/
setReadOnly( ns, 'incrcovmat', require( './../../incr/covmat' ) );

/**
* @name incrcv
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/cv}
*/
setReadOnly( ns, 'incrcv', require( './../../incr/cv' ) );

/**
* @name increwmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/ewmean}
*/
setReadOnly( ns, 'increwmean', require( './../../incr/ewmean' ) );

/**
* @name increwstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/ewstdev}
*/
setReadOnly( ns, 'increwstdev', require( './../../incr/ewstdev' ) );

/**
* @name increwvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/ewvariance}
*/
setReadOnly( ns, 'increwvariance', require( './../../incr/ewvariance' ) );

/**
* @name incrgmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/gmean}
*/
setReadOnly( ns, 'incrgmean', require( './../../incr/gmean' ) );

/**
* @name incrgrubbs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/grubbs}
*/
setReadOnly( ns, 'incrgrubbs', require( './../../incr/grubbs' ) );

/**
* @name incrhmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/hmean}
*/
setReadOnly( ns, 'incrhmean', require( './../../incr/hmean' ) );

/**
* @name incrkurtosis
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/kurtosis}
*/
setReadOnly( ns, 'incrkurtosis', require( './../../incr/kurtosis' ) );

/**
* @name incrmaape
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/maape}
*/
setReadOnly( ns, 'incrmaape', require( './../../incr/maape' ) );

/**
* @name incrmae
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mae}
*/
setReadOnly( ns, 'incrmae', require( './../../incr/mae' ) );

/**
* @name incrmapcorr
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mapcorr}
*/
setReadOnly( ns, 'incrmapcorr', require( './../../incr/mapcorr' ) );

/**
* @name incrmape
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mape}
*/
setReadOnly( ns, 'incrmape', require( './../../incr/mape' ) );

/**
* @name incrmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/max}
*/
setReadOnly( ns, 'incrmax', require( './../../incr/max' ) );

/**
* @name incrmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/maxabs}
*/
setReadOnly( ns, 'incrmaxabs', require( './../../incr/maxabs' ) );

/**
* @name incrmcovariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mcovariance}
*/
setReadOnly( ns, 'incrmcovariance', require( './../../incr/mcovariance' ) );

/**
* @name incrmcv
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mcv}
*/
setReadOnly( ns, 'incrmcv', require( './../../incr/mcv' ) );

/**
* @name incrmda
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mda}
*/
setReadOnly( ns, 'incrmda', require( './../../incr/mda' ) );

/**
* @name incrme
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/me}
*/
setReadOnly( ns, 'incrme', require( './../../incr/me' ) );

/**
* @name incrmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mean}
*/
setReadOnly( ns, 'incrmean', require( './../../incr/mean' ) );

/**
* @name incrmeanabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/meanabs}
*/
setReadOnly( ns, 'incrmeanabs', require( './../../incr/meanabs' ) );

/**
* @name incrmeanabs2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/meanabs2}
*/
setReadOnly( ns, 'incrmeanabs2', require( './../../incr/meanabs2' ) );

/**
* @name incrmeanstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/meanstdev}
*/
setReadOnly( ns, 'incrmeanstdev', require( './../../incr/meanstdev' ) );

/**
* @name incrmeanvar
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/meanvar}
*/
setReadOnly( ns, 'incrmeanvar', require( './../../incr/meanvar' ) );

/**
* @name incrmgmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mgmean}
*/
setReadOnly( ns, 'incrmgmean', require( './../../incr/mgmean' ) );

/**
* @name incrmgrubbs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mgrubbs}
*/
setReadOnly( ns, 'incrmgrubbs', require( './../../incr/mgrubbs' ) );

/**
* @name incrmhmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mhmean}
*/
setReadOnly( ns, 'incrmhmean', require( './../../incr/mhmean' ) );

/**
* @name incrmidrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/midrange}
*/
setReadOnly( ns, 'incrmidrange', require( './../../incr/midrange' ) );

/**
* @name incrmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/min}
*/
setReadOnly( ns, 'incrmin', require( './../../incr/min' ) );

/**
* @name incrminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/minabs}
*/
setReadOnly( ns, 'incrminabs', require( './../../incr/minabs' ) );

/**
* @name incrminmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/minmax}
*/
setReadOnly( ns, 'incrminmax', require( './../../incr/minmax' ) );

/**
* @name incrminmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/minmaxabs}
*/
setReadOnly( ns, 'incrminmaxabs', require( './../../incr/minmaxabs' ) );

/**
* @name incrmmaape
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmaape}
*/
setReadOnly( ns, 'incrmmaape', require( './../../incr/mmaape' ) );

/**
* @name incrmmae
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmae}
*/
setReadOnly( ns, 'incrmmae', require( './../../incr/mmae' ) );

/**
* @name incrmmape
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmape}
*/
setReadOnly( ns, 'incrmmape', require( './../../incr/mmape' ) );

/**
* @name incrmmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmax}
*/
setReadOnly( ns, 'incrmmax', require( './../../incr/mmax' ) );

/**
* @name incrmmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmaxabs}
*/
setReadOnly( ns, 'incrmmaxabs', require( './../../incr/mmaxabs' ) );

/**
* @name incrmmda
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmda}
*/
setReadOnly( ns, 'incrmmda', require( './../../incr/mmda' ) );

/**
* @name incrmme
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mme}
*/
setReadOnly( ns, 'incrmme', require( './../../incr/mme' ) );

/**
* @name incrmmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmean}
*/
setReadOnly( ns, 'incrmmean', require( './../../incr/mmean' ) );

/**
* @name incrmmeanabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmeanabs}
*/
setReadOnly( ns, 'incrmmeanabs', require( './../../incr/mmeanabs' ) );

/**
* @name incrmmeanabs2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmeanabs2}
*/
setReadOnly( ns, 'incrmmeanabs2', require( './../../incr/mmeanabs2' ) );

/**
* @name incrmmeanstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmeanstdev}
*/
setReadOnly( ns, 'incrmmeanstdev', require( './../../incr/mmeanstdev' ) );

/**
* @name incrmmeanvar
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmeanvar}
*/
setReadOnly( ns, 'incrmmeanvar', require( './../../incr/mmeanvar' ) );

/**
* @name incrmmidrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmidrange}
*/
setReadOnly( ns, 'incrmmidrange', require( './../../incr/mmidrange' ) );

/**
* @name incrmmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmin}
*/
setReadOnly( ns, 'incrmmin', require( './../../incr/mmin' ) );

/**
* @name incrmminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mminabs}
*/
setReadOnly( ns, 'incrmminabs', require( './../../incr/mminabs' ) );

/**
* @name incrmminmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mminmax}
*/
setReadOnly( ns, 'incrmminmax', require( './../../incr/mminmax' ) );

/**
* @name incrmminmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mminmaxabs}
*/
setReadOnly( ns, 'incrmminmaxabs', require( './../../incr/mminmaxabs' ) );

/**
* @name incrmmpe
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmpe}
*/
setReadOnly( ns, 'incrmmpe', require( './../../incr/mmpe' ) );

/**
* @name incrmmse
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mmse}
*/
setReadOnly( ns, 'incrmmse', require( './../../incr/mmse' ) );

/**
* @name incrmpcorr
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mpcorr}
*/
setReadOnly( ns, 'incrmpcorr', require( './../../incr/mpcorr' ) );

/**
* @name incrmpcorr2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mpcorr2}
*/
setReadOnly( ns, 'incrmpcorr2', require( './../../incr/mpcorr2' ) );

/**
* @name incrmpcorrdist
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mpcorrdist}
*/
setReadOnly( ns, 'incrmpcorrdist', require( './../../incr/mpcorrdist' ) );

/**
* @name incrmpe
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mpe}
*/
setReadOnly( ns, 'incrmpe', require( './../../incr/mpe' ) );

/**
* @name incrmprod
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mprod}
*/
setReadOnly( ns, 'incrmprod', require( './../../incr/mprod' ) );

/**
* @name incrmrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mrange}
*/
setReadOnly( ns, 'incrmrange', require( './../../incr/mrange' ) );

/**
* @name incrmrmse
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mrmse}
*/
setReadOnly( ns, 'incrmrmse', require( './../../incr/mrmse' ) );

/**
* @name incrmrss
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mrss}
*/
setReadOnly( ns, 'incrmrss', require( './../../incr/mrss' ) );

/**
* @name incrmse
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mse}
*/
setReadOnly( ns, 'incrmse', require( './../../incr/mse' ) );

/**
* @name incrmstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mstdev}
*/
setReadOnly( ns, 'incrmstdev', require( './../../incr/mstdev' ) );

/**
* @name incrmsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/msum}
*/
setReadOnly( ns, 'incrmsum', require( './../../incr/msum' ) );

/**
* @name incrmsumabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/msumabs}
*/
setReadOnly( ns, 'incrmsumabs', require( './../../incr/msumabs' ) );

/**
* @name incrmsumabs2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/msumabs2}
*/
setReadOnly( ns, 'incrmsumabs2', require( './../../incr/msumabs2' ) );

/**
* @name incrmsummary
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/msummary}
*/
setReadOnly( ns, 'incrmsummary', require( './../../incr/msummary' ) );

/**
* @name incrmsumprod
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/msumprod}
*/
setReadOnly( ns, 'incrmsumprod', require( './../../incr/msumprod' ) );

/**
* @name incrmvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mvariance}
*/
setReadOnly( ns, 'incrmvariance', require( './../../incr/mvariance' ) );

/**
* @name incrmvmr
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/mvmr}
*/
setReadOnly( ns, 'incrmvmr', require( './../../incr/mvmr' ) );

/**
* @name incrnancount
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/nancount}
*/
setReadOnly( ns, 'incrnancount', require( './../../incr/nancount' ) );

/**
* @name incrnansum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/nansum}
*/
setReadOnly( ns, 'incrnansum', require( './../../incr/nansum' ) );

/**
* @name incrnansumabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/nansumabs}
*/
setReadOnly( ns, 'incrnansumabs', require( './../../incr/nansumabs' ) );

/**
* @name incrnansumabs2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/nansumabs2}
*/
setReadOnly( ns, 'incrnansumabs2', require( './../../incr/nansumabs2' ) );

/**
* @name incrpcorr
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/pcorr}
*/
setReadOnly( ns, 'incrpcorr', require( './../../incr/pcorr' ) );

/**
* @name incrpcorr2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/pcorr2}
*/
setReadOnly( ns, 'incrpcorr2', require( './../../incr/pcorr2' ) );

/**
* @name incrpcorrdist
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/pcorrdist}
*/
setReadOnly( ns, 'incrpcorrdist', require( './../../incr/pcorrdist' ) );

/**
* @name incrpcorrdistmat
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/pcorrdistmat}
*/
setReadOnly( ns, 'incrpcorrdistmat', require( './../../incr/pcorrdistmat' ) );

/**
* @name incrpcorrmat
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/pcorrmat}
*/
setReadOnly( ns, 'incrpcorrmat', require( './../../incr/pcorrmat' ) );

/**
* @name incrprod
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/prod}
*/
setReadOnly( ns, 'incrprod', require( './../../incr/prod' ) );

/**
* @name incrrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/range}
*/
setReadOnly( ns, 'incrrange', require( './../../incr/range' ) );

/**
* @name incrrmse
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/rmse}
*/
setReadOnly( ns, 'incrrmse', require( './../../incr/rmse' ) );

/**
* @name incrrss
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/rss}
*/
setReadOnly( ns, 'incrrss', require( './../../incr/rss' ) );

/**
* @name incrskewness
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/skewness}
*/
setReadOnly( ns, 'incrskewness', require( './../../incr/skewness' ) );

/**
* @name incrstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/stdev}
*/
setReadOnly( ns, 'incrstdev', require( './../../incr/stdev' ) );

/**
* @name incrsum
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/sum}
*/
setReadOnly( ns, 'incrsum', require( './../../incr/sum' ) );

/**
* @name incrsumabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/sumabs}
*/
setReadOnly( ns, 'incrsumabs', require( './../../incr/sumabs' ) );

/**
* @name incrsumabs2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/sumabs2}
*/
setReadOnly( ns, 'incrsumabs2', require( './../../incr/sumabs2' ) );

/**
* @name incrsummary
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/summary}
*/
setReadOnly( ns, 'incrsummary', require( './../../incr/summary' ) );

/**
* @name incrsumprod
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/sumprod}
*/
setReadOnly( ns, 'incrsumprod', require( './../../incr/sumprod' ) );

/**
* @name incrvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/variance}
*/
setReadOnly( ns, 'incrvariance', require( './../../incr/variance' ) );

/**
* @name incrvmr
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/vmr}
*/
setReadOnly( ns, 'incrvmr', require( './../../incr/vmr' ) );

/**
* @name incrwmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/incr/wmean}
*/
setReadOnly( ns, 'incrwmean', require( './../../incr/wmean' ) );


// EXPORTS //

module.exports = ns;
