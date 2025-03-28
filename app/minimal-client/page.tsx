"use client"

import { useState } from "react"

export default function MinimalClientPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Minimal Client Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Increment
      </button>
    </div>
  )
}

