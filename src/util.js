
var debug = false
var util = {}
var { slice } = []

export default function(Vue) {
  util = Vue.util
  debug = Vue.config.debug || !Vue.config.silent
}

export function warn(msg) {
  if (typeof console !== 'undefined' && debug) {
    console.warn('[VuePotion warn]: ' + msg)
  }
}

export function error(msg) {
  if (typeof console !== 'undefined') {
    console.error(msg)
  }
}

export function nextTrick(cb, ctx) {
  return util.nextTick(cb, ctx)
}

export function trim(str) {
  return str.replace(/^\s*|\s*$/g, '')
}

export const isArray = Array.isArray

export function isFunction(val) {
  return typeof val === 'function'
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj) {
  return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype
}

export function each(obj, iterator) {
  if (obj && typeof obj.length === 'number') {
    for (let i = 0; i < obj.length; i++) {
      iterator.call(obj[i], obj[i], i)
    }
  } else if (isObject(obj)) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(obj[key], obj[key], key)
      }
    }
  }

  return obj
}

function _merge(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {}
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = []
      }
      _merge(target[key], source[key], deep)
    } else if (source[key] !== undefined) {
      target[key] = source[key]
    }
  }
}

export function merge(target) {
  var args = slice.call(arguments, 1)
  args.forEach(source => {
    _merge(target, source, true)
  })
  return target
}

export function options(fn, obj, opts) {
  opts = opts || {}

  if (isFunction(opts)) {
    opts = opts.call(obj)
  }
  return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts})
}
