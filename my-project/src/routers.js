import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Cpd from "./views/cpd.vue"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },{
      path: "/cpd",
      name: "cpd",
      component: Cpd
    }
  ]
});
