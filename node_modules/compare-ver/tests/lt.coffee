if typeof require == 'function'
    should = require('should')
    compareVer = require('../index')
describe 'compareVer #lt', ->
    it 'compare 0', ->
        compareVer.lt("1.7.2","1.7.1").should.equal(-1)
        compareVer.lt("1.7.10","1.7.1").should.equal(-1)
        compareVer.lt("1.8.0", "1.7.10").should.equal(-1)

    it 'compare 1', ->
        compareVer.lt("1.7.0", "1.7").should.equal(-1)
        compareVer.lt("1.8.0", "1.7").should.equal(-1)

    it 'compare 2', ->
        compareVer.lt("1.7", "1.7").should.equal(0)
        compareVer.lt("1.7.0", "1.7.0").should.equal(0)
        compareVer.lt("1.7.10", "1.7.10").should.equal(0)

    it 'compare 3', ->
        compareVer.lt("1.7.0.0", "1.7.0.0").should.equal(0)
        compareVer.lt("1.7.00", "1.7.00").should.equal(0)
        compareVer.lt("1.7.0", "1.7.00").should.equal(0)
        compareVer.lt("1.7.0", "1.7.000").should.equal(0)

    it 'compare 4', ->
        compareVer.lt("1.7.2", "1.7.10").should.equal(1)
        compareVer.lt("1.7.2", "1.7.10").should.equal(1)
        compareVer.lt("1.7.0.2", "1.7.0.10").should.equal(1)

    it 'compare 5', ->
        compareVer.lt("1.6", "1.6.10").should.equal(1)
        compareVer.lt("1.6.0", "1.6.10").should.equal(1)
        compareVer.lt("1.6.10", "1.6.10.0").should.equal(1)

    it 'fompare 6', ->
        compareVer.lt("1.7.1", "1.7.10").should.equal(1)
        compareVer.lt("1.7", "1.7.0").should.equal(1)
        compareVer.lt("1.7.001", "1.7.01").should.equal(1)

    it 'compare 7', ->
        compareVer.lt(1.00001, "1.7").should.equal(-2)
        compareVer.lt(1.00001, 1.00002).should.equal(-2)
        compareVer.lt("1.7", 1.00001).should.equal(-2)

    it 'compare 8', ->
        compareVer.lt("1.7.a", "1.7").should.equal(-3)
        compareVer.lt("1.b.0", "1.7").should.equal(-3)
        compareVer.lt('sdsads', "1.7").should.equal(-3)
        compareVer.lt("1.7", "1.7.a").should.equal(-3)
        compareVer.lt("1.7", "1.b").should.equal(-3)
        compareVer.lt("1.7", 'sdsads').should.equal(-3)

    it 'compare 9', ->
        compareVer.lt().should.equal(-100)
        compareVer.lt("1.7.1").should.equal(-100)
        compareVer.lt("1.7.1","1.7.1","1.7.1").should.equal(-100)

    it 'compare 10', ->
        compareVer.lt("1.07", "1.7").should.equal(1)
        compareVer.lt("1.007", "1.07").should.equal(1)
        compareVer.lt("1.0.07", "1.0.7").should.equal(1)

    it 'compare 11',->
        compareVer.lt("01.0.7", "1.0.7").should.equal(0)
        compareVer.lt("1.0.7", "01.0.7").should.equal(0)
