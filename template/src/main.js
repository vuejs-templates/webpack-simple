import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import { router } from './router'
import { store } from './store/store'

sync(store, router)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
