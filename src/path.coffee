path  = require 'path'
log   = require('debug') 'sonea:utils:path'

exports.isAbsolute = (p) ->
  path.normalize(p + '/') is path.normalize(path.resolve(p) + '/')
