import Vue from 'vue'
import App from './App.vue'
import VueMoment from 'vue-moment'
import router from './routers.js'
import moment from 'moment'
import 'moment/locale/pt-br'
// Vuefire
// Vue.use(VueFlatPickr)

import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)
Vue.use(VueMoment, moment)

new Vue({
  router,
  el:"#app",
  render: h => h(App)
 })
