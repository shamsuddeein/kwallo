'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Lang = 'en' | 'ha'
type DataLight = boolean

interface AppContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  dataLight: DataLight
  setDataLight: (v: boolean) => void
}

const AppContext = createContext<AppContextValue>({
  lang: 'en',
  setLang: () => {},
  dataLight: false,
  setDataLight: () => {},
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [dataLight, setDataLightState] = useState(false)

  useEffect(() => {
    const storedLang = localStorage.getItem('kwallo_lang') as Lang | null
    const storedDataLight = localStorage.getItem('kwallo_data_light')
    if (storedLang) setLangState(storedLang)
    if (storedDataLight === 'true') setDataLightState(true)
  }, [])

  // Reflect data-light mode as a class on <html> so global CSS can respond.
  useEffect(() => {
    document.documentElement.classList.toggle('kw-data-light', dataLight)
  }, [dataLight])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('kwallo_lang', l)
  }

  function setDataLight(v: boolean) {
    setDataLightState(v)
    localStorage.setItem('kwallo_data_light', String(v))
  }

  return (
    <AppContext.Provider value={{ lang, setLang, dataLight, setDataLight }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
