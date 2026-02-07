<template>
  <div class="h-app flex flex-col items-center justify-center gap-4 p-4">
    <div
      class="max-h-[calc(100vh-16px)] w-full max-w-(--breakpoint-sm) space-y-10 overflow-y-auto rounded-2xl bg-neutral-50 p-6 shadow-lg shadow-neutral-200 dark:bg-neutral-950 dark:shadow-neutral-800"
    >
      <slot></slot>
    </div>

    <div class="bottom-4 mx-auto flex flex-col gap-4 md:absolute">
      <div class="flex items-center justify-center gap-4">
        <LanguageSwitcher />
        <span class="mx-1">|</span>
        <ThemeSwitcher />
      </div>

      <div class="h-5 text-xs text-neutral-600 dark:text-neutral-400">
        <span>© {{ year }} Quentin Juarez</span>
        <span class="mx-1">|</span>
        <span>All rights reserved</span>
        <span class="mx-1">|</span>
        <span>Version {{ version }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const year = ref(new Date().getFullYear())

const version = ref(__APP_VERSION__)
</script>

<style scoped></style>
