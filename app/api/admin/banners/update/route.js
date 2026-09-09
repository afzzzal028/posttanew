import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import crypto from "crypto";

const SECRET = process.env.ADMIN_SECRET || "postta-admin-secret-key-2026";

function verify(token) {
  try {
    const [data, sig] = token.split(".");
    const expected = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
    if (sig !== expected) return null;
    return JSON.parse(Buffer.from(data, "base64url").toString());
  } catch {
    return null;
  }
}

function checkAuth(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verify(token)) return false;
  return true;
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const body = await req.json();
    const { id, title, subtitle, price, original_price, savings, coupon_code, bg_color, text_color, subtitle_color, badge_color, badge_text, speed, active, sort_order, shape, features, product_ids, gradient_from, gradient_to } = body;

    if (!title) return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });

    const row = {
      title, subtitle, price, original_price, savings, coupon_code,
      bg_color, text_color, subtitle_color, badge_color, badge_text,
      speed, active, sort_order,
      shape: shape || "square",
      features: features || ["badge", "savings", "coupon"],
      product_ids: product_ids || [],
      gradient_from: gradient_from || "",
      gradient_to: gradient_to || "",
      updated_at: new Date().toISOString(),
    };

    if (id) {
      const { error } = await supabase.from("banners").update(row).eq("id", id);
      if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      return NextResponse.json({ success: true });
    } else {
      const { data, error } = await supabase.from("banners").insert(row).select();
      if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, data: data[0] });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!checkAuth(req)) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "Missing banner id" }, { status: 400 });

    const { error } = await supabase.from("banners").delete().eq("id", id);
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
