"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function ComprehensiveTestPage() {
  const { language, setLanguage, t } = useLanguage()
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({ name: "", email: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form submitted with: ${formData.name}, ${formData.email}`)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Comprehensive Test Page</h1>

      <section className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Language Switching</h2>
        <p>Current language: {language}</p>
        <div className="mt-2 space-x-2">
          <button onClick={() => setLanguage("en")} className="px-3 py-1 bg-blue-500 text-white rounded">
            English
          </button>
          <button onClick={() => setLanguage("de")} className="px-3 py-1 bg-blue-500 text-white rounded">
            German
          </button>
          <button onClick={() => setLanguage("fr")} className="px-3 py-1 bg-blue-500 text-white rounded">
            French
          </button>
        </div>
        <div className="mt-2">
          <p>Translated: {t("app.name")}</p>
        </div>
      </section>

      <section className="mb-8 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">State Management</h2>
        <p>Count: {count}</p>
        <div className="mt-2 space-x-2">
          <button onClick={() => setCount(count + 1)} className="px-3 py-1 bg-green-500 text-white rounded">
            Increment
          </button>
          <button onClick={() => setCount(count - 1)} className="px-3 py-1 bg-red-500 text-white rounded">
            Decrement
          </button>
        </div>
      </section>

      <section className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Form Handling</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}

