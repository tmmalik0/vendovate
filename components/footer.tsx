"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("app.name")}</h3>
            <p className="text-gray-300 mb-4">{t("app.tagline")}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.information")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  {t("footer.about_us")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  {t("footer.privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  {t("footer.terms_conditions")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white">
                  {t("footer.shipping_returns")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  {t("footer.contact_us")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.my_account")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account" className="text-gray-300 hover:text-white">
                  {t("footer.my_profile")}
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-gray-300 hover:text-white">
                  {t("footer.my_orders")}
                </Link>
              </li>
              <li>
                <Link href="/account/wishlist" className="text-gray-300 hover:text-white">
                  {t("footer.my_wishlist")}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white">
                  {t("footer.my_cart")}
                </Link>
              </li>
              <li>
                <Link href="/account/settings" className="text-gray-300 hover:text-white">
                  {t("footer.account_settings")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>
                  123 E-Commerce St.
                  <br />
                  10115 Berlin, Germany
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+49 1234 567890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>info@vendovate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} {t("app.name")}. {t("footer.rights_reserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}

