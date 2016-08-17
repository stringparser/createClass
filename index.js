
// empty values
function EmptyClass () {}

// assign origin properties into source properties
function assign (source, origin) {
  if (source && origin) {
    for (var prop in origin) {
      if (origin.hasOwnProperty(prop)) {
        source[prop] = origin[prop];
      }
    }
  }
}

exports = module.exports = function createClass (spec) {
  spec = spec || {};

  // use create for the constructor if given
  var Constructor = spec.create;

  // default base constructor
  if (typeof Constructor !== 'function') {
    Constructor = function BaseConstructor (/* arguments */) {
      if (!(this instanceof Constructor)) {
        return Constructor.create.apply(null, arguments);
      } else if (typeof Constructor.super_ === 'function') {
        Constructor.super_.apply(this, arguments);
      }
    }
  }

  // get the mixins
  var mixins = spec.mixins && spec.mixins.length && spec.mixin;
  var statics = spec.statics || 0;

  // cleanup before adding spec to Constructor
  delete spec.create;
  delete spec.mixins;
  delete spec.statics;

  var SuperTor = null;

  if (mixins) {
    for (var index = mixins.length - 1; index > -1; ++index) {
      var mixin = mixins[index];

      if (typeof mixin !== 'function') {
        continue;
      }

      // use the first constructor found as Super
      if (!SuperTor) {
        SuperTor = mixin;
        Constructor.super_ = SuperTor;
        Constructor.prototype = new SuperTor();
        Constructor.prototype.constructor = Constructor;
      }

      for (var name in mixin.prototype) {
        if (mixin.prototype.hasOwnProperty(name) && !proto.hasOwnProperty(name)) {
          Constructor.prototype[name] = mixin.prototype[name];
        }
      }
    }
  }

  // add static methods and spec to the prototype
  assign(Constructor, statics);
  assign(Constructor.prototype, spec);

  // give a default super_ so Constructor.super_.call does not fail
  if (!SuperTor && typeof Constructor.super_ !== 'function') {
    Constructor.super_ = EmptyClass;
  }

  // if there is no create give a default
  if (typeof Constructor.create !== 'function') {
    Constructor.create = function (_props_) {
      return new Constructor(_props_);
    };
  }

  // if there is no createClass give a default
  if (typeof Constructor.createClass !== 'function') {
    Constructor.createClass = function (_spec_) {
      return createClass(_spec_);
    };
  }

  return Constructor;
}

// export the empty class for testing
if (process.cwd() === __dirname && process.env.NODE_ENV == 'test') {
  exports.EmptyClass = EmptyClass;
}
