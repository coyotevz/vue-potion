/**
 * Install plugin.
 */

import Request from 'request'
import Util, { options } from './util'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  Util(Vue)

  Vue.request = Request

  Object.defineProperties(Vue.prototype, {
    $request: {
      get() {
        return options(Vue.request, this, this.$options.request)
      }
    },
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
