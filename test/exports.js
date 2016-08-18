

exports = module.exports = function (API, util, should) {

  it('API() should have EmptyClass as super_', function () {
    var Tor = API();
    should(Tor).have.property('super_');
    should(Tor.super_).be.eql(util.EmptyClass);
  });

  it('API() should return a constructor function', function () {
    var Tor = API();
    should(typeof Tor).be.eql('function');
    should(typeof Tor.prototype).be.eql('object');
    should(Tor.prototype.constructor).be.eql(Tor);
  });
};
