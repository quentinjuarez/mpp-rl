<template>
  <h1 class="text-4xl md:text-6xl">{{ $t('pages.register.heading') }}</h1>

  <div class="space-y-2">
    <Button class="w-full" :href="googleUrl" as="a">
      <i class="pi pi-google mr-1"></i>
      {{ $t('pages.register.registerWithGoogle') }}
    </Button>

    <Divider>{{ $t('common.or') }}</Divider>

    <div class="flex flex-col gap-2 md:flex-row">
      <div class="flex w-full flex-col gap-2">
        <label for="firstName">
          <span>{{ $t('pages.profile.firstNameLabel') }}</span>
          <span class="ml-1 text-red-500">*</span>
        </label>
        <InputText
          id="firstName"
          v-model="firstName"
          :size="isMobile ? 'small' : undefined"
          :class="{ 'focus:border-red-500!': !firstNameValidation }"
          :placeholder="$t('pages.register.firstNamePlaceholder')"
        />
      </div>
      <div class="flex w-full flex-col gap-2">
        <label for="lastName">
          <span>{{ $t('pages.profile.lastNameLabel') }}</span>
          <span class="ml-1 text-red-500">*</span>
        </label>
        <InputText
          id="lastName"
          v-model="lastName"
          :size="isMobile ? 'small' : undefined"
          :class="{ 'focus:border-red-500!': !lastNameValidation }"
          :placeholder="$t('pages.register.lastNamePlaceholder')"
        />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <label for="email">
        <span>{{ $t('common.email') }}</span>
        <span class="ml-1 text-red-500">*</span>
      </label>
      <InputText
        id="email"
        v-model="email"
        type="email"
        :size="isMobile ? 'small' : undefined"
        :class="{ 'focus:border-red-500!': !emailValidation }"
        :placeholder="$t('pages.register.emailPlaceholder')"
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
        :size="isMobile ? 'small' : undefined"
        :feedback="false"
        :class="{ 'focus:*:border-red-500!': !passwordValidation }"
      />
    </div>

    <Button
      class="w-full"
      :disabled="disabled"
      :loading="loading"
      @click="onRegister"
      type="button"
    >
      {{ $t('pages.register.heading') }}
    </Button>

    <div class="flex flex-col">
      <Button :to="loginUrl" as="router-link" link size="small">{{
        $t('pages.register.loginPrompt')
      }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()

const store = useStore()
const router = useRouter()
const route = useRoute()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const textValidation = (text: string) => text.trim().length > 0

const firstNameValidation = computed(() => textValidation(firstName.value))
const lastNameValidation = computed(() => textValidation(lastName.value))

const emailValidation = computed(() => {
  return isValidEmail(email.value)
})

const passwordValidation = computed(() => {
  return isValidPassword(password.value)
})

const loading = ref(false)

const disabled = computed(
  () =>
    !firstNameValidation.value ||
    !lastNameValidation.value ||
    !emailValidation.value ||
    !passwordValidation.value
)

const onRegister = async () => {
  if (disabled.value) return

  loading.value = true

  const res = await store.register({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value
  })

  loading.value = false

  if (res) {
    router.push((route.query.redirect as string) || '/')
  } else {
    toast.add({
      severity: 'error',
      summary: t('common.error'),
      detail: t('pages.register.registrationFailedToast'),
      life: 3000
    })
  }
}

const loginUrl = computed(() => {
  if (!route.query.redirect) return '/login'
  return `/login?redirect=${route.query.redirect}`
})

const googleUrl = computed(() => {
  return `${import.meta.env.VITE_APP_BACK_URL}/api/auth/google`
})

const { isMobile } = useScreen()
</script>
