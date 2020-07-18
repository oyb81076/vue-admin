import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/agent',
    redirect: '/agent/info/page',
    component: () => import('@/views/agent/index.vue'),
    children: [
      { path: 'info', redirect: 'info/page' },
      { path: 'info/page', name: 'AgentInfoPage', component: () => import('@/views/agent/AgentInfoPage.vue') },
      { path: 'info/create', name: 'AgentInfoCreate', component: () => import('@/views/agent/AgentInfoCreate.vue') },
      { path: 'info/edit/:id', name: 'AgentInfoEdit', component: () => import('@/views/agent/AgentInfoEdit.vue') },
      { path: 'info/detail/:id', name: 'AgentInfoDetail', component: () => import('@/views/agent/AgentInfoDetail.vue') },
      { path: 'rank', name: 'AgentRank', component: () => import('@/views/agent/AgentRank.vue') },
    ],
  },
  { path: '*', name: 'NotFound', component: NotFound },
];

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
