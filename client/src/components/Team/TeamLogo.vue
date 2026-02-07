<template>
  <component
    :is="props.canForecast ? 'button' : 'div'"
    :to="{ name: 'team', params: { slug: props.team.slug } }"
    class="flex flex-col items-center gap-2"
  >
    <div
      class="overflow-hidden rounded-full transition-all"
      :class="{
        'hover:scale-105': props.team.acronym !== 'TBD' && props.canForecast === true,
        'scale-105': props.color === props.winner,
        'scale-95 opacity-20': props.color !== props.winner && props.winner !== undefined
      }"
    >
      <img :src="props.team.image_url || defaultImageUrl" class="m-2 size-24 object-contain" />
    </div>
    <span class="truncate text-sm text-neutral-800 dark:text-neutral-200">
      {{ props.team.acronym || props.team.name }}
    </span>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    team?: PSTeam
    color?: 'blue' | 'orange'
    winner?: 'blue' | 'orange'
    canForecast?: boolean
  }>(),
  { team: () => ({ acronym: 'TBD', image_url: defaultImageUrl, id: -1 }) as unknown as PSTeam }
)

const defaultImageUrl = 'https://img.icons8.com/?size=100&id=hQSBVk8KAnp1&format=png&color=000000'
</script>
