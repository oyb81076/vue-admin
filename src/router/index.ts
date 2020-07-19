import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import exampleRoute from '../views/example';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: Home },
  exampleRoute,
  { path: '*', name: 'NotFound', component: NotFound },
];

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
