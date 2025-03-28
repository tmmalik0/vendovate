"use client"

import { useLanguage } from "@/contexts/language-context"

export default function MinimalLayoutTestPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal Layout Test</h1>
      <p>Current language: {language}</p>

      <div className="mt-4 space-x-4">
        <button onClick={() => setLanguage("en")} className="px-4 py-2 bg-blue-500 text-white rounded">
          English
        </button>
        <button onClick={() => setLanguage("de")} className="px-4 py-2 bg-blue-500 text-white rounded">
          German
        </button>
      </div>

      <div className="mt-4">
        <p>Translated: {t("app.name")}</p>
      </div>
    </div>
  )
}

