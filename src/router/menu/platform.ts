/** ---平台菜单--- */
export const platform = [
  {
    path: '/error',
    name: 'error',
    component: () =>
      import('@/pages/error.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('@/pages/login/login.vue'),
    meta: {
      title: 'login'
    },
  },
  {
    path: '/createAccount',
    name: 'createAccount',
    component: () =>
      import('@/pages/login/createAccount.vue'),
    meta: {
      title: 'createAccount'
    },
  },
  {
    path: '/forgotPwd',
    name: 'forgotPwd',
    component: () =>
      import('@/pages/forgotPwd/forgotPwd.vue'),
    meta: {
      title: 'forgotPwd'
    },
  },
  {
    path: '/join',
    name: 'join',
    component: () =>
      import('@/pages/join/join.vue'),
    meta: {
      title: 'join'
    },
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: () =>
      import('@/pages/goods/goodsList.vue'),
    meta: {
      title: 'goodsList'
    },
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () =>
      import('@/pages/goods/goodsDetail.vue'),
    meta: {
      title: 'goodsDetail'
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () =>
      import('@/pages/cart/cart.vue'),
    meta: {
      title: 'cart'
    },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () =>
      import('@/pages/cart/checkout.vue'),
    meta: {
      title: 'checkout'
    },
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: () =>
      import('@/pages/cart/paySuccess.vue'),
    meta: {
      title: 'paySuccess'
    },
  },
  {
    path: '/shop',
    name: 'shop',
    component: () =>
      import('@/pages/shop/shop.vue'),
    meta: {
      title: 'shop'
    },
  },
  {
    path: '/giftCard',
    name: 'giftCard',
    component: () =>
      import('@/pages/products/giftCard/giftCard.vue'),
    meta: {
      title: 'giftCard'
    },
  },
  {
    path: '/bottleMonth',
    name: 'bottleMonth',
    component: () =>
      import('@/pages/products/bottle/bottle.vue'),
    meta: {
      title: 'bottleMonth'
    },
  },
  {
    path: '/collect',
    name: 'collect',
    component: () =>
      import('@/pages/collections/collect.vue'),
    meta: {
      title: 'collect'
    },
  },
  {
    path: '/bundles',
    name: 'bundles',
    component: () =>
      import('@/pages/collections/bundles.vue'),
    meta: {
      title: 'bundles'
    },
  },
  {
    path: '/whisky',
    name: 'whisky',
    component: () =>
      import('@/pages/products/whisky/whisky.vue'),
    meta: {
      title: 'whisky'
    },
  },
  {
    path: '/vaults',
    name: 'vaults',
    component: () =>
      import('@/pages/collections/vaults.vue'),
    meta: {
      title: 'vaults'
    },
  },
  {
    path: '/single',
    name: 'single',
    component: () =>
      import('@/pages/collections/single.vue'),
    meta: {
      title: 'single'
    },
  },
  {
    path: '/american',
    name: 'american',
    component: () =>
      import('@/pages/collections/american.vue'),
    meta: {
      title: 'american'
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () =>
      import('@/pages/mine/mine.vue'),
    meta: {
      title: 'mine'
    },
    children: [
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/pages/mine/accountDashboard/accountDashboard.vue')
      },
      {
        path: '/infoEdit',
        name: 'infoEdit',
        component: () => import('@/pages/mine/infoEdit/infoEdit.vue')
      }
    ]
  },
];
