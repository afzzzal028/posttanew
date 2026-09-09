"use client";
import { useState } from "react";

const steps = ["pending", "confirmed", "shipped", "delivered"];
const stepLabels = ["Order Placed", "Confirmed", "Shipped", "Delivered"];

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  async function trackOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    setTicketSent(false);

    try {
      const res = await fetch(`/api/track?orderId=${orderId}&phone=${phone}`);
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Order not found");
      } else {
        setOrder(data.order);
        setTickets(data.tickets || []);
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  }

  async function cancelOrder() {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    await fetch("/api/orders/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.order_id, orderType: order.type, status: "cancelled" }),
    });
    setOrder({ ...order, status: "cancelled" });
  }

  async function raiseTicket() {
    if (!ticketMsg.trim()) return;
    await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: order.order_id,
        orderType: order.type,
        customerName: order.name,
        customerPhone: order.phone,
        message: ticketMsg,
      }),
    });
    setTicketSent(true);
    setTicketMsg("");
    const res = await fetch(`/api/track?orderId=${order.order_id}&phone=${order.phone}`);
    const data = await res.json();
    if (data.success) setTickets(data.tickets || []);
  }

  const currentStep = steps.indexOf(order?.status) >= 0 ? steps.indexOf(order?.status) : -1;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-1">Track Your Order</h1>
      <p className="text-sm text-gray-500 mb-6">Enter your order ID and phone number</p>

      <form onSubmit={trackOrder} className="bg-white border border-gray-200 p-4 mb-6">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Order ID</label>
            <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required
              placeholder="PT..." className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
              placeholder="Used during checkout" className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-rose-600 text-white font-bold text-sm hover:bg-rose-700 transition-colors disabled:opacity-50">
            {loading ? "Tracking..." : "Track Order"}
          </button>
        </div>
      </form>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-sm mb-4">{error}</div>}

      {order && (
        <div className="space-y-4">
          {/* Order Info */}
          <div className="bg-white border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-mono font-bold text-sm">{order.order_id}</p>
                <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString("en-IN")}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${
                order.status === "pending" ? "bg-amber-100 text-amber-700" :
                order.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                order.status === "shipped" ? "bg-purple-100 text-purple-700" :
                order.status === "delivered" ? "bg-green-100 text-green-700" :
                "bg-red-100 text-red-700"
              }`}>{order.status}</span>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-4 px-2">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex-1 text-center">
                  <div className={`w-6 h-6 mx-auto mb-1 flex items-center justify-center text-[10px] font-bold ${
                    i <= currentStep ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-400"
                  }`}>{i < currentStep ? "✓" : i + 1}</div>
                  <p className={`text-[9px] ${i <= currentStep ? "text-gray-900 font-medium" : "text-gray-400"}`}>{label}</p>
                </div>
              ))}
            </div>

            <div className="text-sm space-y-1">
              <p><span className="font-bold">Name:</span> {order.name}</p>
              <p><span className="font-bold">Phone:</span> {order.phone}</p>
              <p><span className="font-bold">Total:</span> ₹{order.final_total || order.total}</p>
              {order.type === "regular" && order.address && (
                <p><span className="font-bold">Address:</span> {order.address}, {order.city} - {order.pincode}</p>
              )}
              {order.type === "custom" && (
                <p><span className="font-bold">Size:</span> {order.size} × {order.quantity}</p>
              )}
            </div>

            {/* Cancel Button */}
            {!["cancelled", "delivered", "archived"].includes(order.status) && (
              <button onClick={cancelOrder}
                className="mt-4 w-full py-2 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors">
                Cancel Order
              </button>
            )}
          </div>

          {/* Raise Ticket */}
          <div className="bg-white border border-gray-200 p-4">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Have a concern?</h3>
            <p className="text-xs text-gray-500 mb-3">Raise a ticket and we&apos;ll get back to you</p>
            {ticketSent ? (
              <div className="bg-green-50 border border-green-200 p-3 text-xs text-green-700">
                Ticket raised! We&apos;ll respond soon. Check this page for updates.
              </div>
            ) : (
              <div className="flex gap-2">
                <input type="text" value={ticketMsg} onChange={(e) => setTicketMsg(e.target.value)}
                  placeholder="Describe your issue..."
                  className="flex-1 px-3 py-2 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500" />
                <button onClick={raiseTicket}
                  className="px-3 py-2 bg-orange-500 text-white text-xs font-bold hover:bg-orange-600">Raise</button>
              </div>
            )}
          </div>

          {/* Previous Tickets */}
          {tickets.length > 0 && (
            <div className="bg-white border border-gray-200 p-4">
              <h3 className="font-bold text-sm text-gray-900 mb-3">Your Tickets</h3>
              <div className="space-y-2">
                {tickets.map((t) => (
                  <div key={t.id} className="border border-gray-100 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-gray-500">{new Date(t.created_at).toLocaleString("en-IN")}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 uppercase ${
                        t.status === "open" ? "bg-red-100 text-red-600" :
                        t.status === "replied" ? "bg-blue-100 text-blue-600" :
                        "bg-gray-100 text-gray-500"
                      }`}>{t.status}</span>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">{t.message}</p>
                    {t.admin_reply && (
                      <div className="bg-blue-50 p-2 mt-1 text-xs text-blue-700">
                        <span className="font-bold">Reply:</span> {t.admin_reply}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
