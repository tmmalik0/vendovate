"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define a simple context type with a value and a function
type MinimalFunctionContextType = {
  value: number
  increment: () => void
}

// Create the context with default values
const MinimalFunctionContext = createContext<MinimalFunctionContextType>({
  value: 0,
  increment: () => {},
})

// Create a provider component
export function MinimalFunctionProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(0)

  const increment = () => {
    setValue((prev) => prev + 1)
  }

  return <MinimalFunctionContext.Provider value={{ value, increment }}>{children}</MinimalFunctionContext.Provider>
}

// Create a hook to use the context
export function useMinimalFunction() {
  return useContext(MinimalFunctionContext)
}

