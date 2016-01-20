var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var log = require("debug")("sonea:utils:file");

exports.checkPath = function(searchPath, extensions) {
  if(extensions) {
    for(var i in extensions) {
      var extension = extensions[i];
      if(fs.existsSync(searchPath+extension)) {
        return searchPath+extension;
      }
    }
  } else {
    return fs.existsSync(searchPath)?searchPath:false;
  }

  return false;
};

exports.findInPath = function(searchPath, config, currentDepth) {
  var _this = this;
  var foundFiles = {};

  // Check Path - log warn and return empty if not exists
  if (!exports.checkPath(searchPath)) {
    log("findInPath failed. %s not exists", searchPath);
    return foundFiles;
  }

  // check config attribute
  if (!_.isPlainObject(config)) {
    config = {};
  }
  if (_.isUndefined(currentDepth) || _.isNaN(currentDepth)) {
    currentDepth = 0;
  }

  // setup default config
  var defaultConfig = {
    recursive: false,
    matcher: exports.Matcher.withoutDirectories,
    depth: -1,
    excludes: [
      '.keep',
      '.gitignore'
    ]
  };

  // merge defaultConfig with config
  config = _.merge({}, defaultConfig, config);

  // read searchPath and iterate through files
  fs.readdirSync(searchPath).forEach(function(file) {
    var fileObj = {};
    fileObj.name = file;
    fileObj.path = path.resolve(searchPath, file);
    fileObj.stats = fs.lstatSync(fileObj.path);
    fileObj.extname = path.extname(file);
    fileObj.basename = path.basename(file, fileObj.extname);

    // if it is a directory and config recursive is true, make
    // deep search (but check currentDepth to config.depth)
    if (fileObj.stats.isDirectory() && config.recursive) {
      // if we would call this in same line with "isDirectory"
      // directories would also add to foundFiles
      if (config.depth === -1 || config.depth > currentDepth) {
        foundFiles[fileObj.path] = exports.findInPath(fileObj.path, config, currentDepth + 1);
      }
    }
    else {
      // Setup match results for matcher
      var matchResult = false;
      if (_.isFunction(config.matcher)) {
        matchResult = config.matcher(fileObj, config);
      }
      else {
        matchResult = config.matcher;
      }
      // if matchResult is true, save fileObj.path
      if (matchResult) {
        for (var excludeIndex in config.excludes) {
          var exclude = config.excludes[excludeIndex];
          if(fileObj.name.indexOf(exclude) !== -1) {
            return
          }
        }
        foundFiles[fileObj.path] = fileObj;
      }
    }
  });

  return foundFiles;
};

exports.write = function(targetPath, str) {
  fs.writeFileSync(targetPath, str);
  log('\x1b[36mcreate\x1b[0m ' + path.relative(process.cwd(), targetPath));
};

exports.read = function(targetPath) {
  return fs.readFileSync(targetPath, {
    "encoding": "UTF-8"
  });
};

exports.isDirectory = function(targetPath) {
  if (this.checkPath(targetPath)) {
    var stats = fs.lstatSync(targetPath);
    return stats.isDirectory();
  }
  else {
    return false;
  }
};

exports.loadAndMerge = function(searchPath, config) {
  var self = this;
  // check config attribute
  if (!_.isPlainObject(config)) {
    config = {};
  }

  var defaultConfig = {
    onFileBasename: false,
    onRequire: function(fileObj) {
      return require(fileObj.path);
    }
  };
  config = _.merge({}, defaultConfig, config);

  log("Load and Merge "+searchPath);
  var files = exports.findInPath(searchPath, config);

  var mergedResult = {};

  for(var filePath in files) {
    var requiredFile = null;
    var fileObj = files[filePath];
    if( _.isFunction(config.onRequire)) {
      requiredFile = config.onRequire(fileObj);
    } else {
      requiredFile = require(filePath);
    }

    log("Required File "+fileObj.name);

    if(config.onFileBasename) {
      mergedResult[fileObj.basename] = requiredFile;
    } else {
      _.merge(mergedResult, requiredFile);
    }
  }
  
  return mergedResult;
};

exports.Matcher = {
  onlyDirectories: function(fileObj) {
    return fileObj.stats.isDirectory();
  },
  withoutDirectories: function(fileObj) {
    return !fileObj.stats.isDirectory();
  }
};
