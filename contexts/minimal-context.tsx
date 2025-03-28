"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Define the context type
type MinimalContextType = {
  count: number
  increment: () => void
}

// Create a context with default values
const MinimalContext = createContext<MinimalContextType>({
  count: 0,
  increment: () => {},
})

// Create a provider component
export function MinimalProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount((prev) => prev + 1)
  }

  // Create the value object
  const value = {
    count,
    increment,
  }

  return <MinimalContext.Provider value={value}>{children}</MinimalContext.Provider>
}

// Custom hook to use the context
export function useMinimal() {
  return useContext(MinimalContext)
}

