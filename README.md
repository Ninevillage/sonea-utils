# sonea-utils

[![npm version](https://badge.fury.io/js/sonea-utils.svg)](https://badge.fury.io/js/sonea-utils)

[![Build Status](https://travis-ci.org/Ninevillage/sonea-utils.svg?branch=master)](https://travis-ci.org/Ninevillage/sonea-utils)
[![Dependency Status](https://gemnasium.com/Ninevillage/sonea-utils.svg)](https://gemnasium.com/Ninevillage/sonea-utils)

[![Code Climate](https://codeclimate.com/github/Ninevillage/sonea-utils/badges/gpa.svg)](https://codeclimate.com/github/Ninevillage/sonea-utils)
[![Test Coverage](https://codeclimate.com/github/Ninevillage/sonea-utils/badges/coverage.svg)](https://codeclimate.com/github/Ninevillage/sonea-utils/coverage)

## Installation

```
$ npm install sonea-utils
```

## Usage

```JavaScript
var soneaUtils = require('sonea-utils');

if(soneaUtils.file.isDirectory(__dirname)) {
  console.log("It is a directory (>^.^)>");
}
```

## utils currently for:

* [debug](https://www.npmjs.com/package/debug)
* file
* global (exposing)
* [lodash](https://www.npmjs.com/package/lodash)
* path

## Supported node version (Based on Tests)

Visit travis ci of this package. Tests running with several node versions.

Minimum 0.12.7 currently. May run with 0.10.x too. Own risk!

## more infos

Look at sonea-utils documentation -> [here](https://github.com/Ninevillage/sonea-utils/wiki)

## License

> **MIT**
