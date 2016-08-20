
var type = require('utils-type');
var util = require('./lib/util');

// constants
var RESERVED_KEYS = {
  spec: ['mixins', 'create', 'statics'],
  statics: ['super_', 'create', 'createClass']
};

exports = module.exports = function createClass (spec) {
  spec = spec || {};

  // checks and defaults
  var mixins = type(spec.mixins).array || [];
  var SuperTor = type(this).function || type(mixins.pop()).function;
  var Constructor = type(spec.create).function || exports.getBaseConstructor();

  // prototype setup
  SuperTor = Constructor.super_ = SuperTor || exports.getBaseClass();
  var proto = Constructor.prototype = new SuperTor();
  Constructor.prototype.constructor = Constructor;

  // add statics
  util.assign(Constructor, spec.statics, RESERVED_KEYS.statics);

  // mix'em in
  for (var index = mixins.length - 1; index > -1; --index) {
    var mixin = mixins[index];
    if (typeof mixin !== 'function') {
      continue;
    }

    for (var name in mixin.prototype) {
      if (mixin.prototype.hasOwnProperty(name) && !proto.hasOwnProperty(name)) {
        proto[name] = mixin.prototype[name];
      }
    }
  }

  // add any other properties to the prototpe skipping reserved keys
  util.assign(Constructor.prototype, spec, RESERVED_KEYS.spec);

  // add create and createClass to build upon
  Constructor.create = function (props, context, updater) {
    return new Constructor(props, context, updater);
  };
  Constructor.createClass = createClass;

  return Constructor;
};

// export base functions (so they can be overriden)
exports.getBaseClass = util.getBaseClass;
exports.getBaseConstructor = util.getBaseConstructor;

// exports for testing
if (process.cwd() === __dirname && process.env.NODE_ENV == 'test') {
  exports.internals = {
    RESERVED_KEYS: RESERVED_KEYS
  };
}
