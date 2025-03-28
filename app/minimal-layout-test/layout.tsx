import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageProvider>
        <main>{children}</main>
      </LanguageProvider>
    </div>
  )
}

