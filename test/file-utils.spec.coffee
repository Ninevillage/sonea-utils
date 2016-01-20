utils = require '..'

describe 'SoneaUtils file', ->
  describe 'Method checkPath', ->
    it 'should return true for __dirname', ->
      utils.file.checkPath(__dirname).should.be.ok

    it 'should return false for not existing path', ->
      utils.file.checkPath('/not-existing-path').should.not.be.ok

  describe 'Method findInPath', ->
    it 'should return an object with files for __dirname', ->
      files = utils.file.findInPath __dirname
      files.should.have.property __filename

    it 'should return an empty object for not existing path', ->
      files = utils.file.findInPath '/not-existing-path'
      files.should.be.an.Object
      Object.keys(files).length.should.be.eql 0

  describe 'Method read', ->
    it 'should return content of __filename'
    it 'should return false for not existing filepath'

  describe 'Method write', ->
    it 'should write given content to target path'

  describe 'Method isDirectory', ->
    it 'should return true for __dirname', ->
      utils.file.isDirectory(__dirname).should.be.ok

    it 'should return false for __filename', ->
      utils.file.isDirectory(__filename).should.not.be.ok

  describe 'Method loadAndMerge', ->
    it 'should load and merge all files in dummies folder', ->
      dummies = utils.file.loadAndMerge __dirname+'/dummies'
      dummies.should.have.property 'one'
      dummies.should.have.property 'two'
      dummies.one.should.be.eql 1
      dummies.two.should.be.eql 2

    it 'should load and merge all files on file basename in dummies folder', ->
      dummies = utils.file.loadAndMerge __dirname+'/dummies',
        onFileBasename: true

      dummies.should.have.property 'dummyOne'
      dummies.should.have.property 'dummyTwo'
      dummies.dummyOne.should.have.property 'one'
      dummies.dummyTwo.should.have.property 'two'
      dummies.dummyOne.one.should.be.eql 1
      dummies.dummyTwo.two.should.be.eql 2
