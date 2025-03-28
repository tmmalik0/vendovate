"use client"

import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryNav from "@/components/category-nav"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const { t, formatPrice } = useLanguage()
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  // Calculate shipping cost (free over 50)
  const shippingCost = total > 50 ? 0 : 4.99

  // Calculate final total
  const finalTotal = total + shippingCost - couponDiscount

  // Apply coupon code
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      const discount = total * 0.1 // 10% discount
      setCouponDiscount(discount)
      setCouponApplied(true)
    } else {
      setCouponApplied(false)
      setCouponDiscount(0)
      alert(t("cart.invalid_coupon"))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <ArrowLeft size={20} className="mr-1" />
              {t("cart.continue_shopping")}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{t("cart.your_cart")}</h1>
          </div>

          {items.length > 0 ? (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                      {t("cart.cart_items")} ({items.length})
                    </h2>
                  </div>

                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0">
                            <Image
                              src={item.image || "/placeholder.svg?height=100&width=100"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="flex-1 sm:ml-6">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">SKU: {item.sku}</p>
                                <p className="mt-1 text-sm text-gray-500">
                                  {t("product.vendor")}: {item.vendor}
                                </p>
                              </div>
                              <p className="text-lg font-medium text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 text-gray-500 hover:text-gray-700"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 text-gray-500 hover:text-gray-700"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-800 flex items-center"
                              >
                                <Trash2 size={18} className="mr-1" />
                                {t("cart.remove")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200 flex justify-between">
                    <button type="button" onClick={clearCart} className="text-red-600 hover:text-red-800">
                      {t("cart.clear_cart")}
                    </button>
                    <Link href="/" className="text-blue-600 hover:text-blue-800">
                      {t("cart.continue_shopping")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">{t("cart.order_summary")}</h2>
                  </div>

                  <div className="px-4 py-5 sm:px-6">
                    <div className="flow-root">
                      <dl className="-my-4 text-sm divide-y divide-gray-200">
                        <div className="py-4 flex justify-between">
                          <dt className="text-gray-600">{t("cart.subtotal")}</dt>
                          <dd className="font-medium text-gray-900">{formatPrice(total)}</dd>
                        </div>
                        <div className="py-4 flex justify-between">
                          <dt className="text-gray-600">{t("cart.shipping")}</dt>
                          <dd className="font-medium text-gray-900">
                            {shippingCost === 0 ? t("cart.free") : formatPrice(shippingCost)}
                          </dd>
                        </div>
                        {couponApplied && (
                          <div className="py-4 flex justify-between">
                            <dt className="text-gray-600">{t("cart.discount")}</dt>
                            <dd className="font-medium text-green-600">-{formatPrice(couponDiscount)}</dd>
                          </div>
                        )}
                        <div className="py-4 flex justify-between">
                          <dt className="text-base font-medium text-gray-900">{t("cart.total")}</dt>
                          <dd className="text-base font-medium text-gray-900">{formatPrice(finalTotal)}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder={t("cart.coupon_code")}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {t("cart.apply")}
                      </button>
                    </div>
                    {couponApplied && <p className="mt-2 text-sm text-green-600">{t("cart.coupon_applied")}</p>}
                    <p className="mt-2 text-xs text-gray-500">{t("cart.coupon_hint")}</p>
                  </div>

                  {/* Checkout Button */}
                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <ShoppingBag size={20} className="mr-2" />
                      {t("cart.proceed_to_checkout")}
                    </button>
                    <p className="mt-4 text-center text-sm text-gray-500">{t("cart.secure_checkout")}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-6">
                <ShoppingBag size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-4">{t("cart.empty_cart")}</h2>
              <p className="text-gray-500 mb-6">{t("cart.empty_cart_message")}</p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t("cart.start_shopping")}
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

