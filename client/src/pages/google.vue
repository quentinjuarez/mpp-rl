<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const store = useStore()

onMounted(async () => {
  try {
    const { code } = route.query as { code?: string }
    if (!code) return router.push('/')

    const res = await store.loginGoogle({ code })

    if (res) router.push('/')

    return router.push('/')
  } catch (error) {
    console.error(error)
    router.push('/')
  }
})
</script>
