utils = require '..'

describe 'SoneaUtils path', ->
  describe 'Method isAbsolute', ->
    it 'should return true for __dirname', ->
      utils.path.isAbsolute(__dirname).should.be.ok

    it 'should return false for ..', ->
      utils.path.isAbsolute('..').should.not.be.ok
