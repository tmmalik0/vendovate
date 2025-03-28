"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Clock, TrendingUp, Truck, Search, Filter, ArrowUpDown } from "lucide-react"
import { useState, useEffect } from "react"

export default function HotDeals() {
  const { t, formatPrice } = useLanguage()

  // Sample CBD product data
  const products = [
    {
      id: 1,
      name: "Premium CBD Oil 10%",
      image: "/placeholder.svg?height=200&width=200",
      price: 49.99,
      oldPrice: 69.99,
      vendor: "NatureCBD",
      slug: "premium-cbd-oil-10",
      cbdContent: "10%",
      stock: 5,
      freeShipping: true,
      limitedOffer: true,
      endTime: new Date(Date.now() + 86400000), // 24 hours from now
    },
    {
      id: 2,
      name: "CBD Capsules 30mg",
      image: "/placeholder.svg?height=200&width=200",
      price: 39.99,
      oldPrice: 54.99,
      vendor: "HealthyCBD",
      slug: "cbd-capsules-30mg",
      cbdContent: "30mg",
      stock: 12,
      freeShipping: true,
      limitedOffer: true,
      endTime: new Date(Date.now() + 172800000), // 48 hours from now
    },
    {
      id: 3,
      name: "CBD Gummies 25mg",
      image: "/placeholder.svg?height=200&width=200",
      price: 29.99,
      oldPrice: 39.99,
      vendor: "WellnessCBD",
      slug: "cbd-gummies-25mg",
      cbdContent: "25mg",
      stock: 3,
      freeShipping: false,
      limitedOffer: true,
      endTime: new Date(Date.now() + 43200000), // 12 hours from now
    },
    {
      id: 4,
      name: "CBD Balm 300mg",
      image: "/placeholder.svg?height=200&width=200",
      price: 34.99,
      oldPrice: 44.99,
      vendor: "NatureCBD",
      slug: "cbd-balm-300mg",
      cbdContent: "300mg",
      stock: 8,
      freeShipping: true,
      limitedOffer: false,
      endTime: null,
    },
  ]

  // State for countdown timers
  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [sortOption, setSortOption] = useState("default")

  // Update countdown timers
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: Record<number, string> = {}

      products.forEach((product) => {
        if (product.limitedOffer && product.endTime) {
          const now = new Date()
          const difference = product.endTime.getTime() - now.getTime()

          if (difference > 0) {
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
            const minutes = Math.floor((difference / (1000 * 60)) % 60)
            const seconds = Math.floor((difference / 1000) % 60)

            newTimeLeft[product.id] =
              `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          } else {
            newTimeLeft[product.id] = "00:00:00"
          }
        }
      })

      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    // First filter by search query
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Then filter by option
    if (filterOption === "freeShipping") {
      filtered = filtered.filter((product) => product.freeShipping)
    } else if (filterOption === "limitedOffer") {
      filtered = filtered.filter((product) => product.limitedOffer)
    } else if (filterOption === "lowStock") {
      filtered = filtered.filter((product) => product.stock <= 5)
    }

    // Then sort
    if (sortOption === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortOption === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortOption === "nameAsc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOption === "nameDesc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name))
    }

    return filtered
  }

  return (
    <div>
      {/* Search, Filter, and Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Products</option>
              <option value="freeShipping">Free Shipping</option>
              <option value="limitedOffer">Limited Offers</option>
              <option value="lowStock">Low Stock</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default Sorting</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="nameAsc">Name: A to Z</option>
              <option value="nameDesc">Name: Z to A</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowUpDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getFilteredAndSortedProducts().map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <Link href={`/product/${product.slug}`} className="block p-4">
              <div className="relative h-48 mb-4">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>

                {/* Low stock indicator */}
                {product.stock <= 5 && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    {t("product.low_stock")}: {product.stock}
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {t("product.vendor")}: {product.vendor}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {t("product.cbd_content")}: {product.cbdContent}
              </p>

              {/* Urgency elements */}
              {product.limitedOffer && (
                <div className="mb-2 flex items-center text-red-600 text-sm">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {t("product.limited_offer")} - {t("product.ends_in")} {timeLeft[product.id]}
                  </span>
                </div>
              )}

              {product.freeShipping && (
                <div className="mb-2 flex items-center text-green-600 text-sm">
                  <Truck size={16} className="mr-1" />
                  <span>{t("product.free_shipping")}</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full">
                  <ShoppingCart size={18} />
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* No results message */}
      {getFilteredAndSortedProducts().length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

