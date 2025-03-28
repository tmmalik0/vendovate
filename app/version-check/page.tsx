"use client"

import React from "react"

export default function VersionCheckPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Version Check</h1>

      <div className="p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">React Version</h2>
        <p>React version: {React.version}</p>
      </div>

      <div className="p-4 border rounded bg-gray-50 mt-4">
        <h2 className="text-xl font-semibold mb-2">Environment</h2>
        <p>Node.js environment: {process.env.NODE_ENV}</p>
      </div>
    </div>
  )
}

