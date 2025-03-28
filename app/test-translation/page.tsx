"use client"

import { useLanguage } from "@/contexts/language-context"

export default function TestTranslationPage() {
  const { language, setLanguage, t, availableLanguages } = useLanguage()

  // List of all translation keys to test
  const keysToTest = [
    "app.name",
    "app.tagline",
    "auth.login",
    "auth.register",
    "nav.home",
    "nav.products",
    "vendor.dashboard",
    "home.feature_fast_title",
    "home.feature_secure_title",
    "home.feature_multi_title",
    "home.cta_title",
    "footer.quick_links",
    "footer.for_vendors",
    "footer.contact",
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Translation Test Page</h1>

      <div className="mb-4">
        <p>Current language: {language}</p>
      </div>

      <div className="mb-4 space-x-2">
        {availableLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang as any)}
            className={`px-3 py-1 rounded ${language === lang ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {keysToTest.map((key) => (
          <div key={key} className="border-b pb-2">
            <p>
              <strong>{key}:</strong> {t(key)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

