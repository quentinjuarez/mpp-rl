<template>
  <header
    class="sticky inset-x-0 top-0 z-50 h-18 w-full border-b border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
  >
    <div class="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-6">
      <div class="flex items-center gap-2 md:gap-4">
        <div class="flex justify-center">
          <RouterLink
            to="/"
            class="flex h-full w-12 items-center justify-center rounded-full text-center md:w-16"
          >
            <img
              src="@/assets/logo.png"
              :alt="$t('layout.navBar.homeAltText')"
              class="h-8 w-8 md:h-10 md:w-10"
            />
          </RouterLink>
        </div>

        <Tabs :value="focusRoute" class="hidden! md:flex!">
          <TabList>
            <Tab
              v-for="tab in items"
              :key="tab.label"
              :value="tab.route"
              @click="handleClick(tab.route)"
              class="px-4!"
            >
              <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                <a
                  v-ripple
                  :href="href"
                  @click="navigate"
                  class="flex items-center gap-2 text-inherit"
                >
                  <i :class="tab.icon"></i>
                  <span class="hidden md:block">{{ $t(`title.${tab.label}`) }}</span>
                </a>
              </router-link>
            </Tab>
          </TabList>
        </Tabs>
      </div>

      <div class="flex items-center gap-4">
        <SeriesSelector />

        <Tag icon="pi pi-trophy" severity="success" :value="store.points"></Tag>

        <ThemeSwitcher class="hidden md:flex" />
        <UserMenu class="hidden md:flex" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const store = useStore()
const route = useRoute()
const router = useRouter()

const items = ref([
  { route: '/matches', label: 'matches', icon: 'pi pi-trophy' },
  // { route: '/forecasts', label: 'forecasts', icon: 'pi pi-chart-line' },
  { route: '/leaderboard', label: 'leaderboard', icon: 'pi pi-list' }
])

const mounted = ref(false)

onMounted(async () => {
  // fix initial focus route animation
  setTimeout(() => {
    mounted.value = true
  }, 500)
})

const focusRoute = computed(() => {
  if (!mounted.value) return ''
  const path = route.fullPath
  return items.value.find((item) => path.startsWith(item.route))?.route || ''
})

const handleClick = (route: string) => {
  if (route === focusRoute.value) return
  router.push(route)
}
</script>

<style>
.p-tablist-tab-list {
  background: none !important;
  border: none !important;
  height: 68px;
}

.p-tab {
  border: none !important;
}
</style>
