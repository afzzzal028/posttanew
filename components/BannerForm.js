"use client";
import { useState } from "react";

export default function BannerForm({ banner, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: banner?.title || "",
    subtitle: banner?.subtitle || "",
    price: banner?.price || 0,
    original_price: banner?.original_price || 0,
    savings: banner?.savings || 0,
    coupon_code: banner?.coupon_code || "",
    bg_color: banner?.bg_color || "#e11d48",
    text_color: banner?.text_color || "#ffffff",
    subtitle_color: banner?.subtitle_color || "#86efac",
    badge_color: banner?.badge_color || "rgba(255,255,255,0.2)",
    badge_text: banner?.badge_text || "",
    speed: banner?.speed || 30,
    active: banner?.active !== false,
    sort_order: banner?.sort_order || 0,
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!form.title) return;
    setSaving(true);
    await onSave({ ...form, id: banner?.id || null });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">{banner ? "Edit Banner" : "Add Banner"}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        </div>
        <div className="p-4 space-y-3">
          {/* Content */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. Buy 2 A3 Posters" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. Get 1 A4 + 2 A6 Cards FREE" />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Price (₹)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Original (₹)</label>
              <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Savings (₹)</label>
              <input type="number" value={form.savings} onChange={(e) => setForm({ ...form, savings: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Coupon Code</label>
              <input type="text" value={form.coupon_code} onChange={(e) => setForm({ ...form, coupon_code: e.target.value.toUpperCase() })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="COMBO2A3" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Badge Text</label>
              <input type="text" value={form.badge_text} onChange={(e) => setForm({ ...form, badge_text: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="SAVE ₹139" />
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1.5">Colors</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: "bg_color", label: "Background" },
                { key: "text_color", label: "Title" },
                { key: "subtitle_color", label: "Subtitle" },
                { key: "badge_color", label: "Badge" },
              ].map((c) => (
                <div key={c.key}>
                  <label className="block text-[9px] text-gray-500 mb-0.5">{c.label}</label>
                  <div className="flex items-center gap-1">
                    <input type="color" value={form[c.key].startsWith("rgba") ? "#888888" : form[c.key]}
                      onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                      className="w-6 h-6 border border-gray-200 cursor-pointer p-0" />
                    <input type="text" value={form[c.key]} onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                      className="flex-1 min-w-0 px-1 py-0.5 border border-gray-200 text-[9px] font-mono focus:outline-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Speed & Order */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Speed (sec)</label>
              <input type="number" value={form.speed} onChange={(e) => setForm({ ...form, speed: parseInt(e.target.value) || 30 })}
                min="5" max="120"
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
              <p className="text-[9px] text-gray-400 mt-0.5">Lower = faster</p>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-1.5 text-xs">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-rose-600" />
                Active
              </label>
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Preview</label>
            <div className="overflow-hidden" style={{ background: "#111" }}>
              <div className="flex items-center gap-4 py-3 px-4" style={{ background: form.bg_color, animationDuration: `${form.speed}s` }}>
                <div>
                  <p className="font-bold text-sm whitespace-nowrap" style={{ color: form.text_color }}>{form.title || "Banner Title"}</p>
                  <p className="text-xs whitespace-nowrap" style={{ color: form.subtitle_color }}>{form.subtitle || "Subtitle text"}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg whitespace-nowrap" style={{ color: form.text_color }}>₹{form.price}</p>
                  {form.original_price > 0 && <p className="text-xs line-through whitespace-nowrap" style={{ color: form.text_color, opacity: 0.5 }}>₹{form.original_price}</p>}
                </div>
                {form.badge_text && <span className="text-[10px] font-bold px-2 py-0.5 whitespace-nowrap" style={{ background: form.badge_color, color: form.text_color }}>{form.badge_text}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 p-4 border-t border-gray-200">
          <button onClick={onCancel} className="flex-1 py-2 border border-gray-200 text-xs font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={saving || !form.title}
            className="flex-1 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save Banner"}
          </button>
        </div>
      </div>
    </div>
  );
}
