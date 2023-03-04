if typeof require == 'function'
    should = require('should')
    compareVer = require('../index')
describe 'compareVer #clean', ->
    it 'compare 0', ->
        res = compareVer.clean(["1.7.2","1.7.1"])
        res[0].should.equal("1.7.2")
        res[1].should.equal("1.7.1")

    it 'compare 2', ->
        res = compareVer.clean ['dfdsfd','1.0.1']
        res.length.should.equal(1)
        res[0].should.equal('1.0.1')

    it 'compare 3', ->
        res = compareVer.clean ['1.1','dfdsfd',12121,'1.0.1']
        res.length.should.equal(2)
        res[0].should.equal('1.1')
        res[1].should.equal('1.0.1')

    it 'compare 4', ->
        res = compareVer.clean([1.7,"1.7.0",1.8,"1.7","1.ab.8","1.8.0","1.8","1.9.0","1.90",1.90])
        len = res.length
        len.should.equal(6)
        res[0].should.equal("1.7.0")
        res[1].should.equal("1.7")
        res[2].should.equal("1.8.0")
        res[len - 1].should.equal("1.90")

    it 'compare 5', ->
        res = compareVer.clean()
        res.should.equal(false)

    it 'compare 6', ->
        res = compareVer.clean([])
        res.length.should.equal(0)
