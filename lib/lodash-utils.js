var _ = require('lodash');

exports._ = _;

exports.defaultAssign = _.partialRight(_.assign, function(value, other) {
  if (_.isUndefined(value)) {
    return other;
  } else {
    return value;
  }
});
