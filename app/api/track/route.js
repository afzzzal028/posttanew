import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const phone = searchParams.get("phone");

    if (!orderId || !phone) {
      return NextResponse.json({ success: false, error: "Missing orderId or phone" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { data: regular, error: e1 } = await supabase.from("orders").select("*").eq("order_id", orderId).eq("phone", phone).maybeSingle();
    const { data: custom, error: e2 } = await supabase.from("custom_orders").select("*").eq("order_id", orderId).eq("phone", phone).maybeSingle();

    const order = regular || custom;
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    const type = regular ? "regular" : "custom";
    const { data: orderTickets } = await supabase.from("tickets").select("*").eq("order_id", orderId).order("created_at", { ascending: false });

    return NextResponse.json({ success: true, order: { ...order, type }, tickets: orderTickets || [] });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
