"use client"

import { useMinimal } from "@/contexts/minimal-context"

export default function MinimalTestPage() {
  const { count, increment } = useMinimal()

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Minimal Test</h1>
      <p>Count from context: {count}</p>
      <button onClick={increment} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Increment
      </button>
    </div>
  )
}

