<template>
  <div
    class="font-default min-h-app selection:bg-blue bg-neutral-100 text-black selection:text-white dark:bg-neutral-900 dark:text-white"
  >
    <component :is="route.meta.layout || 'div'">
      <RouterView />
    </component>

    <Toast />
  </div>
</template>

<script setup lang="ts">
const { handleResize } = useScreen()

const route = useRoute()

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
