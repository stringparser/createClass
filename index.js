// dependencies
var util = require('./lib/util');

// empty values
var emptyArray = [];

// constants
var RESERVED_KEYS = {
  spec: ['mixins', 'create', 'statics'],
  statics: ['super_', 'create', 'createClass']
};

function createClass (spec) {
  spec = spec || {};

  // refs
  var proto = null;

  // checks and defaults
  var mixins = util.type(spec.mixins).array || emptyArray;
  var SuperTor = util.type(mixins.shift()).function || util.EmptyClass;
  var Constructor = util.type(spec.create).function || util.EmptyConstructor;

  // prototype setup
  Constructor.super_ = SuperTor;
  proto = Constructor.prototype = new SuperTor();
  Constructor.prototype.constructor = Constructor;

  // add statics
  util.assign(Constructor, spec.statics, RESERVED_KEYS.statics);

  // mix'em in
  for (var index = mixins.length - 1; index > -1; --index) {
    var mixin = mixins[index];
    if (typeof mixin === 'function') {
      for (var name in mixin.prototype) {
        if (util.has(mixin.prototype, name) && !util.has(proto, name)) {
          proto[name] = mixin.prototype[name];
        }
      }
    }
  }

  // add any other properties to the prototpe skipping reserved keys
  util.assign(Constructor.prototype, spec, RESERVED_KEYS.spec);

  // add create and createClass to build upon
  Constructor.create = function (props, context, updater) {
    return new Constructor(props, context, updater);
  };
  Constructor.createClass = function (_spec_) {
    return createClass(_spec_);
  };

  return Constructor;
}

// export the empty class for testing
if (process.cwd() === __dirname && process.env.NODE_ENV == 'test') {
  exports.RESERVED_KEYS = RESERVED_KEYS;
}

exports = module.exports = createClass;
