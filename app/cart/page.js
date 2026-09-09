"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

const sizeLabels = { A6: "A6 Card", A5: "A5 Poster", A4: "A4 Poster", A3: "A3 Poster" };

const coupons = {
  COMBO2A3: { discount: 139, requiredSize: "A3", minQty: 2, description: "Buy 2 A3 → Get 1 A4 + 2 A6 + 1 Mystery FREE" },
  COMBO3A4: { discount: 187, requiredSize: "A4", minQty: 3, description: "Buy 3 A4 → Get 1 A5 + 3 A6 + 1 Mystery FREE" },
  COMBO5A4: { discount: 316, requiredSize: "A4", minQty: 5, description: "Buy 5 A4 → Get 2 A5 + 5 A6 + 1 Mystery FREE" },
  COMBO3A3: { discount: 274, requiredSize: "A3", minQty: 3, description: "Buy 3 A3 → Get 2 A4 + 5 A6 + 1 Mystery FREE" },
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isLoaded } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 w-48 mx-auto"></div>
          <div className="h-4 bg-gray-200 w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className="text-xl font-black text-gray-900 mb-3">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6 text-sm">Add some awesome posters to get started!</p>
        <Link href="/products" className="inline-block bg-rose-600 text-white px-8 py-3 font-bold text-sm hover:bg-rose-700 transition-colors">Browse Posters</Link>
      </div>
    );
  }

  function applyCoupon() {
    const code = couponCode.toUpperCase().trim();
    const coupon = coupons[code];
    if (!coupon) { setCouponError("Invalid coupon code"); setAppliedCoupon(null); return; }
    const sizeItems = cart.filter((item) => item.size === coupon.requiredSize);
    const totalSizeQty = sizeItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalSizeQty < coupon.minQty) { setCouponError(`Need ${coupon.minQty}× ${coupon.requiredSize}`); setAppliedCoupon(null); return; }
    setAppliedCoupon({ ...coupon, code }); setCouponError("");
  }

  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const shipping = totalPrice >= 499 ? 0 : 49;
  const finalTotal = Math.max(0, totalPrice - discount + shipping);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl sm:text-2xl font-black text-gray-900">Your Cart</h1>
        <span className="text-xs sm:text-sm text-gray-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item.key} className="bg-white border border-gray-200 p-3 sm:p-4">
              <div className="flex gap-3">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-xl sm:text-3xl">🖼️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">{sizeLabels[item.size]}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.key)} className="text-gray-400 hover:text-red-500 shrink-0 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div className="flex items-center border border-gray-200">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">−</button>
                      <span className="w-8 sm:w-10 h-7 sm:h-8 flex items-center justify-center font-bold text-sm border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
                    </div>
                    <p className="font-black text-gray-900 text-sm sm:text-lg">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 p-4 sticky top-20">
            <h2 className="font-black text-gray-900 mb-3 text-sm">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-3">
              <label className="text-[10px] font-bold text-gray-700 mb-1.5 block uppercase">Coupon Code</label>
              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-green-700 font-mono truncate">{appliedCoupon.code}</p>
                      <p className="text-[10px] text-green-600">-₹{appliedCoupon.discount} off</p>
                    </div>
                    <button onClick={() => { setAppliedCoupon(null); setCouponCode(""); }} className="text-red-500 text-[10px] font-bold hover:underline shrink-0">Remove</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex gap-1.5">
                    <input type="text" value={couponCode} onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                      placeholder="Code" className="flex-1 min-w-0 px-2.5 py-2 border border-gray-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-500" />
                    <button onClick={applyCoupon} className="px-3 py-2 bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 shrink-0">Apply</button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-500 mt-1">{couponError}</p>}
                </div>
              )}
            </div>

            {/* Available Coupons */}
            {!appliedCoupon && (
              <div className="mb-3 bg-rose-50 border border-rose-100 p-2.5">
                <p className="text-[9px] font-bold text-rose-700 uppercase mb-1.5">Available Coupons</p>
                <div className="space-y-1">
                  {Object.entries(coupons).map(([code, coupon]) => (
                    <button key={code} onClick={() => setCouponCode(code)}
                      className="w-full text-left p-1.5 hover:bg-rose-100 transition-colors text-[10px] leading-tight">
                      <span className="font-mono font-bold text-rose-600">{code}</span>
                      <span className="text-gray-500 ml-1 hidden sm:inline">— {coupon.description}</span>
                      <span className="text-gray-500 sm:hidden"> ({coupon.requiredSize} ×{coupon.minQty})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">₹{totalPrice}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600 font-medium"><span>Discount</span><span>-₹{discount}</span></div>}
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : <span className="font-medium">₹{shipping}</span>}</div>
              {totalPrice < 499 && <p className="text-[10px] text-amber-600 bg-amber-50 p-1.5">Add ₹{499 - totalPrice} more for free shipping!</p>}
              <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-black text-base text-gray-900">Total</span><span className={`font-black text-base ${discount > 0 ? "text-green-600" : "text-rose-600"}`}>₹{finalTotal}</span></div>
              {discount > 0 && <p className="text-[10px] text-green-600 text-center bg-green-50 p-1.5 font-medium">You save ₹{discount}!</p>}
            </div>

            <Link href="/checkout" className="block w-full mt-4 py-2.5 bg-rose-600 text-white font-bold text-sm text-center hover:bg-rose-700 transition-colors">Checkout</Link>
            <Link href="/products" className="block w-full mt-2 py-2 text-center text-xs font-medium text-gray-500 hover:text-rose-600 transition-colors">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
