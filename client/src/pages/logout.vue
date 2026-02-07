<template>
  <div></div>
</template>

<script setup lang="ts">
const store = useStore()

onMounted(async () => {
  await store.logout()
})
</script>
