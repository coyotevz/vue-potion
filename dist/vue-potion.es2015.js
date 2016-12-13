/*!
 * vue-potion v0.0.1
 * https://github.com/coyotevz/vue-potion
 * Released under the MIT License.
 */

import Request from 'request';

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

function options(fn, obj, opts) {
  opts = opts || {};

  if (isFunction(opts)) {
    opts = opts.call(obj);
  }
  return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
}

/**
 * Install plugin.
 */

function plugin(Vue) {
  if (plugin.installed) {
    return;
  }

  Util(Vue);

  Vue.request = Request;

  Object.defineProperties(Vue.prototype, {
    $request: {
      get: function () {
        return options(Vue.request, this, this.$options.request);
      }
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;
export { Url, Http, Resource };
