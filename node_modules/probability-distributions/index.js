/* ================================================================
 * probability-distributions by Matt Asher (me[at]mattasher.com)
 * Originally created for StatisticsBlog.com
 *
 * first created at : Sat Oct 10 2015
 *
 * ================================================================
 * Copyright 2015 Matt Asher
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

var crypto = require('crypto');

// Shortcuts
var exp = Math.exp;
var ln = Math.log;
var PI = Math.PI;
var pow = Math.pow;

module.exports = {

    /**
     * This is the core function for generating entropy
     *
     * @param len number of bytes of entropy to create
     * @returns {number} A pseduo random number between 0 and 1
     *
     */
    prng: function(len) {
        if(len === undefined) len=16;

        var entropy = crypto.randomBytes(len);
        var result = 0;

        for(var i=0; i<len; i++) {
            result = result + Number(entropy[i])/Math.pow(256,(i+1))
        }
        return result
    },




    /**
     *
     * @param n The number of random variates to create. Must be a positive integer.
     * @param alpha First shape parameter
     * @param beta Second shape parameter
     * @param loc Location or Non-centrality parameter
     */
    rbeta: function(n, alpha, beta, loc) {
        // Uses relationship with gamma to calculate

        // Validations
        n = this._v(n, "n");
        alpha = this._v(alpha, "nn", 1);
        beta = this._v(beta, "nn", 1);
        loc =  this._v(loc, "r", 0);

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var g1 = this.rgamma(1, alpha, 1)[0];
            var g2 = this.rgamma(1, beta, 1)[0];


            toReturn[i] = loc + g1/(g1+g2);
        }
        return toReturn

    },


    /**
     *
     * @param n Number of variates to return.
     * @param size Number of Bernoulli trials to be summed up. Defaults to 1
     * @param p Probability of a "success". Defaults to 0.5
     * @returns {Array} Random variates array
     */
    rbinom: function(n, size, p) {
        n = this._v(n, "n");
        size = this._v(size, "nni", 1);
        p = this._v(p, "p", 0.5);

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var result = 0;
            for(var j=0; j<size; j++) {
                if(this.prng() < p) {
                    result++
                }
            }
            toReturn[i] = result;
        }
        return toReturn
    },


    /**
     *
     * @param n The number of variates to create
     * @param loc Location parameter
     * @param scale Scale parameter
     * @returns {Array} Random variates array
     */
    rcauchy: function(n, loc, scale) {
        n = this._v(n, "n");
        loc = this._v(loc, "r", 0);
        scale = this._v(scale, "nn", 1);

        var toReturn = [];
        for(var i=0; i<n; i++) {
            var x = scale * Math.tan(PI * (this.prng()-0.5))+loc;

            toReturn[i] = x;
        }

        return toReturn
    },

    /**
     *
     * @param n The number of variates to create
     * @param df Degrees of freedom for the distribution
     * @param ncp Non-centrality parameter
     * @returns {Array} Random variates array
     */
    rchisq: function(n, df, ncp) {
        n = this._v(n, "n");
        df = this._v(df, "nn");
        ncp = this._v(ncp, "r", 0);

        var toReturn = [];
        for(var i=0; i<n; i++) {
            // Start at ncp
            var x = ncp;
            for(var j=0; j<df; j++) {
                x = x + Math.pow(this.rnorm(1)[0],2);
            }
            toReturn[i] = x;
        }
        return toReturn
    },

    /**
     *
     * @param x Where to sample the density
     * @param rate The rate parameter. Must be a positive number
     * @returns {Number} The density given the parameter values
     */
    dexp: function(x, rate) {
        x = this._v(x, "r");
        rate = this._v(rate, "pos", 1);
        if(x < 0) return 0

        return rate * exp(-rate * x)
    },

    /**
     *
     * @param n The number of random variates to create. Must be a positive integer.
     * @param rate The rate parameter. Must be a positive number
     */
    rexp: function(n, rate) {
        n = this._v(n, "n");
        rate = this._v(rate, "pos", 1);

        var toReturn = [];

        for(var i=0; i<n; i++) {

            toReturn[i] =  -ln(this.prng())/rate;
        }

        return toReturn
    },

    /**
     *
     * @param n The number of variates to create
     * @param df1 Degrees of freedom for the first parameter
     * @param df2 Degrees of freedom for the first parameter
     * @returns {Array} Random variates array
     */
    rf: function(n, df1, df2) {
        n = this._v(n, "n");
        df1 = this._v(df1, "nn");
        df2 = this._v(df2, "nn");

        var toReturn = [];
        for(var i=0; i<n; i++) {
            var num = this.rchisq(1, df1)[0]/df1;
            var denom = this.rchisq(1, df2)[0]/df2;

            toReturn[i] = num/denom;
        }

        return toReturn

    },


    /**
     *
     * @param n The number of random variates to create. Must be a positive integer
     * @param alpha
     * @param rate
     * @returns {Array} Random variates array
     */
    rgamma: function(n, alpha, rate) {
        // Adapted from https://github.com/mvarshney/simjs-source/ & scipy
        n = this._v(n, "n");
        alpha = this._v(alpha, "nn");
        rate = this._v(rate, "pos", 1);

        var LOG4 = ln(4.0);
        var SG_MAGICCONST = 1.0 + ln(4.5);
        var beta = 1/rate;

        var toReturn = [];
        for(var i = 0; i<n; i++) {

            /* Based on Python 2.6 source code of random.py.
             */

            if (alpha > 1.0) {
                var ainv = Math.sqrt(2.0 * alpha - 1.0);
                var bbb = alpha - LOG4;
                var ccc = alpha + ainv;

                while (true) {
                    var u1 = this.prng();
                    if ((u1 < 1e-7) || (u > 0.9999999)) {
                        continue;
                    }
                    var u2 = 1.0 - this.prng();
                    var v = ln(u1 / (1.0 - u1)) / ainv;
                    var x = alpha * exp(v);
                    var z = u1 * u1 * u2;
                    var r = bbb + ccc * v - x;
                    if ((r + SG_MAGICCONST - 4.5 * z >= 0.0) || (r >= ln(z))) {
                        var result = x * beta;
                        break;
                    }
                }
            } else if (alpha == 1.0) {
                var u = this.prng();
                while (u <= 1e-7) {
                    u = this.prng();
                }
                var result = - ln(u) * beta;
            } else {
                while (true) {
                    var u = this.prng();
                    var b = (Math.E + alpha) / Math.E;
                    var p = b * u;
                    if (p <= 1.0) {
                        var x = Math.pow(p, 1.0 / alpha);
                    } else {
                        var x = - ln((b - p) / alpha);
                    }
                    var u1 = this.prng();
                    if (p > 1.0) {
                        if (u1 <= Math.pow(x, (alpha - 1.0))) {
                            break;
                        }
                    } else if (u1 <= exp(-x)) {
                        break;
                    }
                }
                var result =  x * beta;
            }

            toReturn[i] = result;
        }

        return toReturn;

    },


    /**
     *
     * @param n The number of random variates to create. Must be a positive integer
     * @param min Minimum value
     * @param max Maximum value
     * @param inclusive By default the minimum and maximum are inclusive. To make exclusive, set to false
     * @returns {Array}
     */
    rint: function(n, min, max, inclusive) {
        n = this._v(n, "n");
        min = this._v(min, "int");
        max = this._v(max, "int");
        if(inclusive === false) {
            min++;
            if(min === max) throw new Error("Minimum value cannot be greater than maximum value. For non-inclusive, minimum and maximum must be separated by at least 2.");
        } else {
            max++
        }

        if(min > max) throw new Error("Minimum value cannot be greater than maximum value. For non-inclusive, minimum and maximum must be separated by at least 2.");

        var toReturn = [];

        var raw = this.runif(n, min, max);

        for(var i=0; i<n; i++) {
            toReturn[i] = Math.floor(raw[i]);
        }

        return toReturn
    },

    // Syntax as in R library VGAM
    /**
     *
     * @param n The number of random variates to create. Must be a positive integer
     * @param loc Mean
     * @param scale Scale parameter
     * @returns {Array} Random variates array
     */
    rlaplace: function(n, loc, scale) {
        n = this._v(n, "n");
        loc = this._v(loc, "r", 0);
        scale = this._v(scale, "nn", 1);

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var core = this.sample([-1,1])[0] * ln(this.prng());

            var x = loc - scale * core;

            toReturn[i] = x;
        }

        return toReturn
    },


    /**
     *
     * @param n The number of random variates to create. Must be a positive integer.
     * @param meanlog The mean log.
     * @param sdlog Log SD. Must be greater than 0.
     * @returns {Array} Random variates array
     */
    rlnorm: function(n, meanlog, sdlog) {
        n = this._v(n, "n");
        meanlog = this._v(meanlog, "r", 0);
        sdlog = this._v(sdlog, "nn", 1);

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var x = this.rnorm(1, meanlog, sdlog)[0];

            toReturn[i] = exp(x);
        }

        return toReturn
    },

    /**
     *
     * @param n The number of random variates to create. Must be a positive integer.
     * @param size Number of hits required
     * @param p Hit probability
     * @param mu Optional way to specify hit probability
     * @returns {Array} Random variates array
     */
    rnbinom: function(n, size, p, mu) {
        n = this._v(n, "n");
        if(size === undefined) size=1;
        if(Math.round(size) != size) throw new Error("Size must be a whole number");
        if(size < 1) throw new Error("Size must be one or greater");
        if(p !== undefined && mu !== undefined) throw new Error("You must specify probability or mean, not both");
        if(mu !== undefined) p = size/(size+mu);
        p = this._v(p, "p");


        var toReturn = [];

        for(var i=0; i<n; i++) {

            // Core distribution
            var result = 0;
            var leftToFind = size;
            while(leftToFind > 0) {
                result++;
                if(this.prng() < p) leftToFind--;
            }

            toReturn[i] = result - 1;
        }

        return toReturn

    },

    /**
     *
     * @param x Where to sample the density
     * @param mean Mean of the distribution
     * @param sd Standard deviation for the distribution
     * @returns {Number} The density given the parameter values
     */
    dnorm: function(x, mean, sd) {
        x = this._v(x, "r");
        mean = this._v(mean, "r", 0);
        sd = this._v(sd, "nn", 1);

        // Check for degeneracy
        if(sd === 0) {
            if(x === mean) return Infinity;
            return 0
        }

        var a = sd*(Math.sqrt(2*PI));
        var b = -(x-mean)*(x-mean);
        var c = 2*sd*sd;

        return (1/a)*exp(b/c)
    },


    /**
     *
     * @param n The number of random variates to create. Must be a positive integer.
     * @param mean Mean of the distribution
     * @param sd Standard Deviation of the distribution
     * @returns {Array} Random variates array
     */
    rnorm: function(n, mean, sd) {
        // Adapted from http://blog.yjl.im/2010/09/simulating-normal-random-variable-using.html

        n = this._v(n, "n");
        mean = this._v(mean, "r", 0);
        sd = this._v(sd, "nn", 1);

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var V1, V2, S, X;

            do {
                var U1 = this.prng();
                var U2 = this.prng();
                V1 = (2 * U1) - 1;
                V2 = (2 * U2) - 1;
                S = (V1 * V1) + (V2 * V2);
            } while (S > 1);

            X = Math.sqrt(-2 * ln(S) / S) * V1;
            X = mean + sd * X;
            toReturn.push(X);
        }

        return toReturn
    },


    /**
     *
     * @param x Where to sample the density
     * @param lambda Mean/variance
     * @returns {Number} The density given the parameter values
     */
    dpois: function(x, lambda) {
        x = this._v(x, "nni");
        lambda = this._v(lambda, "nn");

        // Check for degeneracy
        if(lambda === 0) {
            if(x === 0) return 1;
            return 0
        }

        var a = pow(lambda, x);
        var b = exp(-lambda);
        var c = this._factorial(x);

        return a*b/c
    },


    /**
     *
     * @param n The number of random variates to create. Must be a positive integer.
     * @param lambda Mean/Variance of the distribution
     * @returns {Array} Random variates array
     */
    rpois: function(n, lambda) {
        n = this._v(n, "n");
        lambda = this._v(lambda, "pos");

        var toReturn = [];

        for(var i=0; i<n; i++) {

            // Adapted from http://wiki.q-researchsoftware.com/wiki/How_to_Generate_Random_Numbers:_Poisson_Distribution
            if (lambda < 30) {

                var L = exp(-lambda);
                var p = 1;
                var k = 0;
                do {
                    k++;
                    p *= this.prng();
                } while (p > L);
                toReturn.push(k - 1);

            } else {

                // Roll our own
                // Fix total number of samples
                var samples = 10000;
                var p = lambda/samples;
                var k = 0;
                for(var j=0; j<samples; j++) {
                    if(this.prng() < p) {
                        k++
                    }
                }
                toReturn[i] = k;
            }
        }

        return toReturn
    },

    /**
     * Density function for uniform distribution
     *
     * @param x Location to get density for
     * @param min {number} Minimum value
     * @param max {number} Maximum value
     * @returns {number} Density of the function given the location and parameters
     */
    dunif: function(x, min, max) {
        x = this._v(x, "r");
        min = this._v(min, "r", 0);
        max = this._v(max, "r", 1);
        if(min > max) throw new Error("Minimum value cannot be greater than maximum value");

        if(x < min || x > max) return 0;
        if(min === max) return Infinity;


        return 1/(max-min);
    },


    /**
     *
     * @param n  Number of variates to return
     * @param min Lower bound
     * @param max Upper bound
     * @returns {Array} Random variates array
     */
    runif: function(n, min, max) {
        n = this._v(n, "n");
        min = this._v(min, "r", 0);
        max = this._v(max, "r", 1);
        if(min > max) throw new Error("Minimum value cannot be greater than maximum value");

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var raw = this.prng();
            var scaled = min + raw*(max-min);
            toReturn.push(scaled)
        }
        return toReturn
    },

    /**
     * Generate a random word of specified length using library of characters. Uses English alphabet if no library is specified
     * @param len Number of letters in this word
     * @param {string} alphabet to use
     * @returns {string} String of randomly selected characters from the alphabet
     */
    rword: function(len, alphabet) {
        len = this._v(len, "n");
        alphabet = this._v(alphabet, "str", "abcdefghijklmnopqrstuvwxyz");

        var lib = alphabet.split("");
        var arr = this.sample(lib, len, true);

        return arr.join("");
    },


    /**
     *
     * @param collection Array of items to sample from
     * @param n Number of items to sample. If missing, n will be set to the length of the collection and it will shuffle
     * @param replace Sample with replacement? False by default
     * @param ratios Ratios to weight items. Can be any non-negative number. By default all items are given equal weight
     * @returns {Array} Array of sampled items
     */
    sample: function(collection, n, replace, ratios) {

        // Validations
        collection = this._v(collection, "a");
        n = this._v(n, "n", collection.length); // If n is undefined, sample the full array
        if(replace === undefined) replace = false;
        if(!replace && collection.length < n)
            throw new Error("You cannot select " + n + " items from an array of length " + collection.length + " without replacement");

        if(ratios === undefined) {
            ratios = [];
            for(var m=0; m<collection.length; m++) { ratios[m] = 1 }
        }

        var cumulativeProbs = this._getCumulativeProbs(ratios, collection.length);

        // Main loop
        var toReturn = [];

        for(var i=0; i<n; i++) {

            var chosen = this._sampleOneIndex(cumulativeProbs);

            if(replace) {
                toReturn[i] = collection[chosen];
            } else {

                // Remove from collection and ratios
                toReturn[i] = collection.splice(chosen, 1)[0];
                ratios.splice(chosen, 1);

                // Make sure we aren't at the end
                if(ratios.length) {
                    cumulativeProbs = this._getCumulativeProbs(ratios, collection.length);
                }
            }
        }

        return toReturn;

    },


    /**
     *
     * @param data Array of data to display
     * @param domID String ID of the DOM element to use for display. This must ALREADY exist on your page
     * @param options Object see below for details
     *
     * IMPORTANT: This is not a "pure" function, it takes a DOM element ID as an argument and modifies (completely overwrites)
     * that element.
     *
     * IMPORTANT 2: options.conditions are eval'd so don't send untrusted code sent to this function!
     *
     */
    visualize: function(data, domID, options) {
        var defaultOptions = {
            lag: 1000, // Timing multiplier in milliseconds
            blank: "", // What to show when no number is shown
            inf: "&infin;", // Symbol to indicate infinity
            loop: true, // When done, start again at beginning at end of array
            conditions: "", // This is eval'd and checked against true. Example, "x > 3 && x < 10". Use "x" as the variable.
            arrivalTimes: false,
            arrivalSymbol: '<span class="pd-arrival">&#8226;</span>',
            arrivalFlashTime: 0.25,
            significantDigits: 0 // 0 will show as many as JS provides, or choose a number to limit
        }

        if(typeof options === "undefined") options = {}

        // Merge defaultOptions with user options favoring user options
        for (var property in defaultOptions) {
            if (defaultOptions.hasOwnProperty(property)) {
                if(typeof options[property] === "undefined") {
                    options[property] = defaultOptions[property];
                }
            }
        }

        // Elem is a DOM element to output to
        var elem = document.getElementById(domID);
        if(!elem) throw new Error("Unable to find DOM element " + domID);

        var len = data.length, i = 0;

        var format = function(x) {
            var x = data[i];

            // Are we showing only certain things
            if(options.conditions) {

                // Check for only allowed characters, this is NOT complete security
                if(!/^[x\&\|=0-9\<\>\s\-\.]+$/.test(options.conditions)) throw new Error("Bad input sent to options.conditions");

                if (eval(options.conditions) !== true) {
                    x = options.blank;
                    return x
                }
            }

            if(options.significantDigits) {
                x = x.toPrecision(options.significantDigits)
            }

            if(x === Infinity) {
                x = options.inf;
            }
            return x;
        }


        if(options.arrivalTimes) {
            var blankOut = function() {
                setTimeout(function() {
                    elem.innerHTML = options.blank;
                }, options.arrivalFlashTime*options.lag);
            }

            var cycle = function() {

                elem.innerHTML = options.arrivalSymbol;
                blankOut();
                if(++i === len) i = 0;

                if(options.loop || i !== 0) {
                    setTimeout(cycle, data[i]*options.lag)
                } else {
                    // End on a blank
                    elem.innerHTML = options.blank;
                }
            }
            cycle();

        } else {
            var update = function() {
                // Main vis for non-arrival numbers

                elem.innerHTML = format(data[i]);
                if(++i === len) i = 0;

                if(options.loop || i !== 0) {
                    setTimeout(update, options.lag)
                } else {
                    // End on a blank
                    setTimeout(function() { elem.innerHTML = options.blank }, options.lag)

                }
            }
            update();
        }
    },


    // HELPERS

    /**
     *
     * @param ratios Array of non-negative numbers to be turned into CDF
     * @param len length of the collection
     * @returns {Array}
     * @private
     */
    _getCumulativeProbs: function(ratios, len) {
        if(len === undefined) throw new Error("An error occurred: len was not sent to _getCumulativeProbs");
        if(ratios.length !== len) throw new Error("Probabilities for sample must be same length as the array to sample from");

        var toReturn = [];

        if(ratios !== undefined) {
            ratios = this._v(ratios, "a");
            if(ratios.length !== len) throw new Error("Probabilities array must be the same length as the array you are sampling from");

            var sum = 0;
            ratios.map(function(ratio) {
                ratio = this._v(ratio, "nn"); // Note validating as ANY non-negative number
                sum+= ratio;
                toReturn.push(sum);
            }.bind(this));

            // Divide by total to normalize
            for(var k=0; k<toReturn.length; k++) { toReturn[k] = toReturn[k]/sum }
            return toReturn
        }
    },

    _sampleOneIndex: function(cumulativeProbs) {

        var toTake = this.prng();

        // Find out where this lands in weights
        var cur = 0;
        while(toTake > cumulativeProbs[cur]) cur++;

        return cur;
    },

    _factorial: function(n) {
        var toReturn=1;
        for (var i = 2; i <= n; i++)
            toReturn = toReturn * i;

        return toReturn;
    },

    // Return default if undefined, otherwise validate
    // Return a COPY of the validated parameter
    _v: function(param, type, defaultParam) {
        if(param == null && defaultParam != null)
            return defaultParam;

        switch(type) {

            // Array of 1 item or more
            case "a":
                if(!Array.isArray(param) || !param.length) throw new Error("Expected an array of length 1 or greater");
                return param.slice(0);

            // Integer
            case "int":
                if(param !== Number(param)) throw new Error("A required parameter is missing or not a number");
                if(param !== Math.round(param)) throw new Error("Parameter must be a whole number");
                if(param === Infinity) throw new Error("Sent 'infinity' as a parameter");
                return param;

            // Natural number
            case "n":
                if(param === undefined) throw new Error("You must specify how many values you want");
                if(param !== Number(param)) throw new Error("The number of values must be numeric");
                if(param !== Math.round(param)) throw new Error("The number of values must be a whole number");
                if(param < 1) throw new Error("The number of values must be a whole number of 1 or greater");
                if(param === Infinity) throw new Error("The number of values cannot be infinite ;-)");
                return param;

            // Valid probability
            case "p":
                if(Number(param) !== param) throw new Error("Probability value is missing or not a number");
                if(param > 1) throw new Error("Probability values cannot be greater than 1");
                if(param < 0) throw new Error("Probability values cannot be less than 0");
                return param;

            // Positive numbers
            case "pos":
                if(Number(param) !== param) throw new Error("A required parameter is missing or not a number");
                if(param <= 0) throw new Error("Parameter must be greater than 0");
                if(param === Infinity) throw new Error("Sent 'infinity' as a parameter");
                return param;

            // Look for numbers (reals)
            case "r":
                if(Number(param) !== param) throw new Error("A required parameter is missing or not a number");
                if(param === Infinity) throw new Error("Sent 'infinity' as a parameter");
                return param;

            // Non negative real number
            case "nn":
                if(param !== Number(param)) throw new Error("A required parameter is missing or not a number");
                if(param < 0) throw new Error("Parameter cannot be less than 0");
                if(param === Infinity) throw new Error("Sent 'infinity' as a parameter");
                return param;

            // Non negative whole number (integer)
            case "nni":
                if(param !== Number(param)) throw new Error("A required parameter is missing or not a number");
                if(param !== Math.round(param)) throw new Error("Parameter must be a whole number");
                if(param < 0) throw new Error("Parameter cannot be less than zero");
                if(param === Infinity) throw new Error("Sent 'infinity' as a parameter");
                return param;

            // Non-empty string
            case "str":
                if(param !== String(param)) throw new Error("A required parameter is missing or not a string");
                if(param.length === 0) throw new Error("Parameter must be at least one character long");
                return param;


        }
    },




    //    ________   _______  ______ _____  _____ __  __ ______ _   _ _______       _
    //   |  ____\ \ / /  __ \|  ____|  __ \|_   _|  \/  |  ____| \ | |__   __|/\   | |
    //   | |__   \ V /| |__) | |__  | |__) | | | | \  / | |__  |  \| |  | |  /  \  | |
    //   |  __|   > < |  ___/|  __| |  _  /  | | | |\/| |  __| | . ` |  | | / /\ \ | |
    //   | |____ / . \| |    | |____| | \ \ _| |_| |  | | |____| |\  |  | |/ ____ \| |____
    //   |______/_/ \_\_|    |______|_|  \_\_____|_|  |_|______|_| \_|  |_/_/    \_\______|

    /**
     *
     * @param n Number of variates to return
     * @param loc Starting point. Must be a non-negative integer. 0 for degenerate distribution of 0.
     * @param p Probability of moving towards finish
     * @param cap Maximum steps before giving up
     * @param trace Variable to track progress
     * @returns {Array} Random variates array
     *
     * The FML distribution is a is based on the number of steps taken to return to the origin
     * from a given position, with transition probabilities set at the beginning by picking a
     * random variate from U(0,1).
     */
    rfml: function (n, loc, p, cap, trace) {
        n = this._v(n, "n");
        loc = this._v(loc, "nni", 1);
        if(p === undefined) p=this.prng;
        cap = this._v(cap, "n", 10000);
        if(trace === undefined) trace={};

        var toReturn = [];

        for(var i=0; i<n; i++) {
            var x = 0;
            var s = loc;
            var currP = p();
            if(loc === 0) {

                toReturn[i] = 0;
            } else {

                do {

                    var trial = this.prng();
                    if(trial < currP) {
                        s++;
                        trace[String(i) + "_" + String(x)] = { problems: s, p: currP, result: 1 }
                    } else {
                        s--;
                        trace[String(i) + "_" + String(x)] = { problems: s, p: currP, result: -1 }
                    }
                    x++
                } while(s > 0 && x < cap);

                if(x === cap) x = -1; // Indicate we failed to do it in time.
                toReturn[i] = x;
            }
        }
        return toReturn
    },

    // http://www.statisticsblog.com/2013/05/uncovering-the-unreliable-friend-distribution-a-case-study-in-the-limits-of-mc-methods/
    /**
     *
     * The Unrelaible Friend distribution
     * @param n
     * @returns {Array} Random variates array
     */
    ruf: function(n) {
        n = this._v(n, "n");

        var toReturn = [];

        for(var i=0; i<n; i++) {
            toReturn[i] = this.rexp(1, this.prng())[0];
        }

        return toReturn
    }
};

// TODO: Add "perfect fake" functions: http://www.statisticsblog.com/2010/06/the-perfect-fake/
// NOTES
// Potential config options:
// default entropy amount
// Need pathway to make ready for secure applications (NIST/diehard?)
// Always return a vector unless number is 1? This could be config option or put "1" at end of fcn to get 1 only
// Separate out core random variate creation from number to create loop
// TODO: To test out quality of randomness, stub in specific values for this.prng and make sure correct stuff is returned.