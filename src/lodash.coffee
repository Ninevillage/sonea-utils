_   = require 'lodash'
log = require('debug') 'sonea:utils:lodash'

exports._ = _

exports.defaultAssign = _.partialRight _.assign, (value, other) ->
  if _.isUndefined(value) then other else value
