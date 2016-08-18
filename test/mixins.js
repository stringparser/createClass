

exports = module.exports = function (API, util, should) {

  it('API({ mixins: [] }) should not be set on the prototype', function () {
    var A = function () {};
    var Tor = API({ mixins: [A] });
    should(Tor).not.have.property('mixin');
  });
};
