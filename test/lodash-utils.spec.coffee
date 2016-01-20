_ = require 'lodash'
utils = require '..'

describe 'SoneaUtils lodash', ->
  describe 'Method defaultAssign', ->
    it 'should assign, but do not override default values', ->
      startObj = user: 'test'
      mergeObj = age: 18
      assignObj = user: 'otherTest'

      resultObj = _.assign {}, startObj, mergeObj, assignObj
      resultObj.should.be.eql
        user: 'otherTest'
        age: 18

      resultObj = utils.lodash.defaultAssign {}, startObj, mergeObj, assignObj
      resultObj.should.be.eql
        user: 'test'
        age: 18
