import type React from "react"
import { MinimalProvider } from "@/contexts/minimal-context"

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MinimalProvider>{children}</MinimalProvider>
}

