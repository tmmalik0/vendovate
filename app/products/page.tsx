"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function ProductsPage() {
  const { t, formatPrice } = useLanguage()

  // Sample product data
  const products = [
    { id: 1, name: "Product 1", price: 19.99, vendor: "Vendor A" },
    { id: 2, name: "Product 2", price: 29.99, vendor: "Vendor B" },
    { id: 3, name: "Product 3", price: 39.99, vendor: "Vendor A" },
    { id: 4, name: "Product 4", price: 49.99, vendor: "Vendor C" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">{t("app.name")} - Products</h1>

          <div className="flex space-x-4">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">All Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 mb-2">Vendor: {product.vendor}</p>
                  <p className="text-lg font-bold">{formatPrice(product.price)}</p>
                  <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

