import Vue from 'vue'
import 'amfe-flexible'
import Vconsole from 'vconsole'
import App from './App.vue'
import router from './router'
import '@/style/global.less'

Vue.config.productionTip = false
process.env.NODE_ENV === 'development' && new Vconsole()

// const errorHandler = (event) => {
//   console.error(event.reason)
//   event.preventDefault()
// }

// Vue.config.errorHandler = reason => {
//   let defaultPrevented = false
//   errorHandler({ reason, preventDefault: () => { defaultPrevented = true } })
//   if (!defaultPrevented) throw reason
// }

// window.addEventListener('unhandledrejection', errorHandler)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
