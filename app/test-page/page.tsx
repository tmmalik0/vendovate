"use client"

import { useLanguage } from "@/contexts/language-context"

export default function TestPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>Current language: {language}</p>
      <div className="mt-4 space-y-2">
        <button onClick={() => setLanguage("en")} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          English
        </button>
        <button onClick={() => setLanguage("de")} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          German
        </button>
        <button onClick={() => setLanguage("fr")} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          French
        </button>
        <button onClick={() => setLanguage("es")} className="px-4 py-2 bg-blue-500 text-white rounded">
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

