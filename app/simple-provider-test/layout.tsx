import type React from "react"
import { SimpleProvider } from "@/contexts/simple-context"

export default function SimpleProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SimpleProvider>{children}</SimpleProvider>
}

