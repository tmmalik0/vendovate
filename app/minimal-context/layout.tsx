import type React from "react"
import { MinimalProvider } from "@/contexts/minimal-context"

export default function MinimalContextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MinimalProvider>{children}</MinimalProvider>
}

