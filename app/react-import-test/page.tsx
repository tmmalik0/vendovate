"use client"

import * as React from "react"

export default function ReactImportTestPage() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">React Import Test</h1>
      <p className="mb-4">Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
        Increment
      </button>
    </div>
  )
}

