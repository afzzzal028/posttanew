"use client";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { useState, useEffect } from "react";

const bundles = [
  { label: "3 A4 Posters", price: 249, original: 297, count: 3, size: "A4" },
  { label: "5 A4 Posters", price: 399, original: 495, count: 5, size: "A4" },
  { label: "10 A4 Posters", price: 699, original: 990, count: 10, size: "A4" },
  { label: "5+1 FREE A5", price: 250, original: 354, count: 6, size: "A5" },
];

const roomWalls = [
  { id: "football", title: "Football Wall", count: 6, price: 399, icon: "\u26BD", gradient: "#16a34a, #166534" },
  { id: "f1", title: "F1 Wall", count: 5, price: 349, icon: "\uD83C\uDFCE\uFE0F", gradient: "#dc2626, #991b1b" },
  { id: "cars", title: "Cars Wall", count: 5, price: 349, icon: "\uD83D\uDE97", gradient: "#374151, #111827" },
  { id: "anime", title: "Anime Wall", count: 6, price: 399, icon: "\u26E9\uFE0F", gradient: "#ea580c, #dc2626" },
  { id: "gaming", title: "Gaming Wall", count: 5, price: 349, icon: "\uD83C\uDFAE", gradient: "#9333ea, #4338ca" },
  { id: "movies", title: "Movies Wall", count: 5, price: 349, icon: "\uD83C\uDFAC", gradient: "#ca8a04, #92400e" },
];

const customerReviews = [
  { name: "Arjun M.", city: "Mumbai", text: "Bought the football wall pack. Ronaldo + Messi + Dhoni looks insane together. Paper quality is thick and glossy.", rating: 5 },
  { name: "Priya S.", city: "Delhi", text: "Anime wall is fire. Gojo + Naruto + Luffy. My friends think I got them printed professionally.", rating: 5 },
  { name: "Karthik R.", city: "Bangalore", text: "Custom poster of my dog came out amazing. 200 GSM paper is no joke, feels premium. Will order again.", rating: 5 },
  { name: "Sneha K.", city: "Pune", text: "Bought car posters for my brother's room. He loved it. The A4 size is perfect, not too big not too small.", rating: 4 },
];

const trustItems = [
  { icon: "\uD83D\uDCC4", text: "200 GSM Paper" },
  { icon: "\uD83D\uDCE6", text: "COD Available" },
  { icon: "\u26A1", text: "24-48H Dispatch" },
  { icon: "\uD83D\uDE9A", text: "Free Shipping 499+" },
  { icon: "\uD83D\uDD04", text: "Replacement for Damage" },
];

const heroCategories = ["Anime", "Football", "F1", "Cars", "Gaming", "Movies", "Music"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [banners, setBanners] = useState([]);
  const [bannerSpeed, setBannerSpeed] = useState(30);

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then((d) => {
      if (!d.success) return;
      const all = d.data || [];
      setProducts(all);
      setBestSellers(all.filter((p) => ["cars", "anime", "gaming"].includes(p.category)).slice(0, 8));
      setNewItems(all.slice(0, 8));
    }).catch(() => {});
    fetch("/api/banners").then((r) => r.json()).then((d) => {
      if (d.success) { setBanners(d.data || []); if (d.speed) setBannerSpeed(d.speed); }
    }).catch(() => {});
  }, []);

  const savingsPct = (o, p) => Math.round(((o - p) / o) * 100);

  return (
    <div className="pb-20 sm:pb-0">
      {/* HERO */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #e11d48 0%, transparent 50%), radial-gradient(circle at 70% 50%, #f97316 0%, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-3 tracking-tight leading-none">
              YOUR WALL.<br /><span className="text-rose-500">YOUR WORLD.</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-300 mb-5 max-w-xl mx-auto">Posters for the things you actually love.</p>
            <p className="text-xs sm:text-sm text-gray-500 mb-5 font-medium">Football &middot; F1 &middot; Anime &middot; Cars &middot; Gaming &middot; Movies</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 text-white">
              <div className="text-center"><p className="text-xl sm:text-2xl font-black">22</p><p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">A6 From</p></div>
              <div className="text-center"><p className="text-xl sm:text-2xl font-black">99</p><p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">A4 From</p></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="bg-rose-600 text-white px-8 py-3.5 font-bold text-sm sm:text-base hover:bg-rose-700 transition-colors text-center">SHOP POSTERS &rarr;</Link>
              <Link href="/custom" className="bg-white/10 text-white px-8 py-3.5 font-bold text-sm sm:text-base border border-white/20 hover:bg-white/20 transition-colors text-center">MAKE YOUR OWN</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-white/5 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
              {trustItems.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm">{t.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-wider">{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM POSTER BANNER */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <Link href="/custom" className="flex flex-col sm:flex-row items-center justify-between gap-3 group">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 uppercase">New</span>
              <div>
                <p className="text-sm font-black text-white">Custom Poster</p>
                <p className="text-[10px] text-gray-400">Upload photo &rarr; Choose size &rarr; We print &amp; ship</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-black text-white text-base">22</p>
              <div className="w-8 h-8 bg-rose-600 flex items-center justify-center group-hover:bg-rose-700 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* MARQUEE */}
      {banners.length > 0 && (
        <section className="bg-gray-900 border-t border-white/5 overflow-hidden">
          <div className="flex items-center gap-4 py-3" style={{ animation: `marquee ${bannerSpeed}s linear infinite` }}>
            {[...banners, ...banners, ...banners].map((b, i) => {
              const features = b.features || ["badge", "savings", "coupon"];
              const linkHref = b.product_ids?.length > 0 ? `/products?offer=${b.id}` : `/products?combo=${b.coupon_code}`;
              return (
                <Link key={i} href={linkHref} className="flex-shrink-0 text-white px-5 py-2 flex items-center gap-3 hover:opacity-90 transition-opacity" style={{ background: b.bg_color, color: b.text_color }}>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs whitespace-nowrap">{b.title}</p>
                    {features.includes("coupon") && b.coupon_code && <p className="text-[9px] font-mono opacity-60 whitespace-nowrap">{b.coupon_code}</p>}
                    <p className="text-[10px] whitespace-nowrap" style={{ color: b.subtitle_color }}>+ {b.subtitle}</p>
                  </div>
                  {features.includes("price") && (
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm whitespace-nowrap">{b.price}</p>
                      {features.includes("strikethrough") && b.original_price > 0 && <p className="text-[10px] line-through whitespace-nowrap opacity-50">{b.original_price}</p>}
                    </div>
                  )}
                  {features.includes("badge") && b.badge_text && <span className="text-[9px] font-bold px-2 py-0.5 whitespace-nowrap shrink-0" style={{ background: b.badge_color }}>{b.badge_text}</span>}
                </Link>
              );
            })}
          </div>
          <style jsx>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }`}</style>
        </section>
      )}

      {/* BUILD YOUR WALL */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">BUILD YOUR WALL</h2>
            <p className="text-sm text-gray-500">Pick your favourites. Mix &amp; match any designs.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {bundles.map((b) => (
              <div key={b.label} className="group bg-gray-50 border border-gray-200 p-5 text-center hover:border-rose-300 hover:shadow-md transition-all flex flex-col">
                <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mb-1">{b.label}</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900 mb-1">{"\u20B9"}{b.price}</p>
                <p className="text-[10px] text-gray-400 line-through mb-1">{"\u20B9"}{b.original}</p>
                <p className="text-[10px] font-bold text-green-600 mb-3">SAVE {"\u20B9"}{b.original - b.price}</p>
                <div className="mt-auto">
                  <button onClick={() => {
                    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                    cart.push({ id: `bundle-${b.label}`, name: b.label, size: b.size, price: b.price, quantity: 1, image_url: "/mockups/cars.svg", category: "bundle" });
                    localStorage.setItem("cart", JSON.stringify(cart));
                    window.dispatchEvent(new Event("cart-updated"));
                  }} className="w-full bg-gray-900 text-white py-2.5 text-xs font-bold group-hover:bg-rose-600 transition-colors">ADD TO CART &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.id}`} className="bg-white border border-gray-200 p-3 sm:p-4 text-center hover:shadow-md hover:border-rose-300 transition-all group">
              <span className="text-2xl sm:text-3xl block mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <p className="font-bold text-[10px] sm:text-xs text-gray-900">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">BEST SELLERS</h2>
            <Link href="/products" className="text-rose-600 font-bold text-xs sm:text-sm hover:underline">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SEE IT ON A WALL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">SEE IT ON A WALL</h2>
        <p className="text-sm text-gray-500 mb-6">Build complete walls. Pick a theme, get the look.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {roomWalls.map((w) => (
            <Link key={w.id} href={`/products?category=${w.id}`} className="group relative overflow-hidden aspect-[3/4] flex flex-col justify-end p-4" style={{ background: `linear-gradient(135deg, ${w.gradient})` }}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <div className="relative z-10 text-center">
                <span className="text-3xl mb-2 block">{w.icon}</span>
                <p className="text-white font-bold text-sm">{w.title}</p>
                <p className="text-white/70 text-[10px]">{w.count} posters &mdash; {"\u20B9"}{w.price}</p>
                <span className="inline-block mt-2 text-white text-[10px] font-bold border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">SHOP THIS WALL &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMBO OFFERS */}
      {banners.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">COMBO OFFERS</h2>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 uppercase">Save More</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {banners.map((b) => {
                const features = b.features || ["badge", "savings", "coupon"];
                const linkHref = b.product_ids?.length > 0 ? `/products?offer=${b.id}` : `/products?combo=${b.coupon_code}`;
                return (
                  <div key={b.id} className="bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      {features.includes("badge") && b.badge_text && <span className="text-white text-[10px] font-bold px-2 py-0.5" style={{ background: b.bg_color }}>{b.badge_text}</span>}
                      {features.includes("coupon") && b.coupon_code && <span className="text-[10px] text-gray-400 font-mono">{b.coupon_code}</span>}
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{b.title}</p>
                    <p className="text-xs text-green-600 font-medium mb-3">+ {b.subtitle}</p>
                    {features.includes("price") && (
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-black text-rose-600">{"\u20B9"}{b.price}</span>
                        {features.includes("strikethrough") && b.original_price > 0 && <span className="text-sm line-through text-gray-400">{"\u20B9"}{b.original_price}</span>}
                      </div>
                    )}
                    <Link href={linkHref} className="block w-full py-2 bg-rose-600 text-white font-bold text-xs text-center hover:bg-rose-700 transition-colors">
                      {b.product_ids?.length > 0 ? "View Offer Products" : "Shop This Combo"}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* NEW RELEASES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">NEW RELEASES</h2>
          <Link href="/products" className="text-rose-600 font-bold text-xs sm:text-sm hover:underline">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {newItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* REAL WALLS. REAL POSTTA. */}
      <section className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 text-center">REAL WALLS. REAL POSTTA.</h2>
          <p className="text-sm text-gray-400 mb-8 text-center">See what our customers have built.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerReviews.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className={`text-xs ${j < r.rating ? "text-yellow-400" : "text-gray-600"}`}>&#9733;</span>
                  ))}
                </div>
                <p className="text-xs text-gray-300 mb-3 leading-relaxed">{r.text}</p>
                <p className="text-xs font-bold text-white">{r.name}</p>
                <p className="text-[10px] text-gray-500">{r.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FROM @POSTTA.IN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 text-center">FROM @POSTTA.IN</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Follow us for new drops, customer walls &amp; behind the scenes.</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {["Reel Screenshot", "Customer Wall", "Poster Close-up", "Packaging", "Room Mockup", "New Collection"].map((label, i) => (
            <div key={i} className="aspect-square bg-gray-100 border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
              <span className="text-[9px] text-gray-400 font-bold text-center px-1">{label}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="https://www.instagram.com/postta.in/" target="_blank" rel="noopener noreferrer" className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity">FOLLOW POSTTA &rarr;</a>
        </div>
      </section>

      {/* WHY POSTTA */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 text-center">WHY POSTTA?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: "\uD83C\uDFAF", text: "Curated Collections", sub: "Designs around things you love" },
              { icon: "\uD83D\uDD17", text: "Mix & Match", sub: "Build your own combination" },
              { icon: "\uD83D\uDDBC\uFE0F", text: "See It On Your Wall", sub: "Room-inspired setups" },
              { icon: "\uD83C\uDFA8", text: "Custom Printing", sub: "Your image becomes wall art" },
              { icon: "\uD83D\uDCE6", text: "Careful Packaging", sub: "Designed to arrive safely" },
            ].map((item, i) => (
              <div key={i} className="text-center p-3">
                <span className="text-2xl sm:text-3xl block mb-1">{item.icon}</span>
                <p className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5">{item.text}</p>
                <p className="text-[9px] text-gray-500">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAKE YOUR OWN POSTER */}
      <section className="bg-rose-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">MAKE YOUR OWN POSTER</h2>
          <p className="text-rose-100 text-sm sm:text-base mb-2">Upload any image. Choose your size. We print &amp; ship in 24-48 hours.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 text-white/80 text-xs sm:text-sm">
            <span>1. Upload</span><span>&rarr;</span>
            <span>2. Choose Size</span><span>&rarr;</span>
            <span>3. Preview</span><span>&rarr;</span>
            <span>4. Add to Cart</span><span>&rarr;</span>
            <span>5. Checkout</span>
          </div>
          <Link href="/custom" className="inline-block bg-white text-rose-600 px-8 py-3.5 font-bold text-sm sm:text-base hover:bg-rose-50 transition-colors">CREATE NOW &rarr;</Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-3">FOUND YOURS?</h2>
          <p className="text-gray-400 text-sm sm:text-base mb-5 max-w-xl mx-auto px-4">Pick your favourites. Build your wall.</p>
          <Link href="/products" className="inline-block bg-rose-600 text-white px-8 py-3.5 font-bold text-sm sm:text-base hover:bg-rose-700 transition-colors">SHOP THE COLLECTION &rarr;</Link>
        </div>
      </section>
    </div>
  );
}
