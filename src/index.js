/**
 * Install plugin.
 */

import Potion from './potion'
import Resources from './resources'
import Util from './util'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  Util(Vue)

  Vue.potion = Potion

  Object.defineProperties(Vue.prototype, {
    $potion: {
      get() {
        return new Resources(this)
      }
    },
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
