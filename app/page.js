"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { useState, useEffect } from "react";

const defaultSections = [
  { id: "hero", type: "hero", title: "Transform Your Wall", subtitle: "in Minutes", bg: "", active: true },
  { id: "custom", type: "custom", title: "Custom Poster", subtitle: "Upload your photo → Choose size → We print & ship", bg: "", active: true },
  { id: "marquee", type: "marquee", title: "Buy 2 A3 Get 4 Posters FREE", subtitle: "Use code COMBO2A3", bg: "", bgColor: "#e11d48", textColor: "#ffffff", active: true },
  { id: "rooms", type: "rooms", title: "Room Inspiration", subtitle: "See how POSTTA transforms real rooms", bg: "", active: true },
  { id: "bestsellers", type: "products", title: "Best Sellers", subtitle: "Our most popular posters", filterType: "best", bg: "", active: true },
  { id: "combos", type: "combos", title: "Combo Offers", subtitle: "Save More", bg: "", active: true },
  { id: "newarrivals", type: "products", title: "New Arrivals", subtitle: "Fresh drops this week", filterType: "new", bg: "", active: true },
  { id: "categories", type: "categories", title: "Browse Categories", subtitle: "", bg: "", active: true },
  { id: "trust", type: "trust", title: "Why POSTTA", subtitle: "", bg: "", active: true },
  { id: "cta", type: "cta", title: "Ready to Transform Your Wall?", subtitle: "Browse 80+ designs across Cars, Anime, Gaming, Sports & more.", bg: "", active: true },
];

const defaultRooms = [
  { id: 1, src: "/mockups/room-1.svg", title: "Car Enthusiast Setup", desc: "16 A4 posters + 6 A6 cards" },
  { id: 2, src: "/mockups/room-2.svg", title: "Gaming Room Dark", desc: "20 A4 posters + 10 A6 cards" },
  { id: 3, src: "/mockups/room-3.svg", title: "Minimalist Bedroom", desc: "12 A4 posters + 8 A6 cards" },
];

function HeroSection({ sec }) {
  return (
    <section className="relative" style={sec.bg ? { background: `url(${sec.bg}) center/cover no-repeat` } : { background: "linear-gradient(135deg, #fff1f2, #ffffff, #fff7ed)" }}>
      {sec.bg && <div className="absolute inset-0 bg-black/40" />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10">
        <div className="text-center">
          <span className="inline-block bg-rose-100/90 text-rose-700 text-[10px] sm:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-3">200gsm Premium Quality</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-3 sm:mb-5 leading-tight" style={sec.bg ? { color: "#fff" } : {}}>
            {sec.title}<br />
            <span className="text-rose-600">{sec.subtitle}</span>
          </h1>
          <p className="text-sm sm:text-lg mb-5 sm:mb-7 max-w-xl mx-auto px-4" style={sec.bg ? { color: "#ddd" } : { color: "#666" }}>
            Premium posters & collectible cards. Cars, Anime, Gaming, Sports & more. A6 cards from just <span className="font-bold text-rose-400">₹39</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <Link href="/products" className="bg-rose-600 text-white px-6 py-3 font-bold text-sm sm:text-base hover:bg-rose-700 transition-colors">Shop All Posters</Link>
            <Link href="/products?category=cars" className="bg-white text-gray-900 px-6 py-3 font-bold text-sm sm:text-base border-2 border-gray-200 hover:border-rose-300 transition-colors">Cars & Bikes</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomSection({ sec }) {
  return (
    <section className="bg-gray-900 relative" style={sec.bg ? { background: `url(${sec.bg}) center/cover` } : {}}>
      {sec.bg && <div className="absolute inset-0 bg-black/50" />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        <Link href="/custom" className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 group">
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase mb-2">New</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-1">{sec.title}</h2>
            <p className="text-xs sm:text-sm text-gray-400">{sec.subtitle}</p>
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
  );
}

function MarqueeSection({ sec }) {
  return (
    <section className="relative overflow-hidden" style={{ background: sec.bg ? `url(${sec.bg}) center/cover` : sec.bgColor || "#e11d48" }}>
      {sec.bg && <div className="absolute inset-0 bg-black/30" />}
      <div className="relative z-10 py-2 px-4 text-center">
        <p className="text-sm sm:text-base font-bold whitespace-nowrap" style={{ color: sec.textColor || "#fff" }}>
          {sec.title} — {sec.subtitle}
        </p>
      </div>
    </section>
  );
}

function RoomsSection({ sec, sections }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">{sec.title}</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{sec.subtitle}</p>
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
  );
}

function ProductsSection({ sec, products }) {
  const items = sec.filterType === "best"
    ? products.filter((p) => ["cars", "anime", "gaming"].includes(p.category)).slice(0, 8)
    : sec.filterType === "new"
      ? products.slice(16, 24)
      : products.slice(0, 8);
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12" style={sec.bg ? { background: `url(${sec.bg}) center/cover`, borderRadius: "12px" } : {}}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">{sec.title}</h2>
          <Link href="/products" className="text-rose-600 font-semibold text-xs sm:text-sm hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {(items.length > 0 ? items : products.slice(0, 8)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CombosSection({ sec, banners }) {
  if (!banners || banners.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900">{sec.title}</h2>
        <span className="bg-rose-100 text-rose-700 text-[10px] sm:text-xs font-bold px-2 py-1 uppercase">{sec.subtitle}</span>
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
  );
}

function CategoriesSection({ sec }) {
  return (
    <section className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10" style={sec.bg ? { background: `url(${sec.bg}) center/cover` } : {}}>
        <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-4 sm:mb-6">{sec.title}</h2>
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
  );
}

function TrustSection({ sec }) {
  const badges = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders above ₹499" },
    { icon: "💰", title: "COD Available", desc: "Cash on Delivery" },
    { icon: "✨", title: "200gsm Quality", desc: "Thick & Shiny Paper" },
    { icon: "⚡", title: "Fast Dispatch", desc: "Ships in 24-48 hours" },
  ];
  return (
    <section className="border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10" style={sec.bg ? { background: `url(${sec.bg}) center/cover` } : {}}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 flex items-center justify-center"><span className="text-xl sm:text-2xl">{badge.icon}</span></div>
              <div><p className="font-bold text-xs sm:text-sm text-gray-900">{badge.title}</p><p className="text-[10px] sm:text-xs text-gray-500">{badge.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ sec }) {
  return (
    <section className="relative" style={sec.bg ? { background: `url(${sec.bg}) center/cover` } : { background: "#e11d48" }}>
      {sec.bg && <div className="absolute inset-0 bg-rose-600/80" />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3 sm:mb-4">{sec.title}</h2>
        <p className="text-rose-100 text-sm sm:text-base mb-5 sm:mb-6 max-w-xl mx-auto px-4">{sec.subtitle}</p>
        <Link href="/products" className="inline-block bg-white text-rose-600 px-6 sm:px-8 py-3 font-bold text-sm sm:text-lg hover:bg-rose-50 transition-colors">Shop Now</Link>
      </div>
    </section>
  );
}

const sectionComponents = {
  hero: HeroSection,
  custom: CustomSection,
  marquee: MarqueeSection,
  rooms: RoomsSection,
  products: ProductsSection,
  combos: CombosSection,
  categories: CategoriesSection,
  trust: TrustSection,
  cta: CtaSection,
  footer: null,
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [sections, setSections] = useState([]);
  const [bannerSpeed, setBannerSpeed] = useState(30);
  const [pageSections, setPageSections] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => { if (data.success) setProducts(data.data); })
      .catch(() => {});
    fetch("/api/banners")
      .then((res) => res.json())
      .then((data) => { if (data.success) { setBanners(data.data || []); if (data.speed) setBannerSpeed(data.speed); } })
      .catch(() => {});
    fetch("/api/sections")
      .then((res) => res.json())
      .then((data) => { if (data.success) setSections(data.data || []); })
      .catch(() => {});
    fetch("/api/settings?key=homepage")
      .then((res) => res.json())
      .then((data) => { if (data.success && data.data?.pageSections) setPageSections(data.data.pageSections); })
      .catch(() => {});
  }, []);

  const activeSections = (pageSections || defaultSections).filter((s) => s.active !== false);

  return (
    <div>
      {activeSections.map((sec) => {
        if (sec.type === "marquee" && banners.length === 0) return null;
        if (sec.type === "combos" && banners.length === 0) return null;
        if (sec.type === "footer") return null;
        const Comp = sectionComponents[sec.type];
        if (!Comp) return null;
        return <Comp key={sec.id} sec={sec} products={products} banners={banners} sections={sections} bannerSpeed={bannerSpeed} />;
      })}

      {activeSections.some((s) => s.type === "marquee") && banners.length > 0 && (
        <style jsx>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
      )}
    </div>
  );
}
