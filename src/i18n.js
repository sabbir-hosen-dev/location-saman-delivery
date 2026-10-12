import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import bn from './locale/bn.json'
import en from './locale/en.json'
import ar from './locale/ar.json'

const getSavedLanguage = () => {
  try {
    const saved = localStorage.getItem('saman-language-manual-choice') || localStorage.getItem('saman-language')
    return ['bn', 'en', 'ar'].includes(saved) ? saved : null
  } catch {
    return null
  }
}

const getBrowserLanguage = () => {
  const lang = (navigator.language || 'bn').toLowerCase()
  if (lang.startsWith('ar')) return 'ar'
  if (lang.startsWith('en')) return 'en'
  return 'bn'
}

const initialLanguage = getSavedLanguage() || getBrowserLanguage()

i18n.use(initReactI18next).init({
  resources: { bn: { translation: bn }, en: { translation: en }, ar: { translation: ar } },
  lng: initialLanguage,
  fallbackLng: 'bn',
  interpolation: { escapeValue: false },
})

// If the visitor has not manually selected a language, choose one by country.
if (!getSavedLanguage()) {
  fetch('https://ipapi.co/json/')
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
      const country = String(data.country_code || '').toUpperCase()
      if (getSavedLanguage()) return
      const detected = country === 'BD' ? 'bn' : ['SA', 'KW', 'QA'].includes(country) ? 'ar' : ['MY', 'AE', 'OM', 'BH'].includes(country) ? 'en' : getBrowserLanguage()
      return i18n.changeLanguage(detected)
    })
    .catch(() => {})
}

export default i18n
