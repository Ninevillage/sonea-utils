var utils = require("..");

describe('SoneaUtils path', function () {
  describe('Method isAbsolute', function () {
    it('should return true for __dirname', function() {
      utils.path.isAbsolute(__dirname).should.be.ok;
    });
    it('should return false for ..', function() {
      utils.path.isAbsolute("..").should.not.be.ok;
    });
  });
});
