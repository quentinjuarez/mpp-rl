const DEFAULT = 'fr'

const getUserLanguage = () => {
  if (!window?.navigator?.language) return DEFAULT

  return window.navigator.language.split('-')[0] || DEFAULT
}

export default getUserLanguage
