import Vue from "vue";
import Router from "vue-router";
import Mensal from "./views/Mensal.vue";
import Interjornada from "./views/Interjornada.vue";
import Organico from "./views/organico.vue";
import Home from "./views/Home-orig.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:setor",
      name: "mensal",
      component: Mensal
    },
    {
      path: "/mensal",
      name: "home",
      component: Home
    },
    {
      path: "/interjornada",
      name: "interjornada",
      component: Interjornada
    },
    {
      path: "/organico/:setor",
      name: "organico",
      component: Organico
    }
  ]
});
