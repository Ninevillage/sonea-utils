fs    = require 'fs'
path  = require 'path'
_     = require 'lodash'

log   = require('debug') 'sonea:utils:file'

exports.checkPath = (searchPath, extensions) ->
  if extensions
    for ext of extensions
      extPath = path.join(searchPath, ext)
      return extPath if fs.existsSync(extPath)
    return false

  if fs.existsSync(searchPath) then searchPath else false

exports.findInPath = (searchPath, config, currentDepth) ->
  _this = this
  foundFiles = {}
  # Check Path - log warn and return empty if not exists
  if !exports.checkPath(searchPath)
    log 'findInPath failed. %s not exists', searchPath
    return foundFiles
  # check config attribute
  if !_.isPlainObject(config)
    config = {}
  if _.isUndefined(currentDepth) or _.isNaN(currentDepth)
    currentDepth = 0
  # setup default config
  defaultConfig =
    recursive: false
    matcher: exports.Matcher.withoutDirectories
    depth: -1
    excludes: [
      '.keep'
      '.gitignore'
    ]
  # merge defaultConfig with config
  config = _.merge({}, defaultConfig, config)
  # read searchPath and iterate through files
  fs.readdirSync(searchPath).forEach (file) ->
    fileObj = {}
    fileObj.name = file
    fileObj.path = path.resolve(searchPath, file)
    fileObj.stats = fs.lstatSync(fileObj.path)
    fileObj.extname = path.extname(file)
    fileObj.basename = path.basename(file, fileObj.extname)
    # if it is a directory and config recursive is true, make
    # deep search (but check currentDepth to config.depth)
    if fileObj.stats.isDirectory() and config.recursive
      # if we would call this in same line with "isDirectory"
      # directories would also add to foundFiles
      if config.depth == -1 or config.depth > currentDepth
        foundFiles[fileObj.path] = exports.findInPath(fileObj.path, config, currentDepth + 1)
    else
      # Setup match results for matcher
      matchResult = false
      if _.isFunction(config.matcher)
        matchResult = config.matcher(fileObj, config)
      else
        matchResult = config.matcher
      # if matchResult is true, save fileObj.path
      if matchResult
        for exclude of config.excludes
          if fileObj.name.indexOf(exclude) != -1
            return
        foundFiles[fileObj.path] = fileObj
    return
  foundFiles

exports.write = (targetPath, str) ->
  fs.writeFileSync targetPath, str
  log '[36mcreate[0m ' + path.relative(process.cwd(), targetPath)

exports.read = (targetPath) ->
  fs.readFileSync targetPath, 'encoding': 'UTF-8'

exports.isDirectory = (targetPath) ->
  return false unless @checkPath(targetPath)
  return fs.lstatSync(targetPath).isDirectory()

exports.loadAndMerge = (searchPath, config) ->
  self = this
  # check config attribute
  if !_.isPlainObject(config)
    config = {}
  defaultConfig =
    onFileBasename: false
    onRequire: (fileObj) ->
      require fileObj.path
  config = _.merge({}, defaultConfig, config)
  log 'Load and Merge ' + searchPath
  files = exports.findInPath(searchPath, config)
  mergedResult = {}
  for filePath of files
    fileObj = files[filePath]
    if _.isFunction(config.onRequire)
      requiredFile = config.onRequire(fileObj)
    else
      requiredFile = require(filePath)
    log 'Required File ' + fileObj.name
    if config.onFileBasename
      mergedResult[fileObj.basename] = requiredFile
    else
      _.merge mergedResult, requiredFile
  mergedResult

exports.Matcher =
  onlyDirectories: (fileObj) ->
    fileObj.stats.isDirectory()
  withoutDirectories: (fileObj) ->
    !fileObj.stats.isDirectory()
