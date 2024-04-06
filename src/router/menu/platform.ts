/** ---平台菜单--- */
export const platform = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('@/pages/login/login.vue'),
    meta: {
      title: 'LOGIN'
    },
  },
  {
    path: '/join',
    name: 'join',
    component: () =>
      import('@/pages/join/join.vue'),
    meta: {
      title: 'JOIN'
    },
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: () =>
      import('@/pages/goods/goodsList.vue'),
    meta: {
      title: ''
    },
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () =>
      import('@/pages/goods/goodsDetail.vue'),
    meta: {
      title: ''
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () =>
      import('@/pages/cart/cart.vue'),
    meta: {
      title: ''
    },
  },
];
