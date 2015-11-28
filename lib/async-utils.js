var async = require('async');

exports.async = async;

exports.wrap = function(fn) {
  return function(done) {
    fn(done);
  };
};
