"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Define available languages
const LANGUAGES = ["en", "de", "fr", "es"] as const
type Language = (typeof LANGUAGES)[number]

// Define currency
export type Currency = "EUR" | "USD" | "GBP"

// Define translations
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    "app.name": "MeinCBD24-7",
    "app.tagline": "Premium CBD products marketplace",
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgot_password": "Forgot Password?",
    "auth.remember_me": "Remember me",
    "auth.no_account": "Don't have an account?",
    "auth.logging_in": "Logging in...",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.vendors": "Vendors",
    "nav.cart": "Cart",
    "nav.my_account": "My Account",
    "nav.cart_empty": "Your cart is empty",
    "nav.blog": "Our blog",
    "nav.gift_certificates": "Gift certificates",
    "nav.brands": "Our brands",
    "nav.become_seller": "Become a seller",
    "nav.select_language": "Select language",
    "search.placeholder": "Search CBD products...",
    "vendor.dashboard": "Vendor Dashboard",
    "vendor.products": "Products",
    "vendor.orders": "Orders",
    "vendor.revenue": "Revenue",
    "vendor.customers": "Customers",
    "vendor.welcome_back": "Welcome back, Vendor!",
    "vendor.view_all_products": "View all products",
    "vendor.view_all_orders": "View all orders",
    "vendor.view_analytics": "View analytics",
    "vendor.view_all_customers": "View all customers",
    "vendor.overview": "Overview",
    "vendor.recent_orders": "Recent Orders",
    "vendor.products_count": "products",
    "product.add_to_cart": "Add to Cart",
    "product.price": "Price",
    "product.vendor": "Vendor",
    "product.low_stock": "Low Stock",
    "product.free_shipping": "Free Shipping",
    "product.limited_offer": "Limited Time Offer",
    "product.ends_in": "Ends in",
    "product.cbd_content": "CBD Content",
    "product.thc_content": "THC Content",
    "product.origin": "Origin",
    "product.lab_tested": "Lab Tested",
    "categories.cbd_oil": "CBD Oil",
    "categories.cbd_capsules": "CBD Capsules",
    "categories.cbd_edibles": "CBD Edibles",
    "categories.cbd_cosmetics": "CBD Cosmetics",
    "categories.cbd_pets": "CBD for Pets",
    "categories.cbd_flowers": "CBD Flowers",
    "categories.newest": "New Arrivals",
    "categories.bestsellers": "Bestsellers",
    "categories.sales": "Sales",
    "categories.lab_results": "Lab Results",
    "home.featured_vendors": "Featured CBD Brands",
    "home.hot_deals": "Hot Deals",
    "home.sales_products": "Sales Products",
    "home.carousel.slide1.title": "Premium CBD Products",
    "home.carousel.slide1.subtitle": "Discover our selection of high-quality CBD products from trusted brands.",
    "home.carousel.slide1.cta": "Shop Now",
    "home.carousel.slide2.title": "Natural Relief",
    "home.carousel.slide2.subtitle": "Find the perfect CBD solution for your wellness needs.",
    "home.carousel.slide2.cta": "Explore",
    "home.carousel.slide3.title": "Lab-Tested Quality",
    "home.carousel.slide3.subtitle": "All our products are third-party lab tested for purity and potency.",
    "home.carousel.slide3.cta": "Learn More",
    "footer.information": "Information",
    "footer.about_us": "About Us",
    "footer.privacy_policy": "Privacy Policy",
    "footer.terms_conditions": "Terms & Conditions",
    "footer.shipping_returns": "Shipping & Returns",
    "footer.contact_us": "Contact Us",
    "footer.my_account": "My Account",
    "footer.my_profile": "My Profile",
    "footer.my_orders": "My Orders",
    "footer.my_wishlist": "My Wishlist",
    "footer.my_cart": "My Cart",
    "footer.account_settings": "Account Settings",
    "footer.contact": "Contact",
    "footer.quick_links": "Quick Links",
    "footer.for_vendors": "For Vendors",
    "footer.email": "Email",
    "footer.phone": "Phone",
    "footer.rights_reserved": "All rights reserved.",
    "social.recent_purchase": "just purchased",
    "social.minutes_ago": "minutes ago",
    "social.seconds_ago": "seconds ago",
    "auth.username_or_email": "Username or Email",
    "auth.username": "Username",
    "auth.username_available": "Username is available",
    "auth.username_taken": "This username is already taken",
    "auth.username_checking": "Checking username availability...",
    "newsletter.title": "Subscribe to our Newsletter",
    "newsletter.description": "Subscribe to our newsletter for exclusive CBD offers and updates",
    "newsletter.placeholder": "Your email address",
    "newsletter.subscribe": "Subscribe",
    "newsletter.subscribing": "Subscribing...",
    "newsletter.success": "Thank you for subscribing!",
    "newsletter.subscribed": "You're subscribed!",
    "vendor.upsell_info": "Set up product bundles and cross-sell opportunities to increase your average order value.",
    "vendor.product_bundles": "Product Bundles",
    "vendor.product_bundles_desc":
      "Create product bundles to offer customers a discount when purchasing multiple items together.",
    "vendor.create_bundle": "Create Bundle",
    "vendor.cross_sell": "Cross-Sell Products",
    "vendor.cross_sell_desc": "Set up product relationships to suggest complementary products to customers.",
    "vendor.setup_cross_sell": "Set Up Cross-Sell",
    "vendor.volume_discounts": "Volume Discounts",
    "vendor.volume_discounts_desc": "Offer discounts to customers who purchase products in larger quantities.",
    "vendor.setup_discounts": "Set Up Discounts",
    "vendor.loyalty_program": "Loyalty Program",
    "vendor.loyalty_program_desc": "Reward your repeat customers with special offers and discounts.",
    "vendor.setup_loyalty": "Set Up Loyalty Program",
    "vendor.all_products": "All Products",
    "vendor.search_products": "Search products...",
    "vendor.default_sorting": "Default Sorting",
    "vendor.price_low_high": "Price: Low to High",
    "vendor.price_high_low": "Price: High to Low",
    "vendor.name_a_z": "Name: A to Z",
    "vendor.name_z_a": "Name: Z to A",
    "vendor.stock_low_high": "Stock: Low to High",
    "vendor.stock_high_low": "Stock: High to Low",
    "vendor.no_products_found": "No products found matching your criteria.",
    "vendor.product_name": "Product Name",
    "vendor.category": "Category",
    "vendor.vendor": "Vendor",
    "vendor.select_category": "Select Category",
    "vendor.cancel": "Cancel",
    "vendor.save_changes": "Save Changes",
    "vendor.edit_product": "Edit Product",
    "vendor.confirm_delete": "Are you sure you want to delete this product?",
    "vendor.uploading": "Uploading...",
    "vendor.import_success": "Products imported successfully",
    "vendor.import_error": "Import Error",
    "vendor.select_file": "Please select a file",
    "vendor.csv_required": "Please upload a CSV file",
    "vendor.file_read_error": "Error reading file",
    "vendor.try_again": "Please try again",
    "account.my_account": "My Account",
    "account.my_orders": "My Orders",
    "account.my_wishlist": "My Wishlist",
    "account.settings": "Settings",
    "admin.dashboard": "Dashboard",
    "admin.users": "Users",
    "admin.vendors": "Vendors",
    "admin.products": "Products",
    "admin.orders": "Orders",
    "admin.settings": "Settings",
    "auth.sign_out": "Sign out",
    "nav.items": "items",
    "cart.your_cart": "Your Cart",
    "cart.cart_items": "Cart Items",
    "cart.continue_shopping": "Continue Shopping",
    "cart.remove": "Remove",
    "cart.clear_cart": "Clear Cart",
    "cart.order_summary": "Order Summary",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.discount": "Discount",
    "cart.total": "Total",
    "cart.free": "Free",
    "cart.coupon_code": "Coupon Code",
    "cart.apply": "Apply",
    "cart.coupon_applied": "Coupon applied successfully!",
    "cart.coupon_hint": "Try 'WELCOME10' for 10% off your first order",
    "cart.invalid_coupon": "Invalid coupon code",
    "cart.proceed_to_checkout": "Proceed to Checkout",
    "cart.secure_checkout": "Secure checkout powered by Stripe",
    "cart.empty_cart": "Your cart is empty",
    "cart.empty_cart_message": "Looks like you haven't added any products to your cart yet.",
    "cart.start_shopping": "Start Shopping",
    "vendor.back_to_dashboard": "Back to Dashboard",
  },
  de: {
    "app.name": "MeinCBD24-7",
    "app.tagline": "Premium CBD-Produkte Marktplatz",
    "auth.login": "Anmelden",
    "auth.register": "Registrieren",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.forgot_password": "Passwort vergessen?",
    "auth.remember_me": "Angemeldet bleiben",
    "auth.no_account": "Noch kein Konto?",
    "auth.logging_in": "Anmelden...",
    "nav.home": "Startseite",
    "nav.products": "Produkte",
    "nav.vendors": "Anbieter",
    "nav.cart": "Warenkorb",
    "nav.my_account": "Mein Konto",
    "nav.cart_empty": "Ihr Warenkorb ist leer",
    "nav.blog": "Unser Blog",
    "nav.gift_certificates": "Geschenkgutscheine",
    "nav.brands": "Unsere Marken",
    "nav.become_seller": "Verkäufer werden",
    "nav.select_language": "Sprache auswählen",
    "search.placeholder": "CBD-Produkte suchen...",
    "vendor.dashboard": "Anbieter-Dashboard",
    "vendor.products": "Produkte",
    "vendor.orders": "Bestellungen",
    "vendor.revenue": "Umsatz",
    "vendor.customers": "Kunden",
    "vendor.welcome_back": "Willkommen zurück, Anbieter!",
    "vendor.view_all_products": "Alle Produkte anzeigen",
    "vendor.view_all_orders": "Alle Bestellungen anzeigen",
    "vendor.view_analytics": "Analysen anzeigen",
    "vendor.view_all_customers": "Alle Kunden anzeigen",
    "vendor.overview": "Übersicht",
    "vendor.recent_orders": "Aktuelle Bestellungen",
    "vendor.products_count": "Produkte",
    "vendor.inventory": "Inventar",
    "vendor.messages": "Nachrichten",
    "vendor.analytics": "Analysen",
    "vendor.upsell": "Upsell",
    "vendor.invoices": "Rechnungen",
    "vendor.pending": "Ausstehend",
    "vendor.add_product": "Produkt hinzufügen",
    "vendor.product": "Produkt",
    "vendor.sku": "Artikelnummer",
    "vendor.stock": "Bestand",
    "vendor.price": "Preis",
    "vendor.status": "Status",
    "vendor.actions": "Aktionen",
    "vendor.edit": "Bearbeiten",
    "vendor.delete": "Löschen",
    "vendor.in_stock": "Auf Lager",
    "vendor.low_stock": "Geringer Bestand",
    "vendor.out_of_stock": "Nicht auf Lager",
    "vendor.order_id": "Bestellnummer",
    "vendor.date": "Datum",
    "vendor.customer": "Kunde",
    "vendor.total": "Gesamt",
    "vendor.view_details": "Details anzeigen",
    "vendor.all_orders": "Alle Bestellungen",
    "vendor.processing": "In Bearbeitung",
    "vendor.shipped": "Versendet",
    "vendor.delivered": "Geliefert",
    "vendor.new": "Neu",
    "vendor.from": "Von",
    "vendor.subject": "Betreff",
    "vendor.view": "Ansehen",
    "vendor.invoice_id": "Rechnungsnummer",
    "vendor.amount": "Betrag",
    "vendor.paid": "Bezahlt",
    "vendor.download": "Herunterladen",
    "vendor.download_template": "Vorlage herunterladen",
    "vendor.import_products": "Produkte importieren",
    "vendor.bulk_import": "Massenimport",
    "vendor.select_file": "Datei auswählen",
    "vendor.upload": "Hochladen",
    "vendor.import_success": "Import erfolgreich",
    "vendor.import_error": "Importfehler",
    "vendor.template_description": "Laden Sie diese CSV-Vorlage herunter, um Ihre Produkte zu importieren",
    "product.add_to_cart": "In den Warenkorb",
    "product.price": "Preis",
    "product.vendor": "Anbieter",
    "product.low_stock": "Geringer Bestand",
    "product.free_shipping": "Kostenloser Versand",
    "product.limited_offer": "Zeitlich begrenztes Angebot",
    "product.ends_in": "Endet in",
    "product.cbd_content": "CBD-Gehalt",
    "product.thc_content": "THC-Gehalt",
    "product.origin": "Herkunft",
    "product.lab_tested": "Laborgeprüft",
    "categories.cbd_oil": "CBD-Öl",
    "categories.cbd_capsules": "CBD-Kapseln",
    "categories.cbd_edibles": "CBD-Esswaren",
    "categories.cbd_cosmetics": "CBD-Kosmetik",
    "categories.cbd_pets": "CBD für Haustiere",
    "categories.cbd_flowers": "CBD-Blüten",
    "categories.newest": "Neuheiten",
    "categories.bestsellers": "Bestseller",
    "categories.sales": "Angebote",
    "categories.lab_results": "Laborergebnisse",
    "home.featured_vendors": "Ausgewählte CBD-Marken",
    "home.hot_deals": "Top-Angebote",
    "home.sales_products": "Angebote",
    "home.carousel.slide1.title": "Premium CBD-Produkte",
    "home.carousel.slide1.subtitle":
      "Entdecken Sie unsere Auswahl an hochwertigen CBD-Produkten von vertrauenswürdigen Marken.",
    "home.carousel.slide1.cta": "Jetzt einkaufen",
    "home.carousel.slide2.title": "Natürliche Linderung",
    "home.carousel.slide2.subtitle": "Finden Sie die perfekte CBD-Lösung für Ihre Wellness-Bedürfnisse.",
    "home.carousel.slide2.cta": "Entdecken",
    "home.carousel.slide3.title": "Laborgeprüfte Qualität",
    "home.carousel.slide3.subtitle":
      "Alle unsere Produkte werden von unabhängigen Laboren auf Reinheit und Wirksamkeit getestet.",
    "home.carousel.slide3.cta": "Mehr erfahren",
    "footer.information": "Informationen",
    "footer.about_us": "Über uns",
    "footer.privacy_policy": "Datenschutzrichtlinie",
    "footer.terms_conditions": "AGB",
    "footer.shipping_returns": "Versand & Rückgabe",
    "footer.contact_us": "Kontakt",
    "footer.my_account": "Mein Konto",
    "footer.my_profile": "Mein Profil",
    "footer.my_orders": "Meine Bestellungen",
    "footer.my_wishlist": "Meine Wunschliste",
    "footer.my_cart": "Mein Warenkorb",
    "footer.account_settings": "Kontoeinstellungen",
    "footer.contact": "Kontakt",
    "footer.quick_links": "Schnelllinks",
    "footer.for_vendors": "Für Anbieter",
    "footer.email": "E-Mail",
    "footer.phone": "Telefon",
    "footer.rights_reserved": "Alle Rechte vorbehalten.",
    "social.recent_purchase": "hat gerade gekauft",
    "social.minutes_ago": "Minuten her",
    "social.seconds_ago": "Sekunden her",
    "auth.username_or_email": "Benutzername oder E-Mail",
    "auth.username": "Benutzername",
    "auth.username_available": "Benutzername ist verfügbar",
    "auth.username_taken": "Dieser Benutzername ist bereits vergeben",
    "auth.username_checking": "Überprüfe Verfügbarkeit des Benutzernamens...",
    "newsletter.title": "Abonnieren Sie unseren Newsletter",
    "newsletter.description": "Abonnieren Sie unseren Newsletter für exklusive CBD-Angebote und Updates",
    "newsletter.placeholder": "Ihre E-Mail-Adresse",
    "newsletter.subscribe": "Abonnieren",
    "newsletter.subscribing": "Wird abonniert...",
    "newsletter.success": "Vielen Dank für Ihr Abonnement!",
    "newsletter.subscribed": "Sie haben abonniert!",
    "vendor.upsell_info":
      "Richten Sie Produktbündel und Cross-Selling-Möglichkeiten ein, um Ihren durchschnittlichen Bestellwert zu erhöhen.",
    "vendor.product_bundles": "Produktbündel",
    "vendor.product_bundles_desc":
      "Erstellen Sie Produktbündel, um Kunden einen Rabatt beim Kauf mehrerer Artikel anzubieten.",
    "vendor.create_bundle": "Bündel erstellen",
    "vendor.cross_sell": "Cross-Selling-Produkte",
    "vendor.cross_sell_desc": "Richten Sie Produktbeziehungen ein, um Kunden ergänzende Produkte vorzuschlagen.",
    "vendor.setup_cross_sell": "Cross-Selling einrichten",
    "vendor.volume_discounts": "Mengenrabatte",
    "vendor.volume_discounts_desc": "Bieten Sie Rabatte für Kunden an, die Produkte in größeren Mengen kaufen.",
    "vendor.setup_discounts": "Rabatte einrichten",
    "vendor.loyalty_program": "Treueprogramm",
    "vendor.loyalty_program_desc": "Belohnen Sie Ihre Stammkunden mit speziellen Angeboten und Rabatten.",
    "vendor.setup_loyalty": "Treueprogramm einrichten",
    "vendor.all_products": "Alle Produkte",
    "vendor.search_products": "Produkte suchen...",
    "vendor.default_sorting": "Standardsortierung",
    "vendor.price_low_high": "Preis: Niedrig zu Hoch",
    "vendor.price_high_low": "Preis: Hoch zu Niedrig",
    "vendor.name_a_z": "Name: A bis Z",
    "vendor.name_z_a": "Name: Z bis A",
    "vendor.stock_low_high": "Bestand: Niedrig zu Hoch",
    "vendor.stock_high_low": "Bestand: Hoch zu Niedrig",
    "vendor.no_products_found": "Keine Produkte gefunden, die Ihren Kriterien entsprechen.",
    "vendor.product_name": "Produktname",
    "vendor.category": "Kategorie",
    "vendor.vendor": "Anbieter",
    "vendor.select_category": "Kategorie auswählen",
    "vendor.cancel": "Abbrechen",
    "vendor.save_changes": "Änderungen speichern",
    "vendor.edit_product": "Produkt bearbeiten",
    "vendor.confirm_delete": "Sind Sie sicher, dass Sie dieses Produkt löschen möchten?",
    "vendor.uploading": "Wird hochgeladen...",
    "vendor.import_success": "Produkte erfolgreich importiert",
    "vendor.import_error": "Importfehler",
    "vendor.select_file": "Bitte wählen Sie eine Datei aus",
    "vendor.csv_required": "Bitte laden Sie eine CSV-Datei hoch",
    "vendor.file_read_error": "Fehler beim Lesen der Datei",
    "vendor.try_again": "Bitte versuchen Sie es erneut",
    "account.my_account": "Mein Konto",
    "account.my_orders": "Meine Bestellungen",
    "account.my_wishlist": "Meine Wunschliste",
    "account.settings": "Einstellungen",
    "admin.dashboard": "Dashboard",
    "admin.users": "Benutzer",
    "admin.vendors": "Anbieter",
    "admin.products": "Produkte",
    "admin.orders": "Bestellungen",
    "admin.settings": "Einstellungen",
    "auth.sign_out": "Abmelden",
    "nav.items": "Artikel",
    "cart.your_cart": "Ihr Warenkorb",
    "cart.cart_items": "Warenkorbartikel",
    "cart.continue_shopping": "Weiter einkaufen",
    "cart.remove": "Entfernen",
    "cart.clear_cart": "Warenkorb leeren",
    "cart.order_summary": "Bestellübersicht",
    "cart.subtotal": "Zwischensumme",
    "cart.shipping": "Versand",
    "cart.discount": "Rabatt",
    "cart.total": "Gesamtsumme",
    "cart.free": "Kostenlos",
    "cart.coupon_code": "Gutscheincode",
    "cart.apply": "Anwenden",
    "cart.coupon_applied": "Gutschein erfolgreich angewendet!",
    "cart.coupon_hint": "Versuchen Sie 'WELCOME10' für 10% Rabatt auf Ihre erste Bestellung",
    "cart.invalid_coupon": "Ungültiger Gutscheincode",
    "cart.proceed_to_checkout": "Zur Kasse",
    "cart.secure_checkout": "Sicherer Checkout powered by Stripe",
    "cart.empty_cart": "Ihr Warenkorb ist leer",
    "cart.empty_cart_message": "Es sieht so aus, als hätten Sie noch keine Produkte in Ihren Warenkorb gelegt.",
    "cart.start_shopping": "Einkauf beginnen",
    "vendor.back_to_dashboard": "Zurück zum Dashboard",
  },
  fr: {
    "app.name": "MeinCBD24-7",
    "app.tagline": "Marché de produits CBD premium",
    "auth.login": "Se connecter",
    "auth.register": "S'inscrire",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.forgot_password": "Mot de passe oublié?",
    "auth.remember_me": "Se souvenir de moi",
    "auth.no_account": "Vous n'avez pas de compte?",
    "auth.logging_in": "Connexion en cours...",
    "nav.home": "Accueil",
    "nav.products": "Produits",
    "nav.vendors": "Vendeurs",
    "nav.cart": "Panier",
    "nav.my_account": "Mon compte",
    "nav.cart_empty": "Votre panier est vide",
    "nav.blog": "Notre blog",
    "nav.gift_certificates": "Cartes cadeaux",
    "nav.brands": "Nos marques",
    "nav.become_seller": "Devenir vendeur",
    "nav.select_language": "Sélectionner la langue",
    "search.placeholder": "Rechercher des produits CBD...",
    "vendor.dashboard": "Tableau de bord vendeur",
    "vendor.products": "Produits",
    "vendor.orders": "Commandes",
    "vendor.revenue": "Revenu",
    "vendor.customers": "Clients",
    "vendor.welcome_back": "Bienvenue, Vendeur!",
    "vendor.view_all_products": "Voir tous les produits",
    "vendor.view_all_orders": "Voir toutes les commandes",
    "vendor.view_analytics": "Voir les analyses",
    "vendor.view_all_customers": "Voir tous les clients",
    "vendor.overview": "Aperçu",
    "vendor.recent_orders": "Commandes récentes",
    "vendor.products_count": "produits",
    "product.add_to_cart": "Ajouter au panier",
    "product.price": "Prix",
    "product.vendor": "Vendeur",
    "product.low_stock": "Stock limité",
    "product.free_shipping": "Livraison gratuite",
    "product.limited_offer": "Offre limitée",
    "product.ends_in": "Se termine dans",
    "product.cbd_content": "Teneur en CBD",
    "product.thc_content": "Teneur en THC",
    "product.origin": "Origine",
    "product.lab_tested": "Testé en laboratoire",
    "categories.cbd_oil": "Huile CBD",
    "categories.cbd_capsules": "Capsules CBD",
    "categories.cbd_edibles": "Comestibles CBD",
    "categories.cbd_cosmetics": "Cosmétiques CBD",
    "categories.cbd_pets": "CBD pour animaux",
    "categories.cbd_flowers": "Fleurs CBD",
    "categories.newest": "Nouveautés",
    "categories.bestsellers": "Meilleures ventes",
    "categories.sales": "Soldes",
    "categories.lab_results": "Résultats de laboratoire",
    "home.featured_vendors": "Marques CBD en vedette",
    "home.hot_deals": "Offres spéciales",
    "home.sales_products": "Produits en solde",
    "home.carousel.slide1.title": "Produits CBD Premium",
    "home.carousel.slide1.subtitle":
      "Découvrez notre sélection de produits CBD de haute qualité de marques de confiance.",
    "home.carousel.slide1.cta": "Acheter maintenant",
    "home.carousel.slide2.title": "Soulagement naturel",
    "home.carousel.slide2.subtitle": "Trouvez la solution CBD parfaite pour vos besoins de bien-être.",
    "home.carousel.slide2.cta": "Explorer",
    "home.carousel.slide3.title": "Qualité testée en laboratoire",
    "home.carousel.slide3.subtitle":
      "Tous nos produits sont testés par des laboratoires tiers pour leur pureté et leur puissance.",
    "home.carousel.slide3.cta": "En savoir plus",
    "footer.information": "Informations",
    "footer.about_us": "À propos de nous",
    "footer.privacy_policy": "Politique de confidentialité",
    "footer.terms_conditions": "Conditions générales",
    "footer.shipping_returns": "Livraison & Retours",
    "footer.contact_us": "Nous contacter",
    "footer.my_account": "Mon compte",
    "footer.my_profile": "Mon profil",
    "footer.my_orders": "Mes commandes",
    "footer.my_wishlist": "Ma liste de souhaits",
    "footer.my_cart": "Mon panier",
    "footer.account_settings": "Paramètres du compte",
    "footer.contact": "Contact",
    "footer.quick_links": "Liens rapides",
    "footer.for_vendors": "Pour les vendeurs",
    "footer.email": "Email",
    "footer.phone": "Téléphone",
    "footer.rights_reserved": "Tous droits réservés.",
    "social.recent_purchase": "vient d'acheter",
    "social.minutes_ago": "minutes",
    "social.seconds_ago": "secondes",
    "auth.username_or_email": "Nom d'utilisateur ou Email",
    "auth.username": "Nom d'utilisateur",
    "auth.username_available": "Nom d'utilisateur disponible",
    "auth.username_taken": "Ce nom d'utilisateur est déjà pris",
    "auth.username_checking": "Vérification de la disponibilité du nom d'utilisateur...",
  },
  es: {
    "app.name": "MeinCBD24-7",
    "app.tagline": "Mercado de productos CBD premium",
    "auth.login": "Iniciar sesión",
    "auth.register": "Registrarse",
    "auth.email": "Correo electrónico",
    "auth.password": "Contraseña",
    "auth.forgot_password": "¿Olvidó su contraseña?",
    "auth.remember_me": "Recordarme",
    "auth.no_account": "¿No tiene una cuenta?",
    "auth.logging_in": "Iniciando sesión...",
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.vendors": "Vendedores",
    "nav.cart": "Carrito",
    "nav.my_account": "Mi cuenta",
    "nav.cart_empty": "Su carrito está vacío",
    "nav.blog": "Nuestro blog",
    "nav.gift_certificates": "Tarjetas de regalo",
    "nav.brands": "Nuestras marcas",
    "nav.become_seller": "Conviértase en vendedor",
    "nav.select_language": "Seleccionar idioma",
    "search.placeholder": "Buscar productos CBD...",
    "vendor.dashboard": "Panel de vendedor",
    "vendor.products": "Productos",
    "vendor.orders": "Pedidos",
    "vendor.revenue": "Ingresos",
    "vendor.customers": "Clientes",
    "vendor.welcome_back": "¡Bienvenido de nuevo, Vendedor!",
    "vendor.view_all_products": "Ver todos los productos",
    "vendor.view_all_orders": "Ver todos los pedidos",
    "vendor.view_analytics": "Ver análisis",
    "vendor.view_all_customers": "Ver todos los clientes",
    "vendor.overview": "Resumen",
    "vendor.recent_orders": "Pedidos recientes",
    "vendor.products_count": "productos",
    "product.add_to_cart": "Añadir al carrito",
    "product.price": "Precio",
    "product.vendor": "Vendedor",
    "product.low_stock": "Pocas unidades",
    "product.free_shipping": "Envío gratis",
    "product.limited_offer": "Oferta limitada",
    "product.ends_in": "Termina en",
    "product.cbd_content": "Contenido de CBD",
    "product.thc_content": "Contenido de THC",
    "product.origin": "Origen",
    "product.lab_tested": "Probado en laboratorio",
    "categories.cbd_oil": "Aceite CBD",
    "categories.cbd_capsules": "Cápsulas CBD",
    "categories.cbd_edibles": "Comestibles CBD",
    "categories.cbd_cosmetics": "Cosméticos CBD",
    "categories.cbd_pets": "CBD para mascotas",
    "categories.cbd_flowers": "Flores CBD",
    "categories.newest": "Novedades",
    "categories.bestsellers": "Más vendidos",
    "categories.sales": "Ofertas",
    "categories.lab_results": "Resultados de laboratorio",
    "home.featured_vendors": "Marcas CBD destacadas",
    "home.hot_deals": "Ofertas especiales",
    "home.sales_products": "Productos en oferta",
    "home.carousel.slide1.title": "Productos CBD Premium",
    "home.carousel.slide1.subtitle":
      "Descubra nuestra selección de productos CBD de alta calidad de marcas de confianza.",
    "home.carousel.slide1.cta": "Comprar ahora",
    "home.carousel.slide2.title": "Alivio natural",
    "home.carousel.slide2.subtitle": "Encuentre la solución CBD perfecta para sus necesidades de bienestar.",
    "home.carousel.slide2.cta": "Explorar",
    "home.carousel.slide3.title": "Calidad probada en laboratorio",
    "home.carousel.slide3.subtitle":
      "Todos nuestros productos son probados por laboratorios independientes para garantizar su pureza y potencia.",
    "home.carousel.slide3.cta": "Más información",
    "footer.information": "Información",
    "footer.about_us": "Sobre nosotros",
    "footer.privacy_policy": "Política de privacidad",
    "footer.terms_conditions": "Términos y condiciones",
    "footer.shipping_returns": "Envíos y devoluciones",
    "footer.contact_us": "Contáctenos",
    "footer.my_account": "Mi cuenta",
    "footer.my_profile": "Mi perfil",
    "footer.my_orders": "Mis pedidos",
    "footer.my_wishlist": "Mi lista de deseos",
    "footer.my_cart": "Mi carrito",
    "footer.account_settings": "Configuración de la cuenta",
    "footer.contact": "Contacto",
    "footer.quick_links": "Enlaces rápidos",
    "footer.for_vendors": "Para vendedores",
    "footer.email": "Correo electrónico",
    "footer.phone": "Teléfono",
    "footer.rights_reserved": "Todos los derechos reservados.",
    "social.recent_purchase": "acaba de comprar",
    "social.minutes_ago": "minutos",
    "social.seconds_ago": "segundos",
    "auth.username_or_email": "Nombre de usuario o Correo electrónico",
    "auth.username": "Nombre de usuario",
    "auth.username_available": "Nombre de usuario disponible",
    "auth.username_taken": "Este nombre de usuario ya está en uso",
    "auth.username_checking": "Comprobando disponibilidad del nombre de usuario...",
  },
}

// Define language flags
export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
}

// Define context type
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  availableLanguages: readonly string[]
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "de",
  setLanguage: () => {},
  t: (key) => key,
  availableLanguages: LANGUAGES,
  currency: "EUR",
  setCurrency: () => {},
  formatPrice: (price) => `€${price.toFixed(2)}`,
})

// Create provider
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("de")
  const [currency, setCurrency] = useState<Currency>("EUR")

  // Translation function
  function t(key: string): string {
    if (!key) return ""
    return TRANSLATIONS[language][key] || key
  }

  // Format price based on currency
  function formatPrice(price: number): string {
    const formatter = new Intl.NumberFormat(
      language === "en" ? "en-US" : language === "de" ? "de-DE" : language === "fr" ? "fr-FR" : "es-ES",
      {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )

    return formatter.format(price)
  }

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    availableLanguages: LANGUAGES,
    currency,
    setCurrency,
    formatPrice,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext)
}

