"use client"

import { useLanguage } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryNav from "@/components/category-nav"
import Link from "next/link"
import { useState } from "react"
import { User, ShoppingBag, Heart, CreditCard, Settings, LogOut } from "lucide-react"

export default function CustomerAccountPage() {
  const { t, formatPrice } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

  // Sample customer data
  const customer = {
    name: "John Doe",
    email: "customer@example.com",
    joinDate: "May 15, 2023",
    orders: 8,
    wishlistItems: 12,
  }

  // Sample recent orders
  const recentOrders = [
    { id: "ORD-001", date: "2023-05-15", total: 125.99, status: "Delivered" },
    { id: "ORD-002", date: "2023-04-22", total: 89.5, status: "Delivered" },
    { id: "ORD-003", date: "2023-03-10", total: 210.25, status: "Delivered" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-start md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="mt-1 text-gray-600">Welcome back, {customer.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-8">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3">
                      <User size={24} className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-medium text-gray-900">{customer.name}</h2>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                </div>
                <nav className="py-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === "overview" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    My Orders
                  </button>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === "wishlist" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Heart size={18} className="mr-3" />
                    Wishlist
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === "payment" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Payment Methods
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center px-6 py-3 text-sm font-medium ${
                      activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    Account Settings
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9">
              <div className="bg-white shadow rounded-lg">
                {activeTab === "overview" && (
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Account Overview</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <ShoppingBag size={20} className="text-blue-600 mr-2" />
                          <span className="text-gray-700">Orders</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{customer.orders}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <Heart size={20} className="text-red-600 mr-2" />
                          <span className="text-gray-700">Wishlist Items</span>
                        </div>
                        <p className="mt-2 text-2xl font-bold">{customer.wishlistItems}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <User size={20} className="text-green-600 mr-2" />
                          <span className="text-gray-700">Member Since</span>
                        </div>
                        <p className="mt-2 text-lg font-medium">{customer.joinDate}</p>
                      </div>
                    </div>

                    <h3 className="text-md font-medium text-gray-900 mb-3">Recent Orders</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Order ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Total
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentOrders.map((order) => (
                            <tr key={order.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                <Link href={`/account/orders/${order.id}`}>{order.id}</Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatPrice(order.total)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Shipped"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link
                                  href={`/account/orders/${order.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 text-right">
                      <Link href="/account/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all orders →
                      </Link>
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">My Orders</h2>
                    <p>Your order history would be displayed here.</p>
                  </div>
                )}

                {activeTab === "wishlist" && (
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">My Wishlist</h2>
                    <p>Your wishlist items would be displayed here.</p>
                  </div>
                )}

                {activeTab === "payment" && (
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h2>
                    <p>Your payment methods would be managed here.</p>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
                    <p>Your account settings would be managed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

