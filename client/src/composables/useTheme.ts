type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'user-theme'

export function useTheme() {
  const currentTheme = ref<Theme>('light')

  const applyTheme = (theme: Theme) => {
    currentTheme.value = theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }

  const toggleTheme = () => {
    applyTheme(currentTheme.value === 'light' ? 'dark' : 'light')
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

    if (savedTheme) {
      applyTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark ? 'dark' : 'light')
    }
  }

  onMounted(() => {
    initTheme()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light')
      }
    })
  })

  return { currentTheme, toggleTheme }
}
