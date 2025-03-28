"use client"

import { useMinimalFunction } from "@/contexts/minimal-function-context"

export default function MinimalFunctionTestPage() {
  const { value, increment } = useMinimalFunction()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Minimal Function Context Test</h1>
      <p className="mb-4">The value from context is: {value}</p>
      <button onClick={increment} className="px-4 py-2 bg-blue-500 text-white rounded">
        Increment
      </button>
    </div>
  )
}

