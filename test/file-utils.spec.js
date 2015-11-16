var soneaUtils = require("..");

describe('SoneaUtils FileUtils', function () {
  describe('Method checkPath', function () {
    it('should return true for __dirname');
    it('should return false for not existing path');
  });

  describe('Method findInPath', function () {
    it('should return an object with files for __dirname');
    it('should return an empty object for not existing path');
  });

  describe('Method read', function () {
    it('should return content of __filename');
    it('should return false for not existing filepath');
  });

  describe('Method write', function () {
    it('should write given content to target path');
  });

  describe('Method isDirectory', function () {
    it('should return true for __dirname');
    it('should return false for __filename');
  });
});