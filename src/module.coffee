log   = require('debug') 'sonea:utils:module'

exports.getMyCaller = ->
  try
    err = new Error
    Error.prepareStackTrace = (err, stack)->
      return stack

    currentfile = err.stack.shift().getFileName()
    while (err.stack.length)
      callerfile = err.stack.shift().getFileName()
      return __filename if callerfile is 'module.js'
      return callerfile if currentfile isnt callerfile
  catch e
    throw e

  return undefined;
