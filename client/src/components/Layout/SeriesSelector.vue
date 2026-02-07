<template>
  <div class="flex justify-center">
    <Select
      v-model="RLStore.focusSerieId"
      :options="computedSeries"
      optionLabel="label"
      optionValue="id"
      :size="isMobile ? 'small' : undefined"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
const { isMobile } = useScreen()

const { t } = useI18n()
const RLStore = useRLStore()

const computedSeries = computed(() => {
  return RLStore.series.map((serie) => ({
    ...serie,
    label: `${serie.name} - ${serie.tournaments[0]?.region || t('common.na')}`
  }))
})

// const route = useRoute()
// const router = useRouter()

// watch(
//   () => RLStore.focusSerieId,
//   (newValue) => {
//     router.replace({ query: { ...route.query, serieId: newValue } })
//   }
// )
</script>
