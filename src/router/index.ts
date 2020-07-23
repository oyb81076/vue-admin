import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NotFound from '@/components/NotFound';
import Home from '../views/Home.vue';
import example from './modules/example';

Vue.use(VueRouter);
const Developing = Vue.extend({ render(h) { return h('h1', `开发中${this.$route.path}`); } });
const routes: Array<RouteConfig> = [
  { path: '/', component: Home },
  example,
  { path: '/agent', meta: { title: '代理' }, component: Developing },
  { path: '/settings', meta: { title: '设置' }, component: Developing },
  { path: '/user', meta: { title: '个人中心' }, component: Developing },
  { path: '*', name: 'NotFound', component: NotFound },
];

const router = new VueRouter({ mode: 'hash', routes });
export default router;
