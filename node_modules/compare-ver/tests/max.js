var compareVer, should;

if (typeof require === 'function') {
  should = require('should');
  compareVer = require('../index');
}

describe('compareVer #max', function() {
  it('compare 0', function() {
    compareVer.max(["1.7.2", "1.7.1"]).should.equal("1.7.2");
    compareVer.max(["1.8.0", "1.7.10"]).should.equal("1.8.0");
    return compareVer.max(["1.7.0", "1.8"]).should.equal("1.8");
  });
  it('compare 1', function() {
    compareVer.max(["1.7", 1.8]).should.equal("1.7");
    compareVer.max(["1.7.0", 1.8, "1.8"]).should.equal("1.8");
    return compareVer.max(["1.70", 1.70, "1.8"]).should.equal("1.70");
  });
  it('compare 2', function() {
    compareVer.max(["1.1", "1.01", "1.001", 1.1, 1.01]).should.equal("1.1");
    return compareVer.max(["1.0.1", "1.01", "1.001", 1.1, 1.01]).should.equal("1.01");
  });
  it('compare 4', function() {
    var res;
    res = compareVer.max(["1.7.0.0", "1.7", "1.7.0", "1.ab.8", "1.70.0", "1.8", "1.8.0", "1.9", "1.9.0"]);
    return res.should.equal("1.70.0");
  });
  it('compare 5', function() {
    return compareVer.max().should.equal(false);
  });
  return it('compare 6', function() {
    return compareVer.max([]).should.equal(false);
  });
});
