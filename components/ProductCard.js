"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const categoryIcons = {
  cars: "🏎️",
  anime: "⚔️",
  gaming: "🎮",
  sports: "⚽",
  marvel: "🦸",
  dc: "🦇",
  movies: "🎬",
  music: "🎵",
  motivational: "💪",
  devotional: "🕉️",
};

export default function ProductCard({ product }) {
  const prices = product.prices || {};
  const priceValues = Object.values(prices);
  const lowestPrice = priceValues.length > 0 ? Math.min(...priceValues) : 29;
  const highestPrice = priceValues.length > 0 ? Math.max(...priceValues) : 179;
  const [imgError, setImgError] = useState(false);

  const hasImage = product.image_url && !imgError;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {hasImage ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <Image
              src={`/mockups/${product.category}.svg`}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          )}
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-1 uppercase tracking-wide flex items-center gap-1">
              <span>{categoryIcons[product.category]}</span>
              {product.category}
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-1">
              From ₹{lowestPrice}
            </span>
          </div>
          {product.badge && (
            <div className="absolute bottom-2 left-2">
              <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 uppercase">{product.badge}</span>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-2 capitalize">
            {product.subcategory?.replace(/-/g, " ")}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            {Object.entries(prices).map(([size, price]) => (
              <span key={size} className="text-[9px] sm:text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5">
                {size} ₹{price}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-400 mb-2">
            <span>200gsm</span>
            <span>•</span>
            <span>Shiny</span>
            <span>•</span>
            <span>Powder Print</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-base sm:text-lg font-black text-rose-600">₹{lowestPrice}</span>
              {lowestPrice !== highestPrice && (
                <span className="text-[10px] text-gray-400 ml-1">– ₹{highestPrice}</span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-green-600 font-medium bg-green-50 px-1.5 py-0.5">
              4 sizes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
