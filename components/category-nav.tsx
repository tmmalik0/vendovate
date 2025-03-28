"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function CategoryNav() {
  const { t } = useLanguage()

  const categories = [
    { id: "cbd-oil", name: t("categories.cbd_oil"), href: "/category/cbd-oil" },
    { id: "cbd-capsules", name: t("categories.cbd_capsules"), href: "/category/cbd-capsules" },
    { id: "cbd-edibles", name: t("categories.cbd_edibles"), href: "/category/cbd-edibles" },
    { id: "cbd-cosmetics", name: t("categories.cbd_cosmetics"), href: "/category/cbd-cosmetics" },
    { id: "cbd-pets", name: t("categories.cbd_pets"), href: "/category/cbd-pets" },
    { id: "cbd-flowers", name: t("categories.cbd_flowers"), href: "/category/cbd-flowers" },
    { id: "newest", name: t("categories.newest"), href: "/newest" },
    { id: "bestsellers", name: t("categories.bestsellers"), href: "/bestsellers" },
    { id: "sales", name: t("categories.sales"), href: "/sales" },
    { id: "lab-results", name: t("categories.lab_results"), href: "/lab-results" },
  ]

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex space-x-8 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-white hover:text-gray-300 hover:border-gray-300 transition duration-150 ease-in-out whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

