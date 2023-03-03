if typeof require == 'function'
    should = require('should')
    compareVer = require('../index')
describe 'compareVer #sort', ->
    it 'compare 0', ->
        compareVer.sort(["1.7.2","1.7.1"])[0].should.equal("1.7.1")
        compareVer.sort(["1.8.0", "1.7.10"])[0].should.equal("1.7.10")

    it 'compare 1', ->
        compareVer.sort(["1.7.0", "1.7"])[1].should.equal("1.7.0")
        compareVer.sort(["1.8.0", "1.7"])[1].should.equal("1.8.0")

    it 'compare 2', ->
        compareVer.sort(["1.7.1","1.7.2"])[0].should.equal("1.7.1")
        compareVer.sort(["1.7.10","1.8.0"])[0].should.equal("1.7.10")

    it 'compare 3', ->
        compareVer.sort(["1.7", "1.7.0"])[1].should.equal("1.7.0")
        compareVer.sort(["1.7", "1.8.0"])[1].should.equal("1.8.0")

    it 'compare 4', ->
        res = compareVer.sort(["1.7.0.0","1.7","1.7.0","1.ab.8","1.70.0","1.9.0","1.8","1.8.0","1.90"])
        len = res.length

        res[0].should.equal("1.7")
        res[1].should.equal("1.7.0")
        res[2].should.equal("1.7.0.0")
        res[len - 2].should.equal("1.70.0")
        res[len - 1].should.equal("1.90")

    it 'compare 5', ->
        res = compareVer.sort()
        res.should.equal(false)

    it 'compare 6', ->
        res = compareVer.sort([])
        res.length.should.equal(0)
