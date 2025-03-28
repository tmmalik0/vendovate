"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import Image from "next/image"

export default function FeaturedVendors() {
  const { t } = useLanguage()

  // Sample CBD vendor data
  const vendors = [
    {
      id: 1,
      name: "NatureCBD",
      logo: "/placeholder.svg?height=100&width=100",
      location: "Berlin, DE",
      productCount: 24,
      slug: "naturecbd",
    },
    {
      id: 2,
      name: "HealthyCBD",
      logo: "/placeholder.svg?height=100&width=100",
      location: "Munich, DE",
      productCount: 18,
      slug: "healthycbd",
    },
    {
      id: 3,
      name: "PureCBD",
      logo: "/placeholder.svg?height=100&width=100",
      location: "Hamburg, DE",
      productCount: 15,
      slug: "purecbd",
    },
    {
      id: 4,
      name: "WellnessCBD",
      logo: "/placeholder.svg?height=100&width=100",
      location: "Frankfurt, DE",
      productCount: 21,
      slug: "wellnesscbd",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {vendors.map((vendor) => (
        <Link key={vendor.id} href={`/vendor/${vendor.slug}`}>
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-center mb-4">
              <Image
                src={vendor.logo || "/placeholder.svg"}
                alt={vendor.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2">{vendor.name}</h3>
            <div className="text-sm text-gray-500 text-center">
              <p>{vendor.location}</p>
              <p>
                {vendor.productCount} {t("vendor.products_count")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

