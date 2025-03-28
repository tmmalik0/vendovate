"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the context type
type SimpleContextType = {
  count: number
  increment: () => void
  decrement: () => void
}

// Create the context with default values
const SimpleContext = createContext<SimpleContextType>({
  count: 0,
  increment: () => {},
  decrement: () => {},
})

// Create a provider component
export function SimpleProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)

  return <SimpleContext.Provider value={{ count, increment, decrement }}>{children}</SimpleContext.Provider>
}

// Create a hook to use the context
export function useSimple() {
  return useContext(SimpleContext)
}

