import { RouteConfig } from 'vue-router';

const routeConfig: RouteConfig = {
  path: '/example/',
  redirect: '/example/data/page',
  component: () => import('./ExampleIndex.vue'),
  children: [
    { path: 'data', redirect: 'data/page' },
    { path: 'data/page', name: 'ExampleDataPage', component: () => import('./ExampleDataPage.vue') },
    { path: 'data/create', name: 'ExampleDataCreate', component: () => import('./ExampleDataCreate.vue') },
    {
      path: 'data/edit/:id',
      name: 'ExampleDataEdit',
      props: true,
      component: () => import('./ExampleDataEdit.vue'),
    },
    {
      path: 'data/detail/:id',
      name: 'ExampleDataDetail',
      props: true,
      component: () => import('./ExampleDataDetail.vue'),
    },
    { path: 'rank', name: 'AgentRank', component: () => import('./ExampleSingle.vue') },
  ],
};
export default routeConfig;
