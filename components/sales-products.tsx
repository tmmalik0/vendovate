"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Tag, Award, Search, Filter, ArrowUpDown } from "lucide-react"
import { useState } from "react"

export default function SalesProducts() {
  const { t, formatPrice } = useLanguage()

  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [sortOption, setSortOption] = useState("default")

  // Sample CBD sales products
  const products = [
    {
      id: 1,
      name: "CBD Oil 5% - Special Edition",
      image: "/placeholder.svg?height=200&width=200",
      price: 29.99,
      oldPrice: 49.99,
      vendor: "PureCBD",
      slug: "cbd-oil-5-special",
      cbdContent: "5%",
      labTested: true,
    },
    {
      id: 2,
      name: "CBD Pet Treats Bundle",
      image: "/placeholder.svg?height=200&width=200",
      price: 24.99,
      oldPrice: 39.99,
      vendor: "PetCBD",
      slug: "cbd-pet-treats-bundle",
      cbdContent: "15mg per treat",
      labTested: true,
    },
    {
      id: 3,
      name: "CBD Sleep Drops",
      image: "/placeholder.svg?height=200&width=200",
      price: 34.99,
      oldPrice: 54.99,
      vendor: "SleepWell",
      slug: "cbd-sleep-drops",
      cbdContent: "15%",
      labTested: true,
    },
    {
      id: 4,
      name: "CBD Muscle Gel",
      image: "/placeholder.svg?height=200&width=200",
      price: 19.99,
      oldPrice: 29.99,
      vendor: "SportsCBD",
      slug: "cbd-muscle-gel",
      cbdContent: "200mg",
      labTested: true,
    },
  ]

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    // First filter by search query
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Then filter by option
    if (filterOption === "labTested") {
      filtered = filtered.filter((product) => product.labTested)
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
    } else if (sortOption === "discountDesc") {
      filtered.sort((a, b) => {
        const discountA = ((a.oldPrice - a.price) / a.oldPrice) * 100
        const discountB = ((b.oldPrice - b.price) / b.oldPrice) * 100
        return discountB - discountA
      })
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
            placeholder="Search sales products..."
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
              <option value="labTested">Lab Tested</option>
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
              <option value="discountDesc">Discount: High to Low</option>
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
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-1 z-10">
                <Tag size={16} className="inline-block mr-1" />
                <span className="text-sm font-bold">SALE</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`} className="block p-4 pt-8">
              <div className="relative h-48 mb-4">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
                <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-tl-lg">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {t("product.vendor")}: {product.vendor}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {t("product.cbd_content")}: {product.cbdContent}
              </p>

              {product.labTested && (
                <div className="mb-2 flex items-center text-blue-600 text-sm">
                  <Award size={16} className="mr-1" />
                  <span>{t("product.lab_tested")}</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="text-lg font-bold text-red-600">{formatPrice(product.price)}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
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
          <p className="text-gray-500">No sales products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

