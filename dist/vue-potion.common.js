/*!
 * vue-potion v0.0.1
 * https://github.com/coyotevz/vue-potion
 * Released under the MIT License.
 */

'use strict';

var Potion = {
  init: function (options) {
    console.log('VuePotion inited!!, next we need to read api schemas');
    console.log('this are options: received', options);
  }
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Resources = function () {
  function Resources($vm) {
    classCallCheck(this, Resources);

    console.log('received ', $vm);
  }

  Resources.prototype.someMethod = function someMethod() {
    console.log('someMethod called!!');
  };

  return Resources;
}();

var debug = false;
var util = {};
var slice = [].slice;


var Util = function (Vue) {
  util = Vue.util;
  debug = Vue.config.debug || !Vue.config.silent;
};









var isArray = Array.isArray;

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
}



function _merge(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {};
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = [];
      }
      _merge(target[key], source[key], deep);
    } else if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
}

function merge(target) {
  var args = slice.call(arguments, 1);
  args.forEach(function (source) {
    _merge(target, source, true);
  });
  return target;
}

/**
 * Install plugin.
 */

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }

  Util(Vue);

  Vue.potion = Potion;

  Object.defineProperties(Vue.prototype, {
    $potion: {
      get: function () {
        return new Resources(this);
      }
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
