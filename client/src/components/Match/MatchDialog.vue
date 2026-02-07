<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="props.match.name"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1024px': '75vw', '768px': '90vw' }"
  >
    <div class="space-y-6">
      <!-- Match Info -->
      <div class="flex justify-between text-sm text-neutral-800 dark:text-neutral-200">
        <div>
          <strong>{{ $t('match.bestOf') }}</strong> BO{{ props.match.number_of_games }}
        </div>
        <div>
          <strong>{{ $t('match.statusLabel') }}</strong> {{ props.match.status }}
        </div>
        <div>
          <strong>{{ $t('match.scheduledLabel') }}</strong>
          {{ new Date(props.match.scheduled_at).toLocaleString() }}
        </div>
      </div>

      <!-- Teams -->
      <div class="flex items-center justify-around">
        <div class="flex flex-col items-center gap-1">
          <img
            :src="blueTeam?.image_url || defaultImageUrl"
            alt=""
            class="h-12 w-12 object-contain"
          />
          <div class="text-sm font-semibold">{{ blueTeam?.name }}</div>
        </div>

        <div class="text-neutral-800 dark:text-neutral-200">{{ $t('match.versus') }}</div>

        <div class="flex flex-col items-center gap-1">
          <img
            :src="orangeTeam?.image_url || defaultImageUrl"
            alt=""
            class="h-12 w-12 object-contain"
          />
          <div class="text-sm font-semibold">{{ orangeTeam?.name }}</div>
        </div>
      </div>

      <!-- Games -->
      <div>
        <h3 class="mb-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {{ $t('match.gamesHeading') }}
        </h3>
        <ul class="space-y-2 text-sm">
          <li
            v-for="game in props.match.games"
            :key="game.id"
            class="space-y-1 rounded border border-neutral-300 bg-neutral-200 p-3 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div class="flex justify-between">
              <span class="font-semibold text-neutral-800 dark:text-neutral-200">
                {{ $t('match.gameLabel', { number: game.position }) }}
              </span>
              <span>
                <span
                  v-if="game.winner?.id === blueTeam?.id"
                  class="text-blue-400 dark:text-blue-700"
                >
                  {{ $t('match.gameWon', { teamName: blueTeam?.name }) }}
                </span>
                <span
                  v-else-if="game.winner?.id === orangeTeam?.id"
                  class="text-orange-400 dark:text-orange-700"
                >
                  {{ $t('match.gameWon', { teamName: orangeTeam?.name }) }}
                </span>
                <span v-else class="text-neutral-700 dark:text-neutral-300">{{
                  $t('match.notFinished')
                }}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ match: PSMatch }>()

const visible = ref(true)
const emit = defineEmits(['close'])

watch(visible, (value) => {
  if (!value) emit('close')
})

const blueTeam = computed(() => props.match.opponents?.[0]?.opponent)
const orangeTeam = computed(() => props.match.opponents?.[1]?.opponent)

const defaultImageUrl = 'https://img.icons8.com/?size=100&id=hQSBVk8KAnp1&format=png&color=000000'
</script>
