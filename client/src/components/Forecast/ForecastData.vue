<template>
  <div class="text-sm">
    <div v-if="!props.forecast" class="text-neutral-500 italic dark:text-neutral-500">
      {{ $t('forecast.noForecastSubmitted') }}
    </div>

    <div v-else class="flex items-center justify-center gap-1">
      <span :class="statusColor">
        {{
          !props.forecast.processed
            ? $t('forecast.pending')
            : props.forecast.exact
              ? $t('forecast.exact')
              : props.forecast.correct
                ? $t('forecast.correct')
                : $t('forecast.incorrect')
        }}
      </span>

      <span v-if="props.forecast.processed" class="">
        - {{ points }} {{ $t('forecast.pointsSuffix') }}
      </span>
    </div>

    <div v-if="props.forecast" class="text-center">
      ( {{ forecast?.blue }} - {{ forecast?.orange }} )
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  forecast?: Forecast
}>()

type Forecast = {
  _id: number
  blue: number
  orange: number
  matchId: number
  tournamentId: number
  serieId: number
  userId: number
  processed: boolean
  correct: boolean
  exact: boolean
  match?: PSMatch
}

const points = computed(() => {
  if (!props.forecast?.processed) return 0
  return props.forecast.exact ? 150 : props.forecast.correct ? 100 : 0
})

const statusColor = computed(() => {
  if (!props.forecast?.processed) return 'text-yellow-400 dark:text-yellow-700'
  if (props.forecast?.exact) return 'text-green-400 dark:text-green-700'
  if (props.forecast?.correct) return 'text-blue-400 dark:text-blue-700'
  return 'text-red-400 dark:text-red-700'
})
</script>
