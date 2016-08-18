

exports = module.exports = function (API, util, should) {

  it('should not be set on the prototype', function () {
    var A = function () {};
    var B = function () {};
    var Tor = API({ mixins: [A], statics: { b: true }, create: B });

    should(Tor.prototype).not.have.properties(['mixins', 'statics', 'create']);
  });
};
