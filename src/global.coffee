_       = require 'lodash'
sprintf = require('sprintf-js').sprintf
log     = require('debug') 'sonea:utils:global'

exports.expose = (item, key, force=false) ->
  if global[key] and !force
    log 'Could not expose ' + key + '. Key is already in use.'
    return false
  log 'Expose ' + key
  global[key] = item

exports.exposeMany = (objects, format='%s') ->
  results = []
  for key of objects
    object = objects[key]
    if _.isFunction(format)
      results.push exports.expose(object, format(key))
    else
      results.push exports.expose(object, sprintf(format, key))
  results
