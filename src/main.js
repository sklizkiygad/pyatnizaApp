import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { defineCustomElements } from '@ionic/pwa-elements/loader'

defineCustomElements(window)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
