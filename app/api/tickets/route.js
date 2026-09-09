import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { orderId, orderType, customerName, customerPhone, message } = await req.json();
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { error: ticketError } = await supabase.from("tickets").insert({
      order_id: orderId,
      order_type: orderType || "regular",
      customer_name: customerName,
      customer_phone: customerPhone,
      message,
      status: "open",
    });
    if (ticketError) return NextResponse.json({ success: false, error: ticketError.message }, { status: 500 });

    const table = orderType === "custom" ? "custom_orders" : "orders";
    await supabase.from(table).update({ flagged: true, flag_reason: message }).eq("order_id", orderId);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { data, error } = await supabase.from("tickets").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
