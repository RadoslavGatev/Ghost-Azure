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
* @name cumax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/cumax}
*/
setReadOnly( ns, 'cumax', require( './../../base/cumax' ) );

/**
* @name cumaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/cumaxabs}
*/
setReadOnly( ns, 'cumaxabs', require( './../../base/cumaxabs' ) );

/**
* @name cumin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/cumin}
*/
setReadOnly( ns, 'cumin', require( './../../base/cumin' ) );

/**
* @name cuminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/cuminabs}
*/
setReadOnly( ns, 'cuminabs', require( './../../base/cuminabs' ) );

/**
* @name dcumax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dcumax}
*/
setReadOnly( ns, 'dcumax', require( './../../base/dcumax' ) );

/**
* @name dcumaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dcumaxabs}
*/
setReadOnly( ns, 'dcumaxabs', require( './../../base/dcumaxabs' ) );

/**
* @name dcumin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dcumin}
*/
setReadOnly( ns, 'dcumin', require( './../../base/dcumin' ) );

/**
* @name dcuminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dcuminabs}
*/
setReadOnly( ns, 'dcuminabs', require( './../../base/dcuminabs' ) );

/**
* @name dists
* @memberof ns
* @readonly
* @type {Namespace}
* @see {@link module:@stdlib/stats/base/dists}
*/
setReadOnly( ns, 'dists', require( './../../base/dists' ) );

/**
* @name dmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmax}
*/
setReadOnly( ns, 'dmax', require( './../../base/dmax' ) );

/**
* @name dmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmaxabs}
*/
setReadOnly( ns, 'dmaxabs', require( './../../base/dmaxabs' ) );

/**
* @name dmaxabssorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmaxabssorted}
*/
setReadOnly( ns, 'dmaxabssorted', require( './../../base/dmaxabssorted' ) );

/**
* @name dmaxsorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmaxsorted}
*/
setReadOnly( ns, 'dmaxsorted', require( './../../base/dmaxsorted' ) );

/**
* @name dmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmean}
*/
setReadOnly( ns, 'dmean', require( './../../base/dmean' ) );

/**
* @name dmeankbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeankbn}
*/
setReadOnly( ns, 'dmeankbn', require( './../../base/dmeankbn' ) );

/**
* @name dmeankbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeankbn2}
*/
setReadOnly( ns, 'dmeankbn2', require( './../../base/dmeankbn2' ) );

/**
* @name dmeanli
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanli}
*/
setReadOnly( ns, 'dmeanli', require( './../../base/dmeanli' ) );

/**
* @name dmeanlipw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanlipw}
*/
setReadOnly( ns, 'dmeanlipw', require( './../../base/dmeanlipw' ) );

/**
* @name dmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanors}
*/
setReadOnly( ns, 'dmeanors', require( './../../base/dmeanors' ) );

/**
* @name dmeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanpn}
*/
setReadOnly( ns, 'dmeanpn', require( './../../base/dmeanpn' ) );

/**
* @name dmeanpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanpw}
*/
setReadOnly( ns, 'dmeanpw', require( './../../base/dmeanpw' ) );

/**
* @name dmeanstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanstdev}
*/
setReadOnly( ns, 'dmeanstdev', require( './../../base/dmeanstdev' ) );

/**
* @name dmeanstdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanstdevpn}
*/
setReadOnly( ns, 'dmeanstdevpn', require( './../../base/dmeanstdevpn' ) );

/**
* @name dmeanvar
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanvar}
*/
setReadOnly( ns, 'dmeanvar', require( './../../base/dmeanvar' ) );

/**
* @name dmeanvarpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanvarpn}
*/
setReadOnly( ns, 'dmeanvarpn', require( './../../base/dmeanvarpn' ) );

/**
* @name dmeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmeanwd}
*/
setReadOnly( ns, 'dmeanwd', require( './../../base/dmeanwd' ) );

/**
* @name dmediansorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmediansorted}
*/
setReadOnly( ns, 'dmediansorted', require( './../../base/dmediansorted' ) );

/**
* @name dmidrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmidrange}
*/
setReadOnly( ns, 'dmidrange', require( './../../base/dmidrange' ) );

/**
* @name dmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmin}
*/
setReadOnly( ns, 'dmin', require( './../../base/dmin' ) );

/**
* @name dminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dminabs}
*/
setReadOnly( ns, 'dminabs', require( './../../base/dminabs' ) );

/**
* @name dminsorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dminsorted}
*/
setReadOnly( ns, 'dminsorted', require( './../../base/dminsorted' ) );

/**
* @name dmskmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmskmax}
*/
setReadOnly( ns, 'dmskmax', require( './../../base/dmskmax' ) );

/**
* @name dmskmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmskmin}
*/
setReadOnly( ns, 'dmskmin', require( './../../base/dmskmin' ) );

/**
* @name dmskrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dmskrange}
*/
setReadOnly( ns, 'dmskrange', require( './../../base/dmskrange' ) );

/**
* @name dnanmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmax}
*/
setReadOnly( ns, 'dnanmax', require( './../../base/dnanmax' ) );

/**
* @name dnanmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmaxabs}
*/
setReadOnly( ns, 'dnanmaxabs', require( './../../base/dnanmaxabs' ) );

/**
* @name dnanmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmean}
*/
setReadOnly( ns, 'dnanmean', require( './../../base/dnanmean' ) );

/**
* @name dnanmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmeanors}
*/
setReadOnly( ns, 'dnanmeanors', require( './../../base/dnanmeanors' ) );

/**
* @name dnanmeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmeanpn}
*/
setReadOnly( ns, 'dnanmeanpn', require( './../../base/dnanmeanpn' ) );

/**
* @name dnanmeanpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmeanpw}
*/
setReadOnly( ns, 'dnanmeanpw', require( './../../base/dnanmeanpw' ) );

/**
* @name dnanmeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmeanwd}
*/
setReadOnly( ns, 'dnanmeanwd', require( './../../base/dnanmeanwd' ) );

/**
* @name dnanmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmin}
*/
setReadOnly( ns, 'dnanmin', require( './../../base/dnanmin' ) );

/**
* @name dnanminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanminabs}
*/
setReadOnly( ns, 'dnanminabs', require( './../../base/dnanminabs' ) );

/**
* @name dnanmskmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmskmax}
*/
setReadOnly( ns, 'dnanmskmax', require( './../../base/dnanmskmax' ) );

/**
* @name dnanmskmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmskmin}
*/
setReadOnly( ns, 'dnanmskmin', require( './../../base/dnanmskmin' ) );

/**
* @name dnanmskrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanmskrange}
*/
setReadOnly( ns, 'dnanmskrange', require( './../../base/dnanmskrange' ) );

/**
* @name dnanrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanrange}
*/
setReadOnly( ns, 'dnanrange', require( './../../base/dnanrange' ) );

/**
* @name dnanstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanstdev}
*/
setReadOnly( ns, 'dnanstdev', require( './../../base/dnanstdev' ) );

/**
* @name dnanstdevch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanstdevch}
*/
setReadOnly( ns, 'dnanstdevch', require( './../../base/dnanstdevch' ) );

/**
* @name dnanstdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanstdevpn}
*/
setReadOnly( ns, 'dnanstdevpn', require( './../../base/dnanstdevpn' ) );

/**
* @name dnanstdevtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanstdevtk}
*/
setReadOnly( ns, 'dnanstdevtk', require( './../../base/dnanstdevtk' ) );

/**
* @name dnanstdevwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanstdevwd}
*/
setReadOnly( ns, 'dnanstdevwd', require( './../../base/dnanstdevwd' ) );

/**
* @name dnanstdevyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanstdevyc}
*/
setReadOnly( ns, 'dnanstdevyc', require( './../../base/dnanstdevyc' ) );

/**
* @name dnanvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanvariance}
*/
setReadOnly( ns, 'dnanvariance', require( './../../base/dnanvariance' ) );

/**
* @name dnanvariancech
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanvariancech}
*/
setReadOnly( ns, 'dnanvariancech', require( './../../base/dnanvariancech' ) );

/**
* @name dnanvariancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanvariancepn}
*/
setReadOnly( ns, 'dnanvariancepn', require( './../../base/dnanvariancepn' ) );

/**
* @name dnanvariancetk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanvariancetk}
*/
setReadOnly( ns, 'dnanvariancetk', require( './../../base/dnanvariancetk' ) );

/**
* @name dnanvariancewd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanvariancewd}
*/
setReadOnly( ns, 'dnanvariancewd', require( './../../base/dnanvariancewd' ) );

/**
* @name dnanvarianceyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dnanvarianceyc}
*/
setReadOnly( ns, 'dnanvarianceyc', require( './../../base/dnanvarianceyc' ) );

/**
* @name drange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/drange}
*/
setReadOnly( ns, 'drange', require( './../../base/drange' ) );

/**
* @name dsem
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsem}
*/
setReadOnly( ns, 'dsem', require( './../../base/dsem' ) );

/**
* @name dsemch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsemch}
*/
setReadOnly( ns, 'dsemch', require( './../../base/dsemch' ) );

/**
* @name dsempn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsempn}
*/
setReadOnly( ns, 'dsempn', require( './../../base/dsempn' ) );

/**
* @name dsemtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsemtk}
*/
setReadOnly( ns, 'dsemtk', require( './../../base/dsemtk' ) );

/**
* @name dsemwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsemwd}
*/
setReadOnly( ns, 'dsemwd', require( './../../base/dsemwd' ) );

/**
* @name dsemyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsemyc}
*/
setReadOnly( ns, 'dsemyc', require( './../../base/dsemyc' ) );

/**
* @name dsmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsmean}
*/
setReadOnly( ns, 'dsmean', require( './../../base/dsmean' ) );

/**
* @name dsmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsmeanors}
*/
setReadOnly( ns, 'dsmeanors', require( './../../base/dsmeanors' ) );

/**
* @name dsmeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsmeanpn}
*/
setReadOnly( ns, 'dsmeanpn', require( './../../base/dsmeanpn' ) );

/**
* @name dsmeanpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsmeanpw}
*/
setReadOnly( ns, 'dsmeanpw', require( './../../base/dsmeanpw' ) );

/**
* @name dsmeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsmeanwd}
*/
setReadOnly( ns, 'dsmeanwd', require( './../../base/dsmeanwd' ) );

/**
* @name dsnanmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsnanmean}
*/
setReadOnly( ns, 'dsnanmean', require( './../../base/dsnanmean' ) );

/**
* @name dsnanmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsnanmeanors}
*/
setReadOnly( ns, 'dsnanmeanors', require( './../../base/dsnanmeanors' ) );

/**
* @name dsnanmeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsnanmeanpn}
*/
setReadOnly( ns, 'dsnanmeanpn', require( './../../base/dsnanmeanpn' ) );

/**
* @name dsnanmeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsnanmeanwd}
*/
setReadOnly( ns, 'dsnanmeanwd', require( './../../base/dsnanmeanwd' ) );

/**
* @name dstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dstdev}
*/
setReadOnly( ns, 'dstdev', require( './../../base/dstdev' ) );

/**
* @name dstdevch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dstdevch}
*/
setReadOnly( ns, 'dstdevch', require( './../../base/dstdevch' ) );

/**
* @name dstdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dstdevpn}
*/
setReadOnly( ns, 'dstdevpn', require( './../../base/dstdevpn' ) );

/**
* @name dstdevtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dstdevtk}
*/
setReadOnly( ns, 'dstdevtk', require( './../../base/dstdevtk' ) );

/**
* @name dstdevwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dstdevwd}
*/
setReadOnly( ns, 'dstdevwd', require( './../../base/dstdevwd' ) );

/**
* @name dstdevyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dstdevyc}
*/
setReadOnly( ns, 'dstdevyc', require( './../../base/dstdevyc' ) );

/**
* @name dsvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsvariance}
*/
setReadOnly( ns, 'dsvariance', require( './../../base/dsvariance' ) );

/**
* @name dsvariancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dsvariancepn}
*/
setReadOnly( ns, 'dsvariancepn', require( './../../base/dsvariancepn' ) );

/**
* @name dvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvariance}
*/
setReadOnly( ns, 'dvariance', require( './../../base/dvariance' ) );

/**
* @name dvariancech
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvariancech}
*/
setReadOnly( ns, 'dvariancech', require( './../../base/dvariancech' ) );

/**
* @name dvariancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvariancepn}
*/
setReadOnly( ns, 'dvariancepn', require( './../../base/dvariancepn' ) );

/**
* @name dvariancetk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvariancetk}
*/
setReadOnly( ns, 'dvariancetk', require( './../../base/dvariancetk' ) );

/**
* @name dvariancewd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvariancewd}
*/
setReadOnly( ns, 'dvariancewd', require( './../../base/dvariancewd' ) );

/**
* @name dvarianceyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvarianceyc}
*/
setReadOnly( ns, 'dvarianceyc', require( './../../base/dvarianceyc' ) );

/**
* @name dvarm
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvarm}
*/
setReadOnly( ns, 'dvarm', require( './../../base/dvarm' ) );

/**
* @name dvarmpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvarmpn}
*/
setReadOnly( ns, 'dvarmpn', require( './../../base/dvarmpn' ) );

/**
* @name dvarmtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/dvarmtk}
*/
setReadOnly( ns, 'dvarmtk', require( './../../base/dvarmtk' ) );

/**
* @name max
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/max}
*/
setReadOnly( ns, 'max', require( './../../base/max' ) );

/**
* @name maxBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/max-by}
*/
setReadOnly( ns, 'maxBy', require( './../../base/max-by' ) );

/**
* @name maxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/maxabs}
*/
setReadOnly( ns, 'maxabs', require( './../../base/maxabs' ) );

/**
* @name maxsorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/maxsorted}
*/
setReadOnly( ns, 'maxsorted', require( './../../base/maxsorted' ) );

/**
* @name mean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/mean}
*/
setReadOnly( ns, 'mean', require( './../../base/mean' ) );

/**
* @name meankbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/meankbn}
*/
setReadOnly( ns, 'meankbn', require( './../../base/meankbn' ) );

/**
* @name meankbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/meankbn2}
*/
setReadOnly( ns, 'meankbn2', require( './../../base/meankbn2' ) );

/**
* @name meanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/meanors}
*/
setReadOnly( ns, 'meanors', require( './../../base/meanors' ) );

/**
* @name meanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/meanpn}
*/
setReadOnly( ns, 'meanpn', require( './../../base/meanpn' ) );

/**
* @name meanpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/meanpw}
*/
setReadOnly( ns, 'meanpw', require( './../../base/meanpw' ) );

/**
* @name meanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/meanwd}
*/
setReadOnly( ns, 'meanwd', require( './../../base/meanwd' ) );

/**
* @name mediansorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/mediansorted}
*/
setReadOnly( ns, 'mediansorted', require( './../../base/mediansorted' ) );

/**
* @name min
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/min}
*/
setReadOnly( ns, 'min', require( './../../base/min' ) );

/**
* @name minBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/min-by}
*/
setReadOnly( ns, 'minBy', require( './../../base/min-by' ) );

/**
* @name minabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/minabs}
*/
setReadOnly( ns, 'minabs', require( './../../base/minabs' ) );

/**
* @name minsorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/minsorted}
*/
setReadOnly( ns, 'minsorted', require( './../../base/minsorted' ) );

/**
* @name mskmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/mskmax}
*/
setReadOnly( ns, 'mskmax', require( './../../base/mskmax' ) );

/**
* @name mskmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/mskmin}
*/
setReadOnly( ns, 'mskmin', require( './../../base/mskmin' ) );

/**
* @name mskrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/mskrange}
*/
setReadOnly( ns, 'mskrange', require( './../../base/mskrange' ) );

/**
* @name nanmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmax}
*/
setReadOnly( ns, 'nanmax', require( './../../base/nanmax' ) );

/**
* @name nanmaxBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmax-by}
*/
setReadOnly( ns, 'nanmaxBy', require( './../../base/nanmax-by' ) );

/**
* @name nanmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmaxabs}
*/
setReadOnly( ns, 'nanmaxabs', require( './../../base/nanmaxabs' ) );

/**
* @name nanmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmean}
*/
setReadOnly( ns, 'nanmean', require( './../../base/nanmean' ) );

/**
* @name nanmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmeanors}
*/
setReadOnly( ns, 'nanmeanors', require( './../../base/nanmeanors' ) );

/**
* @name nanmeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmeanpn}
*/
setReadOnly( ns, 'nanmeanpn', require( './../../base/nanmeanpn' ) );

/**
* @name nanmeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmeanwd}
*/
setReadOnly( ns, 'nanmeanwd', require( './../../base/nanmeanwd' ) );

/**
* @name nanmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmin}
*/
setReadOnly( ns, 'nanmin', require( './../../base/nanmin' ) );

/**
* @name nanminBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmin-by}
*/
setReadOnly( ns, 'nanminBy', require( './../../base/nanmin-by' ) );

/**
* @name nanminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanminabs}
*/
setReadOnly( ns, 'nanminabs', require( './../../base/nanminabs' ) );

/**
* @name nanmskmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmskmax}
*/
setReadOnly( ns, 'nanmskmax', require( './../../base/nanmskmax' ) );

/**
* @name nanmskmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmskmin}
*/
setReadOnly( ns, 'nanmskmin', require( './../../base/nanmskmin' ) );

/**
* @name nanmskrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanmskrange}
*/
setReadOnly( ns, 'nanmskrange', require( './../../base/nanmskrange' ) );

/**
* @name nanrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanrange}
*/
setReadOnly( ns, 'nanrange', require( './../../base/nanrange' ) );

/**
* @name nanrangeBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanrange-by}
*/
setReadOnly( ns, 'nanrangeBy', require( './../../base/nanrange-by' ) );

/**
* @name nanstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanstdev}
*/
setReadOnly( ns, 'nanstdev', require( './../../base/nanstdev' ) );

/**
* @name nanstdevch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanstdevch}
*/
setReadOnly( ns, 'nanstdevch', require( './../../base/nanstdevch' ) );

/**
* @name nanstdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanstdevpn}
*/
setReadOnly( ns, 'nanstdevpn', require( './../../base/nanstdevpn' ) );

/**
* @name nanstdevtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanstdevtk}
*/
setReadOnly( ns, 'nanstdevtk', require( './../../base/nanstdevtk' ) );

/**
* @name nanstdevwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanstdevwd}
*/
setReadOnly( ns, 'nanstdevwd', require( './../../base/nanstdevwd' ) );

/**
* @name nanstdevyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanstdevyc}
*/
setReadOnly( ns, 'nanstdevyc', require( './../../base/nanstdevyc' ) );

/**
* @name nanvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanvariance}
*/
setReadOnly( ns, 'nanvariance', require( './../../base/nanvariance' ) );

/**
* @name nanvariancech
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanvariancech}
*/
setReadOnly( ns, 'nanvariancech', require( './../../base/nanvariancech' ) );

/**
* @name nanvariancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanvariancepn}
*/
setReadOnly( ns, 'nanvariancepn', require( './../../base/nanvariancepn' ) );

/**
* @name nanvariancetk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanvariancetk}
*/
setReadOnly( ns, 'nanvariancetk', require( './../../base/nanvariancetk' ) );

/**
* @name nanvariancewd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanvariancewd}
*/
setReadOnly( ns, 'nanvariancewd', require( './../../base/nanvariancewd' ) );

/**
* @name nanvarianceyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/nanvarianceyc}
*/
setReadOnly( ns, 'nanvarianceyc', require( './../../base/nanvarianceyc' ) );

/**
* @name range
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/range}
*/
setReadOnly( ns, 'range', require( './../../base/range' ) );

/**
* @name rangeBy
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/range-by}
*/
setReadOnly( ns, 'rangeBy', require( './../../base/range-by' ) );

/**
* @name scumax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/scumax}
*/
setReadOnly( ns, 'scumax', require( './../../base/scumax' ) );

/**
* @name scumaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/scumaxabs}
*/
setReadOnly( ns, 'scumaxabs', require( './../../base/scumaxabs' ) );

/**
* @name scumin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/scumin}
*/
setReadOnly( ns, 'scumin', require( './../../base/scumin' ) );

/**
* @name scuminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/scuminabs}
*/
setReadOnly( ns, 'scuminabs', require( './../../base/scuminabs' ) );

/**
* @name sdsmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sdsmean}
*/
setReadOnly( ns, 'sdsmean', require( './../../base/sdsmean' ) );

/**
* @name sdsmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sdsmeanors}
*/
setReadOnly( ns, 'sdsmeanors', require( './../../base/sdsmeanors' ) );

/**
* @name sdsnanmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sdsnanmean}
*/
setReadOnly( ns, 'sdsnanmean', require( './../../base/sdsnanmean' ) );

/**
* @name sdsnanmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sdsnanmeanors}
*/
setReadOnly( ns, 'sdsnanmeanors', require( './../../base/sdsnanmeanors' ) );

/**
* @name smax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smax}
*/
setReadOnly( ns, 'smax', require( './../../base/smax' ) );

/**
* @name smaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smaxabs}
*/
setReadOnly( ns, 'smaxabs', require( './../../base/smaxabs' ) );

/**
* @name smaxabssorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smaxabssorted}
*/
setReadOnly( ns, 'smaxabssorted', require( './../../base/smaxabssorted' ) );

/**
* @name smaxsorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smaxsorted}
*/
setReadOnly( ns, 'smaxsorted', require( './../../base/smaxsorted' ) );

/**
* @name smean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smean}
*/
setReadOnly( ns, 'smean', require( './../../base/smean' ) );

/**
* @name smeankbn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeankbn}
*/
setReadOnly( ns, 'smeankbn', require( './../../base/smeankbn' ) );

/**
* @name smeankbn2
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeankbn2}
*/
setReadOnly( ns, 'smeankbn2', require( './../../base/smeankbn2' ) );

/**
* @name smeanli
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeanli}
*/
setReadOnly( ns, 'smeanli', require( './../../base/smeanli' ) );

/**
* @name smeanlipw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeanlipw}
*/
setReadOnly( ns, 'smeanlipw', require( './../../base/smeanlipw' ) );

/**
* @name smeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeanors}
*/
setReadOnly( ns, 'smeanors', require( './../../base/smeanors' ) );

/**
* @name smeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeanpn}
*/
setReadOnly( ns, 'smeanpn', require( './../../base/smeanpn' ) );

/**
* @name smeanpw
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeanpw}
*/
setReadOnly( ns, 'smeanpw', require( './../../base/smeanpw' ) );

/**
* @name smeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smeanwd}
*/
setReadOnly( ns, 'smeanwd', require( './../../base/smeanwd' ) );

/**
* @name smediansorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smediansorted}
*/
setReadOnly( ns, 'smediansorted', require( './../../base/smediansorted' ) );

/**
* @name smidrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smidrange}
*/
setReadOnly( ns, 'smidrange', require( './../../base/smidrange' ) );

/**
* @name smin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smin}
*/
setReadOnly( ns, 'smin', require( './../../base/smin' ) );

/**
* @name sminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sminabs}
*/
setReadOnly( ns, 'sminabs', require( './../../base/sminabs' ) );

/**
* @name sminsorted
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sminsorted}
*/
setReadOnly( ns, 'sminsorted', require( './../../base/sminsorted' ) );

/**
* @name smskmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smskmax}
*/
setReadOnly( ns, 'smskmax', require( './../../base/smskmax' ) );

/**
* @name smskmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smskmin}
*/
setReadOnly( ns, 'smskmin', require( './../../base/smskmin' ) );

/**
* @name smskrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/smskrange}
*/
setReadOnly( ns, 'smskrange', require( './../../base/smskrange' ) );

/**
* @name snanmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmax}
*/
setReadOnly( ns, 'snanmax', require( './../../base/snanmax' ) );

/**
* @name snanmaxabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmaxabs}
*/
setReadOnly( ns, 'snanmaxabs', require( './../../base/snanmaxabs' ) );

/**
* @name snanmean
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmean}
*/
setReadOnly( ns, 'snanmean', require( './../../base/snanmean' ) );

/**
* @name snanmeanors
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmeanors}
*/
setReadOnly( ns, 'snanmeanors', require( './../../base/snanmeanors' ) );

/**
* @name snanmeanpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmeanpn}
*/
setReadOnly( ns, 'snanmeanpn', require( './../../base/snanmeanpn' ) );

/**
* @name snanmeanwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmeanwd}
*/
setReadOnly( ns, 'snanmeanwd', require( './../../base/snanmeanwd' ) );

/**
* @name snanmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmin}
*/
setReadOnly( ns, 'snanmin', require( './../../base/snanmin' ) );

/**
* @name snanminabs
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanminabs}
*/
setReadOnly( ns, 'snanminabs', require( './../../base/snanminabs' ) );

/**
* @name snanmskmax
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmskmax}
*/
setReadOnly( ns, 'snanmskmax', require( './../../base/snanmskmax' ) );

/**
* @name snanmskmin
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmskmin}
*/
setReadOnly( ns, 'snanmskmin', require( './../../base/snanmskmin' ) );

/**
* @name snanmskrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanmskrange}
*/
setReadOnly( ns, 'snanmskrange', require( './../../base/snanmskrange' ) );

/**
* @name snanrange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanrange}
*/
setReadOnly( ns, 'snanrange', require( './../../base/snanrange' ) );

/**
* @name snanstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanstdev}
*/
setReadOnly( ns, 'snanstdev', require( './../../base/snanstdev' ) );

/**
* @name snanstdevch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanstdevch}
*/
setReadOnly( ns, 'snanstdevch', require( './../../base/snanstdevch' ) );

/**
* @name snanstdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanstdevpn}
*/
setReadOnly( ns, 'snanstdevpn', require( './../../base/snanstdevpn' ) );

/**
* @name snanstdevtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanstdevtk}
*/
setReadOnly( ns, 'snanstdevtk', require( './../../base/snanstdevtk' ) );

/**
* @name snanstdevwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanstdevwd}
*/
setReadOnly( ns, 'snanstdevwd', require( './../../base/snanstdevwd' ) );

/**
* @name snanstdevyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanstdevyc}
*/
setReadOnly( ns, 'snanstdevyc', require( './../../base/snanstdevyc' ) );

/**
* @name snanvariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanvariance}
*/
setReadOnly( ns, 'snanvariance', require( './../../base/snanvariance' ) );

/**
* @name snanvariancech
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanvariancech}
*/
setReadOnly( ns, 'snanvariancech', require( './../../base/snanvariancech' ) );

/**
* @name snanvariancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanvariancepn}
*/
setReadOnly( ns, 'snanvariancepn', require( './../../base/snanvariancepn' ) );

/**
* @name snanvariancetk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanvariancetk}
*/
setReadOnly( ns, 'snanvariancetk', require( './../../base/snanvariancetk' ) );

/**
* @name snanvariancewd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanvariancewd}
*/
setReadOnly( ns, 'snanvariancewd', require( './../../base/snanvariancewd' ) );

/**
* @name snanvarianceyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/snanvarianceyc}
*/
setReadOnly( ns, 'snanvarianceyc', require( './../../base/snanvarianceyc' ) );

/**
* @name srange
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/srange}
*/
setReadOnly( ns, 'srange', require( './../../base/srange' ) );

/**
* @name sstdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sstdev}
*/
setReadOnly( ns, 'sstdev', require( './../../base/sstdev' ) );

/**
* @name sstdevch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sstdevch}
*/
setReadOnly( ns, 'sstdevch', require( './../../base/sstdevch' ) );

/**
* @name sstdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sstdevpn}
*/
setReadOnly( ns, 'sstdevpn', require( './../../base/sstdevpn' ) );

/**
* @name sstdevtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sstdevtk}
*/
setReadOnly( ns, 'sstdevtk', require( './../../base/sstdevtk' ) );

/**
* @name sstdevwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sstdevwd}
*/
setReadOnly( ns, 'sstdevwd', require( './../../base/sstdevwd' ) );

/**
* @name sstdevyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/sstdevyc}
*/
setReadOnly( ns, 'sstdevyc', require( './../../base/sstdevyc' ) );

/**
* @name stdev
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/stdev}
*/
setReadOnly( ns, 'stdev', require( './../../base/stdev' ) );

/**
* @name stdevch
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/stdevch}
*/
setReadOnly( ns, 'stdevch', require( './../../base/stdevch' ) );

/**
* @name stdevpn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/stdevpn}
*/
setReadOnly( ns, 'stdevpn', require( './../../base/stdevpn' ) );

/**
* @name stdevtk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/stdevtk}
*/
setReadOnly( ns, 'stdevtk', require( './../../base/stdevtk' ) );

/**
* @name stdevwd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/stdevwd}
*/
setReadOnly( ns, 'stdevwd', require( './../../base/stdevwd' ) );

/**
* @name stdevyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/stdevyc}
*/
setReadOnly( ns, 'stdevyc', require( './../../base/stdevyc' ) );

/**
* @name svariance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/svariance}
*/
setReadOnly( ns, 'svariance', require( './../../base/svariance' ) );

/**
* @name svariancech
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/svariancech}
*/
setReadOnly( ns, 'svariancech', require( './../../base/svariancech' ) );

/**
* @name svariancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/svariancepn}
*/
setReadOnly( ns, 'svariancepn', require( './../../base/svariancepn' ) );

/**
* @name svariancetk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/svariancetk}
*/
setReadOnly( ns, 'svariancetk', require( './../../base/svariancetk' ) );

/**
* @name svariancewd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/svariancewd}
*/
setReadOnly( ns, 'svariancewd', require( './../../base/svariancewd' ) );

/**
* @name svarianceyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/svarianceyc}
*/
setReadOnly( ns, 'svarianceyc', require( './../../base/svarianceyc' ) );

/**
* @name variance
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/variance}
*/
setReadOnly( ns, 'variance', require( './../../base/variance' ) );

/**
* @name variancech
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/variancech}
*/
setReadOnly( ns, 'variancech', require( './../../base/variancech' ) );

/**
* @name variancepn
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/variancepn}
*/
setReadOnly( ns, 'variancepn', require( './../../base/variancepn' ) );

/**
* @name variancetk
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/variancetk}
*/
setReadOnly( ns, 'variancetk', require( './../../base/variancetk' ) );

/**
* @name variancewd
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/variancewd}
*/
setReadOnly( ns, 'variancewd', require( './../../base/variancewd' ) );

/**
* @name varianceyc
* @memberof ns
* @readonly
* @type {Function}
* @see {@link module:@stdlib/stats/base/varianceyc}
*/
setReadOnly( ns, 'varianceyc', require( './../../base/varianceyc' ) );


// EXPORTS //

module.exports = ns;
