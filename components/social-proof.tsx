"use client"

import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { User, ShoppingBag } from "lucide-react"

export default function SocialProof() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(0)

  // Sample recent purchases
  const recentPurchases = [
    {
      id: 1,
      name: "Anna",
      location: "Berlin",
      product: "CBD Oil 10%",
      time: 3, // minutes ago
    },
    {
      id: 2,
      name: "Thomas",
      location: "Munich",
      product: "CBD Gummies",
      time: 7,
    },
    {
      id: 3,
      name: "Sophie",
      location: "Hamburg",
      product: "CBD Capsules",
      time: 12,
    },
    {
      id: 4,
      name: "Max",
      location: "Frankfurt",
      product: "CBD Balm",
      time: 18,
    },
    {
      id: 5,
      name: "Julia",
      location: "Cologne",
      product: "CBD Pet Treats",
      time: 24,
    },
  ]

  // Show notifications periodically
  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true)
    }, 5000)

    // Cycle through notifications
    const interval = setInterval(() => {
      setVisible(false)

      // Wait for fade out animation
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % recentPurchases.length)
        setVisible(true)
      }, 500)
    }, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [recentPurchases.length])

  const purchase = recentPurchases[currentNotification]

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-200 flex items-start">
        <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
          <User size={20} className="text-blue-600" />
        </div>
        <div>
          <div className="flex items-center mb-1">
            <span className="font-medium">{purchase.name}</span>
            <span className="mx-1 text-gray-500">from</span>
            <span className="font-medium">{purchase.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <ShoppingBag size={14} className="mr-1" />
            <span>
              {t("social.recent_purchase")} <strong>{purchase.product}</strong>
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {purchase.time < 5
              ? purchase.time + " " + t("social.seconds_ago")
              : purchase.time + " " + t("social.minutes_ago")}
          </div>
        </div>
      </div>
    </div>
  )
}

