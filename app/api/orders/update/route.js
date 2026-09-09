import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { orderId, orderType, status, notes } = await req.json();
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const table = orderType === "custom" ? "custom_orders" : "orders";
    const update = { status, updated_at: new Date().toISOString() };
    if (notes !== undefined) update.notes = notes;

    const { error } = await supabase.from(table).update(update).eq("order_id", orderId);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
