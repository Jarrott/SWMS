/*
 * @Description: 
 * @Author:  
 * @Date: 2024-01-18 14:27:38
 * @LastEditTime: 2024-04-01 21:26:18
 * @LastEditors:  
 */
import { createRouter, createWebHistory } from 'vue-router';

const base = import.meta.env.BASE_URL;

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/home.vue'),
    },
    {
      path: '/',
      component: () => import('@/pages/main/main.vue'),
      children: routes,
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: () => import('@/pages/goods/goodsList.vue'),
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
