<template>
  <div class="space-y-4">
    <h1 class="text-4xl font-bold">{{ $t('title.profile') }}</h1>

    <div class="space-y-2">
      <h2 class="text-2xl font-semibold">{{ $t('pages.profile.personalInformation') }}</h2>
      <div class="flex flex-col gap-2 md:flex-row">
        <div class="flex w-full flex-col gap-2">
          <label for="firstName">
            <span>{{ $t('pages.profile.firstNameLabel') }}</span>
          </label>
          <InputText id="firstName" v-model="firstName" disabled />
        </div>
        <div class="flex w-full flex-col gap-2">
          <label for="lastName">
            <span>{{ $t('pages.profile.lastNameLabel') }}</span>
          </label>
          <InputText id="lastName" v-model="lastName" disabled />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email">
          <span>{{ $t('common.email') }}</span>
        </label>
        <InputText id="email" v-model="email" type="email" disabled autocomplete="email" />
      </div>
    </div>

    <Divider></Divider>

    <div class="space-y-2">
      <h2 class="text-2xl font-semibold">{{ $t('pages.profile.accountInformation') }}</h2>

      <div class="flex flex-col gap-2">
        <label for="username">
          <span>{{ $t('common.username') }}</span>
          <span class="ml-1 text-red-500">*</span>
        </label>

        <IconField>
          <InputText
            class="w-full"
            id="username"
            autocomplete="off"
            v-model="username"
            :class="{
              'focus:border-neutral-500!': notChangedUsername,
              'focus:border-red-500!': !usernameValidation || !usernameIsAvailable,
              'focus:border-green-500!': usernameIsAvailable && usernameValidation
            }"
            :placeholder="$t('pages.profile.usernamePlaceholder')"
            @update:modelValue="checkUsernameDebounced"
          />
          <InputIcon
            :class="{ 'opacity-0': !loadingCheckUsername }"
            class="pi pi-spin pi-spinner"
          />
        </IconField>
      </div>

      <Button
        class="w-full"
        type="button"
        :disabled="disabledUsername || !usernameIsAvailable"
        @click="updateUsername"
      >
        {{ $t('pages.profile.updateUsernameButton') }}
      </Button>
    </div>

    <Divider></Divider>

    <div class="space-y-2">
      <h2 class="text-2xl font-semibold">{{ $t('pages.profile.languageSettings.title') }}</h2>
      <div class="flex flex-col gap-2">
        <label for="languageSelector">{{ $t('pages.profile.languageSettings.selectLabel') }}</label>
        <Dropdown
          id="languageSelector"
          v-model="locale"
          :options="languageOptions"
          optionLabel="label"
          optionValue="code"
          :placeholder="$t('pages.profile.languageSettings.selectPlaceholder')"
          class="w-full md:w-1/2"
        />
      </div>
    </div>

    <Divider></Divider>

    <div class="space-y-2">
      <h2 class="text-2xl font-semibold">{{ $t('pages.profile.changePassword') }}</h2>
      <div class="flex flex-col gap-2">
        <label for="old-password">
          <span>{{ $t('pages.profile.oldPasswordLabel') }}</span>
          <span class="ml-1 text-red-500">*</span>
        </label>
        <Password
          class="*:w-full"
          id="old-password"
          v-model="oldPassword"
          toggleMask
          :feedback="false"
          :class="{ 'focus:*:border-red-500!': !oldPasswordValidation }"
          :placeholder="$t('pages.profile.oldPasswordPlaceholder')"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="new-password">
          <span>{{ $t('pages.profile.newPasswordLabel') }}</span>
          <span class="ml-1 text-red-500">*</span>
        </label>
        <Password
          class="*:w-full"
          id="new-password"
          v-model="newPassword"
          toggleMask
          :feedback="false"
          :class="{ 'focus:*:border-red-500!': !newPasswordValidation }"
          :placeholder="$t('pages.profile.newPasswordPlaceholder')"
        />
      </div>

      <Button class="w-full" type="button" :disabled="disabledPassword" @click="updatePassword">
        {{ $t('pages.profile.updatePasswordButton') }}
      </Button>
    </div>

    <Divider></Divider>

    <Button as="router-link" to="/logout" class="mb-auto w-full bg-red-500!" severity="danger">
      {{ $t('pages.profile.logoutButton') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce'
const store = useStore()

const { firstName, lastName, email } = store.me!

const username = ref(store.me!.username)

const usernameValidation = computed(() => isValidUsername(username.value))

const disabledUsername = computed(
  () => !usernameValidation.value || username.value === store.me!.username
)

const notChangedUsername = computed(() => username.value === store.me!.username)

const usernameIsAvailable = ref(true)
const loadingCheckUsername = ref(false)

const checkUsername = async () => {
  if (!usernameValidation.value) return

  loadingCheckUsername.value = true
  usernameIsAvailable.value = await store.checkUsername(username.value)
  loadingCheckUsername.value = false
}

const checkUsernameDebounced = debounce(checkUsername, 500)

const updateUsername = async () => {
  if (disabledUsername.value) return

  await store.updateMe({ username: username.value })
}

const oldPassword = ref('')
const newPassword = ref('')

const oldPasswordValidation = computed(() => isValidPassword(oldPassword.value))
const newPasswordValidation = computed(() => isValidPassword(newPassword.value))

const disabledPassword = computed(
  () => !oldPasswordValidation.value || !newPasswordValidation.value
)

const updatePassword = async () => {
  if (disabledPassword.value) return

  await store.updatePassword({ oldPassword: oldPassword.value, newPassword: newPassword.value })
}

const { locale } = useI18n()

const languageOptions = [
  { label: 'English', code: 'en' },
  { label: 'Français', code: 'fr' }
]
</script>
