'use client'

import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { getOptions } from './settings'

const i18nInstance = createInstance()

i18nInstance
  .use(initReactI18next)
  .use(resourcesToBackend(
    (language: string, namespace: string) => import(`../../locales/${language}/${namespace}.json`)
  ))
  .init({
    ...getOptions(),
    lng: typeof window !== 'undefined' 
      ? localStorage.getItem('selectedLanguage') || 'en'
      : 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  })

export const i18n = i18nInstance