"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/ProductForm";
import BannerForm from "@/components/BannerForm";

const statusColors = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  archived: "bg-gray-100 text-gray-500",
  open: "bg-red-100 text-red-700",
  replied: "bg-blue-100 text-blue-700",
  closed: "bg-gray-100 text-gray-500",
};

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [products, setProducts] = useState([]);
  const [tab, setTab] = useState("all");
  const [ticketTab, setTicketTab] = useState("open");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [search, setSearch] = useState("");
  const [noteText, setNoteText] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [productCatFilter, setProductCatFilter] = useState("");
  const [banners, setBanners] = useState([]);
  const [showBannerForm, setShowBannerForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkItems, setBulkItems] = useState([]);
  const [bulkCategory, setBulkCategory] = useState("islamic");
  const [bulkSubcategory, setBulkSubcategory] = useState("");
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  const [bulkDragOver, setBulkDragOver] = useState(false);

  function addBulkFiles(fileList) {
    const newItems = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => {
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").trim();
        return { file, name, status: "pending", error: "" };
      });
    setBulkItems((prev) => [...prev, ...newItems]);
  }

  function updateBulkName(index, name) {
    setBulkItems((prev) => prev.map((item, i) => i === index ? { ...item, name } : item));
  }

  function removeBulkItem(index) {
    setBulkItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function startBulkUpload() {
    if (bulkItems.length === 0) return;
    setBulkUploading(true);
    setBulkProgress({ current: 0, total: bulkItems.length });
    const defaultPrices = { A6: 22, A5: 69, A4: 109, A3: 159 };

    for (let i = 0; i < bulkItems.length; i++) {
      const item = bulkItems[i];
      setBulkProgress({ current: i + 1, total: bulkItems.length });
      setBulkItems((prev) => prev.map((x, idx) => idx === i ? { ...x, status: "uploading" } : x));

      try {
        const fd = new FormData();
        fd.append("file", item.file);
        fd.append("productId", item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36) + i);
        fd.append("index", "0");
        const res = await fetch("/api/products/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url) {
          const productId = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Date.now().toString(36) + i;
          await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: productId,
              name: item.name,
              category: bulkCategory,
              subcategory: bulkSubcategory,
              tags: item.name.toLowerCase().split(" ").filter(Boolean),
              colors: [],
              prices: defaultPrices,
              image_url: data.url,
              image_urls: [data.url],
              badge: "",
              in_stock: true,
              featured: false,
            }),
          });
          setBulkItems((prev) => prev.map((x, idx) => idx === i ? { ...x, status: "done" } : x));
        } else {
          setBulkItems((prev) => prev.map((x, idx) => idx === i ? { ...x, status: "error", error: data.error || "Upload failed" } : x));
        }
      } catch (err) {
        setBulkItems((prev) => prev.map((x, idx) => idx === i ? { ...x, status: "error", error: err.message } : x));
      }
    }
    setBulkUploading(false);
    loadData();
  }

  useEffect(() => {
    fetch("/api/admin/auth").then((r) => r.json()).then((data) => {
      if (!data.success) {
        router.push("/admin/login");
        return;
      }
      setUser({ email: data.email });
      loadData();
    }).catch(() => router.push("/admin/login"));
  }, [router]);

  async function loadData() {
    setLoading(true);
    try {
      const [dataRes, bannersRes] = await Promise.all([
        fetch("/api/admin/data").then((r) => r.json()),
        fetch("/api/admin/banners").then((r) => r.json()).catch(() => ({ success: false, data: [] })),
      ]);
      if (dataRes.success) {
        setOrders(dataRes.orders || []);
        setCustomOrders(dataRes.customOrders || []);
        setTickets(dataRes.tickets || []);
        setProducts(dataRes.products || []);
      }
      if (bannersRes.success) setBanners(bannersRes.data || []);
    } catch {}
    setLoading(false);
  }

  async function updateStatus(orderId, orderType, newStatus) {
    await fetch("/api/orders/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, orderType, status: newStatus }),
    });
    loadData();
  }

  async function addNote(orderId, orderType, note) {
    await fetch("/api/orders/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, orderType, notes: note }),
    });
    setNoteText("");
    loadData();
  }

  async function replyToTicket(ticketId, reply) {
    await fetch("/api/tickets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId, adminReply: reply, status: "replied" }),
    });
    setReplyText("");
    loadData();
  }

  async function closeTicket(ticketId) {
    await fetch("/api/tickets/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketId, status: "closed" }),
    });
    loadData();
  }

  async function saveProduct(productData) {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    setShowProductForm(false);
    setEditingProduct(null);
    loadData();
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
    loadData();
  }

  async function saveBanner(bannerData) {
    await fetch("/api/admin/banners/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bannerData),
    });
    setShowBannerForm(false);
    setEditingBanner(null);
    loadData();
  }

  async function deleteBanner(id) {
    if (!confirm("Delete this banner?")) return;
    await fetch(`/api/admin/banners/update?id=${id}`, { method: "DELETE" });
    loadData();
  }

  async function toggleBanner(id, currentActive) {
    await fetch("/api/admin/banners/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active: !currentActive }),
    });
    loadData();
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  function filteredOrders(list) {
    let result = list;
    if (tab !== "all" && tab !== "tickets") {
      result = result.filter((o) => o.status === tab);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((o) =>
        o.order_id?.toLowerCase().includes(q) ||
        o.name?.toLowerCase().includes(q) ||
        o.phone?.includes(q)
      );
    }
    return result;
  }

  const allOrders = [...orders.map((o) => ({ ...o, _type: "regular" })), ...customOrders.map((o) => ({ ...o, _type: "custom" }))];
  allOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const filtered = tab === "tickets" || tab === "products" || tab === "banners" ? [] : filteredOrders(allOrders);
  const openTickets = tickets.filter((t) => t.status === ticketTab);
  const flaggedCount = orders.filter((o) => o.flagged).length + customOrders.filter((o) => o.flagged).length;

  let filteredProducts = products;
  if (productCatFilter) filteredProducts = filteredProducts.filter((p) => p.category === productCatFilter);
  if (productSearch) {
    const q = productSearch.toLowerCase();
    filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.category.includes(q));
  }

  const stats = {
    total: allOrders.length,
    pending: allOrders.filter((o) => o.status === "pending").length,
    shipped: allOrders.filter((o) => o.status === "shipped").length,
    delivered: allOrders.filter((o) => o.status === "delivered").length,
    cancelled: allOrders.filter((o) => o.status === "cancelled").length,
    flagged: flaggedCount,
    revenue: allOrders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.final_total || o.total || 0), 0),
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black text-rose-600">POSTTA</h1>
            <span className="text-xs text-gray-400 hidden sm:inline">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:inline">{user?.email}</span>
            <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 mb-4">
          {[
            { label: "Total", value: stats.total, color: "text-gray-900" },
            { label: "Pending", value: stats.pending, color: "text-amber-600" },
            { label: "Shipped", value: stats.shipped, color: "text-purple-600" },
            { label: "Delivered", value: stats.delivered, color: "text-green-600" },
            { label: "Cancelled", value: stats.cancelled, color: "text-red-600" },
            { label: "Flagged", value: stats.flagged, color: "text-orange-600" },
            { label: "Revenue", value: `₹${stats.revenue}`, color: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 p-2 sm:p-3 text-center">
              <p className={`text-base sm:text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, name, or phone..."
            className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
          {["all", "pending", "confirmed", "shipped", "delivered", "cancelled", "archived", "tickets", "products", "banners"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 text-xs font-bold uppercase whitespace-nowrap transition-colors ${
                tab === t ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}>
              {t}
              {t === "tickets" && tickets.filter((ti) => ti.status === "open").length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-[9px] px-1 rounded-full">
                  {tickets.filter((ti) => ti.status === "open").length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tickets View */}
        {tab === "tickets" && (
          <div>
            <div className="flex gap-1 mb-3">
              {["open", "replied", "closed"].map((t) => (
                <button key={t} onClick={() => setTicketTab(t)}
                  className={`px-3 py-1 text-xs font-bold uppercase ${ticketTab === t ? "bg-gray-900 text-white" : "bg-white border border-gray-200"}`}>
                  {t} ({tickets.filter((ti) => ti.status === t).length})
                </button>
              ))}
            </div>
            {openTickets.length === 0 ? (
              <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm">No {ticketTab} tickets</div>
            ) : (
              <div className="space-y-3">
                {openTickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white border border-gray-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="font-mono font-bold text-sm">{ticket.order_id}</p>
                        <p className="text-xs text-gray-500">{ticket.customer_name} • {ticket.customer_phone}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${statusColors[ticket.status]}`}>{ticket.status}</span>
                    </div>
                    <div className="bg-gray-50 p-3 mb-3 text-sm text-gray-700">{ticket.message}</div>
                    {ticket.admin_reply && (
                      <div className="bg-blue-50 border border-blue-100 p-3 mb-3 text-sm">
                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">Your Reply</p>
                        {ticket.admin_reply}
                      </div>
                    )}
                    {ticket.status !== "closed" && (
                      <div className="flex gap-2">
                        <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type reply..."
                          className="flex-1 px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
                        <button onClick={() => replyText && replyToTicket(ticket.id, replyText)}
                          className="px-3 py-2 bg-blue-600 text-white text-xs font-bold hover:bg-blue-700">Reply</button>
                        <button onClick={() => closeTicket(ticket.id)}
                          className="px-3 py-2 bg-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-300">Close</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders View */}
        {tab !== "tickets" && tab !== "products" && (
          <div>
            {filtered.length === 0 ? (
              <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm">No orders found</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((order) => (
                  <div key={order.order_id} className={`bg-white border p-4 ${order.flagged ? "border-orange-400 border-2" : "border-gray-200"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-mono font-bold text-sm">{order.order_id}</p>
                          {order.flagged && <span className="bg-orange-100 text-orange-700 text-[9px] font-bold px-1.5 py-0.5">⚠ FLAGGED</span>}
                          <span className="bg-gray-100 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 uppercase">{order._type}</span>
                        </div>
                        <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${statusColors[order.status]}`}>{order.status}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${order.payment_method === "cod" ? "bg-gray-100 text-gray-600" : "bg-pink-100 text-pink-600"}`}>{order.payment_method}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-3">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase">Customer</p>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-gray-500">{order.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase">{order._type === "custom" ? "Details" : "Address"}</p>
                        {order._type === "custom" ? (
                          <p className="text-gray-600">{order.size} × {order.quantity}</p>
                        ) : (
                          <>
                            <p className="text-gray-600 text-xs">{order.address}</p>
                            <p className="text-gray-500 text-xs">{order.city}{order.state ? `, ${order.state}` : ""} - {order.pincode}</p>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase">Total</p>
                        <p className="font-black text-rose-600">₹{order.final_total || order.total}</p>
                        {order.discount > 0 && <p className="text-[10px] text-green-600">Saved ₹{order.discount}</p>}
                      </div>
                    </div>

                    {order._type === "regular" && order.items && (() => {
                      let parsed = order.items;
                      if (typeof parsed === "string") { try { parsed = JSON.parse(parsed); } catch { parsed = []; } }
                      if (!Array.isArray(parsed) || parsed.length === 0) return null;
                      return (
                        <div className="mb-3">
                          <p className="text-[10px] text-gray-400 uppercase mb-1">Items Ordered</p>
                          <div className="bg-gray-50 border border-gray-100 divide-y divide-gray-100">
                            {parsed.map((item, i) => (
                              <div key={i} className="flex items-center justify-between px-3 py-2 text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-400">🖼️</span>
                                  <div>
                                    <p className="font-medium text-gray-900">{item.name}</p>
                                    <p className="text-[10px] text-gray-500">{item.size} × {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {order.flagged && order.flag_reason && (
                      <div className="bg-orange-50 border border-orange-200 p-2 mb-3 text-xs text-orange-700">
                        <span className="font-bold">Reason:</span> {order.flag_reason}
                      </div>
                    )}

                    {order.notes && (
                      <div className="bg-blue-50 border border-blue-100 p-2 mb-3 text-xs text-blue-700">
                        <span className="font-bold">Note:</span> {order.notes}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                      {order.status === "pending" && (
                        <button onClick={() => updateStatus(order.order_id, order._type, "confirmed")}
                          className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700">Confirm</button>
                      )}
                      {order.status === "confirmed" && (
                        <button onClick={() => updateStatus(order.order_id, order._type, "shipped")}
                          className="px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold hover:bg-purple-700">Ship</button>
                      )}
                      {order.status === "shipped" && (
                        <button onClick={() => updateStatus(order.order_id, order._type, "delivered")}
                          className="px-2.5 py-1 bg-green-600 text-white text-[10px] font-bold hover:bg-green-700">Deliver</button>
                      )}
                      {!["cancelled", "delivered", "archived"].includes(order.status) && (
                        <button onClick={() => updateStatus(order.order_id, order._type, "cancelled")}
                          className="px-2.5 py-1 bg-red-100 text-red-700 text-[10px] font-bold hover:bg-red-200">Cancel</button>
                      )}
                      {["delivered", "cancelled"].includes(order.status) && (
                        <button onClick={() => updateStatus(order.order_id, order._type, "archived")}
                          className="px-2.5 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold hover:bg-gray-300">Archive</button>
                      )}
                      <button onClick={() => setSelectedOrder(selectedOrder === order.order_id ? null : order.order_id)}
                        className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold hover:bg-gray-200">
                        {selectedOrder === order.order_id ? "Close" : "Add Note"}
                      </button>
                    </div>

                    {selectedOrder === order.order_id && (
                      <div className="flex gap-2 mt-2">
                        <input type="text" value={noteText} onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add internal note..."
                          className="flex-1 px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500" />
                        <button onClick={() => noteText && addNote(order.order_id, order._type, noteText)}
                          className="px-3 py-2 bg-gray-900 text-white text-xs font-bold hover:bg-gray-800">Save</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products View */}
        {tab === "products" && (
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <input type="text" value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..." className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500" />
              <select value={productCatFilter} onChange={(e) => setProductCatFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500">
                <option value="">All Categories</option>
                {["cars", "anime", "gaming", "sports", "marvel", "dc", "movies", "music", "motivational", "islamic"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 whitespace-nowrap">+ Add Product</button>
              <button onClick={() => { setShowBulkUpload(true); setBulkItems([]); }}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 whitespace-nowrap">Bulk Upload</button>
            </div>
            <p className="text-xs text-gray-500 mb-3">{filteredProducts.length} products</p>
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm">No products found</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-200 p-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">🖼️</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs truncate">{product.name}</p>
                        <p className="text-[10px] text-gray-500">{product.id}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 uppercase">{product.category}</span>
                          {product.featured && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5">Featured</span>}
                          {!product.in_stock && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5">OOS</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <p className="text-[10px] text-gray-500">A6: ₹{product.prices?.A6} | A4: ₹{product.prices?.A4}</p>
                      <div className="flex gap-1">
                        <button onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                          className="px-2 py-1 bg-gray-100 text-[10px] font-bold hover:bg-gray-200">Edit</button>
                        <button onClick={() => deleteProduct(product.id)}
                          className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100">Del</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Banners View */}
        {tab === "banners" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-500">{banners.length} banners</p>
              <button onClick={() => { setEditingBanner(null); setShowBannerForm(true); }}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">+ Add Banner</button>
            </div>
            {banners.length === 0 ? (
              <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm">
                No banners yet. Add your first offer banner!
              </div>
            ) : (
              <div className="space-y-3">
                {banners.map((banner) => (
                  <div key={banner.id} className="bg-white border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-sm truncate">{banner.title}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 ${banner.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            {banner.active ? "ACTIVE" : "INACTIVE"}
                          </span>
                          <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5">Order: {banner.sort_order}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{banner.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => toggleBanner(banner.id, banner.active)}
                          className={`px-2 py-1 text-[10px] font-bold ${banner.active ? "bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                          {banner.active ? "Hide" : "Show"}
                        </button>
                        <button onClick={() => { setEditingBanner(banner); setShowBannerForm(true); }}
                          className="px-2 py-1 bg-gray-100 text-[10px] font-bold hover:bg-gray-200">Edit</button>
                        <button onClick={() => deleteBanner(banner.id)}
                          className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold hover:bg-red-100">Del</button>
                      </div>
                    </div>
                    {/* Preview */}
                    <div className="overflow-hidden rounded">
                      <div className="flex items-center gap-4 py-3 px-4" style={{ background: banner.bg_color }}>
                        <div>
                          <p className="font-bold text-sm whitespace-nowrap" style={{ color: banner.text_color }}>{banner.title}</p>
                          <p className="text-xs whitespace-nowrap" style={{ color: banner.subtitle_color }}>{banner.subtitle}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-lg whitespace-nowrap" style={{ color: banner.text_color }}>₹{banner.price}</p>
                          {banner.original_price > 0 && <p className="text-xs line-through whitespace-nowrap" style={{ color: banner.text_color, opacity: 0.5 }}>₹{banner.original_price}</p>}
                        </div>
                        {banner.badge_text && <span className="text-[10px] font-bold px-2 py-0.5 whitespace-nowrap" style={{ background: banner.badge_color, color: banner.text_color }}>{banner.badge_text}</span>}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-gray-400">
                      <span>Coupon: {banner.coupon_code || "—"}</span>
                      <span>Speed: {banner.speed}s</span>
                      <span>Shape: {banner.shape || "square"}</span>
                      <span>Products: {banner.product_ids?.length || 0}</span>
                      <span>Features: {(banner.features || []).join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={saveProduct}
          onCancel={() => { setShowProductForm(false); setEditingProduct(null); }}
        />
      )}

      {/* Banner Form Modal */}
      {showBannerForm && (
        <BannerForm
          banner={editingBanner}
          onSave={saveBanner}
          onCancel={() => { setShowBannerForm(false); setEditingBanner(null); }}
        />
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-gray-900">Bulk Upload Catalog</h3>
                {bulkItems.length > 0 && <p className="text-[10px] text-gray-500">{bulkItems.length} products ready</p>}
              </div>
              <button onClick={() => { setShowBulkUpload(false); setBulkUploading(false); }} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <div className="p-4 space-y-4">

              {/* Settings */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Category *</label>
                  <select value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)} disabled={bulkUploading}
                    className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:bg-gray-50">
                    {["cars", "anime", "gaming", "sports", "marvel", "dc", "movies", "music", "motivational", "islamic"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Subcategory</label>
                  <input type="text" value={bulkSubcategory} onChange={(e) => setBulkSubcategory(e.target.value)} disabled={bulkUploading}
                    className="w-full px-2 py-1.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:bg-gray-50"
                    placeholder="e.g. calligraphy" />
                </div>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setBulkDragOver(true); }}
                onDragLeave={() => setBulkDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setBulkDragOver(false); addBulkFiles(e.dataTransfer.files); }}>
                <label className={`block border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${bulkDragOver ? "border-rose-400 bg-rose-50" : "border-gray-300 hover:border-rose-400 hover:bg-rose-50"}`}>
                  <input type="file" accept="image/*" multiple className="hidden" disabled={bulkUploading}
                    onChange={(e) => addBulkFiles(e.target.files)} />
                  <span className="text-2xl">📸</span>
                  <p className="text-sm font-bold text-gray-900 mt-1">Drop images here or click to browse</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Select all poster images at once — each becomes a product</p>
                </label>
              </div>

              {/* Progress Bar */}
              {bulkUploading && (
                <div>
                  <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                    <span>Uploading {bulkProgress.current} of {bulkProgress.total}</span>
                    <span>{Math.round((bulkProgress.current / bulkProgress.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2">
                    <div className="bg-rose-500 h-2 transition-all duration-300" style={{ width: `${(bulkProgress.current / bulkProgress.total) * 100}%` }}></div>
                  </div>
                </div>
              )}

              {/* Items List */}
              {bulkItems.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[10px] font-bold text-gray-700 uppercase">Products ({bulkItems.length})</p>
                    {!bulkUploading && (
                      <button onClick={() => setBulkItems([])} className="text-[10px] text-red-500 hover:underline">Clear all</button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 border border-gray-200">
                    {bulkItems.map((item, i) => (
                      <div key={i} className={`flex items-center gap-2 p-2 ${item.status === "done" ? "bg-green-50" : item.status === "error" ? "bg-red-50" : item.status === "uploading" ? "bg-blue-50" : ""}`}>
                        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                          <img src={URL.createObjectURL(item.file)} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <input type="text" value={item.name} onChange={(e) => updateBulkName(i, e.target.value)} disabled={bulkUploading}
                            className="w-full px-1.5 py-0.5 border border-gray-200 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 disabled:bg-transparent disabled:border-transparent" />
                          {item.status === "error" && <p className="text-[9px] text-red-500 mt-0.5">{item.error}</p>}
                        </div>
                        <div className="shrink-0">
                          {item.status === "pending" && <span className="text-[9px] text-gray-400">Waiting</span>}
                          {item.status === "uploading" && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                          {item.status === "done" && <span className="text-[9px] text-green-600 font-bold">Done</span>}
                          {item.status === "error" && <span className="text-[9px] text-red-500 font-bold">Fail</span>}
                        </div>
                        {!bulkUploading && item.status === "pending" && (
                          <button onClick={() => removeBulkItem(i)} className="text-gray-400 hover:text-red-500 text-xs shrink-0">✕</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 sticky bottom-0 bg-white pt-2 border-t border-gray-100">
                <button onClick={() => { setShowBulkUpload(false); setBulkUploading(false); }}
                  className="flex-1 py-2.5 border border-gray-200 text-xs font-bold hover:bg-gray-50">
                  {bulkUploading ? "Cancel" : "Close"}
                </button>
                {!bulkUploading && bulkItems.length > 0 && bulkItems.some((x) => x.status === "pending") && (
                  <button onClick={startBulkUpload}
                    className="flex-1 py-2.5 bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">
                    Upload {bulkItems.filter((x) => x.status === "pending").length} Products
                  </button>
                )}
                {!bulkUploading && bulkItems.length > 0 && bulkItems.every((x) => x.status === "done" || x.status === "error") && (
                  <button onClick={() => { setBulkItems([]); }}
                    className="flex-1 py-2.5 bg-gray-900 text-white text-xs font-bold hover:bg-gray-800">
                    Upload More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
