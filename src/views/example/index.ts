import { RouteConfig } from 'vue-router';

const routeConfig: RouteConfig = {
  path: '/example/',
  redirect: '/example/data/page',
  component: () => import('./ExampleIndex.vue'),
  children: [
    { path: 'data', redirect: 'data/page' },
    { path: 'data/page', name: 'ExampleDataPage', component: () => import('./data/ExampleDataPage.vue') },
    { path: 'data/create', name: 'ExampleDataCreate', component: () => import('./data/ExampleDataCreate.vue') },
    {
      path: 'data/edit/:id',
      name: 'ExampleDataEdit',
      props: true,
      component: () => import('./data/ExampleDataEdit.vue'),
    },
    {
      path: 'data/detail/:id',
      name: 'ExampleDataDetail',
      props: true,
      component: () => import('./data/ExampleDataDetail.vue'),
    },
    { path: 'single', name: 'ExampleSingle', component: () => import('./single/ExampleSingle.vue') },
  ],
};
export default routeConfig;
