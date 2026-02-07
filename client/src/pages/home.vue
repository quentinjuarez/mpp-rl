<template>
  <div class="space-y-10">
    <div class="space-y-1 text-center">
      <h1 class="text-3xl font-bold">{{ $t('pages.home.title') }}</h1>
      <p class="text-neutral-600 dark:text-neutral-400">{{ $t('pages.home.subtitle') }}</p>
    </div>

    <div v-if="serie" class="flex items-center gap-4">
      <img
        :src="serie.league.image_url"
        alt=""
        class="h-16 w-16 rounded-lg border border-neutral-300 bg-neutral-100 object-contain p-1 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <div>
        <h2 class="text-2xl font-semibold">{{ serie.full_name }}</h2>
        <p class="text-neutral-600 dark:text-neutral-400">
          {{ serie.league.name }} – {{ serie.year }}
        </p>
      </div>
    </div>

    <!-- Running Matches -->
    <div v-if="runningMatches.length" class="space-y-6">
      <h2 class="text-2xl font-semibold text-green-400 dark:text-green-700">
        {{ $t('pages.home.liveMatches') }}
      </h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <MatchItem
          v-for="match in runningMatches"
          :key="match.id"
          :match="match"
          status="running"
        />
      </div>
    </div>

    <!-- Next Match -->
    <div
      v-else-if="nextMatch"
      class="flex flex-col items-center space-y-4 rounded-xl border border-neutral-300 bg-neutral-100 p-6 shadow dark:border-neutral-700 dark:bg-neutral-900"
    >
      <h2 class="text-center text-2xl font-semibold text-blue-400 dark:text-blue-700">
        {{ $t('pages.home.nextMatch') }}
      </h2>

      <div class="text-center text-neutral-600 dark:text-neutral-400">
        <span class="text-4xl font-bold">{{ nextMatchCountdown }}</span>
      </div>
      <MatchItem :match="nextMatch" status="upcoming" />
    </div>

    <!-- No Matches -->
    <div v-else class="text-center text-lg text-neutral-500 italic dark:text-neutral-500">
      {{ $t('pages.home.noMatchesAvailable') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const RLStore = useRLStore()

const { serie, runningMatches, upcomingMatches } = storeToRefs(RLStore)

const nextMatch = computed(() => {
  const sortedUpcoming = [...upcomingMatches.value].sort(
    (a, b) => new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime()
  )
  return sortedUpcoming.length > 0 ? sortedUpcoming[0] : null
})

const nextMatchCountdown = ref('')

watchEffect(() => {
  if (!nextMatch.value) {
    nextMatchCountdown.value = ''
    return
  }

  const updateCountdown = () => {
    const matchTime = new Date(nextMatch.value?.begin_at || 0).getTime()
    const now = Date.now()
    const diff = matchTime - now

    if (diff <= 0) {
      nextMatchCountdown.value = t('pages.home.startingNow')
      return
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    nextMatchCountdown.value = `${hours}${t('time.hoursSuffix')}${minutes}${t('time.minutesSuffix')}${seconds}${t('time.secondsSuffix')}`
  }

  updateCountdown()
  const interval = setInterval(updateCountdown, 1000)

  onUnmounted(() => clearInterval(interval))
})
</script>
