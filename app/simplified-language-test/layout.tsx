import type React from "react"
import { SimplifiedLanguageProvider } from "@/contexts/simplified-language-context"

export default function SimplifiedLanguageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SimplifiedLanguageProvider>{children}</SimplifiedLanguageProvider>
}

