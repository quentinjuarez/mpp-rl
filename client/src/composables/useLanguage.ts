type Language = 'en' | 'fr'

const LANGUAGE_STORAGE_KEY = 'user-language'

export function useLanguage() {
  const currentLanguage = ref<Language>('fr')

  const applyLanguage = (language: Language) => {
    console.log(`Applying language: ${language}`)
    currentLanguage.value = language
    if (language === 'en') {
      document.documentElement.classList.add('en')
    } else {
      document.documentElement.classList.remove('en')
    }
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }

  const toggleLanguage = () => {
    applyLanguage(currentLanguage.value === 'fr' ? 'en' : 'fr')
  }

  const initLanguage = () => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null

    if (savedLanguage) {
      applyLanguage(savedLanguage)
    } else {
      const prefersEn = window.matchMedia('(prefers-color-scheme: en)').matches
      applyLanguage(prefersEn ? 'en' : 'fr')
    }
  }

  onMounted(() => {
    initLanguage()

    window.matchMedia('(prefers-color-scheme: en)').addEventListener('change', (e) => {
      if (!localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
        applyLanguage(e.matches ? 'en' : 'fr')
      }
    })
  })

  return { currentLanguage, toggleLanguage }
}
