"use client"

import { useLanguage } from "@/contexts/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CategoryNav from "@/components/category-nav"
import FeaturedVendors from "@/components/featured-vendors"
import HotDeals from "@/components/hot-deals"
import SalesProducts from "@/components/sales-products"
import SocialProof from "@/components/social-proof"
import { Carousel } from "@/components/carousel"
import NewsletterBanner from "@/components/newsletter-banner"

export default function HomePage() {
  const { t } = useLanguage()

  // Carousel slides
  const slides = [
    {
      id: 1,
      image: "/placeholder.svg?height=500&width=1200",
      title: t("home.carousel.slide1.title"),
      subtitle: t("home.carousel.slide1.subtitle"),
      cta: t("home.carousel.slide1.cta"),
      ctaLink: "/products",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=500&width=1200",
      title: t("home.carousel.slide2.title"),
      subtitle: t("home.carousel.slide2.subtitle"),
      cta: t("home.carousel.slide2.cta"),
      ctaLink: "/products",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=500&width=1200",
      title: t("home.carousel.slide3.title"),
      subtitle: t("home.carousel.slide3.subtitle"),
      cta: t("home.carousel.slide3.cta"),
      ctaLink: "/lab-results",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CategoryNav />

      <main className="flex-grow">
        {/* Hero Carousel */}
        <section className="relative">
          <Carousel slides={slides} />
        </section>

        {/* Featured Vendors */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("home.featured_vendors")}</h2>
            <FeaturedVendors />
          </div>
        </section>

        {/* Hot Deals */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("home.hot_deals")}</h2>
            <HotDeals />
          </div>
        </section>

        {/* Sales Products */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("home.sales_products")}</h2>
            <SalesProducts />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-gray-100">
          <NewsletterBanner />
        </section>
      </main>

      <Footer />

      {/* Social Proof Notifications */}
      <SocialProof />
    </div>
  )
}

