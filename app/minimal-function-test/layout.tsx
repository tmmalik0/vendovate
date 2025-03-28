import type React from "react"
import { MinimalFunctionProvider } from "@/contexts/minimal-function-context"

export default function MinimalFunctionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MinimalFunctionProvider>{children}</MinimalFunctionProvider>
}

