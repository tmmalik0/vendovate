import type React from "react"
import { LanguageProvider } from "@/contexts/language-context"

export default function ComprehensiveTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LanguageProvider>{children}</LanguageProvider>
}

