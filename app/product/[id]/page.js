"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";

const defaultSizes = {
  A6: { label: "A6 Card", dimensions: "10.5 × 14.8 cm" },
  A5: { label: "A5 Poster", dimensions: "14.8 × 21 cm" },
  A4: { label: "A4 Poster", dimensions: "21 × 29.7 cm" },
  A3: { label: "A3 Poster", dimensions: "29.7 × 42 cm" },
};

const sizeGuide = {
  A6: { cm: "10.5 × 14.8", use: "Collectible cards, desk display" },
  A5: { cm: "14.8 × 21", use: "Small wall art, gift" },
  A4: { cm: "21 × 29.7", use: "Most popular, desk/wall" },
  A3: { cm: "29.7 × 42", use: "Statement piece, large wall" },
};

const comboOffers = [
  { buy: "2× A3 Poster", get: "1× A4 + 2× A6 Cards + 1× Mystery Poster FREE", price: 358, original: 497, savings: 139 },
  { buy: "3× A4 Poster", get: "1× A5 + 3× A6 Cards + 1× Mystery Poster FREE", price: 387, original: 574, savings: 187 },
  { buy: "5× A4 Poster", get: "2× A5 + 5× A6 Cards + 1× Mystery Poster FREE", price: 645, original: 961, savings: 316 },
];

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("A6");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`/api/products?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProduct(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 w-48 mx-auto"></div>
          <div className="h-64 bg-gray-200 max-w-md mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link href="/products" className="text-rose-600 font-semibold hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  const prices = product.prices || { A6: 29, A5: 79, A4: 129, A3: 179 };
  const currentPrice = prices[selectedSize] || 29;
  const allImages = [product.image_url, ...(product.image_urls || [])].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <Link href="/products" className="text-sm text-rose-600 hover:underline mb-4 inline-block">← Back to Shop</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
            {hasImage ? (
              <img src={currentImg} alt={product.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">🖼️</div>
            )}
          </div>
          {hasMultipleImages && (
            <div className="flex gap-2 mt-2">
              {allImages.map((img, i) => (
                <button key={i} onClick={() => { setSelectedImage(i); setImgError(false); }}
                  className={`w-16 h-16 border-2 overflow-hidden ${selectedImage === i ? "border-rose-500" : "border-gray-200 hover:border-gray-400"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-gray-100 px-2 py-0.5 uppercase font-medium text-gray-600">{product.category}</span>
            {product.badge && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 font-bold">{product.badge}</span>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
          {product.subcategory && <p className="text-sm text-gray-500 mb-4 capitalize">{product.subcategory.replace(/-/g, " ")}</p>}

          {/* Sizes */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 uppercase mb-2">Select Size</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(defaultSizes).map(([key, size]) => (
                <button key={key} onClick={() => setSelectedSize(key)}
                  className={`p-3 border text-left transition-colors ${selectedSize === key ? "border-rose-500 bg-rose-50" : "border-gray-200 hover:border-gray-300"}`}>
                  <p className="font-bold text-sm">{size.label}</p>
                  <p className="text-[10px] text-gray-500">{size.dimensions}</p>
                  <p className="font-black text-rose-600 mt-1">₹{prices[key] || 29}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 uppercase mb-2">Quantity</p>
            <div className="flex items-center border border-gray-200 w-fit">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">−</button>
              <span className="w-12 h-10 flex items-center justify-center font-bold border-x border-gray-200">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Price</p>
                <p className="text-3xl font-black text-rose-600">₹{currentPrice * quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-green-600 font-medium">200gsm Premium Paper</p>
                <p className="text-[10px] text-green-600 font-medium">Powder Finish (Shiny)</p>
                <p className="text-[10px] text-green-600 font-medium">Ships All India</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart}
              className={`flex-1 py-3 font-bold text-sm border-2 transition-colors ${added ? "border-green-500 bg-green-50 text-green-700" : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}>
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
            <button onClick={handleBuyNow}
              className="flex-1 py-3 bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors">
              Buy via Instagram
            </button>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Combo Offers */}
      <div className="mb-10 sm:mb-16 mt-10">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Combo Offers — Buy More Save More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {comboOffers.map((combo, i) => (
            <div key={i} className="bg-white border border-gray-200 p-4 sm:p-5">
              <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">{combo.buy}</p>
              <p className="text-xs sm:text-sm text-green-600 font-medium mb-3">+ {combo.get}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl sm:text-2xl font-black text-rose-600">₹{combo.price}</span>
                <span className="text-sm line-through text-gray-400">₹{combo.original}</span>
                <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5">SAVE ₹{combo.savings}</span>
              </div>
              <Link href="/products" className="block w-full py-2 bg-rose-600 text-white font-bold text-xs sm:text-sm text-center hover:bg-rose-700 transition-colors">Shop Now</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Size Guide */}
      <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-10 sm:mb-12">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Size Guide</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-900">Size</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-900">Dimensions</th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-900 hidden sm:table-cell">Best For</th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-bold text-gray-900">Price</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(defaultSizes).map(([key, size]) => (
                <tr key={key} className={`border-b border-gray-100 ${selectedSize === key ? "bg-rose-50" : ""}`}>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">{size.label}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">{sizeGuide[key].cm} cm</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600 hidden sm:table-cell">{sizeGuide[key].use}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-bold text-rose-600">₹{prices[key] || 29}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
