"use client"

import { useState } from "react"

export default function NoProviderTestPage() {
  const [count, setCount] = useState(0)
  const [language, setLanguage] = useState("en")

  // Simple translations object
  const translations = {
    en: {
      title: "No Provider Test",
      counter: "Counter",
      increment: "Increment",
      decrement: "Decrement",
      language: "Current language",
    },
    de: {
      title: "Test ohne Provider",
      counter: "Zähler",
      increment: "Erhöhen",
      decrement: "Verringern",
      language: "Aktuelle Sprache",
    },
  }

  // Simple translation function
  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof (typeof translations)["en"]] || key
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <section className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">
          {t("language")}: {language}
        </h2>
        <div className="mt-2 space-x-2">
          <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-blue-500 text-white rounded">
            English
          </button>
          <button onClick={() => setLanguage("de")} className="px-3 py-1 bg-blue-500 text-white rounded">
            German
          </button>
        </div>
      </section>

      <section className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">
          {t("counter")}: {count}
        </h2>
        <div className="mt-2 space-x-2">
          <button onClick={() => setCount(count + 1)} className="px-3 py-1 bg-green-500 text-white rounded">
            {t("increment")}
          </button>
          <button onClick={() => setCount(count - 1)} className="px-3 py-1 bg-red-500 text-white rounded">
            {t("decrement")}
          </button>
        </div>
      </section>
    </div>
  )
}

