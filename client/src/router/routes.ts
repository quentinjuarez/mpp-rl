import isAuth from '@/middlewares/isAuth'
import getUser from '@/middlewares/getUser'

import defaultLayout from '@/layouts/default.vue'
import loadingLayout from '@/layouts/loading.vue'
import authLayout from '@/layouts/auth.vue'

const routes = [
  {
    path: '',
    name: 'index',
    component: () => import('@/pages/index.vue'),
    meta: { middlewares: [isAuth], layout: defaultLayout },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/home.vue'),
        meta: { middlewares: [] }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/profile.vue'),
        meta: { middlewares: [] }
      },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('@/pages/leaderboard.vue'),
        meta: { middlewares: [] }
      },
      {
        path: 'matches',
        name: 'matches',
        component: () => import('@/pages/matches.vue'),
        meta: { middlewares: [] }
      },
      {
        path: 'users/:username',
        name: 'user',
        component: () => import('@/pages/user.vue'),
        meta: { middlewares: [getUser] }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
    meta: { layout: authLayout }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/register.vue'),
    meta: { layout: authLayout }
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/pages/logout.vue'),
    meta: { layout: loadingLayout }
  },

  {
    path: '/oauth/google',
    name: 'oauth-google',
    component: () => import('@/pages/google.vue'),
    meta: { layout: loadingLayout }
  },
  // NOT FOUND
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/error.vue') }
]

export default routes
