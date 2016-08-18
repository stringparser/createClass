
exports = module.exports = function (API, util, should) {

  it('API(Object spec) constructor should have spec', function () {
    var spec = {method: function () {}};
    var Tor = API(spec);
    should(Tor.prototype).have.properties(spec);
  });

  it('API({create: [Function]}) to be used as constructor', function () {
    var props = { happened: true };
    var Child = API({
      create: function Tor() {
        for (var name in props) {
          if (props.hasOwnProperty(name)) {
            this[name] = true;
          }
        }
      }
    });
    should(Child.name).be.eql('Tor');
    should(typeof Child).be.eql('function');
    should(typeof Child.prototype).be.eql('object');
    should(new Child()).have.properties(props);
  });
};
