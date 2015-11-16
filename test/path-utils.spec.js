var soneaUtils = require("..");

describe('SoneaUtils PathUtils', function () {
  describe('Method isAbsolute', function () {
    it('should return true for __dirname', function() {
      soneaUtils.PathUtils.isAbsolute(__dirname).should.be.ok;
    });
    it('should return false for ..', function() {
      soneaUtils.PathUtils.isAbsolute("..").should.not.be.ok;
    });
  });
});