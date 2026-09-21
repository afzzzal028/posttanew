"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const categoryIcons = {
  cars: "\uD83C\uDFCE\uFE0F", anime: "\u2694\uFE0F", gaming: "\uD83C\uDFAE", sports: "\u26BD",
  marvel: "\uD83E\uDDDB", dc: "\uD83E\uDD87", movies: "\uD83C\uDFAC", music: "\uD83C\uDFB5",
  motivational: "\uD83D\uDCAA", islamic: "\uD83D\uDD4C",
};

const sizePriority = ["A4", "A3", "A5", "A6"];

export default function ProductCard({ product }) {
  const prices = product.prices || {};
  const priceValues = Object.values(prices);
  const lowestPrice = priceValues.length > 0 ? Math.min(...priceValues) : 22;
  const [imgError, setImgError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    sizePriority.find((s) => prices[s]) || Object.keys(prices)[0] || "A4"
  );
  const [added, setAdded] = useState(false);

  const hasImage = product.image_url && !imgError;

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id && item.size === selectedSize);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        size: selectedSize,
        price: prices[selectedSize] || lowestPrice,
        image_url: product.image_url || `/mockups/${product.category}.svg`,
        quantity: 1,
        category: product.category,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {hasImage ? (
            <img src={product.image_url} alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)} />
          ) : (
            <Image src={`/mockups/${product.category}.svg`} alt={product.name} fill
              className="object-contain group-hover:scale-105 transition-transform duration-500" unoptimized />
          )}
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-1 uppercase tracking-wide flex items-center gap-1">
              <span>{categoryIcons[product.category]}</span>{product.category}
            </span>
          </div>
          {product.badge && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 uppercase">{product.badge}</span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-bold text-gray-900 text-xs mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-[10px] text-gray-500 mb-2 capitalize">{product.subcategory?.replace(/-/g, " ")}</p>

          {/* Price display: A4 prominent */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-black text-rose-600">{"\u20B9"}{prices.A4 || lowestPrice}</span>
            <span className="text-[10px] text-gray-400 font-bold">A4</span>
            {prices.A3 && <span className="text-[10px] text-gray-400">| {"\u20B9"}{prices.A3} A3</span>}
          </div>

          {/* Size selector */}
          <div className="flex gap-1 mb-2">
            {Object.entries(prices).map(([size, price]) => (
              <button key={size}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(size); }}
                className={`text-[9px] font-bold px-2 py-1 border transition-colors ${
                  selectedSize === size
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}>
                {size}
              </button>
            ))}
          </div>

          {/* Quick add */}
          <button onClick={handleQuickAdd}
            className={`w-full py-2 text-[10px] font-bold transition-colors ${
              added
                ? "bg-green-500 text-white"
                : "bg-gray-900 text-white hover:bg-rose-600"
            }`}>
            {added ? "ADDED!" : `ADD TO CART \u2014 ${"\u20B9"}${prices[selectedSize] || lowestPrice}`}
          </button>
        </div>
      </div>
    </Link>
  );
}
