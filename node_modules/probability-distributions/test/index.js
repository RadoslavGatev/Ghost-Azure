var chai = require('chai');
var expect = chai.expect;
var PD = require("../index")

// CONFIG
var repeat = 1000; // How many times to repeat some tests

describe("Test of entropy generation", function() {
    it('Set entropy to a low level', function() {
        for(var i=0; i<repeat; i++) {
            var lowEntropyRandom = PD.prng(1);
            var numb = lowEntropyRandom * 256;
            expect(numb).to.equal(Math.round(numb));
            expect(numb).to.be.above(-1);
            expect(numb).to.be.below(256);
        }
    });

    it('Generates a number between 0 and 1', function() {
        for(var i=0; i<repeat; i++) {
            expect(PD.prng()).to.be.above(0);
            expect(PD.prng()).to.be.below(1);
        }
    });

    it('Generates a number between 50 and 60', function() {
        var rn = PD.runif(repeat, 50, 60);
        rn.map(function(item) {
            expect(item).to.be.above(50);
            expect(item).to.be.below(60);
        })
    });
});

describe("Test of binomial distribution", function() {
    it('Generates whole numbers between 0 and max', function() {
        var rn = PD.rbinom(repeat, 6, 0.6);
        rn.map(function(item) {
            expect(item).to.equal(Math.round(item));
            expect(item).to.be.above(-1);
            expect(item).to.be.below(7);
        });

        // Try without optional parameters
        var rn = PD.rbinom(repeat);
        rn.map(function(item) {
            expect(item).to.equal(Math.round(item));
            expect(item).to.be.above(-1);
            expect(item).to.be.below(2);
        });
    });
});

describe("Test of exponential density function", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.dexp() }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD.dexp(0,0) }).to.throw("Parameter must be greater than 0");
        expect(function() { PD.dexp(0,-1) }).to.throw("Parameter must be greater than 0");
        expect(function() { PD.dexp("1") }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD.dexp("1") }).to.throw("A required parameter is missing or not a number");
    });

    it('Gives the correct information', function() {
        expect(PD.dexp(0)).to.equal(1);
        expect(PD.dexp(0,1)).to.equal(1);
        expect(PD.dexp(0,.2)).to.equal(.2);
        expect(PD.dexp(0,2.2)).to.equal(2.2);
        expect(PD.dexp(-1,2.2)).to.equal(0);
        expect(Math.round(10e6*PD.dexp(2,2))).to.equal(366313);
        expect(Math.round(10e6*PD.dexp(1,5.5))).to.equal(224772);
        expect(Math.round(10e6*PD.dexp(3.2,.3))).to.equal(1148679);
    });
});

describe("Test of random integer function", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.rint() }).to.throw("You must specify how many values you want");
        expect(function() { PD.rint(0,1,2) }).to.throw("The number of values must be a whole number of 1 or greater");
        expect(function() { PD.rint(1,1,1,false) }).to.throw("Minimum value cannot be greater than maximum value. For non-inclusive, minimum and maximum must be separated by at least 2.");
        expect(function() { PD.rint(1,1,2,false) }).to.throw("Minimum value cannot be greater than maximum value. For non-inclusive, minimum and maximum must be separated by at least 2.");
        expect(function() { PD.rint(1,1,2.1,false) }).to.throw("Parameter must be a whole number");
        expect(function() { PD.rint(1,1,-1) }).to.throw("Minimum value cannot be greater than maximum value. For non-inclusive, minimum and maximum must be separated by at least 2.");
    });

    it('Gives the correct information', function() {
        expect(PD.rint(1,0,0)[0]).to.equal(0);
        expect(PD.rint(2,1,3,false)[0]).to.equal(2);
        var rn = PD.rint(repeat, -1, 2);
        rn.map(function(item) {
            expect(item).to.be.above(-2);
            expect(item).to.be.below(3);
        })
        var rn = PD.rint(repeat, -1, 2, false);
        rn.map(function(item) {
            expect(item).to.be.above(-1);
            expect(item).to.be.below(2);
        })
    });
});


describe("Test of negative binomial distribution", function() {
    it('Generates whole numbers', function() {
        var rn = PD.rnbinom(repeat, 6, 0.7);
        rn.map(function(item) {
            expect(item).to.equal(Math.round(item));
            expect(item).to.be.above(-1);
        })

    });

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.rnbinom(1, 2.3 ,0.5) }).to.throw("Size must be a whole number");
        expect(function() { PD.rnbinom(1, 0, -1) } ).to.throw("Size must be one or greater");
        expect(function() { PD.rnbinom(1, 3, 0.5, 3) }).to.throw("You must specify probability or mean, not both");
        expect(function() { PD.rnbinom(1, 6, -1) }).to.throw("Probability values cannot be less than 0");
        expect(function() { PD.rnbinom(1, 6, 1.1) }).to.throw("Probability values cannot be greater than 1");
        expect(function() { PD.rnbinom(1, 6) }).to.throw("Probability value is missing or not a number");

    });
});

describe("Test of normal density function", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.dnorm() }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD.dnorm(1,0,-0.5) }).to.throw("Parameter cannot be less than 0");
        expect(function() { PD.dnorm(1,"this") }).to.throw("A required parameter is missing or not a number");
    });

    it('Gives the correct information', function() {
        expect(PD.dnorm(0,0,0)).to.equal(Infinity);
        expect(PD.dnorm(1,1,0)).to.equal(Infinity);
        expect(PD.dnorm(0,1,0)).to.equal(0);
        expect(Math.round(10e6*PD.dnorm(0))).to.equal(3989423);
        expect(Math.round(10e6*PD.dnorm(1))).to.equal(2419707);
        expect(Math.round(10e6*PD.dnorm(-1))).to.equal(2419707);
        expect(Math.round(10e6*PD.dnorm(1,1))).to.equal(3989423);
        expect(Math.round(10e6*PD.dnorm(1,1,1))).to.equal(3989423);
        expect(Math.round(10e6*PD.dnorm(1,1,2))).to.equal(1994711);
        expect(Math.round(10e6*PD.dnorm(1,-1,2))).to.equal(1209854);
        expect(Math.round(10e6*PD.dnorm(3,3,1))).to.equal(3989423);
    });
});


describe("Test of uniform density function", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.dunif() }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD.dunif(1,-1,-1.1) }).to.throw("Minimum value cannot be greater than maximum value");
    });

    it('Gives the correct information', function() {
        expect(PD.dunif(0,0,0)).to.equal(Infinity);
        expect(PD.dunif(1)).to.equal(1);
        expect(PD.dunif(3.1,-3,3)).to.equal(0);
        expect(PD.dunif(0.5,0.5,2.5)).to.equal(0.5);
    });
});



describe("Test of random word function", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.rword() }).to.throw("You must specify how many values you want");
        expect(function() { PD.rword(12, "") }).to.throw("Parameter must be at least one character long");
        expect(function() { PD.rword(12, 12) }).to.throw("A required parameter is missing or not a string");
        expect(function() { PD.rword(12, Infinity) }).to.throw("A required parameter is missing or not a string");
    });

    it('Gives the correct information', function() {
        expect(PD.rword(12,"a")).to.equal("aaaaaaaaaaaa");
        expect(PD.rword(5).length).to.equal(5);
        expect(PD.rword(50, "HT")).to.match(/^[HT]*$/);
    });
});


describe("Test of F-distribution", function() {
    it('Generates non-negative numbers', function() {
        var rn = PD.rf(repeat, 1, 1);
        rn.map(function(item) {
            expect(item).to.be.above(0);
        })

    });

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.rf(1, -1 ,3) }).to.throw("Parameter cannot be less than 0");
        expect(function() { PD.rf(1, 1 ,-3) }).to.throw("Parameter cannot be less than 0");
    });
});

describe("Test of sample function", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {
        expect(function() { PD.sample() }).to.throw("Expected an array of length 1 or greater");
        expect(function() { PD.sample([]) } ).to.throw("Expected an array of length 1 or greater");
        expect(function() { PD.sample([1,2,3], 4) } ).to.throw("You cannot select 4 items from an array of length 3 without replacement");
        expect(function() { PD.sample([1,2,3,4], 4, true, [1,1,-1,1]) } ).to.throw("Parameter cannot be less than 0");
        expect(function() { PD.sample([1,2,3], 4, true, [1,1,1,1]) } ).to.throw("Probabilities for sample must be same length as the array to sample from");

    });

    it('Returns the correct sample', function() {
        expect(PD.sample([3],1)[0]).to.equal(3);
        expect(PD.sample([3],1)[1]).to.equal(undefined);

        // Make sure arrays aren't messed with
        var things = [1,2,3,4];
        PD.sample(things, 2);
        expect(things.length).to.equal(4);


        for(var i=0; i<repeat; i++) {
            expect(PD.sample([1,2,3,4], 1, true, [0,0,0,0.3])[0]).to.equal(4);
        }
    })
});


describe("Test validation functions", function() {

    // Test to make sure throwing properly
    it('Throws errors on bad parameters', function() {

        // "a"
        expect(function() { PD._v(undefined, "a") }).to.throw("Expected an array of length 1 or greater");
        expect(function() { PD._v([], "a") }).to.throw("Expected an array of length 1 or greater");
        expect(function() { PD._v("fox", "a") }).to.throw("Expected an array of length 1 or greater");

        // "n"
        expect(function() { PD._v(undefined, "n") }).to.throw("You must specify how many values you want");
        expect(function() { PD._v("cheese", "n") }).to.throw("The number of values must be numeric");
        expect(function() { PD._v("7", "n") }).to.throw("The number of values must be numeric");
        expect(function() { PD._v(2.2, "n") }).to.throw("The number of values must be a whole number");
        expect(function() { PD._v(-1, "n") }).to.throw("The number of values must be a whole number of 1 or greater");
        expect(function() { PD._v(1/0, "n") }).to.throw("The number of values cannot be infinite ;-)");

        // "p"
        expect(function() { PD._v("george", "p") }).to.throw("Probability value is missing or not a number");
        expect(function() { PD._v(undefined, "p") }).to.throw("Probability value is missing or not a number");
        expect(function() { PD._v(-0.1, "p") }).to.throw("Probability values cannot be less than 0");
        expect(function() { PD._v(1/0, "p") }).to.throw("Probability values cannot be greater than 1");

        // "pos"
        expect(function() { PD._v(undefined, "pos") }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD._v(" ", "pos") }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD._v(-0.1, "pos") }).to.throw("Parameter must be greater than 0");
        expect(function() { PD._v(-10e6, "pos") }).to.throw("Parameter must be greater than 0");
        expect(function() { PD._v(0, "pos") }).to.throw("Parameter must be greater than 0");
        expect(function() { PD._v(1/0, "pos") }).to.throw("Sent 'infinity' as a parameter");

        // "r"
        expect(function() { PD._v(undefined, "r") }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD._v(1/0, "r") }).to.throw("Sent 'infinity' as a parameter");

        // "nn"
        expect(function() { PD._v(undefined, "nn") }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD._v(-0.2, "nn") }).to.throw("Parameter cannot be less than 0");
        expect(function() { PD._v(1/0, "nn") }).to.throw("Sent 'infinity' as a parameter");

        // "nni"
        expect(function() { PD._v(undefined, "nni") }).to.throw("A required parameter is missing or not a number");
        expect(function() { PD._v(23.4, "nni") }).to.throw("Parameter must be a whole number");
        expect(function() { PD._v(-0.2, "nni") }).to.throw("Parameter must be a whole number");
        expect(function() { PD._v(1/0, "nni") }).to.throw("Sent 'infinity' as a parameter");

    });

    it('Returns the parameter back if correct', function() {
        expect(PD._v(7, "n")).to.equal(7);
        expect(PD._v(undefined, "n", 5)).to.equal(5);
        expect(PD._v(undefined, "p", 0)).to.equal(0);
        expect(PD._v(undefined, "p", 1)).to.equal(1);
        expect(PD._v(0, "p")).to.equal(0);
        expect(PD._v(1, "p")).to.equal(1);
        expect(PD._v(.1, "p")).to.equal(.1);
        expect(PD._v(.1, "pos")).to.equal(.1);
        expect(PD._v(10, "pos")).to.equal(10);
        expect(PD._v(10e6, "pos")).to.equal(10e6);
        expect(PD._v(2.33333, "r")).to.equal(2.33333);
        expect(PD._v(-2.7, "r")).to.equal(-2.7);
        expect(PD._v(2, "nn")).to.equal(2);
        expect(PD._v(10e3, "nni")).to.equal(10000);

    })
});

// TODO: Implement NIST testing or similar
