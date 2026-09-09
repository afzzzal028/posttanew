"use client";
import { useState, useRef } from "react";

const sizes = [
  { id: "A6", label: "A6 Card", price: 39, note: "10.5 × 14.8 cm" },
  { id: "A5", label: "A5 Poster", price: 89, note: "14.8 × 21 cm" },
  { id: "A4", label: "A4 Poster", price: 139, note: "21 × 29.7 cm" },
  { id: "A3", label: "A3 Poster", price: 189, note: "29.7 × 42 cm" },
];

export default function CustomPage() {
  const [selectedSize, setSelectedSize] = useState("A4");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError("Max file size 10MB"); return; }
    setImage(file);
    setError("");
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImage(null); setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  const price = sizes.find((s) => s.id === selectedSize).price * quantity;
  const shipping = price >= 499 ? 0 : 49;
  const total = price + shipping;

  async function sendOrder(method) {
    if (!image) { setError("Please upload a photo"); return; }
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!phone.trim()) { setError("Please enter your phone number"); return; }

    setSending(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("size", selectedSize);
      formData.append("quantity", quantity);
      formData.append("total", total);
      formData.append("method", method);

      const res = await fetch("/api/custom-order", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        if (method === "instagram") {
          const msg = encodeURIComponent(
            `Custom Poster Order\n\nName: ${name}\nPhone: ${phone}\nSize: ${selectedSize} × ${quantity}\nTotal: ₹${total}\n\nI've uploaded my photo for the custom poster!`
          );
          window.open(`https://www.instagram.com/direct/t/?text=${msg}`, "_blank");
        }
        setSent(true);
      } else {
        setError(data.error || "Failed to send order");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Order Sent!</h1>
        <p className="text-gray-500 mb-6">We received your custom poster request. We&apos;ll contact you on WhatsApp/Instagram within 24 hours.</p>
        <div className="bg-gray-50 p-4 mb-6 text-left text-sm space-y-1">
          <p><span className="font-bold">Size:</span> {selectedSize}</p>
          <p><span className="font-bold">Quantity:</span> {quantity}</p>
          <p><span className="font-bold">Total:</span> ₹{total}</p>
        </div>
        <a href="/" className="inline-block bg-rose-600 text-white px-8 py-3 font-bold text-sm hover:bg-rose-700">Back to Home</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Custom Poster</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">Upload your photo, choose a size, and we&apos;ll print it on premium 200gsm paper with a powder finish.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Your Photo</label>
          <div
            className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-rose-400 transition-colors bg-gray-50"
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white flex items-center justify-center text-sm font-bold hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 font-medium">Click to upload</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />

          {/* Details */}
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name"
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp number"
                className="w-full px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
            </div>
          </div>
        </div>

        {/* Options */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Size</label>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {sizes.map((s) => (
              <button key={s.id} onClick={() => setSelectedSize(s.id)}
                className={`p-3 border text-left transition-colors ${selectedSize === s.id ? "border-rose-500 bg-rose-50" : "border-gray-200 hover:border-gray-300"}`}>
                <p className="font-bold text-sm">{s.label}</p>
                <p className="text-xs text-gray-500">{s.note}</p>
                <p className="font-black text-rose-600 mt-1">₹{s.price}</p>
              </button>
            ))}
          </div>

          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity</label>
          <div className="flex items-center border border-gray-200 w-fit mb-4">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">−</button>
            <span className="w-12 h-9 flex items-center justify-center font-bold text-sm border-x border-gray-200">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-50">+</button>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 space-y-2 text-sm mb-4">
            <div className="flex justify-between"><span className="text-gray-500">Size</span><span className="font-medium">{selectedSize}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Unit Price</span><span className="font-medium">₹{sizes.find((s) => s.id === selectedSize).price}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Quantity</span><span className="font-medium">{quantity}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="font-medium">₹{price}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : <span className="font-medium">₹{shipping}</span>}</div>
            {price < 499 && <p className="text-[10px] text-amber-600 bg-amber-50 p-1.5">Add ₹{499 - price} more for free shipping!</p>}
            <div className="border-t border-gray-200 pt-2 flex justify-between"><span className="font-black text-gray-900">Total</span><span className="font-black text-rose-600">₹{total}</span></div>
          </div>

          {error && <p className="text-xs text-red-500 mb-3 bg-red-50 p-2">{error}</p>}

          <button onClick={() => sendOrder("email")} disabled={sending}
            className="w-full py-3 bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors disabled:opacity-50 mb-2">
            {sending ? "Sending..." : "Send via Email"}
          </button>
          <button onClick={() => sendOrder("instagram")} disabled={sending}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm hover:opacity-90 transition-colors disabled:opacity-50">
            {sending ? "Sending..." : "Send via Instagram"}
          </button>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8 border border-gray-200 p-4 text-xs text-gray-500 space-y-1">
        <p className="font-bold text-gray-700 uppercase text-[10px] mb-2">How It Works</p>
        <p>1. Upload your photo and select size.</p>
        <p>2. Click &quot;Send via Email&quot; or &quot;Send via Instagram&quot;.</p>
        <p>3. We&apos;ll confirm your order within 24 hours.</p>
        <p>4. Printed on 200gsm paper with powder finish (slightly shiny).</p>
        <p>5. Ships all India — COD available.</p>
      </div>
    </div>
  );
}
