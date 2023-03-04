var compareVer, should;

if (typeof require === 'function') {
  should = require('should');
  compareVer = require('../index');
}

describe('compareVer #min', function() {
  it('compare 0', function() {
    compareVer.min(["1.7.2", "1.7.1"]).should.equal("1.7.1");
    compareVer.min(["1.8.0", "1.7.10"]).should.equal("1.7.10");
    return compareVer.min(["1.7.0", "1.8"]).should.equal("1.7.0");
  });
  it('compare 1', function() {
    compareVer.min(["1.7", 1.8]).should.equal("1.7");
    compareVer.min(["1.7.0", 1.8, "1.8"]).should.equal("1.7.0");
    return compareVer.min(["1.70", 1.70, "1.8"]).should.equal("1.8");
  });
  it('compare 2', function() {
    compareVer.min(["1.1", "1.01", "1.001", 1.1, 1.01]).should.equal("1.001");
    return compareVer.min(["1.0.1", "1.01", "1.001", 1.1, 1.01]).should.equal("1.0.1");
  });
  it('compare 4', function() {
    var res;
    res = compareVer.min(["1.7.0.0", "1.7", "1.7.0", "1.ab.8", "1.70.0", "1.8", "1.8.0", "1.9", "1.9.0"]);
    return res.should.equal("1.7");
  });
  it('compare 5', function() {
    return compareVer.min().should.equal(false);
  });
  return it('compare 6', function() {
    return compareVer.min([]).should.equal(false);
  });
});
