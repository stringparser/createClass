

exports = module.exports = function (api) {

  it('createClass() should return a new constructor', function () {
    var Tor = api();
    Tor.super_.should.be.eql(api);
    (new Tor()).constructor.should.be.eql(Tor);
  });

  it('createClass(object proto) proto with new constructor', function () {
    var proto = {method: function () {}};
    var Ctor = api(proto);
    Ctor.prototype.should.have.property('method', proto.method);
  });


  it('createClass({create: [Function]}) should be used as ctor', function () {
    var Child = api({
      create: function () {
        this.happened = true;
      }
    });
    (new Child()).should.have.properties({happened: true});
  });
};
