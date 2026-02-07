<template>
  <div class="relative">
    <NavBar />

    <div class="min-h-app mx-auto mt-8 w-full max-w-(--breakpoint-xl) px-6 pb-8">
      <!-- RETURN BTN -->
      <!-- <Button
        v-if="route.query.from"
        icon="pi pi-chevron-left"
        :label="$t('common.back')"
        @click="onBack"
        class="mb-4"
      ></Button> -->

      <RouterView />
    </div>

    <MobileTabs />
  </div>
</template>

<script setup lang="ts">
// const router = useRouter()
// const route = useRoute()

// const onBack = () => {
//   router.push(route.query.from as string)
// }

// DATA FETCHING
const store = useStore()
const RLStore = useRLStore()

onMounted(async () => {
  await RLStore.getSeries()
  await RLStore.getMatches()
  await store.getForecastPoints(RLStore.focusSerieId)
})

watch(
  () => RLStore.focusSerieId,
  (newValue) => {
    store.getForecastPoints(newValue)
    RLStore.getMatches(newValue)
  }
)
</script>
