"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LanguageTestPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Language Test</h1>
      <p>Current language: {language}</p>

      <div className="mt-4 space-x-2">
        <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-blue-500 text-white rounded">
          English
        </button>
        <button onClick={() => setLanguage("de")} className="px-3 py-1 bg-blue-500 text-white rounded">
          German
        </button>
        <button onClick={() => setLanguage("fr")} className="px-3 py-1 bg-blue-500 text-white rounded">
          French
        </button>
        <button onClick={() => setLanguage("es")} className="px-3 py-1 bg-blue-500 text-white rounded">
          Spanish
        </button>
      </div>

      <div className="mt-4">
        <p>{t("app.name")}</p>
        <p>{t("auth.login")}</p>
      </div>
    </div>
  )
}

