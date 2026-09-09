"use client";
import { useState } from "react";

const categories = ["cars", "anime", "gaming", "sports", "marvel", "dc", "movies", "music", "motivational", "devotional"];

const defaultPrices = { A6: 29, A5: 79, A4: 129, A3: 179 };

export default function ProductForm({ product, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: product?.id || "",
    name: product?.name || "",
    category: product?.category || "cars",
    subcategory: product?.subcategory || "",
    tags: product?.tags?.join(", ") || "",
    colors: product?.colors?.join(", ") || "",
    prices: product?.prices || defaultPrices,
    image_url: product?.image_url || "",
    image_urls: product?.image_urls || [],
    badge: product?.badge || "",
    in_stock: product?.in_stock !== false,
    featured: product?.featured || false,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleImageUpload(e, index) {
    const file = e.target.files[0];
    if (!file || !form.id) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("productId", form.id);
    fd.append("index", String(index));
    try {
      const res = await fetch("/api/products/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        const newUrls = [...form.image_urls];
        newUrls[index] = data.url;
        setForm({ ...form, image_urls: newUrls, image_url: index === 0 ? data.url : form.image_url });
      }
    } catch {}
    setUploading(false);
  }

  function removeImage(index) {
    const newUrls = [...form.image_urls];
    newUrls.splice(index, 1);
    setForm({ ...form, image_urls: newUrls, image_url: index === 0 ? (newUrls[0] || "") : form.image_url });
  }

  async function handleSave() {
    if (!form.id || !form.name) return;
    setSaving(true);
    await onSave({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
    });
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">{product ? "Edit Product" : "Add Product"}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Product ID *</label>
              <input type="text" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} disabled={!!product}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:bg-gray-50"
                placeholder="e.g. porsche-911" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="Product name" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Subcategory</label>
              <input type="text" value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="e.g. concept-cars" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Tags (comma sep)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="porsche, racing, sports" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Colors (comma sep)</label>
              <input type="text" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })}
                className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                placeholder="red, black" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(form.prices).map(([size, price]) => (
              <div key={size}>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">{size}</label>
                <input type="number" value={price} onChange={(e) => setForm({ ...form, prices: { ...form.prices, [size]: parseInt(e.target.value) || 0 } })}
                  className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
              </div>
            ))}
          </div>

          {/* Multiple Images */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Images (up to 5)</label>
            <div className="grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="relative">
                  {form.image_urls[i] ? (
                    <div className="aspect-square border border-gray-200 overflow-hidden bg-gray-50">
                      <img src={form.image_urls[i]} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)}
                        className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center">✕</button>
                    </div>
                  ) : (
                    <label className="aspect-square border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-rose-400 bg-gray-50">
                      <span className="text-lg text-gray-300">+</span>
                      <span className="text-[8px] text-gray-400">{i === 0 ? "Main" : `#${i + 1}`}</span>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} className="hidden" />
                    </label>
                  )}
                </div>
              ))}
            </div>
            {uploading && <p className="text-[10px] text-gray-500 mt-1">Uploading...</p>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Or paste image URL</label>
            <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value, image_urls: [e.target.value, ...form.image_urls.slice(1)] })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="https://..." />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Badge</label>
            <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. Best Seller, New" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 text-xs">
              <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="accent-rose-600" />
              In Stock
            </label>
            <label className="flex items-center gap-1.5 text-xs">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-rose-600" />
              Featured
            </label>
          </div>
        </div>
        <div className="flex gap-2 p-4 border-t border-gray-200">
          <button onClick={onCancel} className="flex-1 py-2 border border-gray-200 text-xs font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={saving || !form.id || !form.name}
            className="flex-1 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
