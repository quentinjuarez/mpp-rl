<template>
  <div class="space-y-2" :id="String(props.match.id)">
    <div
      class="flex items-center justify-center gap-1 text-center text-neutral-600 dark:text-neutral-400"
    >
      <p>
        {{ time }}
      </p>
      <button
        class="flex size-5 cursor-pointer items-center justify-center rounded-full bg-neutral-300 dark:bg-neutral-700"
        @click="emit('display')"
      >
        <Icon name="info" class="text-sm! text-neutral-600 dark:text-neutral-400" />
      </button>
    </div>

    <ScoreForecast
      v-if="props.match.status === 'not_started'"
      :match="props.match"
      :winner="winner"
      :blue="blue"
      :orange="orange"
      :forecast="forecast"
      :maxScore="maxScore"
      :notPlanned="notPlanned"
      @update="emit('update', $event)"
    />

    <ScoreDisplay
      v-else-if="props.match.status === 'running' || props.match.status === 'finished'"
      :match="props.match"
    />

    <!-- <div class="text-center text-neutral-400">Best of {{ props.match.number_of_games }}</div> -->
    <div
      class="mx-auto flex items-center justify-center gap-2 text-neutral-800 dark:text-neutral-300"
    >
      <span class="relative flex size-3">
        <span
          class="absolute inline-flex h-full w-full rounded-full opacity-75"
          :class="[statusClass, { 'animate-ping': props.match.status === 'running' }]"
        ></span>
        <span class="relative inline-flex size-3 rounded-full" :class="statusClass"></span>
      </span>
      <div>{{ $t(`status.${props.match.status}`) }}</div>
    </div>

    <ForecastData :forecast="forecast" :match="match" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  match: PSMatch
  forecast?: Forecast
  winner?: 'blue' | 'orange'
  blue?: number
  orange?: number
  maxScore: number
  notPlanned?: boolean
}>()

const emit = defineEmits<{
  (event: 'update', value: { blue: string; orange: string }): void
  (event: 'display'): void
}>()

const time = computed(() => {
  const date = new Date(props.match.begin_at)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const statusClass = computed(() => {
  if (props.match.status === 'not_started') return 'bg-neutral-600'
  if (props.match.status === 'running') return 'bg-green-500'
  if (props.match.status === 'finished') return 'bg-red-500'
  return ''
})
</script>
