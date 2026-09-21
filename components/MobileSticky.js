"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MobileSticky({ product, selectedSize, prices }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 300);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  const price = prices?.[selectedSize] || 22;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-3 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[10px] text-gray-500">{selectedSize}</p>
          <p className="text-lg font-black text-rose-600">{"\u20B9"}{price}</p>
        </div>
        <button className="flex-1 bg-rose-600 text-white py-3 font-bold text-sm hover:bg-rose-700 transition-colors text-center">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export function MobileStickyNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-2 px-4 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around">
        <Link href="/" className="flex flex-col items-center gap-0.5">
          <span className="text-lg">{"\uD83C\uDFE0"}</span>
          <span className="text-[8px] font-bold text-gray-600">Home</span>
        </Link>
        <Link href="/products" className="flex flex-col items-center gap-0.5">
          <span className="text-lg">{"\uD83D\uDDD2\uFE0F"}</span>
          <span className="text-[8px] font-bold text-gray-600">Shop</span>
        </Link>
        <Link href="/products?category=anime" className="flex flex-col items-center gap-0.5">
          <span className="text-lg">{"\u2694\uFE0F"}</span>
          <span className="text-[8px] font-bold text-gray-600">Anime</span>
        </Link>
        <Link href="/cart" className="flex flex-col items-center gap-0.5 relative">
          <span className="text-lg">{"\uD83D\uDED2"}</span>
          <span className="text-[8px] font-bold text-gray-600">Cart</span>
        </Link>
        <Link href="/custom" className="flex flex-col items-center gap-0.5">
          <span className="text-lg">{"\uD83C\uDFA8"}</span>
          <span className="text-[8px] font-bold text-gray-600">Custom</span>
        </Link>
      </div>
    </div>
  );
}
