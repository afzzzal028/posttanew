"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";

const defaultSizes = {
  A6: { label: "A6 Card", dimensions: "10.5 \u00D7 14.8 cm" },
  A5: { label: "A5 Poster", dimensions: "14.8 \u00D7 21 cm" },
  A4: { label: "A4 Poster", dimensions: "21 \u00D7 29.7 cm" },
  A3: { label: "A3 Poster", dimensions: "29.7 \u00D7 42 cm" },
};

const sizeGuide = {
  A6: { cm: "10.5 \u00D7 14.8", use: "Collectible cards, desk display" },
  A5: { cm: "14.8 \u00D7 21", use: "Small wall art, gift" },
  A4: { cm: "21 \u00D7 29.7", use: "Most popular, desk/wall" },
  A3: { cm: "29.7 \u00D7 42", use: "Statement piece, large wall" },
};

const specs = [
  { icon: "\uD83D\uDCC4", text: "200 GSM Premium Paper" },
  { icon: "\u2728", text: "Powder Finish (Shiny & Glossy)" },
  { icon: "\u26A1", text: "Dispatch in 24\u201348 hours" },
  { icon: "\uD83D\uDE9A", text: "Free shipping above \u20B9499" },
  { icon: "\uD83D\uDCB5", text: "COD available" },
];

const whatYouGet = [
  "1\u00D7 poster in selected size",
  "200 GSM premium print",
  "Secure rigid packaging",
];

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("A4");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`/api/products?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => { if (data.success) setProduct(data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 w-48 mx-auto" /><div className="h-64 bg-gray-200 max-w-md mx-auto" />
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <Link href="/products" className="text-rose-600 font-semibold hover:underline">&larr; Back to Shop</Link>
    </div>
  );

  const prices = product.prices || { A6: 22, A5: 59, A4: 99, A3: 149 };
  const currentPrice = prices[selectedSize] || 22;
  const allImages = [product.image_url, ...(product.image_urls || [])].filter(Boolean);
  const currentImg = allImages[selectedImage] || allImages[0];
  const hasImage = currentImg && !imgError;

  function handleAddToCart() {
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    addToCart(product, selectedSize, quantity);
    window.location.href = "/checkout";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-8">
      <Link href="/products" className="text-sm text-rose-600 hover:underline mb-4 inline-block">&larr; Back to Shop</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
            {hasImage ? (
              <img src={currentImg} alt={product.name} className="w-full h-full object-contain" onError={() => setImgError(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">{"\uD83D\uDDBC\uFE0F"}</div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-2">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => { setSelectedImage(i); setImgError(false); }}
                  className={`w-16 h-16 border-2 overflow-hidden ${selectedImage === i ? "border-rose-500" : "border-gray-200 hover:border-gray-400"}`}>
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* SEE IT ON A WALL */}
          <div className="mt-4 bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-bold text-gray-900 uppercase mb-2">See It On A Wall</p>
            <div className="aspect-video bg-gray-200 rounded overflow-hidden flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
              <div className="relative text-center">
                <p className="text-4xl mb-2">{"\uD83D\uDDBC\uFE0F"}</p>
                <p className="text-[10px] text-gray-300">Your poster here</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">Mockup: how it looks in a real room</p>
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-gray-100 px-2 py-0.5 uppercase font-medium text-gray-600">{product.category}</span>
            {product.badge && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 font-bold">{product.badge}</span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{product.name}</h1>
          {product.subcategory && <p className="text-sm text-gray-500 mb-4 capitalize">{product.subcategory.replace(/-/g, " ")}</p>}

          {/* Selected size price */}
          <div className="bg-gray-50 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{selectedSize} &mdash; {defaultSizes[selectedSize]?.dimensions}</p>
                <p className="text-3xl font-black text-rose-600">{"\u20B9"}{currentPrice}</p>
              </div>
              <div className="text-right space-y-0.5">
                {specs.map((s, i) => (
                  <p key={i} className="text-[10px] text-gray-600">{s.icon} {s.text}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 uppercase mb-2">Select Size</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(defaultSizes).map(([key, size]) => (
                <button key={key} onClick={() => setSelectedSize(key)}
                  className={`p-3 border text-left transition-colors ${selectedSize === key ? "border-rose-500 bg-rose-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <p className="font-bold text-sm">{size.label}</p>
                  <p className="text-[10px] text-gray-500">{size.dimensions}</p>
                  <p className="font-black text-rose-600 mt-1">{"\u20B9"}{prices[key] || 22}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 uppercase mb-2">Quantity</p>
            <div className="flex items-center border border-gray-200 w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">&minus;</button>
              <span className="w-12 h-10 flex items-center justify-center font-bold border-x border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-4">
            <button onClick={handleAddToCart}
              className={`flex-1 py-3 font-bold text-sm border-2 transition-colors ${added ? "border-green-500 bg-green-50 text-green-700" : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}>
              {added ? "\u2713 Added!" : "Add to Cart"}
            </button>
            <button onClick={handleBuyNow}
              className="flex-1 py-3 bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors">
              Buy via Instagram
            </button>
          </div>

          {/* WHAT YOU GET */}
          <div className="bg-gray-50 border border-gray-200 p-4 mb-4">
            <p className="text-xs font-bold text-gray-900 uppercase mb-2">What You Get</p>
            <ul className="space-y-1">
              {whatYouGet.map((item, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="text-green-500 font-bold">{"\u2713"}</span> {item}
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-gray-400 mt-2">Frame is NOT included.</p>
          </div>

          {/* Free shipping bar */}
          {currentPrice * quantity < 499 ? (
            <div className="bg-amber-50 border border-amber-200 p-2.5 mb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold text-amber-800">Add {"\u20B9"}{499 - currentPrice * quantity} more for FREE SHIPPING</p>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(((currentPrice * quantity) / 499) * 100, 100)}%` }} />
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-2.5 mb-4 text-center">
              <p className="text-[10px] font-bold text-green-700">FREE SHIPPING UNLOCKED</p>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Combo Offers */}
      <div className="mt-10 mb-10">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">Bundle &amp; Save</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { buy: "3 A4 Posters", price: 249, original: 297, save: 48 },
            { buy: "5 A4 Posters", price: 399, original: 495, save: 96 },
            { buy: "10 A4 Posters", price: 699, original: 990, save: 291 },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <p className="text-sm font-bold text-gray-900 mb-1">{c.buy}</p>
              <p className="text-xl font-black text-rose-600">{"\u20B9"}{c.price}</p>
              <p className="text-[10px] text-gray-400 line-through">{"\u20B9"}{c.original}</p>
              <p className="text-[10px] font-bold text-green-600 mb-2">SAVE {"\u20B9"}{c.save}</p>
              <Link href="/products" className="block w-full py-2 bg-gray-900 text-white font-bold text-xs text-center hover:bg-rose-600 transition-colors">Mix &amp; Match &rarr;</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Size Guide */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-10">
        <h2 className="text-lg font-black text-gray-900 mb-3">Size Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-bold text-gray-900">Size</th>
                <th className="text-left py-2 px-3 font-bold text-gray-900">Dimensions</th>
                <th className="text-left py-2 px-3 font-bold text-gray-900 hidden sm:table-cell">Best For</th>
                <th className="text-right py-2 px-3 font-bold text-gray-900">Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(defaultSizes).map(([key, size]) => (
                <tr key={key} className={`border-b border-gray-100 ${selectedSize === key ? "bg-rose-50" : ""}`}>
                  <td className="py-2 px-3 font-medium">{size.label}</td>
                  <td className="py-2 px-3 text-gray-600">{sizeGuide[key].cm} cm</td>
                  <td className="py-2 px-3 text-gray-600 hidden sm:table-cell">{sizeGuide[key].use}</td>
                  <td className="py-2 px-3 text-right font-bold text-rose-600">{"\u20B9"}{prices[key] || 22}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
