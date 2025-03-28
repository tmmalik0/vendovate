import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"

export default function ProviderTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <LanguageProvider>{children}</LanguageProvider>
    </div>
  )
}

