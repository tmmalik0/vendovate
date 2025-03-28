"use client"

import { LanguageProvider, useLanguage } from "@/contexts/language-context"

function TestContent() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold text-blue-600">Provider Test</h1>
      <p className="mt-4">Current language: {language}</p>

      <div className="mt-6 space-x-4">
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

export default function ProviderTestPage() {
  return (
    <LanguageProvider>
      <TestContent />
    </LanguageProvider>
  )
}

