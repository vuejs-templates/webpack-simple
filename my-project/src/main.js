import Vue from 'vue'
import App from './App.vue'
import router from './routers.js'
// Vuefire
// Vue.use(VueFlatPickr)

import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)
Vue.use(require('vue-moment'))

new Vue({
  router,
  el:"#app",
  render: h => h(App)
 })
