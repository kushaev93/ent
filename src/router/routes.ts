import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/:page', component: () => import('pages/DynamicPage.vue') },
      {
        path: '/catalog/:category',
        component: () => import('pages/Category.vue'),
      },
      {
        path: '/catalog/:category/:item',
        component: () => import('pages/Item.vue'),
      },
      {
        path: '/articles/:article',
        component: () => import('pages/Article.vue'),
      },
      {
        path: '/search',
        component: () => import('pages/Search.vue'),
      },
      {
        path: '/cart',
        component: () => import('pages/Cart.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
