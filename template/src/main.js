import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import Lantern from 'lantern-ui';
import routes from './route.config.js';
import 'lantern-ui/lib/lantern.css';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

Vue.use(Lantern);

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});