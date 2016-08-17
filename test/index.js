require('should');

var fs = require('fs');
var api = require('../.');

fs.readdirSync(__dirname).forEach(function (file) {
  if (file === 'index.js') { return; }
  describe(file.split('.')[0], function () {
    require('./' + file)(api);
  });
});
