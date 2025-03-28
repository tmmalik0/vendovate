"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function NewsletterBanner() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("newsletter.title")}</h2>
        <p className="text-gray-600">{t("newsletter.description")}</p>
      </div>

      <div className="max-w-md mx-auto">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-l-md border border-gray-300 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-medium disabled:opacity-75"
            >
              {isLoading ? t("newsletter.subscribing") : t("newsletter.subscribe")}
            </button>
          </form>
        ) : (
          <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
            <p className="font-medium">{t("newsletter.success")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

