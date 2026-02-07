<template>
  <div class="h-app flex flex-col items-center justify-center p-5 text-center font-sans">
    <img src="@/assets/logo.png" alt="" class="mb-6 size-32" />
    <h1 class="mb-4 text-5xl text-neutral-800 dark:text-neutral-200">
      {{ $t('error.notFound.title') }}
    </h1>
    <p class="mb-8 text-xl text-neutral-600 dark:text-neutral-400">
      {{ $t('error.notFound.message') }}
    </p>
    <router-link
      to="/"
      class="inline-block rounded-md bg-blue-500 px-4 py-2 text-base text-white no-underline transition-colors duration-300 ease-in-out hover:bg-blue-700"
    >
      {{ $t('error.notFound.homeButton') }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
// No script needed for this simple page
</script>

<style scoped>
/* All custom styles have been replaced by Tailwind CSS classes */
</style>
