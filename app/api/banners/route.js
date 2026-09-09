import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const defaultBanners = [
  { id: "1", title: "Buy 2 A3 Posters", subtitle: "Get 1 A4 + 2 A6 Cards + 1 Mystery Poster FREE", price: 358, original_price: 497, savings: 139, coupon_code: "COMBO2A3", bg_color: "#e11d48", text_color: "#ffffff", subtitle_color: "#86efac", badge_color: "rgba(255,255,255,0.2)", badge_text: "SAVE ₹139", speed: 30 },
  { id: "2", title: "Buy 3 A4 Posters", subtitle: "Get 1 A5 + 3 A6 Cards + 1 Mystery Poster FREE", price: 387, original_price: 574, savings: 187, coupon_code: "COMBO3A4", bg_color: "#111827", text_color: "#ffffff", subtitle_color: "#86efac", badge_color: "rgba(255,255,255,0.2)", badge_text: "SAVE ₹187", speed: 30 },
  { id: "3", title: "Buy 5 A4 Posters", subtitle: "Get 2 A5 + 5 A6 Cards + 1 Mystery Poster FREE", price: 645, original_price: 961, savings: 316, coupon_code: "COMBO5A4", bg_color: "#d97706", text_color: "#ffffff", subtitle_color: "#86efac", badge_color: "rgba(255,255,255,0.2)", badge_text: "SAVE ₹316", speed: 30 },
  { id: "4", title: "Buy 3 A3 Posters", subtitle: "Get 2 A4 + 5 A6 Cards + 1 Mystery Poster FREE", price: 537, original_price: 811, savings: 274, coupon_code: "COMBO3A3", bg_color: "#059669", text_color: "#ffffff", subtitle_color: "#86efac", badge_color: "rgba(255,255,255,0.2)", badge_text: "SAVE ₹274", speed: 30 },
];

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: true, data: defaultBanners, speed: 30 });

    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, data: defaultBanners, speed: 30 });
    }

    const speed = data[0]?.speed || 30;
    return NextResponse.json({ success: true, data, speed });
  } catch {
    return NextResponse.json({ success: true, data: defaultBanners, speed: 30 });
  }
}
