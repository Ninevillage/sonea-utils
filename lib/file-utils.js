//======================================================================
// REQUIREMENTS
//======================================================================
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var log = require("debug")("sonea:utils:fileutils");

//======================================================================
// EXPORTS UtilMethods
//======================================================================
module.exports.checkPath = function(searchPath, extensions) {
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

module.exports.findInPath = function(searchPath, config, currentDepth) {
    var _this = this;
    var foundFiles = {};

    // Check Path - log warn and return empty if not exists
    if (!_this.checkPath(searchPath)) {
        log("FileUtils.findInPath failed. %s not exists", searchPath);
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
        matcher: true,
        depth: -1
    };

    // merge defaultConfig with config
    config = _.merge(defaultConfig, config);

    // read searchPath and iterate through files
    fs.readdirSync(searchPath).forEach(function(file) {
        var filePath = path.resolve(searchPath, file);
        var fileStats = fs.lstatSync(filePath);
        // if it is a directory and config recursive is true, make
        // deep search (but check currentDepth to config.depth)
        if (fileStats.isDirectory()) {
            // if we would call this in same line with "isDirectory"
            // directories would also add to foundFiles
            if (config.recursive && (config.depth === -1 || config.depth > currentDepth)) {
                foundFiles[filePath] = _this.findInPath(filePath, config, currentDepth + 1);
            }
        }
        else {
            // Setup match results for matcher
            var matchResult = false;
            if (_.isFunction(config.matcher)) {
                matchResult = config.matcher();
            }
            else {
                matchResult = config.matcher;
            }

            // if matchResult is true, save filePath
            if (matchResult) {
                foundFiles[filePath] = {
                    name: file,
                    stats: fileStats
                };
            }
        }
    });

    return foundFiles;
};

module.exports.write = function(targetPath, str) {
    fs.writeFileSync(targetPath, str);
    log('\x1b[36mcreate\x1b[0m ' + path.relative(process.cwd(), targetPath));
};

module.exports.read = function(targetPath) {
    return fs.readFileSync(targetPath, {
        "encoding": "UTF-8"
    });
};

module.exports.isDirectory = function(targetPath) {
    if (this.checkPath(targetPath)) {
        var stats = fs.lstatSync(targetPath);
        return stats.isDirectory();
    }
    else {
        return false;
    }
};