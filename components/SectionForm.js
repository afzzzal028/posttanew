"use client";
import { useState, useRef } from "react";

export default function SectionForm({ section, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: section?.id || "",
    title: section?.title || "",
    subtitle: section?.subtitle || "",
    image_url: section?.image_url || "",
    link: section?.link || "",
    sort_order: section?.sort_order ?? 0,
    active: section?.active !== false,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("productId", "section-" + (form.id || Date.now().toString(36)));
    fd.append("index", "0");
    try {
      const res = await fetch("/api/products/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setForm({ ...form, image_url: data.url });
    } catch {}
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleSave() {
    if (!form.title) return;
    setSaving(true);
    await onSave(form);
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">{section ? "Edit Section" : "Add Section"}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="e.g. Room Inspiration" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="Short description" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Image</label>
            <div className="flex gap-2 items-start">
              <label className="flex-1 aspect-video border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-rose-400 bg-gray-50 overflow-hidden">
                {form.image_url ? (
                  <img src={form.image_url} alt="" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-2xl">📸</span>
                    <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
                  </div>
                )}
                <input type="file" accept="image/*" ref={inputRef} onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {uploading && <p className="text-[10px] text-gray-500 mt-1">Uploading...</p>}
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Link (optional)</label>
            <input type="text" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="/products?category=islamic" />
          </div>
          <div className="grid grid-cols-2 gap-3">
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
        </div>
        <div className="flex gap-2 p-4 border-t border-gray-200">
          <button onClick={onCancel} className="flex-1 py-2 border border-gray-200 text-xs font-bold hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} disabled={saving || !form.title}
            className="flex-1 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
