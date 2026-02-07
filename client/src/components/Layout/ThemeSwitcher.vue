<template>
  <Button
    severity="secondary"
    @click="toggleTheme"
    :aria-label="$t('layout.themeSwitcher.toggleThemeLabel')"
  >
    <i v-if="currentTheme === 'dark'" class="pi pi-sun text-xl text-orange-500"></i>
    <i v-else class="pi pi-moon text-xl text-blue-500"></i>
  </Button>
</template>

<script setup lang="ts">
const { currentTheme, toggleTheme } = useTheme()

const handleKeydown = (event: KeyboardEvent) => {
  if (
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    (event.key === 'L' || event.key === 'l')
  ) {
    event.preventDefault()
    toggleTheme()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Add any component-specific styles here if needed */
button {
  transition: background-color 0.2s ease-in-out;
}
i {
  transition: color 0.2s ease-in-out;
}
</style>
