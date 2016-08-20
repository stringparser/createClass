
exports = module.exports = {};

// dependencies
//
exports.type = require('utils-type');

// assorted util functions
//

// object assign with reserved keys
exports.assign = function (source, origin, reserved) {
  if (source && origin) {
    for (var name in origin) {
      if (origin.hasOwnProperty(name) && reserved.indexOf(name) < 0) {
        source[name] = origin[name];
      }
    }
  }
};

// use the same base class
function BaseClass () {};

// get default base class
exports.getBaseClass = function () {
  return BaseClass;
};

// get default base constructor
exports.getBaseConstructor = function () {
  return (function BaseConstructor (props, context, updater) {
    if (!(this instanceof BaseConstructor)) {
      return new BaseConstructor(props, context, updater);
    }
    if (typeof BaseConstructor.super_ === 'function') {
      BaseConstructor.call(this, props, context, updater);
    }
  });
};
