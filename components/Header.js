"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";
import { categories } from "@/data/products";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/custom", label: "Custom Poster" },
  { href: "/track", label: "Track Order" },
];

export default function Header() {
  const { totalItems, isLoaded } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-rose-600">POSTTA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs sm:text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
                {link.label}
              </Link>
            ))}
            {/* Categories Dropdown */}
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="text-xs sm:text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors flex items-center gap-1">
                Categories
                <svg className={`w-3 h-3 transition-transform ${catOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg w-56 py-2 z-50">
                  <Link href="/products" className="block px-4 py-2 text-xs sm:text-sm font-medium text-gray-900 hover:bg-rose-50 hover:text-rose-600">
                    All Posters
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/cart" className="relative flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Cart
              {isLoaded && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link href={user ? "/account" : "/login"} className="hidden sm:flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {user ? "Account" : "Login"}
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-1.5 text-gray-700">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-1"></div>
            <p className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase">Categories</p>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm font-medium text-gray-900 hover:bg-rose-50">
              All Posters
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600">
                <span>{cat.icon}</span>{cat.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-1"></div>
            <Link href={user ? "/account" : "/login"} onClick={() => setMenuOpen(false)} className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-rose-600 hover:bg-rose-50">
              {user ? "My Account" : "Login / Sign Up"}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
