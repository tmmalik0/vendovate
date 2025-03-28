"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the context type
type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  translate: (key: string) => string
}

// Create the context with default values
const SimplifiedLanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  translate: (key) => key,
})

// Create a provider component
export function SimplifiedLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en")

  // Simple translations
  const translations = {
    en: {
      greeting: "Hello",
      welcome: "Welcome to our site",
    },
    de: {
      greeting: "Hallo",
      welcome: "Willkommen auf unserer Website",
    },
  }

  const translate = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof (typeof translations)["en"]] || key
  }

  return (
    <SimplifiedLanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </SimplifiedLanguageContext.Provider>
  )
}

// Create a hook to use the context
export function useSimplifiedLanguage() {
  return useContext(SimplifiedLanguageContext)
}

