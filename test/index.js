require('should');

var fs = require('fs');
var api = require('../.');

fs.readdir(__dirname, function (error, files) {
  if (error) { throw error; }
  files.forEach(function (file) {
    if (file === 'index.js') { return; }
    describe(file.split('.')[0], function () {
      require('./' + file)(api);
    });
  });
})
