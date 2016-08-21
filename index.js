
// dependencies
var inherits = require('inherits');

// constants
var RESERVED_KEYS = {
  spec: ['mixins', 'create', 'statics'],
  statics: ['super_', 'create', 'createClass']
};

// empty values
var emptyArray = [];
var emptyObject = {};
function EmptyClass () {}

/**
 * merge dest properties into src object skipping reserved keys
 * @param {object} src object to copy from
 * @param {object} dest object to assign properties to
**/
function assign (dest, src, reserved) {
  if (dest && src) {
    for (var name in src) {
      if (reserved.indexOf(name) < 0 && src.hasOwnProperty(name)) {
        dest[name] = src[name];
      }
    }
  }
}

/**
 * Creates a new constructor function with the given spec
 *
 * @param {?function} Super Class constructor function
 * @param {object} spec Class specification
 * @return {function} constructor function
 * @public
**/
function createClass (Super, spec) {
  spec = spec || Super || emptyObject;
  Super = typeof Super === 'function' && Super ||
    typeof this === 'function' && this ||
    EmptyClass;

  // checks and defaults
  var mixins = Array.isArray(spec.mixins) && spec.mixins || emptyArray;
  var Constructor = typeof spec.create === 'function' && spec.create || (
    function EmptyConstructor () {
      if (!(this instanceof EmptyConstructor)) {
        throw new Error('call the constructor using `new`');
      } else if (typeof EmptyConstructor.super_ === 'function') {
        EmptyConstructor.super_.apply(this, arguments);
      }
    }
  );

  // prototype setup
  inherits(Constructor, Super);

  // mix'em in
  var proto = Constructor.prototype;

  for (var index = mixins.length - 1; index > -1; --index) {
    var value = mixins[index];
    var mixin = typeof value === 'function' && value.prototype || value;

    for (var name in mixin) {
      if (mixin.hasOwnProperty(name) && !proto.hasOwnProperty(name)) {
        proto[name] = mixin[name];
      }
    }
  }

  // add any prototype methods and statics
  assign(Constructor.prototype, spec, RESERVED_KEYS.spec);
  assign(Constructor, spec.statics, RESERVED_KEYS.statics);

  // add create and createClass to build upon
  Constructor.create = function (a, b, c) { return new Constructor(a, b, c); };
  Constructor.createClass = createClass;

  return Constructor;
};

// exports
exports = module.exports = createClass;

// exports for testing
if (process.cwd() === __dirname && process.env.NODE_ENV == 'test') {
  exports.internals = {
    EmptyClass: EmptyClass,
    RESERVED_KEYS: RESERVED_KEYS
  };
}
