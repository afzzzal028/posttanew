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

export async function GET(req) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token || !verify(token)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });
  }

  const [ordersRes, customRes, ticketsRes, productsRes] = await Promise.all([
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("custom_orders").select("*").order("created_at", { ascending: false }),
    supabase.from("tickets").select("*").order("created_at", { ascending: false }),
    supabase.from("products").select("*").order("created_at", { ascending: false }),
  ]);

  return NextResponse.json({
    success: true,
    orders: ordersRes.data || [],
    customOrders: customRes.data || [],
    tickets: ticketsRes.data || [],
    products: productsRes.data || [],
  });
}
