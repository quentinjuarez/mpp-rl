<template>
  <div class="flex items-center gap-2">
    <i class="pi pi-globe text-neutral-800 dark:text-neutral-200"></i>
    <div class="flex items-center gap-2">
      <div v-for="option in languageOptions" :key="option.code" class="flex items-center gap-1">
        <input
          type="radio"
          :id="`lang-${option.code}`"
          name="language"
          :value="option.code"
          v-model="locale"
          class="hidden"
        />
        <label
          :for="`lang-${option.code}`"
          class="cursor-pointer text-neutral-600 dark:text-neutral-400"
          :class="{ 'font-bold text-neutral-800! dark:text-neutral-200!': locale === option.code }"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const languageOptions = [
  { label: 'English', code: 'en' },
  { label: 'Français', code: 'fr' }
]
</script>
