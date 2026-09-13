"use client";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { useState, useEffect } from "react";

const defaultRooms = [
  { id: 1, src: "/mockups/room-1.svg", title: "Car enthusiastSetup", desc: "16 A4 posters + 6 A6 cards" },
  { id: 2, src: "/mockups/room-2.svg", title: "Gaming Room Dark", desc: "20 A4 posters + 10 A6 cards" },
  { id: 3, src: "/mockups/room-3.svg", title: "Minimalist Bedroom", desc: "12 A4 posters + 8 A6 cards" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [sections, setSections] = useState([]);
  const [bannerSpeed, setBannerSpeed] = useState(30);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.data);
      })
      .catch(() => {});
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBanners(data.data || []);
          if (data.speed) setBannerSpeed(data.speed);
        }
      })
      .catch(() => {});
    fetch("/api/sections")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSections(data.data || []);
      })
      .catch(() => {});
  }, []);

  const bestSellers = products.filter((p) => ["cars", "anime", "gaming"].includes(p.category)).slice(0, 8);
  const newItems = products.slice(16, 24);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="text-center">
            <span className="inline-block bg-rose-100 text-rose-700 text-[10px] sm:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-3">200gsm Premium Quality</span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-3 sm:mb-5 leading-tight">
              Transform Your Wall<br /><span className="text-rose-600">in Minutes</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-600 mb-5 sm:mb-7 max-w-xl mx-auto px-4">
              Premium posters & collectible cards. Cars, Anime, Gaming, Sports & more. A6 cards from just <span className="font-bold text-rose-600">₹39</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <Link href="/products" className="bg-rose-600 text-white px-6 py-3 font-bold text-sm sm:text-base hover:bg-rose-700 transition-colors">Shop All Posters</Link>
              <Link href="/products?category=cars" className="bg-white text-gray-900 px-6 py-3 font-bold text-sm sm:text-base border-2 border-gray-200 hover:border-rose-300 transition-colors">Cars & Bikes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Poster Banner */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Link href="/custom" className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 group">
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase mb-2">New</span>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-1">Custom Poster</h2>
              <p className="text-xs sm:text-sm text-gray-400">Upload your photo → Choose size → We print & ship</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-black text-white text-lg">₹39</p>
                <p className="text-[10px] text-gray-400">Starting from</p>
              </div>
              <div className="w-10 h-10 bg-rose-600 flex items-center justify-center group-hover:bg-rose-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Marquee Combo Offers */}
      {banners.length > 0 && (
      <section className="bg-gray-900 overflow-hidden">
        <div className="flex items-center gap-4 py-3 sm:py-4" style={{ animation: `marquee ${bannerSpeed}s linear infinite` }}>
          {[...banners, ...banners, ...banners].map((b, i) => {
            const features = b.features || ["badge", "savings", "coupon"];
            const linkHref = b.product_ids?.length > 0 ? `/products?offer=${b.id}` : `/products?combo=${b.coupon_code}`;
            const bannerStyle = { color: b.text_color };
            if (b.shape === "gradient") bannerStyle.background = `linear-gradient(135deg, ${b.gradient_from || b.bg_color}, ${b.gradient_to || b.bg_color})`;
            else if (b.shape === "rounded") { bannerStyle.background = b.bg_color; bannerStyle.borderRadius = "12px"; }
            else if (b.shape === "pill") { bannerStyle.background = b.bg_color; bannerStyle.borderRadius = "999px"; }
            else if (b.shape === "shadow") { bannerStyle.background = b.bg_color; bannerStyle.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"; }
            else if (b.shape === "outlined") { bannerStyle.border = `2px solid ${b.text_color}`; bannerStyle.background = "transparent"; }
            else bannerStyle.background = b.bg_color;
            return (
              <Link key={i} href={linkHref} className="flex-shrink-0 text-white px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity" style={bannerStyle}>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs sm:text-sm whitespace-nowrap" style={{ color: b.text_color }}>{b.title}</p>
                  {features.includes("coupon") && b.coupon_code && <p className="text-[9px] font-mono opacity-60 whitespace-nowrap" style={{ color: b.text_color }}>{b.coupon_code}</p>}
                  <p className="text-[10px] sm:text-xs whitespace-nowrap" style={{ color: b.subtitle_color }}>+ {b.subtitle}</p>
                </div>
                {features.includes("price") && (
                  <div className="text-right shrink-0">
                    <p className="font-black text-base sm:text-lg whitespace-nowrap" style={{ color: b.text_color }}>₹{b.price}</p>
                    {features.includes("strikethrough") && b.original_price > 0 && <p className="text-[10px] sm:text-xs line-through whitespace-nowrap" style={{ color: b.text_color, opacity: 0.5 }}>₹{b.original_price}</p>}
                  </div>
                )}
                {features.includes("badge") && b.badge_text && <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 whitespace-nowrap shrink-0" style={{ background: b.badge_color, color: b.text_color }}>{b.badge_text}</span>}
              </Link>
            );
          })}
        </div>
        <style jsx>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
      </section>
      )}

      {/* Room Inspiration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">Room Inspiration</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">See how POSTTA transforms real rooms</p>
          </div>
          <span className="bg-rose-100 text-rose-700 text-[10px] sm:text-xs font-bold px-2 py-1 uppercase">Download & Inspo</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {(sections.length > 0 ? sections : defaultRooms).filter((s) => s.active !== false).map((room) => {
            const Wrapper = room.link ? Link : "div";
            const wrapperProps = room.link ? { href: room.link } : {};
            return (
              <Wrapper key={room.id} {...wrapperProps} className="group relative overflow-hidden border border-gray-200 bg-white">
                <div className="relative aspect-[3/2]">
                  {room.image_url || room.src ? (
                    <img src={room.image_url || room.src} alt={room.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center"><span className="text-3xl">🖼️</span></div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-bold text-sm sm:text-base text-gray-900">{room.title}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{room.desc || room.subtitle}</p>
                  {room.link ? (
                    <span className="inline-block mt-2 text-xs sm:text-sm font-bold text-rose-600 hover:underline">Shop This Look →</span>
                  ) : (
                    <Link href="/products" className="inline-block mt-2 text-xs sm:text-sm font-bold text-rose-600 hover:underline">Shop This Look →</Link>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">Best Sellers</h2>
            <Link href="/products" className="text-rose-600 font-semibold text-xs sm:text-sm hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Combo Offers Detail */}
      {banners.length > 0 && (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">Combo Offers</h2>
          <span className="bg-rose-100 text-rose-700 text-[10px] sm:text-xs font-bold px-2 py-1 uppercase">Save More</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {banners.map((b) => {
            const features = b.features || ["badge", "savings", "coupon"];
            const linkHref = b.product_ids?.length > 0 ? `/products?offer=${b.id}` : `/products?combo=${b.coupon_code}`;
            return (
              <div key={b.id} className="bg-gray-50 border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  {features.includes("badge") && b.badge_text && <span className="text-white text-[10px] font-bold px-2 py-0.5" style={{ background: b.bg_color }}>{b.badge_text}</span>}
                  {features.includes("coupon") && b.coupon_code && <span className="text-[10px] text-gray-400 font-mono">{b.coupon_code}</span>}
                </div>
                <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">{b.title}</p>
                <p className="text-xs sm:text-sm text-green-600 font-medium mb-3">+ {b.subtitle}</p>
                {features.includes("price") && (
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl sm:text-2xl font-black text-rose-600">₹{b.price}</span>
                    {features.includes("strikethrough") && b.original_price > 0 && <span className="text-sm line-through text-gray-400">₹{b.original_price}</span>}
                  </div>
                )}
                {b.product_ids?.length > 0 && <p className="text-[10px] text-gray-400 mb-2">{b.product_ids.length} products in this offer</p>}
                <Link href={linkHref} className="block w-full py-2 bg-rose-600 text-white font-bold text-xs sm:text-sm text-center hover:bg-rose-700 transition-colors">
                  {b.product_ids?.length > 0 ? "View Offer Products" : "Shop This Combo"}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* More Products */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">New Arrivals</h2>
            <Link href="/products" className="text-rose-600 font-semibold text-xs sm:text-sm hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {(newItems.length > 0 ? newItems : products.slice(0, 8)).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 sm:mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.id}`} className="bg-white border border-gray-200 p-3 text-center hover:shadow-md hover:border-rose-200 transition-all group">
                <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <p className="font-semibold text-xs sm:text-sm text-gray-900">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[{ icon: "🚚", title: "Free Shipping", desc: "On orders above ₹499" }, { icon: "💰", title: "COD Available", desc: "Cash on Delivery" }, { icon: "✨", title: "200gsm Quality", desc: "Thick & Shiny Paper" }, { icon: "⚡", title: "Fast Dispatch", desc: "Ships in 24-48 hours" }].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 flex items-center justify-center"><span className="text-xl sm:text-2xl">{badge.icon}</span></div>
                <div><p className="font-bold text-xs sm:text-sm text-gray-900">{badge.title}</p><p className="text-[10px] sm:text-xs text-gray-500">{badge.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rose-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4">Ready to Transform Your Wall?</h2>
          <p className="text-rose-100 text-sm sm:text-base mb-5 sm:mb-6 max-w-xl mx-auto px-4">Browse 80+ designs across Cars, Anime, Gaming, Sports & more.</p>
          <Link href="/products" className="inline-block bg-white text-rose-600 px-6 sm:px-8 py-3 font-bold text-sm sm:text-lg hover:bg-rose-50 transition-colors">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}
