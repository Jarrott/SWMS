import { createRouter, createWebHistory } from 'vue-router';
import menu from './menu';

const base = import.meta.env.BASE_URL;

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home.vue'),
  },
  ...menu.platform,
];

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    // {
    //   path: '/',
    //   component: () => import('@/pages/home.vue'),
    // },
    {
      path: '/',
      component: () => import('@/pages/main/main.vue'),
      children: routes,
    },
    {
      path: '/age',
      name: 'age',
      component: () => import('@/pages/age.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/pages/error.vue'),
    },
  ],
});

export default router;
