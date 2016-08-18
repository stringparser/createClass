
exports = module.exports = {};

// dependencies
//
exports.type = require('utils-type');

// assorted util functions
//

// hasOwnProperty shorthand
exports.has = function (object, name) {
  return object.hasOwnProperty(name);
};

// object assign with reserved keys
exports.assign = function (source, origin, reserved) {
  if (source && origin) {
    for (var name in origin) {
      if (reserved.indexOf(name) < 0 && exports.has(origin, name)) {
        source[name] = origin[name];
      }
    }
  }
};

// default empty class
exports.EmptyClass = function EmptyClass () {};

// default empty constructor
exports.EmptyConstructor = function EmptyConstructor (props, context, updater) {
  if (!(this instanceof EmptyConstructor)) {
    return new EmptyConstructor(props, context, updater);
  }
  var SuperTor = EmptyConstructor.super_;
  // no need to call super_ for the EmptyClass
  if (typeof SuperTor === 'function' && SuperTor !== exports.EmptyClass) {
    SuperTor.call(this, props, context, updater);
  }
};
