import Link from "next/link";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Posters" },
    { href: "/custom", label: "Custom Poster" },
    { href: "/products?category=cars", label: "Cars & Bikes" },
    { href: "/products?category=anime", label: "Anime" },
    { href: "/products?category=gaming", label: "Gaming" },
    { href: "/products?category=sports", label: "Sports" },
  ],
  help: [
    { href: "/track", label: "Track Order" },
    { href: "/faq", label: "FAQs" },
    { href: "/shipping", label: "Shipping Policy" },
    { href: "/contact", label: "Contact Us" },
    { href: "/about", label: "About Us" },
  ],
  legal: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg sm:text-xl font-black text-white mb-3 sm:mb-4">POSTTA</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Premium posters & wall art. Transform your space in minutes.
            </p>
            <a
              href="https://www.instagram.com/itnahithajotha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @itnahithajotha
            </a>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Shop</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs sm:text-sm hover:text-rose-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Help</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs sm:text-sm hover:text-rose-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Contact</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 9335748094
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} POSTTA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
