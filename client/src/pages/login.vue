<template>
  <h1 class="text-4xl md:text-6xl">{{ $t('pages.login.heading') }}</h1>

  <div class="space-y-2">
    <Button class="w-full" :href="googleUrl" as="a">
      <i class="pi pi-google mr-1"></i>
      {{ $t('pages.login.loginWithGoogle') }}
    </Button>

    <Divider>{{ $t('common.or') }}</Divider>

    <div class="flex flex-col gap-2">
      <label for="email">
        <span>{{ $t('common.email') }}</span>
        <span class="ml-1 text-red-500">*</span>
      </label>
      <InputText
        id="email"
        v-model="email"
        type="email"
        :class="{ 'focus:border-red-500!': !emailValidation }"
        :placeholder="$t('pages.login.emailPlaceholder')"
      />
    </div>
    <div class="flex flex-col gap-2">
      <label for="password">
        <span>{{ $t('common.password') }}</span>
        <span class="ml-1 text-red-500">*</span>
      </label>
      <Password
        class="*:w-full"
        id="password"
        v-model="password"
        toggleMask
        :feedback="false"
        :class="{ 'focus:*:border-red-500!': !passwordValidation }"
        :placeholder="$t('pages.login.passwordPlaceholder')"
      />
    </div>

    <Button class="w-full" :disabled="disabled" :loading="loading" @click="onLogin" type="button">
      {{ $t('pages.login.heading') }}
    </Button>

    <div class="flex flex-col">
      <Button :to="registerUrl" as="router-link" link size="small">
        {{ $t('pages.login.registerPrompt') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const emailValidation = computed(() => {
  return isValidEmail(email.value)
})

const passwordValidation = computed(() => {
  return isValidPassword(password.value)
})

const disabled = computed(() => {
  return !emailValidation.value || !passwordValidation.value
})

const loading = ref(false)

const onLogin = async () => {
  if (disabled.value) return

  loading.value = true

  const res = await store.login({ email: email.value, password: password.value })

  loading.value = false

  if (res) {
    router.push((route.query.redirect as string) || '/')
  } else {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.login.invalidCredentialsToast'),
      life: 3000
    })
  }
}

const registerUrl = computed(() => {
  if (!route.query.redirect) return '/register'
  return `/register?redirect=${route.query.redirect}`
})

const googleUrl = computed(() => {
  return `${import.meta.env.VITE_APP_BACK_URL}/api/auth/google`
})

const toast = useToast()
</script>

<style>
.dark.p-divider-content {
  background-color: var(--color-neutral-950) !important;
}

.p-divider-content {
  background-color: var(--color-neutral-50) !important;
}
</style>
