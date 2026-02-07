<template>
  <div class="space-y-4">
    <h1 class="text-4xl font-bold">{{ $t('title.leaderboard') }}</h1>
    <DataTable :value="leaderboard" stripedRows selectionMode="single" @row-select="onSelect">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { DataTableRowSelectEvent } from 'primevue/datatable'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const RLStore = useRLStore()

const { leaderboard } = storeToRefs(store)

const columns = [
  { field: 'username', header: t('common.username') },
  { field: 'points', header: t('forecast.pointsSuffix') } // Assuming 'Points' refers to the same concept as 'pts'
]

const router = useRouter()

const onSelect = (event: DataTableRowSelectEvent<LeaderboardItem>) => {
  router.push({
    name: 'user',
    params: { username: encodeURIComponent(event.data.username) }
  })
}

// DATA FETCHING
onMounted(async () => {
  await store.getLeaderboard(RLStore.focusSerieId)
})

watch(
  () => RLStore.focusSerieId,
  (newValue) => {
    store.getLeaderboard(newValue)
  }
)
</script>
