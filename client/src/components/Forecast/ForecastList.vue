<template>
  <div class="mb-4 flex items-center gap-4">
    <DataTable v-if="forecasts.length" :value="forecasts" stripedRows>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
    <p v-else>{{ $t('common.noForecastsFound') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  match: PSMatch
}>()

const blueTeam = computed(() => props.match.opponents?.[0].opponent)
const orangeTeam = computed(() => props.match.opponents?.[1].opponent)

const columns = [
  { field: 'username', header: t('common.username') },
  { field: 'blue', header: blueTeam.value?.name },
  { field: 'orange', header: orangeTeam.value?.name }
]

const store = useStore()
const loading = ref(false)

const visible = ref(true)

const emit = defineEmits(['close'])

const forecasts = ref<Forecast[]>([])

onMounted(async () => {
  loading.value = true
  forecasts.value = await store.getForecastsByMatchId(props.match.id)
  loading.value = false
})

watch(visible, (value) => {
  if (!value) {
    emit('close')
  }
})
</script>
