var utils = require("..");
var debug = require('debug');

describe('SoneaUtils debug', function () {
  it('should reference the debug module', function() {
    utils.debug.should.a.Function;
    utils.debug.should.be.eql(debug);
  });

  describe('Method setupLogger', function () {
    it('should return an debug logger', function() {
      var log = utils.debug.setupLogger("test");
      log.should.be.a.Function;
      log.namespace.should.be.eql("test");
    });
    it('should return an debug logger with method to create sublogger', function() {
      var subLog = utils.debug.setupLogger("test").newLogger("sub");
      subLog.should.be.a.Function;
      subLog.namespace.should.be.eql("test:sub");
    });
  });
});
