import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  NavigationGuardNext
} from 'vue-router'

const getUser = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext
) => {
  const store = useStore()

  const username = to.params.username as string

  store.getUser(username)
  next()
}

export default getUser
