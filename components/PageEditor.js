"use client";
import { useState, useRef } from "react";

const defaultSections = [
  { id: "hero", type: "hero", title: "Transform Your Wall", subtitle: "in Minutes", bg: "", bgColor: "from-rose-50 via-white to-orange-50", active: true },
  { id: "custom", type: "custom", title: "Custom Poster", subtitle: "Upload your photo → Choose size → We print & ship", bg: "", active: true },
  { id: "marquee", type: "marquee", title: "Buy 2 A3 Get 4 Posters FREE", subtitle: "Use code COMBO2A3", bg: "", bgColor: "#e11d48", textColor: "#ffffff", active: true },
  { id: "rooms", type: "rooms", title: "Room Inspiration", subtitle: "See how POSTTA transforms real rooms", bg: "", active: true },
  { id: "bestsellers", type: "products", title: "Best Sellers", subtitle: "Our most popular posters", bg: "", active: true },
  { id: "combos", type: "combos", title: "Combo Offers", subtitle: "Save More", bg: "", active: true },
  { id: "newarrivals", type: "products", title: "New Arrivals", subtitle: "Fresh drops this week", bg: "", active: true },
  { id: "categories", type: "categories", title: "Browse Categories", subtitle: "", bg: "", active: true },
  { id: "trust", type: "trust", title: "Why POSTTA", subtitle: "", bg: "", active: true },
  { id: "cta", type: "cta", title: "Ready to Transform Your Wall?", subtitle: "Browse 80+ designs across Cars, Anime, Gaming, Sports & more.", bg: "", active: true },
  { id: "footer", type: "footer", title: "POSTTA", subtitle: "Premium Posters for Every Wall", bg: "", active: true },
];

export default function PageEditor({ settings, onSave }) {
  const [sections, setSections] = useState(settings?.pageSections || defaultSections);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  function handleDragStart(idx) { setDragIdx(idx); }
  function handleDragOver(e, idx) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const items = [...sections];
    const dragged = items.splice(dragIdx, 1)[0];
    items.splice(idx, 0, dragged);
    setSections(items);
    setDragIdx(idx);
  }
  function handleDragEnd() { setDragIdx(null); }

  function updateSection(id, updates) {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s));
  }

  function addSection() {
    const newId = "custom-" + Date.now().toString(36);
    setSections((prev) => [...prev, {
      id: newId, type: "custom", title: "New Section", subtitle: "Edit this section",
      bg: "", bgColor: "#ffffff", textColor: "#000000", link: "", active: true,
    }]);
    setEditing(newId);
  }

  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (editing === id) setEditing(null);
  }

  async function handleBgUpload(e, id) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(id);
    setUploadError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("productId", "section-bg-" + id);
    fd.append("index", "0");
    try {
      const res = await fetch("/api/products/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        updateSection(id, { bg: data.url });
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err) {
      setUploadError("Upload failed: " + err.message);
    }
    setUploading(null);
    e.target.value = "";
  }

  async function handleSave() {
    setSaving(true);
    await onSave({ pageSections: sections });
    setSaving(false);
  }

  const editingSection = sections.find((s) => s.id === editing);

  function BgUploadField({ section }) {
    const inputId = "bg-upload-" + section.id;
    return (
      <div>
        <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Background Image</label>
        {section.bg ? (
          <div className="relative border border-gray-200 bg-gray-50">
            <img src={section.bg} alt="" className="w-full h-24 object-cover" />
            <div className="flex gap-1 p-1">
              <label htmlFor={inputId} className="flex-1 text-center py-1 bg-blue-50 text-blue-600 text-[10px] font-bold cursor-pointer hover:bg-blue-100">
                Change
              </label>
              <button onClick={() => updateSection(section.id, { bg: "" })} className="flex-1 py-1 bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100">
                Remove
              </button>
            </div>
            <input id={inputId} type="file" accept="image/*" onChange={(e) => handleBgUpload(e, section.id)} className="hidden" />
          </div>
        ) : (
          <label htmlFor={inputId} className="block border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 bg-gray-50 transition-colors">
            <input id={inputId} type="file" accept="image/*" onChange={(e) => handleBgUpload(e, section.id)} className="hidden" />
            {uploading === section.id ? (
              <div><span className="text-rose-500 text-sm">Uploading...</span></div>
            ) : (
              <div>
                <div className="text-2xl mb-1">📸</div>
                <span className="text-[10px] text-gray-500 font-bold">Click or drop image here</span>
              </div>
            )}
          </label>
        )}
        {uploading === section.id && <p className="text-[9px] text-rose-500 mt-1">Uploading...</p>}
        {uploadError && <p className="text-[9px] text-red-500 mt-1">{uploadError}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Page Layout Editor</h3>
          <p className="text-[10px] text-gray-500">Drag to reorder, click to edit. Changes save to the live site.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="px-4 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-gray-700 uppercase">Sections ({sections.length})</p>
            <button onClick={addSection} className="text-[10px] text-rose-600 font-bold hover:underline">+ Add</button>
          </div>
          {sections.map((sec, idx) => (
            <div key={sec.id} draggable onDragStart={() => handleDragStart(idx)} onDragOver={(e) => handleDragOver(e, idx)} onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 p-2 border cursor-move transition-colors ${dragIdx === idx ? "border-rose-400 bg-rose-50" : "border-gray-200 bg-white hover:border-gray-300"} ${editing === sec.id ? "ring-2 ring-rose-500" : ""}`}>
              <span className="text-gray-300 text-xs">☰</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{sec.title}</p>
                <p className="text-[9px] text-gray-400">{sec.type} {sec.bg ? "🖼" : ""}</p>
              </div>
              <label className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <input type="checkbox" checked={sec.active} onChange={(e) => updateSection(sec.id, { active: e.target.checked })}
                  className="accent-rose-600 w-3 h-3" />
              </label>
              <button onClick={() => setEditing(sec.id)} className="text-[10px] text-blue-600 hover:underline">Edit</button>
              <button onClick={() => removeSection(sec.id)} className="text-[10px] text-red-500 hover:underline">Del</button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          {editingSection ? (
            <div className="bg-white border border-gray-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">Edit: {editingSection.title}</p>
                <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600 text-xs">✕</button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Title</label>
                <input type="text" value={editingSection.title} onChange={(e) => updateSection(editing.id, { title: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Subtitle</label>
                <input type="text" value={editingSection.subtitle} onChange={(e) => updateSection(editing.id, { subtitle: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500" />
              </div>

              {editingSection.type !== "hero" && (
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Link</label>
                  <input type="text" value={editingSection.link || ""} onChange={(e) => updateSection(editing.id, { link: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                    placeholder="/products?category=islamic" />
                </div>
              )}

              <BgUploadField section={editingSection} />

              {editingSection.type === "marquee" && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Background Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={editingSection.bgColor || "#e11d48"} onChange={(e) => updateSection(editing.id, { bgColor: e.target.value })} className="w-8 h-8 border-0 cursor-pointer" />
                      <input type="text" value={editingSection.bgColor || ""} onChange={(e) => updateSection(editing.id, { bgColor: e.target.value })}
                        className="flex-1 px-2 py-1.5 border border-gray-200 text-xs font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Text Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={editingSection.textColor || "#ffffff"} onChange={(e) => updateSection(editing.id, { textColor: e.target.value })} className="w-8 h-8 border-0 cursor-pointer" />
                      <input type="text" value={editingSection.textColor || ""} onChange={(e) => updateSection(editing.id, { textColor: e.target.value })}
                        className="flex-1 px-2 py-1.5 border border-gray-200 text-xs font-mono" />
                    </div>
                  </div>
                </>
              )}

              {editingSection.type === "custom" && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Text Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={editingSection.textColor || "#111111"} onChange={(e) => updateSection(editing.id, { textColor: e.target.value })} className="w-8 h-8 border-0 cursor-pointer" />
                      <input type="text" value={editingSection.textColor || ""} onChange={(e) => updateSection(editing.id, { textColor: e.target.value })}
                        className="flex-1 px-2 py-1.5 border border-gray-200 text-xs font-mono" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Background Color (fallback)</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={editingSection.bgColor || "#f9fafb"} onChange={(e) => updateSection(editing.id, { bgColor: e.target.value })} className="w-8 h-8 border-0 cursor-pointer" />
                      <input type="text" value={editingSection.bgColor || ""} onChange={(e) => updateSection(editing.id, { bgColor: e.target.value })}
                        className="flex-1 px-2 py-1.5 border border-gray-200 text-xs font-mono" />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Section Type</label>
                <select value={editingSection.type} onChange={(e) => updateSection(editing.id, { type: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500">
                  <option value="hero">Hero Banner</option>
                  <option value="marquee">Marquee / Offer Strip</option>
                  <option value="rooms">Room Inspiration</option>
                  <option value="products">Product Grid</option>
                  <option value="combos">Combo Offers</option>
                  <option value="categories">Browse Categories</option>
                  <option value="trust">Trust Badges</option>
                  <option value="cta">CTA Banner</option>
                  <option value="custom">Custom Section</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 p-8 text-center text-gray-400 text-xs">
              Click "Edit" on a section to configure it
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <p className="text-[10px] font-bold text-gray-700 uppercase mb-2">Live Preview</p>
          <div className="bg-white border border-gray-200 overflow-hidden" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {sections.filter((s) => s.active).map((sec) => (
              <div key={sec.id} className="relative">
                {sec.type === "hero" && (
                  <div className="relative py-8 px-4 text-center" style={{ background: sec.bg ? `url(${sec.bg}) center/cover` : "linear-gradient(135deg, #fff1f2, #ffffff, #fff7ed)" }}>
                    {sec.bg && <div className="absolute inset-0 bg-black/40" />}
                    <div className="relative">
                      <p className="text-sm font-black" style={{ color: sec.bg ? "#fff" : "#111" }}>{sec.title}</p>
                      <p className="text-xs" style={{ color: sec.bg ? "#eee" : "#666" }}>{sec.subtitle}</p>
                    </div>
                  </div>
                )}
                {sec.type === "marquee" && (
                  <div className="py-2 px-4 text-center" style={{ background: sec.bg ? `url(${sec.bg}) center/cover` : sec.bgColor || "#e11d48" }}>
                    <p className="text-[10px] font-bold whitespace-nowrap" style={{ color: sec.textColor || "#fff" }}>{sec.title} — {sec.subtitle}</p>
                  </div>
                )}
                {sec.type === "custom" && (
                  <div className="py-4 px-4" style={{ background: sec.bg ? `url(${sec.bg}) center/cover` : sec.bgColor || "#f9fafb" }}>
                    <p className="text-xs font-bold" style={{ color: sec.textColor || "#111" }}>{sec.title}</p>
                    <p className="text-[9px]" style={{ color: sec.textColor ? sec.textColor + "99" : "#666" }}>{sec.subtitle}</p>
                  </div>
                )}
                {sec.type === "cta" && (
                  <div className="py-4 px-4 text-center" style={{ background: sec.bg ? `url(${sec.bg}) center/cover` : "#e11d48" }}>
                    {sec.bg && <div className="absolute inset-0 bg-rose-600/80" />}
                    <p className="text-xs font-black text-white relative">{sec.title}</p>
                    <p className="text-[9px] text-rose-100 relative">{sec.subtitle}</p>
                  </div>
                )}
                {sec.type === "rooms" && (
                  <div className="py-4 px-4">
                    <p className="text-xs font-black text-gray-900 mb-1">{sec.title}</p>
                    <p className="text-[9px] text-gray-500 mb-2">{sec.subtitle}</p>
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3].map((i) => <div key={i} className="aspect-video bg-gray-100 flex items-center justify-center"><span className="text-[8px] text-gray-300">🖼️</span></div>)}
                    </div>
                  </div>
                )}
                {sec.type === "products" && (
                  <div className="py-4 px-4">
                    <p className="text-xs font-black text-gray-900 mb-2">{sec.title}</p>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((i) => <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center"><span className="text-[8px] text-gray-300">🖼️</span></div>)}
                    </div>
                  </div>
                )}
                {sec.type === "combos" && (
                  <div className="py-4 px-4">
                    <p className="text-xs font-black text-gray-900 mb-2">{sec.title}</p>
                    <div className="grid grid-cols-2 gap-1">
                      {[1, 2].map((i) => <div key={i} className="aspect-video bg-gray-100 flex items-center justify-center"><span className="text-[8px] text-gray-300">🏷️</span></div>)}
                    </div>
                  </div>
                )}
                {sec.type === "categories" && (
                  <div className="py-4 px-4">
                    <p className="text-xs font-black text-gray-900 mb-2">{sec.title}</p>
                    <div className="grid grid-cols-5 gap-1">
                      {[1, 2, 3, 4, 5].map((i) => <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center rounded"><span className="text-[8px] text-gray-300">📁</span></div>)}
                    </div>
                  </div>
                )}
                {sec.type === "trust" && (
                  <div className="py-4 px-4">
                    <p className="text-xs font-black text-gray-900 mb-2">{sec.title}</p>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map((i) => <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center rounded"><span className="text-[8px] text-gray-300">✓</span></div>)}
                    </div>
                  </div>
                )}
                {sec.type === "footer" && (
                  <div className="py-3 px-4 bg-gray-900 text-center">
                    <p className="text-[10px] font-bold text-white">{sec.title}</p>
                    <p className="text-[8px] text-gray-400">{sec.subtitle}</p>
                  </div>
                )}
                <div className="absolute top-1 right-1 bg-black/60 text-white text-[7px] px-1.5 py-0.5 rounded">{sec.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
