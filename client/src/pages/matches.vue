<template>
  <div class="space-y-4 pb-4">
    <h1 class="text-4xl font-bold">{{ $t('title.matches') }}</h1>

    <div v-if="store.loading" class="text-center text-neutral-600 dark:text-neutral-400">
      {{ $t('common.loading') }}
    </div>

    <div v-else class="mx-auto flex flex-col items-center space-y-4">
      <!-- Calendar list -->
      <div
        class="top-18 sticky z-10 mx-auto flex w-full items-center justify-center space-x-2 bg-neutral-100 px-4 py-2 dark:bg-neutral-900"
      >
        <Button icon="pi pi-chevron-left" @click="prevDay"></Button>

        <!-- <button @click="prevDay" class="rounded bg-neutral-300 dark:bg-neutral-700 p-2">Prev</button> -->
        <div class="flex max-w-[calc(100vw-128px)] space-x-2 overflow-auto md:max-w-[400px]">
          <button
            v-for="day in days"
            :key="day.getTime()"
            @click="focusDay = new Date(day)"
            class="flex flex-col items-center gap-1 rounded px-2 py-1 text-neutral-800 transition-colors hover:bg-black/10 dark:text-neutral-200 dark:hover:bg-white/10"
            :class="[{ '!bg-blue !text-neutral-100 dark:!text-neutral-100': isFocusedDay(day) }]"
          >
            <span class="text-xs">{{ getDay(day) }}</span>
            <span class="text-center text-xl">{{ day.getDate() }}</span>
            <p></p>
          </button>
        </div>
        <Button icon="pi pi-chevron-right" @click="nextDay"></Button>
      </div>

      <div v-if="focusMatches.length" class="space-y-2">
        <MatchItem v-for="match in focusMatches" :key="match.id" :match="match" />
      </div>

      <div v-else class="text-center text-neutral-700 dark:text-neutral-300">{{ $t('common.noResultsFound') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const RLStore = useRLStore()
const store = useStore()

const { serie, matches } = storeToRefs(RLStore)

const route = useRoute()

onMounted(() => {
  init()
})

const init = (force = false) => {
  const { d } = route.query
  const serieBeginAt = serie.value?.begin_at
  const serieEndAt = serie.value?.end_at
  const today = new Date()

  // Set focusDay based on query or serie dates
  if (d && !force) {
    focusDay.value = new Date(d as string)
  } else {
    focusDay.value = serieBeginAt && today < new Date(serieBeginAt) ? new Date(serieBeginAt) : today

    if (serieEndAt && today > new Date(serieEndAt)) {
      focusDay.value = new Date(serieEndAt)
    }
  }
}

const focusMatches = computed(() => {
  const day = focusDay.value.toISOString().split('T')[0]

  const array = matches.value
    .filter((match) => {
      // console.log(day === match.begin_at.split('T')[0])
      return day === match.begin_at.split('T')[0]
    })
    .sort((a, b) => {
      return new Date(a.begin_at).getTime() - new Date(b.begin_at).getTime()
    })

  return array
})

const focusDay = ref<Date>(new Date())

const days = computed(() => {
  const now = new Date()
  if (!serie.value) return [now]

  const start = new Date(serie.value.begin_at)
  const end = new Date(serie.value.end_at)

  const daysArray = []

  for (let i = start; i <= end; i.setDate(i.getDate() + 1)) {
    daysArray.push(new Date(i))
  }

  return daysArray
})

function isFocusedDay(day: Date): boolean {
  return formatDate(focusDay.value) === formatDate(day)
}

function prevDay() {
  const currentIndex = days.value.findIndex((day) => formatDate(focusDay.value) === formatDate(day))
  if (currentIndex > 0) {
    focusDay.value = days.value[currentIndex - 1]
  }
}

function nextDay() {
  const currentIndex = days.value.findIndex((day) => formatDate(focusDay.value) === formatDate(day))
  if (currentIndex < days.value.length - 1) {
    focusDay.value = days.value[currentIndex + 1]
  }
}

const router = useRouter()

watch(focusDay, () => {
  router.replace({ query: { ...route.query, d: focusDay.value.toISOString().split('T')[0] } })
})

const getDay = (date: Date): string => {
  const browserLocale = navigator.language

  return `${date.toLocaleDateString(browserLocale, { weekday: 'long' })}`
}

watch(
  () => RLStore.focusSerieId,
  () => {
    const newBeginAt = RLStore.serie?.begin_at

    const newEndAt = RLStore.serie?.end_at

    if (newBeginAt && newEndAt) {
      const beginDate = new Date(newBeginAt)
      const endDate = new Date(newEndAt)

      if (focusDay.value < beginDate || focusDay.value > endDate) {
        focusDay.value = beginDate
      }
    }
  }
)
</script>
