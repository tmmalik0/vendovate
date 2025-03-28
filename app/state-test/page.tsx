"use client"

import { useState } from "react"

// A component that manages its own state
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Counter: {count}</h2>
      <div className="space-x-2">
        <button onClick={() => setCount(count + 1)} className="px-3 py-1 bg-green-500 text-white rounded">
          Increment
        </button>
        <button onClick={() => setCount(count - 1)} className="px-3 py-1 bg-red-500 text-white rounded">
          Decrement
        </button>
      </div>
    </div>
  )
}

// A component that receives props
function Greeting({ name }: { name: string }) {
  return (
    <div className="p-4 border rounded bg-gray-50 mt-4">
      <h2 className="text-xl font-semibold">Hello, {name}!</h2>
    </div>
  )
}

export default function StateTestPage() {
  const [name, setName] = useState("Guest")

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">State Test Page</h1>

      <Counter />

      <div className="mt-6 p-4 border rounded bg-gray-50">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Your Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <Greeting name={name} />
    </div>
  )
}

