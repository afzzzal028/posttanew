"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";

const couponRules = {
  COMBO2A3: { requiredSize: "A3", minQty: 2 },
  COMBO3A4: { requiredSize: "A4", minQty: 3 },
  COMBO5A4: { requiredSize: "A4", minQty: 5 },
  COMBO3A3: { requiredSize: "A3", minQty: 3 },
};

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart, isLoaded } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", pincode: "", city: "", state: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/banners")
      .then((r) => r.json())
      .then((d) => { if (d.success) setCoupons(d.data || []); })
      .catch(() => {});
  }, []);

  if (!isLoaded) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>;
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-rose-600 font-semibold hover:underline">← Shop Now</Link>
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

  function generateOrderId() {
    return "PT" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  async function saveOrder(paymentMethod) {
    const id = generateOrderId();
    const discount = appliedCoupon ? appliedCoupon.savings : 0;
    const shipping = totalPrice >= 499 ? 0 : 49;
    const finalTotal = totalPrice - discount + shipping;

    const itemsJson = JSON.stringify(cart.map((item) => ({
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    })));

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: id,
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          pincode: form.pincode,
          city: form.city,
          state: form.state,
          items: itemsJson,
          total: totalPrice,
          discount,
          shipping,
          finalTotal,
          paymentMethod,
          couponCode: appliedCoupon ? appliedCoupon.coupon_code : null,
        }),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    return id;
  }

  async function handleCODOrder() {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields");
      return;
    }
    setSaving(true);
    const id = await saveOrder("cod");
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    setSaving(false);
  }

  async function handleInstagramOrder() {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields");
      return;
    }
    setSaving(true);
    const id = await saveOrder("instagram");
    setOrderId(id);

    const items = cart.map((item) => `${item.name} (${item.size}) x${item.quantity} = ₹${item.price * item.quantity}`).join("\n");
    const discount = appliedCoupon ? appliedCoupon.savings : 0;
    const shipping = totalPrice >= 499 ? 0 : 49;
    const finalTotal = totalPrice - discount + shipping;
    const couponText = appliedCoupon ? `\nCoupon: ${appliedCoupon.coupon_code} (-₹${discount})` : "";
    const message = `Hey! I want to place an order:\n\nOrder ID: ${id}\n\n${items}${couponText}\n\nTotal: ₹${finalTotal}\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPincode: ${form.pincode}\nCity: ${form.city}\nState: ${form.state}`;
    window.open(`https://www.instagram.com/direct/t/?text=${encodeURIComponent(message)}`, "_blank");

    setOrderPlaced(true);
    clearCart();
    setSaving(false);
  }

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
        <div className="text-5xl sm:text-6xl mb-4">✅</div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-2 text-sm sm:text-base">Order ID: <span className="font-mono font-bold text-gray-900">{orderId}</span></p>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">We will contact you on {form.phone} to confirm.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/track" className="inline-block bg-gray-900 text-white px-6 sm:px-8 py-3 font-bold text-sm sm:text-base hover:bg-gray-800 transition-colors">
            Track Order
          </Link>
          <Link href="/products" className="inline-block bg-rose-600 text-white px-6 sm:px-8 py-3 font-bold text-sm sm:text-base hover:bg-rose-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const discount = appliedCoupon ? appliedCoupon.savings : 0;
  const shipping = totalPrice >= 499 ? 0 : 49;
  const finalTotal = totalPrice - discount + shipping;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 sm:mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Delivery Details</h2>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="+91 XXXXXXXXXX" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" rows={3} placeholder="House no, Street, Area" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                <input type="text" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="000000" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="City" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="State" />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-gray-200 p-4 sm:p-5 mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.key} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600 truncate">{item.name} ({item.size}) x{item.quantity}</span>
                  <span className="font-medium ml-2">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Applied Coupon */}
            {appliedCoupon && (
              <div className="border-t border-gray-200 pt-3 mb-3">
                <div className="flex items-center justify-between bg-green-50 border border-green-200 p-2">
                  <div>
                    <p className="text-[10px] font-bold text-green-700 uppercase">Coupon Applied</p>
                    <p className="text-xs font-bold text-green-700 font-mono">{appliedCoupon.coupon_code}</p>
                    <p className="text-[10px] text-green-600">-₹{appliedCoupon.savings} discount</p>
                  </div>
                  <button onClick={() => setAppliedCoupon(null)} className="text-red-500 text-xs hover:underline">Remove</button>
                </div>
              </div>
            )}

            {/* Available Coupons */}
            {!appliedCoupon && coupons.length > 0 && (
              <div className="border-t border-gray-200 pt-3 mb-3">
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
                        className={`w-full text-left p-2 border transition-colors ${eligible ? "border-rose-200 hover:border-rose-400 hover:bg-rose-50 cursor-pointer" : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"}`}>
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
                {couponError && <p className="text-[10px] text-red-500 mt-1">{couponError}</p>}
              </div>
            )}

            <div className="space-y-2 text-xs sm:text-sm border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base sm:text-lg border-t border-gray-200 pt-2">
                <span>Total</span>
                <span className="text-rose-600">₹{finalTotal}</span>
              </div>
            </div>
          </div>

          <button onClick={handleInstagramOrder} disabled={saving}
            className="w-full py-3 font-bold text-sm sm:text-base border-2 border-gray-200 text-gray-900 hover:border-rose-300 transition-colors flex items-center justify-center gap-2 mb-3 disabled:opacity-50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            {saving ? "Saving..." : "Pay via Instagram"}
          </button>

          <button onClick={handleCODOrder} disabled={saving}
            className="w-full py-3 bg-rose-600 text-white font-bold text-sm sm:text-base hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 disabled:opacity-50">
            {saving ? "Saving..." : "Cash on Delivery"}
          </button>
        </div>
      </div>
    </div>
  );
}
