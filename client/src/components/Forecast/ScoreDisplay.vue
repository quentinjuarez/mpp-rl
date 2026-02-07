<template>
  <div class="flex w-[153px] flex-none items-center justify-center gap-4">
    <div
      class="flex size-12 items-center justify-center rounded-md border-2 bg-neutral-300 text-center dark:bg-neutral-700"
      :class="{
        'border-blue': winner === 'blue',
        'border-neutral-200 dark:border-neutral-800': winner !== 'blue'
      }"
    >
      {{ blueScoreDisplay }}
    </div>

    <Icon :name="'check'" class="text-neutral-600 opacity-0 dark:text-neutral-400" />

    <div
      class="flex size-12 items-center justify-center rounded-md border-2 bg-neutral-300 text-center dark:bg-neutral-700"
      :class="{
        'border-orange': winner === 'orange',
        'border-neutral-200 dark:border-neutral-800': winner !== 'orange'
      }"
    >
      {{ orangeScoreDisplay }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  match: PSMatch
}>()

// On récupère les équipes
const blueTeamId = props.match.opponents?.[0]?.opponent.id
const orangeTeamId = props.match.opponents?.[1]?.opponent.id

// Scores
const blueScore = computed(() => props.match.results.find((r) => r.team_id === blueTeamId)?.score)
const orangeScore = computed(
  () => props.match.results.find((r) => r.team_id === orangeTeamId)?.score
)

const blueScoreDisplay = computed(() => blueScore.value ?? '_')
const orangeScoreDisplay = computed(() => orangeScore.value ?? '_')

// Détermination du gagnant
const winner = computed(() => {
  if (props.match.winner_id === blueTeamId) return 'blue'
  if (props.match.winner_id === orangeTeamId) return 'orange'
  return null
})
</script>
