<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-2">
      <label for="username">
        <span>{{ $t('common.username') }}</span>
      </label>

      <InputText class="w-full" id="username" autocomplete="off" :value="username" disabled />
    </div>
    <div class="flex flex-col gap-2">
      <label for="username">
        <span>{{ $t('pages.user.forecastsLabel') }}</span>
      </label>
      <div class="flex flex-col items-center gap-2">
        <MatchItem v-for="match in matches" :key="match.id" :match="match" readonly />
      </div>
      <div v-if="!matches.length" class="text-center text-neutral-400">
        {{ $t('common.noForecastsFound') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useStore()

const { user, forecasts } = storeToRefs(store)

const username = computed(() => {
  return user.value?.username
})

const matches = computed(() => {
  return forecasts.value.map(({ match }) => match) as PSMatch[]
})
</script>
