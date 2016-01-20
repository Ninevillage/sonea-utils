utils = require '..'

describe 'SoneaUtils global', ->
  describe 'Method expose', ->
    it 'should expose to global context', ->
      object = info: 'test'

      utils.global.expose object, 'TestInfoObject'
      global.should.have.property 'TestInfoObject'
      global.TestInfoObject.should.be.eql object

    it 'should not expose to global context if key already exists', ->
      object = info: 'test'
      anotherObject = info: 'test2'

      utils.global.expose object, 'TestInfoObject'
      utils.global.expose anotherObject, 'TestInfoObject'

      global.TestInfoObject.should.not.be.eql anotherObject

    it 'should force expose object to gobal context', ->
      object = info: 'test'

      anotherObject = info: 'test2'

      utils.global.expose object, 'TestInfoObject'
      utils.global.expose anotherObject, 'TestInfoObject', true

      global.TestInfoObject.should.be.eql anotherObject

  describe 'Method exposeMany', ->
    it 'should expose all properties of the given object to global context', ->
      object =
        exampleInfo: 'test'
        anotherExampleInfo: 'anotherTest'

      utils.global.exposeMany object
      global.should.have.property 'exampleInfo'
      global.should.have.property 'anotherExampleInfo'

      global.exampleInfo.should.be.eql 'test'
      global.anotherExampleInfo.should.be.eql 'anotherTest'

    it 'should expose all properties of the given object to global context with formatted key', ->
      object =
        exampleInfo: 'test'
        anotherExampleInfo: 'anotherTest'

      utils.global.exposeMany object, (key) -> "#{key}Test"

      global.should.have.property 'exampleInfoTest'
      global.should.have.property 'anotherExampleInfoTest'

      global.exampleInfoTest.should.be.eql 'test'
      global.anotherExampleInfoTest.should.be.eql 'anotherTest'
