var compareVer, should;

if (typeof require === 'function') {
  should = require('should');
  compareVer = require('../index');
}

describe('compareVer #sort', function() {
  it('compare 0', function() {
    compareVer.sort(["1.7.2", "1.7.1"])[0].should.equal("1.7.1");
    return compareVer.sort(["1.8.0", "1.7.10"])[0].should.equal("1.7.10");
  });
  it('compare 1', function() {
    compareVer.sort(["1.7.0", "1.7"])[1].should.equal("1.7.0");
    return compareVer.sort(["1.8.0", "1.7"])[1].should.equal("1.8.0");
  });
  it('compare 2', function() {
    compareVer.sort(["1.7.1", "1.7.2"])[0].should.equal("1.7.1");
    return compareVer.sort(["1.7.10", "1.8.0"])[0].should.equal("1.7.10");
  });
  it('compare 3', function() {
    compareVer.sort(["1.7", "1.7.0"])[1].should.equal("1.7.0");
    return compareVer.sort(["1.7", "1.8.0"])[1].should.equal("1.8.0");
  });
  it('compare 4', function() {
    var len, res;
    res = compareVer.sort(["1.7.0.0", "1.7", "1.7.0", "1.ab.8", "1.70.0", "1.9.0", "1.8", "1.8.0", "1.90"]);
    len = res.length;
    res[0].should.equal("1.7");
    res[1].should.equal("1.7.0");
    res[2].should.equal("1.7.0.0");
    res[len - 2].should.equal("1.70.0");
    return res[len - 1].should.equal("1.90");
  });
  it('compare 5', function() {
    var res;
    res = compareVer.sort();
    return res.should.equal(false);
  });
  return it('compare 6', function() {
    var res;
    res = compareVer.sort([]);
    return res.length.should.equal(0);
  });
});
