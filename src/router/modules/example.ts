import { RouteConfig } from 'vue-router';
import { CreateElement } from 'vue';

const render = { render: (h: CreateElement) => h('router-view') };

const routeConfig: RouteConfig = {
  path: '/example',
  redirect: '/example/demo/page',
  meta: { title: '例子' },
  component: render,
  children: [
    {
      path: 'demo',
      meta: { title: '分页', icon: 'el-icon-s-home' },
      redirect: 'demo/page',
      component: render,
      children: [
        { path: 'page', meta: { noCache: true }, component: () => import('@/views/example/demo/page.vue') },
        { path: 'create', component: () => import('@/views/example/demo/create.vue') },
        { path: 'edit/:id', props: true, component: () => import('@/views/example/demo/edit.vue') },
        { path: 'detail/:id', props: true, component: () => import('@/views/example/demo/detail.vue') },
      ],
    },
    {
      path: 'single/index',
      meta: { title: '单页', icon: 'el-icon-video-camera-solid' },
      component: () => import('@/views/example/single/index.vue'),
    },
    {
      path: 'debounce',
      meta: { title: '截流', icon: 'el-icon-s-cooperation' },
      component: () => import('@/views/example/debounce.vue'),
    },
  ],
};
export default routeConfig;
