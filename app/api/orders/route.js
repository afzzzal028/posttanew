import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const body = await req.json();
    const { orderId, name, phone, email, address, pincode, city, state, items, total, discount, shipping, finalTotal, paymentMethod, couponCode } = body;

    if (!orderId || !name || !phone || !address || !items) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, message: "Order received (database not configured)" });
    }

    const { data, error } = await supabase.from("orders").insert({
      order_id: orderId,
      name,
      phone,
      email: email || null,
      address,
      pincode,
      city: city || null,
      state: state || null,
      items,
      total,
      discount: discount || 0,
      shipping: shipping || 0,
      final_total: finalTotal,
      payment_method: paymentMethod || "cod",
      coupon_code: couponCode || null,
      status: "pending",
    }).select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data[0] });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, error: "Failed to save order" }, { status: 500 });
  }
}
