var path = require("path");

var log = require("debug")("sonea:utils:pathutils");

module.exports.isAbsolute = function(p) {
    return path.normalize(p + '/') === path.normalize(path.resolve(p) + '/');
};
