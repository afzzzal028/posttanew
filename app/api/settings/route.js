import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      const { data, error } = await supabase.from("settings").select("value").eq("key", key).single();
      if (error) return NextResponse.json({ success: true, data: null });
      return NextResponse.json({ success: true, data: data?.value || null });
    }

    const { data, error } = await supabase.from("settings").select("*");
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    const settings = {};
    (data || []).forEach((row) => { settings[row.key] = row.value; });

    return NextResponse.json({ success: true, data: settings });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ success: false, error: "DB not configured" }, { status: 500 });

    const body = await req.json();
    const { key, value } = body;

    if (!key) return NextResponse.json({ success: false, error: "Missing key" }, { status: 400 });

    const { error } = await supabase.from("settings").upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: "key" });

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
