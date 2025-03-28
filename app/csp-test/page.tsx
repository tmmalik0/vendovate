"use client"

import { useState } from "react"

export default function CSPTestPage() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ color: "#333" }}>CSP Test Page</h1>
      <p>This page uses inline styles and minimal JavaScript to avoid CSP issues.</p>

      <div style={{ marginTop: "20px" }}>
        <p>Count: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Increment
        </button>
      </div>
    </div>
  )
}

