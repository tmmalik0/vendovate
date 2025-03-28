"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import {
  Download,
  Upload,
  Search,
  Filter,
  ArrowUpDown,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react"

export default function VendorInventoryPage() {
  const { user, isAuthenticated } = useAuth()
  const { t, formatPrice } = useLanguage()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOption, setFilterOption] = useState("all")
  const [sortOption, setSortOption] = useState("default")
  const [importStatus, setImportStatus] = useState<null | "success" | "error">(null)
  const [importMessage, setImportMessage] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("inventory")

  // Sample inventory data
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "CBD Oil 10%",
      sku: "CBD-OIL-10",
      stock: 24,
      price: 49.99,
      status: "In Stock",
      cbd_content: "10%",
      thc_content: "<0.2%",
      category: "CBD Oil",
      vendor: "NatureCBD",
      free_shipping: true,
      lab_tested: true,
    },
    {
      id: 2,
      name: "CBD Capsules 30mg",
      sku: "CBD-CAP-30",
      stock: 18,
      price: 39.99,
      status: "In Stock",
      cbd_content: "30mg",
      thc_content: "<0.2%",
      category: "CBD Capsules",
      vendor: "HealthyCBD",
      free_shipping: true,
      lab_tested: true,
    },
    {
      id: 3,
      name: "CBD Gummies 25mg",
      sku: "CBD-GUM-25",
      stock: 3,
      price: 29.99,
      status: "Low Stock",
      cbd_content: "25mg",
      thc_content: "<0.2%",
      category: "CBD Edibles",
      vendor: "WellnessCBD",
      free_shipping: false,
      lab_tested: true,
    },
    {
      id: 4,
      name: "CBD Balm 300mg",
      sku: "CBD-BLM-300",
      stock: 0,
      price: 34.99,
      status: "Out of Stock",
      cbd_content: "300mg",
      thc_content: "<0.2%",
      category: "CBD Cosmetics",
      vendor: "NatureCBD",
      free_shipping: true,
      lab_tested: true,
    },
  ])

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    stock: 0,
    price: 0,
    cbd_content: "",
    thc_content: "",
    category: "",
    vendor: "",
    free_shipping: false,
    lab_tested: false,
  })

  // Redirect if not authenticated or not a vendor
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else if (user?.role !== "vendor") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  // CSV template content
  const csvTemplate = `id,name,sku,description,price,old_price,stock,cbd_content,thc_content,vendor,category,free_shipping,limited_offer,lab_tested,origin
,CBD Oil 10%,CBD-OIL-10,Premium CBD oil with 10% concentration,49.99,69.99,24,10%,<0.2%,YourBrandName,CBD Oil,TRUE,FALSE,TRUE,EU
,CBD Capsules 30mg,CBD-CAP-30,CBD capsules with 30mg per capsule,39.99,54.99,18,30mg,<0.2%,YourBrandName,CBD Capsules,TRUE,FALSE,TRUE,EU
,CBD Gummies 25mg,CBD-GUM-25,CBD gummies with 25mg per gummy,29.99,39.99,3,25mg,<0.2%,YourBrandName,CBD Edibles,FALSE,TRUE,TRUE,EU`

  // Function to download CSV template
  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("hidden", "")
    a.setAttribute("href", url)
    a.setAttribute("download", "cbd-products-template.csv")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setImportStatus("error")
      setImportMessage(t("vendor.import_error") + ": " + t("vendor.select_file"))
      return
    }

    // Check if file is CSV
    if (!selectedFile.name.endsWith(".csv")) {
      setImportStatus("error")
      setImportMessage(t("vendor.import_error") + ": " + t("vendor.csv_required"))
      return
    }

    // Simulate file processing
    setIsUploading(true)
    setImportStatus(null)
    setImportMessage("")

    try {
      // Read the file
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target) {
          const csvData = event.target.result as string
          const lines = csvData.split("\n")

          // Skip header row
          const dataRows = lines.slice(1).filter((line) => line.trim() !== "")

          // Parse CSV data
          const newProducts = dataRows.map((row, index) => {
            const columns = row.split(",")

            // Determine status based on stock
            let status = "In Stock"
            const stock = Number.parseInt(columns[6])
            if (stock === 0) {
              status = "Out of Stock"
            } else if (stock <= 5) {
              status = "Low Stock"
            }

            return {
              id: inventoryItems.length + index + 1,
              name: columns[1],
              sku: columns[2],
              stock: stock,
              price: Number.parseFloat(columns[4]),
              status: status,
              cbd_content: columns[7],
              thc_content: columns[8],
              category: columns[10],
              vendor: columns[9],
              free_shipping: columns[11].toUpperCase() === "TRUE",
              lab_tested: columns[13].toUpperCase() === "TRUE",
            }
          })

          // Add new products to inventory
          setInventoryItems((prev) => [...prev, ...newProducts])

          // Success
          setImportStatus("success")
          setImportMessage(t("vendor.import_success"))
          setSelectedFile(null)
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
          setIsUploading(false)
        }
      }

      reader.onerror = () => {
        setImportStatus("error")
        setImportMessage(t("vendor.import_error") + ": " + t("vendor.file_read_error"))
        setIsUploading(false)
      }

      reader.readAsText(selectedFile)
    } catch (error) {
      setImportStatus("error")
      setImportMessage(t("vendor.import_error") + ": " + t("vendor.try_again"))
      setIsUploading(false)
    }
  }

  // Function to handle adding a new product
  const handleAddProduct = () => {
    // Determine status based on stock
    let status = "In Stock"
    if (newProduct.stock === 0) {
      status = "Out of Stock"
    } else if (newProduct.stock <= 5) {
      status = "Low Stock"
    }

    const productToAdd = {
      ...newProduct,
      id: inventoryItems.length + 1,
      status,
    }

    setInventoryItems((prev) => [...prev, productToAdd])
    setShowAddProductModal(false)
    setNewProduct({
      name: "",
      sku: "",
      stock: 0,
      price: 0,
      cbd_content: "",
      thc_content: "",
      category: "",
      vendor: "",
      free_shipping: false,
      lab_tested: false,
    })
  }

  // Function to handle editing a product
  const handleEditProduct = () => {
    if (!editingProduct) return

    setInventoryItems((prev) => prev.map((item) => (item.id === editingProduct.id ? editingProduct : item)))

    setEditingProduct(null)
  }

  // Function to handle deleting a product
  const handleDeleteProduct = (id: number) => {
    if (confirm(t("vendor.confirm_delete"))) {
      setInventoryItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // Filter and sort inventory items
  const getFilteredAndSortedItems = () => {
    // First filter by search query
    let filtered = inventoryItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Then filter by option
    if (filterOption === "inStock") {
      filtered = filtered.filter((item) => item.status === "In Stock")
    } else if (filterOption === "lowStock") {
      filtered = filtered.filter((item) => item.status === "Low Stock")
    } else if (filterOption === "outOfStock") {
      filtered = filtered.filter((item) => item.status === "Out of Stock")
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
    } else if (sortOption === "stockAsc") {
      filtered.sort((a, b) => a.stock - b.stock)
    } else if (sortOption === "stockDesc") {
      filtered.sort((a, b) => b.stock - a.stock)
    }

    return filtered
  }

  // If not authenticated or loading, show nothing
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/vendor/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <ArrowLeft size={20} className="mr-1" />
              {t("vendor.back_to_dashboard")}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{t("vendor.inventory")}</h1>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200 overflow-x-auto">
            <nav className="-mb-px flex space-x-8">
              <Link
                href="/vendor/dashboard"
                className={`${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.overview")}
              </Link>
              <Link
                href="/vendor/inventory"
                className={`${
                  activeTab === "inventory"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.inventory")}
              </Link>
              <Link
                href="/vendor/orders"
                className={`${
                  activeTab === "orders"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.orders")}
              </Link>
              <Link
                href="/vendor/messages"
                className={`${
                  activeTab === "messages"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.messages")}
              </Link>
              <Link
                href="/vendor/analytics"
                className={`${
                  activeTab === "analytics"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.analytics")}
              </Link>
              <Link
                href="/vendor/upsell"
                className={`${
                  activeTab === "upsell"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.upsell")}
              </Link>
              <Link
                href="/vendor/invoices"
                className={`${
                  activeTab === "invoices"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {t("vendor.invoices")}
              </Link>
            </nav>
          </div>

          {/* Bulk Import Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{t("vendor.bulk_import")}</h2>
            <p className="text-gray-600 mb-4">{t("vendor.template_description")}</p>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <button
                onClick={downloadTemplate}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download size={18} className="mr-2" />
                {t("vendor.download_template")}
              </button>

              <div className="flex-1">
                <div className="flex items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-gray-100 file:text-gray-700
                      hover:file:bg-gray-200"
                  />
                  <button
                    onClick={handleFileUpload}
                    disabled={!selectedFile || isUploading}
                    className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("vendor.uploading")}
                      </span>
                    ) : (
                      <>
                        <Upload size={18} className="mr-2 inline-block" />
                        {t("vendor.upload")}
                      </>
                    )}
                  </button>
                </div>

                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                  </p>
                )}
              </div>
            </div>

            {/* Import Status Message */}
            {importStatus && (
              <div
                className={`mt-4 p-3 rounded-md ${importStatus === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {importStatus === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{importMessage}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                      <button
                        onClick={() => setImportStatus(null)}
                        className={`inline-flex rounded-md p-1.5 ${
                          importStatus === "success"
                            ? "bg-green-50 text-green-500 hover:bg-green-100"
                            : "bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Inventory Management */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">{t("vendor.inventory")}</h2>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                {t("vendor.add_product")}
              </button>
            </div>

            {/* Search, Filter, and Sort Controls */}
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t("vendor.search_products")}
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
                    <option value="all">{t("vendor.all_products")}</option>
                    <option value="inStock">{t("vendor.in_stock")}</option>
                    <option value="lowStock">{t("vendor.low_stock")}</option>
                    <option value="outOfStock">{t("vendor.out_of_stock")}</option>
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
                    <option value="default">{t("vendor.default_sorting")}</option>
                    <option value="priceAsc">{t("vendor.price_low_high")}</option>
                    <option value="priceDesc">{t("vendor.price_high_low")}</option>
                    <option value="nameAsc">{t("vendor.name_a_z")}</option>
                    <option value="nameDesc">{t("vendor.name_z_a")}</option>
                    <option value="stockAsc">{t("vendor.stock_low_high")}</option>
                    <option value="stockDesc">{t("vendor.stock_high_low")}</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ArrowUpDown size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("vendor.product")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("vendor.sku")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("vendor.stock")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("vendor.price")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("vendor.status")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {t("vendor.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredAndSortedItems().map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.price)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {t(`vendor.${item.status.toLowerCase().replace(" ", "_")}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => setEditingProduct(item)}
                          className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
                        >
                          <Edit size={16} className="mr-1" />
                          {t("vendor.edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          {t("vendor.delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No results message */}
            {getFilteredAndSortedItems().length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t("vendor.no_products_found")}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t("vendor.add_product")}</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.product_name")}</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.sku")}</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.stock")}</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number.parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.price")}</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("product.cbd_content")}</label>
                <input
                  type="text"
                  value={newProduct.cbd_content}
                  onChange={(e) => setNewProduct({ ...newProduct, cbd_content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("product.thc_content")}</label>
                <input
                  type="text"
                  value={newProduct.thc_content}
                  onChange={(e) => setNewProduct({ ...newProduct, thc_content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.category")}</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">{t("vendor.select_category")}</option>
                  <option value="CBD Oil">{t("categories.cbd_oil")}</option>
                  <option value="CBD Capsules">{t("categories.cbd_capsules")}</option>
                  <option value="CBD Edibles">{t("categories.cbd_edibles")}</option>
                  <option value="CBD Cosmetics">{t("categories.cbd_cosmetics")}</option>
                  <option value="CBD for Pets">{t("categories.cbd_pets")}</option>
                  <option value="CBD Flowers">{t("categories.cbd_flowers")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.vendor")}</label>
                <input
                  type="text"
                  value={newProduct.vendor}
                  onChange={(e) => setNewProduct({ ...newProduct, vendor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="free_shipping"
                  checked={newProduct.free_shipping}
                  onChange={(e) => setNewProduct({ ...newProduct, free_shipping: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="free_shipping" className="ml-2 block text-sm text-gray-900">
                  {t("product.free_shipping")}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lab_tested"
                  checked={newProduct.lab_tested}
                  onChange={(e) => setNewProduct({ ...newProduct, lab_tested: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="lab_tested" className="ml-2 block text-sm text-gray-900">
                  {t("product.lab_tested")}
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t("vendor.cancel")}
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t("vendor.add_product")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{t("vendor.edit_product")}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.product_name")}</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.sku")}</label>
                <input
                  type="text"
                  value={editingProduct.sku}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.stock")}</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => {
                    const stock = Number.parseInt(e.target.value) || 0
                    let status = "In Stock"
                    if (stock === 0) {
                      status = "Out of Stock"
                    } else if (stock <= 5) {
                      status = "Low Stock"
                    }
                    setEditingProduct({ ...editingProduct, stock, status })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("vendor.price")}</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("product.cbd_content")}</label>
                <input
                  type="text"
                  value={editingProduct.cbd_content}
                  onChange={(e) => setEditingProduct({ ...editingProduct, cbd_content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("product.thc_content")}</label>
                <input
                  type="text"
                  value={editingProduct.thc_content}
                  onChange={(e) => setEditingProduct({ ...editingProduct, thc_content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit_free_shipping"
                  checked={editingProduct.free_shipping}
                  onChange={(e) => setEditingProduct({ ...editingProduct, free_shipping: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit_free_shipping" className="ml-2 block text-sm text-gray-900">
                  {t("product.free_shipping")}
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit_lab_tested"
                  checked={editingProduct.lab_tested}
                  onChange={(e) => setEditingProduct({ ...editingProduct, lab_tested: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="edit_lab_tested" className="ml-2 block text-sm text-gray-900">
                  {t("product.lab_tested")}
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                {t("vendor.cancel")}
              </button>
              <button
                onClick={handleEditProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {t("vendor.save_changes")}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

