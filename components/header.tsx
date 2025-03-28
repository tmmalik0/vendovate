"use client"

import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  MessageSquare,
  BarChart,
  DollarSign,
  FileText,
} from "lucide-react"

export default function Header() {
  const { language, setLanguage, t, availableLanguages, currency, setCurrency } = useLanguage()
  const { user, isAuthenticated, logout } = useAuth()
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false)
  const accountDropdownRef = useRef<HTMLDivElement>(null)

  // Language flag images with absolute URLs
  const languageFlags = {
    en: "/flags/gb.svg",
    de: "/flags/de.svg",
    fr: "/flags/fr.svg",
    es: "/flags/es.svg",
  }

  // Language names
  const languageNames = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
    es: "Español",
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false)
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false)
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    logout()
    setAccountDropdownOpen(false)
    window.location.href = "/"
  }

  // Vendor menu items
  const vendorMenuItems = [
    { label: t("vendor.dashboard"), href: "/vendor/dashboard", icon: <User size={16} /> },
    { label: t("vendor.inventory"), href: "/vendor/inventory", icon: <Package size={16} /> },
    { label: t("vendor.orders"), href: "/vendor/orders", icon: <ShoppingCart size={16} /> },
    { label: t("vendor.messages"), href: "/vendor/messages", icon: <MessageSquare size={16} /> },
    { label: t("vendor.analytics"), href: "/vendor/analytics", icon: <BarChart size={16} /> },
    { label: t("vendor.upsell"), href: "/vendor/upsell", icon: <DollarSign size={16} /> },
    { label: t("vendor.invoices"), href: "/vendor/invoices", icon: <FileText size={16} /> },
  ]

  // Customer menu items
  const customerMenuItems = [
    { label: t("account.my_account"), href: "/account", icon: <User size={16} /> },
    { label: t("account.my_orders"), href: "/account/orders", icon: <ShoppingCart size={16} /> },
    { label: t("account.my_wishlist"), href: "/account/wishlist", icon: <User size={16} /> },
    { label: t("account.settings"), href: "/account/settings", icon: <User size={16} /> },
  ]

  // Admin menu items
  const adminMenuItems = [
    { label: t("admin.dashboard"), href: "/admin/dashboard", icon: <User size={16} /> },
    { label: t("admin.users"), href: "/admin/users", icon: <User size={16} /> },
    { label: t("admin.vendors"), href: "/admin/vendors", icon: <User size={16} /> },
    { label: t("admin.products"), href: "/admin/products", icon: <Package size={16} /> },
    { label: t("admin.orders"), href: "/admin/orders", icon: <ShoppingCart size={16} /> },
    { label: t("admin.settings"), href: "/admin/settings", icon: <User size={16} /> },
  ]

  // Get menu items based on user role
  const getMenuItems = () => {
    if (!user) return []

    switch (user.role) {
      case "vendor":
        return vendorMenuItems
      case "customer":
        return customerMenuItems
      case "admin":
        return adminMenuItems
      default:
        return []
    }
  }

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            {/* Currency Selector - Euro is default */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                <span className="text-sm font-medium">{currency}</span>
                <ChevronDown size={16} />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute left-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setCurrency("EUR")
                      setCurrencyDropdownOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <span className="mr-2">€</span>
                    <span>EUR</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrency("USD")
                      setCurrencyDropdownOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <span className="mr-2">$</span>
                    <span>USD</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrency("GBP")
                      setCurrencyDropdownOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <span className="mr-2">£</span>
                    <span>GBP</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <Link href="/blog" className="hover:text-blue-600">
              {t("nav.blog")}
            </Link>
            <Link href="/gift-certificates" className="hover:text-blue-600">
              {t("nav.gift_certificates")}
            </Link>
            <Link href="/brands" className="hover:text-blue-600">
              {t("nav.brands")}
            </Link>

            {/* Hide "Become a seller" and "Vendors" links for logged-in vendors */}
            {!(isAuthenticated && user?.role === "vendor") && (
              <>
                <Link href="/become-seller" className="hover:text-blue-600">
                  {t("nav.become_seller")}
                </Link>
                <Link href="/vendors" className="hover:text-blue-600">
                  {t("nav.vendors")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">{t("app.name")}</span>
            </Link>
          </div>

          {/* Phone Number */}
          <div className="hidden lg:flex items-center text-gray-700">
            <span className="text-lg font-semibold text-blue-600">+49 1234 567890</span>
            <span className="ml-2 text-sm text-gray-500">Mo-Fr 09:00-18:00</span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t("search.placeholder")}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Cart & Account */}
          <div className="flex items-center space-x-4">
            {/* Language Selector Dropdown */}
            <div className="hidden md:block relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                <Image
                  src={languageFlags[language as keyof typeof languageFlags] || "/placeholder.svg"}
                  alt={language}
                  width={20}
                  height={15}
                  className="rounded"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextSibling?.classList.remove("ml-2")
                  }}
                />
                <span className="ml-2 text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown size={16} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as any)
                        setLangDropdownOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      <Image
                        src={languageFlags[lang as keyof typeof languageFlags] || "/placeholder.svg"}
                        alt={lang}
                        width={20}
                        height={15}
                        className="mr-2 rounded"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      <span>{languageNames[lang as keyof typeof languageNames]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account Dropdown */}
            <div className="relative" ref={accountDropdownRef}>
              {isAuthenticated ? (
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <User size={20} />
                  <span className="ml-1 hidden lg:inline">{user?.name}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
              ) : (
                <Link href="/auth/login" className="flex items-center text-gray-700 hover:text-blue-600">
                  <User size={20} />
                  <span className="ml-1 hidden lg:inline">{t("nav.my_account")}</span>
                </Link>
              )}

              {isAuthenticated && accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    {getMenuItems().map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        <span className="mr-2 text-gray-500">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="py-1 border-t border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      {t("auth.sign_out")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div className="ml-2 hidden lg:block">
                <div className="text-sm font-medium">{t("nav.cart")}</div>
                <div className="text-xs text-gray-500">
                  {itemCount > 0 ? `${itemCount} ${t("nav.items")}` : t("nav.cart_empty")}
                </div>
              </div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search (only visible on mobile) */}
      <div className="md:hidden border-b border-gray-200 py-2 px-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={t("search.placeholder")}
            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.blog")}
            </Link>
            <Link
              href="/gift-certificates"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.gift_certificates")}
            </Link>
            <Link
              href="/brands"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.brands")}
            </Link>

            {/* Hide "Become a seller" and "Vendors" links for logged-in vendors */}
            {!(isAuthenticated && user?.role === "vendor") && (
              <>
                <Link
                  href="/become-seller"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.become_seller")}
                </Link>
                <Link
                  href="/vendors"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.vendors")}
                </Link>
              </>
            )}

            {/* Language Selector (Mobile) */}
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-gray-500 mb-2">{t("nav.select_language")}</div>
              <div className="flex flex-col space-y-2">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang as any)
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-100"
                  >
                    <Image
                      src={languageFlags[lang as keyof typeof languageFlags] || "/placeholder.svg"}
                      alt={lang}
                      width={20}
                      height={15}
                      className="mr-2 rounded"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.currentTarget.style.display = "none"
                      }}
                    />
                    <span>{languageNames[lang as keyof typeof languageNames]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Menu Items (Mobile) */}
            {isAuthenticated && (
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Account</div>
                <div className="flex flex-col space-y-2">
                  {getMenuItems().map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-2 text-gray-500">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="flex items-center px-2 py-1 text-sm rounded hover:bg-gray-100 text-red-600"
                  >
                    <LogOut size={16} className="mr-2" />
                    {t("auth.sign_out")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

