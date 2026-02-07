import { createApp } from 'vue'
import './theme.css'
import './style.css'
import App from './App.vue'
import initRouter from './router'
import initPinia from './stores/plugin'
import initI18n from './i18n'
import vClickOutside from './plugins/vClickOutside'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import 'primeicons/primeicons.css'
import Vue3RouterMiddlewares from 'vue3-router-middlewares'

import ToastService from 'primevue/toastservice'

const app = createApp(App)

const router = initRouter()
app.use(router)

app.use(Vue3RouterMiddlewares, { router })

const pinia = initPinia(router)

app.use(pinia)

const i18n = initI18n()
app.use(i18n)

app.directive('click-outside', vClickOutside)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#C8DFFD',
      100: '#B5D4FC',
      200: '#8DBDFB',
      300: '#66A6FA',
      400: '#3E8FF8',
      500: '#1778F7',
      600: '#075ECF',
      700: '#054599',
      800: '#032C62',
      900: '#02142C',
      950: '#010811'
    }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.dark'
      // prefix: 'mpp-rl'
    }
  },
  ripple: false
})

app.use(ToastService)

app.directive('ripple', {})

app.mount('#app')
