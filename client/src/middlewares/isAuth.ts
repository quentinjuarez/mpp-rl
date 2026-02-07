import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  NavigationGuardNext
} from 'vue-router'

const isAuth = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext
) => {
  const store = useStore()

  if (store.isAuthenticated) {
    store.getMe()
    next()
  } else {
    const redirect = to.name === 'index' ? undefined : to.fullPath
    next({
      name: 'login',
      query: {
        redirect
      }
    })
  }
}

export default isAuth
