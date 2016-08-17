

exports = module.exports = function (api) {

  it('createClass() should return a new constructor', function () {
    var Tor = api();
    Tor.super_.should.be.eql(api.EmptyClass);
    (new Tor()).constructor.should.be.eql(Tor);
  });

  it('createClass(Object spec) spec with new constructor', function () {
    var spec = {method: function () {}};
    var Ctor = api(spec);
    Ctor.prototype.should.have.properties(spec);
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
