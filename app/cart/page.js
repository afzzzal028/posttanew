"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";

const sizeLabels = { A6: "A6 Card", A5: "A5 Poster", A4: "A4 Poster", A3: "A3 Poster" };

const couponRules = {
  COMBO2A3: { requiredSize: "A3", minQty: 2 },
  COMBO3A4: { requiredSize: "A4", minQty: 3 },
  COMBO5A4: { requiredSize: "A4", minQty: 5 },
  COMBO3A3: { requiredSize: "A3", minQty: 3 },
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isLoaded } = useCart();
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCoupons(d.data || []);
      })
      .catch(() => {});
  }, []);

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

  function selectCoupon(coupon) {
    setCouponError("");
    const rule = couponRules[coupon.coupon_code];
    if (rule) {
      const sizeItems = cart.filter((item) => item.size === rule.requiredSize);
      const totalSizeQty = sizeItems.reduce((sum, item) => sum + item.quantity, 0);
      if (totalSizeQty < rule.minQty) {
        setCouponError(`Add ${rule.minQty}× ${rule.requiredSize} posters to use this coupon`);
        setAppliedCoupon(null);
        return;
      }
    }
    setAppliedCoupon(coupon);
  }

  function removeCoupon() {
    setAppliedCoupon(null);
    setCouponError("");
  }

  const discount = appliedCoupon ? appliedCoupon.savings : 0;
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

            {/* Applied Coupon */}
            {appliedCoupon && (
              <div className="mb-3 bg-green-50 border border-green-200 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-green-700 uppercase">Coupon Applied</p>
                    <p className="text-sm font-bold text-green-700 font-mono truncate">{appliedCoupon.coupon_code}</p>
                    <p className="text-[10px] text-green-600">-₹{appliedCoupon.savings} off</p>
                  </div>
                  <button onClick={removeCoupon} className="text-red-500 text-[10px] font-bold hover:underline shrink-0">Remove</button>
                </div>
              </div>
            )}

            {/* Available Coupons */}
            {!appliedCoupon && coupons.length > 0 && (
              <div className="mb-3">
                <label className="text-[10px] font-bold text-gray-700 mb-1.5 block uppercase">Select a Coupon</label>
                <div className="space-y-1.5">
                  {coupons.map((c) => {
                    const rule = couponRules[c.coupon_code];
                    let eligible = true;
                    let requirement = "";
                    if (rule) {
                      const sizeItems = cart.filter((item) => item.size === rule.requiredSize);
                      const totalSizeQty = sizeItems.reduce((sum, item) => sum + item.quantity, 0);
                      eligible = totalSizeQty >= rule.minQty;
                      if (!eligible) requirement = `Need ${rule.minQty}× ${rule.requiredSize}`;
                    }
                    return (
                      <button key={c.id} onClick={() => eligible && selectCoupon(c)} disabled={!eligible}
                        className={`w-full text-left p-2.5 border transition-colors ${eligible ? "border-rose-200 hover:border-rose-400 hover:bg-rose-50 cursor-pointer" : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"}`}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold font-mono text-gray-900">{c.coupon_code}</p>
                            <p className="text-[9px] text-gray-500 truncate">{c.subtitle}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs font-black text-green-600">-₹{c.savings}</p>
                            {requirement && <p className="text-[8px] text-amber-600">{requirement}</p>}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {couponError && <p className="text-[10px] text-red-500 mt-1.5">{couponError}</p>}
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
