var debug = require('debug');

exports = module.exports = debug;

exports.setupLogger = function(mainLoggerName) {
  var log = debug(mainLoggerName);
  log.newLogger = function(subLoggerName) {
    return module.exports.setupLogger(mainLoggerName+":"+subLoggerName);
  };
  return log;
};
