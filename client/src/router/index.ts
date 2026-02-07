import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import routes from './routes'

export default () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: routes as RouteRecordRaw[]
  })

  return router
}
