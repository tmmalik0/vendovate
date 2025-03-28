"use client"

import { useSimplifiedLanguage } from "@/contexts/simplified-language-context"

export default function SimplifiedLanguageTestPage() {
  const { language, setLanguage, translate } = useSimplifiedLanguage()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Simplified Language Test</h1>

      <section className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Current Language: {language}</h2>
        <p>
          {translate("greeting")}! {translate("welcome")}
        </p>
        <div className="mt-4 space-x-2">
          <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-blue-500 text-white rounded">
            English
          </button>
          <button onClick={() => setLanguage("de")} className="px-3 py-1 bg-blue-500 text-white rounded">
            German
          </button>
        </div>
      </section>
    </div>
  )
}

