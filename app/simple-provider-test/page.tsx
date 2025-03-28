"use client"

import { useSimple } from "@/contexts/simple-context"

export default function SimpleProviderTestPage() {
  const { count, increment, decrement } = useSimple()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Simple Provider Test</h1>

      <section className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Counter: {count}</h2>
        <div className="mt-2 space-x-2">
          <button onClick={increment} className="px-3 py-1 bg-green-500 text-white rounded">
            Increment
          </button>
          <button onClick={decrement} className="px-3 py-1 bg-red-500 text-white rounded">
            Decrement
          </button>
        </div>
      </section>
    </div>
  )
}

