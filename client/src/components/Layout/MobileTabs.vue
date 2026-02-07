<template>
  <footer
    class="sticky inset-x-0 bottom-0 z-50 h-18 w-full border-t border-neutral-300 bg-neutral-100 md:hidden dark:border-neutral-700 dark:bg-neutral-900"
  >
    <Tabs :value="focusRoute" class="px-12">
      <TabList>
        <Tab
          v-for="tab in items"
          :key="tab.label"
          :value="tab.route"
          @click="handleClick(tab.route)"
          class="px-4!"
        >
          <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
            <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
              <i :class="tab.icon" />
            </a>
          </router-link>
        </Tab>
      </TabList>
    </Tabs>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const items = ref([
  {
    route: `/`,
    label: 'home',
    icon: 'pi pi-home'
  },
  { route: '/matches', label: 'matches', icon: 'pi pi-trophy' },
  // { route: '/forecasts', label: 'forecasts', icon: 'pi pi-chart-line' },
  { route: '/leaderboard', label: 'leaderboard', icon: 'pi pi-list' },
  { route: '/profile', label: 'profile', icon: 'pi pi-user' }
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
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.p-tab {
  border: none !important;
}
</style>
