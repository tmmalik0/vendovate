"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function VendorMessagesPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated or not a vendor
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else if (user?.role !== "vendor") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  // If not authenticated or loading, show nothing
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

          <div className="bg-white shadow rounded-lg p-6">
            <p>This is the messages page. You can redirect to the dashboard to see all tabs.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/vendor/dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

